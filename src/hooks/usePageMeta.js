import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import siteConfig from '../siteConfig';

export function usePageMeta(title, description) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = pathname === '/'
      ? `${siteConfig.baseUrl}/`
      : `${siteConfig.baseUrl}${pathname}`;

    document.title = title;

    const set = (sel, attr, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };

    set('meta[name="description"]',        'content', description);
    set('link[rel="canonical"]',           'href',    url);
    set('meta[property="og:title"]',       'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:url"]',         'content', url);
    set('meta[name="twitter:title"]',      'content', title);
    set('meta[name="twitter:description"]','content', description);
  }, [title, description, pathname]);
}
