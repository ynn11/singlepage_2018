/**
 * 新年送福卡
 */
import {fetch} from './api'
import common from './common_api'

let newYearGreetCard = {
  /*
   * C端
   * */
//获取首页商品信息
  getProductDetail(method, params, token) {
    return fetch('/v2/api/user/ts/getProductDetail', method, params, token)
  },
};
Object.assign(newYearGreetCard, common);

export default newYearGreetCard
