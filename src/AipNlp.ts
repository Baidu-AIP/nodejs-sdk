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

import BaseClient from './client/baseClient';
import RequestInfo from './client/requestInfo';
import HttpClient from './http/httpClientNlp';
import { merge } from './util/objectTools';

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
const NEWS_SUMMARY_PATH = '/rpc/2.0/nlp/v1/news_summary';


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
export default class AipNlp extends BaseClient {
	constructor(appId: string, ak: string, sk: string) {
		super(appId, ak, sk);
	}
	private commonImpl(param: any) {
		const httpClient = new HttpClient();
		const apiUrl = param.targetPath;
		delete param.targetPath;
		const requestInfo = new RequestInfo(apiUrl,
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
	public lexer(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: LEXER_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 词法分析（定制版）接口
	 *
	 * @param {string} text - 待分析文本（目前仅支持GBK编码），长度不超过65536字节
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public lexerCustom(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: LEXER_CUSTOM_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public depparser(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: DEP_PARSER_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 词向量表示接口
	 *
	 * @param {string} word - 文本内容（GBK编码），最大64字节
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public wordembedding(word: string, options: { [key: string]: string; }) {
		const param = {
			word,
			targetPath: WORD_EMBEDDING_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * DNN语言模型接口
	 *
	 * @param {string} text - 文本内容（GBK编码），最大512字节，不需要切词
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public dnnlmCn(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: DNNLM_CN_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public wordSimEmbedding(word1: string, word2: string, options: { [key: string]: string; }) {
		const param = {
			word_1: word1,
			word_2: word2,
			targetPath: WORD_SIM_EMBEDDING_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public simnet(text1: string, text2: string, options: { [key: string]: string; }) {
		const param = {
			text_1: text1,
			text_2: text2,
			targetPath: SIMNET_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public commentTag(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: COMMENT_TAG_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 情感倾向分析接口
	 *
	 * @param {string} text - 文本内容（GBK编码），最大102400字节
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public sentimentClassify(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: SENTIMENT_CLASSIFY_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public keyword(title: string, content: string, options: { [key: string]: string; }) {
		const param = {
			title,
			content,
			targetPath: KEYWORD_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public topic(title: string, content: string, options: { [key: string]: string; }) {
		const param = {
			title,
			content,
			targetPath: TOPIC_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 文本纠错接口
	 *
	 * @param {string} text - 待纠错文本，输入限制511字节
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 * @return {Promise} - 标准Promise对象
	 */
	public ecnet(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: ECNET_PATH
		};
		return this.commonImpl(merge(param, options));
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
	public emotion(text: string, options: { [key: string]: string; }) {
		const param = {
			text,
			targetPath: EMOTION_PATH
		};
		return this.commonImpl(merge(param, options));
	}

	/**
	 * 新闻摘要接口接口
	 *
	 * @param {string} content - 字符串（限3000字符数以内）字符串仅支持GBK编码，长度需小于3000字符数（即6000字节），请输入前确认字符数没有超限，若字符数超长会返回错误。正文中如果包含段落信息，请使用"\n"分隔，段落信息算法中有重要的作用，请尽量保留
	 * @param {integer} maxSummaryLen - 此数值将作为摘要结果的最大长度。例如：原文长度1000字，本参数设置为150，则摘要结果的最大长度是150字；推荐最优区间：200-500字
	 * @param {Object} options - 可选参数对象，key: value都为string类型
	 * @description options - options列表:
	 *   title 字符串（限200字符数）字符串仅支持GBK编码，长度需小于200字符数（即400字节），请输入前确认字符数没有超限，若字符数超长会返回错误。标题在算法中具有重要的作用，若文章确无标题，输入参数的“标题”字段为空即可
	 * @return {Promise} - 标准Promise对象
	 */
	public newsSummary(content: string, maxSummaryLen: number, options: { [key: string]: string; }) {
		const param = {
			content,
			max_summary_len: maxSummaryLen,
			targetPath: NEWS_SUMMARY_PATH
		};
		return this.commonImpl(merge(param, options));
	}
}
