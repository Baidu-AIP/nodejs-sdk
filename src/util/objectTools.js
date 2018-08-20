'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file objectTool
 * @author baiduAip
 */
function merge(source, dest) {
    let merged = {};
    for (let p in dest) {
        merged[p] = dest[p];
    }
    for (let p in source) {
        merged[p] = source[p];
    }
    // @ts-ignore
    return merged;
}
exports.merge = merge;
function ensureArray(arrayLike) {
    if (isArray(arrayLike)) {
        return arrayLike;
    }
    else {
        return [arrayLike];
    }
}
exports.ensureArray = ensureArray;
function isArray(obj) {
    return '[object Array]' === Object.prototype.toString.call(obj);
}
exports.isArray = isArray;
function isObject(obj) {
    return '[object Object]' === Object.prototype.toString.call(obj);
}
exports.isObject = isObject;
function isFunction(obj) {
    return '[object Function]' === Object.prototype.toString.call(obj);
}
exports.isFunction = isFunction;
const objectTools = require("./objectTools");
exports.default = objectTools;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0VG9vbHMuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInNyYy91dGlsL29iamVjdFRvb2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILFNBQWdCLEtBQUssQ0FBUyxNQUFVLEVBQUUsSUFBUTtJQUVqRCxJQUFJLE1BQU0sR0FBRyxFQUFTLENBQUM7SUFDdkIsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQ2xCO1FBQ0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwQjtJQUNELEtBQUssSUFBSSxDQUFDLElBQUksTUFBTSxFQUNwQjtRQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEI7SUFDRCxhQUFhO0lBQ2IsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDO0FBYkQsc0JBYUM7QUFFRCxTQUFnQixXQUFXLENBQUksU0FBWTtJQUUxQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFDdEI7UUFDQyxPQUFPLFNBQVMsQ0FBQztLQUNqQjtTQUVEO1FBQ0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ25CO0FBQ0YsQ0FBQztBQVZELGtDQVVDO0FBRUQsU0FBZ0IsT0FBTyxDQUFJLEdBQU07SUFFaEMsT0FBTyxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUhELDBCQUdDO0FBRUQsU0FBZ0IsUUFBUSxDQUFJLEdBQU07SUFFakMsT0FBTyxpQkFBaUIsS0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQUhELDRCQUdDO0FBRUQsU0FBZ0IsVUFBVSxDQUFJLEdBQU07SUFFbkMsT0FBTyxtQkFBbUIsS0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUhELGdDQUdDO0FBRUQsNkNBQTRDO0FBQzVDLGtCQUFlLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBvYmplY3RUb29sXG4gKiBAYXV0aG9yIGJhaWR1QWlwXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlPFQxLCBUMj4oc291cmNlOiBUMSwgZGVzdDogVDIpOiBUMSAmIFQyXG57XG5cdGxldCBtZXJnZWQgPSB7fSBhcyBhbnk7XG5cdGZvciAobGV0IHAgaW4gZGVzdClcblx0e1xuXHRcdG1lcmdlZFtwXSA9IGRlc3RbcF07XG5cdH1cblx0Zm9yIChsZXQgcCBpbiBzb3VyY2UpXG5cdHtcblx0XHRtZXJnZWRbcF0gPSBzb3VyY2VbcF07XG5cdH1cblx0Ly8gQHRzLWlnbm9yZVxuXHRyZXR1cm4gbWVyZ2VkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlQXJyYXk8VD4oYXJyYXlMaWtlOiBUKVxue1xuXHRpZiAoaXNBcnJheShhcnJheUxpa2UpKVxuXHR7XG5cdFx0cmV0dXJuIGFycmF5TGlrZTtcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRyZXR1cm4gW2FycmF5TGlrZV07XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXk8VD4ob2JqOiBUKVxue1xuXHRyZXR1cm4gJ1tvYmplY3QgQXJyYXldJyA9PT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdDxUPihvYmo6IFQpXG57XG5cdHJldHVybiAnW29iamVjdCBPYmplY3RdJyA9PT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uPFQ+KG9iajogVClcbntcblx0cmV0dXJuICdbb2JqZWN0IEZ1bmN0aW9uXScgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xufVxuXG5pbXBvcnQgKiBhcyBvYmplY3RUb29scyBmcm9tICcuL29iamVjdFRvb2xzJ1xuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9vbHM7XG4iXX0=