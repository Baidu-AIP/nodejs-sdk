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
 * @file httpClient类
 * @author baiduAip
 */

import request, { RequiredUriUrl } from 'request';
import { isFunction, isObject, merge } from '../util/objectTools';

export default class HttpClient {
	public postWithInfo<T>(requestInfo: {
		// method?: string;
		// getUrl(): string;
		// headers: { [key: string]: string; };
		// params: { [key: string]: any; };
		[key: string]: any;
	}) {
		const options = {
			method: requestInfo.method,
			url: requestInfo.getUrl(),
			headers: requestInfo.headers,
			form: requestInfo.params,
			timeout: HttpClient.DEFAULT_TIMEOUT
		};

		return this.req<T>(options);
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
					try {
						resolve(JSON.parse(body));
					} catch (e) {
						// 无法解析json请求，就返回原始body
						resolve(body);
					}
				} else {
					reject(error);
				}
			});
		});
	}

	protected static DEFAULT_TIMEOUT = 10000;
	protected static REQUEST_GLOBAL_OPTIONS = null as any;

	/**
	 * 用来设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
	 * @see https://github.com/request/request#requestoptions-callback
	 * @see https://github.com/request/request
	 */
	public static setRequestOptions(options: Partial<RequiredUriUrl>) {
		HttpClient.REQUEST_GLOBAL_OPTIONS = options;
	}
	protected static REQUEST_INTERCEPTOR = null as unknown as ((options: RequiredUriUrl) => RequiredUriUrl);

	/**
	 * 用来获取和设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
	 * 优先级高于setRequestOptions
	 *
	 * @see https://github.com/request/request#requestoptions-callback
	 * @see https://github.com/request/request
	 */
	public static setRequestInterceptor(interceptorCallback: ((options: RequiredUriUrl) => RequiredUriUrl)) {
		HttpClient.REQUEST_INTERCEPTOR = interceptorCallback;
	}
}
