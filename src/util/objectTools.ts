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
 * @file objectTool
 * @author baiduAip
 */

export function merge(source: object, dest: object) {
	return {
		...dest,
		...source
	};
}

export function ensureArray<T>(arrayLike: T | T[]) {
	if (isArray(arrayLike)) {
		return arrayLike as T[];
	} else {
		return [arrayLike] as T[];
	}
}

export function isArray(obj: any) {
	return '[object Array]' === Object.prototype.toString.call(obj);
}

export function isObject(obj: any) {
	return '[object Object]' === Object.prototype.toString.call(obj);
}

export function isFunction(obj: any) {
	return '[object Function]' === Object.prototype.toString.call(obj);
}
