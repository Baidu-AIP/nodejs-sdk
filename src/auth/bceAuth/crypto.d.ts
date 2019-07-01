/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
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
 * @file src/crypto.js
 * @author leeight
 */
export declare function md5sum(data: any, enc: any, digest: any): string;
export declare function md5stream(stream: any, digest: any): any;
export declare function md5file(filename: any, digest: any): any;
export declare function md5blob(blob: any, digest: any): any;
import * as _crypto from './crypto';
export default _crypto;
