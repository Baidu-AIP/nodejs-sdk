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
/**
* devAuth类
* 百度开发者token获取类
*
* @constructor
* @param {string} ak API Key.
* @param {string} sk Secret Key.
*/
declare class DevAuth {
    ak: string;
    sk: string;
    httpClient: HttpClient;
    constructor(ak: string, sk: string);
    gotData(this: DevAuth, data: any): DevAuthToken;
    gotDataError<T extends Error>(this: DevAuth, err: T): void;
    getToken<T = DevAuthToken>(): Promise<T>;
}
declare namespace DevAuth {
    const EVENT_ERRTYPE_ILLEGAL_RESPONSE = "ERRTYPE_ILLEGAL_RESPONSE";
    const EVENT_ERRTYPE_NETWORK = "ERRTYPE_NETWORK";
    const EVENT_ERRTYPE_NORMAL = "ERRTYPE_NORMAL";
}
export default DevAuth;
export = DevAuth;
