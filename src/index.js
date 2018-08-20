'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
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
const bodyanalysis = require("./AipBodyAnalysis");
exports.bodyanalysis = bodyanalysis;
const imageSearch = require("./AipImageSearch");
exports.imageSearch = imageSearch;
const imageClassify = require("./AipImageClassify");
exports.imageClassify = imageClassify;
const contentCensor = require("./AipContentCensor");
exports.contentCensor = contentCensor;
const face = require("./AipFace");
exports.face = face;
const ocr = require("./AipOcr");
exports.ocr = ocr;
const nlp = require("./AipNlp");
exports.nlp = nlp;
const kg = require("./AipKg");
exports.kg = kg;
const speech = require("./AipSpeech");
exports.speech = speech;
const HttpClient = require("./http/httpClient");
exports.HttpClient = HttpClient;
const BaiduAipSdk = require("./index");
exports.BaiduAipSdk = BaiduAipSdk;
exports.default = BaiduAipSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCxrREFBbUQ7QUFZbEQsb0NBQVk7QUFYYixnREFBaUQ7QUFZaEQsa0NBQVc7QUFYWixvREFBcUQ7QUFZcEQsc0NBQWE7QUFYZCxvREFBcUQ7QUFZcEQsc0NBQWE7QUFYZCxrQ0FBbUM7QUFZbEMsb0JBQUk7QUFYTCxnQ0FBaUM7QUFZaEMsa0JBQUc7QUFYSixnQ0FBaUM7QUFZN0Isa0JBQUc7QUFYUCw4QkFBK0I7QUFZM0IsZ0JBQUU7QUFYTixzQ0FBdUM7QUFZbkMsd0JBQU07QUFYVixnREFBaUQ7QUFZN0MsZ0NBQVU7QUFHZCx1Q0FBdUM7QUFDOUIsa0NBQVc7QUFDcEIsa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBpbmRleFxuICogQGF1dGhvciBiYWlkdUFpcFxuICovXG5cbmltcG9ydCBib2R5YW5hbHlzaXMgPSByZXF1aXJlKCcuL0FpcEJvZHlBbmFseXNpcycpO1xuaW1wb3J0IGltYWdlU2VhcmNoID0gcmVxdWlyZSgnLi9BaXBJbWFnZVNlYXJjaCcpO1xuaW1wb3J0IGltYWdlQ2xhc3NpZnkgPSByZXF1aXJlKCcuL0FpcEltYWdlQ2xhc3NpZnknKTtcbmltcG9ydCBjb250ZW50Q2Vuc29yID0gcmVxdWlyZSgnLi9BaXBDb250ZW50Q2Vuc29yJyk7XG5pbXBvcnQgZmFjZSA9IHJlcXVpcmUoJy4vQWlwRmFjZScpO1xuaW1wb3J0IG9jciA9IHJlcXVpcmUoJy4vQWlwT2NyJyk7XG5pbXBvcnQgbmxwID0gcmVxdWlyZSgnLi9BaXBObHAnKTtcbmltcG9ydCBrZyA9IHJlcXVpcmUoJy4vQWlwS2cnKTtcbmltcG9ydCBzcGVlY2ggPSByZXF1aXJlKCcuL0FpcFNwZWVjaCcpO1xuaW1wb3J0IEh0dHBDbGllbnQgPSByZXF1aXJlKCcuL2h0dHAvaHR0cENsaWVudCcpO1xuXG5leHBvcnQge1xuXHRib2R5YW5hbHlzaXMsXG5cdGltYWdlU2VhcmNoLFxuXHRpbWFnZUNsYXNzaWZ5LFxuXHRjb250ZW50Q2Vuc29yLFxuXHRmYWNlLFxuXHRvY3IsXG4gICAgbmxwLFxuICAgIGtnLFxuICAgIHNwZWVjaCxcbiAgICBIdHRwQ2xpZW50LFxufVxuXG5pbXBvcnQgKiBhcyBCYWlkdUFpcFNkayBmcm9tICcuL2luZGV4JztcbmV4cG9ydCB7IEJhaWR1QWlwU2RrIH07XG5leHBvcnQgZGVmYXVsdCBCYWlkdUFpcFNkaztcbiJdfQ==