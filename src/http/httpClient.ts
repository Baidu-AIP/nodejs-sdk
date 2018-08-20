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
import request = require('request');
import objectTools = require('../util/objectTools');
import RequestInfo = require('../client/requestInfo');

/**
 * HttpClient类
 * 通用接口调用，依赖request库
 * @see https://github.com/request/request
 *
 * @class
 * @constructor
 */
class HttpClient<T = any, O extends request.Options = request.Options> {
    postWithInfo(requestInfo: RequestInfo): Promise<T> {
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            form: requestInfo.params,
            timeout: HttpClient.DEFAULT_TIMEOUT
        };

        // @ts-ignore
        return this.req(options);
    }
    req(options: O): Promise<T> {
        // 首先处理设置INTERCEPTOR的情况
        if (objectTools.isFunction(HttpClient.REQUEST_INTERCEPTOR)) {
            options = HttpClient.REQUEST_INTERCEPTOR(options);
        // 其次设置全局request options的
        } else if (objectTools.isObject(HttpClient.REQUEST_GLOBAL_OPTIONS)) {
            options = objectTools.merge(HttpClient.REQUEST_GLOBAL_OPTIONS, options);
        }

        return new Promise(function(resolve, reject) {
            request(options, function(error, response, body) {
                if (error === null) {
                    try {
                        resolve(JSON.parse(body));
                    } catch (e) {
                        // 无法解析json请求，就返回原始body
                        resolve(body);
                    }
                } else {
                    reject(error);
                }
            });
        });
    }
}

namespace HttpClient
{

    /**
     * 用来设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
     * @see https://github.com/request/request#requestoptions-callback
     * @see https://github.com/request/request
     */
    export function setRequestOptions<T extends request.CoreOptions>(options: T) {
        HttpClient.REQUEST_GLOBAL_OPTIONS = options;
    }

    /**
     * 用来获取和设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
     * 优先级高于setRequestOptions
     *
     * @see https://github.com/request/request#requestoptions-callback
     * @see https://github.com/request/request
     */
    export function setRequestInterceptor(interceptorCallback) {
        HttpClient.REQUEST_INTERCEPTOR = interceptorCallback;
    }

    export let REQUEST_GLOBAL_OPTIONS: request.CoreOptions = null;

    export let REQUEST_INTERCEPTOR = null;

    export let DEFAULT_TIMEOUT = 10000;
}

export default HttpClient;
// @ts-ignore
Object.assign(HttpClient, exports);
// @ts-ignore
export = HttpClient;
