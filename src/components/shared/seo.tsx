import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({
  title = 'Al Amin - Full Stack Developer Portfolio',
  description = 'Full Stack Developer specializing in React, Node.js, Express, MongoDB, PostgreSQL, TypeScript, Prisma, and modern web technologies. Explore my portfolio of projects and competitive programming achievements.',
  keywords = 'Al Amin, Full Stack Developer, React Developer, Node.js, Express, MongoDB, PostgreSQL, TypeScript, JavaScript, Prisma, Tailwind CSS, Web Development, Portfolio, Competitive Programming',
  image = 'https://alamin-portfolio-site.vercel.app/alamin.jpg',
  url = 'https://alamin-portfolio-site.vercel.app',
  type = 'website',
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="author" content="Al Amin" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
