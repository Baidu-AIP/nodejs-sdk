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
 * @file AipOcr.js
 * @author baidu aip
 */
const BaseClient = require("./client/baseClient");
const RequestInfo = require("./client/requestInfo");
const HttpClient = require("./http/httpClient");
const objectTools = require("./util/objectTools");
const METHOD_POST = 'POST';
const GENERAL_BASIC_PATH = '/rest/2.0/ocr/v1/general_basic';
const ACCURATE_BASIC_PATH = '/rest/2.0/ocr/v1/accurate_basic';
const GENERAL_PATH = '/rest/2.0/ocr/v1/general';
const ACCURATE_PATH = '/rest/2.0/ocr/v1/accurate';
const GENERAL_ENHANCED_PATH = '/rest/2.0/ocr/v1/general_enhanced';
const WEB_IMAGE_PATH = '/rest/2.0/ocr/v1/webimage';
const IDCARD_PATH = '/rest/2.0/ocr/v1/idcard';
const BANKCARD_PATH = '/rest/2.0/ocr/v1/bankcard';
const DRIVING_LICENSE_PATH = '/rest/2.0/ocr/v1/driving_license';
const VEHICLE_LICENSE_PATH = '/rest/2.0/ocr/v1/vehicle_license';
const LICENSE_PLATE_PATH = '/rest/2.0/ocr/v1/license_plate';
const BUSINESS_LICENSE_PATH = '/rest/2.0/ocr/v1/business_license';
const RECEIPT_PATH = '/rest/2.0/ocr/v1/receipt';
const FORM_PATH = '/rest/2.0/ocr/v1/form';
const TABLE_RECOGNIZE_PATH = '/rest/2.0/solution/v1/form_ocr/request';
const TABLE_RESULT_GET_PATH = '/rest/2.0/solution/v1/form_ocr/get_request_result';
const VAT_INVOICE_PATH = '/rest/2.0/ocr/v1/vat_invoice';
const QRCODE_PATH = '/rest/2.0/ocr/v1/qrcode';
const NUMBERS_PATH = '/rest/2.0/ocr/v1/numbers';
const LOTTERY_PATH = '/rest/2.0/ocr/v1/lottery';
const PASSPORT_PATH = '/rest/2.0/ocr/v1/passport';
const BUSINESS_CARD_PATH = '/rest/2.0/ocr/v1/business_card';
const HANDWRITING_PATH = '/rest/2.0/ocr/v1/handwriting';
const CUSTOM_PATH = '/rest/2.0/solution/v1/iocr/recognise';
/**
 * AipOcr类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipOcr extends BaseClient {
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl, param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }
    /**
     * 通用文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalBasic(image, options) {
        let param = {
            image: image,
            targetPath: GENERAL_BASIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用文字识别接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalBasicUrl(url, options) {
        let param = {
            url: url,
            targetPath: GENERAL_BASIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用文字识别（高精度版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    accurateBasic(image, options) {
        let param = {
            image: image,
            targetPath: ACCURATE_BASIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用文字识别（含位置信息版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   vertexes_location 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    general(image, options) {
        let param = {
            image: image,
            targetPath: GENERAL_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用文字识别（含位置信息版）接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   vertexes_location 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalUrl(url, options) {
        let param = {
            url: url,
            targetPath: GENERAL_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用文字识别（含位置高精度版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   vertexes_location 是否返回文字外接多边形顶点位置，不支持单字位置。默认为false
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    accurate(image, options) {
        let param = {
            image: image,
            targetPath: ACCURATE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用文字识别（含生僻字版）接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalEnhance(image, options) {
        let param = {
            image: image,
            targetPath: GENERAL_ENHANCED_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用文字识别（含生僻字版）接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   language_type 识别语言类型，默认为CHN_ENG。可选值包括：<br>- CHN_ENG：中英文混合；<br>- ENG：英文；<br>- POR：葡萄牙语；<br>- FRE：法语；<br>- GER：德语；<br>- ITA：意大利语；<br>- SPA：西班牙语；<br>- RUS：俄语；<br>- JAP：日语；<br>- KOR：韩语；
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     *   probability 是否返回识别结果中每一行的置信度
     * @return {Promise} - 标准Promise对象
     */
    generalEnhanceUrl(url, options) {
        let param = {
            url: url,
            targetPath: GENERAL_ENHANCED_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 网络图片文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     * @return {Promise} - 标准Promise对象
     */
    webImage(image, options) {
        let param = {
            image: image,
            targetPath: WEB_IMAGE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 网络图片文字识别接口
     *
     * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_language 是否检测语言，默认不检测。当前支持（中文、英语、日语、韩语）
     * @return {Promise} - 标准Promise对象
     */
    webImageUrl(url, options) {
        let param = {
            url: url,
            targetPath: WEB_IMAGE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 身份证识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} idCardSide - front：身份证含照片的一面；back：身份证带国徽的一面
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   detect_risk 是否开启身份证风险类型(身份证复印件、临时身份证、身份证翻拍、修改过的身份证)功能，默认不开启，即：false。可选值:true-开启；false-不开启
     * @return {Promise} - 标准Promise对象
     */
    idcard(image, idCardSide, options) {
        let param = {
            image: image,
            id_card_side: idCardSide,
            targetPath: IDCARD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 银行卡识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    bankcard(image, options) {
        let param = {
            image: image,
            targetPath: BANKCARD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 驾驶证识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     * @return {Promise} - 标准Promise对象
     */
    drivingLicense(image, options) {
        let param = {
            image: image,
            targetPath: DRIVING_LICENSE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 行驶证识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     *   accuracy normal 使用快速服务，1200ms左右时延；缺省或其它值使用高精度服务，1600ms左右时延
     * @return {Promise} - 标准Promise对象
     */
    vehicleLicense(image, options) {
        let param = {
            image: image,
            targetPath: VEHICLE_LICENSE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 车牌识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   multi_detect 是否检测多张车牌，默认为false，当置为true的时候可以对一张图片内的多张车牌进行识别
     * @return {Promise} - 标准Promise对象
     */
    licensePlate(image, options) {
        let param = {
            image: image,
            targetPath: LICENSE_PLATE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 营业执照识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    businessLicense(image, options) {
        let param = {
            image: image,
            targetPath: BUSINESS_LICENSE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 通用票据识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   probability 是否返回识别结果中每一行的置信度
     *   accuracy normal 使用快速服务，1200ms左右时延；缺省或其它值使用高精度服务，1600ms左右时延
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     * @return {Promise} - 标准Promise对象
     */
    receipt(image, options) {
        let param = {
            image: image,
            targetPath: RECEIPT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 表格文字识别同步接口接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    form(image, options) {
        let param = {
            image: image,
            targetPath: FORM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 表格文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    tableBegin(image, options) {
        let param = {
            image: image,
            targetPath: TABLE_RECOGNIZE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 表格识别结果接口
     *
     * @param {string} requestId - 发送表格文字识别请求时返回的request id
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   result_type 期望获取结果的类型，取值为“excel”时返回xls文件的地址，取值为“json”时返回json格式的字符串,默认为”excel”
     * @return {Promise} - 标准Promise对象
     */
    tableGetresult(requestId, options) {
        let param = {
            request_id: requestId,
            targetPath: TABLE_RESULT_GET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 增值税发票识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    vatInvoice(image, options) {
        let param = {
            image: image,
            targetPath: VAT_INVOICE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 二维码识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    qrcode(image, options) {
        let param = {
            image: image,
            targetPath: QRCODE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 数字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     *   detect_direction 是否检测图像朝向，默认不检测，即：false。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:<br>- true：检测朝向；<br>- false：不检测朝向。
     * @return {Promise} - 标准Promise对象
     */
    numbers(image, options) {
        let param = {
            image: image,
            targetPath: NUMBERS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 彩票识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     * @return {Promise} - 标准Promise对象
     */
    lottery(image, options) {
        let param = {
            image: image,
            targetPath: LOTTERY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 护照识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    passport(image, options) {
        let param = {
            image: image,
            targetPath: PASSPORT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 名片识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    businessCard(image, options) {
        let param = {
            image: image,
            targetPath: BUSINESS_CARD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 手写文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   recognize_granularity 是否定位单字符位置，big：不定位单字符位置，默认值；small：定位单字符位置
     * @return {Promise} - 标准Promise对象
     */
    handwriting(image, options) {
        let param = {
            image: image,
            targetPath: HANDWRITING_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 自定义模板文字识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} templateSign - 您在自定义文字识别平台制作的模板的ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    custom(image, templateSign, options) {
        let param = {
            image: image,
            templateSign: templateSign,
            targetPath: CUSTOM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    tableRecorgnize(image, type, timeout, interval) {
        let self = this;
        timeout = timeout || 20000;
        interval = interval || 2000;
        return this.tableBegin(image).then(function (result) {
            if (result.error_code) {
                return result;
            }
            let id = result.result[0]['request_id'];
            let pid = null;
            let startTime = Date.now();
            return new Promise(function (resolve, reject) {
                pid = setInterval(function () {
                    if (Date.now() - startTime > timeout) {
                        reject({ errorMsg: 'get result timeout', requestId: id });
                        clearInterval(pid);
                    }
                    else {
                        self.tableGetresult(id, type).then(function (result) {
                            if (result['result']['ret_code'] === 3) {
                                clearInterval(pid);
                                resolve(result);
                            }
                        });
                    }
                }, interval);
            });
        });
    }
}
exports.default = AipOcr;
// @ts-ignore
Object.assign(AipOcr, exports);
module.exports = AipOcr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlwT2NyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvQWlwT2NyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsa0RBQW1EO0FBRW5ELG9EQUFxRDtBQUVyRCxnREFBaUQ7QUFFakQsa0RBQW1EO0FBRW5ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUUzQixNQUFNLGtCQUFrQixHQUFHLGdDQUFnQyxDQUFDO0FBQzVELE1BQU0sbUJBQW1CLEdBQUcsaUNBQWlDLENBQUM7QUFDOUQsTUFBTSxZQUFZLEdBQUcsMEJBQTBCLENBQUM7QUFDaEQsTUFBTSxhQUFhLEdBQUcsMkJBQTJCLENBQUM7QUFDbEQsTUFBTSxxQkFBcUIsR0FBRyxtQ0FBbUMsQ0FBQztBQUNsRSxNQUFNLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztBQUNuRCxNQUFNLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQztBQUM5QyxNQUFNLGFBQWEsR0FBRywyQkFBMkIsQ0FBQztBQUNsRCxNQUFNLG9CQUFvQixHQUFHLGtDQUFrQyxDQUFDO0FBQ2hFLE1BQU0sb0JBQW9CLEdBQUcsa0NBQWtDLENBQUM7QUFDaEUsTUFBTSxrQkFBa0IsR0FBRyxnQ0FBZ0MsQ0FBQztBQUM1RCxNQUFNLHFCQUFxQixHQUFHLG1DQUFtQyxDQUFDO0FBQ2xFLE1BQU0sWUFBWSxHQUFHLDBCQUEwQixDQUFDO0FBQ2hELE1BQU0sU0FBUyxHQUFHLHVCQUF1QixDQUFDO0FBQzFDLE1BQU0sb0JBQW9CLEdBQUcsd0NBQXdDLENBQUM7QUFDdEUsTUFBTSxxQkFBcUIsR0FBRyxtREFBbUQsQ0FBQztBQUNsRixNQUFNLGdCQUFnQixHQUFHLDhCQUE4QixDQUFDO0FBQ3hELE1BQU0sV0FBVyxHQUFHLHlCQUF5QixDQUFDO0FBQzlDLE1BQU0sWUFBWSxHQUFHLDBCQUEwQixDQUFDO0FBQ2hELE1BQU0sWUFBWSxHQUFHLDBCQUEwQixDQUFD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QkFDL0MsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUNwQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDbkI7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7cUJBQ047Z0JBQ0wsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFzQ0Qsa0JBQWUsTUFBTSxDQUFBO0FBRXJCLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUUvQixpQkFBUyxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyBCYWlkdS5jb20sIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb25cbiAqIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEBmaWxlIEFpcE9jci5qc1xuICogQGF1dGhvciBiYWlkdSBhaXBcbiAqL1xuXG5pbXBvcnQgQmFzZUNsaWVudCA9IHJlcXVpcmUoJy4vY2xpZW50L2Jhc2VDbGllbnQnKTtcblxuaW1wb3J0IFJlcXVlc3RJbmZvID0gcmVxdWlyZSgnLi9jbGllbnQvcmVxdWVzdEluZm8nKTtcblxuaW1wb3J0IEh0dHBDbGllbnQgPSByZXF1aXJlKCcuL2h0dHAvaHR0cENsaWVudCcpO1xuXG5pbXBvcnQgb2JqZWN0VG9vbHMgPSByZXF1aXJlKCcuL3V0aWwvb2JqZWN0VG9vbHMnKTtcblxuY29uc3QgTUVUSE9EX1BPU1QgPSAnUE9TVCc7XG5cbmNvbnN0IEdFTkVSQUxfQkFTSUNfUEFUSCA9ICcvcmVzdC8yLjAvb2NyL3YxL2dlbmVyYWxfYmFzaWMnO1xuY29uc3QgQUNDVVJBVEVfQkFTSUNfUEFUSCA9ICcvcmVzdC8yLjAvb2NyL3YxL2FjY3VyYXRlX2Jhc2ljJztcbmNvbnN0IEdFTkVSQUxfUEFUSCA9ICcvcmVzdC8yLjAvb2NyL3YxL2dlbmVyYWwnO1xuY29uc3QgQUNDVVJBVEVfUEFUSCA9ICcvcmVzdC8yLjAvb2NyL3YxL2FjY3VyYXRlJztcbmNvbnN0IEdFTkVSQUxfRU5IQU5DRURfUEFUSCA9ICcvcmVzdC8yLjAvb2NyL3YxL2dlbmVyYWxfZW5oYW5jZWQnO1xuY29uc3QgV0VCX0lNQUdFX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS93ZWJpbWFnZSc7XG5jb25zdCBJRENBUkRfUEFUSCA9ICcvcmVzdC8yLjAvb2NyL3YxL2lkY2FyZCc7XG5jb25zdCBCQU5LQ0FSRF9QQVRIID0gJy9yZXN0LzIuMC9vY3IvdjEvYmFua2NhcmQnO1xuY29uc3QgRFJJVklOR19MSUNFTlNFX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS9kcml2aW5nX2xpY2Vuc2UnO1xuY29uc3QgVkVISUNMRV9MSUNFTlNFX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS92ZWhpY2xlX2xpY2Vuc2UnO1xuY29uc3QgTElDRU5TRV9QTEFURV9QQVRIID0gJy9yZXN0LzIuMC9vY3IvdjEvbGljZW5zZV9wbGF0ZSc7XG5jb25zdCBCVVNJTkVTU19MSUNFTlNFX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS9idXNpbmVzc19saWNlbnNlJztcbmNvbnN0IFJFQ0VJUFRfUEFUSCA9ICcvcmVzdC8yLjAvb2NyL3YxL3JlY2VpcHQnO1xuY29uc3QgRk9STV9QQVRIID0gJy9yZXN0LzIuMC9vY3IvdjEvZm9ybSc7XG5jb25zdCBUQUJMRV9SRUNPR05JWkVfUEFUSCA9ICcvcmVzdC8yLjAvc29sdXRpb24vdjEvZm9ybV9vY3IvcmVxdWVzdCc7XG5jb25zdCBUQUJMRV9SRVNVTFRfR0VUX1BBVEggPSAnL3Jlc3QvMi4wL3NvbHV0aW9uL3YxL2Zvcm1fb2NyL2dldF9yZXF1ZXN0X3Jlc3VsdCc7XG5jb25zdCBWQVRfSU5WT0lDRV9QQVRIID0gJy9yZXN0LzIuMC9vY3IvdjEvdmF0X2ludm9pY2UnO1xuY29uc3QgUVJDT0RFX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS9xcmNvZGUnO1xuY29uc3QgTlVNQkVSU19QQVRIID0gJy9yZXN0LzIuMC9vY3IvdjEvbnVtYmVycyc7XG5jb25zdCBMT1RURVJZX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS9sb3R0ZXJ5JztcbmNvbnN0IFBBU1NQT1JUX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS9wYXNzcG9ydCc7XG5jb25zdCBCVVNJTkVTU19DQVJEX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS9idXNpbmVzc19jYXJkJztcbmNvbnN0IEhBTkRXUklUSU5HX1BBVEggPSAnL3Jlc3QvMi4wL29jci92MS9oYW5kd3JpdGluZyc7XG5jb25zdCBDVVNUT01fUEFUSCA9ICcvcmVzdC8yLjAvc29sdXRpb24vdjEvaW9jci9yZWNvZ25pc2UnO1xuXG4vKipcbiAqIEFpcE9jcuexu1xuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQmFzZUNsaWVudFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwaWQgYXBwaWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gYWsgIGFjY2VzcyBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2sgIHNlY3VyaXR5IGtleS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFpcE9jciBleHRlbmRzIEJhc2VDbGllbnQge1xuICAgIGNvbW1vbkltcGw8VCA9IEFpcE9jci5JQWlwT2NyUmV0dXJuPihwYXJhbSkge1xuICAgICAgICBsZXQgaHR0cENsaWVudCA9IG5ldyBIdHRwQ2xpZW50PFQ+KCk7XG4gICAgICAgIGxldCBhcGlVcmwgPSBwYXJhbS50YXJnZXRQYXRoO1xuICAgICAgICBkZWxldGUgcGFyYW0udGFyZ2V0UGF0aDtcbiAgICAgICAgbGV0IHJlcXVlc3RJbmZvID0gbmV3IFJlcXVlc3RJbmZvKGFwaVVybCxcbiAgICAgICAgICAgIHBhcmFtLCBNRVRIT0RfUE9TVCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdChyZXF1ZXN0SW5mbywgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YCa55So5paH5a2X6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBsYW5ndWFnZV90eXBlIOivhuWIq+ivreiogOexu+Wei++8jOm7mOiupOS4ukNITl9FTkfjgILlj6/pgInlgLzljIXmi6zvvJo8YnI+LSBDSE5fRU5H77ya5Lit6Iux5paH5re35ZCI77ybPGJyPi0gRU5H77ya6Iux5paH77ybPGJyPi0gUE9S77ya6JGh6JCE54mZ6K+t77ybPGJyPi0gRlJF77ya5rOV6K+t77ybPGJyPi0gR0VS77ya5b636K+t77ybPGJyPi0gSVRB77ya5oSP5aSn5Yip6K+t77ybPGJyPi0gU1BB77ya6KW/54+t54mZ6K+t77ybPGJyPi0gUlVT77ya5L+E6K+t77ybPGJyPi0gSkFQ77ya5pel6K+t77ybPGJyPi0gS09S77ya6Z+p6K+t77ybXG4gICAgICogICBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgKiAgIGRldGVjdF9sYW5ndWFnZSDmmK/lkKbmo4DmtYvor63oqIDvvIzpu5jorqTkuI3mo4DmtYvjgILlvZPliY3mlK/mjIHvvIjkuK3mlofjgIHoi7Hor63jgIHml6Xor63jgIHpn6nor63vvIlcbiAgICAgKiAgIHByb2JhYmlsaXR5IOaYr+WQpui/lOWbnuivhuWIq+e7k+aenOS4reavj+S4gOihjOeahOe9ruS/oeW6plxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGdlbmVyYWxCYXNpYyhpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBHRU5FUkFMX0JBU0lDX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmueUqOaWh+Wtl+ivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIOWbvueJh+WujOaVtFVSTO+8jFVSTOmVv+W6puS4jei2hei/hzEwMjTlrZfoioLvvIxVUkzlr7nlupTnmoTlm77niYdiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI/vvIzlvZNpbWFnZeWtl+auteWtmOWcqOaXtnVybOWtl+auteWkseaViFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIGxhbmd1YWdlX3R5cGUg6K+G5Yir6K+t6KiA57G75Z6L77yM6buY6K6k5Li6Q0hOX0VOR+OAguWPr+mAieWAvOWMheaLrO+8mjxicj4tIENITl9FTkfvvJrkuK3oi7Hmlofmt7flkIjvvJs8YnI+LSBFTkfvvJroi7HmlofvvJs8YnI+LSBQT1LvvJrokaHokITniZnor63vvJs8YnI+LSBGUkXvvJrms5Xor63vvJs8YnI+LSBHRVLvvJrlvrfor63vvJs8YnI+LSBJVEHvvJrmhI/lpKfliKnor63vvJs8YnI+LSBTUEHvvJropb/nj63niZnor63vvJs8YnI+LSBSVVPvvJrkv4Tor63vvJs8YnI+LSBKQVDvvJrml6Xor63vvJs8YnI+LSBLT1LvvJrpn6nor63vvJtcbiAgICAgKiAgIGRldGVjdF9kaXJlY3Rpb24g5piv5ZCm5qOA5rWL5Zu+5YOP5pyd5ZCR77yM6buY6K6k5LiN5qOA5rWL77yM5Y2z77yaZmFsc2XjgILmnJ3lkJHmmK/mjIfovpPlhaXlm77lg4/mmK/mraPluLjmlrnlkJHjgIHpgIbml7bpkojml4vovaw5MC8xODAvMjcw5bqm44CC5Y+v6YCJ5YC85YyF5ousOjxicj4tIHRydWXvvJrmo4DmtYvmnJ3lkJHvvJs8YnI+LSBmYWxzZe+8muS4jeajgOa1i+acneWQkeOAglxuICAgICAqICAgZGV0ZWN0X2xhbmd1YWdlIOaYr+WQpuajgOa1i+ivreiogO+8jOm7mOiupOS4jeajgOa1i+OAguW9k+WJjeaUr+aMge+8iOS4reaWh+OAgeiLseivreOAgeaXpeivreOAgemfqeivre+8iVxuICAgICAqICAgcHJvYmFiaWxpdHkg5piv5ZCm6L+U5Zue6K+G5Yir57uT5p6c5Lit5q+P5LiA6KGM55qE572u5L+h5bqmXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZ2VuZXJhbEJhc2ljVXJsKHVybCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEdFTkVSQUxfQkFTSUNfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YCa55So5paH5a2X6K+G5Yir77yI6auY57K+5bqm54mI77yJ5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgKiAgIHByb2JhYmlsaXR5IOaYr+WQpui/lOWbnuivhuWIq+e7k+aenOS4reavj+S4gOihjOeahOe9ruS/oeW6plxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGFjY3VyYXRlQmFzaWMoaW1hZ2UsIG9wdGlvbnM/OiBBaXBPY3IuSUFpcE9jck9wdGlvbnNBY2N1cmF0ZUJhc2ljKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEFDQ1VSQVRFX0JBU0lDX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbDx7XG4gICAgICAgICAgICBsb2dfaWQ6IG51bWJlcixcblxuICAgICAgICAgICAgZGlyZWN0aW9uPzogbnVtYmVyLFxuXG4gICAgICAgICAgICB3b3Jkc19yZXN1bHRfbnVtOiBudW1iZXIsXG4gICAgICAgICAgICB3b3Jkc19yZXN1bHQ6IHtcbiAgICAgICAgICAgICAgICB3b3Jkczogc3RyaW5nLFxuICAgICAgICAgICAgICAgIHByb2JhYmlsaXR5Pzoge1xuICAgICAgICAgICAgICAgICAgICB2YXJpYW5jZTogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBhdmVyYWdlOiBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIG1pbjogbnVtYmVyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1bXSxcbiAgICAgICAgfT4ob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrnlKjmloflrZfor4bliKvvvIjlkKvkvY3nva7kv6Hmga/niYjvvInmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIHJlY29nbml6ZV9ncmFudWxhcml0eSDmmK/lkKblrprkvY3ljZXlrZfnrKbkvY3nva7vvIxiaWfvvJrkuI3lrprkvY3ljZXlrZfnrKbkvY3nva7vvIzpu5jorqTlgLzvvJtzbWFsbO+8muWumuS9jeWNleWtl+espuS9jee9rlxuICAgICAqICAgbGFuZ3VhZ2VfdHlwZSDor4bliKvor63oqIDnsbvlnovvvIzpu5jorqTkuLpDSE5fRU5H44CC5Y+v6YCJ5YC85YyF5ous77yaPGJyPi0gQ0hOX0VOR++8muS4reiLseaWh+a3t+WQiO+8mzxicj4tIEVOR++8muiLseaWh++8mzxicj4tIFBPUu+8muiRoeiQhOeJmeivre+8mzxicj4tIEZSRe+8muazleivre+8mzxicj4tIEdFUu+8muW+t+ivre+8mzxicj4tIElUQe+8muaEj+Wkp+WIqeivre+8mzxicj4tIFNQQe+8muilv+ePreeJmeivre+8mzxicj4tIFJVU++8muS/hOivre+8mzxicj4tIEpBUO+8muaXpeivre+8mzxicj4tIEtPUu+8mumfqeivre+8m1xuICAgICAqICAgZGV0ZWN0X2RpcmVjdGlvbiDmmK/lkKbmo4DmtYvlm77lg4/mnJ3lkJHvvIzpu5jorqTkuI3mo4DmtYvvvIzljbPvvJpmYWxzZeOAguacneWQkeaYr+aMh+i+k+WFpeWbvuWDj+aYr+ato+W4uOaWueWQkeOAgemAhuaXtumSiOaXi+i9rDkwLzE4MC8yNzDluqbjgILlj6/pgInlgLzljIXmi6w6PGJyPi0gdHJ1Ze+8muajgOa1i+acneWQke+8mzxicj4tIGZhbHNl77ya5LiN5qOA5rWL5pyd5ZCR44CCXG4gICAgICogICBkZXRlY3RfbGFuZ3VhZ2Ug5piv5ZCm5qOA5rWL6K+t6KiA77yM6buY6K6k5LiN5qOA5rWL44CC5b2T5YmN5pSv5oyB77yI5Lit5paH44CB6Iux6K+t44CB5pel6K+t44CB6Z+p6K+t77yJXG4gICAgICogICB2ZXJ0ZXhlc19sb2NhdGlvbiDmmK/lkKbov5Tlm57mloflrZflpJbmjqXlpJrovrnlvaLpobbngrnkvY3nva7vvIzkuI3mlK/mjIHljZXlrZfkvY3nva7jgILpu5jorqTkuLpmYWxzZVxuICAgICAqICAgcHJvYmFiaWxpdHkg5piv5ZCm6L+U5Zue6K+G5Yir57uT5p6c5Lit5q+P5LiA6KGM55qE572u5L+h5bqmXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZ2VuZXJhbChpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBHRU5FUkFMX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmueUqOaWh+Wtl+ivhuWIq++8iOWQq+S9jee9ruS/oeaBr+eJiO+8ieaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIOWbvueJh+WujOaVtFVSTO+8jFVSTOmVv+W6puS4jei2hei/hzEwMjTlrZfoioLvvIxVUkzlr7nlupTnmoTlm77niYdiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI/vvIzlvZNpbWFnZeWtl+auteWtmOWcqOaXtnVybOWtl+auteWkseaViFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIHJlY29nbml6ZV9ncmFudWxhcml0eSDmmK/lkKblrprkvY3ljZXlrZfnrKbkvY3nva7vvIxiaWfvvJrkuI3lrprkvY3ljZXlrZfnrKbkvY3nva7vvIzpu5jorqTlgLzvvJtzbWFsbO+8muWumuS9jeWNleWtl+espuS9jee9rlxuICAgICAqICAgbGFuZ3VhZ2VfdHlwZSDor4bliKvor63oqIDnsbvlnovvvIzpu5jorqTkuLpDSE5fRU5H44CC5Y+v6YCJ5YC85YyF5ous77yaPGJyPi0gQ0hOX0VOR++8muS4reiLseaWh+a3t+WQiO+8mzxicj4tIEVOR++8muiLseaWh++8mzxicj4tIFBPUu+8muiRoeiQhOeJmeivre+8mzxicj4tIEZSRe+8muazleivre+8mzxicj4tIEdFUu+8muW+t+ivre+8mzxicj4tIElUQe+8muaEj+Wkp+WIqeivre+8mzxicj4tIFNQQe+8muilv+ePreeJmeivre+8mzxicj4tIFJVU++8muS/hOivre+8mzxicj4tIEpBUO+8muaXpeivre+8mzxicj4tIEtPUu+8mumfqeivre+8m1xuICAgICAqICAgZGV0ZWN0X2RpcmVjdGlvbiDmmK/lkKbmo4DmtYvlm77lg4/mnJ3lkJHvvIzpu5jorqTkuI3mo4DmtYvvvIzljbPvvJpmYWxzZeOAguacneWQkeaYr+aMh+i+k+WFpeWbvuWDj+aYr+ato+W4uOaWueWQkeOAgemAhuaXtumSiOaXi+i9rDkwLzE4MC8yNzDluqbjgILlj6/pgInlgLzljIXmi6w6PGJyPi0gdHJ1Ze+8muajgOa1i+acneWQke+8mzxicj4tIGZhbHNl77ya5LiN5qOA5rWL5pyd5ZCR44CCXG4gICAgICogICBkZXRlY3RfbGFuZ3VhZ2Ug5piv5ZCm5qOA5rWL6K+t6KiA77yM6buY6K6k5LiN5qOA5rWL44CC5b2T5YmN5pSv5oyB77yI5Lit5paH44CB6Iux6K+t44CB5pel6K+t44CB6Z+p6K+t77yJXG4gICAgICogICB2ZXJ0ZXhlc19sb2NhdGlvbiDmmK/lkKbov5Tlm57mloflrZflpJbmjqXlpJrovrnlvaLpobbngrnkvY3nva7vvIzkuI3mlK/mjIHljZXlrZfkvY3nva7jgILpu5jorqTkuLpmYWxzZVxuICAgICAqICAgcHJvYmFiaWxpdHkg5piv5ZCm6L+U5Zue6K+G5Yir57uT5p6c5Lit5q+P5LiA6KGM55qE572u5L+h5bqmXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZ2VuZXJhbFVybCh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBHRU5FUkFMX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmueUqOaWh+Wtl+ivhuWIq++8iOWQq+S9jee9rumrmOeyvuW6pueJiO+8ieaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgcmVjb2duaXplX2dyYW51bGFyaXR5IOaYr+WQpuWumuS9jeWNleWtl+espuS9jee9ru+8jGJpZ++8muS4jeWumuS9jeWNleWtl+espuS9jee9ru+8jOm7mOiupOWAvO+8m3NtYWxs77ya5a6a5L2N5Y2V5a2X56ym5L2N572uXG4gICAgICogICBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgKiAgIHZlcnRleGVzX2xvY2F0aW9uIOaYr+WQpui/lOWbnuaWh+Wtl+WkluaOpeWkmui+ueW9oumhtueCueS9jee9ru+8jOS4jeaUr+aMgeWNleWtl+S9jee9ruOAgum7mOiupOS4umZhbHNlXG4gICAgICogICBwcm9iYWJpbGl0eSDmmK/lkKbov5Tlm57or4bliKvnu5PmnpzkuK3mr4/kuIDooYznmoTnva7kv6HluqZcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBhY2N1cmF0ZShpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBBQ0NVUkFURV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrnlKjmloflrZfor4bliKvvvIjlkKvnlJ/lg7vlrZfniYjvvInmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIGxhbmd1YWdlX3R5cGUg6K+G5Yir6K+t6KiA57G75Z6L77yM6buY6K6k5Li6Q0hOX0VOR+OAguWPr+mAieWAvOWMheaLrO+8mjxicj4tIENITl9FTkfvvJrkuK3oi7Hmlofmt7flkIjvvJs8YnI+LSBFTkfvvJroi7HmlofvvJs8YnI+LSBQT1LvvJrokaHokITniZnor63vvJs8YnI+LSBGUkXvvJrms5Xor63vvJs8YnI+LSBHRVLvvJrlvrfor63vvJs8YnI+LSBJVEHvvJrmhI/lpKfliKnor63vvJs8YnI+LSBTUEHvvJropb/nj63niZnor63vvJs8YnI+LSBSVVPvvJrkv4Tor63vvJs8YnI+LSBKQVDvvJrml6Xor63vvJs8YnI+LSBLT1LvvJrpn6nor63vvJtcbiAgICAgKiAgIGRldGVjdF9kaXJlY3Rpb24g5piv5ZCm5qOA5rWL5Zu+5YOP5pyd5ZCR77yM6buY6K6k5LiN5qOA5rWL77yM5Y2z77yaZmFsc2XjgILmnJ3lkJHmmK/mjIfovpPlhaXlm77lg4/mmK/mraPluLjmlrnlkJHjgIHpgIbml7bpkojml4vovaw5MC8xODAvMjcw5bqm44CC5Y+v6YCJ5YC85YyF5ousOjxicj4tIHRydWXvvJrmo4DmtYvmnJ3lkJHvvJs8YnI+LSBmYWxzZe+8muS4jeajgOa1i+acneWQkeOAglxuICAgICAqICAgZGV0ZWN0X2xhbmd1YWdlIOaYr+WQpuajgOa1i+ivreiogO+8jOm7mOiupOS4jeajgOa1i+OAguW9k+WJjeaUr+aMge+8iOS4reaWh+OAgeiLseivreOAgeaXpeivreOAgemfqeivre+8iVxuICAgICAqICAgcHJvYmFiaWxpdHkg5piv5ZCm6L+U5Zue6K+G5Yir57uT5p6c5Lit5q+P5LiA6KGM55qE572u5L+h5bqmXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZ2VuZXJhbEVuaGFuY2UoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogR0VORVJBTF9FTkhBTkNFRF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrnlKjmloflrZfor4bliKvvvIjlkKvnlJ/lg7vlrZfniYjvvInmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSDlm77niYflrozmlbRVUkzvvIxVUkzplb/luqbkuI3otoXov4cxMDI05a2X6IqC77yMVVJM5a+55bqU55qE5Zu+54mHYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byP77yM5b2TaW1hZ2XlrZfmrrXlrZjlnKjml7Z1cmzlrZfmrrXlpLHmlYhcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBsYW5ndWFnZV90eXBlIOivhuWIq+ivreiogOexu+Wei++8jOm7mOiupOS4ukNITl9FTkfjgILlj6/pgInlgLzljIXmi6zvvJo8YnI+LSBDSE5fRU5H77ya5Lit6Iux5paH5re35ZCI77ybPGJyPi0gRU5H77ya6Iux5paH77ybPGJyPi0gUE9S77ya6JGh6JCE54mZ6K+t77ybPGJyPi0gRlJF77ya5rOV6K+t77ybPGJyPi0gR0VS77ya5b636K+t77ybPGJyPi0gSVRB77ya5oSP5aSn5Yip6K+t77ybPGJyPi0gU1BB77ya6KW/54+t54mZ6K+t77ybPGJyPi0gUlVT77ya5L+E6K+t77ybPGJyPi0gSkFQ77ya5pel6K+t77ybPGJyPi0gS09S77ya6Z+p6K+t77ybXG4gICAgICogICBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgKiAgIGRldGVjdF9sYW5ndWFnZSDmmK/lkKbmo4DmtYvor63oqIDvvIzpu5jorqTkuI3mo4DmtYvjgILlvZPliY3mlK/mjIHvvIjkuK3mlofjgIHoi7Hor63jgIHml6Xor63jgIHpn6nor63vvIlcbiAgICAgKiAgIHByb2JhYmlsaXR5IOaYr+WQpui/lOWbnuivhuWIq+e7k+aenOS4reavj+S4gOihjOeahOe9ruS/oeW6plxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGdlbmVyYWxFbmhhbmNlVXJsKHVybCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEdFTkVSQUxfRU5IQU5DRURfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog572R57uc5Zu+54mH5paH5a2X6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgKiAgIGRldGVjdF9sYW5ndWFnZSDmmK/lkKbmo4DmtYvor63oqIDvvIzpu5jorqTkuI3mo4DmtYvjgILlvZPliY3mlK/mjIHvvIjkuK3mlofjgIHoi7Hor63jgIHml6Xor63jgIHpn6nor63vvIlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICB3ZWJJbWFnZShpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBXRUJfSU1BR0VfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog572R57uc5Zu+54mH5paH5a2X6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0g5Zu+54mH5a6M5pW0VVJM77yMVVJM6ZW/5bqm5LiN6LaF6L+HMTAyNOWtl+iKgu+8jFVSTOWvueW6lOeahOWbvueJh2Jhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j++8jOW9k2ltYWdl5a2X5q615a2Y5Zyo5pe2dXJs5a2X5q615aSx5pWIXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgZGV0ZWN0X2RpcmVjdGlvbiDmmK/lkKbmo4DmtYvlm77lg4/mnJ3lkJHvvIzpu5jorqTkuI3mo4DmtYvvvIzljbPvvJpmYWxzZeOAguacneWQkeaYr+aMh+i+k+WFpeWbvuWDj+aYr+ato+W4uOaWueWQkeOAgemAhuaXtumSiOaXi+i9rDkwLzE4MC8yNzDluqbjgILlj6/pgInlgLzljIXmi6w6PGJyPi0gdHJ1Ze+8muajgOa1i+acneWQke+8mzxicj4tIGZhbHNl77ya5LiN5qOA5rWL5pyd5ZCR44CCXG4gICAgICogICBkZXRlY3RfbGFuZ3VhZ2Ug5piv5ZCm5qOA5rWL6K+t6KiA77yM6buY6K6k5LiN5qOA5rWL44CC5b2T5YmN5pSv5oyB77yI5Lit5paH44CB6Iux6K+t44CB5pel6K+t44CB6Z+p6K+t77yJXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgd2ViSW1hZ2VVcmwodXJsLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogV0VCX0lNQUdFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi6q+S7veivgeivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkQ2FyZFNpZGUgLSBmcm9udO+8mui6q+S7veivgeWQq+eFp+eJh+eahOS4gOmdou+8m2JhY2vvvJrouqvku73or4HluKblm73lvr3nmoTkuIDpnaJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgKiAgIGRldGVjdF9yaXNrIOaYr+WQpuW8gOWQr+i6q+S7veivgemjjumZqeexu+Weiyjouqvku73or4HlpI3ljbDku7bjgIHkuLTml7bouqvku73or4HjgIHouqvku73or4Hnv7vmi43jgIHkv67mlLnov4fnmoTouqvku73or4Ep5Yqf6IO977yM6buY6K6k5LiN5byA5ZCv77yM5Y2z77yaZmFsc2XjgILlj6/pgInlgLw6dHJ1ZS3lvIDlkK/vvJtmYWxzZS3kuI3lvIDlkK9cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBpZGNhcmQoaW1hZ2UsIGlkQ2FyZFNpZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgaWRfY2FyZF9zaWRlOiBpZENhcmRTaWRlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogSURDQVJEX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmTtuihjOWNoeivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGJhbmtjYXJkKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEJBTktDQVJEX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmpvumptuivgeivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgZGV0ZWN0X2RpcmVjdGlvbiDmmK/lkKbmo4DmtYvlm77lg4/mnJ3lkJHvvIzpu5jorqTkuI3mo4DmtYvvvIzljbPvvJpmYWxzZeOAguacneWQkeaYr+aMh+i+k+WFpeWbvuWDj+aYr+ato+W4uOaWueWQkeOAgemAhuaXtumSiOaXi+i9rDkwLzE4MC8yNzDluqbjgILlj6/pgInlgLzljIXmi6w6PGJyPi0gdHJ1Ze+8muajgOa1i+acneWQke+8mzxicj4tIGZhbHNl77ya5LiN5qOA5rWL5pyd5ZCR44CCXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZHJpdmluZ0xpY2Vuc2UoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogRFJJVklOR19MSUNFTlNFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOihjOmptuivgeivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgZGV0ZWN0X2RpcmVjdGlvbiDmmK/lkKbmo4DmtYvlm77lg4/mnJ3lkJHvvIzpu5jorqTkuI3mo4DmtYvvvIzljbPvvJpmYWxzZeOAguacneWQkeaYr+aMh+i+k+WFpeWbvuWDj+aYr+ato+W4uOaWueWQkeOAgemAhuaXtumSiOaXi+i9rDkwLzE4MC8yNzDluqbjgILlj6/pgInlgLzljIXmi6w6PGJyPi0gdHJ1Ze+8muajgOa1i+acneWQke+8mzxicj4tIGZhbHNl77ya5LiN5qOA5rWL5pyd5ZCR44CCXG4gICAgICogICBhY2N1cmFjeSBub3JtYWwg5L2/55So5b+r6YCf5pyN5Yqh77yMMTIwMG1z5bem5Y+z5pe25bu277yb57y655yB5oiW5YW25a6D5YC85L2/55So6auY57K+5bqm5pyN5Yqh77yMMTYwMG1z5bem5Y+z5pe25bu2XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgdmVoaWNsZUxpY2Vuc2UoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogVkVISUNMRV9MSUNFTlNFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOi9pueJjOivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgbXVsdGlfZGV0ZWN0IOaYr+WQpuajgOa1i+WkmuW8oOi9pueJjO+8jOm7mOiupOS4umZhbHNl77yM5b2T572u5Li6dHJ1ZeeahOaXtuWAmeWPr+S7peWvueS4gOW8oOWbvueJh+WGheeahOWkmuW8oOi9pueJjOi/m+ihjOivhuWIq1xuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGxpY2Vuc2VQbGF0ZShpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBMSUNFTlNFX1BMQVRFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiQpeS4muaJp+eFp+ivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGJ1c2luZXNzTGljZW5zZShpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBCVVNJTkVTU19MSUNFTlNFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmueUqOelqOaNruivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgcmVjb2duaXplX2dyYW51bGFyaXR5IOaYr+WQpuWumuS9jeWNleWtl+espuS9jee9ru+8jGJpZ++8muS4jeWumuS9jeWNleWtl+espuS9jee9ru+8jOm7mOiupOWAvO+8m3NtYWxs77ya5a6a5L2N5Y2V5a2X56ym5L2N572uXG4gICAgICogICBwcm9iYWJpbGl0eSDmmK/lkKbov5Tlm57or4bliKvnu5PmnpzkuK3mr4/kuIDooYznmoTnva7kv6HluqZcbiAgICAgKiAgIGFjY3VyYWN5IG5vcm1hbCDkvb/nlKjlv6vpgJ/mnI3liqHvvIwxMjAwbXPlt6blj7Pml7blu7bvvJvnvLrnnIHmiJblhbblroPlgLzkvb/nlKjpq5jnsr7luqbmnI3liqHvvIwxNjAwbXPlt6blj7Pml7blu7ZcbiAgICAgKiAgIGRldGVjdF9kaXJlY3Rpb24g5piv5ZCm5qOA5rWL5Zu+5YOP5pyd5ZCR77yM6buY6K6k5LiN5qOA5rWL77yM5Y2z77yaZmFsc2XjgILmnJ3lkJHmmK/mjIfovpPlhaXlm77lg4/mmK/mraPluLjmlrnlkJHjgIHpgIbml7bpkojml4vovaw5MC8xODAvMjcw5bqm44CC5Y+v6YCJ5YC85YyF5ousOjxicj4tIHRydWXvvJrmo4DmtYvmnJ3lkJHvvJs8YnI+LSBmYWxzZe+8muS4jeajgOa1i+acneWQkeOAglxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHJlY2VpcHQoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogUkVDRUlQVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDooajmoLzmloflrZfor4bliKvlkIzmraXmjqXlj6PmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBmb3JtKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEZPUk1fUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6KGo5qC85paH5a2X6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgdGFibGVCZWdpbihpbWFnZSwgb3B0aW9ucz8pIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogVEFCTEVfUkVDT0dOSVpFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOihqOagvOivhuWIq+e7k+aenOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RJZCAtIOWPkemAgeihqOagvOaWh+Wtl+ivhuWIq+ivt+axguaXtui/lOWbnueahHJlcXVlc3QgaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICByZXN1bHRfdHlwZSDmnJ/mnJvojrflj5bnu5PmnpznmoTnsbvlnovvvIzlj5blgLzkuLrigJxleGNlbOKAneaXtui/lOWbnnhsc+aWh+S7tueahOWcsOWdgO+8jOWPluWAvOS4uuKAnGpzb27igJ3ml7bov5Tlm55qc29u5qC85byP55qE5a2X56ym5LiyLOm7mOiupOS4uuKAnWV4Y2Vs4oCdXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgdGFibGVHZXRyZXN1bHQocmVxdWVzdElkLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIHJlcXVlc3RfaWQ6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFRBQkxFX1JFU1VMVF9HRVRfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aKe5YC856iO5Y+R56Wo6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgdmF0SW52b2ljZShpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBWQVRfSU5WT0lDRV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkuoznu7TnoIHor4bliKvmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBxcmNvZGUoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogUVJDT0RFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaVsOWtl+ivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgcmVjb2duaXplX2dyYW51bGFyaXR5IOaYr+WQpuWumuS9jeWNleWtl+espuS9jee9ru+8jGJpZ++8muS4jeWumuS9jeWNleWtl+espuS9jee9ru+8jOm7mOiupOWAvO+8m3NtYWxs77ya5a6a5L2N5Y2V5a2X56ym5L2N572uXG4gICAgICogICBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBudW1iZXJzKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IE5VTUJFUlNfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5b2p56Wo6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICByZWNvZ25pemVfZ3JhbnVsYXJpdHkg5piv5ZCm5a6a5L2N5Y2V5a2X56ym5L2N572u77yMYmln77ya5LiN5a6a5L2N5Y2V5a2X56ym5L2N572u77yM6buY6K6k5YC877ybc21hbGzvvJrlrprkvY3ljZXlrZfnrKbkvY3nva5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBsb3R0ZXJ5KGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IExPVFRFUllfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5oqk54Wn6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgcGFzc3BvcnQoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogUEFTU1BPUlRfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ZCN54mH6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgYnVzaW5lc3NDYXJkKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEJVU0lORVNTX0NBUkRfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omL5YaZ5paH5a2X6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICByZWNvZ25pemVfZ3JhbnVsYXJpdHkg5piv5ZCm5a6a5L2N5Y2V5a2X56ym5L2N572u77yMYmln77ya5LiN5a6a5L2N5Y2V5a2X56ym5L2N572u77yM6buY6K6k5YC877ybc21hbGzvvJrlrprkvY3ljZXlrZfnrKbkvY3nva5cbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBoYW5kd3JpdGluZyhpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBIQU5EV1JJVElOR19QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDoh6rlrprkuYnmqKHmnb/mloflrZfor4bliKvmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZVNpZ24gLSDmgqjlnKjoh6rlrprkuYnmloflrZfor4bliKvlubPlj7DliLbkvZznmoTmqKHmnb/nmoRJRFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBjdXN0b20oaW1hZ2UsIHRlbXBsYXRlU2lnbiwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0ZW1wbGF0ZVNpZ246IHRlbXBsYXRlU2lnbixcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IENVU1RPTV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG4gICAgdGFibGVSZWNvcmduaXplKGltYWdlLCB0eXBlLCB0aW1lb3V0LCBpbnRlcnZhbCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRpbWVvdXQgPSB0aW1lb3V0IHx8IDIwMDAwO1xuICAgICAgICBpbnRlcnZhbCA9IGludGVydmFsIHx8IDIwMDA7XG4gICAgICAgIHJldHVybiB0aGlzLnRhYmxlQmVnaW4oaW1hZ2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yX2NvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGlkID0gcmVzdWx0LnJlc3VsdFswXVsncmVxdWVzdF9pZCddO1xuICAgICAgICAgICAgbGV0IHBpZCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBwaWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gc3RhcnRUaW1lID4gdGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHtlcnJvck1zZzogJ2dldCByZXN1bHQgdGltZW91dCcsIHJlcXVlc3RJZDogaWR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudGFibGVHZXRyZXN1bHQoaWQsIHR5cGUpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbJ3Jlc3VsdCddWydyZXRfY29kZSddID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocGlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIEFpcE9jclxue1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFpcE9jclJldHVyblJlc3VsdFRhYmxlIHtcbiAgICAgICAgW2k6IG51bWJlcl06IHtcbiAgICAgICAgICAgIHJlcXVlc3RfaWQ/XG4gICAgICAgIH0sXG4gICAgICAgIHJldF9jb2RlP1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFpcE9jclJldHVybiB7XG4gICAgICAgIFtrOiBzdHJpbmddOiBhbnk7XG5cbiAgICAgICAgZXJyb3JfY29kZT9cbiAgICAgICAgcmVzdWx0PzogYW55IHwgSUFpcE9jclJldHVyblJlc3VsdFRhYmxlO1xuXG4gICAgICAgIGxvZ19pZDogbnVtYmVyLFxuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFpcE9jck9wdGlvbnMge1xuICAgICAgICBbazogc3RyaW5nXTogYW55O1xuICAgIH1cblxuICAgIGV4cG9ydCB0eXBlIElCb29sZWFuID0gYm9vbGVhbiB8ICd0cnVlJyB8ICdmYWxzZSc7XG5cbiAgICBleHBvcnQgdHlwZSBJQWlwT2NyT3B0aW9uc0FjY3VyYXRlQmFzaWMgPSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZXRlY3RfZGlyZWN0aW9uIOaYr+WQpuajgOa1i+WbvuWDj+acneWQke+8jOm7mOiupOS4jeajgOa1i++8jOWNs++8mmZhbHNl44CC5pyd5ZCR5piv5oyH6L6T5YWl5Zu+5YOP5piv5q2j5bi45pa55ZCR44CB6YCG5pe26ZKI5peL6L2sOTAvMTgwLzI3MOW6puOAguWPr+mAieWAvOWMheaLrDo8YnI+LSB0cnVl77ya5qOA5rWL5pyd5ZCR77ybPGJyPi0gZmFsc2XvvJrkuI3mo4DmtYvmnJ3lkJHjgIJcbiAgICAgICAgICovXG4gICAgICAgIGRldGVjdF9kaXJlY3Rpb24/OiBJQm9vbGVhbixcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHByb2JhYmlsaXR5IOaYr+WQpui/lOWbnuivhuWIq+e7k+aenOS4reavj+S4gOihjOeahOe9ruS/oeW6plxuICAgICAgICAgKi9cbiAgICAgICAgcHJvYmFiaWxpdHk/OiBJQm9vbGVhbixcbiAgICB9ICYgSUFpcE9jck9wdGlvbnNcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWlwT2NyXG5cbi8vIEB0cy1pZ25vcmVcbk9iamVjdC5hc3NpZ24oQWlwT2NyLCBleHBvcnRzKTtcbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCA9IEFpcE9jcjtcbiJdfQ==