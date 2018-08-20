'use strict';
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
 * @file AipImageSearch.js
 * @author baidu aip
 */
const BaseClient = require("./client/baseClient");
const RequestInfo = require("./client/requestInfo");
const HttpClient = require("./http/httpClient");
const objectTools = require("./util/objectTools");
const METHOD_POST = 'POST';
const SAME_HQ_ADD_PATH = '/rest/2.0/realtime_search/same_hq/add';
const SAME_HQ_SEARCH_PATH = '/rest/2.0/realtime_search/same_hq/search';
const SAME_HQ_DELETE_PATH = '/rest/2.0/realtime_search/same_hq/delete';
const SIMILAR_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/add';
const SIMILAR_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/search';
const SIMILAR_DELETE_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/delete';
const PRODUCT_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/add';
const PRODUCT_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/search';
const PRODUCT_DELETE_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/delete';
/**
 * AipImageSearch类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageSearch extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl, param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }
    /**
     * 相同图检索—入库接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     * @return {Promise} - 标准Promise对象
     */
    sameHqAdd(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 相同图检索—检索接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     *   tag_logic 检索时tag之间的逻辑， 0：逻辑and，1：逻辑or
     *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
     *   rn 分页功能，截取条数，例：250
     * @return {Promise} - 标准Promise对象
     */
    sameHqSearch(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 相同图检索—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    sameHqDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 相同图检索—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    sameHqDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: SAME_HQ_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 相似图检索—入库接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     * @return {Promise} - 标准Promise对象
     */
    similarAdd(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 相似图检索—检索接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
     *   tag_logic 检索时tag之间的逻辑， 0：逻辑and，1：逻辑or
     *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
     *   rn 分页功能，截取条数，例：250
     * @return {Promise} - 标准Promise对象
     */
    similarSearch(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 相似图检索—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    similarDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 相似图检索—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    similarDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: SIMILAR_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 商品检索—入库接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。**请注意，检索接口不返回原图，仅反馈当前填写的brief信息，所以调用该入库接口时，brief信息请尽量填写可关联至本地图库的图片id或者图片url、图片名称等信息**
     *   class_id1 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     *   class_id2 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     * @return {Promise} - 标准Promise对象
     */
    productAdd(image, options) {
        let param = {
            image: image,
            targetPath: PRODUCT_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 商品检索—检索接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   class_id1 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     *   class_id2 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
     *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
     *   rn 分页功能，截取条数，例：250
     * @return {Promise} - 标准Promise对象
     */
    productSearch(image, options) {
        let param = {
            image: image,
            targetPath: PRODUCT_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 商品检索—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    productDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: PRODUCT_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 商品检索—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    productDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: PRODUCT_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}
exports.default = AipImageSearch;
// @ts-ignore
Object.assign(AipImageSearch, exports);
module.exports = AipImageSearch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlwSW1hZ2VTZWFyY2guanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInNyYy9BaXBJbWFnZVNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFDYjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILGtEQUFtRDtBQUVuRCxvREFBcUQ7QUFFckQsZ0RBQWlEO0FBRWpELGtEQUFtRDtBQUVuRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFFM0IsTUFBTSxnQkFBZ0IsR0FBRyx1Q0FBdUMsQ0FBQztBQUNqRSxNQUFNLG1CQUFtQixHQUFHLDBDQUEwQyxDQUFDO0FBQ3ZFLE1BQU0sbUJBQW1CLEdBQUcsMENBQTBDLENBQUM7QUFDdkUsTUFBTSxnQkFBZ0IsR0FBRyx5REFBeUQsQ0FBQztBQUNuRixNQUFNLG1CQUFtQixHQUFHLDREQUE0RCxDQUFDO0FBQ3pGLE1BQU0sbUJBQW1CLEdBQUcsNERBQTRELENBQUM7QUFDekYsTUFBTSxnQkFBZ0IsR0FBRyx5REFBeUQsQ0FBQztBQUNuRixNQUFNLG1CQUFtQixHQUFHLDREQUE0RCxDQUFDO0FBQ3pGLE1BQU0sbUJBQW1CLEdBQUcsNERBQTRELENBQUM7QUFHekY7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxjQUFlLFNBQVEsVUFBVTtJQUNuQyxZQUFZLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNyQixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sRUFDcEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FB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QUUsT0FBTyxDQUFDLENBQUM7QUFFdkMsaUJBQVMsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBBaXBJbWFnZVNlYXJjaC5qc1xuICogQGF1dGhvciBiYWlkdSBhaXBcbiAqL1xuXG5pbXBvcnQgQmFzZUNsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50L2Jhc2VDbGllbnQnKTtcblxuaW1wb3J0IFJlcXVlc3RJbmZvID0gcmVxdWlyZSgnLi9jbGllbnQvcmVxdWVzdEluZm8nKTtcblxuaW1wb3J0IEh0dHBDbGllbnQgPSByZXF1aXJlKCcuL2h0dHAvaHR0cENsaWVudCcpO1xuXG5pbXBvcnQgb2JqZWN0VG9vbHMgPSByZXF1aXJlKCcuL3V0aWwvb2JqZWN0VG9vbHMnKTtcblxuY29uc3QgTUVUSE9EX1BPU1QgPSAnUE9TVCc7XG5cbmNvbnN0IFNBTUVfSFFfQUREX1BBVEggPSAnL3Jlc3QvMi4wL3JlYWx0aW1lX3NlYXJjaC9zYW1lX2hxL2FkZCc7XG5jb25zdCBTQU1FX0hRX1NFQVJDSF9QQVRIID0gJy9yZXN0LzIuMC9yZWFsdGltZV9zZWFyY2gvc2FtZV9ocS9zZWFyY2gnO1xuY29uc3QgU0FNRV9IUV9ERUxFVEVfUEFUSCA9ICcvcmVzdC8yLjAvcmVhbHRpbWVfc2VhcmNoL3NhbWVfaHEvZGVsZXRlJztcbmNvbnN0IFNJTUlMQVJfQUREX1BBVEggPSAnL3Jlc3QvMi4wL2ltYWdlLWNsYXNzaWZ5L3YxL3JlYWx0aW1lX3NlYXJjaC9zaW1pbGFyL2FkZCc7XG5jb25zdCBTSU1JTEFSX1NFQVJDSF9QQVRIID0gJy9yZXN0LzIuMC9pbWFnZS1jbGFzc2lmeS92MS9yZWFsdGltZV9zZWFyY2gvc2ltaWxhci9zZWFyY2gnO1xuY29uc3QgU0lNSUxBUl9ERUxFVEVfUEFUSCA9ICcvcmVzdC8yLjAvaW1hZ2UtY2xhc3NpZnkvdjEvcmVhbHRpbWVfc2VhcmNoL3NpbWlsYXIvZGVsZXRlJztcbmNvbnN0IFBST0RVQ1RfQUREX1BBVEggPSAnL3Jlc3QvMi4wL2ltYWdlLWNsYXNzaWZ5L3YxL3JlYWx0aW1lX3NlYXJjaC9wcm9kdWN0L2FkZCc7XG5jb25zdCBQUk9EVUNUX1NFQVJDSF9QQVRIID0gJy9yZXN0LzIuMC9pbWFnZS1jbGFzc2lmeS92MS9yZWFsdGltZV9zZWFyY2gvcHJvZHVjdC9zZWFyY2gnO1xuY29uc3QgUFJPRFVDVF9ERUxFVEVfUEFUSCA9ICcvcmVzdC8yLjAvaW1hZ2UtY2xhc3NpZnkvdjEvcmVhbHRpbWVfc2VhcmNoL3Byb2R1Y3QvZGVsZXRlJztcblxuXG4vKipcbiAqIEFpcEltYWdlU2VhcmNo57G7XG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBCYXNlQ2xpZW50XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHBpZCBhcHBpZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhayAgYWNjZXNzIGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzayAgc2VjdXJpdHkga2V5LlxuICovXG5jbGFzcyBBaXBJbWFnZVNlYXJjaCBleHRlbmRzIEJhc2VDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGFwcElkLCBhaywgc2spIHtcbiAgICAgICAgc3VwZXIoYXBwSWQsIGFrLCBzayk7XG4gICAgfVxuICAgIGNvbW1vbkltcGwocGFyYW0pIHtcbiAgICAgICAgbGV0IGh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgICAgICBsZXQgYXBpVXJsID0gcGFyYW0udGFyZ2V0UGF0aDtcbiAgICAgICAgZGVsZXRlIHBhcmFtLnRhcmdldFBhdGg7XG4gICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyhhcGlVcmwsXG4gICAgICAgICAgICBwYXJhbSwgTUVUSE9EX1BPU1QpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QocmVxdWVzdEluZm8sIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOebuOWQjOWbvuajgOe0ouKAlOWFpeW6k+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgYnJpZWYg5qOA57Si5pe25Y6f5qC35bim5ZueLOacgOmVvzI1NkLjgIJcbiAgICAgKiAgIHRhZ3MgMSAtIDY1NTM16IyD5Zu05YaF55qE5pW05pWw77yMdGFn6Ze05Lul6YCX5Y+35YiG6ZqU77yM5pyA5aSaMuS4qnRhZ+OAguagt+S+i++8mlwiMTAwLDExXCIg77yb5qOA57Si5pe25Y+v5ZyI5a6a5YiG57G757u05bqm6L+b6KGM5qOA57SiXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgc2FtZUhxQWRkKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFNBTUVfSFFfQUREX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOebuOWQjOWbvuajgOe0ouKAlOajgOe0ouaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgdGFncyAxIC0gNjU1MzXojIPlm7TlhoXnmoTmlbTmlbDvvIx0YWfpl7Tku6XpgJflj7fliIbpmpTvvIzmnIDlpJoy5LiqdGFn44CC5qC35L6L77yaXCIxMDAsMTFcIiDvvJvmo4DntKLml7blj6/lnIjlrprliIbnsbvnu7Tluqbov5vooYzmo4DntKJcbiAgICAgKiAgIHRhZ19sb2dpYyDmo4DntKLml7Z0YWfkuYvpl7TnmoTpgLvovpHvvIwgMO+8mumAu+i+kWFuZO+8jDHvvJrpgLvovpFvclxuICAgICAqICAgcG4g5YiG6aG15Yqf6IO977yM6LW35aeL5L2N572u77yM5L6L77yaMOOAguacquaMh+WumuWIhumhteaXtu+8jOm7mOiupOi/lOWbnuWJjTMwMOS4que7k+aenO+8m+aOpeWPo+i/lOWbnuaVsOmHj+acgOWkp+mZkOWItjEwMDDmnaHvvIzkvovlpoLvvJrotbflp4vkvY3nva7kuLo5MDDvvIzmiKrlj5bmnaHmlbA1MDDmnaHvvIzmjqXlj6PkuZ/lj6rov5Tlm57nrKw5MDAgLSAxMDAw5p2h55qE57uT5p6c77yM5YWx6K6hMTAw5p2hXG4gICAgICogICBybiDliIbpobXlip/og73vvIzmiKrlj5bmnaHmlbDvvIzkvovvvJoyNTBcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBzYW1lSHFTZWFyY2goaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogU0FNRV9IUV9TRUFSQ0hfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55u45ZCM5Zu+5qOA57Si4oCU5Yig6Zmk5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgc2FtZUhxRGVsZXRlQnlJbWFnZShpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBTQU1FX0hRX0RFTEVURV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnm7jlkIzlm77mo4DntKLigJTliKDpmaTmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250U2lnbiAtIOWbvueJh+etvuWQje+8iOWSjGltYWdl5LqM6YCJ5LiA77yMaW1hZ2XkvJjlhYjnuqfmm7Tpq5jvvIlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgc2FtZUhxRGVsZXRlQnlTaWduKGNvbnRTaWduLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGNvbnRfc2lnbjogY29udFNpZ24sXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBTQU1FX0hRX0RFTEVURV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnm7jkvLzlm77mo4DntKLigJTlhaXlupPmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIGJyaWVmIOajgOe0ouaXtuWOn+agt+W4puWbnizmnIDplb8yNTZC44CCXG4gICAgICogICB0YWdzIDEgLSA2NTUzNeiMg+WbtOWGheeahOaVtOaVsO+8jHRhZ+mXtOS7pemAl+WPt+WIhumalO+8jOacgOWkmjLkuKp0YWfjgILmoLfkvovvvJpcIjEwMCwxMVwiIO+8m+ajgOe0ouaXtuWPr+WciOWumuWIhuexu+e7tOW6pui/m+ihjOajgOe0olxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHNpbWlsYXJBZGQoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogU0lNSUxBUl9BRERfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55u45Ly85Zu+5qOA57Si4oCU5qOA57Si5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICB0YWdzIDEgLSA2NTUzNeiMg+WbtOWGheeahOaVtOaVsO+8jHRhZ+mXtOS7pemAl+WPt+WIhumalO+8jOacgOWkmjLkuKp0YWfjgILmoLfkvovvvJpcIjEwMCwxMVwiIO+8m+ajgOe0ouaXtuWPr+WciOWumuWIhuexu+e7tOW6pui/m+ihjOajgOe0olxuICAgICAqICAgdGFnX2xvZ2ljIOajgOe0ouaXtnRhZ+S5i+mXtOeahOmAu+i+ke+8jCAw77ya6YC76L6RYW5k77yMMe+8mumAu+i+kW9yXG4gICAgICogICBwbiDliIbpobXlip/og73vvIzotbflp4vkvY3nva7vvIzkvovvvJow44CC5pyq5oyH5a6a5YiG6aG15pe277yM6buY6K6k6L+U5Zue5YmNMzAw5Liq57uT5p6c77yb5o6l5Y+j6L+U5Zue5pWw6YeP5pyA5aSn6ZmQ5Yi2MTAwMOadoe+8jOS+i+Wmgu+8mui1t+Wni+S9jee9ruS4ujkwMO+8jOaIquWPluadoeaVsDUwMOadoe+8jOaOpeWPo+S5n+WPqui/lOWbnuesrDkwMCAtIDEwMDDmnaHnmoTnu5PmnpzvvIzlhbHorqExMDDmnaFcbiAgICAgKiAgIHJuIOWIhumhteWKn+iDve+8jOaIquWPluadoeaVsO+8jOS+i++8mjI1MFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHNpbWlsYXJTZWFyY2goaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogU0lNSUxBUl9TRUFSQ0hfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55u45Ly85Zu+5qOA57Si4oCU5Yig6Zmk5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgc2ltaWxhckRlbGV0ZUJ5SW1hZ2UoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogU0lNSUxBUl9ERUxFVEVfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55u45Ly85Zu+5qOA57Si4oCU5Yig6Zmk5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udFNpZ24gLSDlm77niYfnrb7lkI3vvIjlkoxpbWFnZeS6jOmAieS4gO+8jGltYWdl5LyY5YWI57qn5pu06auY77yJXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHNpbWlsYXJEZWxldGVCeVNpZ24oY29udFNpZ24sIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgY29udF9zaWduOiBjb250U2lnbixcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFNJTUlMQVJfREVMRVRFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWVhuWTgeajgOe0ouKAlOWFpeW6k+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgYnJpZWYg5qOA57Si5pe25Y6f5qC35bim5ZueLOacgOmVvzI1NkLjgIIqKuivt+azqOaEj++8jOajgOe0ouaOpeWPo+S4jei/lOWbnuWOn+Wbvu+8jOS7heWPjemmiOW9k+WJjeWhq+WGmeeahGJyaWVm5L+h5oGv77yM5omA5Lul6LCD55So6K+l5YWl5bqT5o6l5Y+j5pe277yMYnJpZWbkv6Hmga/or7flsL3ph4/loavlhpnlj6/lhbPogZToh7PmnKzlnLDlm77lupPnmoTlm77niYdpZOaIluiAheWbvueJh3VybOOAgeWbvueJh+WQjeensOetieS/oeaBryoqXG4gICAgICogICBjbGFzc19pZDEg5ZWG5ZOB5YiG57G757u05bqmMe+8jOaUr+aMgTEtNjDojIPlm7TlhoXnmoTmlbTmlbDjgILmo4DntKLml7blj6/lnIjlrpror6XliIbnsbvnu7Tluqbov5vooYzmo4DntKJcbiAgICAgKiAgIGNsYXNzX2lkMiDllYblk4HliIbnsbvnu7TluqYx77yM5pSv5oyBMS02MOiMg+WbtOWGheeahOaVtOaVsOOAguajgOe0ouaXtuWPr+WciOWumuivpeWIhuexu+e7tOW6pui/m+ihjOajgOe0olxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHByb2R1Y3RBZGQoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogUFJPRFVDVF9BRERfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ZWG5ZOB5qOA57Si4oCU5qOA57Si5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBjbGFzc19pZDEg5ZWG5ZOB5YiG57G757u05bqmMe+8jOaUr+aMgTEtNjDojIPlm7TlhoXnmoTmlbTmlbDjgILmo4DntKLml7blj6/lnIjlrpror6XliIbnsbvnu7Tluqbov5vooYzmo4DntKJcbiAgICAgKiAgIGNsYXNzX2lkMiDllYblk4HliIbnsbvnu7TluqYx77yM5pSv5oyBMS02MOiMg+WbtOWGheeahOaVtOaVsOOAguajgOe0ouaXtuWPr+WciOWumuivpeWIhuexu+e7tOW6pui/m+ihjOajgOe0olxuICAgICAqICAgcG4g5YiG6aG15Yqf6IO977yM6LW35aeL5L2N572u77yM5L6L77yaMOOAguacquaMh+WumuWIhumhteaXtu+8jOm7mOiupOi/lOWbnuWJjTMwMOS4que7k+aenO+8m+aOpeWPo+i/lOWbnuaVsOmHj+acgOWkp+mZkOWItjEwMDDmnaHvvIzkvovlpoLvvJrotbflp4vkvY3nva7kuLo5MDDvvIzmiKrlj5bmnaHmlbA1MDDmnaHvvIzmjqXlj6PkuZ/lj6rov5Tlm57nrKw5MDAgLSAxMDAw5p2h55qE57uT5p6c77yM5YWx6K6hMTAw5p2hXG4gICAgICogICBybiDliIbpobXlip/og73vvIzmiKrlj5bmnaHmlbDvvIzkvovvvJoyNTBcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBwcm9kdWN0U2VhcmNoKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFBST0RVQ1RfU0VBUkNIX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWVhuWTgeajgOe0ouKAlOWIoOmZpOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHByb2R1Y3REZWxldGVCeUltYWdlKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFBST0RVQ1RfREVMRVRFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWVhuWTgeajgOe0ouKAlOWIoOmZpOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRTaWduIC0g5Zu+54mH562+5ZCN77yI5ZKMaW1hZ2XkuozpgInkuIDvvIxpbWFnZeS8mOWFiOe6p+abtOmrmO+8iVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBwcm9kdWN0RGVsZXRlQnlTaWduKGNvbnRTaWduLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGNvbnRfc2lnbjogY29udFNpZ24sXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBQUk9EVUNUX0RFTEVURV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFpcEltYWdlU2VhcmNoXG4vLyBAdHMtaWdub3JlXG5PYmplY3QuYXNzaWduKEFpcEltYWdlU2VhcmNoLCBleHBvcnRzKTtcbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCA9IEFpcEltYWdlU2VhcmNoO1xuIl19