import {fetch} from './api'
import common from './common_api'

/**
 *双十一活动
 */
let doubleApi = {
  /**
   * 老板端
   */
//判断商户参与活动状态
  getDualActMerStatus(method, params, token) {
    return fetch('/v2/api/getDualActMerStatus', method, params, token)
  },
  //活动报名
  joinedAct(method, params, token) {
    return fetch('/v2/api/joinedAct', method, params, token)
  },
  //报名商户门店列表
  getDuElevenActStoreInfoByCond(method, params, token) {
    return fetch('/v2/api/getDuElevenActStoreInfoByCond', method, params, token)
  },
  //更改门店参与活动状态
  updateDuelevenActStoreIsPartakeStatus(method, params, token) {
    return fetch('/v2/api/updateDuelevenActStoreIsPartakeStatus', method, params, token)
  },
  //保存或修改门店设置
  setDuelevenActMerStoreConsumeMoney(method, params, token) {
    return fetch('/v2/api/setDuelevenActMerStoreConsumeMoney', method, params, token)
  },
  //参加活动
  activityAttend(method, params, token) {
    return fetch('/v2/api/activityAttend/', method, params, token)
  },
    //数据门店列表
  getDuElevenActStoreForMerchant(method, params, token) {
    return fetch('/v2/api/getDuElevenActStoreForMerchant', method, params, token)
  },
   //数据
  getDuElevenActData(method, params, token) {
    return fetch('/v2/api/getDuElevenActData', method, params, token)
  },


  /**
   * 导购端
   */
  //获取活动相关信息
  activityInfo(method, params, token) {
    return fetch('/v2/api/activityInfo', method, params, token)
  },

  //获取活动统计数据
  activityDataStaff(method, params, token) {
    return fetch('/v2/api/activityDataStaff', method, params, token)
  },
  //检索绑定会员列表
  searchStoreMemberListByCond(method, params, token) {
    return fetch('/v2/api/searchStoreMemberListByCond', method, params, token)
  },

  //活动订单信息编辑
  activityOrderInfoEditByStaff(method, params, token) {
    return fetch('/v2/api/activityOrderInfoEditByStaff', method, params, token)
  },
  //活动订单信息确认
  activityOrderInfoConfirmByStaff(method, params, token) {
    return fetch('/v2/api/activityOrderInfoConfirmByStaff', method, params, token)
  },
  //合成活动分享图片
  activityShareImage(method, params, token) {
    return fetch('/v2/api/activityShareImage', method, params, token)
  },
  //获取活动分享图片
  activityShareImageStaff(method, params, token) {
    return fetch('/v2/api/activityShareImageStaff', method, params, token)
  },
  //活动公众号二维码
  activityQrCodeByStaff(method, params, token) {
    return fetch('/v2/api/activityQrCodeByStaff', method, params, token)
  },

}

Object.assign(doubleApi, common)

export default doubleApi
