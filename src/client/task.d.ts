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
interface ITaskPromise<R, P> {
    getResolveCb(): (value?: R) => P;
    getRejectCb(): (err?: any) => any;
    getCatchCb(): (err?: any) => any;
    resolve(...argv: any[]): (...argv: any[]) => any;
}
interface ITaskFn<R, M, T> {
    (this: T, param: M): Promise<R>;
}
/**
* task类
* 描述调用接口任务
*
* @constructor
*/
declare class Task<R, T, M, P> {
    fn: ITaskFn<R, M, T>;
    param: M;
    promise: ITaskPromise<R, P>;
    clientContext: T;
    constructor(fn: ITaskFn<R, M, T>, param: M, promise: ITaskPromise<R, P>, clientContext: T);
    setDevAuthOK(): void;
    setDevAuthFail(errorCause: any): void;
}
declare namespace Task {
    const EVENT_DATA = "data";
}
export default Task;
export = Task;
