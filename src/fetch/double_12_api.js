/**
 * 双十二
 */
import {fetch} from './api'
import common from './common_api'
let double12Api = {
  /*
   * 老板端
   */
  //商品列表 1为满送商品
  listGnjGoods(method,params,token) {
    return fetch('/v2/api/listGnjGoods', method, params, token)
  },
    //收集信息
  collectData(method,params,token) {
    return fetch('/v2/api/boss/collectData', method, params, token)
  },


  //商品列表 1为满送商品
  getGnjActStoreInfoByCond(method,params,token) {
    return fetch('/v2/api/getGnjActStoreInfoByCond', method, params, token)
  },
  //更改门店参与活动状态
  updateGnjActStorePartakeStatus(method,params,token) {
    return fetch('/v2/api/updateGnjActStorePartakeStatus', method, params, token)
  },
  //存或修改门店设置
  gnjActStoreSet(method,params,token) {
    return fetch('/v2/api/gnjActStoreSet', method, params, token)
  },
  //参与活动门店列表
  listGnjActStoreByMerchantCode(method,params,token) {
    return fetch('/v2/api/listGnjActStoreByMerchantCode', method, params, token)
  },
  //数据
  getGnjActData(method,params,token) {
    return fetch('/v2/api/getGnjActData', method, params, token)
  },


   /*
   * C端
   */


   /*
   * 导购端
   */
  //活动订单信息编辑
  activityOrderInfoEditByStaff(method,params,token) {
    return fetch('/v2/api/activityOrderInfoEditByStaff', method, params, token)
  },
  //活动订单信息确认
  activityOrderInfoConfirmByStaff(method,params,token) {
    return fetch('/v2/api/activityOrderInfoConfirmByStaff', method, params, token)
  },
  //活动公众号二维码
  activityQrCodeByStaff(method,params,token) {
    return fetch('/v2/api/activityQrCodeByStaff', method, params, token)
  },


}

Object.assign(double12Api, common)
export default double12Api
