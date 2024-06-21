import { NormalizedCacheObject } from "../../cache";
export type CacheState<T> = NormalizedCacheObject | T | null;
export interface CacheLens<T> {
    cacheUpdateCallback?: (state: CacheState<T>) => void;
}
export interface WindowWithCacheLens<T> extends Window {
    __CACHE_LENS__?: CacheLens<T>;
}
//# sourceMappingURL=CacheLens.d.ts.map