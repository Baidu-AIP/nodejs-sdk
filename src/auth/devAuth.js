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
const HttpClient = require('../http/httpClient');

const DevAuthToken = require('./devAuthToken');

const EventEmitter = require('events');

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
class DevAuth extends EventEmitter {
    constructor(ak, sk) {
        super();
        this.ak = ak;
        this.sk = sk;
        this.httpClient = new HttpClient();
    }
    gotData(data) {
        if (data.error) {
            this.emit(DevAuth.EVENT_GETTOKEN_ERROR,
                {errorType: DevAuth.EVENT_ERRTYPE_NORMAL, error: data.error});
        } else {
            let token = new DevAuthToken(data.access_token, data.expires_in, data.scope);
            this.emit(DevAuth.EVENT_GETTOKEN_SUCCESS, token);
        }
    }
    getToken() {
        let options = {
            url: OPENAPI_TOKEN_URL,
            method: REQUEST_TOKEN_METHOD,
            form: {
                grant_type: OPENAPI_GRANTTYPE_CLIENT,
                client_id: this.ak,
                client_secret: this.sk
            }
        };

        this.httpClient.req(options).on(HttpClient.EVENT_DATA,
            this.gotData.bind(this)).on(HttpClient.EVENT_ERROR, function (err) {
                this.emit(DevAuth.EVENT_GETTOKEN_ERROR, {errorType: DevAuth.EVENT_ERRTYPE_NETWORK, error: err});
            }.bind(this));
        return this;
    }
}
DevAuth.EVENT_ERRTYPE_NETWORK = 1;

DevAuth.EVENT_ERRTYPE_NORMAL = 0;

DevAuth.EVENT_GETTOKEN_SUCCESS = 'event_gettoken_success';

DevAuth.EVENT_GETTOKEN_ERROR = 'event_gettoken_error';

module.exports = DevAuth;
