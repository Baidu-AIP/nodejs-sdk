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

import { format } from 'util';
import { isString } from 'underscore';
import dbg from 'debug';
import * as H from './headers';
import { normalize, trim } from './strings';
import { BinaryLike } from 'crypto'

const debug = dbg('bce-sdk:auth');

export default class Auth {
	/**
	 *
	 * @param ak The access key.
	 * @param sk The security key.
	 */
	constructor(private ak: string, private sk: string) { }

	/**
	 * Generate the signature based on http://gollum.baidu.com/AuthenticationMechanism
	 * @param method The http request method, such as GET, POST, DELETE, PUT, ...
	 * @param resource The request path.
	 * @param params The query strings.
	 * @param headers The http request headers.
	 * @param timestamp Set the current timestamp.
	 * @param expirationInSeconds The signature validation time.
	 * @param headersToSign The request headers list which will be used to calcualate the signature.
	 */
	public generateAuthorization(method: 'GET' | 'POST' | 'DELETE' | 'PUT', resource: string, params?: { [key: string]: string; }, headers?: { [key: string]: string; }, timestamp?: number, expirationInSeconds?: number, headersToSign?: string[]) {

		const now = timestamp ? new Date(timestamp * 1000) : new Date();
		const rawSessionKey = format('bce-auth-v1/%s/%s/%d',
			this.ak, now.toISOString().replace(/\.\d+Z$/, 'Z'), expirationInSeconds || 1800);
		debug('rawSessionKey = %j', rawSessionKey);
		const sessionKey = this.hash(rawSessionKey, this.sk);

		const canonicalUri = this.uriCanonicalization(resource);
		const canonicalQueryString = this.queryStringCanonicalization(params || {});

		const rv = this.headersCanonicalization(headers || {}, headersToSign);
		const canonicalHeaders = rv[0];
		const signedHeaders = rv[1];
		debug('canonicalUri = %j', canonicalUri);
		debug('canonicalQueryString = %j', canonicalQueryString);
		debug('canonicalHeaders = %j', canonicalHeaders);
		debug('signedHeaders = %j', signedHeaders);

		const rawSignature = format('%s\n%s\n%s\n%s',
			method, canonicalUri, canonicalQueryString, canonicalHeaders);
		debug('rawSignature = %j', rawSignature);
		debug('sessionKey = %j', sessionKey);
		const signature = this.hash(rawSignature, sessionKey);

		if (Array.isArray(signedHeaders)) {
			return format('%s/%s/%s', rawSessionKey, signedHeaders.join(';'), signature);
		}

		return format('%s//%s', rawSessionKey, signature);
	}

	protected uriCanonicalization(uri: string) {
		return uri;
	}

	/**
	 * Canonical the query strings.
	 *
	 * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalQueryString
	 * @param {Object} params The query strings.
	 * @return {string}
	 */
	private queryStringCanonicalization(params: { [key: string]: string; }) {
		const canonicalQueryString = [] as string[];
		Object.keys(params).forEach(function (key) {
			if (key.toLowerCase() === H.AUTHORIZATION.toLowerCase()) {
				return;
			}

			const value = params[key] == null ? '' : params[key];
			canonicalQueryString.push(key + '=' + normalize(value));
		});

		canonicalQueryString.sort();

		return canonicalQueryString.join('&');
	}

	/**
	 * Canonical the http request headers.
	 *
	 * @see http://gollum.baidu.com/AuthenticationMechanism#生成CanonicalHeaders
	 * @param {Object} headers The http request headers.
	 * @param {Array.<string>=} headersToSign The request headers list which will be used to calcualate the signature.
	 * @return {*} canonicalHeaders and signedHeaders
	 */
	private headersCanonicalization(headers: { [key: string]: string; }, headersToSign = [H.HOST, H.CONTENT_MD5, H.CONTENT_LENGTH, H.CONTENT_TYPE]) {
		if (!headersToSign.length) {
			headersToSign = [H.HOST, H.CONTENT_MD5, H.CONTENT_LENGTH, H.CONTENT_TYPE];
		}
		debug('headers = %j, headersToSign = %j', headers, headersToSign);

		const headersMap = {} as { [item: string]: boolean; };
		headersToSign.forEach(function (item) {
			headersMap[item.toLowerCase()] = true;
		});

		const canonicalHeaders = [] as string[];
		Object.keys(headers).forEach(function (key) {
			let value = headers[key];
			value = isString(value) ? trim(value) : value;
			if (value == null || value === '') {
				return;
			}
			key = key.toLowerCase();
			if (/^x\-bce\-/.test(key) || headersMap[key] === true) {
				canonicalHeaders.push(format('%s:%s',
					// encodeURIComponent(key), encodeURIComponent(value)));
					normalize(key), normalize(value)));
			}
		});

		canonicalHeaders.sort();

		const signedHeaders = [] as string[];
		canonicalHeaders.forEach(function (item) {
			signedHeaders.push(item.split(':')[0]);
		});

		return [canonicalHeaders.join('\n'), signedHeaders];
	}

	private hash(data: BinaryLike, key: BinaryLike) {
		const crypto = require('crypto');
		const sha256Hmac = crypto.createHmac('sha256', key);
		sha256Hmac.update(data);
		return sha256Hmac.digest('hex') as string;
	}
}
