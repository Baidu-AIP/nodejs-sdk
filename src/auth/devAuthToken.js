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
 * @file devAuthToken
 * @author baiduAip
 */
const devScope = require("../const/devScope");
/**
 * 提前获取access_token的时间 默认24个小时
 *
 * @type {number}
 */
let DEFAULT_FETCH_AHEAD_DURATION = 24 * 60 * 60 * 1000;
/**
* devAuthToken类
* 百度开发者token信息包装类
*
* @constructor
* @param {string} token access_token
* @param {number} expireTime 多久之后过期
* @param {string} scope 权限
*/
class DevAuthToken {
    constructor(token, expireTime, scope) {
        this.token = token;
        this.expireTime = expireTime;
        this.scope = scope;
        this.authDate = new Date();
        this.hasScopeFlag = false;
        this.initScope();
    }
    initScope() {
        // 用户自建token，默认为有权限
        if (this.scope == null) {
            this.hasScopeFlag = true;
            return;
        }
        let scopeArray = this.scope.split(' ');
        scopeArray.forEach(function (item) {
            if (item === devScope) {
                this.hasScopeFlag = true;
            }
        }.bind(this));
    }
    hasScope(scope) {
        return this.hasScopeFlag;
    }
    isExpired() {
        let now = new Date();
        // 根据服务器返回的access_token过期时间，提前重新获取token
        // @ts-ignore
        if (now.getTime(this.expireTime) -
            this.authDate.getTime() > this.expireTime * 1000 -
            DEFAULT_FETCH_AHEAD_DURATION) {
            return true;
        }
        return false;
    }
}
(function (DevAuthToken) {
    /**
     * 设置提前获取access_token的时间
     */
    function setExpireAhead(duration) {
        DEFAULT_FETCH_AHEAD_DURATION = duration;
    }
    DevAuthToken.setExpireAhead = setExpireAhead;
    DevAuthToken.DEFAULT_EXPIRE_DURATION = 2592000 * 1000;
})(DevAuthToken || (DevAuthToken = {}));
exports.default = DevAuthToken;
// @ts-ignore
Object.assign(DevAuthToken, exports);
module.exports = DevAuthToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2QXV0aFRva2VuLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvYXV0aC9kZXZBdXRoVG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCw4Q0FBK0M7QUFFL0M7Ozs7R0FJRztBQUNILElBQUksNEJBQTRCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBRXREOzs7Ozs7OztFQVFFO0FBQ0gsTUFBTSxZQUFZO0lBUWQsWUFBWSxLQUFhLEVBQUUsVUFBa0IsRUFBRSxLQUFhO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELFNBQVM7UUFDTCxtQkFBbUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSTtZQUM3QixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQzVCO1FBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDRCxRQUFRLENBQUMsS0FBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDckIsdUNBQXVDO1FBQ3ZDLGFBQWE7UUFDYixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSTtZQUM1Qyw0QkFBNEIsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKO0FBRUQsV0FBVSxZQUFZO0lBRWxCOztPQUVHO0lBQ0gsU0FBZ0IsY0FBYyxDQUFDLFFBQVE7UUFDbkMsNEJBQTRCLEdBQUcsUUFBUSxDQUFDO0lBQzVDLENBQUM7SUFGZSwyQkFBYyxpQkFFN0IsQ0FBQTtJQUVZLG9DQUF1QixHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDMUQsQ0FBQyxFQVZTLFlBQVksS0FBWixZQUFZLFFBVXJCO0FBRUQsa0JBQWUsWUFBWSxDQUFDO0FBQzVCLGFBQWE7QUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUdyQyxpQkFBUyxZQUFZLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyBCYWlkdS5jb20sIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aFxuICogdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb25cbiAqIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIEBmaWxlIGRldkF1dGhUb2tlblxuICogQGF1dGhvciBiYWlkdUFpcFxuICovXG5pbXBvcnQgZGV2U2NvcGUgPSByZXF1aXJlKCcuLi9jb25zdC9kZXZTY29wZScpO1xuXG4vKipcbiAqIOaPkOWJjeiOt+WPlmFjY2Vzc190b2tlbueahOaXtumXtCDpu5jorqQyNOS4quWwj+aXtlxuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmxldCBERUZBVUxUX0ZFVENIX0FIRUFEX0RVUkFUSU9OID0gMjQgKiA2MCAqIDYwICogMTAwMDtcblxuIC8qKlxuICogZGV2QXV0aFRva2Vu57G7XG4gKiDnmb7luqblvIDlj5HogIV0b2tlbuS/oeaBr+WMheijheexu1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHRva2VuIGFjY2Vzc190b2tlblxuICogQHBhcmFtIHtudW1iZXJ9IGV4cGlyZVRpbWUg5aSa5LmF5LmL5ZCO6L+H5pyfXG4gKiBAcGFyYW0ge3N0cmluZ30gc2NvcGUg5p2D6ZmQXG4gKi9cbmNsYXNzIERldkF1dGhUb2tlbiB7XG5cbiAgICB0b2tlbjogc3RyaW5nO1xuICAgIGV4cGlyZVRpbWU6IG51bWJlcjtcbiAgICBzY29wZTogc3RyaW5nO1xuICAgIGF1dGhEYXRlOiBEYXRlO1xuICAgIGhhc1Njb3BlRmxhZzogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHRva2VuOiBzdHJpbmcsIGV4cGlyZVRpbWU6IG51bWJlciwgc2NvcGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgICAgIHRoaXMuZXhwaXJlVGltZSA9IGV4cGlyZVRpbWU7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICAgICAgdGhpcy5hdXRoRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuaGFzU2NvcGVGbGFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5pdFNjb3BlKCk7XG4gICAgfVxuICAgIGluaXRTY29wZSgpIHtcbiAgICAgICAgLy8g55So5oi36Ieq5bu6dG9rZW7vvIzpu5jorqTkuLrmnInmnYPpmZBcbiAgICAgICAgaWYgKHRoaXMuc2NvcGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oYXNTY29wZUZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzY29wZUFycmF5ID0gdGhpcy5zY29wZS5zcGxpdCgnICcpO1xuICAgICAgICBzY29wZUFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSBkZXZTY29wZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzU2NvcGVGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgaGFzU2NvcGUoc2NvcGU/KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1Njb3BlRmxhZztcbiAgICB9XG4gICAgaXNFeHBpcmVkKCkge1xuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgLy8g5qC55o2u5pyN5Yqh5Zmo6L+U5Zue55qEYWNjZXNzX3Rva2Vu6L+H5pyf5pe26Ze077yM5o+Q5YmN6YeN5paw6I635Y+WdG9rZW5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAobm93LmdldFRpbWUodGhpcy5leHBpcmVUaW1lKSAtXG4gICAgICAgICAgICB0aGlzLmF1dGhEYXRlLmdldFRpbWUoKSA+IHRoaXMuZXhwaXJlVGltZSAqIDEwMDAgLVxuICAgICAgICAgICAgICAgIERFRkFVTFRfRkVUQ0hfQUhFQURfRFVSQVRJT04pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbm5hbWVzcGFjZSBEZXZBdXRoVG9rZW5cbntcbiAgICAvKipcbiAgICAgKiDorr7nva7mj5DliY3ojrflj5ZhY2Nlc3NfdG9rZW7nmoTml7bpl7RcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0RXhwaXJlQWhlYWQoZHVyYXRpb24pIHtcbiAgICAgICAgREVGQVVMVF9GRVRDSF9BSEVBRF9EVVJBVElPTiA9IGR1cmF0aW9uO1xuICAgIH1cblxuICAgIGV4cG9ydCBjb25zdCBERUZBVUxUX0VYUElSRV9EVVJBVElPTiA9IDI1OTIwMDAgKiAxMDAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBEZXZBdXRoVG9rZW47XG4vLyBAdHMtaWdub3JlXG5PYmplY3QuYXNzaWduKERldkF1dGhUb2tlbiwgZXhwb3J0cyk7XG4vLyBAdHMtaWdub3JlXG5cbmV4cG9ydCA9IERldkF1dGhUb2tlbjtcbiJdfQ==