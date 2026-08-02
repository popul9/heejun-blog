// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://heejun.net',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: 'en',
		// Keep in sync with LOCALES in src/i18n/utils.ts
		locales: ['en', 'ko', 'zh'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
