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
 * @file AipImageClassify.js
 * @author baidu aip
 */
const BaseClient = require("./client/baseClient");
const RequestInfo = require("./client/requestInfo");
const HttpClient = require("./http/httpClient");
const objectTools = require("./util/objectTools");
const METHOD_POST = 'POST';
const ADVANCED_GENERAL_PATH = '/rest/2.0/image-classify/v2/advanced_general';
const DISH_DETECT_PATH = '/rest/2.0/image-classify/v2/dish';
const CAR_DETECT_PATH = '/rest/2.0/image-classify/v1/car';
const LOGO_SEARCH_PATH = '/rest/2.0/image-classify/v2/logo';
const LOGO_ADD_PATH = '/rest/2.0/realtime_search/v1/logo/add';
const LOGO_DELETE_PATH = '/rest/2.0/realtime_search/v1/logo/delete';
const ANIMAL_DETECT_PATH = '/rest/2.0/image-classify/v1/animal';
const PLANT_DETECT_PATH = '/rest/2.0/image-classify/v1/plant';
const OBJECT_DETECT_PATH = '/rest/2.0/image-classify/v1/object_detect';
/**
 * AipImageClassify类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageClassify extends BaseClient {
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
     * 通用物体识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    advancedGeneral(image, options) {
        let param = {
            image: image,
            targetPath: ADVANCED_GENERAL_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 菜品识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {Promise} - 标准Promise对象
     */
    dishDetect(image, options) {
        let param = {
            image: image,
            targetPath: DISH_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 车辆识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {Promise} - 标准Promise对象
     */
    carDetect(image, options) {
        let param = {
            image: image,
            targetPath: CAR_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * logo商标识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   custom_lib 是否只使用自定义logo库的结果，默认false：返回自定义库+默认库的识别结果
     * @return {Promise} - 标准Promise对象
     */
    logoSearch(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * logo商标识别—添加接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} brief - brief，检索时带回。此处要传对应的name与code字段，name长度小于100B，code长度小于150B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoAdd(image, brief, options) {
        let param = {
            image: image,
            brief: brief,
            targetPath: LOGO_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * logo商标识别—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * logo商标识别—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: LOGO_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 动物识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为6
     * @return {Promise} - 标准Promise对象
     */
    animalDetect(image, options) {
        let param = {
            image: image,
            targetPath: ANIMAL_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 植物识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    plantDetect(image, options) {
        let param = {
            image: image,
            targetPath: PLANT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 图像主体检测接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   with_face 如果检测主体是人，主体区域是否带上人脸部分，0-不带人脸区域，其他-带人脸区域，裁剪类需求推荐带人脸，检索/识别类需求推荐不带人脸。默认取1，带人脸。
     * @return {Promise} - 标准Promise对象
     */
    objectDetect(image, options) {
        let param = {
            image: image,
            targetPath: OBJECT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}
exports.default = AipImageClassify;
// @ts-ignore
Object.assign(AipImageClassify, exports);
module.exports = AipImageClassify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlwSW1hZ2VDbGFzc2lmeS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL0FpcEltYWdlQ2xhc3NpZnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFFSCxrREFBbUQ7QUFFbkQsb0RBQXFEO0FBRXJELGdEQUFpRDtBQUVqRCxrREFBbUQ7QUFFbkQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDO0FBRTNCLE1BQU0scUJBQXFCLEdBQUcsOENBQThDLENBQUM7QUFDN0UsTUFBTSxnQkFBZ0IsR0FBRyxrQ0FBa0MsQ0FBQztBQUM1RCxNQUFNLGVBQWUsR0FBRyxpQ0FBaUMsQ0FBQztBQUMxRCxNQUFNLGdCQUFnQixHQUFHLGtDQUFrQyxDQUFDO0FBQzVELE1BQU0sYUFBYSxHQUFHLHVDQUF1QyxDQUFDO0FBQzlELE1BQU0sZ0JBQWdCLEdBQUcsMENBQTBDLENBQUM7QUFDcEUsTUFBTSxrQkFBa0IsR0FBRyxvQ0FBb0MsQ0FBQztBQUNoRSxNQUFNLGlCQUFpQixHQUFHLG1DQUFtQyxDQUFDO0FBQzlELE1BQU0sa0JBQWtCLEdBQUcsMkNBQTJDLENBQUM7QUFHdkU7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxnQkFBaUIsU0FBUSxVQUFVO0lBQ3JDLFlBQVksS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxVQUFVLENBQUMsS0FBSztRQUNaLElBQUksVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDbEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM5QixPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUNwQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7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OztPQU9HO0lBQ0gsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPO1FBQ3RCLElBQUksS0FBSyxHQUFHO1lBQ1IsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsaUJBQWlCO1NBQ2hDLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU87UUFDdkIsSUFBSSxLQUFLLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxrQkFBa0I7U0FDakMsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDSjtBQUVELGtCQUFlLGdCQUFnQixDQUFBO0FBQy9CLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXpDLGlCQUFTLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBBaXBJbWFnZUNsYXNzaWZ5LmpzXG4gKiBAYXV0aG9yIGJhaWR1IGFpcFxuICovXG5cbmltcG9ydCBCYXNlQ2xpZW50ID0gcmVxdWlyZSgnLi9jbGllbnQvYmFzZUNsaWVudCcpO1xuXG5pbXBvcnQgUmVxdWVzdEluZm8gPSByZXF1aXJlKCcuL2NsaWVudC9yZXF1ZXN0SW5mbycpO1xuXG5pbXBvcnQgSHR0cENsaWVudCA9IHJlcXVpcmUoJy4vaHR0cC9odHRwQ2xpZW50Jyk7XG5cbmltcG9ydCBvYmplY3RUb29scyA9IHJlcXVpcmUoJy4vdXRpbC9vYmplY3RUb29scycpO1xuXG5jb25zdCBNRVRIT0RfUE9TVCA9ICdQT1NUJztcblxuY29uc3QgQURWQU5DRURfR0VORVJBTF9QQVRIID0gJy9yZXN0LzIuMC9pbWFnZS1jbGFzc2lmeS92Mi9hZHZhbmNlZF9nZW5lcmFsJztcbmNvbnN0IERJU0hfREVURUNUX1BBVEggPSAnL3Jlc3QvMi4wL2ltYWdlLWNsYXNzaWZ5L3YyL2Rpc2gnO1xuY29uc3QgQ0FSX0RFVEVDVF9QQVRIID0gJy9yZXN0LzIuMC9pbWFnZS1jbGFzc2lmeS92MS9jYXInO1xuY29uc3QgTE9HT19TRUFSQ0hfUEFUSCA9ICcvcmVzdC8yLjAvaW1hZ2UtY2xhc3NpZnkvdjIvbG9nbyc7XG5jb25zdCBMT0dPX0FERF9QQVRIID0gJy9yZXN0LzIuMC9yZWFsdGltZV9zZWFyY2gvdjEvbG9nby9hZGQnO1xuY29uc3QgTE9HT19ERUxFVEVfUEFUSCA9ICcvcmVzdC8yLjAvcmVhbHRpbWVfc2VhcmNoL3YxL2xvZ28vZGVsZXRlJztcbmNvbnN0IEFOSU1BTF9ERVRFQ1RfUEFUSCA9ICcvcmVzdC8yLjAvaW1hZ2UtY2xhc3NpZnkvdjEvYW5pbWFsJztcbmNvbnN0IFBMQU5UX0RFVEVDVF9QQVRIID0gJy9yZXN0LzIuMC9pbWFnZS1jbGFzc2lmeS92MS9wbGFudCc7XG5jb25zdCBPQkpFQ1RfREVURUNUX1BBVEggPSAnL3Jlc3QvMi4wL2ltYWdlLWNsYXNzaWZ5L3YxL29iamVjdF9kZXRlY3QnO1xuXG5cbi8qKlxuICogQWlwSW1hZ2VDbGFzc2lmeeexu1xuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQmFzZUNsaWVudFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwaWQgYXBwaWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gYWsgIGFjY2VzcyBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2sgIHNlY3VyaXR5IGtleS5cbiAqL1xuY2xhc3MgQWlwSW1hZ2VDbGFzc2lmeSBleHRlbmRzIEJhc2VDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGFwcElkLCBhaywgc2spIHtcbiAgICAgICAgc3VwZXIoYXBwSWQsIGFrLCBzayk7XG4gICAgfVxuICAgIGNvbW1vbkltcGwocGFyYW0pIHtcbiAgICAgICAgbGV0IGh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgICAgICBsZXQgYXBpVXJsID0gcGFyYW0udGFyZ2V0UGF0aDtcbiAgICAgICAgZGVsZXRlIHBhcmFtLnRhcmdldFBhdGg7XG4gICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyhhcGlVcmwsXG4gICAgICAgICAgICBwYXJhbSwgTUVUSE9EX1BPU1QpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QocmVxdWVzdEluZm8sIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmueUqOeJqeS9k+ivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGFkdmFuY2VkR2VuZXJhbChpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBBRFZBTkNFRF9HRU5FUkFMX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiPnOWTgeivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgdG9wX251bSDov5Tlm57pooTmtYvlvpfliIZ0b3Dnu5PmnpzmlbDvvIzpu5jorqTkuLo1XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZGlzaERldGVjdChpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBESVNIX0RFVEVDVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDovabovobor4bliKvmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIHRvcF9udW0g6L+U5Zue6aKE5rWL5b6X5YiGdG9w57uT5p6c5pWw77yM6buY6K6k5Li6NVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGNhckRldGVjdChpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBDQVJfREVURUNUX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvZ2/llYbmoIfor4bliKvmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIGN1c3RvbV9saWIg5piv5ZCm5Y+q5L2/55So6Ieq5a6a5LmJbG9nb+W6k+eahOe7k+aenO+8jOm7mOiupGZhbHNl77ya6L+U5Zue6Ieq5a6a5LmJ5bqTK+m7mOiupOW6k+eahOivhuWIq+e7k+aenFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGxvZ29TZWFyY2goaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogTE9HT19TRUFSQ0hfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9nb+WVhuagh+ivhuWIq+KAlOa3u+WKoOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJyaWVmIC0gYnJpZWbvvIzmo4DntKLml7bluKblm57jgILmraTlpITopoHkvKDlr7nlupTnmoRuYW1l5LiOY29kZeWtl+aute+8jG5hbWXplb/luqblsI/kuo4xMDBC77yMY29kZemVv+W6puWwj+S6jjE1MEJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgbG9nb0FkZChpbWFnZSwgYnJpZWYsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgYnJpZWY6IGJyaWVmLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogTE9HT19BRERfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9nb+WVhuagh+ivhuWIq+KAlOWIoOmZpOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGxvZ29EZWxldGVCeUltYWdlKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IExPR09fREVMRVRFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvZ2/llYbmoIfor4bliKvigJTliKDpmaTmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250U2lnbiAtIOWbvueJh+etvuWQje+8iOWSjGltYWdl5LqM6YCJ5LiA77yMaW1hZ2XkvJjlhYjnuqfmm7Tpq5jvvIlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgbG9nb0RlbGV0ZUJ5U2lnbihjb250U2lnbiwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBjb250X3NpZ246IGNvbnRTaWduLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogTE9HT19ERUxFVEVfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqo54mp6K+G5Yir5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICB0b3BfbnVtIOi/lOWbnumihOa1i+W+l+WIhnRvcOe7k+aenOaVsO+8jOm7mOiupOS4ujZcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBhbmltYWxEZXRlY3QoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogQU5JTUFMX0RFVEVDVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmpI3nianor4bliKvmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvuWDj+aVsOaNru+8jGJhc2U2NOe8luegge+8jOimgeaxgmJhc2U2NOe8lueggeWQjuWkp+Wwj+S4jei2hei/hzRN77yM5pyA55+t6L656Iez5bCRMTVweO+8jOacgOmVv+i+ueacgOWkpzQwOTZweCzmlK/mjIFqcGcvcG5nL2JtcOagvOW8j1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBwbGFudERldGVjdChpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBQTEFOVF9ERVRFQ1RfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Zu+5YOP5Li75L2T5qOA5rWL5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICB3aXRoX2ZhY2Ug5aaC5p6c5qOA5rWL5Li75L2T5piv5Lq677yM5Li75L2T5Yy65Z+f5piv5ZCm5bim5LiK5Lq66IS46YOo5YiG77yMMC3kuI3luKbkurrohLjljLrln5/vvIzlhbbku5Yt5bim5Lq66IS45Yy65Z+f77yM6KOB5Ymq57G76ZyA5rGC5o6o6I2Q5bim5Lq66IS477yM5qOA57SiL+ivhuWIq+exu+mcgOaxguaOqOiNkOS4jeW4puS6uuiEuOOAgum7mOiupOWPljHvvIzluKbkurrohLjjgIJcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBvYmplY3REZXRlY3QoaW1hZ2UsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogT0JKRUNUX0RFVEVDVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFpcEltYWdlQ2xhc3NpZnlcbi8vIEB0cy1pZ25vcmVcbk9iamVjdC5hc3NpZ24oQWlwSW1hZ2VDbGFzc2lmeSwgZXhwb3J0cyk7XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBBaXBJbWFnZUNsYXNzaWZ5O1xuIl19