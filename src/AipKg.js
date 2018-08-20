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
 * @file AipKg.js
 * @author baidu aip
 */
const BaseClient = require("./client/baseClient");
const RequestInfo = require("./client/requestInfo");
const HttpClient = require("./http/httpClient");
const objectTools = require("./util/objectTools");
const METHOD_POST = 'POST';
const CREATE_TASK_PATH = '/rest/2.0/kg/v1/pie/task_create';
const UPDATE_TASK_PATH = '/rest/2.0/kg/v1/pie/task_update';
const TASK_INFO_PATH = '/rest/2.0/kg/v1/pie/task_info';
const TASK_QUERY_PATH = '/rest/2.0/kg/v1/pie/task_query';
const TASK_START_PATH = '/rest/2.0/kg/v1/pie/task_start';
const TASK_STATUS_PATH = '/rest/2.0/kg/v1/pie/task_status';
/**
 * AipKg类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipKg extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl, param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }
    /**
     * 创建任务接口
     *
     * @param {string} name - 任务名字
     * @param {string} templateContent - json string 解析模板内容
     * @param {string} inputMappingFile - 抓取结果映射文件的路径
     * @param {string} outputFile - 输出文件名字
     * @param {string} urlPattern - url pattern
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   limit_count 限制解析数量limit_count为0时进行全量任务，limit_count&gt;0时只解析limit_count数量的页面
     * @return {Promise} - 标准Promise对象
     */
    createTask(name, templateContent, inputMappingFile, outputFile, urlPattern, options) {
        let param = {
            name: name,
            template_content: templateContent,
            input_mapping_file: inputMappingFile,
            output_file: outputFile,
            url_pattern: urlPattern,
            targetPath: CREATE_TASK_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 更新任务接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   name 任务名字
     *   template_content json string 解析模板内容
     *   input_mapping_file 抓取结果映射文件的路径
     *   url_pattern url pattern
     *   output_file 输出文件名字
     * @return {Promise} - 标准Promise对象
     */
    updateTask(id, options) {
        let param = {
            id: id,
            targetPath: UPDATE_TASK_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 获取任务详情接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    getTaskInfo(id, options) {
        let param = {
            id: id,
            targetPath: TASK_INFO_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 以分页的方式查询当前用户所有的任务信息接口
     *
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   id 任务ID，精确匹配
     *   name 中缀模糊匹配,abc可以匹配abc,aaabc,abcde等
     *   status 要筛选的任务状态
     *   page 页码
     *   per_page 页码
     * @return {Promise} - 标准Promise对象
     */
    getUserTasks(options) {
        let param = {
            targetPath: TASK_QUERY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 启动任务接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    startTask(id, options) {
        let param = {
            id: id,
            targetPath: TASK_START_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 查询任务状态接口
     *
     * @param {integer} id - 任务ID
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    getTaskStatus(id, options) {
        let param = {
            id: id,
            targetPath: TASK_STATUS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}
exports.default = AipKg;
// @ts-ignore
Object.assign(AipKg, exports);
module.exports = AipKg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlwS2cuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInNyYy9BaXBLZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFDYjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUlILGtEQUFtRDtBQUVuRCxvREFBcUQ7QUFFckQsZ0RBQWlEO0FBRWpELGtEQUFtRDtBQUVuRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFFM0IsTUFBTSxnQkFBZ0IsR0FBRyxpQ0FBaUMsQ0FBQztBQUMzRCxNQUFNLGdCQUFnQixHQUFHLGlDQUFpQyxDQUFDO0FBQzNELE1BQU0sY0FBYyxHQUFHLCtCQUErQixDQUFDO0FBQ3ZELE1BQU0sZUFBZSxHQUFHLGdDQUFnQyxDQUFDO0FBQ3pELE1BQU0sZUFBZSxHQUFHLGdDQUFnQyxDQUFDO0FBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsaUNBQWlDLENBQUM7QUFHM0Q7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxLQUFNLFNBQVEsVUFBVTtJQUMxQixZQUFZLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNyQixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3hCLElBQUksV0FBVyxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sRUFDcEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTztRQUMvRSxJQUFJLEtBQUssR0FBRztZQUNSLElBQUksRUFBRSxJQUFJO1lBQ1YsZ0JBQWdCLEVBQUUsZUFBZTtZQUNqQyxrQkFBa0IsRUFBRSxnQkFBZ0I7WUFDcEMsV0FBVyxFQUFFLFVBQVU7WUFDdkIsV0FBVyxFQUFFLFVBQVU7WUFDdkIsVUFBVSxFQUFFLGdCQUFnQjtTQUMvQixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTztRQUNsQixJQUFJLEtBQUssR0FBRztZQUNSLEVBQUUsRUFBRSxFQUFFO1lBQ04sVUFBVSxFQUFFLGdCQUFnQjtTQUMvQixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxXQUFXLENBQUMsRUFBRSxFQUFFLE9BQU87UUFDbkIsSUFBSSxLQUFLLEdBQUc7WUFDUixFQUFFLEVBQUUsRUFBRTtZQUNOLFVBQVUsRUFBRSxjQUFjO1NBQzdCLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLENBQUMsT0FBTztRQUNoQixJQUFJLEtBQUssR0FBRztZQUNSLFVBQVUsRUFBRSxlQUFlO1NBQzlCLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFNBQVMsQ0FBQyxFQUFFLEVBQUUsT0FBTztRQUNqQixJQUFJLEtBQUssR0FBRztZQUNSLEVBQUUsRUFBRSxFQUFFO1lBQ04sVUFBVSxFQUFFLGVBQWU7U0FDOUIsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPO1FBQ3JCLElBQUksS0FBSyxHQUFHO1lBQ1IsRUFBRSxFQUFFLEVBQUU7WUFDTixVQUFVLEVBQUUsZ0JBQWdCO1NBQy9CLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxLQUFLLENBQUE7QUFDcEIsYUFBYTtBQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRTlCLGlCQUFTLEtBQUssQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEJhaWR1LmNvbSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvblxuICogYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQGZpbGUgQWlwS2cuanNcbiAqIEBhdXRob3IgYmFpZHUgYWlwXG4gKi9cblxuXG5cbmltcG9ydCBCYXNlQ2xpZW50ID0gcmVxdWlyZSgnLi9jbGllbnQvYmFzZUNsaWVudCcpO1xuXG5pbXBvcnQgUmVxdWVzdEluZm8gPSByZXF1aXJlKCcuL2NsaWVudC9yZXF1ZXN0SW5mbycpO1xuXG5pbXBvcnQgSHR0cENsaWVudCA9IHJlcXVpcmUoJy4vaHR0cC9odHRwQ2xpZW50Jyk7XG5cbmltcG9ydCBvYmplY3RUb29scyA9IHJlcXVpcmUoJy4vdXRpbC9vYmplY3RUb29scycpO1xuXG5jb25zdCBNRVRIT0RfUE9TVCA9ICdQT1NUJztcblxuY29uc3QgQ1JFQVRFX1RBU0tfUEFUSCA9ICcvcmVzdC8yLjAva2cvdjEvcGllL3Rhc2tfY3JlYXRlJztcbmNvbnN0IFVQREFURV9UQVNLX1BBVEggPSAnL3Jlc3QvMi4wL2tnL3YxL3BpZS90YXNrX3VwZGF0ZSc7XG5jb25zdCBUQVNLX0lORk9fUEFUSCA9ICcvcmVzdC8yLjAva2cvdjEvcGllL3Rhc2tfaW5mbyc7XG5jb25zdCBUQVNLX1FVRVJZX1BBVEggPSAnL3Jlc3QvMi4wL2tnL3YxL3BpZS90YXNrX3F1ZXJ5JztcbmNvbnN0IFRBU0tfU1RBUlRfUEFUSCA9ICcvcmVzdC8yLjAva2cvdjEvcGllL3Rhc2tfc3RhcnQnO1xuY29uc3QgVEFTS19TVEFUVVNfUEFUSCA9ICcvcmVzdC8yLjAva2cvdjEvcGllL3Rhc2tfc3RhdHVzJztcblxuXG4vKipcbiAqIEFpcEtn57G7XG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBCYXNlQ2xpZW50XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcHBpZCBhcHBpZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhayAgYWNjZXNzIGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzayAgc2VjdXJpdHkga2V5LlxuICovXG5jbGFzcyBBaXBLZyBleHRlbmRzIEJhc2VDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGFwcElkLCBhaywgc2spIHtcbiAgICAgICAgc3VwZXIoYXBwSWQsIGFrLCBzayk7XG4gICAgfVxuICAgIGNvbW1vbkltcGwocGFyYW0pIHtcbiAgICAgICAgbGV0IGh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgICAgICBsZXQgYXBpVXJsID0gcGFyYW0udGFyZ2V0UGF0aDtcbiAgICAgICAgZGVsZXRlIHBhcmFtLnRhcmdldFBhdGg7XG4gICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyhhcGlVcmwsXG4gICAgICAgICAgICBwYXJhbSwgTUVUSE9EX1BPU1QpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QocmVxdWVzdEluZm8sIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uuS7u+WKoeaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSDku7vliqHlkI3lrZdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGVDb250ZW50IC0ganNvbiBzdHJpbmcg6Kej5p6Q5qih5p2/5YaF5a65XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0TWFwcGluZ0ZpbGUgLSDmipPlj5bnu5PmnpzmmKDlsITmlofku7bnmoTot6/lvoRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3V0cHV0RmlsZSAtIOi+k+WHuuaWh+S7tuWQjeWtl1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxQYXR0ZXJuIC0gdXJsIHBhdHRlcm5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBsaW1pdF9jb3VudCDpmZDliLbop6PmnpDmlbDph49saW1pdF9jb3VudOS4ujDml7bov5vooYzlhajph4/ku7vliqHvvIxsaW1pdF9jb3VudCZndDsw5pe25Y+q6Kej5p6QbGltaXRfY291bnTmlbDph4/nmoTpobXpnaJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBjcmVhdGVUYXNrKG5hbWUsIHRlbXBsYXRlQ29udGVudCwgaW5wdXRNYXBwaW5nRmlsZSwgb3V0cHV0RmlsZSwgdXJsUGF0dGVybiwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgdGVtcGxhdGVfY29udGVudDogdGVtcGxhdGVDb250ZW50LFxuICAgICAgICAgICAgaW5wdXRfbWFwcGluZ19maWxlOiBpbnB1dE1hcHBpbmdGaWxlLFxuICAgICAgICAgICAgb3V0cHV0X2ZpbGU6IG91dHB1dEZpbGUsXG4gICAgICAgICAgICB1cmxfcGF0dGVybjogdXJsUGF0dGVybixcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IENSRUFURV9UQVNLX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOS7u+WKoeaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtpbnRlZ2VyfSBpZCAtIOS7u+WKoUlEXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgbmFtZSDku7vliqHlkI3lrZdcbiAgICAgKiAgIHRlbXBsYXRlX2NvbnRlbnQganNvbiBzdHJpbmcg6Kej5p6Q5qih5p2/5YaF5a65XG4gICAgICogICBpbnB1dF9tYXBwaW5nX2ZpbGUg5oqT5Y+W57uT5p6c5pig5bCE5paH5Lu255qE6Lev5b6EXG4gICAgICogICB1cmxfcGF0dGVybiB1cmwgcGF0dGVyblxuICAgICAqICAgb3V0cHV0X2ZpbGUg6L6T5Ye65paH5Lu25ZCN5a2XXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgdXBkYXRlVGFzayhpZCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBVUERBVEVfVEFTS19QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bku7vliqHor6bmg4XmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgLSDku7vliqFJRFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBnZXRUYXNrSW5mbyhpZCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBUQVNLX0lORk9fUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Lul5YiG6aG155qE5pa55byP5p+l6K+i5b2T5YmN55So5oi35omA5pyJ55qE5Lu75Yqh5L+h5oGv5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBpZCDku7vliqFJRO+8jOeyvuehruWMuemFjVxuICAgICAqICAgbmFtZSDkuK3nvIDmqKHns4rljLnphY0sYWJj5Y+v5Lul5Yy56YWNYWJjLGFhYWJjLGFiY2Rl562JXG4gICAgICogICBzdGF0dXMg6KaB562b6YCJ55qE5Lu75Yqh54q25oCBXG4gICAgICogICBwYWdlIOmhteeggVxuICAgICAqICAgcGVyX3BhZ2Ug6aG156CBXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZ2V0VXNlclRhc2tzKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGFyZ2V0UGF0aDogVEFTS19RVUVSWV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlkK/liqjku7vliqHmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgLSDku7vliqFJRFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBzdGFydFRhc2soaWQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogVEFTS19TVEFSVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmn6Xor6Lku7vliqHnirbmgIHmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gaWQgLSDku7vliqFJRFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBnZXRUYXNrU3RhdHVzKGlkLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFRBU0tfU1RBVFVTX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWlwS2dcbi8vIEB0cy1pZ25vcmVcbk9iamVjdC5hc3NpZ24oQWlwS2csIGV4cG9ydHMpO1xuLy8gQHRzLWlnbm9yZVxuZXhwb3J0ID0gQWlwS2c7XG4iXX0=