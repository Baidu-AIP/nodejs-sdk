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

const EventPromise = require('./util/eventPromise');

const scope = require('./const/devScope').DEFAULT;

const METHOD_POST = 'POST';

const SAME_HQ_ADD_PATH = '/rest/2.0/realtime_search/same_hq/add';
const SAME_HQ_SEARCH_PATH = '/rest/2.0/realtime_search/same_hq/search';
const SAME_HQ_DELETE_PATH = '/rest/2.0/realtime_search/same_hq/delete';
const SIMILAR_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/add';
const SIMILAR_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/search';
const SIMILAR_DELETE_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/delete';


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
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.commonImpl, param);
        }
        return promise;
    }

    /**
     * 相同图检索—入库接口
     * 该请求用于实时检索相同图片集合。即对于输入的一张图片（可正常解码，且长宽比适宜），返回自建图库中相同的图片集合。相同图检索包含入库、检索、删除三个子接口；**在正式使用之前请加入QQ群：649285136 联系工作人员完成建库并调用入库接口完成图片入库**。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    sameHqAdd(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_ADD_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 相同图检索—检索接口
     * 使用该接口前，请加入QQ群：649285136 ，联系工作人员完成建库。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    sameHqSearch(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_SEARCH_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 相同图检索—删除接口
     * 删除相同图
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    sameHqDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: SAME_HQ_DELETE_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 相同图检索—删除接口
     * 删除相同图
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    sameHqDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: SAME_HQ_DELETE_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 相似图检索—入库接口
     * 该请求用于实时检索相似图片集合。即对于输入的一张图片（可正常解码，且长宽比适宜），返回自建图库中相似的图片集合。相似图检索包含入库、检索、删除三个子接口；**在正式使用之前请加入QQ群：649285136 联系工作人员完成建库并调用入库接口完成图片入库**。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   brief 检索时原样带回,最长256B。
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    similarAdd(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_ADD_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 相似图检索—检索接口
     * 使用该接口前，请加入QQ群：649285136 ，联系工作人员完成建库。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    similarSearch(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_SEARCH_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 相似图检索—删除接口
     * 删除相似图
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    similarDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: SIMILAR_DELETE_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 相似图检索—删除接口
     * 删除相似图
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    similarDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: SIMILAR_DELETE_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
}

module.exports = AipImageSearch;