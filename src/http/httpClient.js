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
const request = require('request');
const EventEmitter = require('events');

/**
 * HttpClient类
 * 通用接口调用，依赖request库
 * @see https://github.com/request/request
 *
 * @class
 * @extends EventEmitter
 * @constructor
 */
class HttpClient extends EventEmitter {
    constructor() {
        super();
    }
    bindErrorEvent(promise) {
        this.on(HttpClient.EVENT_ERROR, function (errInfo) {
            promise.reject(errInfo);
        });
    }
    onResp(error, response, body) {
        if (error === null) {
            try {
                this.emit(HttpClient.EVENT_DATA, JSON.parse(body));
            } catch (e) {
                this.emit(HttpClient.EVENT_DATA, body);
            }
        } else {
            this.emit(HttpClient.EVENT_ERROR, error);
        }
    }
    postWithInfo(requestInfo) {
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            form: requestInfo.params,
            timeout: HttpClient.DEFAULT_TIMEOUT
        };

        this.req(options);
        return this;
    }
    req(options) {
        request(options, this.onResp.bind(this));
        return this;
    }
}

HttpClient.DEFAULT_TIMEOUT = 10000;

HttpClient.EVENT_DATA = 'data';

module.exports = HttpClient;