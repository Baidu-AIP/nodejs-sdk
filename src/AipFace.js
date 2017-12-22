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



const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const DETECT_PATH = '/rest/2.0/face/v2/detect';
const MATCH_PATH = '/rest/2.0/face/v2/match';
const IDENTIFY_PATH = '/rest/2.0/face/v2/identify';
const VERIFY_PATH = '/rest/2.0/face/v2/verify';
const USER_ADD_PATH = '/rest/2.0/face/v2/faceset/user/add';
const USER_UPDATE_PATH = '/rest/2.0/face/v2/faceset/user/update';
const USER_DELETE_PATH = '/rest/2.0/face/v2/faceset/user/delete';
const USER_GET_PATH = '/rest/2.0/face/v2/faceset/user/get';
const GROUP_GETLIST_PATH = '/rest/2.0/face/v2/faceset/group/getlist';
const GROUP_GETUSERS_PATH = '/rest/2.0/face/v2/faceset/group/getusers';
const GROUP_ADDUSER_PATH = '/rest/2.0/face/v2/faceset/group/adduser';
const GROUP_DELETEUSER_PATH = '/rest/2.0/face/v2/faceset/group/deleteuser';


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
        let requestInfo = new RequestInfo(apiUrl,
            param, METHOD_POST);
        return this.doRequest(requestInfo, httpClient);
    }

    /**
     * 人脸检测接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   max_face_num 最多处理人脸数目，默认值1
     *   face_fields 包括age,beauty,expression,faceshape,gender,glasses,landmark,race,qualities信息，逗号分隔，默认只返回人脸框、概率和旋转角度
     * @return {Promise} - 标准Promise对象
     */
    detect(image, options) {
        let param = {
            image: image,
            targetPath: DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸比对接口
     *
     * @param {string} images - base64编码后的多张图片数据，半角逗号分隔，单次请求总共最大20M
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   ext_fields 返回质量信息，取值固定:目前支持qualities(质量检测)。(对所有图片都会做改处理)
     *   image_liveness 返回的活体信息，“faceliveness,faceliveness” 表示对比对的两张图片都做活体检测；“,faceliveness” 表示对第一张图片不做活体检测、第二张图做活体检测；“faceliveness,” 表示对第一张图片做活体检测、第二张图不做活体检测；<br>**注：需要用于判断活体的图片，图片中的人脸像素面积需要不小于100px\*100px，人脸长宽与图片长宽比例，不小于1/3**
     *   types 请求对比的两张图片的类型，示例：“7,13”<br>**12**表示带水印证件照：一般为带水印的小图，如公安网小图<br>**7**表示生活照：通常为手机、相机拍摄的人像图片、或从网络获取的人像图片等<br>**13**表示证件照片：如拍摄的身份证、工卡、护照、学生证等证件图片，**注**：需要确保人脸部分不可太小，通常为100px\*100px
     * @return {Promise} - 标准Promise对象
     */
    match(images, options) {
        let param = {
            images: images.join(','),
            targetPath: MATCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸识别接口
     *
     * @param {string} groupId - 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B。如果需要将一个uid注册到多个group下，group\_id需要用多个逗号分隔，每个group_id长度限制为48个英文字符。**注：group无需单独创建，注册用户时则会自动创建group。**<br>**产品建议**：根据您的业务需求，可以将需要注册的用户，按照业务划分，分配到不同的group下，例如按照会员手机尾号作为groupid，用于刷脸支付、会员计费消费等，这样可以尽可能控制每个group下的用户数与人脸数，提升检索的准确率
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   ext_fields 特殊返回信息，多个用逗号分隔，取值固定: 目前支持faceliveness(活体检测)。**注：需要用于判断活体的图片，图片中的人脸像素面积需要不小于100px\*100px，人脸长宽与图片长宽比例，不小于1/3**
     *   user_top_num 返回用户top数，默认为1，最多返回5个
     * @return {Promise} - 标准Promise对象
     */
    identifyUser(groupId, image, options) {
        let param = {
            group_id: groupId,
            image: image,
            targetPath: IDENTIFY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸认证接口
     *
     * @param {string} uid - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} groupId - 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B。如果需要将一个uid注册到多个group下，group\_id需要用多个逗号分隔，每个group_id长度限制为48个英文字符。**注：group无需单独创建，注册用户时则会自动创建group。**<br>**产品建议**：根据您的业务需求，可以将需要注册的用户，按照业务划分，分配到不同的group下，例如按照会员手机尾号作为groupid，用于刷脸支付、会员计费消费等，这样可以尽可能控制每个group下的用户数与人脸数，提升检索的准确率
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回用户top数，默认为1
     *   ext_fields 特殊返回信息，多个用逗号分隔，取值固定: 目前支持faceliveness(活体检测)。**注：需要用于判断活体的图片，图片中的人脸像素面积需要不小于100px\*100px，人脸长宽与图片长宽比例，不小于1/3**
     * @return {Promise} - 标准Promise对象
     */
    verifyUser(uid, groupId, image, options) {
        let param = {
            uid: uid,
            group_id: groupId,
            image: image,
            targetPath: VERIFY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸注册接口
     *
     * @param {string} uid - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} userInfo - 用户资料，长度限制256B
     * @param {string} groupId - 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B。如果需要将一个uid注册到多个group下，group\_id需要用多个逗号分隔，每个group_id长度限制为48个英文字符。**注：group无需单独创建，注册用户时则会自动创建group。**<br>**产品建议**：根据您的业务需求，可以将需要注册的用户，按照业务划分，分配到不同的group下，例如按照会员手机尾号作为groupid，用于刷脸支付、会员计费消费等，这样可以尽可能控制每个group下的用户数与人脸数，提升检索的准确率
     * @param {string} image - 图像base64编码，**每次仅支持单张图片，图片编码后大小不超过10M**。为保证后续识别的效果较佳，建议注册的人脸，为用户正面人脸。
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   action_type 参数包含append、replace。**如果为“replace”，则每次注册时进行替换replace（新增或更新）操作，默认为append操作**。例如：uid在库中已经存在时，对此uid重复注册时，新注册的图片默认会**追加**到该uid下，如果手动选择`action_type:replace`，则会用新图替换库中该uid下所有图片。
     * @return {Promise} - 标准Promise对象
     */
    addUser(uid, userInfo, groupId, image, options) {
        let param = {
            uid: uid,
            user_info: userInfo,
            group_id: groupId,
            image: image,
            targetPath: USER_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸更新接口
     *
     * @param {string} uid - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {string} userInfo - 用户资料，长度限制256B
     * @param {string} groupId - 更新指定groupid下uid对应的信息
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   action_type 目前仅支持replace，uid不存在时，不报错，会自动变为注册操作；未选择该参数时，如果uid不存在会提示错误
     * @return {Promise} - 标准Promise对象
     */
    updateUser(uid, userInfo, groupId, image, options) {
        let param = {
            uid: uid,
            user_info: userInfo,
            group_id: groupId,
            image: image,
            targetPath: USER_UPDATE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 人脸删除接口
     *
     * @param {string} uid - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   group_id 删除指定groupid下uid对应的信息
     * @return {Promise} - 标准Promise对象
     */
    deleteUser(uid, options) {
        let param = {
            uid: uid,
            targetPath: USER_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 用户信息查询接口
     *
     * @param {string} uid - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   group_id 选择指定group_id则只查找group列表下的uid内容，如果不指定则查找所有group下对应uid的信息
     * @return {Promise} - 标准Promise对象
     */
    getUser(uid, options) {
        let param = {
            uid: uid,
            targetPath: USER_GET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 组列表查询接口
     *
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   start 默认值0，起始序号
     *   end 返回数量，默认值100，最大值1000
     * @return {Promise} - 标准Promise对象
     */
    getGrouplist(options) {
        let param = {
            targetPath: GROUP_GETLIST_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 组内用户列表查询接口
     *
     * @param {string} groupId - 用户组id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   start 默认值0，起始序号
     *   end 返回数量，默认值100，最大值1000
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
     * 组间复制用户接口
     *
     * @param {string} srcGroupId - 从指定group里复制信息
     * @param {string} groupId - 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B。如果需要将一个uid注册到多个group下，group\_id需要用多个逗号分隔，每个group_id长度限制为48个英文字符。**注：group无需单独创建，注册用户时则会自动创建group。**<br>**产品建议**：根据您的业务需求，可以将需要注册的用户，按照业务划分，分配到不同的group下，例如按照会员手机尾号作为groupid，用于刷脸支付、会员计费消费等，这样可以尽可能控制每个group下的用户数与人脸数，提升检索的准确率
     * @param {string} uid - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    addGroupUsers(srcGroupId, groupId, uid, options) {
        let param = {
            src_group_id: srcGroupId,
            group_id: groupId,
            uid: uid,
            targetPath: GROUP_ADDUSER_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 组内删除用户接口
     *
     * @param {string} groupId - 用户组id，标识一组用户（由数字、字母、下划线组成），长度限制128B。如果需要将一个uid注册到多个group下，group\_id需要用多个逗号分隔，每个group_id长度限制为48个英文字符。**注：group无需单独创建，注册用户时则会自动创建group。**<br>**产品建议**：根据您的业务需求，可以将需要注册的用户，按照业务划分，分配到不同的group下，例如按照会员手机尾号作为groupid，用于刷脸支付、会员计费消费等，这样可以尽可能控制每个group下的用户数与人脸数，提升检索的准确率
     * @param {string} uid - 用户id（由数字、字母、下划线组成），长度限制128B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    deleteGroupUsers(groupId, uid, options) {
        let param = {
            group_id: groupId,
            uid: uid,
            targetPath: GROUP_DELETEUSER_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}

module.exports = AipFace;

