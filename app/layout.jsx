
import "./globals.scss";
import RenderBlock from "../components/RenderBlock";

export default async function RootLayout({ children }) {
  const slug = process.env.SITE_SLUG;

  const res = await fetch(
    `https://blinkflo-backend.onrender.com/api/websites/${slug}`,
    { cache: "no-store" }
  );
  const site = await res.json();

  return (
    <html lang="en">
      <head>
        <title>{site.websiteName}</title>
        <link rel="icon" href={site.favicon} />
      </head>

      <body>
        {/* GLOBAL HEADER */}
        {site.layout?.header && (
          <RenderBlock
            block={site.layout.header}
            site={site}
            logo = {site.logo}
          />
        )} 

        {children}

        {/* GLOBAL FOOTER */}
        {site.layout?.footer && (
          <RenderBlock
            block={site.layout.footer}
            site={site}
          />
        )}
      </body>
    </html>
  );
}
