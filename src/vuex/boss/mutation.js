/**
 * 更改 Vuex 的 store 中的state
 */
// import store from '../../store'

export default {
    //引用类型数据不触发computed
    setSellTemplateStoreCode: function(state,storeCode){
        let sellTemplate = JSON.parse(JSON.stringify(state.sellTemplate));
        sellTemplate.storeCode = storeCode
        state.sellTemplate = sellTemplate
    },
    setSellTemplateActivityCode: function(state,activityCode){
        let sellTemplate = JSON.parse(JSON.stringify(state.sellTemplate));
        sellTemplate.activityCode = activityCode
        state.sellTemplate = sellTemplate
    },
    setSellTemplateBeginTime: function(state,beginTime){
        let sellTemplate = JSON.parse(JSON.stringify(state.sellTemplate));
        sellTemplate.beginTime = beginTime
        state.sellTemplate = sellTemplate
    },
    setSellTemplateEndTime: function(state,endTime){
        let sellTemplate = JSON.parse(JSON.stringify(state.sellTemplate));
        sellTemplate.endTime = endTime
        state.sellTemplate = sellTemplate
    }
}