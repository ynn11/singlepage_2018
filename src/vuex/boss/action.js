/**
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 */
export default {
    //存储已选择的门店、活动、开始时间、结束时间
    updateSellTemplateStoreCode({commit},storeCode) {
        commit('setSellTemplateStoreCode', storeCode)
    },
    updateSellTemplateActivityCode({commit},activityCode) {
        commit('setSellTemplateActivityCode', activityCode)
    },
    updateSellTemplateBeginTime({commit},beginTime) {
        commit('setSellTemplateBeginTime', beginTime)
    },
    updateSellTemplateEndTime({commit},endTime) {
        commit('setSellTemplateEndTime', endTime)
    }
}