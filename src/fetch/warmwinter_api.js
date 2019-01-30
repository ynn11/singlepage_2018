import {fetch} from './api'
import common from './common_api'

/**
 *双十一活动
 */
let warmWinterApi = {
  /**
   * 老板端
   */
  getZmxVoucherData(method, params, token) {
    return fetch('/v2/api/getZmxVoucherData', method, params, token)
  },
  setZmxVoucherActStaffReward(method, params, token) {
    return fetch('/v2/api/setZmxVoucherActStaffReward', method, params, token)
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
  //完成活动相关信息
  activityComplete(method, params, token) {
    return fetch('/v2/api/activityComplete', method, params, token)
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

  /**
   * C端
   */




}

Object.assign(warmWinterApi, common)

export default warmWinterApi
