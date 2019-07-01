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
import { Headers } from "request";
/**
 * Auth
 *
 * @constructor
 * @param {string} ak The access key.
 * @param {string} sk The security key.
 */
declare class Auth {
    ak: string;
    sk: string;
    constructor(ak: string, sk: string);
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
    generateAuthorization(method: any, resource: any, params: any, headers: any, timestamp: any, expirationInSeconds?: any, headersToSign?: any): string;
    uriCanonicalization<T>(uri: T): T;
    /**
     * Canonical the query strings.
     *
     * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalQueryString
     * @param {Object} params The query strings.
     * @return {string}
     */
    queryStringCanonicalization<T extends {
        [k: string]: any;
    }>(params: T): string;
    /**
     * Canonical the http request headers.
     *
     * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalHeaders
     * @param {Object} headers The http request headers.
     * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
     * @return {*} canonicalHeaders and signedHeaders
     */
    headersCanonicalization<T extends Headers>(headers: T, headersToSign?: string[]): [string, string[]];
    hash(data: any, key: any): string;
}
export default Auth;
export = Auth;
