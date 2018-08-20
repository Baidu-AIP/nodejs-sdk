"use strict";
/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
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
 * @file src/auth.js
 * @author leeight
 */
/* eslint-env node */
/* eslint max-params:[0,10] */
const util = require("util");
const u = require("underscore");
var debug = require('debug')('bce-sdk:auth');
const H = require("./headers");
const strings = require("./strings");
const crypto = require("crypto");
/**
 * Auth
 *
 * @constructor
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
class Auth {
    constructor(ak, sk) {
        this.ak = ak;
        this.sk = sk;
    }
    /**
     * Generate the signature based on http://gollum.baidu.com/AuthenticationMechanism
     *
     * @param {string} method The http request method, such as GET, POST, DELETE, PUT, ...
     * @param {string} resource The request path.
     * @param {Object=} params The query strings.
     * @param {Object=} headers The http request headers.
     * @param {number=} timestamp Set the current timestamp.
     * @param {number=} expirationInSeconds The signature validation time.
     * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
     *
     * @return {string} The signature.
     */
    generateAuthorization(method, resource, params, headers, timestamp, expirationInSeconds, headersToSign) {
        var now = timestamp ? new Date(timestamp * 1000) : new Date();
        var rawSessionKey = util.format('bce-auth-v1/%s/%s/%d', this.ak, now.toISOString().replace(/\.\d+Z$/, 'Z'), expirationInSeconds || 1800);
        debug('rawSessionKey = %j', rawSessionKey);
        var sessionKey = this.hash(rawSessionKey, this.sk);
        var canonicalUri = this.uriCanonicalization(resource);
        var canonicalQueryString = this.queryStringCanonicalization(params || {});
        var rv = this.headersCanonicalization(headers || {}, headersToSign);
        var canonicalHeaders = rv[0];
        var signedHeaders = rv[1];
        debug('canonicalUri = %j', canonicalUri);
        debug('canonicalQueryString = %j', canonicalQueryString);
        debug('canonicalHeaders = %j', canonicalHeaders);
        debug('signedHeaders = %j', signedHeaders);
        var rawSignature = util.format('%s\n%s\n%s\n%s', method, canonicalUri, canonicalQueryString, canonicalHeaders);
        debug('rawSignature = %j', rawSignature);
        debug('sessionKey = %j', sessionKey);
        var signature = this.hash(rawSignature, sessionKey);
        if (signedHeaders.length) {
            return util.format('%s/%s/%s', rawSessionKey, signedHeaders.join(';'), signature);
        }
        return util.format('%s//%s', rawSessionKey, signature);
    }
    ;
    uriCanonicalization(uri) {
        return uri;
    }
    ;
    /**
     * Canonical the query strings.
     *
     * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalQueryString
     * @param {Object} params The query strings.
     * @return {string}
     */
    queryStringCanonicalization(params) {
        var canonicalQueryString = [];
        Object.keys(params).forEach(function (key) {
            if (key.toLowerCase() === H.AUTHORIZATION.toLowerCase()) {
                return;
            }
            var value = params[key] == null ? '' : params[key];
            canonicalQueryString.push(key + '=' + strings.normalize(value));
        });
        canonicalQueryString.sort();
        return canonicalQueryString.join('&');
    }
    ;
    /**
     * Canonical the http request headers.
     *
     * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalHeaders
     * @param {Object} headers The http request headers.
     * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
     * @return {*} canonicalHeaders and signedHeaders
     */
    headersCanonicalization(headers, headersToSign) {
        if (!headersToSign || !headersToSign.length) {
            headersToSign = [H.HOST, H.CONTENT_MD5, H.CONTENT_LENGTH, H.CONTENT_TYPE];
        }
        debug('headers = %j, headersToSign = %j', headers, headersToSign);
        var headersMap = {};
        headersToSign.forEach(function (item) {
            headersMap[item.toLowerCase()] = true;
        });
        var canonicalHeaders = [];
        Object.keys(headers).forEach(function (key) {
            var value = headers[key];
            value = u.isString(value) ? strings.trim(value) : value;
            if (value == null || value === '') {
                return;
            }
            key = key.toLowerCase();
            if (/^x\-bce\-/.test(key) || headersMap[key] === true) {
                canonicalHeaders.push(util.format('%s:%s', 
                // encodeURIComponent(key), encodeURIComponent(value)));
                strings.normalize(key), strings.normalize(value)));
            }
        });
        canonicalHeaders.sort();
        var signedHeaders = [];
        canonicalHeaders.forEach(function (item) {
            signedHeaders.push(item.split(':')[0]);
        });
        return [canonicalHeaders.join('\n'), signedHeaders];
    }
    ;
    hash(data, key) {
        var sha256Hmac = crypto.createHmac('sha256', key);
        sha256Hmac.update(data);
        return sha256Hmac.digest('hex');
    }
    ;
}
exports.default = Auth;
// @ts-ignore
Object.assign(Auth, exports);
module.exports = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL2F1dGgvYmNlQXV0aC9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUVILHFCQUFxQjtBQUNyQiw4QkFBOEI7QUFFOUIsNkJBQThCO0FBQzlCLGdDQUFpQztBQUVqQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFN0MsK0JBQWdDO0FBQ2hDLHFDQUFzQztBQUV0QyxpQ0FBa0M7QUFHbEM7Ozs7OztHQU1HO0FBQ0gsTUFBTSxJQUFJO0lBS04sWUFBWSxFQUFVLEVBQUUsRUFBVTtRQUM5QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFDeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxtQkFBb0IsRUFBRSxhQUFjO1FBRTFFLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzlELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLEVBQ2xELElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQUUsbUJBQW1CLElBQUksSUFBSSxDQUFDLENBQUM7UUFDckYsS0FBSyxDQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUks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QyxVQUFVLElBQUk7WUFDbkMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFBQSxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHO1FBQ1YsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUFBLENBQUM7Q0FDTDtBQUVELGtCQUFlLElBQUksQ0FBQztBQUNwQixhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFN0IsaUJBQVMsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBzcmMvYXV0aC5qc1xuICogQGF1dGhvciBsZWVpZ2h0XG4gKi9cblxuLyogZXNsaW50LWVudiBub2RlICovXG4vKiBlc2xpbnQgbWF4LXBhcmFtczpbMCwxMF0gKi9cblxuaW1wb3J0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5pbXBvcnQgdSA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcblxudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnYmNlLXNkazphdXRoJyk7XG5cbmltcG9ydCBIID0gcmVxdWlyZSgnLi9oZWFkZXJzJyk7XG5pbXBvcnQgc3RyaW5ncyA9IHJlcXVpcmUoJy4vc3RyaW5ncycpO1xuXG5pbXBvcnQgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gXCJyZXF1ZXN0XCI7XG5cbi8qKlxuICogQXV0aFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IGFrIFRoZSBhY2Nlc3Mga2V5LlxuICogQHBhcmFtIHtzdHJpbmd9IHNrIFRoZSBzZWN1cml0eSBrZXkuXG4gKi9cbmNsYXNzIEF1dGhcbntcbiAgICBhazogc3RyaW5nO1xuICAgIHNrOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihhazogc3RyaW5nLCBzazogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWsgPSBhaztcbiAgICAgICAgdGhpcy5zayA9IHNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBzaWduYXR1cmUgYmFzZWQgb24gaHR0cDovL2dvbGx1bS5iYWlkdS5jb20vQXV0aGVudGljYXRpb25NZWNoYW5pc21cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgVGhlIGh0dHAgcmVxdWVzdCBtZXRob2QsIHN1Y2ggYXMgR0VULCBQT1NULCBERUxFVEUsIFBVVCwgLi4uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlIFRoZSByZXF1ZXN0IHBhdGguXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBwYXJhbXMgVGhlIHF1ZXJ5IHN0cmluZ3MuXG4gICAgICogQHBhcmFtIHtPYmplY3Q9fSBoZWFkZXJzIFRoZSBodHRwIHJlcXVlc3QgaGVhZGVycy5cbiAgICAgKiBAcGFyYW0ge251bWJlcj19IHRpbWVzdGFtcCBTZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gZXhwaXJhdGlvbkluU2Vjb25kcyBUaGUgc2lnbmF0dXJlIHZhbGlkYXRpb24gdGltZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+PX0gaGVhZGVyc1RvU2lnbiBUaGUgcmVxdWVzdCBoZWFkZXJzIGxpc3Qgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGNhbGN1YWxhdGUgdGhlIHNpZ25hdHVyZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHNpZ25hdHVyZS5cbiAgICAgKi9cbiAgICBnZW5lcmF0ZUF1dGhvcml6YXRpb24obWV0aG9kLCByZXNvdXJjZSwgcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLCB0aW1lc3RhbXAsIGV4cGlyYXRpb25JblNlY29uZHM/LCBoZWFkZXJzVG9TaWduPykge1xuXG4gICAgICAgIHZhciBub3cgPSB0aW1lc3RhbXAgPyBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKSA6IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciByYXdTZXNzaW9uS2V5ID0gdXRpbC5mb3JtYXQoJ2JjZS1hdXRoLXYxLyVzLyVzLyVkJyxcbiAgICAgICAgICAgIHRoaXMuYWssIG5vdy50b0lTT1N0cmluZygpLnJlcGxhY2UoL1xcLlxcZCtaJC8sICdaJyksIGV4cGlyYXRpb25JblNlY29uZHMgfHwgMTgwMCk7XG4gICAgICAgIGRlYnVnKCdyYXdTZXNzaW9uS2V5ID0gJWonLCByYXdTZXNzaW9uS2V5KTtcbiAgICAgICAgdmFyIHNlc3Npb25LZXkgPSB0aGlzLmhhc2gocmF3U2Vzc2lvbktleSwgdGhpcy5zayk7XG5cbiAgICAgICAgdmFyIGNhbm9uaWNhbFVyaSA9IHRoaXMudXJpQ2Fub25pY2FsaXphdGlvbihyZXNvdXJjZSk7XG4gICAgICAgIHZhciBjYW5vbmljYWxRdWVyeVN0cmluZyA9IHRoaXMucXVlcnlTdHJpbmdDYW5vbmljYWxpemF0aW9uKHBhcmFtcyB8fCB7fSk7XG5cbiAgICAgICAgdmFyIHJ2ID0gdGhpcy5oZWFkZXJzQ2Fub25pY2FsaXphdGlvbihoZWFkZXJzIHx8IHt9LCBoZWFkZXJzVG9TaWduKTtcbiAgICAgICAgdmFyIGNhbm9uaWNhbEhlYWRlcnMgPSBydlswXTtcbiAgICAgICAgdmFyIHNpZ25lZEhlYWRlcnMgPSBydlsxXTtcbiAgICAgICAgZGVidWcoJ2Nhbm9uaWNhbFVyaSA9ICVqJywgY2Fub25pY2FsVXJpKTtcbiAgICAgICAgZGVidWcoJ2Nhbm9uaWNhbFF1ZXJ5U3RyaW5nID0gJWonLCBjYW5vbmljYWxRdWVyeVN0cmluZyk7XG4gICAgICAgIGRlYnVnKCdjYW5vbmljYWxIZWFkZXJzID0gJWonLCBjYW5vbmljYWxIZWFkZXJzKTtcbiAgICAgICAgZGVidWcoJ3NpZ25lZEhlYWRlcnMgPSAlaicsIHNpZ25lZEhlYWRlcnMpO1xuXG4gICAgICAgIHZhciByYXdTaWduYXR1cmUgPSB1dGlsLmZvcm1hdCgnJXNcXG4lc1xcbiVzXFxuJXMnLFxuICAgICAgICAgICAgbWV0aG9kLCBjYW5vbmljYWxVcmksIGNhbm9uaWNhbFF1ZXJ5U3RyaW5nLCBjYW5vbmljYWxIZWFkZXJzKTtcbiAgICAgICAgZGVidWcoJ3Jhd1NpZ25hdHVyZSA9ICVqJywgcmF3U2lnbmF0dXJlKTtcbiAgICAgICAgZGVidWcoJ3Nlc3Npb25LZXkgPSAlaicsIHNlc3Npb25LZXkpO1xuICAgICAgICB2YXIgc2lnbmF0dXJlID0gdGhpcy5oYXNoKHJhd1NpZ25hdHVyZSwgc2Vzc2lvbktleSk7XG5cbiAgICAgICAgaWYgKHNpZ25lZEhlYWRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gdXRpbC5mb3JtYXQoJyVzLyVzLyVzJywgcmF3U2Vzc2lvbktleSwgc2lnbmVkSGVhZGVycy5qb2luKCc7JyksIHNpZ25hdHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdXRpbC5mb3JtYXQoJyVzLy8lcycsIHJhd1Nlc3Npb25LZXksIHNpZ25hdHVyZSk7XG4gICAgfTtcblxuICAgIHVyaUNhbm9uaWNhbGl6YXRpb248VD4odXJpOiBUKSB7XG4gICAgICAgIHJldHVybiB1cmk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbm9uaWNhbCB0aGUgcXVlcnkgc3RyaW5ncy5cbiAgICAgKlxuICAgICAqIEBzZWUgaHR0cDovL2dvbGx1bS5iYWlkdS5jb20vQXV0aGVudGljYXRpb25NZWNoYW5pc20j55Sf5oiQQ2Fub25pY2FsUXVlcnlTdHJpbmdcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIFRoZSBxdWVyeSBzdHJpbmdzLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICBxdWVyeVN0cmluZ0Nhbm9uaWNhbGl6YXRpb248VCBleHRlbmRzIHtcbiAgICAgICAgW2s6IHN0cmluZ106IGFueSxcbiAgICB9PihwYXJhbXM6IFQpIHtcbiAgICAgICAgdmFyIGNhbm9uaWNhbFF1ZXJ5U3RyaW5nID0gW107XG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5LnRvTG93ZXJDYXNlKCkgPT09IEguQVVUSE9SSVpBVElPTi50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXJhbXNba2V5XSA9PSBudWxsID8gJycgOiBwYXJhbXNba2V5XTtcbiAgICAgICAgICAgIGNhbm9uaWNhbFF1ZXJ5U3RyaW5nLnB1c2goa2V5ICsgJz0nICsgc3RyaW5ncy5ub3JtYWxpemUodmFsdWUpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2Fub25pY2FsUXVlcnlTdHJpbmcuc29ydCgpO1xuXG4gICAgICAgIHJldHVybiBjYW5vbmljYWxRdWVyeVN0cmluZy5qb2luKCcmJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhbm9uaWNhbCB0aGUgaHR0cCByZXF1ZXN0IGhlYWRlcnMuXG4gICAgICpcbiAgICAgKiBAc2VlIGh0dHA6Ly9nb2xsdW0uYmFpZHUuY29tL0F1dGhlbnRpY2F0aW9uTWVjaGFuaXNtI+eUn+aIkENhbm9uaWNhbEhlYWRlcnNcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGVhZGVycyBUaGUgaHR0cCByZXF1ZXN0IGhlYWRlcnMuXG4gICAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPj19IGhlYWRlcnNUb1NpZ24gVGhlIHJlcXVlc3QgaGVhZGVycyBsaXN0IHdoaWNoIHdpbGwgYmUgdXNlZCB0byBjYWxjdWFsYXRlIHRoZSBzaWduYXR1cmUuXG4gICAgICogQHJldHVybiB7Kn0gY2Fub25pY2FsSGVhZGVycyBhbmQgc2lnbmVkSGVhZGVyc1xuICAgICAqL1xuICAgIGhlYWRlcnNDYW5vbmljYWxpemF0aW9uPFQgZXh0ZW5kcyBIZWFkZXJzPihoZWFkZXJzOiBULCBoZWFkZXJzVG9TaWduPzogc3RyaW5nW10pOiBbc3RyaW5nLCBzdHJpbmdbXV0ge1xuICAgICAgICBpZiAoIWhlYWRlcnNUb1NpZ24gfHwgIWhlYWRlcnNUb1NpZ24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBoZWFkZXJzVG9TaWduID0gW0guSE9TVCwgSC5DT05URU5UX01ENSwgSC5DT05URU5UX0xFTkdUSCwgSC5DT05URU5UX1RZUEVdO1xuICAgICAgICB9XG4gICAgICAgIGRlYnVnKCdoZWFkZXJzID0gJWosIGhlYWRlcnNUb1NpZ24gPSAlaicsIGhlYWRlcnMsIGhlYWRlcnNUb1NpZ24pO1xuXG4gICAgICAgIHZhciBoZWFkZXJzTWFwID0ge307XG4gICAgICAgIGhlYWRlcnNUb1NpZ24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaGVhZGVyc01hcFtpdGVtLnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGNhbm9uaWNhbEhlYWRlcnMgPSBbXTtcbiAgICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBoZWFkZXJzW2tleV07XG4gICAgICAgICAgICB2YWx1ZSA9IHUuaXNTdHJpbmcodmFsdWUpID8gc3RyaW5ncy50cmltKHZhbHVlKSA6IHZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoL154XFwtYmNlXFwtLy50ZXN0KGtleSkgfHwgaGVhZGVyc01hcFtrZXldID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2Fub25pY2FsSGVhZGVycy5wdXNoKHV0aWwuZm9ybWF0KCclczolcycsXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudChrZXkpLCBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKSk7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ3Mubm9ybWFsaXplKGtleSksIHN0cmluZ3Mubm9ybWFsaXplKHZhbHVlKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjYW5vbmljYWxIZWFkZXJzLnNvcnQoKTtcblxuICAgICAgICB2YXIgc2lnbmVkSGVhZGVycyA9IFtdO1xuICAgICAgICBjYW5vbmljYWxIZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHNpZ25lZEhlYWRlcnMucHVzaChpdGVtLnNwbGl0KCc6JylbMF0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gW2Nhbm9uaWNhbEhlYWRlcnMuam9pbignXFxuJyksIHNpZ25lZEhlYWRlcnNdO1xuICAgIH07XG5cbiAgICBoYXNoKGRhdGEsIGtleSkge1xuICAgICAgICB2YXIgc2hhMjU2SG1hYyA9IGNyeXB0by5jcmVhdGVIbWFjKCdzaGEyNTYnLCBrZXkpO1xuICAgICAgICBzaGEyNTZIbWFjLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIHNoYTI1NkhtYWMuZGlnZXN0KCdoZXgnKTtcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRoO1xuLy8gQHRzLWlnbm9yZVxuT2JqZWN0LmFzc2lnbihBdXRoLCBleHBvcnRzKTtcbi8vIEB0cy1pZ25vcmVcbmV4cG9ydCA9IEF1dGg7XG4iXX0=