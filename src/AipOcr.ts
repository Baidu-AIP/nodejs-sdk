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

import BaseClient from './client/baseClient';
import RequestInfo from './client/requestInfo';
import HttpClient from './http/httpClient';
import { merge } from './util/objectTools';

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
const TRAIN_TICKET_PATH = '/rest/2.0/ocr/v1/train_ticket';
const TAXI_RECEIPT_PATH = '/rest/2.0/ocr/v1/taxi_receipt';
const FORM_PATH = '/rest/2.0/ocr/v1/form';
const TABLE_RECOGNIZE_PATH = '/rest/2.0/solution/v1/form_ocr/request';
const TABLE_RESULT_GET_PATH = '/rest/2.0/solution/v1/form_ocr/get_request_result';
const VIN_CODE_PATH = '/rest/2.0/ocr/v1/vin_code';
const QUOTA_INVOICE_PATH = '/rest/2.0/ocr/v1/quota_invoice';
const HOUSEHOLD_REGISTER_PATH = '/rest/2.0/ocr/v1/household_register';
const HK_MACAU_EXITENTRYPERMIT_PATH = '/rest/2.0/ocr/v1/HK_Macau_exitentrypermit';
const TAIWAN_EXITENTRYPERMIT_PATH = '/rest/2.0/ocr/v1/taiwan_exitentrypermit';
const BIRTH_CERTIFICATE_PATH = '/rest/2.0/ocr/v1/birth_certificate';
const VEHICLE_INVOICE_PATH = '/rest/2.0/ocr/v1/vehicle_invoice';
const VEHICLE_CERTIFICATE_PATH = '/rest/2.0/ocr/v1/vehicle_certificate';
const INVOICE_PATH = '/rest/2.0/ocr/v1/invoice';
const AIR_TICKET_PATH = '/rest/2.0/ocr/v1/air_ticket';
const INSURANCE_DOCUMENTS_PATH = '/rest/2.0/ocr/v1/insurance_documents';
const VAT_INVOICE_PATH = '/rest/2.0/ocr/v1/vat_invoice';
const QRCODE_PATH = '/rest/2.0/ocr/v1/qrcode';
const NUMBERS_PATH = '/rest/2.0/ocr/v1/numbers';
const LOTTERY_PATH = '/rest/2.0/ocr/v1/lottery';
const PASSPORT_PATH = '/rest/2.0/ocr/v1/passport';
const BUSINESS_CARD_PATH = '/rest/2.0/ocr/v1/business_card';
const HANDWRITING_PATH = '/rest/2.0/ocr/v1/handwriting';
const CUSTOM_PATH = '/rest/2.0/solution/v1/iocr/recognise';

type LanguageType = 'CHN_ENG' | 'ENG' | 'POR' | 'FRE' | 'GER' | 'ITA' | 'SPA' | 'RUS' | 'JAP' | 'KOR';

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
export default class AipOcr extends BaseClient {
	constructor(appId: string, ak: string, sk: string) {
		super(appId, ak, sk);
	}
	private commonImpl(param: any) {
		const httpClient = new HttpClient();
		const apiUrl = param.targetPath;
		delete param.targetPath;
		const requestInfo = new RequestInfo(apiUrl,
			param, METHOD_POST);
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
	public generalBasic(image: string, options: { language_type: LanguageType; detect_direction: boolean; detect_language: boolean; probability: boolean; }) {
		const param = {
			image: image,
			targetPath: GENERAL_BASIC_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public generalBasicUrl(url: string, options: { language_type: LanguageType; detect_direction: boolean; detect_language: boolean; }) {
		const param = {
			url: url,
			targetPath: GENERAL_BASIC_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public accurateBasic(image: string, options: { detect_direction: boolean; probability: boolean; }) {
		const param = {
			image: image,
			targetPath: ACCURATE_BASIC_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public general(image: string, options: { recognize_granularity: 'small' | 'big'; language_type: LanguageType; detect_direction: boolean; detect_language: boolean; vertexes_location: boolean; probability: boolean; }) {
		const param = {
			image: image,
			targetPath: GENERAL_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public generalUrl(url: string, options: { recognize_granularity: 'small' | 'big'; language_type: LanguageType; detect_direction: boolean; detect_language: boolean; vertexes_location: boolean; probability: boolean; }) {
		const param = {
			url: url,
			targetPath: GENERAL_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public accurate(image: string, options: { recognize_granularity: 'small' | 'big'; detect_direction: boolean; vertexes_location: boolean; probability: boolean; }) {
		const param = {
			image: image,
			targetPath: ACCURATE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public generalEnhance(image: string, options: { language_type: LanguageType; detect_direction: boolean; detect_language: boolean; probability: boolean; }) {
		const param = {
			image: image,
			targetPath: GENERAL_ENHANCED_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public generalEnhanceUrl(url: string, options: { [key: string]: string; }) {
		const param = {
			url: url,
			targetPath: GENERAL_ENHANCED_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public webImage(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: WEB_IMAGE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public webImageUrl(url: string, options: { [key: string]: string; }) {
		const param = {
			url: url,
			targetPath: WEB_IMAGE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public idcard(image: string, idCardSide: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			id_card_side: idCardSide,
			targetPath: IDCARD_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 银行卡识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public bankcard(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: BANKCARD_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public drivingLicense(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: DRIVING_LICENSE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public vehicleLicense(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: VEHICLE_LICENSE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public licensePlate(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: LICENSE_PLATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 营业执照识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public businessLicense(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: BUSINESS_LICENSE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public receipt(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: RECEIPT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 火车票识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public trainTicket(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: TRAIN_TICKET_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 出租车票识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public taxiReceipt(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: TAXI_RECEIPT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 表格文字识别同步接口接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public form(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: FORM_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 表格文字识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public tableBegin(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: TABLE_RECOGNIZE_PATH
		};
		return this.commonImpl(merge(param, options)) as Promise<{ error_code: number; result: Array<{ request_id: string; }> }>;
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
	public tableGetresult(requestId: string, options: { [key: string]: string; }) {
		const param = {
			request_id: requestId,
			targetPath: TABLE_RESULT_GET_PATH
		};
		return this.commonImpl(merge(param, options)) as Promise<{ result: { ret_code: number; } }>;
	}

	/**
	 * VIN码识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public vinCode(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: VIN_CODE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 定额发票识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public quotaInvoice(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: QUOTA_INVOICE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 户口本识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public householdRegister(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: HOUSEHOLD_REGISTER_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 港澳通行证识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public HKMacauExitentrypermit(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: HK_MACAU_EXITENTRYPERMIT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 台湾通行证识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public taiwanExitentrypermit(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: TAIWAN_EXITENTRYPERMIT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 出生医学证明识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public birthCertificate(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: BIRTH_CERTIFICATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 机动车销售发票识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public vehicleInvoice(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: VEHICLE_INVOICE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 车辆合格证识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public vehicleCertificate(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: VEHICLE_CERTIFICATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 税务局通用机打发票识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   location 是否输出位置信息，true：输出位置信息，false：不输出位置信息，默认false
	 * @return {Promise} - 标准Promise对象
	 */
	public invoice(image: string, options: { location: boolean;[key: string]: string | boolean; }) {
		const param = {
			image: image,
			targetPath: INVOICE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 行程单识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   location 是否输出位置信息，true：输出位置信息，false：不输出位置信息，默认false
	 * @return {Promise} - 标准Promise对象
	 */
	public airTicket(image: string, options: { location: boolean;[key: string]: string | boolean; }) {
		const param = {
			image: image,
			targetPath: AIR_TICKET_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 保单识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   rkv_business 是否进行商业逻辑处理，rue：进行商业逻辑处理，false：不进行商业逻辑处理，默认true
	 * @return {Promise} - 标准Promise对象
	 */
	public insuranceDocuments(image: string, options: { rkv_business: boolean;[key: string]: string | boolean; }) {
		const param = {
			image: image,
			targetPath: INSURANCE_DOCUMENTS_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 增值税发票识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public vatInvoice(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: VAT_INVOICE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 二维码识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public qrcode(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: QRCODE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public numbers(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: NUMBERS_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public lottery(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: LOTTERY_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 护照识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public passport(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: PASSPORT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 名片识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public businessCard(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: BUSINESS_CARD_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public handwriting(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: HANDWRITING_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 自定义模板文字识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   templateSign 您在自定义文字识别平台制作的模板的ID
	 *   classifierId 分类器Id。这个参数和templateSign至少存在一个，优先使用templateSign。存在templateSign时，表示使用指定模板；如果没有templateSign而有classifierId，表示使用分类器去判断使用哪个模板
	 * @return {Promise} - 标准Promise对象
	 */
	public custom(image: string, options: { templateSign: string; classifierId: string;[key: string]: string; }) {
		const param = {
			image: image,
			targetPath: CUSTOM_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	public async tableRecorgnize(image: string, options: { [key: string]: string; }, timeout = 20000, interval = 2000) {
		const result = await this.tableBegin(image, {});
		if (result.error_code) {
			return result;
		}
		const id = result.result[0]['request_id'];
		const startTime = Date.now();
		return new Promise((resolve, reject) => {
			const pid = setInterval(async () => {
				if (Date.now() - startTime > timeout) {
					reject({ errorMsg: 'get result timeout', requestId: id });
					clearInterval(pid);
				} else {
					const result = await this.tableGetresult(id, options);
					if (result['result']['ret_code'] === 3) {
						clearInterval(pid);
						resolve(result);
					}
				}
			}, interval);
		})
	}

	/**
	 * 港澳通行证识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @return {Promise} - 标准Promise对象
	 */
	public HK_Macau_exitentrypermit(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: HK_MACAU_EXITENTRYPERMIT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 台湾通行证识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @return {Promise} - 标准Promise对象
	 */
	public taiwan_exitentrypermit(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: TAIWAN_EXITENTRYPERMIT_PATH
		};
		return this.commonImpl(merge(param, options));
	}
}
