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
 * @file AipImageClassify.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const EventPromise = require('./util/eventPromise');

const scope = require('./const/devScope').DEFAULT;

const METHOD_POST = 'POST';

const DISH_DETECT_PATH = '/rest/2.0/image-classify/v2/dish';
const CAR_DETECT_PATH = '/rest/2.0/image-classify/v1/car';
const LOGO_SEARCH_PATH = '/rest/2.0/image-classify/v2/logo';
const LOGO_ADD_PATH = '/rest/2.0/realtime_search/v1/logo/add';
const LOGO_DELETE_PATH = '/rest/2.0/realtime_search/v1/logo/delete';
const ANIMAL_DETECT_PATH = '/rest/2.0/image-classify/v1/animal';
const PLANT_DETECT_PATH = '/rest/2.0/image-classify/v1/plant';
const OBJECT_DETECT_PATH = '/rest/2.0/image-classify/v1/object_detect';


/**
 * AipImageClassify类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageClassify extends BaseClient {
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
     * 菜品识别接口
     * 该请求用于菜品识别。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的菜品名称、卡路里信息、置信度。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    dishDetect(image, options) {
        let param = {
            image: image,
            targetPath: DISH_DETECT_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 车辆识别接口
     * 该请求用于检测一张车辆图片的具体车型。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片的车辆品牌及型号。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    carDetect(image, options) {
        let param = {
            image: image,
            targetPath: CAR_DETECT_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * logo商标识别接口
     * 该请求用于检测和识别图片中的品牌LOGO信息。即对于输入的一张图片（可正常解码，且长宽比适宜），输出图片中LOGO的名称、位置和置信度。 当效果欠佳时，可以建立子库（请加入QQ群：649285136 联系工作人员申请建库）并自定义logo入库，提高识别效果。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   custom_lib 是否只使用自定义logo库的结果，默认false：返回自定义库+默认库的识别结果
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    logoSearch(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_SEARCH_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * logo商标识别—添加接口
     * 该接口尚在邀测阶段，使用该接口之前需要线下联系工作人员完成建库方可使用，请加入QQ群：649285136 联系相关人员。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式*
     * @param {string} brief - brief，检索时带回。此处要传对应的name与code字段，name长度小于100B，code长度小于150B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    logoAdd(image, brief, options) {
        let param = {
            image: image,
            brief: brief,
            targetPath: LOGO_ADD_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * logo商标识别—删除接口
     * 该接口尚在邀测阶段，使用该接口之前需要线下联系工作人员完成建库方可使用，请加入QQ群：649285136 联系相关人员。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    logoDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_DELETE_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * logo商标识别—删除接口
     * 该接口尚在邀测阶段，使用该接口之前需要线下联系工作人员完成建库方可使用，请加入QQ群：649285136 联系相关人员。
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    logoDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: LOGO_DELETE_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 动物识别接口
     * 该请求用于识别一张图片。即对于输入的一张图片（可正常解码，且长宽比适宜），输出动物识别结果
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为6
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    animalDetect(image, options) {
        let param = {
            image: image,
            targetPath: ANIMAL_DETECT_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 植物识别接口
     * 该请求用于识别一张图片。即对于输入的一张图片（可正常解码，且长宽比适宜），输出植物识别结果。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    plantDetect(image, options) {
        let param = {
            image: image,
            targetPath: PLANT_DETECT_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }

    /**
     * 图像主体检测接口
     * 用户向服务请求检测图像中的主体位置。
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   with_face 如果检测主体是人，主体区域是否带上人脸部分，0-不带人脸区域，其他-带人脸区域，裁剪类需求推荐带人脸，检索/识别类需求推荐不带人脸。默认取1，带人脸。
     * @return {EventPromise} - 类似Promise对象，但仅支持then和catch的链式操作
     */
    objectDetect(image, options) {
        let param = {
            image: image,
            targetPath: OBJECT_DETECT_PATH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
}

module.exports = AipImageClassify;