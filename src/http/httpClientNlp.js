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
const iconv = require('iconv-lite');
const HttpClient = require('./httpClient');
const code = require('../const/code');

/**
 * HttpClientNlp类
 * nlp接口调用使用GBK编码解码实现,依赖iconv-lite库
 * @see https://github.com/ashtuchkin/iconv-lite
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientNlp extends HttpClient {
    constructor() {
        super();
    }
    onResp(error, response, body) {
        if (error === null) {
            let buffer = new Buffer(body);
            let str = iconv.decode(buffer, code.GBK);
            try {
                this.emit(HttpClient.EVENT_DATA, JSON.parse(str));
            } catch (e) {
                this.emit(HttpClient.EVENT_DATA, str);
            }
        } else {
            this.emit(HttpClient.EVENT_DATA, error);
        }
    }
    postWithInfo(requestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        this.req(options);
        return this;
    }
    createBody(param) {
        let body = null;
        body = iconv.encode(JSON.stringify(param), code.GBK);
        return body;
    }
}

HttpClientNlp.EVENT_DATA = HttpClient.EVENT_DATA;

module.exports = HttpClientNlp;