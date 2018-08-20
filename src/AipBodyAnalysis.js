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
 * @file AipBodyAnalysis.js
 * @author baidu aip
 */
const BaseClient = require("./client/baseClient");
const RequestInfo = require("./client/requestInfo");
const HttpClient = require("./http/httpClient");
const objectTools = require("./util/objectTools");
const METHOD_POST = 'POST';
const BODY_ANALYSIS_PATH = '/rest/2.0/image-classify/v1/body_analysis';
const BODY_ATTR_PATH = '/rest/2.0/image-classify/v1/body_attr';
const BODY_NUM_PATH = '/rest/2.0/image-classify/v1/body_num';
/**
 * AipBodyAnalysis类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipBodyAnalysis extends BaseClient {
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
     * 人体关键点识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    bodyAnalysis(image, options) {
        let param = {
            image: image,
            targetPath: BODY_ANALYSIS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 人体属性识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type gender,<br>age,<br>lower_wear,<br>upper_wear,<br>headwear,<br>glasses,<br>upper_color,<br>lower_color,<br>cellphone,<br>upper_wear_fg,<br>upper_wear_texture,<br>lower_wear_texture,<br>orientation,<br>umbrella or 1）可选值说明：<br>gender-性别，age-年龄阶段，lower_wear-下身服饰，upper_wear-上身服饰，headwear-是否戴帽子，glasses-是否戴眼镜，upper_color-上身服饰颜色，lower_color-下身服饰颜色，cellphone-是否使用手机，upper_wear_fg-上身服饰细分类，upper_wear_texture-上身服饰纹理，lower_wear_texture-下身服饰纹理，orientation-身体朝向，umbrella-是否撑伞；<br>2）type 参数值可以是可选值的组合，用逗号分隔；**如果无此参数默认输出全部14个属性**
     * @return {Promise} - 标准Promise对象
     */
    bodyAttr(image, options) {
        let param = {
            image: image,
            targetPath: BODY_ATTR_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 人流量统计接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   area 特定框选区域坐标，逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，默认尾点和首点相连做闭合，**此参数为空或无此参数默认识别整个图片的人数**
     *   show 是否输出渲染的图片，默认不返回，**选true时返回渲染后的图片(base64)**，其它无效值或为空则默认false
     * @return {Promise} - 标准Promise对象
     */
    bodyNum(image, options) {
        let param = {
            image: image,
            targetPath: BODY_NUM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}
exports.default = AipBodyAnalysis;
// @ts-ignore
Object.assign(AipBodyAnalysis, exports);
module.exports = AipBodyAnalysis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlwQm9keUFuYWx5c2lzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvQWlwQm9keUFuYWx5c2lzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsa0RBQW1EO0FBRW5ELG9EQUFxRDtBQUVyRCxnREFBaUQ7QUFFakQsa0RBQW1EO0FBRW5ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUUzQixNQUFNLGtCQUFrQixHQUFHLDJDQUEyQyxDQUFDO0FBQ3ZFLE1BQU0sY0FBYyxHQUFHLHVDQUF1QyxDQUFDO0FBQy9ELE1BQU0sYUFBYSxHQUFHLHNDQUFzQyxDQUFDO0FBRzdEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sZUFBZ0IsU0FBUSxVQUFVO0lBQ3BDLFlBQVksS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxVQUFVLENBQUMsS0FBSztRQUNaLElBQUksVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDbEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM5QixPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDeEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUNwQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTztRQUN2QixJQUFJLEtBQUssR0FBRztZQUNSLEtBQUssRUFBRSxLQUFLO1lBQ1osVUFBVSxFQUFFLGtCQUFrQjtTQUNqQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPO1FBQ25CLElBQUksS0FBSyxHQUFHO1lBQ1IsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsY0FBYztTQUM3QixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTztRQUNsQixJQUFJLEtBQUssR0FBRztZQUNSLEtBQUssRUFBRSxLQUFLO1lBQ1osVUFBVSxFQUFFLGFBQWE7U0FDNUIsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDSjtBQUVELGtCQUFlLGVBQWUsQ0FBQTtBQUM5QixhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFeEMsaUJBQVMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBBaXBCb2R5QW5hbHlzaXMuanNcbiAqIEBhdXRob3IgYmFpZHUgYWlwXG4gKi9cblxuaW1wb3J0IEJhc2VDbGllbnQgPSByZXF1aXJlKCcuL2NsaWVudC9iYXNlQ2xpZW50Jyk7XG5cbmltcG9ydCBSZXF1ZXN0SW5mbyA9IHJlcXVpcmUoJy4vY2xpZW50L3JlcXVlc3RJbmZvJyk7XG5cbmltcG9ydCBIdHRwQ2xpZW50ID0gcmVxdWlyZSgnLi9odHRwL2h0dHBDbGllbnQnKTtcblxuaW1wb3J0IG9iamVjdFRvb2xzID0gcmVxdWlyZSgnLi91dGlsL29iamVjdFRvb2xzJyk7XG5cbmNvbnN0IE1FVEhPRF9QT1NUID0gJ1BPU1QnO1xuXG5jb25zdCBCT0RZX0FOQUxZU0lTX1BBVEggPSAnL3Jlc3QvMi4wL2ltYWdlLWNsYXNzaWZ5L3YxL2JvZHlfYW5hbHlzaXMnO1xuY29uc3QgQk9EWV9BVFRSX1BBVEggPSAnL3Jlc3QvMi4wL2ltYWdlLWNsYXNzaWZ5L3YxL2JvZHlfYXR0cic7XG5jb25zdCBCT0RZX05VTV9QQVRIID0gJy9yZXN0LzIuMC9pbWFnZS1jbGFzc2lmeS92MS9ib2R5X251bSc7XG5cblxuLyoqXG4gKiBBaXBCb2R5QW5hbHlzaXPnsbtcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEJhc2VDbGllbnRcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IGFwcGlkIGFwcGlkLlxuICogQHBhcmFtIHtzdHJpbmd9IGFrICBhY2Nlc3Mga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IHNrICBzZWN1cml0eSBrZXkuXG4gKi9cbmNsYXNzIEFpcEJvZHlBbmFseXNpcyBleHRlbmRzIEJhc2VDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGFwcElkLCBhaywgc2spIHtcbiAgICAgICAgc3VwZXIoYXBwSWQsIGFrLCBzayk7XG4gICAgfVxuICAgIGNvbW1vbkltcGwocGFyYW0pIHtcbiAgICAgICAgbGV0IGh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgICAgICBsZXQgYXBpVXJsID0gcGFyYW0udGFyZ2V0UGF0aDtcbiAgICAgICAgZGVsZXRlIHBhcmFtLnRhcmdldFBhdGg7XG4gICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyhhcGlVcmwsXG4gICAgICAgICAgICBwYXJhbSwgTUVUSE9EX1BPU1QpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QocmVxdWVzdEluZm8sIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS6uuS9k+WFs+mUrueCueivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGJvZHlBbmFseXNpcyhpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBCT0RZX0FOQUxZU0lTX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS6uuS9k+WxnuaAp+ivhuWIq+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+5YOP5pWw5o2u77yMYmFzZTY057yW56CB77yM6KaB5rGCYmFzZTY057yW56CB5ZCO5aSn5bCP5LiN6LaF6L+HNE3vvIzmnIDnn63ovrnoh7PlsJExNXB477yM5pyA6ZW/6L655pyA5aSnNDA5NnB4LOaUr+aMgWpwZy9wbmcvYm1w5qC85byPXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgdHlwZSBnZW5kZXIsPGJyPmFnZSw8YnI+bG93ZXJfd2Vhciw8YnI+dXBwZXJfd2Vhciw8YnI+aGVhZHdlYXIsPGJyPmdsYXNzZXMsPGJyPnVwcGVyX2NvbG9yLDxicj5sb3dlcl9jb2xvciw8YnI+Y2VsbHBob25lLDxicj51cHBlcl93ZWFyX2ZnLDxicj51cHBlcl93ZWFyX3RleHR1cmUsPGJyPmxvd2VyX3dlYXJfdGV4dHVyZSw8YnI+b3JpZW50YXRpb24sPGJyPnVtYnJlbGxhIG9yIDHvvInlj6/pgInlgLzor7TmmI7vvJo8YnI+Z2VuZGVyLeaAp+WIq++8jGFnZS3lubTpvoTpmLbmrrXvvIxsb3dlcl93ZWFyLeS4i+i6q+acjemlsO+8jHVwcGVyX3dlYXIt5LiK6Lqr5pyN6aWw77yMaGVhZHdlYXIt5piv5ZCm5oi05bi95a2Q77yMZ2xhc3Nlcy3mmK/lkKbmiLTnnLzplZzvvIx1cHBlcl9jb2xvci3kuIrouqvmnI3ppbDpopzoibLvvIxsb3dlcl9jb2xvci3kuIvouqvmnI3ppbDpopzoibLvvIxjZWxscGhvbmUt5piv5ZCm5L2/55So5omL5py677yMdXBwZXJfd2Vhcl9mZy3kuIrouqvmnI3ppbDnu4bliIbnsbvvvIx1cHBlcl93ZWFyX3RleHR1cmUt5LiK6Lqr5pyN6aWw57q555CG77yMbG93ZXJfd2Vhcl90ZXh0dXJlLeS4i+i6q+acjemlsOe6ueeQhu+8jG9yaWVudGF0aW9uLei6q+S9k+acneWQke+8jHVtYnJlbGxhLeaYr+WQpuaSkeS8nu+8mzxicj4y77yJdHlwZSDlj4LmlbDlgLzlj6/ku6XmmK/lj6/pgInlgLznmoTnu4TlkIjvvIznlKjpgJflj7fliIbpmpTvvJsqKuWmguaenOaXoOatpOWPguaVsOm7mOiupOi+k+WHuuWFqOmDqDE05Liq5bGe5oCnKipcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBib2R5QXR0cihpbWFnZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBCT0RZX0FUVFJfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Lq65rWB6YeP57uf6K6h5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77lg4/mlbDmja7vvIxiYXNlNjTnvJbnoIHvvIzopoHmsYJiYXNlNjTnvJbnoIHlkI7lpKflsI/kuI3otoXov4c0Te+8jOacgOefrei+ueiHs+WwkTE1cHjvvIzmnIDplb/ovrnmnIDlpKc0MDk2cHgs5pSv5oyBanBnL3BuZy9ibXDmoLzlvI9cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBhcmVhIOeJueWumuahhumAieWMuuWfn+WdkOagh++8jOmAl+WPt+WIhumalO+8jOWmguKAmHgxLHkxLHgyLHkyLHgzLHkzLi4ueG4seW4n77yM6buY6K6k5bC+54K55ZKM6aaW54K555u46L+e5YGa6Zet5ZCI77yMKirmraTlj4LmlbDkuLrnqbrmiJbml6DmraTlj4LmlbDpu5jorqTor4bliKvmlbTkuKrlm77niYfnmoTkurrmlbAqKlxuICAgICAqICAgc2hvdyDmmK/lkKbovpPlh7rmuLLmn5PnmoTlm77niYfvvIzpu5jorqTkuI3ov5Tlm57vvIwqKumAiXRydWXml7bov5Tlm57muLLmn5PlkI7nmoTlm77niYcoYmFzZTY0KSoq77yM5YW25a6D5peg5pWI5YC85oiW5Li656m65YiZ6buY6K6kZmFsc2VcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBib2R5TnVtKGltYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEJPRFlfTlVNX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWlwQm9keUFuYWx5c2lzXG4vLyBAdHMtaWdub3JlXG5PYmplY3QuYXNzaWduKEFpcEJvZHlBbmFseXNpcywgZXhwb3J0cyk7XG4vLyBAdHMtaWdub3JlXG5leHBvcnQgPSBBaXBCb2R5QW5hbHlzaXM7XG4iXX0=