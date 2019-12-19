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
 * @file AipEasyDL.js
 * @author baidu aip
 */

import BaseClient from './client/baseClient';
import RequestInfo from './client/requestInfo';
import HttpClient from './http/httpClientExt';
import { merge } from './util/objectTools';

const METHOD_POST = 'POST';

/**
 * AipEasyDL类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
export default class AipEasyDL extends BaseClient {
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
	public requestImage(url: string, image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: url
		};
		return this.commonImpl(merge(param, options));
	}
	public requestSound(url: string, sound: string, options: { [key: string]: string; }) {
		const param = {
			sound: sound,
			targetPath: url
		};
		return this.commonImpl(merge(param, options));
	}
}
