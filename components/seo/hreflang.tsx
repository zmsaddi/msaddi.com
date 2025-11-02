import { locales } from '@/i18n/request';

export function generateHreflangLinks(pathname: string): Array<{ rel: string; hreflang: string; href: string }> {
  const baseUrl = 'https://www.msaddi.com';
  const links: Array<{ rel: string; hreflang: string; href: string }> = [];

  // Add links for all supported languages
  locales.forEach(locale => {
    links.push({
      rel: 'alternate',
      hreflang: locale,
      href: `${baseUrl}/${locale}${pathname === '/' ? '' : pathname}`
    });
  });

  // Add x-default for language selection page
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}/en${pathname === '/' ? '' : pathname}`
  });

  return links;
}

export function HreflangLinks({ pathname = '/' }: { pathname?: string }) {
  const links = generateHreflangLinks(pathname);

  return (
    <>
      {links.map((link, index) => (
        <link
          key={index}
          rel={link.rel}
          hrefLang={link.hreflang}
          href={link.href}
        />
      ))}
    </>
  );
}