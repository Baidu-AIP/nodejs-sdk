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
 * @file httpClientExt类
 * @author baiduAip
 */

import HttpClient = require('./httpClient');
import code = require('../const/code');
import HttpHeader = require('../const/httpHeader');
const CONTENT_TYPE_JSON = 'application/json';
import RequestInfo = require('../client/requestInfo');

/**
 * HttpClientExt类
 * 图像审核某个接口调用需要json的Content-type,请求body为json字符串
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientExt<T> extends HttpClient<T> {
    postWithInfo(requestInfo: RequestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        return this.req(options);
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
}

export default HttpClientExt;
// @ts-ignore
Object.assign(HttpClientExt, exports);
// @ts-ignore
export = HttpClientExt;
