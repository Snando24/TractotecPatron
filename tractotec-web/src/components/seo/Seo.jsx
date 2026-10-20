import { SITE_URL } from "../../constants/site";

/**
 * Metadatos por ruta. React 19 eleva <title>, <meta> y <link> al <head>.
 */
function Seo({ title, description, path = "/", noindex = false }) {
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
    </>
  );
}

export default Seo;
