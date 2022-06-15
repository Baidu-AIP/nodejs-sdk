'use strict';
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

const HttpClientJson = require('./http/httpClientExt');

const httpHeader = require('./const/httpHeader');

const CONTENT_TYPE_JSON = 'application/json';

const METHOD_POST = 'POST';


const INPAINTING_PATH = '/rest/2.0/image-process/v1/inpainting';
const STYLE_TRANS_PATH = '/rest/2.0/image-process/v1/style_trans';
const IMAGE_DEFINITION_ENHANCE_PATH = '/rest/2.0/image-process/v1/image_definition_enhance';
const DEHAZE_PATH = '/rest/2.0/image-process/v1/dehaze';
const STRETCH_RESTORE_PATH = '/rest/2.0/image-process/v1/stretch_restore';
const COLOR_ENHANCE_PATH = '/rest/2.0/image-process/v1/color_enhance';
const SKY_SEG_PATH = '/rest/2.0/image-process/v1/sky_seg';
const COLOURIZE_PATH = '/rest/2.0/image-process/v1/colourize';
const CONTRAST_ENHANCE_PATH = '/rest/2.0/image-process/v1/contrast_enhance';
const IMAGE_QUALITY_ENHANCE_PATH = '/rest/2.0/image-process/v1/image_quality_enhance';
const SELFIE_ANIME_PATH = '/rest/2.0/image-process/v1/selfie_anime';
const PICTURE_BOOK_DELETE_PATH = '/rest/2.0/imagesearch/v1/realtime_search/picturebook/delete';
const PICTURE_BOOK_UPDATE_PATH = '/rest/2.0/imagesearch/v1/realtime_search/picturebook/update';



/**
 * AipImageProcess类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageProcess extends BaseClient {
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

    jsonRequestImpl(param) {
        let httpClient = new HttpClientJson();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST, false, {
                [httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
            });
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 图像修复
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    inpaintingByMask(image, rectangle) {

        let param = {};
        let options = {};
        param.image = image;
        param.rectangle = rectangle;
        param.targetPath = INPAINTING_PATH;
        return this.jsonRequestImpl(objectTools.merge(param, options));
    }

    /**
     * 图像风格转换
     *
     * @param {string} image - 二进制图像数据
     * @param {string} option - 转换风格
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   pdf_file_num 需要识别的PDF文件的对应页码，当 pdf_file 参数有效时，识别传入页码的对应页面内容，若不传入，则默认识别第 1 页
     *   probability 是否返回字段识别结果的置信度，默认为 false，可缺省
                - false：不返回字段识别结果的置信度
                - true：返回字段识别结果的置信度，包括字段识别结果中各字符置信度的平均值（average）和最小值（min）
     * @return {Promise} - 标准Promise对象
     */
    styleTrans(image, options) {

        let param = {};
        param.image = image;
        param.targetPath = STYLE_TRANS_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像风格转换
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {string} option - 转换风格
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   pdf_file_num 需要识别的PDF文件的对应页码，当 pdf_file 参数有效时，识别传入页码的对应页面内容，若不传入，则默认识别第 1 页
     *   probability 是否返回字段识别结果的置信度，默认为 false，可缺省
                - false：不返回字段识别结果的置信度
                - true：返回字段识别结果的置信度，包括字段识别结果中各字符置信度的平均值（average）和最小值（min）
     * @return {Promise} - 标准Promise对象
     */
    styleTransUrl(url, options) {

        let param = {};
        param.url = url;
        param.targetPath = STYLE_TRANS_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像清晰度增强
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    imageDefinitionEnhance(image) {

        let param = {};
        let options = {};
        param.image = image;
        param.targetPath = IMAGE_DEFINITION_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像清晰度增强
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    imageDefinitionEnhanceUrl(url) {

        let param = {};
        let options = {};
        param.url = url;
        param.targetPath = IMAGE_DEFINITION_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像去雾
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    dehaze(image) {

        let param = {};
        let options = {};
        param.image = image;
        param.targetPath = DEHAZE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像去雾
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    dehazeUrl(url) {

        let param = {};
        let options = {};
        param.url = url;
        param.targetPath = DEHAZE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 拉伸图像恢复
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    stretchRestore(image) {

        let param = {};
        let options = {};
        param.image = image;
        param.targetPath = STRETCH_RESTORE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 拉伸图像恢复
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    stretchRestoreUrl(url) {

        let param = {};
        let options = {};
        param.url = url;
        param.targetPath = STRETCH_RESTORE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像色彩增强
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    colorEnhance(image) {

        let param = {};
        let options = {};
        param.image = image;
        param.targetPath = COLOR_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像色彩增强
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    colorEnhanceUrl(url) {

        let param = {};
        let options = {};
        param.url = url;
        param.targetPath = COLOR_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 天空分割
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    skySeg(image) {

        let param = {};
        let options = {};
        param.image = image;
        param.targetPath = SKY_SEG_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 天空分割
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    skySegUrl(url) {

        let param = {};
        let options = {};
        param.url = url;
        param.targetPath = SKY_SEG_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 黑白图像上色
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    colourize(image, options) {

        let param = {};
        param.image = image;
        param.targetPath = COLOURIZE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 黑白图像上色
     *
     * @param {string} url - 图片完整URL路径
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    colourizeUrl(url, options) {

        let param = {};
        param.url = url;
        param.targetPath = COLOURIZE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像对比度增强
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    contrastEnhance(image) {

        let param = {};
        let options = {};
        param.image = image;
        param.targetPath = CONTRAST_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像对比度增强
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    contrastEnhanceUrl(url) {

        let param = {};
        let options = {};
        param.url = url;
        param.targetPath = CONTRAST_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像无损放大
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    imageQualityEnhance(image) {
        let param = {};
        let options = {};
        param.image = image;
        param.targetPath = IMAGE_QUALITY_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像无损放大
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    imageQualityEnhanceUrl(url) {
        let param = {};
        let options = {};
        param.url = url;
        param.targetPath = IMAGE_QUALITY_ENHANCE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人像动漫化
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type anime或者anime_mask。前者生成二次元动漫图，后者生成戴口罩的二次元动漫人像
     *   mask_id 在type参数填入anime_mask时生效，1～8之间的整数，用于指定所使用的口罩的编码。type参数没有填入anime_mask，
                或mask_id 为空时，生成不戴口罩的二次元动漫图。
     * @return {Promise} - 标准Promise对象
     */
    selfieAnime(image, options) {
        let param = {};
        param.image = image;
        param.targetPath = SELFIE_ANIME_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人像动漫化
     *
     * @param {string} url - 图片完整URL路径,URL长度不超过1024字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type anime或者anime_mask。前者生成二次元动漫图，后者生成戴口罩的二次元动漫人像
     *   mask_id 在type参数填入anime_mask时生效，1～8之间的整数，用于指定所使用的口罩的编码。type参数没有填入anime_mask，
                或mask_id 为空时，生成不戴口罩的二次元动漫图。
     * @return {Promise} - 标准Promise对象
     */
    selfieAnimeUrl(url, options) {
        let param = {};
        param.url = url;
        param.targetPath = SELFIE_ANIME_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

}

module.exports = AipImageProcess;

