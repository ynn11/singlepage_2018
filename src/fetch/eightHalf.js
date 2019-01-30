/**
 * 8:30
 */
import {fetch} from './api'
import common from './common_api'

let eightApi = {
  /*
   * C端
   * */

//获取首页商品信息
  getProductDetail(method, params, token) {
    return fetch('/v2/api/user/ts/getProductDetail', method, params, token)
  },
//获取热销精选商品
  listHotProduct(method, params, token) {
    return fetch('/v2/api/user/ts/listHotProduct', method, params, token)
  },
//获取推荐好货商品
  listRecommendProduct(method, params, token) {
    return fetch('/v2/api/user/ts/listRecommendProduct', method, params, token)
  },
//获取购买过商品的用户
  listPurchasedUser(method, params, token) {
    return fetch('/v2/api/user/ts/listPurchasedUser', method, params, token)
  },
//确认购买订单信息
  confirmOrderInfo(method, params, token) {
    return fetch('/v2/api/user/ts/confirmOrderInfo', method, params, token)
  },
//获取收货信息
  listDeliveryAddress(method, params, token) {
    return fetch('/v2/api/user/ts/listDeliveryAddress', method, params, token)
  },
//编辑收货信息
  editDeliveryAddress(method, params, token) {
    return fetch('/v2/api/user/ts/editDeliveryAddress', method, params, token)
  },
//编辑收货信息
  commitOrder(method, params, token) {
    return fetch('/v2/api/user/ts/commitOrder', method, params, token)
  },
  //提交订单
  commitOrder(method, params, token) {
    return fetch('/v2/api/user/ts/commitOrder', method, params, token)
  },
   //确认订单支付完成
  confirmOrderPaid(method, params, token) {
    return fetch('/v2/api/user/ts/confirmOrderPaid', method, params, token)
  },
    //支付成功图片
  getPaySuccessPicture(method, params) {
    return fetch('/v2/api/user/ts/getPaySuccessPicture', method, params)
  },
      //demo
  saveTsProductTest(method, params) {
    return fetch('/api/ts/productManage/saveTsProductTest', method, params)
  },


/*
* 导购端
* */
//获取资料地址
  getMaterialUrl(method, params) {
    return fetch('/v2/api/staff/ts/getMaterialUrl', method, params)
  },
  //获取商品详情
  getProductDetail_guide(method, params,token) {
    return fetch('/v2/api/staff/ts/getProductDetail', method, params,token)
  },

  //C端收集数据
  collectData(method, params,token) {
    return fetch('/v2/api/user/ts/collectData', method, params,token)
  },

  //导购端收集数据
  guidecollectData(method, params,token) {
    return fetch('/v2/api/staff/ts/collectData', method, params,token)
  },


  /*
  * 活动相关
  * */



};
Object.assign(eightApi, common);

export default eightApi
