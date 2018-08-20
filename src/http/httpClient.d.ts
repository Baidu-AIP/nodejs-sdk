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
import RequestInfo = require('../client/requestInfo');
/**
 * HttpClient类
 * 通用接口调用，依赖request库
 * @see https://github.com/request/request
 *
 * @class
 * @constructor
 */
declare class HttpClient<T = any, O extends request.Options = request.Options> {
    postWithInfo(requestInfo: RequestInfo): Promise<T>;
    req(options: O): Promise<T>;
}
declare namespace HttpClient {
    /**
     * 用来设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
     * @see https://github.com/request/request#requestoptions-callback
     * @see https://github.com/request/request
     */
    function setRequestOptions<T extends request.CoreOptions>(options: T): void;
    /**
     * 用来获取和设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
     * 优先级高于setRequestOptions
     *
     * @see https://github.com/request/request#requestoptions-callback
     * @see https://github.com/request/request
     */
    function setRequestInterceptor(interceptorCallback: any): void;
    let REQUEST_GLOBAL_OPTIONS: request.CoreOptions;
    let REQUEST_INTERCEPTOR: any;
    let DEFAULT_TIMEOUT: number;
}
export default HttpClient;
export = HttpClient;
