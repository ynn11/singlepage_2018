import {fetch} from './api'
export default {
    /**
     * 通用方法
     */
    //获取微信配置参数
    getSignMap(method,params,token) {
        return fetch('/api/wechat/getSignMap', method, params, token)
    },
    /**
     * 导购端
     */
    //根据导购编号获取导购明细信息
    getShopGuideInfo(method,params,token){
        return fetch('/v2/api/getShopGuideInfo', method, params, token)
    },
    //导购端活动数据收集
    collectStatisticsOnActivitiesByStaff(method, params,token) {
        return fetch('/v2/api/collectStatisticsOnActivitiesByStaff', method, params,token)
    },
    //获取活动相关信息
    activityInfo(method,params,token){
        return fetch('/v2/api/activityInfo', method, params, token)
    },
    //完成活动相关信息(领奖等)
    activityComplete(method,params,token){
        return fetch('/v2/api/activityComplete', method, params, token)
    },
    //合成活动分享图片
    activityShareImage(method,params,token){
        return fetch('/v2/api/activityShareImage', method, params, token)
    },
    //获取活动统计数据
    activityDataStaff(method, params,token) {
        return fetch('/v2/api/activityDataStaff', method, params,token)
    },
    /**
     * 老板端
     */
    //判断商户参与活动状态
    getMerActStatus(method,params,token) {
        return fetch('/v2/api/getMerActStatus', method, params, token)
    },
    //活动报名
    joinedAct(method,params,token) {
        return fetch('/v2/api/joinedAct', method, params, token)
    },
  //商户报名状态
  getDualActMerStatus(method,params,token) {
    return fetch('/v2/api/getDualActMerStatus', method, params, token)
  },

    /**
     * 会员端
     */
    //发送绑定手机号验证码
    sendVerificationCode: function(method, params,token) {
        return fetch('/v2/api/sendVerificationCode', method, params,token)
    },
    //粉丝绑定手机号
    memFansBindMobileNum: function(method, params,token) {
        return fetch('/v2/api/memFansBindMobileNum', method, params,token)
    },
    //通过分享关注门店或导购
    followStoreStaffByShare(method,params,token){
        return fetch('/v2/api/followStoreStaffByShare', method, params, token)
    },
    //活动相关内容
    activityContent(method, params,token) {
        return fetch('/v2/api/activityContent', method, params,token)
    },
    //获取已关注且参与活动门店列表
    getActivityStoreList(method, params,token) {
        return fetch('/v2/api/getActivityStoreList', method, params,token)
    },
    //c端活动数据收集
    collectStatisticsOnActivities(method, params,token) {
        return fetch('/v2/api/collectStatisticsOnActivities', method, params,token)
    },
    //是否参加活动
    activityWhetherAttend(method, params,token) {
        return fetch('/v2/api/activityWhetherAttend', method, params,token)
    },
    //参加活动
    activityAttend(method, params,token) {
        return fetch('/v2/api/activityAttend', method, params,token)
    },
    //确认活动相关信息
    activityConfirm(method, params,token) {
        return fetch('/v2/api/activityConfirm', method, params,token)
    },
    //分享活动
    activityShare(method, params,token) {
        return fetch('/v2/api/activityShare', method, params,token)
    },

}
