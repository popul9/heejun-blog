// ---------------------------------------------------------------------------
// Site-wide i18n configuration.
//
// Adding a new language = add its code to LOCALES, add a home page at
// src/pages/<code>/index.astro, and fill in the dictionary below.
// Category routes (/xx/developer/, /xx/foodie/, ...) are generated
// automatically from these two arrays.
// ---------------------------------------------------------------------------

export const DEFAULT_LOCALE = 'en';
/** Order here is the order shown in the language picker. */
export const LOCALES = ['ko', 'en', 'zh'] as const;
export type Locale = typeof LOCALES[number];

/** Native name of each language, shown in the language picker. */
export const LOCALE_LABELS: Record<Locale, string> = {
    ko: '한국어',
    en: 'English',
    zh: '中文',
};

/** Locales that live under a URL prefix. The default locale sits at the root. */
export const SECONDARY_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

/** Content collections rendered as blog categories, in nav order. */
export const CATEGORIES = ['developer', 'roamer', 'melophile', 'foodie'] as const;
export type Category = typeof CATEGORIES[number];

export function getLangFromUrl(url: URL): Locale {
    const [, lang] = url.pathname.split('/');
    if ((LOCALES as readonly string[]).includes(lang)) return lang as Locale;
    return DEFAULT_LOCALE;
}

export function useTranslations(lang: Locale) {
    return function t(key: string) {
        const dict: Record<string, Partial<Record<Locale, string>>> = {
            'site.title': { ko: "희준의 넷", en: "Heejun's Net", zh: "文熙畯的网" },
            'site.subtitle': { ko: '당신에게, 나는', en: 'Who Am I To You?', zh: '于你，我是谁' },
            'nav.wonderer': { ko: '궁금러', en: 'Wonderer', zh: '好奇者' },
            'nav.roamer': { ko: '방랑자', en: 'Roamer', zh: '漫游者' },
            'nav.developer': { ko: '개발자', en: 'Developer', zh: '开发者' },
            'nav.melophile': { ko: '음덕', en: 'Melophile', zh: '乐痴' },
            'nav.foodie': { ko: '맛집러', en: 'Foodie', zh: '觅食者' },

            // Category listing pages. Without these every listing page shares
            // one title, which search engines read as duplicate pages.
            'desc.developer': {
                ko: '개발하며 부딪힌 문제와 해결 과정, 그리고 도구에 대한 기록',
                en: 'Problems I hit while building things, how I solved them, and the tools I use',
                zh: '开发中遇到的问题、解决过程，以及关于工具的记录',
            },
            'desc.roamer': {
                ko: '호주를 중심으로 돌아다니며 보고 느낀 것들',
                en: 'Places I have wandered through, mostly around Australia',
                zh: '以澳大利亚为中心，四处走走看看的记录',
            },
            'desc.melophile': {
                ko: '듣고 또 듣게 되는 음악과 그 이유에 대하여',
                en: 'Music I keep coming back to, and why',
                zh: '关于百听不厌的音乐，以及理由',
            },
            'desc.foodie': {
                ko: '애들레이드와 멜버른에서 다시 찾게 되는 곳들',
                en: 'Places in Adelaide and Melbourne worth going back to',
                zh: '在阿德莱德和墨尔本值得再去的地方',
            },
        };
        // Fall back to the default locale so a partially translated language
        // still renders instead of leaking raw keys.
        return dict[key]?.[lang] ?? dict[key]?.[DEFAULT_LOCALE] ?? key;
    };
}

export function getLocalizedPathname(pathname: string, locale: Locale) {
    // Strip any existing locale prefix, then re-apply the target one.
    // The default locale is served unprefixed (/developer/, not /en/developer/).
    let path = pathname;
    for (const prefix of SECONDARY_LOCALES) {
        if (path === `/${prefix}`) {
            path = '/';
            break;
        }
        if (path.startsWith(`/${prefix}/`)) {
            path = path.slice(prefix.length + 1);
            break;
        }
    }
    if (path === '') {
        path = '/';
    }

    if (locale === DEFAULT_LOCALE) {
        return path;
    }
    return `/${locale}${path === '/' ? '' : path}`;
}

/**
 * Posts are stored as <post-folder>/<locale>.mdx. Keep the entries for this
 * locale, plus any flat single-file post that has no per-language variants.
 */
export function filterPostsByLocale<T extends { id: string }>(posts: T[], locale: string) {
    return posts.filter((post) => post.id.endsWith(`/${locale}`) || !post.id.includes('/'));
}

/** "dantes-deli-glenelg-sa/en" -> "dantes-deli-glenelg-sa" */
export function getPostSlug(id: string, locale: string) {
    return id.endsWith(`/${locale}`) ? id.slice(0, -(locale.length + 1)) : id;
}

/** "dantes-deli-glenelg-sa/en" -> { slug, locale }. Flat ids get locale null. */
export function splitPostId(id: string): { slug: string; locale: Locale | null } {
    const cut = id.lastIndexOf('/');
    if (cut === -1) return { slug: id, locale: null };

    const tail = id.slice(cut + 1);
    return (LOCALES as readonly string[]).includes(tail)
        ? { slug: id.slice(0, cut), locale: tail as Locale }
        : { slug: id, locale: null };
}

/**
 * Which languages a post actually exists in, so hreflang only advertises
 * pages that are really there. Lets a language ship partially translated.
 */
export function getLocalesBySlug<T extends { id: string }>(entries: T[]) {
    const bySlug = new Map<string, Locale[]>();

    for (const entry of entries) {
        const { slug, locale } = splitPostId(entry.id);
        // A flat post has no translations; treat it as existing everywhere.
        const locales = locale ? [locale] : [...LOCALES];
        bySlug.set(slug, [...(bySlug.get(slug) ?? []), ...locales]);
    }

    return bySlug;
}
