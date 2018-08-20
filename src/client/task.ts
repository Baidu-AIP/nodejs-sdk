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
 * @file task
 * @author baiduAip
 */

interface ITaskPromise<R, P>
{
    getResolveCb(): (value?: R) => P;
    getRejectCb(): (err?) => any;
    getCatchCb(): (err?) => any;
    resolve(...argv): (...argv) => any;
}

interface ITaskFn<R, M, T>
{
    (this: T, param: M): Promise<R>
}

 /**
 * task类
 * 描述调用接口任务
 *
 * @constructor
 */
class Task<R, T, M, P> {

    fn: ITaskFn<R, M, T>;
    param: M;
    promise: ITaskPromise<R, P>;
    clientContext: T;

    constructor(fn: ITaskFn<R, M, T>, param: M, promise: ITaskPromise<R, P>, clientContext: T) {
        this.fn = fn;
        this.param = param;
        this.promise = promise;
        this.clientContext = clientContext;
    }
    setDevAuthOK() {
        this.fn.bind(this.clientContext)(this.param)
            .then(this.promise.getResolveCb(), this.promise.getRejectCb())
            .catch(this.promise.getCatchCb());
        this.promise = null;
    }
    setDevAuthFail(errorCause) {
        this.promise.resolve(errorCause);
        this.promise = null;
    }
}

namespace Task
{
    export const EVENT_DATA = 'data';
}

export default Task;
// @ts-ignore
Object.assign(Task, exports);
// @ts-ignore
export = Task;
