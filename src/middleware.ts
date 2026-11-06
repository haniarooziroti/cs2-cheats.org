import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';
import { resolvePathRedirect } from '../scripts/redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  const pathname = new URL(context.request.url).pathname;
  const checkout = resolveCheckoutPathRedirect(pathname);
  if (checkout) {
    return context.redirect(checkout, 302);
  }
  const legacy = resolvePathRedirect(pathname);
  if (legacy && legacy !== pathname) {
    return context.redirect(new URL(legacy, context.url.origin).toString(), 301);
  }
  return next();
});
