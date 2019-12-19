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
import devScope from '../const/devScope';

/**
 * 提前获取access_token的时间 默认24个小时
 *
 * @type {number}
 */
let DEFAULT_FETCH_AHEAD_DURATION = 24 * 60 * 60 * 1000;

/**
* devAuthToken类
* 百度开发者token信息包装类
*
* @constructor
* @param {string} token access_token
* @param {number} expireTime 多久之后过期
* @param {string} scope 权限
*/
export default class DevAuthToken {
	private authDate: Date;
	private hasScopeFlag: boolean;
	static setExpireAhead(duration: number) {
		DEFAULT_FETCH_AHEAD_DURATION = duration;
	}
	static DEFAULT_EXPIRE_DURATION = 2592000 * 1000;
	constructor(public token: string, protected expireTime: number, protected scope: string) {
		this.authDate = new Date();
		this.hasScopeFlag = false;
		this.initScope();
	}
	private initScope() {
		// 用户自建token，默认为有权限
		if (this.scope == null) {
			this.hasScopeFlag = true;
			return;
		}
		const scopeArray = this.scope.split(' ');
		scopeArray.forEach((item) => {
			if (item === devScope) {
				this.hasScopeFlag = true;
			}
		});
	}
	public hasScope(scope: string) {
		return this.hasScopeFlag;
	}
	public isExpired() {
		const now = new Date();
		// 根据服务器返回的access_token过期时间，提前重新获取token
		if (now.getTime() - this.authDate.getTime() > this.expireTime * 1000 -
			DEFAULT_FETCH_AHEAD_DURATION) {
			return true;
		}
		return false;
	}
}
