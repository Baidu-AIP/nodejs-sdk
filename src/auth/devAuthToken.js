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
 * @file devAuthToken
 * @author baiduAip
 */
const devScope = require('../const/devScope');

 /**
 * devAuthToken类
 * 百度开发者token信息包装类
 *
 * @constructor
 * @param {string} token access_token
 * @param {number} expireTime 过期时间
 * @param {string} scope 权限
 */
class DevAuthToken {
    constructor(token, expireTime, scope) {
        this.token = token;
        this.expireTime = expireTime;
        this.scope = scope;
        this.authDate = new Date();
        this.hasScopeFlag = false;
        this.initScope();
    }
    initScope() {
        let scopeArray = this.scope.split(' ');
        scopeArray.forEach(function (item) {
            if (item === devScope) {
                this.hasScopeFlag = true;
            }
        }.bind(this));
    }
    hasScope(scope) {
        // scope 暂时不判断具体接口
        return this.hasScopeFlag;
    }
    isExpired() {
        let now = new Date();

        // 过期时间前10个小时重新获取token
        if (now.getTime(this.expireTime) - this.authDate.getTime() > this.expireTime * 1000 - 36000000) {
            return true;
        }
        return false;
    }
}

DevAuthToken.DEFAULT_EXPIRE_DURATION = 2592000 * 1000;

module.exports = DevAuthToken;
