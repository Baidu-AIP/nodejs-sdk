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
 * @file devAuth
 * @author baiduAip
 */
import HttpClient = require('../http/httpClient');

import DevAuthToken = require('./devAuthToken');

import objectTool = require('../util/objectTools');

const OPENAPI_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token';

const OPENAPI_GRANTTYPE_CLIENT = 'client_credentials';

const REQUEST_TOKEN_METHOD = 'post';
 /**
 * devAuth类
 * 百度开发者token获取类
 *
 * @constructor
 * @param {string} ak API Key.
 * @param {string} sk Secret Key.
 */
class DevAuth {
    ak: string;
    sk: string;

    httpClient: HttpClient;

    constructor(ak: string, sk: string) {
        this.ak = ak;
        this.sk = sk;
        this.httpClient = new HttpClient();
    }
    gotData(this: DevAuth, data): DevAuthToken {
        // 如果返回数据非法，此时data为请求数据body
        if (!objectTool.isObject(data)) {
            throw {errorType: DevAuth.EVENT_ERRTYPE_ILLEGAL_RESPONSE, error: data};
        }
        // 如果获取token失败，数据是合法的错误数据
        if (data.error) {
            throw {errorType: DevAuth.EVENT_ERRTYPE_NORMAL, error: data.error};
        } else {
            // 获取token成功
            return new DevAuthToken(data.access_token, data.expires_in, data.scope);
        }
    }
    gotDataError<T extends Error>(this: DevAuth, err: T) {
        // request.js内部错误封装下返回
        throw {
            errorType: DevAuth.EVENT_ERRTYPE_NETWORK,
            error: err
        };
    }
    getToken<T = DevAuthToken>(): Promise<T> {
        let options = {
            url: OPENAPI_TOKEN_URL,
            method: REQUEST_TOKEN_METHOD,
            form: {
                grant_type: OPENAPI_GRANTTYPE_CLIENT,
                client_id: this.ak,
                client_secret: this.sk
            }
        };
        // @ts-ignore
        return this.httpClient.req<T>(options).then(this.gotData.bind(this) as typeof DevAuth.prototype.gotData,
            this.gotDataError.bind(this) as typeof DevAuth.prototype.gotDataError)
    }
}

namespace DevAuth
{
    export const EVENT_ERRTYPE_ILLEGAL_RESPONSE = "ERRTYPE_ILLEGAL_RESPONSE"
    export const EVENT_ERRTYPE_NETWORK = "ERRTYPE_NETWORK";
    export const EVENT_ERRTYPE_NORMAL  = "ERRTYPE_NORMAL";
}

export default DevAuth;
// @ts-ignore
Object.assign(DevAuth, exports);
// @ts-ignore

export = DevAuth;
