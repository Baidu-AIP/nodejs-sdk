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
const BaseClient = require("./client/baseClient");
const RequestInfo = require("./client/requestInfo");
const HttpClient = require("./http/httpClientNlp");
const objectTools = require("./util/objectTools");
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
const KEYWORD_PATH = '/rpc/2.0/nlp/v1/keyword';
const TOPIC_PATH = '/rpc/2.0/nlp/v1/topic';
const ECNET_PATH = '/rpc/2.0/nlp/v1/ecnet';
const EMOTION_PATH = '/rpc/2.0/nlp/v1/emotion';
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
        let requestInfo = new RequestInfo(apiUrl, param, METHOD_POST);
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
    /**
     * 文章标签接口
     *
     * @param {string} title - 篇章的标题，最大80字节
     * @param {string} content - 篇章的正文，最大65535字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    keyword(title, content, options) {
        let param = {
            title: title,
            content: content,
            targetPath: KEYWORD_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 文章分类接口
     *
     * @param {string} title - 篇章的标题，最大80字节
     * @param {string} content - 篇章的正文，最大65535字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    topic(title, content, options) {
        let param = {
            title: title,
            content: content,
            targetPath: TOPIC_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 文本纠错接口
     *
     * @param {string} text - 待纠错文本，输入限制511字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     * @return {Promise} - 标准Promise对象
     */
    ecnet(text, options) {
        let param = {
            text: text,
            targetPath: ECNET_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
    /**
     * 对话情绪识别接口接口
     *
     * @param {string} text - 待识别情感文本，输入限制512字节
     * @param {Object} options - 可选参数对象，key: value都为string类型
     * @description options - options列表:
     *   scene default（默认项-不区分场景），talk（闲聊对话-如度秘聊天等），task（任务型对话-如导航对话等），customer_service（客服对话-如电信/银行客服等）
     * @return {Promise} - 标准Promise对象
     */
    emotion(text, options) {
        let param = {
            text: text,
            targetPath: EMOTION_PATH
        };
        return this.commonImpl(objectTools.merge(param, options));
    }
}
exports.default = AipNlp;
// @ts-ignore
Object.assign(AipNlp, exports);
module.exports = AipNlp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWlwTmxwLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvQWlwTmxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUNiOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBRUgsa0RBQW1EO0FBRW5ELG9EQUFxRDtBQUVyRCxtREFBb0Q7QUFFcEQsa0RBQW1EO0FBRW5ELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUUzQixNQUFNLFVBQVUsR0FBRyx1QkFBdUIsQ0FBQztBQUMzQyxNQUFNLGlCQUFpQixHQUFHLDhCQUE4QixDQUFDO0FBQ3pELE1BQU0sZUFBZSxHQUFHLDJCQUEyQixDQUFDO0FBQ3BELE1BQU0sbUJBQW1CLEdBQUcsOEJBQThCLENBQUM7QUFDM0QsTUFBTSxhQUFhLEdBQUcsMEJBQTBCLENBQUM7QUFDakQsTUFBTSx1QkFBdUIsR0FBRyw4QkFBOEIsQ0FBQztBQUMvRCxNQUFNLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQztBQUM3QyxNQUFNLGdCQUFnQixHQUFHLDZCQUE2QixDQUFDO0FBQ3ZELE1BQU0sdUJBQXVCLEdBQUcsb0NBQW9DLENBQUM7QUFDckUsTUFBTSxZQUFZLEdBQUcseUJBQXlCLENBQUM7QUFDL0MsTUFBTSxVQUFVLEdBQUcsdUJBQXVCLENBQUM7QUFDM0MsTUFBTSxVQUFVLEdBQUcsdUJBQXVCLENBQUM7QUFDM0MsTUFBTSxZQUFZLEdBQUcseUJBQXlCLENBQUM7QUFHL0M7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxNQUFPLFNBQVEsVUFBVTtJQUMzQixZQUFZLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUNyQixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQUs7UUFDWixJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ2xDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENB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O1lBQ1YsVUFBVSxFQUFFLFVBQVU7U0FDekIsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTztRQUNqQixJQUFJLEtBQUssR0FBRztZQUNSLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLFlBQVk7U0FDM0IsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDSjtBQUVELGtCQUFlLE1BQU0sQ0FBQTtBQUVyQixhQUFhO0FBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFHL0IsaUJBQVMsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgQmFpZHUuY29tLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWRcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGhcbiAqIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uXG4gKiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuICogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKiBAZmlsZSBBaXBObHAuanNcbiAqIEBhdXRob3IgYmFpZHUgYWlwXG4gKi9cblxuaW1wb3J0IEJhc2VDbGllbnQgPSByZXF1aXJlKCcuL2NsaWVudC9iYXNlQ2xpZW50Jyk7XG5cbmltcG9ydCBSZXF1ZXN0SW5mbyA9IHJlcXVpcmUoJy4vY2xpZW50L3JlcXVlc3RJbmZvJyk7XG5cbmltcG9ydCBIdHRwQ2xpZW50ID0gcmVxdWlyZSgnLi9odHRwL2h0dHBDbGllbnRObHAnKTtcblxuaW1wb3J0IG9iamVjdFRvb2xzID0gcmVxdWlyZSgnLi91dGlsL29iamVjdFRvb2xzJyk7XG5cbmNvbnN0IE1FVEhPRF9QT1NUID0gJ1BPU1QnO1xuXG5jb25zdCBMRVhFUl9QQVRIID0gJy9ycGMvMi4wL25scC92MS9sZXhlcic7XG5jb25zdCBMRVhFUl9DVVNUT01fUEFUSCA9ICcvcnBjLzIuMC9ubHAvdjEvbGV4ZXJfY3VzdG9tJztcbmNvbnN0IERFUF9QQVJTRVJfUEFUSCA9ICcvcnBjLzIuMC9ubHAvdjEvZGVwcGFyc2VyJztcbmNvbnN0IFdPUkRfRU1CRURESU5HX1BBVEggPSAnL3JwYy8yLjAvbmxwL3YyL3dvcmRfZW1iX3ZlYyc7XG5jb25zdCBETk5MTV9DTl9QQVRIID0gJy9ycGMvMi4wL25scC92Mi9kbm5sbV9jbic7XG5jb25zdCBXT1JEX1NJTV9FTUJFRERJTkdfUEFUSCA9ICcvcnBjLzIuMC9ubHAvdjIvd29yZF9lbWJfc2ltJztcbmNvbnN0IFNJTU5FVF9QQVRIID0gJy9ycGMvMi4wL25scC92Mi9zaW1uZXQnO1xuY29uc3QgQ09NTUVOVF9UQUdfUEFUSCA9ICcvcnBjLzIuMC9ubHAvdjIvY29tbWVudF90YWcnO1xuY29uc3QgU0VOVElNRU5UX0NMQVNTSUZZX1BBVEggPSAnL3JwYy8yLjAvbmxwL3YxL3NlbnRpbWVudF9jbGFzc2lmeSc7XG5jb25zdCBLRVlXT1JEX1BBVEggPSAnL3JwYy8yLjAvbmxwL3YxL2tleXdvcmQnO1xuY29uc3QgVE9QSUNfUEFUSCA9ICcvcnBjLzIuMC9ubHAvdjEvdG9waWMnO1xuY29uc3QgRUNORVRfUEFUSCA9ICcvcnBjLzIuMC9ubHAvdjEvZWNuZXQnO1xuY29uc3QgRU1PVElPTl9QQVRIID0gJy9ycGMvMi4wL25scC92MS9lbW90aW9uJztcblxuXG4vKipcbiAqIEFpcE5scOexu1xuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgQmFzZUNsaWVudFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwaWQgYXBwaWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gYWsgIGFjY2VzcyBrZXkuXG4gKiBAcGFyYW0ge3N0cmluZ30gc2sgIHNlY3VyaXR5IGtleS5cbiAqL1xuY2xhc3MgQWlwTmxwIGV4dGVuZHMgQmFzZUNsaWVudCB7XG4gICAgY29uc3RydWN0b3IoYXBwSWQsIGFrLCBzaykge1xuICAgICAgICBzdXBlcihhcHBJZCwgYWssIHNrKTtcbiAgICB9XG4gICAgY29tbW9uSW1wbChwYXJhbSkge1xuICAgICAgICBsZXQgaHR0cENsaWVudCA9IG5ldyBIdHRwQ2xpZW50KCk7XG4gICAgICAgIGxldCBhcGlVcmwgPSBwYXJhbS50YXJnZXRQYXRoO1xuICAgICAgICBkZWxldGUgcGFyYW0udGFyZ2V0UGF0aDtcbiAgICAgICAgbGV0IHJlcXVlc3RJbmZvID0gbmV3IFJlcXVlc3RJbmZvKGFwaVVybCxcbiAgICAgICAgICAgIHBhcmFtLCBNRVRIT0RfUE9TVCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRvUmVxdWVzdChyZXF1ZXN0SW5mbywgaHR0cENsaWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K+N5rOV5YiG5p6Q5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIOW+heWIhuaekOaWh+acrO+8iOebruWJjeS7heaUr+aMgUdCS+e8luegge+8ie+8jOmVv+W6puS4jei2hei/hzY1NTM25a2X6IqCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGxleGVyKHRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IExFWEVSX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOivjeazleWIhuaekO+8iOWumuWItueJiO+8ieaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSDlvoXliIbmnpDmlofmnKzvvIjnm67liY3ku4XmlK/mjIFHQkvnvJbnoIHvvInvvIzplb/luqbkuI3otoXov4c2NTUzNuWtl+iKglxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBsZXhlckN1c3RvbSh0ZXh0LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHtcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBMRVhFUl9DVVNUT01fUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L6d5a2Y5Y+l5rOV5YiG5p6Q5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIOW+heWIhuaekOaWh+acrO+8iOebruWJjeS7heaUr+aMgUdCS+e8luegge+8ie+8jOmVv+W6puS4jei2hei/hzI1NuWtl+iKglxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIG1vZGUg5qih5Z6L6YCJ5oup44CC6buY6K6k5YC85Li6MO+8jOWPr+mAieWAvG1vZGU9MO+8iOWvueW6lHdlYuaooeWei++8ie+8m21vZGU9Me+8iOWvueW6lHF1ZXJ55qih5Z6L77yJXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZGVwcGFyc2VyKHRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IERFUF9QQVJTRVJfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K+N5ZCR6YeP6KGo56S65o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gd29yZCAtIOaWh+acrOWGheWuue+8iEdCS+e8luegge+8ie+8jOacgOWkpzY05a2X6IqCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIHdvcmRlbWJlZGRpbmcod29yZCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB3b3JkOiB3b3JkLFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogV09SRF9FTUJFRERJTkdfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRE5O6K+t6KiA5qih5Z6L5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIOaWh+acrOWGheWuue+8iEdCS+e8luegge+8ie+8jOacgOWkpzUxMuWtl+iKgu+8jOS4jemcgOimgeWIh+ivjVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBkbm5sbUNuKHRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEROTkxNX0NOX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOivjeS5ieebuOS8vOW6puaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmQxIC0g6K+NMe+8iEdCS+e8luegge+8ie+8jOacgOWkpzY05a2X6IqCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmQyIC0g6K+NMe+8iEdCS+e8luegge+8ie+8jOacgOWkpzY05a2X6IqCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqICAgbW9kZSDpooTnlZnlrZfmrrXvvIzlj6/pgInmi6nkuI3lkIznmoTor43kuYnnm7jkvLzluqbmqKHlnovjgILpu5jorqTlgLzkuLow77yM55uu5YmN5LuF5pSv5oyBbW9kZT0wXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgd29yZFNpbUVtYmVkZGluZyh3b3JkMSwgd29yZDIsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgd29yZF8xOiB3b3JkMSxcbiAgICAgICAgICAgIHdvcmRfMjogd29yZDIsXG4gICAgICAgICAgICB0YXJnZXRQYXRoOiBXT1JEX1NJTV9FTUJFRERJTkdfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog55+t5paH5pys55u45Ly85bqm5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgLSDlvoXmr5TovoPmlofmnKwx77yIR0JL57yW56CB77yJ77yM5pyA5aSnNTEy5a2X6IqCXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIC0g5b6F5q+U6L6D5paH5pysMu+8iEdCS+e8luegge+8ie+8jOacgOWkpzUxMuWtl+iKglxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIG1vZGVsIOm7mOiupOS4ulwiQk9XXCLvvIzlj6/pgIlcIkJPV1wi44CBXCJDTk5cIuS4jlwiR1JOTlwiXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgc2ltbmV0KHRleHQxLCB0ZXh0Miwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB0ZXh0XzE6IHRleHQxLFxuICAgICAgICAgICAgdGV4dF8yOiB0ZXh0MixcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFNJTU5FVF9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDor4Torrrop4Lngrnmir3lj5bmjqXlj6NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0g6K+E6K665YaF5a6577yIR0JL57yW56CB77yJ77yM5pyA5aSnMTAyNDDlrZfoioJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogICB0eXBlIOivhOiuuuihjOS4muexu+Wei++8jOm7mOiupOS4ujTvvIjppJDppa7nvo7po5/vvIlcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIOagh+WHhlByb21pc2Xlr7nosaFcbiAgICAgKi9cbiAgICBjb21tZW50VGFnKHRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IENPTU1FTlRfVEFHX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaDheaEn+WAvuWQkeWIhuaekOaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSDmlofmnKzlhoXlrrnvvIhHQkvnvJbnoIHvvInvvIzmnIDlpKcxMDI0MDDlrZfoioJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgc2VudGltZW50Q2xhc3NpZnkodGV4dCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogU0VOVElNRU5UX0NMQVNTSUZZX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaWh+eroOagh+etvuaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlIC0g56+H56ug55qE5qCH6aKY77yM5pyA5aSnODDlrZfoioJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCAtIOevh+eroOeahOato+aWh++8jOacgOWkpzY1NTM15a2X6IqCXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSDlj6/pgInlj4LmlbDlr7nosaHvvIxrZXk6IHZhbHVl6YO95Li6c3RyaW5n57G75Z6LXG4gICAgICogQGRlc2NyaXB0aW9uIG9wdGlvbnMgLSBvcHRpb25z5YiX6KGoOlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGtleXdvcmQodGl0bGUsIGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IEtFWVdPUkRfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5paH56ug5YiG57G75o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgLSDnr4fnq6DnmoTmoIfpopjvvIzmnIDlpKc4MOWtl+iKglxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IC0g56+H56ug55qE5q2j5paH77yM5pyA5aSnNjU1MzXlrZfoioJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgdG9waWModGl0bGUsIGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIHRhcmdldFBhdGg6IFRPUElDX1BBVEhcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbW9uSW1wbChvYmplY3RUb29scy5tZXJnZShwYXJhbSwgb3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaWh+acrOe6oOmUmeaOpeWPo1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSDlvoXnuqDplJnmlofmnKzvvIzovpPlhaXpmZDliLY1MTHlrZfoioJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIOWPr+mAieWPguaVsOWvueixoe+8jGtleTogdmFsdWXpg73kuLpzdHJpbmfnsbvlnotcbiAgICAgKiBAZGVzY3JpcHRpb24gb3B0aW9ucyAtIG9wdGlvbnPliJfooag6XG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gLSDmoIflh4ZQcm9taXNl5a+56LGhXG4gICAgICovXG4gICAgZWNuZXQodGV4dCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogRUNORVRfUEFUSFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5jb21tb25JbXBsKG9iamVjdFRvb2xzLm1lcmdlKHBhcmFtLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5a+56K+d5oOF57uq6K+G5Yir5o6l5Y+j5o6l5Y+jXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIOW+heivhuWIq+aDheaEn+aWh+acrO+8jOi+k+WFpemZkOWItjUxMuWtl+iKglxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0g5Y+v6YCJ5Y+C5pWw5a+56LGh77yMa2V5OiB2YWx1ZemDveS4unN0cmluZ+exu+Wei1xuICAgICAqIEBkZXNjcmlwdGlvbiBvcHRpb25zIC0gb3B0aW9uc+WIl+ihqDpcbiAgICAgKiAgIHNjZW5lIGRlZmF1bHTvvIjpu5jorqTpobkt5LiN5Yy65YiG5Zy65pmv77yJ77yMdGFsa++8iOmXsuiBiuWvueivnS3lpoLluqbnp5jogYrlpKnnrYnvvInvvIx0YXNr77yI5Lu75Yqh5Z6L5a+56K+dLeWmguWvvOiIquWvueivneetie+8ie+8jGN1c3RvbWVyX3NlcnZpY2XvvIjlrqLmnI3lr7nor50t5aaC55S15L+hL+mTtuihjOWuouacjeetie+8iVxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0g5qCH5YeGUHJvbWlzZeWvueixoVxuICAgICAqL1xuICAgIGVtb3Rpb24odGV4dCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgcGFyYW0gPSB7XG4gICAgICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICAgICAgdGFyZ2V0UGF0aDogRU1PVElPTl9QQVRIXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1vbkltcGwob2JqZWN0VG9vbHMubWVyZ2UocGFyYW0sIG9wdGlvbnMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFpcE5scFxuXG4vLyBAdHMtaWdub3JlXG5PYmplY3QuYXNzaWduKEFpcE5scCwgZXhwb3J0cyk7XG4vLyBAdHMtaWdub3JlXG5cbmV4cG9ydCA9IEFpcE5scDtcblxuIl19