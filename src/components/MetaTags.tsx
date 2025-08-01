import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title: string;
  description: string;
  imageUrl?: string;
  keywords?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, imageUrl, keywords }) => {
  const location = useLocation();
  const defaultTitle = 'The GRYD - A Digital Magazine by Aditya Nawal';
  const defaultDescription = 'The GRYD is a digital magazine showcasing the creative work of Aditya Nawal, a product designer and developer. Explore projects, articles, and experiments.';
  const defaultKeywords = 'Aditya Nawal, The GRYD, product designer, developer, digital magazine, portfolio, creative work';
  const baseUrl = 'https://naw.al';

  const pageTitle = title ? `${title} | The GRYD` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const pageImageUrl = imageUrl || `${baseUrl}/placeholder.svg`;
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImageUrl} />
    </Helmet>
  );
};

export default MetaTags;
