export declare const CHECKOUT_URLS: {
  readonly cs2: string;
};

export declare const CHECKOUT_PATH_REDIRECTS: ReadonlyMap<string, string>;

export declare const LEGACY_PRODUCT_REDIRECTS: ReadonlyMap<string, string>;

export declare function resolveCheckoutPathRedirect(pathname: string): string | null;

export declare function resolveLegacyProductRedirect(pathname: string): string | null;
