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

import BaseClient from './client/baseClient';
import RequestInfo from './client/requestInfo';
import HttpClient from './http/httpClient';
import { merge } from './util/objectTools';

const METHOD_POST = 'POST';

const ADVANCED_GENERAL_PATH = '/rest/2.0/image-classify/v2/advanced_general';
const DISH_DETECT_PATH = '/rest/2.0/image-classify/v2/dish';
const CAR_DETECT_PATH = '/rest/2.0/image-classify/v1/car';
const LOGO_SEARCH_PATH = '/rest/2.0/image-classify/v2/logo';
const LOGO_ADD_PATH = '/rest/2.0/realtime_search/v1/logo/add';
const LOGO_DELETE_PATH = '/rest/2.0/realtime_search/v1/logo/delete';
const ANIMAL_DETECT_PATH = '/rest/2.0/image-classify/v1/animal';
const PLANT_DETECT_PATH = '/rest/2.0/image-classify/v1/plant';
const OBJECT_DETECT_PATH = '/rest/2.0/image-classify/v1/object_detect';
const LANDMARK_PATH = '/rest/2.0/image-classify/v1/landmark';
const FLOWER_PATH = '/rest/2.0/image-classify/v1/flower';
const INGREDIENT_PATH = '/rest/2.0/image-classify/v1/classify/ingredient';
const REDWINE_PATH = '/rest/2.0/image-classify/v1/redwine';
const CURRENCY_PATH = '/rest/2.0/image-classify/v1/currency';


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
export default class AipImageClassify extends BaseClient {
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
	 * 通用物体识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   baike_num 返回百科信息的结果数，默认不返回
	 * @return {Promise} - 标准Promise对象
	 */
	public advancedGeneral(image: string, options: { baike_num: number; }) {
		const param = {
			image,
			targetPath: ADVANCED_GENERAL_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 菜品识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   top_num 返回预测得分top结果数，默认为5
	 *   filter_threshold 默认0.95，可以通过该参数调节识别效果，降低非菜识别率.
	 *   baike_num 返回百科信息的结果数，默认不返回
	 * @return {Promise} - 标准Promise对象
	 */
	public dishDetect(image: string, options: { top_num: number; filter_threshold: number; }) {
		const param = {
			image: image,
			targetPath: DISH_DETECT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 车辆识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   top_num 返回预测得分top结果数，默认为5
	 *   baike_num 返回百科信息的结果数，默认不返回
	 * @return {Promise} - 标准Promise对象
	 */
	public carDetect(image: string, options: { top_num: number; baike_num: number; }) {
		const param = {
			image: image,
			targetPath: CAR_DETECT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * logo商标识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   custom_lib 是否只使用自定义logo库的结果，默认false：返回自定义库+默认库的识别结果
	 * @return {Promise} - 标准Promise对象
	 */
	public logoSearch(image: string, options: { custom_lib: boolean; }) {
		const param = {
			image: image,
			targetPath: LOGO_SEARCH_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * logo商标识别—添加接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {string} brief - brief，检索时带回。此处要传对应的name与code字段，name长度小于100B，code长度小于150B
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public logoAdd(image: string, brief: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			brief: brief,
			targetPath: LOGO_ADD_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * logo商标识别—删除接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public logoDeleteByImage(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: LOGO_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * logo商标识别—删除接口
	 *
	 * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public logoDeleteBySign(contSign: string, options: { [key: string]: string; }) {
		const param = {
			cont_sign: contSign,
			targetPath: LOGO_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 动物识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   top_num 返回预测得分top结果数，默认为6
	 *   baike_num 返回百科信息的结果数，默认不返回
	 * @return {Promise} - 标准Promise对象
	 */
	public animalDetect(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: ANIMAL_DETECT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 植物识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   baike_num 返回百科信息的结果数，默认不返回
	 * @return {Promise} - 标准Promise对象
	 */
	public plantDetect(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: PLANT_DETECT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 图像主体检测接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   with_face 如果检测主体是人，主体区域是否带上人脸部分，0-不带人脸区域，其他-带人脸区域，裁剪类需求推荐带人脸，检索/识别类需求推荐不带人脸。默认取1，带人脸。
	 * @return {Promise} - 标准Promise对象
	 */
	public objectDetect(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: OBJECT_DETECT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 地标识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public landmark(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: LANDMARK_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 花卉识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   top_num 返回预测得分top结果数，默认为5
	 *   baike_num 返回百科信息的结果数，默认不返回
	 * @return {Promise} - 标准Promise对象
	 */
	public flower(image: string, options: { [key: string]: string; }) {
		let param = {
			image: image,
			targetPath: FLOWER_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 食材识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   top_num 返回预测得分top结果数，如果为空或小于等于0默认为5；如果大于20默认20
	 * @return {Promise} - 标准Promise对象
	 */
	public ingredient(image: string, options: { [key: string]: string; }) {
		let param = {
			image: image,
			targetPath: INGREDIENT_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 红酒识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public redwine(image: string, options: { [key: string]: string; }) {
		let param = {
			image: image,
			targetPath: REDWINE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 货币识别接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public currency(image: string, options: { [key: string]: string; }) {
		let param = {
			image: image,
			targetPath: CURRENCY_PATH
		};
		return this.commonImpl(merge(param, options));
	}
}
