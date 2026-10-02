"""Build a review candidate; never overwrite the public resumes automatically."""

import argparse
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

import pymupdf
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent


def normalize(text):
    return re.sub(r"\s+", " ", text).strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / ".next/resume-review/updated.pdf")
    parser.add_argument("--font-dir", type=Path, default=Path("C:/Windows/Fonts"))
    parser.add_argument("--font-family", choices=["arial", "liberation"], default="arial")
    args = parser.parse_args()
    data = json.loads((HERE / "resume.json").read_text(encoding="utf-8"))
    filenames = ("arial.ttf", "arialbd.ttf", "ariali.ttf") if args.font_family == "arial" else (
        "LiberationSans-Regular.ttf", "LiberationSans-Bold.ttf", "LiberationSans-Italic.ttf"
    )
    for name, filename in zip(("Resume", "Resume-Bold", "Resume-Italic"), filenames):
        pdfmetrics.registerFont(TTFont(name, str(args.font_dir / filename)))
    pdfmetrics.registerFontFamily("Resume", normal="Resume", bold="Resume-Bold", italic="Resume-Italic")
    args.output.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(args.output), pagesize=(612, 792), invariant=1)
    pdf.setTitle("Hector Virrey | Full-Stack Developer")
    pdf.setAuthor("Hector Virrey")
    left, width, top = 44.75, 522.5, 35.0
    expected = []
    expected_links = []
    regions = []

    def link(item):
        expected_links.append(item["url"])
        return f'<link href="{escape(item["url"])}" color="#2563eb"><font size="8.5">{escape(item["label"])}</font></link>'

    def paragraph(markup, *, size=9.5, leading=11.4, align=0, indent=0, gap=0):
        nonlocal top
        style = ParagraphStyle("resume", fontName="Resume", fontSize=size, leading=leading,
                               alignment=align, leftIndent=indent, firstLineIndent=-indent)
        p = Paragraph(markup, style)
        _, height = p.wrap(width, 792)
        if top + height > 747.25:
            raise ValueError("Content exceeds the original one-page layout; edit spacing or content before publishing.")
        p.drawOn(pdf, left, 792 - top - height)
        expected.append(p.getPlainText())
        regions.append((top, top + height))
        top += height + gap

    def heading(text):
        nonlocal top
        top += 7.5
        paragraph(f'<font color="#111827"><b>{text}</b></font>', size=10, leading=12, gap=3.75)
        pdf.setStrokeColor(HexColor("#cbd5e1"))
        pdf.setLineWidth(0.65)
        pdf.line(left, 792 - top + 3.2, left + width, 792 - top + 3.2)

    def bullets(items):
        for item in items:
            paragraph("• " + escape(item), indent=9.35, gap=0.9)

    paragraph(f'<font color="#111827"><b>{escape(data["name"])}</b></font>', size=20, leading=23, align=1)
    paragraph(f'<font color="#374151"><b>{escape(data["headline"])}</b></font>', size=10.5, leading=15, align=1)
    contacts = [escape(data["location"]), escape(data["phone"])] + [link(item) for item in data["contact_links"]]
    paragraph("  |  ".join(contacts), leading=13.15, align=1)
    heading("OBJECTIVE")
    paragraph(escape(data["objective"]))
    heading("SUMMARY")
    paragraph(escape(data["summary"]))
    heading("TECHNICAL SKILLS")
    for skill in data["skills"]:
        paragraph(f'<b>{escape(skill["label"])}:</b> {escape(skill["text"])}', leading=11.7)
    heading("EXPERIENCE")
    development = data["development_experience"]
    paragraph(f'<b>{escape(development["title"])}</b>  |  <i>{escape(development["context"])}</i>', leading=11.9, gap=2)
    for project in development["projects"]:
        title = f'<b><font size="9">{escape(project["name"])}</font><font size="8.5"> — {escape(project["description"])}</font></b>'
        title += f'  |  <i>{escape(project["stack"])}</i>'
        if project["links"]:
            title += "  |  " + " · ".join(link(item) for item in project["links"])
        paragraph(title, leading=12.2)
        bullets(project["bullets"])
        top += 1.3
    top += 2
    for job in data["experience"]:
        paragraph(f'<b>{escape(job["employer"])} — {escape(job["title"])}</b>  |  <i>{escape(job["dates"])}</i>', leading=11.9)
        bullets(job["bullets"])
    heading("EDUCATION")
    education = data["education"]
    paragraph(f'<b>{escape(education["school"])}</b>  |  {escape(education["degree"])} — {escape(education["status"])}')
    pdf.showPage()
    pdf.save()

    with pymupdf.open(args.output) as doc:
        assert len(doc) == 1, "Page count changed"
        page = doc[0]
        text = page.get_text()
        assert normalize(text) == normalize(" ".join(expected)), "Missing, reordered, or unselectable text"
        assert "\ufffd" not in text, "Invalid character mapping"
        assert sorted(item["uri"] for item in page.get_links()) == sorted(expected_links), "Link mismatch"
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                assert page.rect.contains(pymupdf.Rect(line["bbox"])), "Text extends beyond page"
                assert line["bbox"][0] >= left - 1 and line["bbox"][2] <= left + width + 1, "Text exceeds margins"
        assert all(a[1] <= b[0] for a, b in zip(regions, regions[1:])), "Overlapping paragraph regions"
        page.get_pixmap(matrix=pymupdf.Matrix(2, 2)).save(str(args.output.with_suffix(".png")))
        args.output.with_suffix(".txt").write_text(text, encoding="utf-8")
    print(f"Validated {args.output}: one page, all source text, {len(expected_links)} links, margins, and paragraph spacing.")
    print(f"Inspect {args.output.with_suffix('.png')} before copying to public/resume.pdf and public/images/Resume.pdf.")


if __name__ == "__main__":
    main()
