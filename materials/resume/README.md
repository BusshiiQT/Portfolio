# Resume source

`resume.json` is the editable content for both `public/resume.pdf` (served at
`/resume.pdf`) and `public/images/Resume.pdf` (the duplicate supplied in the
workspace). They were identical one-page US Letter PDFs before reconstruction.
No tailored application was used or overwritten.

The source preserves the original contact details, six hyperlink destinations,
skills, project bullets, employment title/dates, and WGU degree marked in progress.
The summary now leads with demonstrated full-stack development and project work;
education remains in its own section. The original PDF's broken Unicode mappings
for bullets and dashes were reconstructed from its rendered appearance.

## Build and review

From the repository root, using Python 3:

```powershell
python -m venv .next/resume-venv
.next/resume-venv/Scripts/python -m pip install -r materials/resume/requirements.txt
.next/resume-venv/Scripts/python materials/resume/build.py
```

The generator embeds Windows Arial, a close metric match to the original
Liberation Sans. It keeps the original page size, approximate margins, font sizes,
colors, rules, and compact single-column layout. On systems with Liberation Sans,
pass `--font-family liberation --font-dir /path/to/liberation/fonts`.
Fonts are read from the local system and are not bundled here.

Output defaults to `.next/resume-review/updated.pdf`, with a 144-DPI PNG preview
and extracted text beside it. Use `--output PATH` for another candidate location.
The build checks the one-page limit, complete selectable text, Unicode, link
destinations, margins, and paragraph spacing. It fails instead of shrinking text
or silently creating another page.

Inspect the PNG and PDF for clipping, overlap, and readability before replacing
the public files. The build deliberately does not replace them automatically:

```powershell
Copy-Item .next/resume-review/updated.pdf public/resume.pdf
Copy-Item .next/resume-review/updated.pdf public/images/Resume.pdf
```

Finally, run the site locally and verify that `/resume.pdf` returns a PDF whose
bytes match `public/resume.pdf`. Building this document does not deploy the site.
