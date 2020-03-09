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
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const objectTools = require('./util/objectTools');

const HttpClient = require('./http/httpClient');

const HttpClientJson = require('./http/httpClientExt');

const httpHeader = require('./const/httpHeader');

const CONTENT_TYPE_JSON = 'application/json';

const METHOD_POST = 'POST';

const PATH_USER_DEFINED_IMAGE = '/rest/2.0/solution/v1/img_censor/v2/user_defined';
const PATH_USER_DEFINED_TEXT = '/rest/2.0/solution/v1/text_censor/v2/user_defined';

const PATH_REPORT = '/rpc/2.0/feedback/v1/report';


const scope = require('./const/devScope').DEFAULT;


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
class AipImageCensor extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }

    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    jsonRequestImpl(param) {
        let httpClient = new HttpClientJson();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST, false, {
                [httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
            });
        return this.doRequest(requestInfo, httpClient);
    }

    imageCensorUserDefined(image, type) {
        let param = {};
        if (type === 'url') {
            param.imgUrl = image;
        }
        if (type === 'base64') {
            param.image = image;
        }
        param.targetPath = PATH_USER_DEFINED_IMAGE;
        return this.commonImpl(param);
    }

    textCensorUserDefined(text, type) {
        let param = {};
        param.text = text;
        param.targetPath = PATH_USER_DEFINED_TEXT;
        return this.commonImpl(param);
    }

    report(feedback) {
        let param = {};
        param.feedback = feedback;
        param.targetPath = PATH_REPORT;
        return this.jsonRequestImpl(param);
    }
}

module.exports = AipImageCensor;