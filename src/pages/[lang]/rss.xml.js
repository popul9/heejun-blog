import rss from '@astrojs/rss';
import { SECONDARY_LOCALES, useTranslations } from '../../i18n/utils';
import { getFeedItems } from '../../lib/feed';

export function getStaticPaths() {
	return SECONDARY_LOCALES.map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
	const { lang } = context.params;
	const t = useTranslations(lang);
	return rss({
		title: t('site.title'),
		description: t('site.subtitle'),
		site: context.site,
		items: await getFeedItems(lang, `/${lang}`),
	});
}
