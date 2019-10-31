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
 * @file requestInfo
 * @author baiduAip
 */
import HttpHeader from '../const/httpHeader';
import CloudAuth from '../auth/cloudAuth';
import DevAuthToken from '../auth/devAuthToken';

const HOST_DEFAULT = 'aip.baidubce.com';

const CONTENT_TYPE_FORMDEFAULT = 'application/x-www-form-urlencoded';

const SYMBOL_QUERYSTRING_PREFIX = '?aipSdk=node&access_token=';
const SYMBOL_QUERYSTRING_PREFIX_BCE = '?aipSdk=node';

const SYMBOL_HTTPS_PREFIX = 'https://';
const SYMBOL_HTTP_PREFIX = 'http://';

/**
* RequestInfo类
* 构造供request库调用的请求信息对象
*
* @constructor
*/
export default class RequestInfo {
	public scope = '';
	private host = HOST_DEFAULT;
	private createDate = new Date();
	private devAccessToken = null as unknown as DevAuthToken;
	private headers = {} as { [key: string]: string; };
	constructor(private path: string, private params = {}, private method: 'GET' | 'POST' | 'DELETE' | 'PUT', private isHttp = false, private mergeHeaders = {} as { [key: string]: string; }) {
		this.initCommonHeader();
	}
	public setHost(host: string) {
		this.host = host;
		this.headers[HttpHeader.HOST] = this.host;
	}
	private initCommonHeader() {
		this.headers[HttpHeader.HOST] = this.host;
		this.headers[HttpHeader.CONTENT_TYPE] = CONTENT_TYPE_FORMDEFAULT;
		for (const p in this.mergeHeaders) {
			this.headers[p] = this.mergeHeaders[p];
		}
	}
	public makeDevOptions(devAccessToken: DevAuthToken) {
		this.devAccessToken = devAccessToken;
		this.path += SYMBOL_QUERYSTRING_PREFIX + devAccessToken.token;
	}
	public makeBceOptions(ak: string, sk: string) {
		const cloudAuth = new CloudAuth(ak, sk);
		this.headers[HttpHeader.BCE_DATE] = this.getUTCDateStr();
		const signature = cloudAuth.getAuthorization(this.method,
			this.path, { aipSdk: 'node' }, this.headers, this.createDate.getTime());
		this.headers[HttpHeader.BCE_AUTHORIZATION] = signature;
	}
	getUTCDateStr() {
		const dateStrUTC = this.createDate.toISOString().replace(/\.\d+Z$/, 'Z');
		return dateStrUTC;
	}
	getAccessToken() {
		if (this.devAccessToken !== null) {
			return this.devAccessToken.token;
		}
		return null;
	}
	getUrl() {
		if (this.isHttp) {
			return this.getHttpUrl();
		}
		return this.getHttpsUrl();
	}
	getPureUrl() {
		return this.getUrl().split('?')[0];
	}
	getHttpsUrl() {
		return SYMBOL_HTTPS_PREFIX + this.host + this.path + SYMBOL_QUERYSTRING_PREFIX_BCE;
	}
	getHttpUrl() {
		return SYMBOL_HTTP_PREFIX + this.host + this.path + SYMBOL_QUERYSTRING_PREFIX_BCE;
	}
}
