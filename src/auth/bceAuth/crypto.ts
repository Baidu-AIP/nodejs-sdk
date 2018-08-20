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

import fs = require('fs');
import crypto = require('crypto');

import Q = require('q');

export function md5sum(data, enc, digest) {
    if (!Buffer.isBuffer(data)) {
        data = new Buffer(data, enc || 'UTF-8');
    }

    var md5 = crypto.createHash('md5');
    md5.update(data);

    return md5.digest(digest || 'base64');
}

export function md5stream(stream, digest) {
    var deferred = Q.defer();

    var md5 = crypto.createHash('md5');
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
}

export function md5file(filename, digest) {
    return md5stream(fs.createReadStream(filename), digest);
}

export function md5blob(blob, digest) {
    var deferred = Q.defer();

    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onerror = function (e) {
        deferred.reject(reader.error);
    };
    reader.onloadend = function (e) {
        // @ts-ignore
        if (e.target.readyState === FileReader.DONE) {
            // @ts-ignore
            var content = e.target.result;
            var md5 = md5sum(content, null, digest);
            deferred.resolve(md5);
        }
    };
    return deferred.promise;
}

import * as _crypto from './crypto';
export default _crypto




