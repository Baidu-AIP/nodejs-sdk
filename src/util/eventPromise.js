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
 * @file EventPromise
 * @author baiduAip
 */

class EventPromise {
    constructor() {
        this.valueMap = {};
        this.promise = new Promise(this.resolvePromise.bind(this));
    }
    resolvePromise(resolve, reject) {
        this._resolve = resolve;
        this._reject = reject;
    }
    resolve(data) {
        this._resolve(data);
    }
    reject(data) {
        this._reject(data);
    }
    getRejectCb() {
        return this._reject;
    }
    getResolveCb() {
        return this._resolve;
    }
    getCatchCb() {
        return this._catchCb;
    }
    then(cb, rjcb) {
        this.promise = this.promise.then(cb, rjcb);
        return this;
    }
    catch(cb) {
        this._catchCb = cb;
        this.promise = this.promise.catch(cb);
        return this;
    }
    setValue(key, value) {
        this.valueMap[key] = value;
    }
    getValue(key) {
        return this.valueMap[key];
    }
}

module.exports = EventPromise;
