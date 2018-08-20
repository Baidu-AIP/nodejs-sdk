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
 * @file index
 * @author baiduAip
 */
import bodyanalysis = require('./AipBodyAnalysis');
import imageSearch = require('./AipImageSearch');
import imageClassify = require('./AipImageClassify');
import contentCensor = require('./AipContentCensor');
import face = require('./AipFace');
import ocr = require('./AipOcr');
import nlp = require('./AipNlp');
import kg = require('./AipKg');
import speech = require('./AipSpeech');
import HttpClient = require('./http/httpClient');
export { bodyanalysis, imageSearch, imageClassify, contentCensor, face, ocr, nlp, kg, speech, HttpClient, };
import * as BaiduAipSdk from './index';
export { BaiduAipSdk };
export default BaiduAipSdk;
