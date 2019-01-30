import {fetch} from './api'
import common from './common_api'

let midautumnApi = {
    //商户报名状态
    getDualActMerStatus(method,params,token) {
        return fetch('/v2/api/getDualActMerStatus', method, params, token)
    },
    //记录不感兴趣商户
    recordNointentMer(method,params,token) {
        return fetch('/v2/api/recordNointentMer', method, params, token)
    },
    //报名商户门店列表
    getDualActStoreInfoByCond(method,params,token) {
        return fetch('/v2/api/getDualActStoreInfoByCond', method, params, token)
    },
    //保存或修改门店设置
    dualActStoreSet(method,params,token) {
        return fetch('/v2/api/dualActStoreSet', method, params, token)
    },
    //更改门店参与活动状态
    updateDualActStorePartakeStatus(method,params,token) {
        return fetch('/v2/api/updateDualActStorePartakeStatus', method, params, token)
    },
    //获取订货记录
    listDualGoodsRecord(method,params,token) {
        return fetch('/v2/api/listDualGoodsRecord', method, params, token)
    },
    //活动数据
    getDualActData(method,params,token) {
        return fetch('/v2/api/getDualActData', method, params, token)
    },
}

Object.assign(midautumnApi, common)

export default midautumnApi