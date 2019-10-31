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
 * @file src/crypto.js
 * @author leeight
 */

/* eslint-env node */

import { createReadStream, ReadStream } from 'fs';
import { createHash, HexBase64Latin1Encoding } from 'crypto';

const Q = require('q');

export function md5sum(data: any, enc?: BufferEncoding, digest?: HexBase64Latin1Encoding) {
	if (!Buffer.isBuffer(data)) {
		data = Buffer.from(data, enc || 'utf-8');
	}

	const md5 = createHash('md5');
	md5.update(data);

	return md5.digest(digest || 'base64');
}

export function md5stream(stream: ReadStream, digest?: HexBase64Latin1Encoding) {
	const deferred = Q.defer();

	const md5 = createHash('md5');
	stream.on('data', function (chunk) {
		md5.update(chunk);
	});
	stream.on('end', function () {
		deferred.resolve(md5.digest(digest || 'base64'));
	});
	stream.on('error', function (error) {
		deferred.reject(error);
	});

	return deferred.promise;
};

export function md5file(filename: string, digest?: HexBase64Latin1Encoding) {
	return md5stream(createReadStream(filename), digest);
}

export function md5blob(blob: Blob, digest?: HexBase64Latin1Encoding) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(blob);
		reader.onerror = function (e) {
			reject(reader.error);
		};
		reader.onloadend = function (e) {
			if (e.target!.readyState === FileReader.DONE) {
				const content = e.target!.result;
				const md5 = exports.md5sum(content, null, digest);
				resolve(md5);
			}
		};
	});
}










