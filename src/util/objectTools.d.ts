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
export declare function merge<T1, T2>(source: T1, dest: T2): T1 & T2;
export declare function ensureArray<T>(arrayLike: T): T | T[];
export declare function isArray<T>(obj: T): boolean;
export declare function isObject<T>(obj: T): boolean;
export declare function isFunction<T>(obj: T): boolean;
import * as objectTools from './objectTools';
export default objectTools;
