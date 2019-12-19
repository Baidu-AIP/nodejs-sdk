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

import BaseClient from './client/baseClient';
import RequestInfo from './client/requestInfo';
import HttpClient from './http/httpClient';
import { merge } from './util/objectTools';

const METHOD_POST = 'POST';

const SAME_HQ_ADD_PATH = '/rest/2.0/realtime_search/same_hq/add';
const SAME_HQ_SEARCH_PATH = '/rest/2.0/realtime_search/same_hq/search';
const SAME_HQ_UPDATE_PATH = '/rest/2.0/realtime_search/same_hq/update';
const SAME_HQ_DELETE_PATH = '/rest/2.0/realtime_search/same_hq/delete';
const SIMILAR_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/add';
const SIMILAR_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/search';
const SIMILAR_UPDATE_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/update';
const SIMILAR_DELETE_PATH = '/rest/2.0/image-classify/v1/realtime_search/similar/delete';
const PRODUCT_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/add';
const PRODUCT_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/search';
const PRODUCT_UPDATE_PATH = '/rest/2.0/image-classify/v1/realtime_search/product/update';
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
export default class AipImageSearch extends BaseClient {
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
	 * 相同图检索—入库接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 检索时原样带回,最长256B。
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqAdd(image: string, options: { brief: string; tags: string; }) {
		const param = {
			image,
			targetPath: SAME_HQ_ADD_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—入库接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 检索时原样带回,最长256B。
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqAddUrl(url: string, options: { brief: string; tags: string; }) {
		const param = {
			url: url,
			targetPath: SAME_HQ_ADD_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public sameHqSearch(image: string, options: { tags: string; tag_logic: 0 | 1; pn: number; rn: number; }) {
		const param = {
			image,
			targetPath: SAME_HQ_SEARCH_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—检索接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 *   tag_logic 检索时tag之间的逻辑， 0：逻辑and，1：逻辑or
	 *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
	 *   rn 分页功能，截取条数，例：250
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqSearchUrl(url: string, options: { tags: string; tag_logic: 0 | 1; pn: number; rn: number; }) {
		const param = {
			url: url,
			targetPath: SAME_HQ_SEARCH_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—更新接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqUpdate(image: string, options: { brief: string; tags: string; }) {
		const param = {
			image,
			targetPath: SAME_HQ_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—更新接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqUpdateUrl(url: string, options: { brief: string; tags: string; }) {
		const param = {
			url: url,
			targetPath: SAME_HQ_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—更新接口
	 *
	 * @param {string} contSign - 图片签名
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqUpdateContSign(contSign: string, options: { brief: string; tags: string; }) {
		const param = {
			cont_sign: contSign,
			targetPath: SAME_HQ_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—删除接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqDeleteByImage(image: string, options: { [key: string]: string; }) {
		const param = {
			image,
			targetPath: SAME_HQ_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—删除接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqDeleteByUrl(url: string, options: { [key: string]: string; }) {
		const param = {
			url: url,
			targetPath: SAME_HQ_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相同图检索—删除接口
	 *
	 * @param {string} contSign - 图片签名
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public sameHqDeleteBySign(contSign: string, options: { [key: string]: string; }) {
		const param = {
			cont_sign: contSign,
			targetPath: SAME_HQ_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public similarAdd(image: string, options: { [key: string]: string; }) {
		const param = {
			image,
			targetPath: SIMILAR_ADD_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—入库接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 检索时原样带回,最长256B。
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public similarAddUrl(url: string, options: { [key: string]: string; }) {
		const param = {
			url: url,
			targetPath: SIMILAR_ADD_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public similarSearch(image: string, options: { tags: string; tag_logic: 0 | 1; pn: number; rn: number; }) {
		const param = {
			image,
			targetPath: SIMILAR_SEARCH_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—检索接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 *   tag_logic 检索时tag之间的逻辑， 0：逻辑and，1：逻辑or
	 *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
	 *   rn 分页功能，截取条数，例：250
	 * @return {Promise} - 标准Promise对象
	 */
	public similarSearchUrl(url: string, options: { tags: string; tag_logic: 0 | 1; pn: number; rn: number; }) {
		const param = {
			url: url,
			targetPath: SIMILAR_SEARCH_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—更新接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public similarUpdate(image: string, options: { brief: string; tags: string; }) {
		const param = {
			image,
			targetPath: SIMILAR_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—更新接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public similarUpdateUrl(url: string, options: { brief: string; tags: string; }) {
		const param = {
			url: url,
			targetPath: SIMILAR_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—更新接口
	 *
	 * @param {string} contSign - 图片签名
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   tags 1 - 65535范围内的整数，tag间以逗号分隔，最多2个tag。样例："100,11" ；检索时可圈定分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public similarUpdateContSign(contSign: string, options: { brief: string; tags: string; }) {
		const param = {
			cont_sign: contSign,
			targetPath: SIMILAR_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—删除接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public similarDeleteByImage(image: string, options: { [key: string]: string; }) {
		const param = {
			image,
			targetPath: SIMILAR_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—删除接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public similarDeleteByUrl(url: string, options: { [key: string]: string; }) {
		const param = {
			url: url,
			targetPath: SIMILAR_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 相似图检索—删除接口
	 *
	 * @param {string} contSign - 图片签名
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public similarDeleteBySign(contSign: string, options: { [key: string]: string; }) {
		const param = {
			cont_sign: contSign,
			targetPath: SIMILAR_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public productAdd(image: string, options: { brief: string; class_id1: string; class_id2: string;[key: string]: string; }) {
		const param = {
			image,
			targetPath: PRODUCT_ADD_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—入库接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 检索时原样带回,最长256B。**请注意，检索接口不返回原图，仅反馈当前填写的brief信息，所以调用该入库接口时，brief信息请尽量填写可关联至本地图库的图片id或者图片url、图片名称等信息**
	 *   class_id1 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
	 *   class_id2 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
	 * @return {Promise} - 标准Promise对象
	 */
	public productAddUrl(url: string, options: { brief: string; class_id1: string; class_id2: string;[key: string]: string; }) {
		const param = {
			url: url,
			targetPath: PRODUCT_ADD_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public productSearch(image: string, options: { class_id1: string; class_id2: string; pn: number; rn: number; }) {
		const param = {
			image,
			targetPath: PRODUCT_SEARCH_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—检索接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   class_id1 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
	 *   class_id2 商品分类维度1，支持1-60范围内的整数。检索时可圈定该分类维度进行检索
	 *   pn 分页功能，起始位置，例：0。未指定分页时，默认返回前300个结果；接口返回数量最大限制1000条，例如：起始位置为900，截取条数500条，接口也只返回第900 - 1000条的结果，共计100条
	 *   rn 分页功能，截取条数，例：250
	 * @return {Promise} - 标准Promise对象
	 */
	public productSearchUrl(url: string, options: { class_id1: string; class_id2: string; pn: number; rn: number; }) {
		const param = {
			url: url,
			targetPath: PRODUCT_SEARCH_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—更新接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   class_id1 更新的商品分类1，支持1-60范围内的整数。
	 *   class_id2 更新的商品分类2，支持1-60范围内的整数。
	 * @return {Promise} - 标准Promise对象
	 */
	public productUpdate(image: string, options: { brief: string; class_id1: string; class_id2: string; }) {
		const param = {
			image,
			targetPath: PRODUCT_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—更新接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   class_id1 更新的商品分类1，支持1-60范围内的整数。
	 *   class_id2 更新的商品分类2，支持1-60范围内的整数。
	 * @return {Promise} - 标准Promise对象
	 */
	public productUpdateUrl(url: string, options: { [key: string]: string; }) {
		const param = {
			url: url,
			targetPath: PRODUCT_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—更新接口
	 *
	 * @param {string} contSign - 图片签名
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   brief 更新的摘要信息，最长256B。样例：{"name":"周杰伦", "id":"666"}
	 *   class_id1 更新的商品分类1，支持1-60范围内的整数。
	 *   class_id2 更新的商品分类2，支持1-60范围内的整数。
	 * @return {Promise} - 标准Promise对象
	 */
	public productUpdateContSign(contSign: string, options: { [key: string]: string; }) {
		const param = {
			cont_sign: contSign,
			targetPath: PRODUCT_UPDATE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—删除接口
	 *
	 * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public productDeleteByImage(image: string, options: { [key: string]: string; }) {
		const param = {
			image,
			targetPath: PRODUCT_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—删除接口
	 *
	 * @param {string} url - 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式，当image字段存在时url字段失效
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public productDeleteByUrl(url: string, options: { [key: string]: string; }) {
		const param = {
			url: url,
			targetPath: PRODUCT_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 商品检索—删除接口
	 *
	 * @param {string} contSign - 图片签名
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public productDeleteBySign(contSign: string, options: { [key: string]: string; }) {
		const param = {
			cont_sign: contSign,
			targetPath: PRODUCT_DELETE_PATH
		};
		return this.commonImpl(merge(param, options));
	}
}
