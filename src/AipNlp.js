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
 * @file AipNlp
 * @author baiduAip
 */
const BaseClient = require('./client/baseClient');

const RequestInfo = require('./client/requestInfo');

const HttpClientNlp = require('./http/httpClientNlp');

const objectTools = require('./util/objectTools');

const EventPromise = require('./util/eventPromise');

const METHOD_POST = 'POST';

const PATH_NLP_DNNLM_CN = '/rpc/2.0/nlp/v2/dnnlm_cn';
const PATH_NLP_COMMENT_TAG = '/rpc/2.0/nlp/v2/comment_tag';
const PATH_NLP_WORDSEG = '/rpc/2.0/nlp/v1/wordseg';
const PATH_NLP_WORDPOS = '/rpc/2.0/nlp/v1/wordpos';
const PATH_NLP_SIMNET  = '/rpc/2.0/nlp/v2/simnet';
const PATH_NLP_WORDEMBEDDINGVEC  = '/rpc/2.0/nlp/v2/word_emb_vec';
const PATH_NLP_WORDEMBEDDINGSIM  = '/rpc/2.0/nlp/v2/word_emb_sim';
const PATH_NLP_SENTIMENT_CLASSIFY  = '/rpc/2.0/nlp/v1/sentiment_classify';
const PATH_NLP_LEXER  = '/rpc/2.0/nlp/v1/lexer';
const PATH_NLP_DEPPARSER  = '/rpc/2.0/nlp/v1/depparser';

const scope = require('./const/devScope').DEFAULT;

/**
 * AipNlp类，构造调用自然语言识别对象
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
        let promise = new EventPromise();
        let httpClient = new HttpClientNlp();
        let apiUrl = param.targetPath;
        delete param.targetPath;
        let requestInfo = new RequestInfo(apiUrl,
            scope, param, METHOD_POST);

        if (this.preRequest(requestInfo)) {
            httpClient.postWithInfo(requestInfo).on(HttpClientNlp.EVENT_DATA, function (data) {
                promise.resolve(data);
            }.bind(this)).bindErrorEvent(promise);
        } else {
            return this.registTask(this.commonImpl, param);
        }
        return promise;
    }
    dnnlmCn(text) {
        let param = {
            text: text,
            targetPath: PATH_NLP_DNNLM_CN
        };
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    wordseg(query) {
        let param = {
            query: query,
            targetPath: PATH_NLP_WORDSEG
        };
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    wordpos(query) {
        let param = {
            query: query,
            targetPath: PATH_NLP_WORDPOS
        };
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    commentTag(text, type) {
        let param = {
            text: text,
            type: type.toString(),
            targetPath: PATH_NLP_COMMENT_TAG
        };
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    simnet(query1, query2, options) {
        let param = {
            text_1: query1,
            text_2: query2,
            targetPath: PATH_NLP_SENTIMENT_CLASSIFY
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    wordembedding(word, options) {
        let param = {
            word: word,
            targetPath: PATH_NLP_WORDEMBEDDINGVEC
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
    wordSimEmbedding(word1, word2) {
        let param = {
            word_1: word1,
            word_2: word2,
            targetPath: PATH_NLP_WORDEMBEDDINGSIM
        };
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    sentimentClassify(text) {
        let param = {
            text: text,
            targetPath: PATH_NLP_SENTIMENT_CLASSIFY
        };
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    lexer(text) {
        let param = {
            text: text,
            targetPath: PATH_NLP_LEXER
        };
        let promise = this.registTask(this.commonImpl, param);
        return promise;
    }
    depparser(text, options) {
        let param = {
            text: text,
            targetPath: PATH_NLP_DEPPARSER
        };
        let promise = this.registTask(this.commonImpl, objectTools.merge(param, options));
        return promise;
    }
}

module.exports = AipNlp;
