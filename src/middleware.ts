import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect, resolveLegacyProductRedirect } from './config/checkout-redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  const pathname = new URL(context.request.url).pathname;
  const checkout = resolveCheckoutPathRedirect(pathname);
  if (checkout) {
    return context.redirect(checkout, 302);
  }
  const legacy = resolveLegacyProductRedirect(pathname);
  if (legacy) {
    return context.redirect(new URL(legacy, context.url.origin).toString(), 302);
  }
  return next();
});
