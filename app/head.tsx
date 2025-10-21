export default function Head() {
  const title = "Your Name – Portfolio";
  const desc = "Selected projects, case studies, and resume.";
  const og = "/images/og.png";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={og} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
