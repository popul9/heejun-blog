import rss from '@astrojs/rss';
import { DEFAULT_LOCALE, useTranslations } from '../i18n/utils';
import { getFeedItems } from '../lib/feed';

export async function GET(context) {
	const t = useTranslations(DEFAULT_LOCALE);
	return rss({
		title: t('site.title'),
		description: t('site.subtitle'),
		site: context.site,
		items: await getFeedItems(DEFAULT_LOCALE, ''),
	});
}
