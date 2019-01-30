import {fetch} from './api'
import common from './common_api'

let dragonboatApi = {
    //活动报名门店信息
    getDbfActStoreInfoByCond(method,params,token) {
        return fetch('/v2/api/getDbfActStoreInfoByCond', method, params, token)
    },
    //修改门店参与状态
    updateDbfActStoreIsPartakeStatus(method,params,token) {
        return fetch('/v2/api/updateDbfActStoreIsPartakeStatus', method, params, token)
    },
    //获取门店设置
    getStoreSetById(method,params,token) {
        return fetch('/v2/api/getStoreSetById', method, params, token)
    },
    //门店设置
    updateDbfActMerStoreSet(method,params,token) {
        return fetch('/v2/api/updateDbfActMerStoreSet', method, params, token)
    },
    //获取门店订货信息
    listDbfGoodsRecordByCond(method,params,token) {
        return fetch('/v2/api/listDbfGoodsRecordByCond', method, params, token)
    },
    //获取订货数量
    getDbfActGoodsAmountByGoodsCode(method,params,token) {
        return fetch('/v2/api/getDbfActGoodsAmountByGoodsCode', method, params, token)
    },
}

Object.assign(dragonboatApi, common)

export default dragonboatApi