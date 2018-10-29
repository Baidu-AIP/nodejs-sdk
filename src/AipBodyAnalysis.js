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
 * @file AipBodyAnalysis.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const BODY_ANALYSIS_PATH = '/rest/2.0/image-classify/v1/body_analysis';
const BODY_ATTR_PATH = '/rest/2.0/image-classify/v1/body_attr';
const BODY_NUM_PATH = '/rest/2.0/image-classify/v1/body_num';
const GESTURE_PATH = '/rest/2.0/image-classify/v1/gesture';
const BODY_SEG_PATH = '/rest/2.0/image-classify/v1/body_seg';


/**
 * AipBodyAnalysis类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipBodyAnalysis extends BaseClient {
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
     * 人体关键点识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    bodyAnalysis(image, options) {
        let param = {
            image: image,
            targetPath: BODY_ANALYSIS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人体属性识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type gender,<br>age,<br>lower_wear,<br>upper_wear,<br>headwear,<br>glasses,<br>upper_color,<br>lower_color,<br>cellphone,<br>upper_wear_fg,<br>upper_wear_texture,<br>lower_wear_texture,<br>orientation,<br>umbrella or 1）可选值说明：<br>gender-性别，age-年龄阶段，lower_wear-下身服饰，upper_wear-上身服饰，headwear-是否戴帽子，glasses-是否戴眼镜，upper_color-上身服饰颜色，lower_color-下身服饰颜色，cellphone-是否使用手机，upper_wear_fg-上身服饰细分类，upper_wear_texture-上身服饰纹理，lower_wear_texture-下身服饰纹理，orientation-身体朝向，umbrella-是否撑伞；<br>2）type 参数值可以是可选值的组合，用逗号分隔；**如果无此参数默认输出全部14个属性**
     * @return {Promise} - 标准Promise对象
     */
    bodyAttr(image, options) {
        let param = {
            image: image,
            targetPath: BODY_ATTR_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人流量统计接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   area 特定框选区域坐标，逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，默认尾点和首点相连做闭合，**此参数为空或无此参数默认识别整个图片的人数**
     *   show 是否输出渲染的图片，默认不返回，**选true时返回渲染后的图片(base64)**，其它无效值或为空则默认false
     * @return {Promise} - 标准Promise对象
     */
    bodyNum(image, options) {
        let param = {
            image: image,
            targetPath: BODY_NUM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 手势识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    gesture(image, options) {
        let param = {
            image: image,
            targetPath: GESTURE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人像分割接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    bodySeg(image, options) {
        let param = {
            image: image,
            targetPath: BODY_SEG_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}

module.exports = AipBodyAnalysis;

