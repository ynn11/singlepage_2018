import {fetch} from './api'
import common from './common_api'

let midautumnApi = {
    //活动订单信息确认
    activityOrderInfoConfirm(method,params,token) {
        return fetch('/v2/api/activityOrderInfoConfirm', method, params, token)
    },
    //活动订单信息编辑
    activityOrderInfoEdit(method,params,token) {
        return fetch('/v2/api/activityOrderInfoEdit', method, params, token)
    },
    //获取活动分享图片
    activityShareImageStaff(method,params,token) {
        return fetch('/v2/api/activityShareImageStaff', method, params, token)
    },
    //获取活动数据
    activityDataBoss(method,params,token) {
        return fetch('/v2/api/activityDataBoss', method, params, token)
    }
}

Object.assign(midautumnApi, common)

export default midautumnApi