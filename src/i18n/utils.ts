import { getRelativeLocaleUrl } from 'astro:i18n';

const LOCALES = ['ko', 'en', 'ch'] as const;
type Locale = typeof LOCALES[number];

export function getLangFromUrl(url: URL): Locale {
    const [, lang] = url.pathname.split('/');
    if ((LOCALES as readonly string[]).includes(lang)) return lang as Locale;
    return 'en';
}

export function useTranslations(lang: Locale) {
    return function t(key: string) {
        // Mock simple translation dictionary for now
        const dict: Record<string, Record<Locale, string>> = {
            'site.title': { ko: "희준의 넷", en: "Heejun's Net", ch: "文熙畯的网" },
            'site.subtitle': { ko: '당신에게, 나는', en: 'Who Am I To You?', ch: '于你，我是谁' },
            'nav.wonderer': { ko: '궁금러', en: 'Wonderer', ch: '好奇者' },
            'nav.roamer': { ko: '방랑자', en: 'Roamer', ch: '漫游者' },
            'nav.developer': { ko: '개발자', en: 'Developer', ch: '开发者' },
            'nav.melophile': { ko: '음덕', en: 'Melophile', ch: '乐痴' },
            'nav.foodie': { ko: '맛집러', en: 'Foodie', ch: '觅食者' },
        };
        return dict[key]?.[lang] || key;
    };
}

export function getLocalizedPathname(pathname: string, locale: Locale) {
    // If it's already in the target locale (e.g., /en/...), we just string replace it
    // If it's ko (default), we remove the /en/ prefix
    let path = pathname;
    if (path === '/ko') {
        path = '/';
    } else if (path.startsWith('/ko/')) {
        path = path.slice(3);
    }
    if (path === '/ch') {
        path = '/';
    } else if (path.startsWith('/ch/')) {
        path = path.slice(3);
    }
    if (path === '') {
        path = '/';
    }

    if (locale === 'en') {
        return path;
    } else {
        return `/${locale}${path === '/' ? '' : path}`;
    }
}
