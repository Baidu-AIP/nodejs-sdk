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
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClientVoiceASR = require('./http/httpClientVoiceASR');

const HttpClientVoiceTTS = require('./http/httpClientVoiceTTS');

const code = require('./const/code');

const httpHeader = require('./const/httpHeader');

const METHOD_POST = 'POST';

const CONTENT_TYPE_JSON = 'application/json';

const HOST_VOP = 'vop.baidu.com';
const HOST_TSN = 'tsn.baidu.com';
const PATH_VOP = '/server_api';
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
class AipSpeech extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }

    recognize(buffer, format, rate, options) {
        let param = {
            speech: buffer.toString(code.BASE64),
            format: format,
            rate: rate,
            channel: 1,
            len: buffer.toString(code.BIN).length
        };

        return this.asrImpl(param);
    }

    recognizeByUrl(url, callback, format, rate, options) {
        let param = {
            url: url,
            format: format,
            rate: rate,
            channel: 1,
            callback: callback
        };
        return this.asrImpl(param);
    }

    asrImpl(param) {
        let httpClient = new HttpClientVoiceASR();
        let requestInfo = new RequestInfo(PATH_VOP, param, METHOD_POST, false, {
                [httpHeader.CONTENT_TYPE]: CONTENT_TYPE_JSON
            });
        requestInfo.setHost(HOST_VOP);
        return this.doRequest(requestInfo, httpClient);
    }

    text2audio(text, options) {
        let param = {
            tex: text,
            lan: 'zh',
            ctp: 1
        };
        return this.ttsImpl(param);
    }

    ttsImpl(param) {
        let httpClient = new HttpClientVoiceTTS();
        let requestInfo = new RequestInfo(PATH_TTS,
            param, METHOD_POST, true);

        requestInfo.setHost(HOST_TSN);

        return this.doRequest(requestInfo, httpClient);
    }
}

module.exports = AipSpeech;
