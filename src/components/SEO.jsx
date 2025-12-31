import React, { useEffect } from 'react';

export default function SEO({ title, description }) {
  useEffect(() => {
    document.title = `${title} | Neu A2`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
}
