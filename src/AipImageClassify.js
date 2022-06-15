'use strict';
/**
 * Copyright (c) 2017 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file AipImageClassify.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClient');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const ADVANCED_GENERAL_PATH = '/rest/2.0/image-classify/v2/advanced_general';
const DISH_DETECT_PATH = '/rest/2.0/image-classify/v2/dish';
const CAR_DETECT_PATH = '/rest/2.0/image-classify/v1/car';
const LOGO_SEARCH_PATH = '/rest/2.0/image-classify/v2/logo';
const LOGO_ADD_PATH = '/rest/2.0/realtime_search/v1/logo/add';
const LOGO_DELETE_PATH = '/rest/2.0/realtime_search/v1/logo/delete';
const ANIMAL_DETECT_PATH = '/rest/2.0/image-classify/v1/animal';
const PLANT_DETECT_PATH = '/rest/2.0/image-classify/v1/plant';
const OBJECT_DETECT_PATH = '/rest/2.0/image-classify/v1/object_detect';


const CUSTOM_DISH_ADD_PATH = '/rest/2.0/image-classify/v1/realtime_search/dish/add';
const CUSTOM_DISH_SEARCH_PATH = '/rest/2.0/image-classify/v1/realtime_search/dish/search';
const CUSTOM_DISH_DELETE_PATH = '/rest/2.0/image-classify/v1/realtime_search/dish/delete';
const MULTI_OBJECT_DETECT_PATH = '/rest/2.0/image-classify/v1/multi_object_detect';
const COMBINATION_PATH = '/api/v1/solution/direct/imagerecognition/combination';
const VEHICLE_ATTR_PATH = '/rest/2.0/image-classify/v1/vehicle_attr';
const VEHICLE_DETECT_HIGH_PATH = '/rest/2.0/image-classify/v1/vehicle_detect_high';
const VEHICLE_SEG_PATH = '/rest/2.0/image-classify/v1/vehicle_seg';
const VEHICLE_DAMAGE_PATH = '/rest/2.0/image-classify/v1/vehicle_damage';
const TRAFFIC_FLOW_PATH = '/rest/2.0/image-classify/v1/traffic_flow';



/**
 * AipImageClassify类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
class AipImageClassify extends BaseClient {
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
     * 通用物体识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    advancedGeneral(image, options) {
        let param = {
            image: image,
            targetPath: ADVANCED_GENERAL_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 菜品识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {Promise} - 标准Promise对象
     */
    dishDetect(image, options) {
        let param = {
            image: image,
            targetPath: DISH_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为5
     * @return {Promise} - 标准Promise对象
     */
    carDetect(image, options) {
        let param = {
            image: image,
            targetPath: CAR_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   custom_lib 是否只使用自定义logo库的结果，默认false：返回自定义库+默认库的识别结果
     * @return {Promise} - 标准Promise对象
     */
    logoSearch(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别—添加接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} brief - brief，检索时带回。此处要传对应的name与code字段，name长度小于100B，code长度小于150B
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoAdd(image, brief, options) {
        let param = {
            image: image,
            brief: brief,
            targetPath: LOGO_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别—删除接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoDeleteByImage(image, options) {
        let param = {
            image: image,
            targetPath: LOGO_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * logo商标识别—删除接口
     *
     * @param {string} contSign - 图片签名（和image二选一，image优先级更高）
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    logoDeleteBySign(contSign, options) {
        let param = {
            cont_sign: contSign,
            targetPath: LOGO_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 动物识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回预测得分top结果数，默认为6
     * @return {Promise} - 标准Promise对象
     */
    animalDetect(image, options) {
        let param = {
            image: image,
            targetPath: ANIMAL_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 植物识别接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    plantDetect(image, options) {
        let param = {
            image: image,
            targetPath: PLANT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 图像主体检测接口
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   with_face 如果检测主体是人，主体区域是否带上人脸部分，0-不带人脸区域，其他-带人脸区域，裁剪类需求推荐带人脸，检索/识别类需求推荐不带人脸。默认取1，带人脸。
     * @return {Promise} - 标准Promise对象
     */
    objectDetect(image, options) {
        let param = {
            image: image,
            targetPath: OBJECT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }





    /**
     * 自定义菜品识别—入库
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {string} brief - 简介
     * @param {Object} options - 可选参数对象，key: value都为string类型
        * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesAddImage(image, brief, options) {
        let param = {
            image: image,
            brief: brief,
            targetPath: CUSTOM_DISH_ADD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    /**
     * 自定义菜品识别—检索
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesSearch(image, options) {
        let param = {
            image: image,
            targetPath: CUSTOM_DISH_SEARCH_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 自定义菜品识别—删除
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesDeleteImage(image, options) {
        let param = {
            image: image,
            targetPath: CUSTOM_DISH_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 自定义菜品识别—删除
     *
     * @param {string} cont_sign - 图片签名
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    customDishesDeleteContSign(cont_sign, options) {
        let param = {
            cont_sign: cont_sign,
            targetPath: CUSTOM_DISH_DELETE_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    /**
     * 图像多主体检测
     *
     * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    multiObjectDetect(image, options) {
        let param = {
            image: image,
            targetPath: MULTI_OBJECT_DETECT_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }


    // /**
    //  * 组合接口-image
    //  *
    //  * @param {string} image - 图像数据，base64编码，要求base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式
    //  * @param {Object} options - 可选参数对象，key: value都为string类型
    //  * @description options - options列表:
    //  * @return {Promise} - 标准Promise对象
    //  */
    // combinationByImage(image, options) {
    //     let param = {
    //         image: image,
    //         scenes: scenes,
    //         targetPath: COMBINATION_PATH
    //     };
    //     return this.commonImpl(objectTools.merge(param, options));
    // }
    //
    // /**
    //  * 组合接口-imageUrl
    //  *
    //  * @param {string} imgUrl - 图片地址
    //  * @param {[]} scenes - 场景
    //  * @param {Object} options - 可选参数对象，key: value都为string类型
    //  * @description options - options列表:
    //  * @return {Promise} - 标准Promise对象
    //  */
    // combinationByImageUrl(imgUrl, scenes, options) {
    //     let param = {
    //         imgUrl: imgUrl,
    //         scenes: scenes,
    //         targetPath: COMBINATION_PATH
    //     };
    //     return this.commonImpl(objectTools.merge(param, options));
    // }
    /**
     * 车辆属性识别
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type 是否选定某些属性输出对应的信息，可从12种输出属性中任选若干，用英文逗号分隔（例如vehicle_type,roof_rack,skylight）。默认输出全部属性
     * @return {Promise} - 标准Promise对象
     */
    vehicleAttr(image, options) {

        let param = {};
        param.image = image;
        param.targetPath = VEHICLE_ATTR_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆属性识别
     *
     * @param {string} url - 图片完整URL
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type 是否选定某些属性输出对应的信息，可从12种输出属性中任选若干，用英文逗号分隔（例如vehicle_type,roof_rack,skylight）。默认输出全部属性
     * @return {Promise} - 标准Promise对象
     */
    vehicleAttrUrl(url, options) {

        let param = {};
        param.url = url;
        param.targetPath = VEHICLE_ATTR_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆检测-高空版
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   area 只统计该矩形区域内的车辆数，缺省时为全图统计。逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，按顺序依次给出每个顶点的x、y坐标（默认尾点和首点相连），形成闭合矩形区域。
     * @return {Promise} - 标准Promise对象
     */
    vehicleDetectHigh(image, options) {

        let param = {};
        param.image = image;
        param.targetPath = VEHICLE_DETECT_HIGH_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆检测-高空版
     *
     * @param {string} url - 图片完整URL
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   area 只统计该矩形区域内的车辆数，缺省时为全图统计。逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，按顺序依次给出每个顶点的x、y坐标（默认尾点和首点相连），形成闭合矩形区域。
     * @return {Promise} - 标准Promise对象
     */
    vehicleDetectHighUrl(url, options) {

        let param = {};
        param.url = url;
        param.targetPath = VEHICLE_DETECT_HIGH_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车型识别
     *
     * @param {string} url - 图片完整URL
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   top_num 返回结果top n，默认5。e
     *   baike_num 返回百科信息的结果数，默认不返回
     * @return {Promise} - 标准Promise对象
     */
    carDetectUrl(url, options) {

        let param = {};
        param.url = url;
        param.targetPath = CAR_DETECT_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆检测
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   area 只统计该矩形区域内的车辆数，缺省时为全图统计。逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，按顺序依次给出每个顶点的x、y坐标（默认尾点和首点相连），形成闭合矩形区域。
     * @return {Promise} - 标准Promise对象
     */
    vehicleDetect(image, options) {

        let param = {};
        param.image = image;
        param.targetPath = VEHICLE_DETECT_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆检测
     *
     * @param {string} url - 图片完整URL
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   area 只统计该矩形区域内的车辆数，缺省时为全图统计。逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，按顺序依次给出每个顶点的x、y坐标（默认尾点和首点相连），形成闭合矩形区域。
     * @return {Promise} - 标准Promise对象
     */
    vehicleDetectUrl(url, options) {

        let param = {};
        param.url = url;
        param.targetPath = VEHICLE_DETECT_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆分割
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type 可以通过设置type参数，自主设置返回哪些结果图，避免造成带宽的浪费。1）可选值说明：labelmap - 二值图像，需二次处理方能查看分割效果scoremap - 车辆前景灰度图2）type 参数值可以是可选值的组合，用逗号分隔；如果无此参数默认输出全部3类结果图
     * @return {Promise} - 标准Promise对象
     */
    vehicleSeg(image, options) {

        let param = {};
        param.image = image;
        param.targetPath = VEHICLE_SEG_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车辆外观损伤识别
     *
     * @param {string} image - 二进制图像数据
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    vehicleDamage(image, options) {

        let param = {};
        param.image = image;
        param.targetPath = VEHICLE_DAMAGE_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车流统计
     *
     * @param {string} image - 二进制图像数据
     * @param {string} case_id - 任务ID（通过case_id区分不同视频流，自拟，不同序列间不可重复）
     * @param {string} case_init - 每个case的初始化信号，为true时对该case下的跟踪算法进行初始化，为false时重载该case的跟踪状态。当为false且读取不到相应case的信息时，直接重新初始化
     * @param {string} area - 只统计进出该区域的车辆。逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，按顺序依次给出每个顶点的x、y坐标（默认尾点和首点相连），形成闭合多边形区域。
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   show 是否返回结果图（含统计值和跟踪框）。选true时返回渲染后的图片(base64)，其它无效值或为空则默认false。
     * @return {Promise} - 标准Promise对象
     */
    trafficFlow(image, case_id, case_init, area, options) {

        let param = {};
        param.image = image;
        param.case_id = case_id;
        param.case_init = case_init;
        param.area = area;
        param.targetPath = TRAFFIC_FLOW_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 车流统计
     *
     * @param {string} url - 图片完整URL
     * @param {string} case_id - 任务ID（通过case_id区分不同视频流，自拟，不同序列间不可重复）
     * @param {string} case_init - 每个case的初始化信号，为true时对该case下的跟踪算法进行初始化，为false时重载该case的跟踪状态。当为false且读取不到相应case的信息时，直接重新初始化
     * @param {string} area - 只统计进出该区域的车辆。逗号分隔，如‘x1,y1,x2,y2,x3,y3...xn,yn'，按顺序依次给出每个顶点的x、y坐标（默认尾点和首点相连），形成闭合多边形区域。
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   show 是否返回结果图（含统计值和跟踪框）。选true时返回渲染后的图片(base64)，其它无效值或为空则默认false。
     * @return {Promise} - 标准Promise对象
     */
    trafficFlowUrl(url, case_id, case_init, area, options) {

        let param = {};
        param.url = url;
        param.case_id = case_id;
        param.case_init = case_init;
        param.area = area;
        param.targetPath = TRAFFIC_FLOW_PATH;
        return this.commonImpl(objectTools.merge(param, options));
    }

}

module.exports = AipImageClassify;

