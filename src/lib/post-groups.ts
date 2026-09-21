import { getPostSlug } from '../i18n/utils';

interface GroupablePost {
    id: string;
    data: { title: string; children?: string[] };
}

// Call with published posts in one locale. An unpublished parent must not hide
// its children, and grouping must not affect individual routes or RSS.
export function getTopLevelPosts<T extends GroupablePost>(posts: T[], locale: string): T[] {
    const childSlugs = new Set(posts.flatMap((post) => post.data.children ?? []));
    return posts.filter((post) => !childSlugs.has(getPostSlug(post.id, locale)));
}

export function getChildPosts<T extends GroupablePost>(parent: T, posts: T[], locale: string): T[] {
    const bySlug = new Map(posts.map((post) => [getPostSlug(post.id, locale), post]));
    return (parent.data.children ?? []).flatMap((slug) => {
        const child = bySlug.get(slug);
        return child ? [child] : [];
    });
}
