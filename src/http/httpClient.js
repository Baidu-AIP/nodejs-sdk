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
 * @file httpClient类
 * @author baiduAip
 */
const request = require("request");
const objectTools = require("../util/objectTools");
/**
 * HttpClient类
 * 通用接口调用，依赖request库
 * @see https://github.com/request/request
 *
 * @class
 * @constructor
 */
class HttpClient {
    postWithInfo(requestInfo) {
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            form: requestInfo.params,
            timeout: HttpClient.DEFAULT_TIMEOUT
        };
        // @ts-ignore
        return this.req(options);
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
                    try {
                        resolve(JSON.parse(body));
                    }
                    catch (e) {
                        // 无法解析json请求，就返回原始body
                        resolve(body);
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    }
}
(function (HttpClient) {
    /**
     * 用来设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
     * @see https://github.com/request/request#requestoptions-callback
     * @see https://github.com/request/request
     */
    function setRequestOptions(options) {
        HttpClient.REQUEST_GLOBAL_OPTIONS = options;
    }
    HttpClient.setRequestOptions = setRequestOptions;
    /**
     * 用来获取和设置request库的参数，会覆盖所有options，设置时请确保你知道它的作用
     * 优先级高于setRequestOptions
     *
     * @see https://github.com/request/request#requestoptions-callback
     * @see https://github.com/request/request
     */
    function setRequestInterceptor(interceptorCallback) {
        HttpClient.REQUEST_INTERCEPTOR = interceptorCallback;
    }
    HttpClient.setRequestInterceptor = setRequestInterceptor;
    HttpClient.REQUEST_GLOBAL_OPTIONS = null;
    HttpClient.REQUEST_INTERCEPTOR = null;
    HttpClient.DEFAULT_TIMEOUT = 10000;
})(HttpClient || (HttpClient = {}));
exports.default = HttpClient;
// @ts-ignore
Object.assign(HttpClient, exports);
module.exports = HttpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL2h0dHAvaHR0cENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFDYjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILG1DQUFvQztBQUNwQyxtREFBb0Q7QUFHcEQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVTtJQUNaLFlBQVksQ0FBQyxXQUF3QjtRQUNqQyxJQUFJLE9BQU8sR0FBRztZQUNWLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtZQUMxQixHQUFHLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUN6QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87WUFDNUIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sRUFBRSxVQUFVLENBQUMsZUFBZTtTQUN0QyxDQUFDO1FBRUYsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsR0FBRyxDQUFDLE9BQVU7UUFDVix1QkFBdUI7UUFDdkIsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3hELE9BQU8sR0FBRyxVQUFVLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQseUJBQXlCO1NBQ3hCO2FBQU0sSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMzRTtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJO2dCQUMzQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ2hCLElBQUk7d0JBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDN0I7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1IsdUJBQXVCO3dCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2pCO2lCQUNKO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakI7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBRUQsV0FBVSxVQUFVO0lBR2hCOzs7O09BSUc7SUFDSCxTQUFnQixpQkFBaUIsQ0FBZ0MsT0FBVTtRQUN2RSxVQUFVLENBQUMsc0JBQXNCLEdBQUcsT0FBTyxDQUFDO0lBQ2hELENBQUM7SUFGZSw0QkFBaUIsb0JBRWhDLENBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxtQkFBbUI7UUFDckQsVUFBVSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0lBQ3pELENBQUM7SUFGZSxnQ0FBcUIsd0JBRXBDLENBQUE7SUFFVSxpQ0FBc0IsR0FBd0IsSUFBSSxDQUFDO0lBRW5ELDhCQUFtQixHQUFHLElBQUksQ0FBQztJQUUzQiwwQkFBZSxHQUFHLEtBQUssQ0FBQztBQUN2QyxDQUFDLEVBNUJTLFVBQVUsS0FBVixVQUFVLFFBNEJuQjtBQUVELGtCQUFlLFVBQVUsQ0FBQztBQUMxQixhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFbkMsaUJBQVMsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBodHRwQ2xpZW5057G7XG4gKiBAYXV0aG9yIGJhaWR1QWlwXG4gKi9cbmltcG9ydCByZXF1ZXN0ID0gcmVxdWlyZSgncmVxdWVzdCcpO1xuaW1wb3J0IG9iamVjdFRvb2xzID0gcmVxdWlyZSgnLi4vdXRpbC9vYmplY3RUb29scycpO1xuaW1wb3J0IFJlcXVlc3RJbmZvID0gcmVxdWlyZSgnLi4vY2xpZW50L3JlcXVlc3RJbmZvJyk7XG5cbi8qKlxuICogSHR0cENsaWVudOexu1xuICog6YCa55So5o6l5Y+j6LCD55So77yM5L6d6LWWcmVxdWVzdOW6k1xuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVxdWVzdC9yZXF1ZXN0XG4gKlxuICogQGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgSHR0cENsaWVudDxUID0gYW55LCBPIGV4dGVuZHMgcmVxdWVzdC5PcHRpb25zID0gcmVxdWVzdC5PcHRpb25zPiB7XG4gICAgcG9zdFdpdGhJbmZvKHJlcXVlc3RJbmZvOiBSZXF1ZXN0SW5mbyk6IFByb21pc2U8VD4ge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogcmVxdWVzdEluZm8ubWV0aG9kLFxuICAgICAgICAgICAgdXJsOiByZXF1ZXN0SW5mby5nZXRVcmwoKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlcXVlc3RJbmZvLmhlYWRlcnMsXG4gICAgICAgICAgICBmb3JtOiByZXF1ZXN0SW5mby5wYXJhbXMsXG4gICAgICAgICAgICB0aW1lb3V0OiBIdHRwQ2xpZW50LkRFRkFVTFRfVElNRU9VVFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxKG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXEob3B0aW9uczogTyk6IFByb21pc2U8VD4ge1xuICAgICAgICAvLyDpppblhYjlpITnkIborr7nva5JTlRFUkNFUFRPUueahOaDheWGtVxuICAgICAgICBpZiAob2JqZWN0VG9vbHMuaXNGdW5jdGlvbihIdHRwQ2xpZW50LlJFUVVFU1RfSU5URVJDRVBUT1IpKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gSHR0cENsaWVudC5SRVFVRVNUX0lOVEVSQ0VQVE9SKG9wdGlvbnMpO1xuICAgICAgICAvLyDlhbbmrKHorr7nva7lhajlsYByZXF1ZXN0IG9wdGlvbnPnmoRcbiAgICAgICAgfSBlbHNlIGlmIChvYmplY3RUb29scy5pc09iamVjdChIdHRwQ2xpZW50LlJFUVVFU1RfR0xPQkFMX09QVElPTlMpKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb2JqZWN0VG9vbHMubWVyZ2UoSHR0cENsaWVudC5SRVFVRVNUX0dMT0JBTF9PUFRJT05TLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHJlcXVlc3Qob3B0aW9ucywgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoYm9keSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDml6Dms5Xop6PmnpBqc29u6K+35rGC77yM5bCx6L+U5Zue5Y6f5aeLYm9keVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubmFtZXNwYWNlIEh0dHBDbGllbnRcbntcblxuICAgIC8qKlxuICAgICAqIOeUqOadpeiuvue9rnJlcXVlc3TlupPnmoTlj4LmlbDvvIzkvJropobnm5bmiYDmnIlvcHRpb25z77yM6K6+572u5pe26K+356Gu5L+d5L2g55+l6YGT5a6D55qE5L2c55SoXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVxdWVzdC9yZXF1ZXN0I3JlcXVlc3RvcHRpb25zLWNhbGxiYWNrXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVxdWVzdC9yZXF1ZXN0XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldFJlcXVlc3RPcHRpb25zPFQgZXh0ZW5kcyByZXF1ZXN0LkNvcmVPcHRpb25zPihvcHRpb25zOiBUKSB7XG4gICAgICAgIEh0dHBDbGllbnQuUkVRVUVTVF9HTE9CQUxfT1BUSU9OUyA9IG9wdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55So5p2l6I635Y+W5ZKM6K6+572ucmVxdWVzdOW6k+eahOWPguaVsO+8jOS8muimhuebluaJgOaciW9wdGlvbnPvvIzorr7nva7ml7bor7fnoa7kv53kvaDnn6XpgZPlroPnmoTkvZznlKhcbiAgICAgKiDkvJjlhYjnuqfpq5jkuo5zZXRSZXF1ZXN0T3B0aW9uc1xuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVxdWVzdC9yZXF1ZXN0I3JlcXVlc3RvcHRpb25zLWNhbGxiYWNrXG4gICAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVxdWVzdC9yZXF1ZXN0XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldFJlcXVlc3RJbnRlcmNlcHRvcihpbnRlcmNlcHRvckNhbGxiYWNrKSB7XG4gICAgICAgIEh0dHBDbGllbnQuUkVRVUVTVF9JTlRFUkNFUFRPUiA9IGludGVyY2VwdG9yQ2FsbGJhY2s7XG4gICAgfVxuXG4gICAgZXhwb3J0IGxldCBSRVFVRVNUX0dMT0JBTF9PUFRJT05TOiByZXF1ZXN0LkNvcmVPcHRpb25zID0gbnVsbDtcblxuICAgIGV4cG9ydCBsZXQgUkVRVUVTVF9JTlRFUkNFUFRPUiA9IG51bGw7XG5cbiAgICBleHBvcnQgbGV0IERFRkFVTFRfVElNRU9VVCA9IDEwMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBIdHRwQ2xpZW50O1xuLy8gQHRzLWlnbm9yZVxuT2JqZWN0LmFzc2lnbihIdHRwQ2xpZW50LCBleHBvcnRzKTtcbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCA9IEh0dHBDbGllbnQ7XG4iXX0=