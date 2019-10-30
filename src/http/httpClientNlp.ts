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
 * @file httpClientNlp类
 * @author baiduAip
 */

import HttpClient from './httpClient';
import request, { RequiredUriUrl } from 'request';
import code from '../const/code';
import { isFunction, isObject, merge } from '../util/objectTools';
import { decode, encode } from 'iconv-lite';

/**
 * HttpClientNlp类
 * nlp接口调用使用GBK编码解码实现,依赖iconv-lite库
 * @see https://github.com/ashtuchkin/iconv-lite
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
export default class HttpClientNlp extends HttpClient {
	constructor() {
		super();
	}
	public req<T>(options: RequiredUriUrl) {
		// 首先处理设置INTERCEPTOR的情况
		if (isFunction(HttpClient.REQUEST_INTERCEPTOR)) {
			options = HttpClient.REQUEST_INTERCEPTOR(options);
			// 其次设置全局request options的
		} else if (isObject(HttpClient.REQUEST_GLOBAL_OPTIONS)) {
			options = merge(HttpClient.REQUEST_GLOBAL_OPTIONS, options) as RequiredUriUrl;
		}

		return new Promise<T>(function (resolve, reject) {
			request(options, function (error, response, body) {
				if (error === null) {
					const buffer = new Buffer(body);
					const decodedBody = decode(buffer, code.GBK);
					try {
						resolve(JSON.parse(decodedBody));
					} catch (e) {
						// 无法解析json请求，就返回原始body
						resolve(decodedBody as unknown as T);
					}
				} else {
					reject(error);
				}
			});
		});
	}
	public postWithInfo<T>(requestInfo: {
		params: any;
		method: string;
		getUrl(): string;
		headers: { [key: string]: string; };
	}) {
		const body = this.createBody(requestInfo.params);
		const options = {
			method: requestInfo.method,
			url: requestInfo.getUrl(),
			headers: requestInfo.headers,
			encoding: null,
			timeout: HttpClient.DEFAULT_TIMEOUT,
			body: body
		};
		return this.req<T>(options);
	}
	private createBody(param: any) {
		return encode(JSON.stringify(param), code.GBK);
	}
}
