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

import util = require('util');
import u = require('underscore');

var debug = require('debug')('bce-sdk:auth');

import H = require('./headers');
import strings = require('./strings');

import crypto = require('crypto');
import {Headers} from "request";

/**
 * Auth
 *
 * @constructor
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
class Auth
{
    ak: string;
    sk: string;

    constructor(ak: string, sk: string) {
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
    generateAuthorization(method, resource, params,
                          headers, timestamp, expirationInSeconds?, headersToSign?) {

        var now = timestamp ? new Date(timestamp * 1000) : new Date();
        var rawSessionKey = util.format('bce-auth-v1/%s/%s/%d',
            this.ak, now.toISOString().replace(/\.\d+Z$/, 'Z'), expirationInSeconds || 1800);
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

        var rawSignature = util.format('%s\n%s\n%s\n%s',
            method, canonicalUri, canonicalQueryString, canonicalHeaders);
        debug('rawSignature = %j', rawSignature);
        debug('sessionKey = %j', sessionKey);
        var signature = this.hash(rawSignature, sessionKey);

        if (signedHeaders.length) {
            return util.format('%s/%s/%s', rawSessionKey, signedHeaders.join(';'), signature);
        }

        return util.format('%s//%s', rawSessionKey, signature);
    };

    uriCanonicalization<T>(uri: T) {
        return uri;
    };

    /**
     * Canonical the query strings.
     *
     * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalQueryString
     * @param {Object} params The query strings.
     * @return {string}
     */
    queryStringCanonicalization<T extends {
        [k: string]: any,
    }>(params: T) {
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
    };

    /**
     * Canonical the http request headers.
     *
     * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalHeaders
     * @param {Object} headers The http request headers.
     * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
     * @return {*} canonicalHeaders and signedHeaders
     */
    headersCanonicalization<T extends Headers>(headers: T, headersToSign?: string[]): [string, string[]] {
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
    };

    hash(data, key) {
        var sha256Hmac = crypto.createHmac('sha256', key);
        sha256Hmac.update(data);
        return sha256Hmac.digest('hex');
    };
}

export default Auth;
// @ts-ignore
Object.assign(Auth, exports);
// @ts-ignore
export = Auth;
