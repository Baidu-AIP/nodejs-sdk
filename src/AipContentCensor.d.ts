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
declare const PATH_USER_DEFINED = "/rest/2.0/solution/v1/img_censor/user_defined";
declare const PATH_ANTIPORN_GIF = "/rest/2.0/antiporn/v1/detect_gif";
declare const PATH_FACEAUDIT = "/rest/2.0/solution/v1/face_audit";
declare const PATH_COMBOCENSOR = "/api/v1/solution/direct/img_censor";
declare const PATH_REPORT = "/rpc/2.0/feedback/v1/report";
declare const PATH_ANTIPORN = "/rest/2.0/antiporn/v1/detect";
declare const PATH_ANTITERROR = "/rest/2.0/antiterror/v1/detect";
declare const PATH_ANTISPAM = "/rest/2.0/antispam/v2/spam";
export interface IParamBase {
    targetPath: typeof PATH_USER_DEFINED | typeof PATH_ANTIPORN_GIF | typeof PATH_FACEAUDIT | typeof PATH_COMBOCENSOR | typeof PATH_REPORT | typeof PATH_ANTIPORN | typeof PATH_ANTITERROR | typeof PATH_ANTISPAM;
}
export interface IParam extends IParamBase {
    configId?: any;
    image?: any;
    content?: any;
    imgUrls?: any;
    imgUrl?: any;
    images?: any;
    scenes?: any;
    sceneConf?: any;
    feedback?: any;
}
/**
 * AipContentCensor类，构造调用图像审核对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
declare class AipImageCensor extends BaseClient {
    commonImpl(param: IParam): Promise<any>;
    jsonRequestImpl(param: any): Promise<{}>;
    antiPornGif(image: any, options: any): Promise<any>;
    antiPorn(image: any, options: any): Promise<any>;
    antiTerror(image: any, options: any): Promise<any>;
    antiSpam(content: any, options: any): Promise<any>;
    faceAudit(images: any, type: any, configId: any): Promise<any>;
    imageCensorUserDefined(image: any, type: any): Promise<any>;
    imageCensorComb(image: any, type: any, scenes: any, scenesConf: any): Promise<{}>;
    report(feedback: any): Promise<{}>;
}
export default AipImageCensor;
export = AipImageCensor;
