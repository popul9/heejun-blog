import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
    // The dev server serves public HTML by filename, without directory indexes.
    if (import.meta.env.DEV) {
        const path = url.pathname.replace(/\/$/, '');
        if (path === '/games/ui-is-hard-is-easy' || path === '/games/ui-is-hard-is-easy/lab') {
            return redirect(`${path}/index.html${url.search}`);
        }
    }
    return next();
});
