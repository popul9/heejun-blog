import { getCollection } from 'astro:content';
import {
    CATEGORIES,
    filterPostsByLocale,
    getPostSlug,
    type Locale,
} from '../i18n/utils';

/**
 * Every post of a given language across all categories, newest first.
 * `pathPrefix` is '' for the default locale and '/ko', '/zh', ... otherwise.
 */
export async function getFeedItems(locale: Locale, pathPrefix: string) {
    const groups = await Promise.all(
        CATEGORIES.map(async (category) => {
            const entries = filterPostsByLocale(await getCollection(category), locale);
            return entries.map((entry) => ({
                title: entry.data.title,
                description: entry.data.description,
                pubDate: entry.data.pubDate,
                link: `${pathPrefix}/${category}/${getPostSlug(entry.id, locale)}/`,
            }));
        })
    );

    return groups
        .flat()
        .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}
