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
 * @file AipSpeech
 * @author baiduAip
 */
import BaseClient = require('./client/baseClient');
/**
 * AipSpeech类，构造调用语音接口
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
declare class AipSpeech extends BaseClient {
    constructor(appId: any, ak: any, sk: any);
    recognize(buffer: any, format: any, rate: any, options: any): Promise<any>;
    recognizeByUrl(url: any, callback: any, format: any, rate: any, options: any): Promise<any>;
    asrImpl(param: any): Promise<any>;
    text2audio(text: any, options: any): Promise<any>;
    ttsImpl(param: any): Promise<any>;
}
export default AipSpeech;
export = AipSpeech;
