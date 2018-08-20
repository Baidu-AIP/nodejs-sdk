/**
* devAuthToken类
* 百度开发者token信息包装类
*
* @constructor
* @param {string} token access_token
* @param {number} expireTime 多久之后过期
* @param {string} scope 权限
*/
declare class DevAuthToken {
    token: string;
    expireTime: number;
    scope: string;
    authDate: Date;
    hasScopeFlag: boolean;
    constructor(token: string, expireTime: number, scope: string);
    initScope(): void;
    hasScope(scope?: any): boolean;
    isExpired(): boolean;
}
declare namespace DevAuthToken {
    /**
     * 设置提前获取access_token的时间
     */
    function setExpireAhead(duration: any): void;
    const DEFAULT_EXPIRE_DURATION: number;
}
export default DevAuthToken;
export = DevAuthToken;
