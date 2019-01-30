import {fetch} from './api'
import common from './common_api'

let maydayApi = {
    //判断商户参与活动状态
    getMerActStatus(method,params,token) {
        return fetch('/v2/api/getMerActStatus', method, params, token)
    },
    //活动报名
    joinedAct(method,params,token) {
        return fetch('/v2/api/joinedAct', method, params, token)
    },
    //活动报名名店信息
    getLabourActStoreInfoByCond(method,params,token) {
        return fetch('/v2/api/getLabourActStoreInfoByCond', method, params, token)
    },
    //修改门店参与状态
    updateLabourActStoreIsPartakeStatus(method,params,token) {
        return fetch('/v2/api/updateLabourActStoreIsPartakeStatus', method, params, token)
    },
    //获取门店设置
    getStoreSetById(method,params,token) {
        return fetch('/v2/api/getStoreSetById', method, params, token)
    },
    //门店设置
    setLabourActMerStoreConsumeMoney(method,params,token) {
        return fetch('/v2/api/setLabourActMerStoreConsumeMoney', method, params, token)
    },
    //获取门店订货信息
    listLabourGoodsRecordByCond(method,params,token) {
        return fetch('/v2/api/listLabourGoodsRecordByCond', method, params, token)
    },
    //订货
    saveLabourActGoodsRecord(method,params,token) {
        return fetch('/v2/api/saveLabourActGoodsRecord', method, params, token)
    },
    //获取订货数量
    getLabourActGoodsAmountByGoodsCode(method,params,token) {
        return fetch('/v2/api/getLabourActGoodsAmountByGoodsCode', method, params, token)
    },
    //是否参加51活动
    whetherAttendMayDayActivity(method,params,token) {
        return fetch('/v2/api/whetherAttendMayDayActivity', method, params, token)
    },
    //参加51活动
    attendMayDayActivity(method,params,token) {
        return fetch('/v2/api/attendMayDayActivity', method, params, token)
    },
    //51活动分享
    shareMayDayActivity(method,params,token) {
        return fetch('/v2/api/shareMayDayActivity', method, params, token)
    },
    //51活动是否点亮徽章
    whetherLightUpMayDayActivity(method,params,token) {
        return fetch('/v2/api/whetherLightUpMayDayActivity', method, params, token)
    },
    //51活动点亮徽章
    lightUpMayDayActivity(method,params,token) {
        return fetch('/v2/api/lightUpMayDayActivity', method, params, token)
    },
    //获取51活动礼品
    getMayDayActivityGift(method,params,token) {
        return fetch('/v2/api/getMayDayActivityGift', method, params, token)
    },
    //51活动兑奖
    exchangeMayDayActivity(method,params,token) {
        return fetch('/v2/api/exchangeMayDayActivity', method, params, token)
    },

}

Object.assign(maydayApi, common)

export default maydayApi