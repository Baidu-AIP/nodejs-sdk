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
 * @file httpClientExt类
 * @author baiduAip
 */
const HttpClient = require("./httpClient");
const crypto = require("crypto");
/**
 * HttpClientVoice类
 * 百度语音接口调用封装
 * 参考文档：http://speech.baidu.com/docs/asr/57
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
class HttpClientVoiceASR extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        requestInfo.params.token = requestInfo.getAccessToken();
        if (requestInfo.params.token === null) {
            requestInfo.params.token = 'bcekey';
        }
        if (typeof requestInfo.params.cuid === 'undefined') {
            requestInfo.params.cuid = this.genMd5(requestInfo.params.token);
        }
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getPureUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        return this.req(options);
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
    genMd5(str) {
        let md5sum = crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    }
}
exports.default = HttpClientVoiceASR;
// @ts-ignore
Object.assign(HttpClientVoiceASR, exports);
module.exports = HttpClientVoiceASR;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudFZvaWNlQVNSLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvaHR0cC9odHRwQ2xpZW50Vm9pY2VBU1IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCwyQ0FBNEM7QUFDNUMsaUNBQWtDO0FBRWxDOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxrQkFBbUIsU0FBUSxVQUFVO0lBQ3ZDO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsWUFBWSxDQUFDLFdBQVc7UUFDcEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ25DLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztTQUN2QztRQUNELElBQUksT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDaEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxPQUFPLEdBQUc7WUFDVixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07WUFDMUIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLFVBQVUsQ0FBQyxlQUFlO1lBQ25DLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNLENBQUMsR0FBRztRQUNOLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQUVELGtCQUFlLGtCQUFrQixDQUFBO0FBQ2pDLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTNDLGlCQUFTLGtCQUFrQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBodHRwQ2xpZW50RXh057G7XG4gKiBAYXV0aG9yIGJhaWR1QWlwXG4gKi9cblxuaW1wb3J0IEh0dHBDbGllbnQgPSByZXF1aXJlKCcuL2h0dHBDbGllbnQnKTtcbmltcG9ydCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuLyoqXG4gKiBIdHRwQ2xpZW50Vm9pY2XnsbtcbiAqIOeZvuW6puivremfs+aOpeWPo+iwg+eUqOWwgeijhVxuICog5Y+C6ICD5paH5qGj77yaaHR0cDovL3NwZWVjaC5iYWlkdS5jb20vZG9jcy9hc3IvNTdcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEh0dHBDbGllbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBIdHRwQ2xpZW50Vm9pY2VBU1IgZXh0ZW5kcyBIdHRwQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgcG9zdFdpdGhJbmZvKHJlcXVlc3RJbmZvKSB7XG4gICAgICAgIHJlcXVlc3RJbmZvLnBhcmFtcy50b2tlbiA9IHJlcXVlc3RJbmZvLmdldEFjY2Vzc1Rva2VuKCk7XG4gICAgICAgIGlmIChyZXF1ZXN0SW5mby5wYXJhbXMudG9rZW4gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLnBhcmFtcy50b2tlbiA9ICdiY2VrZXknO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdEluZm8ucGFyYW1zLmN1aWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXF1ZXN0SW5mby5wYXJhbXMuY3VpZCA9IHRoaXMuZ2VuTWQ1KHJlcXVlc3RJbmZvLnBhcmFtcy50b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLmNyZWF0ZUJvZHkocmVxdWVzdEluZm8ucGFyYW1zKTtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRob2Q6IHJlcXVlc3RJbmZvLm1ldGhvZCxcbiAgICAgICAgICAgIHVybDogcmVxdWVzdEluZm8uZ2V0UHVyZVVybCgpLFxuICAgICAgICAgICAgaGVhZGVyczogcmVxdWVzdEluZm8uaGVhZGVycyxcbiAgICAgICAgICAgIGVuY29kaW5nOiBudWxsLFxuICAgICAgICAgICAgdGltZW91dDogSHR0cENsaWVudC5ERUZBVUxUX1RJTUVPVVQsXG4gICAgICAgICAgICBib2R5OiBib2R5XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxKG9wdGlvbnMpO1xuICAgIH1cbiAgICBjcmVhdGVCb2R5KHBhcmFtKSB7XG4gICAgICAgIGxldCBib2R5ID0gSlNPTi5zdHJpbmdpZnkocGFyYW0pO1xuICAgICAgICByZXR1cm4gYm9keTtcbiAgICB9XG4gICAgZ2VuTWQ1KHN0cikge1xuICAgICAgICBsZXQgbWQ1c3VtID0gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpO1xuICAgICAgICBtZDVzdW0udXBkYXRlKHN0cik7XG4gICAgICAgIHN0ciA9IG1kNXN1bS5kaWdlc3QoJ2hleCcpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSHR0cENsaWVudFZvaWNlQVNSXG4vLyBAdHMtaWdub3JlXG5PYmplY3QuYXNzaWduKEh0dHBDbGllbnRWb2ljZUFTUiwgZXhwb3J0cyk7XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBIdHRwQ2xpZW50Vm9pY2VBU1I7XG4iXX0=