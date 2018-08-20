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
 * @file AipFace.js
 * @author baidu aip
 */
const BaseClient = require("./client/baseClient");
const RequestInfo = require("./client/requestInfo");
const HttpClient = require("./http/httpClientExt");
const HttpClientExt = require("./http/httpClientExt");
const objectTools = require("./util/objectTools");
const METHOD_POST = 'POST';
const DETECT_PATH = '/rest/2.0/face/v3/detect';
const SEARCH_PATH = '/rest/2.0/face/v3/search';
const USER_ADD_PATH = '/rest/2.0/face/v3/faceset/user/add';
const USER_UPDATE_PATH = '/rest/2.0/face/v3/faceset/user/update';
const FACE_DELETE_PATH = '/rest/2.0/face/v3/faceset/face/delete';
const USER_GET_PATH = '/rest/2.0/face/v3/faceset/user/get';
const FACE_GETLIST_PATH = '/rest/2.0/face/v3/faceset/face/getlist';
const GROUP_GETUSERS_PATH = '/rest/2.0/face/v3/faceset/group/getusers';
const USER_COPY_PATH = '/rest/2.0/face/v3/faceset/user/copy';
const USER_DELETE_PATH = '/rest/2.0/face/v3/faceset/user/delete';
const GROUP_ADD_PATH = '/rest/2.0/face/v3/faceset/group/add';
const GROUP_DELETE_PATH = '/rest/2.0/face/v3/faceset/group/delete';
const GROUP_GETLIST_PATH = '/rest/2.0/face/v3/faceset/group/getlist';
const PERSON_VERIFY_PATH = '/rest/2.0/face/v3/person/verify';
const VIDEO_SESSIONCODE_PATH = '/rest/2.0/face/v1/faceliveness/sessioncode';
/**
 * AipFace类
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
        let httpClient = new HttpClient();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl, param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }
    /**
     * 人脸检测接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   face_field 包括**age,beauty,expression,faceshape,gender,glasses,landmark,race,quality信息**  <br> 逗号分隔. 默认只返回face_token、人脸框、概率和旋转角度
     *   max_face_num 最多处理人脸的数目，默认值为1，仅检测图片中面积最大的那个人脸；**最大值10**，检测图片中面积最大的几张人脸。
     *   face_type 人脸的类型 **LIVE**表示生活照：通常为手机、相机拍摄的人像图片、或从网络获取的人像图片等**IDCARD**表示身份证芯片照：二代身份证内置芯片中的人像照片 **WATERMARK**表示带水印证件照：一般为带水印的小图，如公安网小图 **CERT**表示证件照片：如拍摄的身份证、工卡、护照、学生证等证件图片 默认**LIVE**
     * @return {Promise} - 标准Promise对象
     */
    detect(image, imageType, options) {
        let param = {
            image: image,
            image_type: imageType,
            targetPath: DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 人脸搜索接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} groupIdList - 从指定的group中进行查找 用逗号分隔，**上限20个**
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     *   user_id 当需要对特定用户进行比对时，指定user_id进行比对。即人脸认证功能。
     *   max_user_num 查找后返回的用户数量。返回相似度最高的几个用户，默认为1，最多返回20个。
     * @return {Promise} - 标准Promise对象
     */
    search(image, imageType, groupIdList, options) {
        let param = {
            image: image,
            image_type: imageType,
            group_id_list: groupIdList,
            targetPath: SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 人脸注册接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   user_info 用户资料，长度限制256B
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     * @return {Promise} - 标准Promise对象
     */
    addUser(image, imageType, groupId, userId, options) {
        let param = {
            image: image,
            image_type: imageType,
            group_id: groupId,
            user_id: userId,
            targetPath: USER_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 人脸更新接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} groupId - 更新指定groupid下uid对应的信息
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   user_info 用户资料，长度限制256B
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     * @return {Promise} - 标准Promise对象
     */
    updateUser(image, imageType, groupId, userId, options) {
        let param = {
            image: image,
            image_type: imageType,
            group_id: groupId,
            user_id: userId,
            targetPath: USER_UPDATE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 人脸删除接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {string} faceToken - 需要删除的人脸图片token，（由数字、字母、下划线组成）长度限制64B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    faceDelete(userId, groupId, faceToken, options) {
        let param = {
            user_id: userId,
            group_id: groupId,
            face_token: faceToken,
            targetPath: FACE_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 用户信息查询接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    getUser(userId, groupId, options) {
        let param = {
            user_id: userId,
            group_id: groupId,
            targetPath: USER_GET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 获取用户人脸列表接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    faceGetlist(userId, groupId, options) {
        let param = {
            user_id: userId,
            group_id: groupId,
            targetPath: FACE_GETLIST_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 获取用户列表接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   start 默认值0，起始序号
     *   length 返回数量，默认值100，最大值1000
     * @return {Promise} - 标准Promise对象
     */
    getGroupUsers(groupId, options) {
        let param = {
            group_id: groupId,
            targetPath: GROUP_GETUSERS_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 复制用户接口
     *
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   src_group_id 从指定组里复制信息
     *   dst_group_id 需要添加用户的组id
     * @return {Promise} - 标准Promise对象
     */
    userCopy(userId, options) {
        let param = {
            user_id: userId,
            targetPath: USER_COPY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 删除用户接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {string} userId - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    deleteUser(groupId, userId, options) {
        let param = {
            group_id: groupId,
            user_id: userId,
            targetPath: USER_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 创建用户组接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    groupAdd(groupId, options) {
        let param = {
            group_id: groupId,
            targetPath: GROUP_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 删除用户组接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    groupDelete(groupId, options) {
        let param = {
            group_id: groupId,
            targetPath: GROUP_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 组列表查询接口
     *
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   start 默认值0，起始序号
     *   length 返回数量，默认值100，最大值1000
     * @return {Promise} - 标准Promise对象
     */
    getGrouplist(options) {
        let param = {
            targetPath: GROUP_GETLIST_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 身份验证接口
     *
     * @param {string} image - 图片信息(**总数据大小应小于10M**)，图片上传方式根据image_type来判断
     * @param {string} imageType - 图片类型 **BASE64**:图片的base64值，base64编码后的图片数据，需urlencode，编码后的图片大小不超过2M；**URL**:图片的 URL地址( 可能由于网络等原因导致下载图片时间过长)**；FACE_TOKEN**: 人脸图片的唯一标识，调用人脸检测接口时，会为每个人脸图片赋予一个唯一的FACE_TOKEN，同一张图片多次检测得到的FACE_TOKEN是同一个
     * @param {string} idCardNumber - 身份证号（真实身份证号号码）
     * @param {string} name - utf8，姓名（真实姓名，和身份证号匹配）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   quality_control 图片质量控制  **NONE**: 不进行控制 **LOW**:较低的质量要求 **NORMAL**: 一般的质量要求 **HIGH**: 较高的质量要求 **默认 NONE**
     *   liveness_control 活体检测控制  **NONE**: 不进行控制 **LOW**:较低的活体要求(高通过率 低攻击拒绝率) **NORMAL**: 一般的活体要求(平衡的攻击拒绝率, 通过率) **HIGH**: 较高的活体要求(高攻击拒绝率 低通过率) **默认NONE**
     * @return {Promise} - 标准Promise对象
     */
    personVerify(image, imageType, idCardNumber, name, options) {
        let param = {
            image: image,
            image_type: imageType,
            id_card_number: idCardNumber,
            name: name,
            targetPath: PERSON_VERIFY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 语音校验码接口接口
     *
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   appid 百度云创建应用时的唯一标识ID
     * @return {Promise} - 标准Promise对象
     */
    videoSessioncode(options) {
        let param = {
            targetPath: VIDEO_SESSIONCODE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 在线活体检测
     *
     * @param {Object} param - 参数对象数组
     * @return {Promise} - 标准Promise对象
     * > 说明：两张图片的对象举例：
     * >
     * > [
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_field": "quality"
     * >     },
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_field": "quality"
     * >     }
     * > ]
     */
    faceverify(object) {
        const FACEVERIFY_PATH = '/rest/2.0/face/v3/faceverify';
        let httpClientJson = new HttpClientExt();
        let requestInfo = new RequestInfo(FACEVERIFY_PATH, object, METHOD_POST);
        return this.doRequest(requestInfo, httpClientJson);
    }
    /**
     * 人脸比对接口
     *
     * @param {Object} param - 参数对象数组
     * @return {Promise} - 标准Promise对象
     * > 说明：两张图片的对象举例：
     * >
     * > [
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_type": "LIVE",
     * >         "quality_control": "LOW",
     * >         "liveness_control": "HIGH"
     * >     },
     * >     {
     * >         "image": "sfasq35sadvsvqwr5q...",
     * >         "image_type": "BASE64",
     * >         "face_type": "IDCARD",
     * >         "quality_control": "LOW",
     * >         "liveness_control": "HIGH"
     * >     }
     * > ]
     */
    match(object) {
        const MATCH_PATH = '/rest/2.0/face/v3/match';
        let httpClientJson = new HttpClientExt();
        let requestInfo = new RequestInfo(MATCH_PATH, object, METHOD_POST);
        return this.doRequest(requestInfo, httpClientJson);
    }
}
exports.default = AipFace;
// @ts-ignore
Object.assign(AipFace, exports);
module.exports = AipFace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlwRmFjZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL0FpcEZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFJSCxrREFBbUQ7QUFFbkQsb0RBQXFEO0FBRXJELG1EQUFvRDtBQUNwRCxzREFBdUQ7QUFFdkQsa0RBQW1EO0FBRW5ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUUzQixNQUFNLFdBQVcsR0FBRywwQkFBMEIsQ0FBQztBQUMvQyxNQUFNLFdBQVcsR0FBRywwQkFBMEIsQ0FBQztBQUMvQyxNQUFNLGFBQWEsR0FBRyxvQ0FBb0MsQ0FBQztBQUMzRCxNQUFNLGdCQUFnQixHQUFHLHVDQUF1QyxDQUFDO0FBQ2pFLE1BQU0sZ0JBQWdCLEdBQUcsdUNBQXVDLENBQUM7QUFDakUsTUFBTSxhQUFhLEdBQUcsb0NBQW9DLENBQUM7QUFDM0QsTUFBTSxpQkFBaUIsR0FBRyx3Q0FBd0MsQ0FBQztBQUNuRSxNQUFNLG1CQUFtQixHQUFHLDBDQUEwQyxDQUFDO0FBQ3ZFLE1BQU0sY0FBYyxHQUFHLHFDQUFxQyxDQUFDO0FBQzdELE1BQU0sZ0JBQWdCLEdBQUcsdUNBQXVDLENBQUM7QUFDakUsTUFBTSxjQUFjLEdBQUcscUNBQXFDLENBQUM7QUFDN0QsTUFBTSxpQkFBaUIsR0FBRyx3Q0FBd0MsQ0FBQztBQUNuRSxNQUFNLGtCQUFrQixHQUFHLHlDQUF5QyxDQUFDO0FBQ3JFLE1BQU0sa0JBQWtCLEdBQUcsaUNBQWlDLENBQUM7QUFDN0QsTUFBTSxzQkFBc0IsR0FBRyw0Q0FBNEMsQ0FBQztBQUc1RTs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQVEsU0FBUSxVQUFVO0lBQzVCLFlBQVksS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQ3JCLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxVQUFV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QUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBR2hDLGlCQUFTLE9BQU8sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEJhaWR1LmNvbSwgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoXG4gKiB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvblxuICogYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiAqIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQGZpbGUgQWlwRmFjZS5qc1xuICogQGF1dGhvciBiYWlkdSBhaXBcbiAqL1xuXG5cblxuaW1wb3J0IEJhc2VDbGllbnQgPSByZXF1aXJlKCcuL2NsaWVudC9iYXNlQ2xpZW50Jyk7XG5cbmltcG9ydCBSZXF1ZXN0SW5mbyA9IHJlcXVpcmUoJy4vY2xpZW50L3JlcXVlc3RJbmZvJyk7XG5cbmltcG9ydCBIdHRwQ2xpZW50ID0gcmVxdWlyZSgnLi9odHRwL2h0dHBDbGllbnRFeHQnKTtcbmltcG9ydCBIdHRwQ2xpZW50RXh0ID0gcmVxdWlyZSgnLi9odHRwL2h0dHBDbGllbnRFeHQnKTtcblxuaW1wb3J0IG9iamVjdFRvb2xzID0gcmVxdWlyZSgnLi91dGlsL29iamVjdFRvb2xzJyk7XG5cbmNvbnN0IE1FVEhPRF9QT1NUID0gJ1BPU1QnO1xuXG5jb25zdCBERVRFQ1RfUEFUSCA9ICcvcmVzdC8yLjAvZmFjZS92My9kZXRlY3QnO1xuY29uc3QgU0VBUkNIX1BBVEggPSAnL3Jlc3QvMi4wL2ZhY2UvdjMvc2VhcmNoJztcbmNvbnN0IFVTRVJfQUREX1BBVEggPSAnL3Jlc3QvMi4wL2ZhY2UvdjMvZmFjZXNldC91c2VyL2FkZCc7XG5jb25zdCBVU0VSX1VQREFURV9QQVRIID0gJy9yZXN0LzIuMC9mYWNlL3YzL2ZhY2VzZXQvdXNlci91cGRhdGUnO1xuY29uc3QgRkFDRV9ERUxFVEVfUEFUSCA9ICcvcmVzdC8yLjAvZmFjZS92My9mYWNlc2V0L2ZhY2UvZGVsZXRlJztcbmNvbnN0IFVTRVJfR0VUX1BBVEggPSAnL3Jlc3QvMi4wL2ZhY2UvdjMvZmFjZXNldC91c2VyL2dldCc7XG5jb25zdCBGQUNFX0dFVExJU1RfUEFUSCA9ICcvcmVzdC8yLjAvZmFjZS92My9mYWNlc2V0L2ZhY2UvZ2V0bGlzdCc7XG5jb25zdCBHUk9VUF9HRVRVU0VSU19QQVRIID0gJy9yZXN0LzIuMC9mYWNlL3YzL2ZhY2VzZXQvZ3JvdXAvZ2V0dXNlcnMnO1xuY29uc3QgVVNFUl9DT1BZX1BBVEggPSAnL3Jlc3QvMi4wL2ZhY2UvdjMvZmFjZXNldC91c2VyL2NvcHknO1xuY29uc3QgVVNFUl9ERUxFVEVfUEFUSCA9ICcvcmVzdC8yLjAvZmFjZS92My9mYWNlc2V0L3VzZXIvZGVsZXRlJztcbmNvbnN0IEdST1VQX0FERF9QQVRIID0gJy9yZXN0LzIuMC9mYWNlL3YzL2ZhY2VzZXQvZ3JvdXAvYWRkJztcbmNvbnN0IEdST1VQX0RFTEVURV9QQVRIID0gJy9yZXN0LzIuMC9mYWNlL3YzL2ZhY2VzZXQvZ3JvdXAvZGVsZXRlJztcbmNvbnN0IEdST1VQX0dFVExJU1RfUEFUSCA9ICcvcmVzdC8yLjAvZmFjZS92My9mYWNlc2V0L2dyb3VwL2dldGxpc3QnO1xuY29uc3QgUEVSU09OX1ZFUklGWV9QQVRIID0gJy9yZXN0LzIuMC9mYWNlL3YzL3BlcnNvbi92ZXJpZnknO1xuY29uc3QgVklERU9fU0VTU0lPTkNPREVfUEFUSCA9ICcvcmVzdC8yLjAvZmFjZS92MS9mYWNlbGl2ZW5lc3Mvc2Vzc2lvbmNvZGUnO1xuXG5cbi8qKlxuICogQWlwRmFjZeexu1xuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQmFzZUNsaWVudFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwaWQgYXBwaWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gYWsgIGFjY2VzcyBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2sgIHNlY3VyaXR5IGtleS5cbiAqL1xuY2xhc3MgQWlwRmFjZSBleHRlbmRzIEJhc2VDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKGFwcElkLCBhaywgc2spIHtcbiAgICAgICAgc3VwZXIoYXBwSWQsIGFrLCBzayk7XG4gICAgfVxuICAgIGNvbW1vbkltcGwocGFyYW0pIHtcbiAgICAgICAgbGV0IGh0dHBDbGllbnQgPSBuZXcgSHR0cENsaWVudCgpO1xuICAgICAgICBsZXQgYXBpVXJsID0gcGFyYW0udGFyZ2V0UGF0aDtcbiAgICAgICAgZGVsZXRlIHBhcmFtLnRhcmdldFBhdGg7XG4gICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IG5ldyBSZXF1ZXN0SW5mbyhhcGlVcmwsXG4gICAgICAgICAgICBwYXJhbSwgTUVUSE9EX1BPU1QpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QocmVxdWVzdEluZm8sIGh0dHBDbGllbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS6uuiEuOajgOa1i+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+54mH5L+h5oGvKCoq5oC75pWw5o2u5aSn5bCP5bqU5bCP5LqOMTBNKiop77yM5Zu+54mH5LiK5Lyg5pa55byP5qC55o2uaW1hZ2VfdHlwZeadpeWIpOaWrVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVR5cGUgLSDlm77niYfnsbvlnosgKipCQVNFNjQqKjrlm77niYfnmoRiYXNlNjTlgLzvvIxiYXNlNjTnvJbnoIHlkI7nmoTlm77niYfmlbDmja7vvIzpnIB1cmxlbmNvZGXvvIznvJbnoIHlkI7nmoTlm77niYflpKflsI/kuI3otoXov4cyTe+8myoqVVJMKio65Zu+54mH55qEIFVSTOWcsOWdgCgg5Y+v6IO955Sx5LqO572R57uc562J5Y6f5Zug5a+86Ie05LiL6L295Zu+54mH5pe26Ze06L+H6ZW/KSoq77ybRkFDRV9UT0tFTioqOiDkurrohLjlm77niYfnmoTllK/kuIDmoIfor4bvvIzosIPnlKjkurrohLjmo4DmtYvmjqXlj6Pml7bvvIzkvJrkuLrmr4/kuKrkurrohLjlm77niYfotYvkuojkuIDkuKrllK/kuIDnmoRGQUNFX1RPS0VO77yM5ZCM5LiA5byg5Zu+54mH5aSa5qyh5qOA5rWL5b6X5Yiw55qERkFDRV9UT0tFTuaYr+WQjOS4gOS4qlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIGZhY2VfZmllbGQg5YyF5ousKiphZ2UsYmVhdXR5LGV4cHJlc3Npb24sZmFjZXNoYXBlLGdlbmRlcixnbGFzc2VzLGxhbmRtYXJrLHJhY2UscXVhbGl0eeS/oeaBryoqICA8YnI+IOmAl+WPt+WIhumalC4g6buY6K6k5Y+q6L+U5ZueZmFjZV90b2tlbuOAgeS6uuiEuOahhuOAgeamgueOh+WSjOaXi+i9rOinkuW6plxuICAgICAqICAgbWF4X2ZhY2VfbnVtIOacgOWkmuWkhOeQhuS6uuiEuOeahOaVsOebru+8jOm7mOiupOWAvOS4ujHvvIzku4Xmo4DmtYvlm77niYfkuK3pnaLnp6/mnIDlpKfnmoTpgqPkuKrkurrohLjvvJsqKuacgOWkp+WAvDEwKirvvIzmo4DmtYvlm77niYfkuK3pnaLnp6/mnIDlpKfnmoTlh6DlvKDkurrohLjjgIJcbiAgICAgKiAgIGZhY2VfdHlwZSDkurrohLjnmoTnsbvlnosgKipMSVZFKirooajnpLrnlJ/mtLvnhafvvJrpgJrluLjkuLrmiYvmnLrjgIHnm7jmnLrmi43mkYTnmoTkurrlg4/lm77niYfjgIHmiJbku47nvZHnu5zojrflj5bnmoTkurrlg4/lm77niYfnrYkqKklEQ0FSRCoq6KGo56S66Lqr5Lu96K+B6Iqv54mH54Wn77ya5LqM5Luj6Lqr5Lu96K+B5YaF572u6Iqv54mH5Lit55qE5Lq65YOP54Wn54mHICoqV0FURVJNQVJLKirooajnpLrluKbmsLTljbDor4Hku7bnhafvvJrkuIDoiKzkuLrluKbmsLTljbDnmoTlsI/lm77vvIzlpoLlhazlronnvZHlsI/lm74gKipDRVJUKirooajnpLror4Hku7bnhafniYfvvJrlpoLmi43mkYTnmoTouqvku73or4HjgIHlt6XljaHjgIHmiqTnhafjgIHlrabnlJ/or4HnrYnor4Hku7blm77niYcg6buY6K6kKipMSVZFKipcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBkZXRlY3QoaW1hZ2UsIGltYWdlVHlwZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICBpbWFnZV90eXBlOiBpbWFnZVR5cGUsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBERVRFQ1RfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Lq66IS45pCc57Si5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2UgLSDlm77niYfkv6Hmga8oKirmgLvmlbDmja7lpKflsI/lupTlsI/kuo4xME0qKinvvIzlm77niYfkuIrkvKDmlrnlvI/moLnmja5pbWFnZV90eXBl5p2l5Yik5patXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlVHlwZSAtIOWbvueJh+exu+WeiyAqKkJBU0U2NCoqOuWbvueJh+eahGJhc2U2NOWAvO+8jGJhc2U2NOe8lueggeWQjueahOWbvueJh+aVsOaNru+8jOmcgHVybGVuY29kZe+8jOe8lueggeWQjueahOWbvueJh+Wkp+Wwj+S4jei2hei/hzJN77ybKipVUkwqKjrlm77niYfnmoQgVVJM5Zyw5Z2AKCDlj6/og73nlLHkuo7nvZHnu5znrYnljp/lm6Dlr7zoh7TkuIvovb3lm77niYfml7bpl7Tov4fplb8pKirvvJtGQUNFX1RPS0VOKio6IOS6uuiEuOWbvueJh+eahOWUr+S4gOagh+ivhu+8jOiwg+eUqOS6uuiEuOajgOa1i+aOpeWPo+aXtu+8jOS8muS4uuavj+S4quS6uuiEuOWbvueJh+i1i+S6iOS4gOS4quWUr+S4gOeahEZBQ0VfVE9LRU7vvIzlkIzkuIDlvKDlm77niYflpJrmrKHmo4DmtYvlvpfliLDnmoRGQUNFX1RPS0VO5piv5ZCM5LiA5LiqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWRMaXN0IC0g5LuO5oyH5a6a55qEZ3JvdXDkuK3ov5vooYzmn6Xmib4g55So6YCX5Y+35YiG6ZqU77yMKirkuIrpmZAyMOS4qioqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgcXVhbGl0eV9jb250cm9sIOWbvueJh+i0qOmHj+aOp+WItiAgKipOT05FKio6IOS4jei/m+ihjOaOp+WItiAqKkxPVyoqOui+g+S9jueahOi0qOmHj+imgeaxgiAqKk5PUk1BTCoqOiDkuIDoiKznmoTotKjph4/opoHmsYIgKipISUdIKio6IOi+g+mrmOeahOi0qOmHj+imgeaxgiAqKum7mOiupCBOT05FKipcbiAgICAgKiAgIGxpdmVuZXNzX2NvbnRyb2wg5rS75L2T5qOA5rWL5o6n5Yi2ICAqKk5PTkUqKjog5LiN6L+b6KGM5o6n5Yi2ICoqTE9XKio66L6D5L2O55qE5rS75L2T6KaB5rGCKOmrmOmAmui/h+eOhyDkvY7mlLvlh7vmi5Lnu53njocpICoqTk9STUFMKio6IOS4gOiIrOeahOa0u+S9k+imgeaxgijlubPooaHnmoTmlLvlh7vmi5Lnu53njocsIOmAmui/h+eOhykgKipISUdIKio6IOi+g+mrmOeahOa0u+S9k+imgeaxgijpq5jmlLvlh7vmi5Lnu53njocg5L2O6YCa6L+H546HKSAqKum7mOiupE5PTkUqKlxuICAgICAqICAgdXNlcl9pZCDlvZPpnIDopoHlr7nnibnlrprnlKjmiLfov5vooYzmr5Tlr7nml7bvvIzmjIflrpp1c2VyX2lk6L+b6KGM5q+U5a+544CC5Y2z5Lq66IS46K6k6K+B5Yqf6IO944CCXG4gICAgICogICBtYXhfdXNlcl9udW0g5p+l5om+5ZCO6L+U5Zue55qE55So5oi35pWw6YeP44CC6L+U5Zue55u45Ly85bqm5pyA6auY55qE5Yeg5Liq55So5oi377yM6buY6K6k5Li6Me+8jOacgOWkmui/lOWbnjIw5Liq44CCXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgc2VhcmNoKGltYWdlLCBpbWFnZVR5cGUsIGdyb3VwSWRMaXN0LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGltYWdlOiBpbWFnZSxcbiAgICAgICAgICAgIGltYWdlX3R5cGU6IGltYWdlVHlwZSxcbiAgICAgICAgICAgIGdyb3VwX2lkX2xpc3Q6IGdyb3VwSWRMaXN0LFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogU0VBUkNIX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS6uuiEuOazqOWGjOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGltYWdlIC0g5Zu+54mH5L+h5oGvKCoq5oC75pWw5o2u5aSn5bCP5bqU5bCP5LqOMTBNKiop77yM5Zu+54mH5LiK5Lyg5pa55byP5qC55o2uaW1hZ2VfdHlwZeadpeWIpOaWrVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVR5cGUgLSDlm77niYfnsbvlnosgKipCQVNFNjQqKjrlm77niYfnmoRiYXNlNjTlgLzvvIxiYXNlNjTnvJbnoIHlkI7nmoTlm77niYfmlbDmja7vvIzpnIB1cmxlbmNvZGXvvIznvJbnoIHlkI7nmoTlm77niYflpKflsI/kuI3otoXov4cyTe+8myoqVVJMKio65Zu+54mH55qEIFVSTOWcsOWdgCgg5Y+v6IO955Sx5LqO572R57uc562J5Y6f5Zug5a+86Ie05LiL6L295Zu+54mH5pe26Ze06L+H6ZW/KSoq77ybRkFDRV9UT0tFTioqOiDkurrohLjlm77niYfnmoTllK/kuIDmoIfor4bvvIzosIPnlKjkurrohLjmo4DmtYvmjqXlj6Pml7bvvIzkvJrkuLrmr4/kuKrkurrohLjlm77niYfotYvkuojkuIDkuKrllK/kuIDnmoRGQUNFX1RPS0VO77yM5ZCM5LiA5byg5Zu+54mH5aSa5qyh5qOA5rWL5b6X5Yiw55qERkFDRV9UT0tFTuaYr+WQjOS4gOS4qlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0g55So5oi357uEaWTvvIjnlLHmlbDlrZfjgIHlrZfmr43jgIHkuIvliJLnur/nu4TmiJDvvInvvIzplb/luqbpmZDliLYxMjhCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJZCAtIOeUqOaIt2lk77yI55Sx5pWw5a2X44CB5a2X5q+N44CB5LiL5YiS57q/57uE5oiQ77yJ77yM6ZW/5bqm6ZmQ5Yi2MTI4QlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIHVzZXJfaW5mbyDnlKjmiLfotYTmlpnvvIzplb/luqbpmZDliLYyNTZCXG4gICAgICogICBxdWFsaXR5X2NvbnRyb2wg5Zu+54mH6LSo6YeP5o6n5Yi2ICAqKk5PTkUqKjog5LiN6L+b6KGM5o6n5Yi2ICoqTE9XKio66L6D5L2O55qE6LSo6YeP6KaB5rGCICoqTk9STUFMKio6IOS4gOiIrOeahOi0qOmHj+imgeaxgiAqKkhJR0gqKjog6L6D6auY55qE6LSo6YeP6KaB5rGCICoq6buY6K6kIE5PTkUqKlxuICAgICAqICAgbGl2ZW5lc3NfY29udHJvbCDmtLvkvZPmo4DmtYvmjqfliLYgICoqTk9ORSoqOiDkuI3ov5vooYzmjqfliLYgKipMT1cqKjrovoPkvY7nmoTmtLvkvZPopoHmsYIo6auY6YCa6L+H546HIOS9juaUu+WHu+aLkue7neeOhykgKipOT1JNQUwqKjog5LiA6Iis55qE5rS75L2T6KaB5rGCKOW5s+ihoeeahOaUu+WHu+aLkue7neeOhywg6YCa6L+H546HKSAqKkhJR0gqKjog6L6D6auY55qE5rS75L2T6KaB5rGCKOmrmOaUu+WHu+aLkue7neeOhyDkvY7pgJrov4fnjocpICoq6buY6K6kTk9ORSoqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgYWRkVXNlcihpbWFnZSwgaW1hZ2VUeXBlLCBncm91cElkLCB1c2VySWQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgaW1hZ2VfdHlwZTogaW1hZ2VUeXBlLFxuICAgICAgICAgICAgZ3JvdXBfaWQ6IGdyb3VwSWQsXG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBVU0VSX0FERF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkurrohLjmm7TmlrDmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvueJh+S/oeaBrygqKuaAu+aVsOaNruWkp+Wwj+W6lOWwj+S6jjEwTSoqKe+8jOWbvueJh+S4iuS8oOaWueW8j+agueaNrmltYWdlX3R5cGXmnaXliKTmlq1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VUeXBlIC0g5Zu+54mH57G75Z6LICoqQkFTRTY0Kio65Zu+54mH55qEYmFzZTY05YC877yMYmFzZTY057yW56CB5ZCO55qE5Zu+54mH5pWw5o2u77yM6ZyAdXJsZW5jb2Rl77yM57yW56CB5ZCO55qE5Zu+54mH5aSn5bCP5LiN6LaF6L+HMk3vvJsqKlVSTCoqOuWbvueJh+eahCBVUkzlnLDlnYAoIOWPr+iDveeUseS6jue9kee7nOetieWOn+WboOWvvOiHtOS4i+i9veWbvueJh+aXtumXtOi/h+mVvykqKu+8m0ZBQ0VfVE9LRU4qKjog5Lq66IS45Zu+54mH55qE5ZSv5LiA5qCH6K+G77yM6LCD55So5Lq66IS45qOA5rWL5o6l5Y+j5pe277yM5Lya5Li65q+P5Liq5Lq66IS45Zu+54mH6LWL5LqI5LiA5Liq5ZSv5LiA55qERkFDRV9UT0tFTu+8jOWQjOS4gOW8oOWbvueJh+WkmuasoeajgOa1i+W+l+WIsOeahEZBQ0VfVE9LRU7mmK/lkIzkuIDkuKpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIOabtOaWsOaMh+Wummdyb3VwaWTkuIt1aWTlr7nlupTnmoTkv6Hmga9cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkIC0g55So5oi3aWTvvIjnlLHmlbDlrZfjgIHlrZfmr43jgIHkuIvliJLnur/nu4TmiJDvvInvvIzplb/luqbpmZDliLYxMjhCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgdXNlcl9pbmZvIOeUqOaIt+i1hOaWme+8jOmVv+W6pumZkOWItjI1NkJcbiAgICAgKiAgIHF1YWxpdHlfY29udHJvbCDlm77niYfotKjph4/mjqfliLYgICoqTk9ORSoqOiDkuI3ov5vooYzmjqfliLYgKipMT1cqKjrovoPkvY7nmoTotKjph4/opoHmsYIgKipOT1JNQUwqKjog5LiA6Iis55qE6LSo6YeP6KaB5rGCICoqSElHSCoqOiDovoPpq5jnmoTotKjph4/opoHmsYIgKirpu5jorqQgTk9ORSoqXG4gICAgICogICBsaXZlbmVzc19jb250cm9sIOa0u+S9k+ajgOa1i+aOp+WItiAgKipOT05FKio6IOS4jei/m+ihjOaOp+WItiAqKkxPVyoqOui+g+S9jueahOa0u+S9k+imgeaxgijpq5jpgJrov4fnjocg5L2O5pS75Ye75ouS57ud546HKSAqKk5PUk1BTCoqOiDkuIDoiKznmoTmtLvkvZPopoHmsYIo5bmz6KGh55qE5pS75Ye75ouS57ud546HLCDpgJrov4fnjocpICoqSElHSCoqOiDovoPpq5jnmoTmtLvkvZPopoHmsYIo6auY5pS75Ye75ouS57ud546HIOS9jumAmui/h+eOhykgKirpu5jorqROT05FKipcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICB1cGRhdGVVc2VyKGltYWdlLCBpbWFnZVR5cGUsIGdyb3VwSWQsIHVzZXJJZCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBpbWFnZTogaW1hZ2UsXG4gICAgICAgICAgICBpbWFnZV90eXBlOiBpbWFnZVR5cGUsXG4gICAgICAgICAgICBncm91cF9pZDogZ3JvdXBJZCxcbiAgICAgICAgICAgIHVzZXJfaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFVTRVJfVVBEQVRFX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS6uuiEuOWIoOmZpOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJZCAtIOeUqOaIt2lk77yI55Sx5pWw5a2X44CB5a2X5q+N44CB5LiL5YiS57q/57uE5oiQ77yJ77yM6ZW/5bqm6ZmQ5Yi2MTI4QlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0g55So5oi357uEaWTvvIjnlLHmlbDlrZfjgIHlrZfmr43jgIHkuIvliJLnur/nu4TmiJDvvInvvIzplb/luqbpmZDliLYxMjhCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZhY2VUb2tlbiAtIOmcgOimgeWIoOmZpOeahOS6uuiEuOWbvueJh3Rva2Vu77yM77yI55Sx5pWw5a2X44CB5a2X5q+N44CB5LiL5YiS57q/57uE5oiQ77yJ6ZW/5bqm6ZmQ5Yi2NjRCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGZhY2VEZWxldGUodXNlcklkLCBncm91cElkLCBmYWNlVG9rZW4sIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdXNlcl9pZDogdXNlcklkLFxuICAgICAgICAgICAgZ3JvdXBfaWQ6IGdyb3VwSWQsXG4gICAgICAgICAgICBmYWNlX3Rva2VuOiBmYWNlVG9rZW4sXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBGQUNFX0RFTEVURV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnlKjmiLfkv6Hmga/mn6Xor6LmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgLSDnlKjmiLdpZO+8iOeUseaVsOWtl+OAgeWtl+avjeOAgeS4i+WIkue6v+e7hOaIkO+8ie+8jOmVv+W6pumZkOWItjEyOEJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIOeUqOaIt+e7hGlk77yI55Sx5pWw5a2X44CB5a2X5q+N44CB5LiL5YiS57q/57uE5oiQ77yJ77yM6ZW/5bqm6ZmQ5Yi2MTI4QlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBnZXRVc2VyKHVzZXJJZCwgZ3JvdXBJZCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICBncm91cF9pZDogZ3JvdXBJZCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFVTRVJfR0VUX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPlueUqOaIt+S6uuiEuOWIl+ihqOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJZCAtIOeUqOaIt2lk77yI55Sx5pWw5a2X44CB5a2X5q+N44CB5LiL5YiS57q/57uE5oiQ77yJ77yM6ZW/5bqm6ZmQ5Yi2MTI4QlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0g55So5oi357uEaWTvvIjnlLHmlbDlrZfjgIHlrZfmr43jgIHkuIvliJLnur/nu4TmiJDvvInvvIzplb/luqbpmZDliLYxMjhCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGZhY2VHZXRsaXN0KHVzZXJJZCwgZ3JvdXBJZCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB1c2VyX2lkOiB1c2VySWQsXG4gICAgICAgICAgICBncm91cF9pZDogZ3JvdXBJZCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEZBQ0VfR0VUTElTVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bnlKjmiLfliJfooajmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0g55So5oi357uEaWTvvIjnlLHmlbDlrZfjgIHlrZfmr43jgIHkuIvliJLnur/nu4TmiJDvvInvvIzplb/luqbpmZDliLYxMjhCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgc3RhcnQg6buY6K6k5YC8MO+8jOi1t+Wni+W6j+WPt1xuICAgICAqICAgbGVuZ3RoIOi/lOWbnuaVsOmHj++8jOm7mOiupOWAvDEwMO+8jOacgOWkp+WAvDEwMDBcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBnZXRHcm91cFVzZXJzKGdyb3VwSWQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgZ3JvdXBfaWQ6IGdyb3VwSWQsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBHUk9VUF9HRVRVU0VSU19QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlpI3liLbnlKjmiLfmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgLSDnlKjmiLdpZO+8iOeUseaVsOWtl+OAgeWtl+avjeOAgeS4i+WIkue6v+e7hOaIkO+8ie+8jOmVv+W6pumZkOWItjEyOEJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICBzcmNfZ3JvdXBfaWQg5LuO5oyH5a6a57uE6YeM5aSN5Yi25L+h5oGvXG4gICAgICogICBkc3RfZ3JvdXBfaWQg6ZyA6KaB5re75Yqg55So5oi355qE57uEaWRcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICB1c2VyQ29weSh1c2VySWQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdXNlcl9pZDogdXNlcklkLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogVVNFUl9DT1BZX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIoOmZpOeUqOaIt+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSDnlKjmiLfnu4RpZO+8iOeUseaVsOWtl+OAgeWtl+avjeOAgeS4i+WIkue6v+e7hOaIkO+8ie+8jOmVv+W6pumZkOWItjEyOEJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklkIC0g55So5oi3aWTvvIjnlLHmlbDlrZfjgIHlrZfmr43jgIHkuIvliJLnur/nu4TmiJDvvInvvIzplb/luqbpmZDliLYxMjhCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGRlbGV0ZVVzZXIoZ3JvdXBJZCwgdXNlcklkLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGdyb3VwX2lkOiBncm91cElkLFxuICAgICAgICAgICAgdXNlcl9pZDogdXNlcklkLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogVVNFUl9ERUxFVEVfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu655So5oi357uE5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIOeUqOaIt+e7hGlk77yI55Sx5pWw5a2X44CB5a2X5q+N44CB5LiL5YiS57q/57uE5oiQ77yJ77yM6ZW/5bqm6ZmQ5Yi2MTI4QlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBncm91cEFkZChncm91cElkLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIGdyb3VwX2lkOiBncm91cElkLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogR1JPVVBfQUREX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIoOmZpOeUqOaIt+e7hOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSDnlKjmiLfnu4RpZO+8iOeUseaVsOWtl+OAgeWtl+avjeOAgeS4i+WIkue6v+e7hOaIkO+8ie+8jOmVv+W6pumZkOWItjEyOEJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZ3JvdXBEZWxldGUoZ3JvdXBJZCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICBncm91cF9pZDogZ3JvdXBJZCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEdST1VQX0RFTEVURV9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnu4TliJfooajmn6Xor6LmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIHN0YXJ0IOm7mOiupOWAvDDvvIzotbflp4vluo/lj7dcbiAgICAgKiAgIGxlbmd0aCDov5Tlm57mlbDph4/vvIzpu5jorqTlgLwxMDDvvIzmnIDlpKflgLwxMDAwXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZ2V0R3JvdXBsaXN0KG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGFyZ2V0UGF0aDogR1JPVVBfR0VUTElTVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDouqvku73pqozor4HmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZSAtIOWbvueJh+S/oeaBrygqKuaAu+aVsOaNruWkp+Wwj+W6lOWwj+S6jjEwTSoqKe+8jOWbvueJh+S4iuS8oOaWueW8j+agueaNrmltYWdlX3R5cGXmnaXliKTmlq1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW1hZ2VUeXBlIC0g5Zu+54mH57G75Z6LICoqQkFTRTY0Kio65Zu+54mH55qEYmFzZTY05YC877yMYmFzZTY057yW56CB5ZCO55qE5Zu+54mH5pWw5o2u77yM6ZyAdXJsZW5jb2Rl77yM57yW56CB5ZCO55qE5Zu+54mH5aSn5bCP5LiN6LaF6L+HMk3vvJsqKlVSTCoqOuWbvueJh+eahCBVUkzlnLDlnYAoIOWPr+iDveeUseS6jue9kee7nOetieWOn+WboOWvvOiHtOS4i+i9veWbvueJh+aXtumXtOi/h+mVvykqKu+8m0ZBQ0VfVE9LRU4qKjog5Lq66IS45Zu+54mH55qE5ZSv5LiA5qCH6K+G77yM6LCD55So5Lq66IS45qOA5rWL5o6l5Y+j5pe277yM5Lya5Li65q+P5Liq5Lq66IS45Zu+54mH6LWL5LqI5LiA5Liq5ZSv5LiA55qERkFDRV9UT0tFTu+8jOWQjOS4gOW8oOWbvueJh+WkmuasoeajgOa1i+W+l+WIsOeahEZBQ0VfVE9LRU7mmK/lkIzkuIDkuKpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRDYXJkTnVtYmVyIC0g6Lqr5Lu96K+B5Y+377yI55yf5a6e6Lqr5Lu96K+B5Y+35Y+356CB77yJXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB1dGY477yM5aeT5ZCN77yI55yf5a6e5aeT5ZCN77yM5ZKM6Lqr5Lu96K+B5Y+35Yy56YWN77yJXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgcXVhbGl0eV9jb250cm9sIOWbvueJh+i0qOmHj+aOp+WItiAgKipOT05FKio6IOS4jei/m+ihjOaOp+WItiAqKkxPVyoqOui+g+S9jueahOi0qOmHj+imgeaxgiAqKk5PUk1BTCoqOiDkuIDoiKznmoTotKjph4/opoHmsYIgKipISUdIKio6IOi+g+mrmOeahOi0qOmHj+imgeaxgiAqKum7mOiupCBOT05FKipcbiAgICAgKiAgIGxpdmVuZXNzX2NvbnRyb2wg5rS75L2T5qOA5rWL5o6n5Yi2ICAqKk5PTkUqKjog5LiN6L+b6KGM5o6n5Yi2ICoqTE9XKio66L6D5L2O55qE5rS75L2T6KaB5rGCKOmrmOmAmui/h+eOhyDkvY7mlLvlh7vmi5Lnu53njocpICoqTk9STUFMKio6IOS4gOiIrOeahOa0u+S9k+imgeaxgijlubPooaHnmoTmlLvlh7vmi5Lnu53njocsIOmAmui/h+eOhykgKipISUdIKio6IOi+g+mrmOeahOa0u+S9k+imgeaxgijpq5jmlLvlh7vmi5Lnu53njocg5L2O6YCa6L+H546HKSAqKum7mOiupE5PTkUqKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHBlcnNvblZlcmlmeShpbWFnZSwgaW1hZ2VUeXBlLCBpZENhcmROdW1iZXIsIG5hbWUsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgaW1hZ2VfdHlwZTogaW1hZ2VUeXBlLFxuICAgICAgICAgICAgaWRfY2FyZF9udW1iZXI6IGlkQ2FyZE51bWJlcixcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBQRVJTT05fVkVSSUZZX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOivremfs+agoemqjOeggeaOpeWPo+aOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgYXBwaWQg55m+5bqm5LqR5Yib5bu65bqU55So5pe255qE5ZSv5LiA5qCH6K+GSURcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICB2aWRlb1Nlc3Npb25jb2RlKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGFyZ2V0UGF0aDogVklERU9fU0VTU0lPTkNPREVfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWcqOe6v+a0u+S9k+ajgOa1i1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtIC0g5Y+C5pWw5a+56LGh5pWw57uEXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICogPiDor7TmmI7vvJrkuKTlvKDlm77niYfnmoTlr7nosaHkuL7kvovvvJpcbiAgICAgKiA+XG4gICAgICogPiBbXG4gICAgICogPiAgICAge1xuICAgICAqID4gICAgICAgICBcImltYWdlXCI6IFwic2Zhc3EzNXNhZHZzdnF3cjVxLi4uXCIsXG4gICAgICogPiAgICAgICAgIFwiaW1hZ2VfdHlwZVwiOiBcIkJBU0U2NFwiLFxuICAgICAqID4gICAgICAgICBcImZhY2VfZmllbGRcIjogXCJxdWFsaXR5XCJcbiAgICAgKiA+ICAgICB9LFxuICAgICAqID4gICAgIHtcbiAgICAgKiA+ICAgICAgICAgXCJpbWFnZVwiOiBcInNmYXNxMzVzYWR2c3Zxd3I1cS4uLlwiLFxuICAgICAqID4gICAgICAgICBcImltYWdlX3R5cGVcIjogXCJCQVNFNjRcIixcbiAgICAgKiA+ICAgICAgICAgXCJmYWNlX2ZpZWxkXCI6IFwicXVhbGl0eVwiXG4gICAgICogPiAgICAgfVxuICAgICAqID4gXVxuICAgICAqL1xuICAgIGZhY2V2ZXJpZnkob2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IEZBQ0VWRVJJRllfUEFUSCA9ICcvcmVzdC8yLjAvZmFjZS92My9mYWNldmVyaWZ5JztcbiAgICAgICAgbGV0IGh0dHBDbGllbnRKc29uID0gbmV3IEh0dHBDbGllbnRFeHQoKTtcbiAgICAgICAgbGV0IHJlcXVlc3RJbmZvID0gbmV3IFJlcXVlc3RJbmZvKEZBQ0VWRVJJRllfUEFUSCxcbiAgICAgICAgICAgIG9iamVjdCwgTUVUSE9EX1BPU1QpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QocmVxdWVzdEluZm8sIGh0dHBDbGllbnRKc29uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDkurrohLjmr5Tlr7nmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSAtIOWPguaVsOWvueixoeaVsOe7hFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqID4g6K+05piO77ya5Lik5byg5Zu+54mH55qE5a+56LGh5Li+5L6L77yaXG4gICAgICogPlxuICAgICAqID4gW1xuICAgICAqID4gICAgIHtcbiAgICAgKiA+ICAgICAgICAgXCJpbWFnZVwiOiBcInNmYXNxMzVzYWR2c3Zxd3I1cS4uLlwiLFxuICAgICAqID4gICAgICAgICBcImltYWdlX3R5cGVcIjogXCJCQVNFNjRcIixcbiAgICAgKiA+ICAgICAgICAgXCJmYWNlX3R5cGVcIjogXCJMSVZFXCIsXG4gICAgICogPiAgICAgICAgIFwicXVhbGl0eV9jb250cm9sXCI6IFwiTE9XXCIsXG4gICAgICogPiAgICAgICAgIFwibGl2ZW5lc3NfY29udHJvbFwiOiBcIkhJR0hcIlxuICAgICAqID4gICAgIH0sXG4gICAgICogPiAgICAge1xuICAgICAqID4gICAgICAgICBcImltYWdlXCI6IFwic2Zhc3EzNXNhZHZzdnF3cjVxLi4uXCIsXG4gICAgICogPiAgICAgICAgIFwiaW1hZ2VfdHlwZVwiOiBcIkJBU0U2NFwiLFxuICAgICAqID4gICAgICAgICBcImZhY2VfdHlwZVwiOiBcIklEQ0FSRFwiLFxuICAgICAqID4gICAgICAgICBcInF1YWxpdHlfY29udHJvbFwiOiBcIkxPV1wiLFxuICAgICAqID4gICAgICAgICBcImxpdmVuZXNzX2NvbnRyb2xcIjogXCJISUdIXCJcbiAgICAgKiA+ICAgICB9XG4gICAgICogPiBdXG4gICAgICovXG4gICAgbWF0Y2gob2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IE1BVENIX1BBVEggPSAnL3Jlc3QvMi4wL2ZhY2UvdjMvbWF0Y2gnO1xuICAgICAgICBsZXQgaHR0cENsaWVudEpzb24gPSBuZXcgSHR0cENsaWVudEV4dCgpO1xuICAgICAgICBsZXQgcmVxdWVzdEluZm8gPSBuZXcgUmVxdWVzdEluZm8oTUFUQ0hfUEFUSCxcbiAgICAgICAgICAgIG9iamVjdCwgTUVUSE9EX1BPU1QpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb1JlcXVlc3QocmVxdWVzdEluZm8sIGh0dHBDbGllbnRKc29uKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFpcEZhY2U7XG4vLyBAdHMtaWdub3JlXG5PYmplY3QuYXNzaWduKEFpcEZhY2UsIGV4cG9ydHMpO1xuLy8gQHRzLWlnbm9yZVxuXG5leHBvcnQgPSBBaXBGYWNlO1xuXG4iXX0=