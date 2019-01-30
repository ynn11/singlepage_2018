/* 内存数据状态 */

export default {
    tokenInfo: sessionStorage.getItem('tokenInfo') || "",
    openId: sessionStorage.getItem('openId') || "",
}