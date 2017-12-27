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
 * @file AipNlp.js
 * @author baidu aip
 */

const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClient = require('./http/httpClientNlp');

const objectTools = require('./util/objectTools');

const METHOD_POST = 'POST';

const LEXER_PATH = '/rpc/2.0/nlp/v1/lexer';
const LEXER_CUSTOM_PATH = '/rpc/2.0/nlp/v1/lexer_custom';
const DEP_PARSER_PATH = '/rpc/2.0/nlp/v1/depparser';
const WORD_EMBEDDING_PATH = '/rpc/2.0/nlp/v2/word_emb_vec';
const DNNLM_CN_PATH = '/rpc/2.0/nlp/v2/dnnlm_cn';
const WORD_SIM_EMBEDDING_PATH = '/rpc/2.0/nlp/v2/word_emb_sim';
const SIMNET_PATH = '/rpc/2.0/nlp/v2/simnet';
const COMMENT_TAG_PATH = '/rpc/2.0/nlp/v2/comment_tag';
const SENTIMENT_CLASSIFY_PATH = '/rpc/2.0/nlp/v1/sentiment_classify';


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
class AipNlp extends BaseClient {
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
     * 词法分析接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过65536字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    lexer(text, options) {
        let param = {
            text: text,
            targetPath: LEXER_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 词法分析（定制版）接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过65536字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    lexerCustom(text, options) {
        let param = {
            text: text,
            targetPath: LEXER_CUSTOM_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 依存句法分析接口
     *
     * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过256字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   mode 模型选择。默认值为0，可选值mode=0（对应web模型）；mode=1（对应query模型）
     * @return {Promise} - 标准Promise对象
     */
    depparser(text, options) {
        let param = {
            text: text,
            targetPath: DEP_PARSER_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 词向量表示接口
     *
     * @param {string} word - 文本内容（GBK编码），最大64字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    wordembedding(word, options) {
        let param = {
            word: word,
            targetPath: WORD_EMBEDDING_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * DNN语言模型接口
     *
     * @param {string} text - 文本内容（GBK编码），最大512字节，不需要切词
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    dnnlmCn(text, options) {
        let param = {
            text: text,
            targetPath: DNNLM_CN_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

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
    wordSimEmbedding(word1, word2, options) {
        let param = {
            word_1: word1,
            word_2: word2,
            targetPath: WORD_SIM_EMBEDDING_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

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
    simnet(text1, text2, options) {
        let param = {
            text_1: text1,
            text_2: text2,
            targetPath: SIMNET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 评论观点抽取接口
     *
     * @param {string} text - 评论内容（GBK编码），最大10240字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   type 评论行业类型，默认为4（餐饮美食）
     * @return {Promise} - 标准Promise对象
     */
    commentTag(text, options) {
        let param = {
            text: text,
            targetPath: COMMENT_TAG_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }

    /**
     * 情感倾向分析接口
     *
     * @param {string} text - 文本内容（GBK编码），最大102400字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    sentimentClassify(text, options) {
        let param = {
            text: text,
            targetPath: SENTIMENT_CLASSIFY_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}

module.exports = AipNlp;

