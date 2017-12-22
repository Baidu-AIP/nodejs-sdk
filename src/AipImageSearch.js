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

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

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
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 相同图检索—入库接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。
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

module.exports = AipImageSearch;

