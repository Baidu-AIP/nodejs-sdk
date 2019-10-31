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
 * @file AipSpeech
 * @author baiduAip
 */
import BaseClient from './client/baseClient';
import RequestInfo from './client/requestInfo';
import httpHeader from './const/httpHeader';
import HttpClientVoiceASR from './http/httpClientVoiceASR';
import HttpClientVoiceTTS from './http/httpClientVoiceTTS';
import { merge } from './util/objectTools';

const code = require('./const/code');

const METHOD_POST = 'POST';

const CONTENT_TYPE_JSON = 'application/json';

const HOST_VOP = 'vop.baidu.com';
const HOST_TSN = 'tsn.baidu.com';
const PATH_VOP = '/server_api';
const PATH_VOP_PRO = '/pro_api';
const PATH_TTS = '/text2audio';

/**
 * AipSpeech类，构造调用语音接口
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
export default class AipSpeech extends BaseClient {
	constructor(appId: string, ak: string, sk: string) {
		// 在speech.baidu.com上创建的应用需要跳过此项权限检查
		super(appId, ak, sk, { isSkipScopeCheck: true });
	}

	public recognize(buffer: Buffer, format: string, rate: number, options: { [key: string]: string; }) {
		const param = {
			speech: buffer && buffer.toString(code.BASE64),
			format: format,
			rate: rate,
			channel: 1,
			len: buffer && buffer.toString(code.BIN).length
		};

		return this.asrImpl(merge(param, options));
	}

	public recognizeByUrl(url: string, callback: (...args: any[]) => any, format: string, rate: number, options: { [key: string]: string; }) {
		const param = {
			url,
			format,
			rate,
			channel: 1,
			callback
		};
		return this.asrImpl(merge(param, options));
	}

	public asrImpl(param: any) {
		return this.asrImplPath(param, PATH_VOP);
	}

	public asrImplPro(param: any) {
		return this.asrImplPath(param, PATH_VOP_PRO);
	}

	private asrImplPath(param: any, url: string) {
		let httpClient = new HttpClientVoiceASR();
		let requestInfo = new RequestInfo(url, param, METHOD_POST, false, {
			[httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
		});
		requestInfo.setHost(HOST_VOP);
		return this.doRequest(requestInfo, httpClient);
	}

	public text2audio(text: string, options: { [key: string]: string; }) {
		const param = {
			tex: text,
			lan: 'zh',
			ctp: 1
		};
		return this.ttsImpl(merge(param, options));
	}

	private ttsImpl(param: any) {
		const httpClient = new HttpClientVoiceTTS();
		const requestInfo = new RequestInfo(PATH_TTS,
			param, METHOD_POST, true);

		requestInfo.setHost(HOST_TSN);

		return this.doRequest(requestInfo, httpClient);
	}

}
