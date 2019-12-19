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
 * @file devAuth
 * @author baiduAip
 */
import HttpClient from '../http/httpClient';

import DevAuthToken from './devAuthToken';

import { isObject } from '../util/objectTools';

const OPENAPI_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token';

const OPENAPI_GRANTTYPE_CLIENT = 'client_credentials';

const REQUEST_TOKEN_METHOD = 'post';
/**
* devAuth类
* 百度开发者token获取类
*
* @constructor
* @param {string} ak API Key.
* @param {string} sk Secret Key.
*/
export default class DevAuth {
	protected httpClient = new HttpClient();
	constructor(protected ak: string, protected sk: string) {
	}
	private gotData(data: {
		error?: any;
		access_token: string;
		expires_in: number;
		scope: string;
	}) {
		// 如果返回数据非法，此时data为请求数据body
		if (!isObject(data)) {
			throw { errorType: DevAuth.EVENT_ERRTYPE_ILLEGAL_RESPONSE, error: data };
		}
		// 如果获取token失败，数据是合法的错误数据
		if (data.error) {
			throw { errorType: DevAuth.EVENT_ERRTYPE_NORMAL, error: data.error };
		} else {
			// 获取token成功
			return new DevAuthToken(data.access_token, data.expires_in, data.scope);
		}
	}
	public async getToken() {
		const options = {
			url: OPENAPI_TOKEN_URL,
			method: REQUEST_TOKEN_METHOD,
			form: {
				grant_type: OPENAPI_GRANTTYPE_CLIENT,
				client_id: this.ak,
				client_secret: this.sk
			}
		};
		try {
			const data = await this.httpClient.req<{
				error?: any;
				access_token: string;
				expires_in: number;
				scope: string;
			}>(options);
			return this.gotData(data);
		} catch (e) {
			throw {
				errorType: DevAuth.EVENT_ERRTYPE_NETWORK,
				error: e
			};
		}
	}
	public static EVENT_ERRTYPE_ILLEGAL_RESPONSE = "ERRTYPE_ILLEGAL_RESPONSE";

	public static EVENT_ERRTYPE_NETWORK = "ERRTYPE_NETWORK";

	public static EVENT_ERRTYPE_NORMAL = "ERRTYPE_NORMAL";
}


