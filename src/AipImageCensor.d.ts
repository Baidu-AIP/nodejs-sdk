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
 * @file AipImageCensor
 * @author baiduAip
 */
import BaseClient = require('./client/baseClient');
/**
 * AipImageCensor类，构造调用图像审核对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
declare class AipImageCensor extends BaseClient {
    constructor(appId: any, ak: any, sk: any);
    commonImpl(param: any): Promise<any>;
    jsonRequestImpl(param: any): Promise<{}>;
    antiPornGif(image: any, options: any): Promise<any>;
    antiPorn(image: any, options: any): Promise<any>;
    antiTerror(image: any, options: any): Promise<any>;
    faceAudit(images: any, type: any, configId: any): Promise<any>;
    imageCensorUserDefined(image: any, type: any): Promise<any>;
    imageCensorComb(image: any, type: any, scenes: any, scenesConf: any): Promise<{}>;
    report(feedback: any): Promise<{}>;
}
export default AipImageCensor;
export = AipImageCensor;
