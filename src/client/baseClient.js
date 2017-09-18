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
 * @file baseClient
 * @author baiduAip
 */
const DevAuth = require('../auth/devAuth');

const DevAuthToken = require('../auth/devAuthToken');

const EventEmitter = require('events');

const HttpClientNlp = require('../http/httpClientNlp');

const EventPromise = require('../util/eventPromise');

const Task = require('./task');

/**
 * 无授权判断状态
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_INIT = -1;

/**
 * 无法确定调用类型
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_UNKNOW = 0;

/**
 * 确定为云用户
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_BCE = 1;

/**
 * 确定为开发者用户（手动输入token模式）
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_DEV = 2;

/**
 * 获取开发者token成功用户
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_DEV_OR_BCE = 3;

/**
 * 获取开发者token失败用户
 *
 * @const
 * @type {number}
 */
const AUTHTYPE_BCE_MAYBE = 4;

/**
 * 初始状态
 *
 * @const
 * @type {number}
 */
const STATUS_INIT = 0;

/**
 * 获取开发者token中
 *
 * @const
 * @type {number}
 */
const STATUS_AUTHTYPE_REQESTING = 1;

/**
 * 获取开发者token成功，或者确定为云用户
 *
 * @const
 * @type {number}
 */
const STATUS_READY = 2;

/**
 * 非法ak，sk
 *
 * @const
 * @type {number}
 */
const STATUS_ERROR = -1;

/**
 * 云ak长度
 *
 * @const
 * @type {number}
 */
const AK_LENGTH_BCE = 32;

/**
 * 云sk长度
 *
 * @const
 * @type {number}
 */
const SK_LENGTH_BCE = 32;

/**
 * 开发者ak长度
 *
 * @const
 * @type {number}
 */
const AK_LENGTH_DEV = 24;

/**
 * 开发者sk长度
 *
 * @const
 * @type {number}
 */
const SK_LENGTH_DEV = 32;

 /**
 * BaseClient类
 * 个具体接口类基类，处理鉴权逻辑等
 *
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
class BaseClient {
    constructor(appId, ak, sk) {
        this.appId = appId;
        this.ak = ak;
        this.sk = sk;
        this.authType = AUTHTYPE_INIT;
        this.status = STATUS_INIT;
        this.devAuth = null;
        this.taskList = [];
        this.taskEvent = Task.EVENT_DATA;

        this.errorCause = null;

        this.devAccessToken = null;

        this.init();
    }
    validateKeys() {
        let akLen = this.ak.length;
        let skLen = this.sk.length;
        return ((akLen === AK_LENGTH_BCE && skLen === SK_LENGTH_BCE)
            || (akLen === AK_LENGTH_DEV && skLen === SK_LENGTH_DEV));
    }
    setToken(token, expireTime) {
        let et = expireTime || DevAuthToken.DEFAULT_EXPIRE_DURATION;
        this.devAccessToken = new DevAuthToken(token, et, '');
        this.authType = AUTHTYPE_DEV;
    }
    init() {
        this.judgeAuthType();
    }
    judgeAuthType() {
        this.authType = this.getAuthTypeByAkLen();
        if (this.authType === AUTHTYPE_UNKNOW) {
            this.authTypeReq();
        } else {
            this.status = STATUS_READY;
        }
    }
    getAuthTypeByAkLen() {
        return AUTHTYPE_UNKNOW;
    }
    authTypeReq() {
        if (this.devAuth === null) {
            this.devAuth = new DevAuth(this.ak, this.sk);
            this.devAuth.on(DevAuth.EVENT_GETTOKEN_SUCCESS, this.gotDevAuth.bind(this));
            this.devAuth.on(DevAuth.EVENT_GETTOKEN_ERROR, this.gotDevAuthFail.bind(this));
        }
        this.status = STATUS_AUTHTYPE_REQESTING;
        this.devAuth.getToken();
    }
    gotDevAuth(token) {
        if (this.authType !== AUTHTYPE_DEV) {
            this.devAccessToken = token;
            this.authType = AUTHTYPE_DEV_OR_BCE;
        }
        this.status = STATUS_READY;
        this.resolveTasks();
    }
    gotDevAuthFail(err) {
        // 获取token时鉴权服务器返回失败信息
        if (err.errorType === DevAuth.EVENT_ERRTYPE_NORMAL) {
            // 可能是百度云的ak，sk
            this.authType = AUTHTYPE_BCE_MAYBE;
            this.status = STATUS_READY;
            this.resolveTasks();
        }

        // 获取token时发生了网络错误
        if (err.errorType === DevAuth.EVENT_ERRTYPE_NETWORK) {
            this.status = STATUS_ERROR;
            this.errorCause = err.error;
            this.rejectTasks();
        }
    }
    registTask(fn, param) {
        let promise = new EventPromise();

        // 获取token时发生了网络错误
        if (this.status === STATUS_ERROR) {
            promise.resolve(this.errorCause);
            return promise;
        }

        // 获取token成功
        if (this.status === STATUS_READY) {
            return fn.bind(this)(param);
        }

        this.taskList.push(new Task(fn, param, promise, this));
        return promise;
    }
    resolveTasks() {
        while (this.taskList.length > 0) {
            let task = this.taskList.shift();
            task.setDevAuthOK();
        }
    }
    rejectTasks() {
        while (this.taskList.length > 0) {
            let task = this.taskList.shift();
            task.setDevAuthFail(this.errorCause);
        }
    }
    preRequest(requestInfo) {
        if (this.authType === AUTHTYPE_BCE
            || this.authType === AUTHTYPE_BCE_MAYBE) {
            // 使用云方式调用
            requestInfo.makeBceOptions(this.ak, this.sk);
            return true;
        }
        if (this.authType === AUTHTYPE_DEV_OR_BCE || this.authType === AUTHTYPE_DEV) {
            if (this.devAccessToken.hasScope(requestInfo.scope) || this.authType === AUTHTYPE_DEV) {
                // 使用开发者方式调用
                if (!this.devAccessToken.isExpired()) {
                    requestInfo.makeDevOptions(this.devAccessToken);
                    return true;
                }
                this.authTypeReq();
                return false;
            } else {
                // 使用云方式访问调用
                requestInfo.makeBceOptions(this.ak, this.sk);
                return true;
            }
        }

    }
 }

module.exports = BaseClient;
