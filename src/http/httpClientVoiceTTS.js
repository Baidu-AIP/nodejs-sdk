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
class HttpClientVoiceTTS extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        requestInfo.params.tok = requestInfo.getAccessToken();
        if (requestInfo.params.tok === null) {
            requestInfo.params.tok = 'bcekey';
        }
        if (typeof requestInfo.params.cuid === 'undefined') {
            requestInfo.params.cuid = this.genMd5(requestInfo.params.tok);
        }
        let options = {
            method: requestInfo.method,
            url: requestInfo.getPureUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            form: requestInfo.params
        };
        return this.req(options).then(function (data) {
            if (data instanceof Buffer) {
                return { data: data };
            }
            return data;
        });
    }
    genMd5(str) {
        let md5sum = crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    }
}
exports.default = HttpClientVoiceTTS;
// @ts-ignore
Object.assign(HttpClientVoiceTTS, exports);
module.exports = HttpClientVoiceTTS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cENsaWVudFZvaWNlVFRTLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvaHR0cC9odHRwQ2xpZW50Vm9pY2VUVFMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCwyQ0FBNEM7QUFDNUMsaUNBQWtDO0FBRWxDOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxrQkFBbUIsU0FBUSxVQUFVO0lBQ3ZDO1FBQ0ksS0FBSyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsWUFBWSxDQUFDLFdBQVc7UUFDcEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RELElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2pDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztTQUNyQztRQUNELElBQUksT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDaEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxPQUFPLEdBQUc7WUFDVixNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07WUFDMUIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO1lBQzVCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLFVBQVUsQ0FBQyxlQUFlO1lBQ25DLElBQUksRUFBRSxXQUFXLENBQUMsTUFBTTtTQUMzQixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLElBQUk7WUFDdkMsSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFFO2dCQUN4QixPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFBO2FBQ3RCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTSxDQUFDLEdBQUc7UUFDTixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFFRCxrQkFBZSxrQkFBa0IsQ0FBQTtBQUNqQyxhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUUzQyxpQkFBUyxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEJhaWR1LmNvbSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvblxuICogYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQGZpbGUgaHR0cENsaWVudEV4dOexu1xuICogQGF1dGhvciBiYWlkdUFpcFxuICovXG5cbmltcG9ydCBIdHRwQ2xpZW50ID0gcmVxdWlyZSgnLi9odHRwQ2xpZW50Jyk7XG5pbXBvcnQgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cbi8qKlxuICogSHR0cENsaWVudFZvaWNl57G7XG4gKiDnmb7luqbor63pn7PmjqXlj6PosIPnlKjlsIHoo4VcbiAqIOWPguiAg+aWh+aho++8mmh0dHA6Ly9zcGVlY2guYmFpZHUuY29tL2RvY3MvYXNyLzU3XG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBIdHRwQ2xpZW50XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgSHR0cENsaWVudFZvaWNlVFRTIGV4dGVuZHMgSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIHBvc3RXaXRoSW5mbyhyZXF1ZXN0SW5mbykge1xuICAgICAgICByZXF1ZXN0SW5mby5wYXJhbXMudG9rID0gcmVxdWVzdEluZm8uZ2V0QWNjZXNzVG9rZW4oKTtcbiAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnBhcmFtcy50b2sgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJlcXVlc3RJbmZvLnBhcmFtcy50b2sgPSAnYmNla2V5JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3RJbmZvLnBhcmFtcy5jdWlkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmVxdWVzdEluZm8ucGFyYW1zLmN1aWQgPSB0aGlzLmdlbk1kNShyZXF1ZXN0SW5mby5wYXJhbXMudG9rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0aG9kOiByZXF1ZXN0SW5mby5tZXRob2QsXG4gICAgICAgICAgICB1cmw6IHJlcXVlc3RJbmZvLmdldFB1cmVVcmwoKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlcXVlc3RJbmZvLmhlYWRlcnMsXG4gICAgICAgICAgICBlbmNvZGluZzogbnVsbCxcbiAgICAgICAgICAgIHRpbWVvdXQ6IEh0dHBDbGllbnQuREVGQVVMVF9USU1FT1VULFxuICAgICAgICAgICAgZm9ybTogcmVxdWVzdEluZm8ucGFyYW1zXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVxKG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2RhdGE6IGRhdGF9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdlbk1kNShzdHIpIHtcbiAgICAgICAgbGV0IG1kNXN1bSA9IGNyeXB0by5jcmVhdGVIYXNoKCdtZDUnKTtcbiAgICAgICAgbWQ1c3VtLnVwZGF0ZShzdHIpO1xuICAgICAgICBzdHIgPSBtZDVzdW0uZGlnZXN0KCdoZXgnKTtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEh0dHBDbGllbnRWb2ljZVRUU1xuLy8gQHRzLWlnbm9yZVxuT2JqZWN0LmFzc2lnbihIdHRwQ2xpZW50Vm9pY2VUVFMsIGV4cG9ydHMpO1xuLy8gQHRzLWlnbm9yZVxuZXhwb3J0ID0gSHR0cENsaWVudFZvaWNlVFRTO1xuIl19