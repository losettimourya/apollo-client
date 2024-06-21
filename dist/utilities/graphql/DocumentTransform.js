import { Trie } from "@wry/trie";
import { canUseWeakMap, canUseWeakSet } from "../common/canUse.js";
import { checkDocument } from "./getFromAST.js";
import { invariant } from "../globals/index.js";
function identity(document) {
    return document;
}
var DocumentTransform = (function () {
    function DocumentTransform(transform, options) {
        if (options === void 0) { options = Object.create(null); }
        this.resultCache = canUseWeakSet
            ? new WeakSet()
            : new Set();
        this.transform = transform;
        if (options.getCacheKey) {
            this.getCacheKey = options.getCacheKey;
        }
        if (options.cache !== false) {
            this.stableCacheKeys = new Trie(canUseWeakMap, function (key) { return ({ key: key }); });
        }
    }
    DocumentTransform.prototype.getCacheKey = function (document) {
        return [document];
    };
    DocumentTransform.identity = function () {
        return new DocumentTransform(identity, { cache: false });
    };
    DocumentTransform.split = function (predicate, left, right) {
        if (right === void 0) { right = DocumentTransform.identity(); }
        return new DocumentTransform(function (document) {
            var documentTransform = predicate(document) ? left : right;
            return documentTransform.transformDocument(document);
        }, { cache: false });
    };
    DocumentTransform.prototype.transformDocument = function (document) {
        if (this.resultCache.has(document)) {
            return document;
        }
        var cacheEntry = this.getStableCacheEntry(document);
        if (cacheEntry && cacheEntry.value) {
            return cacheEntry.value;
        }
        checkDocument(document);
        var transformedDocument = this.transform(document);
        this.resultCache.add(transformedDocument);
        if (cacheEntry) {
            cacheEntry.value = transformedDocument;
        }
        return transformedDocument;
    };
    DocumentTransform.prototype.concat = function (otherTransform) {
        var _this = this;
        return new DocumentTransform(function (document) {
            return otherTransform.transformDocument(_this.transformDocument(document));
        }, { cache: false });
    };
    DocumentTransform.prototype.getStableCacheEntry = function (document) {
        if (!this.stableCacheKeys)
            return;
        var cacheKeys = this.getCacheKey(document);
        if (cacheKeys) {
            invariant(Array.isArray(cacheKeys), 65);
            return this.stableCacheKeys.lookupArray(cacheKeys);
        }
    };
    return DocumentTransform;
}());
export { DocumentTransform };
//# sourceMappingURL=DocumentTransform.js.map