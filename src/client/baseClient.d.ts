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
 * @file baseClient
 * @author baiduAip
 */
import DevAuth = require('../auth/devAuth');
import DevAuthToken = require('../auth/devAuthToken');
import HttpClient from "../http/httpClient";
import RequestInfo = require('../client/requestInfo');
/**
 * 无授权判断状态
 *
 * @const
 * @type {number}
 */
declare const AUTHTYPE_INIT = 0;
/**
 * 确定为云用户
 *
 * @const
 * @type {number}
 */
declare const AUTHTYPE_BCE = 1;
/**
 * 确定为开发者用户（手动输入token模式,以及token中包含了正确的scope）
 *
 * @const
 * @type {number}
 */
declare const AUTHTYPE_DEV = 2;
/**
 * 获取开发者token成功用户
 *
 * @const
 * @type {number}
 */
declare const AUTHTYPE_DEV_OR_BCE = 3;
/**
 * 初始状态
 *
 * @const
 * @type {number}
 */
declare const STATUS_INIT = 0;
/**
 * 获取开发者token中
 *
 * @const
 * @type {number}
 */
declare const STATUS_AUTHTYPE_REQESTING = 1;
/**
 * 获取开发者token成功，或者确定为云用户
 *
 * @const
 * @type {number}
 */
declare const STATUS_READY = 2;
/**
 * 非法ak，sk
 *
 * @const
 * @type {number}
 */
declare const STATUS_ERROR = -1;
export declare type IAUTHTYPE = typeof AUTHTYPE_INIT | typeof AUTHTYPE_BCE | typeof AUTHTYPE_DEV | typeof AUTHTYPE_DEV_OR_BCE;
export declare type ISTATUS = typeof STATUS_INIT | typeof STATUS_AUTHTYPE_REQESTING | typeof STATUS_READY | typeof STATUS_ERROR;
export interface IBaseClientOptions {
    isSkipScopeCheck?: boolean;
}
/**
* BaseClient类
* 各具体接口类基类，处理鉴权逻辑等
*
* @constructor
* @param {string} appid appid.
* @param {string} ak The access key.
* @param {string} sk The security key.
*/
declare class BaseClient {
    protected appId: string | number;
    protected ak: string;
    protected sk: string;
    options: IBaseClientOptions;
    authType: IAUTHTYPE;
    status: ISTATUS;
    pms?: ReturnType<typeof DevAuth.prototype.getToken>;
    devAccessToken?: DevAuthToken;
    devAuth: DevAuth;
    constructor(appId: string, ak: string, sk: string, options?: IBaseClientOptions);
    setAccessToken(token: any, expireTime: any): void;
    authTypeReq(): Promise<{}>;
    gotDevAuthSuccess(token: any): void;
    gotDevAuthFail(err: any): void;
    doRequest<T>(requestInfo: RequestInfo, httpClient: HttpClient<T>): Promise<T>;
    checkDevPermission(requestInfo: any): boolean;
    preRequest(requestInfo: any): boolean;
}
export default BaseClient;
export = BaseClient;
