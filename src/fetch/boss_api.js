import {fetch} from './api'
export default {
    /**
     * 营销模板
     */
    //根据模板获取门店列表
    listStore(method, params,token) {
        return fetch('/v2/api/activity/template/listStore', method, params,token)
    },
    //根据模板获取活动列表
    listActivity(method, params,token) {
        return fetch('/v2/api/activity/template/listActivity', method, params,token)
    },
    //根据活动申请编号获取申请详情
    getActivityApplicationDetail(method, params,token) {
        return fetch('/v2/api/activity/template/getActivityApplicationDetail', method, params,token)
    },
    //根据模板编号（门店编号，活动编号）获取活动相关配置
    getTemplateActivityConfig(method, params,token) {
        return fetch('/v2/api/activity/template/getTemplateActivityConfig', method, params,token)
    },
    //执行活动
    executeActivity(method, params,token) {
        return fetch('/v2/api/activity/template/executeActivity', method, params,token)
    },
}