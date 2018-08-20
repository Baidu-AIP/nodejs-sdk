import HttpClient = require('./httpClient');
/**
 * HttpClientNlp类
 * nlp接口调用使用GBK编码解码实现,依赖iconv-lite库
 * @see https://github.com/ashtuchkin/iconv-lite
 *
 * @class
 * @extends HttpClient
 * @constructor
 */
declare class HttpClientNlp extends HttpClient {
    constructor();
    req(options: any): Promise<{}>;
    postWithInfo(requestInfo: any): Promise<{}>;
    createBody(param: any): any;
}
export default HttpClientNlp;
export = HttpClientNlp;
