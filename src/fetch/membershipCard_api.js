import {fetch} from './api'
import common from './common_api'

let maydayApi = {
    /**
     * 老板端
     */
    //获取上架的商品列表
    listSvipProduct(method,params,token) {
        return fetch('/v2/api/listSvipProduct', method, params, token)
    },
    //报名商户门店列表
    getSvipActStoreInfoByCond(method,params,token) {
        return fetch('/v2/api/getSvipActStoreInfoByCond', method, params, token)
    },
    //更改门店参与活动状态
    updateSvipActStoreIsPartakeStatus(method,params,token) {
        return fetch('/v2/api/updateSvipActStoreIsPartakeStatus', method, params, token)
    },
    //修改门店设置
    updateSvipActMerStoreSet(method,params,token) {
        return fetch('/v2/api/updateSvipActMerStoreSet', method, params, token)
    },
    //获取订货记录
    listVipGoodsRecordByCond(method,params,token) {
        return fetch('/v2/api/listVipGoodsRecordByCond', method, params, token)
    },
    //添加订货记录
    saveVipGoodsRecord(method,params,token) {
        return fetch('/v2/api/saveVipGoodsRecord', method, params, token)
    },
    //活动数据
    getSvipActMerData(method,params,token) {
        return fetch('/v2/api/getSvipActMerData', method, params, token)
    },
    //成交数据详情
    getDealMemCountByMerchantCode(method,params,token) {
        return fetch('/v2/api/getDealMemCountByMerchantCode', method, params, token)
    },
    /**
     * 导购端
     */
    /**
     * 会员端
     */
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