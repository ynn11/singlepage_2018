/**
 * 更改 Vuex 的 store 中的state
 */
// import store from '../../store'

export default {
    updateUserInfo: function(state,obj){
        state.tokenInfo = obj.tokenInfo;
        state.openId = obj.openId;
    }
}