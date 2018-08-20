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
 * @file httpClientNlp类
 * @author baiduAip
 */
const iconv = require("iconv-lite");
const HttpClient = require("./httpClient");
const objectTools = require("../util/objectTools");
const request = require("request");
const code = require("../const/code");
/**
 * HttpClientNlp类
 * nlp接口调用使用GBK编码解码实现,依赖iconv-lite库
 * @see https://github.com/ashtuchkin/iconv-lite
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientNlp extends HttpClient {
    constructor() {
        super();
    }
    req(options) {
        // 首先处理设置INTERCEPTOR的情况
        if (objectTools.isFunction(HttpClient.REQUEST_INTERCEPTOR)) {
            options = HttpClient.REQUEST_INTERCEPTOR(options);
            // 其次设置全局request options的
        }
        else if (objectTools.isObject(HttpClient.REQUEST_GLOBAL_OPTIONS)) {
            options = objectTools.merge(HttpClient.REQUEST_GLOBAL_OPTIONS, options);
        }
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error === null) {
                    let buffer = new Buffer(body);
                    let decodedBody = iconv.decode(buffer, code.GBK);
                    try {
                        resolve(JSON.parse(decodedBody));
                    }
                    catch (e) {
                        // 无法解析json请求，就返回原始body
                        resolve(decodedBody);
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    }
    postWithInfo(requestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        return this.req(options);
    }
    createBody(param) {
        let body = null;
        body = iconv.encode(JSON.stringify(param), code.GBK);
        return body;
    }
}
exports.default = HttpClientNlp;
// @ts-ignore
Object.assign(HttpClientNlp, exports);
module.exports = HttpClientNlp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudE5scC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL2h0dHAvaHR0cENsaWVudE5scC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFDYjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILG9DQUFxQztBQUNyQywyQ0FBNEM7QUFDNUMsbURBQW9EO0FBQ3BELG1DQUFvQztBQUNwQyxzQ0FBdUM7QUFFdkM7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLGFBQWMsU0FBUSxVQUFVO0lBQ2xDO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsR0FBRyxDQUFDLE9BQU87UUFDUCx1QkFBdUI7UUFDdkIsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3hELE9BQU8sR0FBRyxVQUFVLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQseUJBQXlCO1NBQ3hCO2FBQU0sSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMzRTtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO2dCQUMzQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pELElBQUk7d0JBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztxQkFDcEM7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1IsdUJBQXVCO3dCQUN2QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3hCO2lCQUNKO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFlBQVksQ0FBQyxXQUFXO1FBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxHQUFHO1lBQ1YsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO1lBQzFCLEdBQUcsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3pCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztZQUM1QixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxVQUFVLENBQUMsZUFBZTtZQUNuQyxJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELFVBQVUsQ0FBQyxLQUFLO1FBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQUVELGtCQUFlLGFBQWEsQ0FBQTtBQUM1QixhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFdEMsaUJBQVMsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBodHRwQ2xpZW50Tmxw57G7XG4gKiBAYXV0aG9yIGJhaWR1QWlwXG4gKi9cbmltcG9ydCBpY29udiA9IHJlcXVpcmUoJ2ljb252LWxpdGUnKTtcbmltcG9ydCBIdHRwQ2xpZW50ID0gcmVxdWlyZSgnLi9odHRwQ2xpZW50Jyk7XG5pbXBvcnQgb2JqZWN0VG9vbHMgPSByZXF1aXJlKCcuLi91dGlsL29iamVjdFRvb2xzJyk7XG5pbXBvcnQgcmVxdWVzdCA9IHJlcXVpcmUoJ3JlcXVlc3QnKTtcbmltcG9ydCBjb2RlID0gcmVxdWlyZSgnLi4vY29uc3QvY29kZScpO1xuXG4vKipcbiAqIEh0dHBDbGllbnRObHDnsbtcbiAqIG5scOaOpeWPo+iwg+eUqOS9v+eUqEdCS+e8lueggeino+eggeWunueOsCzkvp3otZZpY29udi1saXRl5bqTXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hc2h0dWNoa2luL2ljb252LWxpdGVcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEh0dHBDbGllbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBIdHRwQ2xpZW50TmxwIGV4dGVuZHMgSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIHJlcShvcHRpb25zKSB7XG4gICAgICAgIC8vIOmmluWFiOWkhOeQhuiuvue9rklOVEVSQ0VQVE9S55qE5oOF5Ya1XG4gICAgICAgIGlmIChvYmplY3RUb29scy5pc0Z1bmN0aW9uKEh0dHBDbGllbnQuUkVRVUVTVF9JTlRFUkNFUFRPUikpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBIdHRwQ2xpZW50LlJFUVVFU1RfSU5URVJDRVBUT1Iob3B0aW9ucyk7XG4gICAgICAgIC8vIOWFtuasoeiuvue9ruWFqOWxgHJlcXVlc3Qgb3B0aW9uc+eahFxuICAgICAgICB9IGVsc2UgaWYgKG9iamVjdFRvb2xzLmlzT2JqZWN0KEh0dHBDbGllbnQuUkVRVUVTVF9HTE9CQUxfT1BUSU9OUykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvYmplY3RUb29scy5tZXJnZShIdHRwQ2xpZW50LlJFUVVFU1RfR0xPQkFMX09QVElPTlMsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkZWNvZGVkQm9keSA9IGljb252LmRlY29kZShidWZmZXIsIGNvZGUuR0JLKTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShkZWNvZGVkQm9keSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDml6Dms5Xop6PmnpBqc29u6K+35rGC77yM5bCx6L+U5Zue5Y6f5aeLYm9keVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkZWNvZGVkQm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcG9zdFdpdGhJbmZvKHJlcXVlc3RJbmZvKSB7XG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5jcmVhdGVCb2R5KHJlcXVlc3RJbmZvLnBhcmFtcyk7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kOiByZXF1ZXN0SW5mby5tZXRob2QsXG4gICAgICAgICAgICB1cmw6IHJlcXVlc3RJbmZvLmdldFVybCgpLFxuICAgICAgICAgICAgaGVhZGVyczogcmVxdWVzdEluZm8uaGVhZGVycyxcbiAgICAgICAgICAgIGVuY29kaW5nOiBudWxsLFxuICAgICAgICAgICAgdGltZW91dDogSHR0cENsaWVudC5ERUZBVUxUX1RJTUVPVVQsXG4gICAgICAgICAgICBib2R5OiBib2R5XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLnJlcShvcHRpb25zKTtcbiAgICB9XG4gICAgY3JlYXRlQm9keShwYXJhbSkge1xuICAgICAgICBsZXQgYm9keSA9IG51bGw7XG4gICAgICAgIGJvZHkgPSBpY29udi5lbmNvZGUoSlNPTi5zdHJpbmdpZnkocGFyYW0pLCBjb2RlLkdCSyk7XG4gICAgICAgIHJldHVybiBib2R5O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHR0cENsaWVudE5scFxuLy8gQHRzLWlnbm9yZVxuT2JqZWN0LmFzc2lnbihIdHRwQ2xpZW50TmxwLCBleHBvcnRzKTtcbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCA9IEh0dHBDbGllbnRObHA7XG4iXX0=