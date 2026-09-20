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
export const LOCALES = ['ko', 'en', 'zh', 'th', 'vi'] as const;
export type Locale = typeof LOCALES[number];

/** Native name of each language, shown in the language picker. */
export const LOCALE_LABELS: Record<Locale, string> = {
    ko: '한국어',
    en: 'English',
    zh: '中文',
    th: 'ไทย',
    vi: 'Tiếng Việt',
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
            'site.title': {
                ko: "희준의 넷",
                en: "Heejun's Net",
                zh: "文熙畯的网",
                th: "เน็ตของฮีจุน",
                vi: "Net của Heejun",
            },
            'site.subtitle': {
                ko: '당신에게, 나는',
                en: 'Who Am I To You?',
                zh: '于你，我是谁',
                th: 'สำหรับคุณ ผมคือใคร',
                vi: 'Với bạn, tôi là ai',
            },
            'nav.wonderer': { ko: '궁금러', en: 'Wonderer', zh: '好奇者', th: 'นักสงสัย', vi: 'Kẻ tò mò' },
            'nav.roamer': { ko: '방랑자', en: 'Roamer', zh: '漫游者', th: 'นักพเนจร', vi: 'Kẻ lang thang' },
            'nav.developer': { ko: '개발자', en: 'Developer', zh: '开发者', th: 'นักพัฒนา', vi: 'Lập trình viên' },
            'nav.melophile': { ko: '음덕', en: 'Melophile', zh: '乐痴', th: 'คนบ้าเพลง', vi: 'Kẻ mê nhạc' },
            'nav.foodie': { ko: '맛집러', en: 'Foodie', zh: '觅食者', th: 'นักหาของอร่อย', vi: 'Kẻ săn quán ngon' },
            'nav.about': { ko: '소개', en: 'About', zh: '关于', th: 'เกี่ยวกับ', vi: 'Giới thiệu' },

            'post.inProgress.label': {
                ko: '작성 중', en: 'In progress', zh: '撰写中', th: 'กำลังเขียน', vi: 'Đang viết',
            },
            'post.inProgress.notice': {
                ko: '아직 작성 중인 글입니다. 내용과 사진이 계속 추가되거나 수정될 수 있어요.',
                en: 'This one is still being written. I’ll keep adding and tweaking the words and photos.',
                zh: '这篇还在慢慢写。之后会继续补充、修改文字和照片。',
                th: 'บทความนี้ยังเขียนอยู่ เดี๋ยวจะค่อยๆ เติมและปรับทั้งเนื้อหากับรูปภาพอีก',
                vi: 'Bài này vẫn đang được viết. Mình sẽ tiếp tục thêm và chỉnh sửa cả nội dung lẫn hình ảnh.',
            },

            // 404. One static page serves every locale, so these are handed to
            // the browser and picked by the prefix of the URL that 404'd.
            'error.404.title': {
                ko: '페이지를 찾을 수 없습니다',
                en: 'Page not found',
                zh: '找不到页面',
                th: 'ไม่พบหน้านี้',
                vi: 'Không tìm thấy trang',
            },
            'error.404.body': {
                ko: '주소가 바뀌었거나, 처음부터 없던 페이지입니다.',
                en: 'This page has moved, or it never existed.',
                zh: '该页面可能已移动，或从未存在过。',
                th: 'หน้านี้อาจถูกย้ายไปแล้ว หรือไม่เคยมีอยู่',
                vi: 'Trang này đã được chuyển đi, hoặc chưa từng tồn tại.',
            },
            'error.404.home': {
                ko: '홈으로 돌아가기',
                en: 'Back to home',
                zh: '返回首页',
                th: 'กลับไปหน้าแรก',
                vi: 'Quay về trang chủ',
            },

            // Category listing pages. Without these every listing page shares
            // one title, which search engines read as duplicate pages.
            'desc.developer': {
                ko: '개발하며 부딪힌 문제와 해결 과정, 그리고 도구에 대한 기록',
                en: 'Problems I hit while building things, how I solved them, and the tools I use',
                zh: '开发中遇到的问题、解决过程，以及关于工具的记录',
                th: 'บันทึกปัญหาที่เจอระหว่างพัฒนา วิธีที่แก้ และเครื่องมือที่ใช้',
                vi: 'Ghi chép về những vấn đề gặp phải khi lập trình, cách giải quyết và công cụ',
            },
            'desc.roamer': {
                ko: '호주를 중심으로 돌아다니며 보고 느낀 것들',
                en: 'Places I have wandered through, mostly around Australia',
                zh: '以澳大利亚为中心，四处走走看看的记录',
                th: 'สิ่งที่ได้เห็นและรู้สึกจากการเดินทาง โดยมีออสเตรเลียเป็นศูนย์กลาง',
                vi: 'Những gì tôi thấy và cảm nhận trên đường đi, chủ yếu quanh nước Úc',
            },
            'desc.melophile': {
                ko: '듣고 또 듣게 되는 음악과 그 이유에 대하여',
                en: 'Music I keep coming back to, and why',
                zh: '关于百听不厌的音乐，以及理由',
                th: 'เพลงที่ฟังแล้วฟังอีก และเหตุผลเบื้องหลัง',
                vi: 'Về những bản nhạc nghe đi nghe lại, và lý do',
            },
            'desc.foodie': {
                ko: '애들레이드와 멜버른에서 다시 찾게 되는 곳들',
                en: 'Places in Adelaide and Melbourne worth going back to',
                zh: '在阿德莱德和墨尔本值得再去的地方',
                th: 'ร้านในแอดิเลดและเมลเบิร์นที่อยากกลับไปอีก',
                vi: 'Những nơi ở Adelaide và Melbourne đáng để quay lại',
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
export function filterPublishedPosts<T extends { data: { inProgress?: boolean } }>(posts: T[]) {
    return posts.filter((post) => !post.data.inProgress);
}

export function filterPostsByLocale<T extends { id: string; data: { inProgress?: boolean } }>(posts: T[], locale: string) {
    return filterPublishedPosts(posts).filter(
        (post) => post.id.endsWith(`/${locale}`) || !post.id.includes('/'),
    );
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
