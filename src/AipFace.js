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
 * @file AipFace
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const objectTools = require('./util/objectTools');

const HttpClient = require('./http/httpClient');

const EventPromise = require('./util/eventPromise');

const METHOD_POST = 'POST';

const PATH_FACE_DETECT = '/rest/2.0/face/v1/detect';
const PATH_FACE_MATCH = '/rest/2.0/face/v2/match';

const PATH_FACEFIND_ADD = '/rest/2.0/face/v2/faceset/user/add';
const PATH_FACEFIND_DELETE = '/rest/2.0/face/v2/faceset/user/delete';
const PATH_FACEFIND_UPDATE = '/rest/2.0/face/v2/faceset/user/update';
const PATH_FACEFIND_VERIFY = '/rest/2.0/face/v2/verify';
const PATH_FACEFIND_IDENTIFY = '/rest/2.0/face/v2/identify';
const PATH_FACEFIND_GETUSER = '/rest/2.0/face/v2/faceset/user/get';
const PATH_FACEFIND_GETGROUPLIST = '/rest/2.0/face/v2/faceset/group/getlist';
const PATH_FACEFIND_GETGROUPUSER = '/rest/2.0/face/v2/faceset/group/getusers';
const PATH_FACEFIND_GROUPADDUSER = '/rest/2.0/face/v2/faceset/group/adduser';
const PATH_FACEFIND_GROUPDELTEUSER = '/rest/2.0/face/v2/faceset/group/deleteuser';


const scope = require('./const/devScope').DEFAULT;


/**
 * AipFace类，构造调用人脸识别对象
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipFace extends BaseClient {
    constructor(appId, ak, sk) {
        super(appId, ak, sk);
    }
    commonImpl(param) {
        let promise = new EventPromise();
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;

        let requestInfo = new RequestInfo(apiUrl,
            scope, param, METHOD_POST);
        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClient.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.commonImpl, param);
        }
        return promise;
    }
    detect(image, options) {
        let param = {
            image: image,
            targetPath: PATH_FACE_DETECT
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    match(imageArray, options) {
        let param = {
            images: imageArray.join(','),
            targetPath: PATH_FACE_MATCH
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    addUser(uid, userInfo, groupId, image, options) {
        let param = {
            uid: uid,
            user_info: userInfo,
            group_id: objectTools.ensureArray(groupId).join(','),
            image: image,
            targetPath: PATH_FACEFIND_ADD
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    deleteUser(uid, options) {
        let param = {
            uid: uid,
            targetPath: PATH_FACEFIND_DELETE
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    updateUser(uid, userInfo, groupId, image, options) {
        let param = {
            uid: uid,
            user_info: userInfo,
            group_id: groupId,
            image: image,
            targetPath: PATH_FACEFIND_UPDATE
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    verifyUser(uid, groupId, image, options) {
        let param = {
            uid: uid,
            group_id: objectTools.ensureArray(groupId).join(','),
            image: image,
            targetPath: PATH_FACEFIND_VERIFY
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    identifyUser(groupId, image, options) {
        let param = {
            group_id: objectTools.ensureArray(groupId).join(','),
            image: image,
            targetPath: PATH_FACEFIND_IDENTIFY
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    getUser(uid, options) {
        let param = {
            uid: uid,
            targetPath: PATH_FACEFIND_GETUSER
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    getGrouplist(options) {
        let param = {targetPath: PATH_FACEFIND_GETGROUPLIST};
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    getGroupUsers(groupId, options) {
        let param = {
            group_id: groupId,
            targetPath: PATH_FACEFIND_GETGROUPUSER
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    addGroupUsers(srcGroupId, groupId, uid) {
        let param = {
            group_id: objectTools.ensureArray(groupId).join(','),
            src_group_id: srcGroupId,
            uid: uid,
            targetPath: PATH_FACEFIND_GROUPADDUSER
        }
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    deleteGroupUsers(groupId, uid) {
        let param = {
            group_id: objectTools.ensureArray(groupId).join(','),
            uid: uid,
            targetPath: PATH_FACEFIND_GROUPDELTEUSER
        }
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
}


module.exports = AipFace;