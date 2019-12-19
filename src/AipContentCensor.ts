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
 * @file AipImageCensor
 * @author baiduAip
 */
import BaseClient from './client/baseClient';
import RequestInfo from './client/requestInfo';
import httpHeader from './const/httpHeader';
import HttpClient from './http/httpClient';
import HttpClientJson from './http/httpClientExt';
import { merge } from './util/objectTools';

const CONTENT_TYPE_JSON = 'application/json';

const METHOD_POST = 'POST';

const PATH_USER_DEFINED_IMAGE = '/rest/2.0/solution/v1/img_censor/v2/user_defined';
const PATH_USER_DEFINED_TEXT = '/rest/2.0/solution/v1/text_censor/v2/user_defined';

const PATH_ANTIPORN_GIF = '/rest/2.0/antiporn/v1/detect_gif';
const PATH_FACEAUDIT = '/rest/2.0/solution/v1/face_audit';
const PATH_COMBOCENSOR = '/api/v1/solution/direct/img_censor';
const PATH_REPORT = '/rpc/2.0/feedback/v1/report';

const PATH_ANTIPORN = '/rest/2.0/antiporn/v1/detect';
const PATH_ANTITERROR = '/rest/2.0/antiterror/v1/detect';
const PATH_ANTISPAM = '/rest/2.0/antispam/v2/spam';

/**
 * AipContentCensor类，构造调用图像审核对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
export default class AipImageCensor extends BaseClient {
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

	public jsonRequestImpl(param: { targetPath: string;[key: string]: any; }) {
		const httpClient = new HttpClientJson();
		const apiUrl = param.targetPath;
		delete param.targetPath;
		const requestInfo = new RequestInfo(apiUrl,
			param, METHOD_POST, false, {
			[httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
		});
		return this.doRequest(requestInfo, httpClient);
	}

	public antiPornGif(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: PATH_ANTIPORN_GIF
		};
		return this.commonImpl(merge(param, options));
	}

	public antiPorn(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: PATH_ANTIPORN
		};
		return this.commonImpl(merge(param, options));
	}

	public antiTerror(image: string, options: { [key: string]: string; }) {
		const param = {
			image: image,
			targetPath: PATH_ANTITERROR
		};
		return this.commonImpl(merge(param, options));
	}

	public antiSpam(content: any, options: { [key: string]: string; }) {
		const param = {
			content: content,
			targetPath: PATH_ANTISPAM
		};
		return this.commonImpl(merge(param, options));
	}

	public faceAudit(images: string[], type: 'url' | 'base64', configId: string) {
		const param = {
			configId,
			targetPath: PATH_FACEAUDIT
		} as { targetPath: string;[key: string]: string; };
		if (type === 'url') {
			images = images.map(function (elm) {
				return encodeURIComponent(elm);
			});
			param.imgUrls = images.join(',');
		}
		if (type === 'base64') {
			param.images = images.join(',');
		}
		return this.commonImpl(param);
	}

	public imageCensorUserDefined(image: string, type: 'url' | 'base64') {
		const param = {} as { targetPath: string;[key: string]: string; };
		if (type === 'url') {
			param.imgUrl = image;
		}
		if (type === 'base64') {
			param.image = image;
		}
		param.targetPath = PATH_USER_DEFINED_IMAGE;
		return this.commonImpl(param);
	}

	public textCensorUserDefined(text: string, type: 'url' | 'base64') {
		const param = {
			text,
			targetPath: PATH_USER_DEFINED_TEXT
		};
		return this.commonImpl(param);
	}

	public imageCensorComb(image: string, type: 'url' | 'base64', scenes: string, scenesConf: string) {
		const param = {} as { targetPath: string;[key: string]: string; };
		if (type === 'url') {
			param.imgUrl = image;
		}
		if (type === 'base64') {
			param.image = image;
		}
		param.scenes = scenes;
		param.sceneConf = scenesConf;
		param.targetPath = PATH_COMBOCENSOR;
		return this.jsonRequestImpl(param);
	}

	public report(feedback: string) {
		const param = {
			feedback,
			targetPath: PATH_REPORT
		};
		return this.jsonRequestImpl(param);
	}
}
