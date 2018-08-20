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
 * @file AipNlp.js
 * @author baidu aip
 */
import BaseClient = require('./client/baseClient');
/**
 * AipNlp类
 *
 * @class
 * @extends BaseClient
 * @constructor
 * @param {string} appid appid.
 * @param {string} ak  access key.
 * @param {string} sk  security key.
 */
declare class AipNlp extends BaseClient {
    constructor(appId: any, ak: any, sk: any);
    commonImpl(param: any): Promise<{}>;
    /**
     * 词法分析接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过65536字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    lexer(text: any, options: any): Promise<{}>;
    /**
     * 词法分析（定制版）接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过65536字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    lexerCustom(text: any, options: any): Promise<{}>;
    /**
     * 依存句法分析接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过256字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   mode 模型选择。默认值为0，可选值mode=0（对应web模型）；mode=1（对应query模型）
     * @return {Promise} - 标准Promise对象
     */
    depparser(text: any, options: any): Promise<{}>;
    /**
     * 词向量表示接口
     *
     * @param {string} word - 文本内容（GBK编码），最大64字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    wordembedding(word: any, options: any): Promise<{}>;
    /**
     * DNN语言模型接口
     *
     * @param {string} text - 文本内容（GBK编码），最大512字节，不需要切词
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    dnnlmCn(text: any, options: any): Promise<{}>;
    /**
     * 词义相似度接口
     *
     * @param {string} word1 - 词1（GBK编码），最大64字节
     * @param {string} word2 - 词1（GBK编码），最大64字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   mode 预留字段，可选择不同的词义相似度模型。默认值为0，目前仅支持mode=0
     * @return {Promise} - 标准Promise对象
     */
    wordSimEmbedding(word1: any, word2: any, options: any): Promise<{}>;
    /**
     * 短文本相似度接口
     *
     * @param {string} text1 - 待比较文本1（GBK编码），最大512字节
     * @param {string} text2 - 待比较文本2（GBK编码），最大512字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   model 默认为"BOW"，可选"BOW"、"CNN"与"GRNN"
     * @return {Promise} - 标准Promise对象
     */
    simnet(text1: any, text2: any, options: any): Promise<{}>;
    /**
     * 评论观点抽取接口
     *
     * @param {string} text - 评论内容（GBK编码），最大10240字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type 评论行业类型，默认为4（餐饮美食）
     * @return {Promise} - 标准Promise对象
     */
    commentTag(text: any, options: any): Promise<{}>;
    /**
     * 情感倾向分析接口
     *
     * @param {string} text - 文本内容（GBK编码），最大102400字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    sentimentClassify(text: any, options: any): Promise<{}>;
    /**
     * 文章标签接口
     *
     * @param {string} title - 篇章的标题，最大80字节
     * @param {string} content - 篇章的正文，最大65535字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    keyword(title: any, content: any, options: any): Promise<{}>;
    /**
     * 文章分类接口
     *
     * @param {string} title - 篇章的标题，最大80字节
     * @param {string} content - 篇章的正文，最大65535字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    topic(title: any, content: any, options: any): Promise<{}>;
    /**
     * 文本纠错接口
     *
     * @param {string} text - 待纠错文本，输入限制511字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    ecnet(text: any, options: any): Promise<{}>;
    /**
     * 对话情绪识别接口接口
     *
     * @param {string} text - 待识别情感文本，输入限制512字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   scene default（默认项-不区分场景），talk（闲聊对话-如度秘聊天等），task（任务型对话-如导航对话等），customer_service（客服对话-如电信/银行客服等）
     * @return {Promise} - 标准Promise对象
     */
    emotion(text: any, options: any): Promise<{}>;
}
export default AipNlp;
export = AipNlp;
