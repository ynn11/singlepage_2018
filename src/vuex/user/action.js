/**
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * 用户信息action提交
 */
export default {
    _login({ commit }, data) {
        sessionStorage.setItem("tokenInfo",data.tokenInfo);
        sessionStorage.setItem("openId",data.openId);
        commit("updateUserInfo",data);
        if (data.redirect) {
            window.location.href= data.redirect;
        }
    },
}