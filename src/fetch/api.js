import axios from 'axios'
import qs from 'qs'
import _urlConfig from '../util/urlConfig'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = _urlConfig.apiUri;

// 返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status!==200){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // alert("网络异常");
    return Promise.reject(error);
});

export function fetch(url, method, params, token) {
    //来爆api
    if (token==="lbapi") {
        axios.defaults.baseURL = 'https://lbapi.storeer.com';
        switch(method){
            case "get":
                return new Promise((resolve, reject) => {
                    //GET传参序列化
                    let getUrl = url + "?" + qs.stringify(params);
                    axios.get(getUrl,{
                        headers: {
                            Authorization: ""
                        }
                    })
                        .then(response => {
                            resolve(response.data);
                        }, err => {
                            reject(err);
                        })
                        .catch((error) => {
                            reject(error)
                        })
                });
            break;
            case "post":
                return new Promise((resolve, reject) => {
                    axios.post(url, params ,{
                        headers: {
                            Authorization: ""
                        }
                    })
                        .then(response => {
                            resolve(response.data);
                        }, err => {
                            reject(err);
                        })
                        .catch((error) => {
                            reject(error)
                        })
                });
            break;
            default:
            alert("method is null");
            break;
        }
    }
    switch(method){
        case "get":
            return new Promise((resolve, reject) => {
                //GET传参序列化
                let getUrl = url + "?" + qs.stringify(params);
                axios.get(getUrl,{
                    headers: {
                        Authorization: token||""
                    }
                })
                    .then(response => {
                        resolve(response.data);
                    }, err => {
                        reject(err);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            });
        break;
        case "post":
            return new Promise((resolve, reject) => {
                axios.post(url, params ,{
                    headers: {
                        Authorization: token||""
                    }
                })
                    .then(response => {
                        resolve(response.data);
                    }, err => {
                        reject(err);
                    })
                    .catch((error) => {
                        reject(error)
                    })
            });
        break;
        default:
        alert("method is null");
        break;
    }
}

export default {
    /**
     * 获取微信配置参数
     */
    getSignMap(method,params,token) {
        return fetch('/api/wechat/getSignMap', method, params, token)
    },
    /**
     * 是否关注公众号
     */
    getSubscribeStatus(method,params,token) {
        return fetch('/api/wechat/getSubscribeStatus', method, params, token)
    },
    /**
     * 积分分享给好友
     */
    sendInvitation(method,params,token) {
        return fetch('/api/common/sendInvitation', method, params, token)
    },
    /**
     * 接受好友积分分享
     */
    acceptInvitation(method,params,token) {
        return fetch('/api/common/acceptInvitation', method, params, token)
    },
    /**
     * 关注门店
     */
    // attractStoreByShare(method,params,token) {
    //     return fetch('/api/common/attractStoreByShare', method, params, token)
    // },
    //获取个人信息
    getAppUserInfo(method,params,token){
        return fetch('/api/common/getAppUserInfo', method, params, token)
    },
    //积分列表&&与首页关注门店信息通用
    getMemberAttractStoreListByAppUserCode(method,params,token){
        return fetch('/api/common/getMemberAttractStoreListByAppUserCode', method, params, token)
    },
    /**
     * v2 相关接口
     */
    //获取上传token
    getImageToken(method, params) {
        return fetch('/v2/api/common/getUploadTokenKey', method, params)
    },
    //获取物流信息
    checkExpress(method,params,token){
        return fetch('/v2/api/checkExpress', method, params, token)
    },
    //查看售后订单物流信息
    checkOrderAfterSaleExpress: function(method, params) {
        return fetch('/v2/api/checkOrderAfterSaleExpress', method, params)
    },
    //获取商品信息
    getProduct(method,params,token){
        return fetch('/v2/api/getProduct', method, params, token)
    },
    //保存商品信息
    saveProduct(method,params,token){
        return fetch('/v2/api/saveProduct', method, params, token)
    },
    //更新商品信息
    updateProduct(method,params,token){
        return fetch('/v2/api/updateProduct', method, params, token)
    },
    //关注门店
    attractStoreByShare(method,params,token){
        return fetch('/v2/api/attractStoreByShare', method, params, token)
    },
    //关注门店或导购(旧)
    followStoreByShare(method,params,token){
        return fetch('/v2/api/followStoreByShare', method, params, token)
    },
    //关注门店或导购
    followStoreStaff(method,params,token){
        return fetch('/v2/api/followStoreStaff', method, params, token)
    },
    //是否关注门店或导购
    whetherFollowStore(method,params,token){
        return fetch('/v2/api/whetherFollowStore', method, params, token)
    },
    //通过分享关注门店或导购
    followStoreStaffByShare(method,params,token){
        return fetch('/v2/api/followStoreStaffByShare', method, params, token)
    },
    //发送绑定手机号验证码
    sendVerificationCode: function(method, params,token) {
        return fetch('/v2/api/sendVerificationCode', method, params,token)
    },
    //获取秘籍明细信息
    getEsotericaInfo(method,params,token){
        return fetch('/v2/api/getEsotericaInfo', method, params, token)
    },
    //获取身边店推荐内容
    getRecommendMsgContent(method,params,token){
        return fetch('/v2/api/getRecommendMsgContent', method, params, token)
    },
    /**
     * 老板端接口
     */
    //获取日报，月报
    getReportMessageDetail(method,params,token){
        return fetch('/v2/api/getReportMessageDetail', method, params, token)
    },
    /**
    /**
     * 神笔
     */
    //获取所有神笔模板列表
    getPenTemplateList(method,params,token){
        return fetch('/v2/api/getPenTemplateList', method, params, token)
    },
    //根据商品编号获取商品编辑模板列表
    getPenTemplateListByProductCode(method,params,token){
        return fetch('/v2/api/getPenTemplateListByProductCode', method, params, token)
    },
    //根据商品编号和模板编号获取商品模板信息
    getPenTemplateInfo(method,params,token){
        return fetch('/v2/api/getPenTemplateInfo', method, params, token)
    },
    //发布商品信息
    publishProduct(method,params,token){
        return fetch('/v2/api/publishProduct', method, params, token)
    },
    //保存商品模板编辑信息
    saveProductTemplate(method,params,token){
        return fetch('/v2/api/saveProductTemplate', method, params, token)
    },
    //待推荐商品列表
    showRecommendGoodsList(method,params,token){
        return fetch('/v2/api/showRecommendGoodsList', method, params, token)
    },
    /**
     * 活动·····································································
     */
    //根据用户编号获取会员门店信息列表
    getMemberStoreInfoList: function(method, params,token) {
        return fetch('/v2/api/getMemberStoreInfoList', method, params,token)
    },
    /**
     * 送神器活动相关
     */
    //c端活动数据收集
    collectStatisticsOnActivities(method, params,token) {
        return fetch('/v2/api/collectStatisticsOnActivities', method, params,token)
    },
    //导购端活动数据收集
    collectStatisticsOnActivitiesByStaff(method, params,token) {
        return fetch('/v2/api/collectStatisticsOnActivitiesByStaff', method, params,token)
    },
    //粉丝绑定手机号
    memFansBindMobileNum: function(method, params,token) {
        return fetch('/v2/api/memFansBindMobileNum', method, params,token)
    },
    //获取已关注且参与活动门店列表
    getActivityStoreList(method, params,token) {
        return fetch('/v2/api/getActivityStoreList', method, params,token)
    },
    //获取送神器活动的门店面额设置
    getAttendArtifactActivityStore(method, params,token) {
        return fetch('/v2/api/getAttendArtifactActivityStore', method, params,token)
    },
    //提交送神器活动订单
    commitArtifactActivityOrder(method, params,token) {
        return fetch('/v2/api/commitArtifactActivityOrder', method, params,token)
    },
    //确认活动订单完成
    confirmArtifactActivityOrderPaid(method, params,token) {
        return fetch('/v2/api/confirmArtifactActivityOrderPaid', method, params,token)
    },
    //是否参加送神器活动
    whetherAttendArtifactActivity(method, params,token) {
        return fetch('/v2/api/whetherAttendArtifactActivity', method, params,token)
    },
    //分享确认
    shareArtifactActivity(method, params,token) {
        return fetch('/v2/api/shareArtifactActivity', method, params,token)
    },
    //领取礼包
    pickUpRedPacket(method, params,token) {
        return fetch('/v2/api/pickUpRedPacket', method, params,token)
    },
    //根据导购编号获取导购明细信息
    getShopGuideInfo(method,params,token){
        return fetch('/v2/api/getShopGuideInfo', method, params, token)
    },
    //获取导购返现活动业绩排行
    getStaffCashBackActivityRank(method,params,token){
        return fetch('/v2/api/getStaffCashBackActivityRank', method, params, token)
    },
    //编辑导购收款账户信息
    editShopGuideReceiveAccount(method,params,token){
        return fetch('/v2/api/editShopGuideReceiveAccount', method, params, token)
    },
    //获取上个月奖励
    getLastMonthAward(method,params,token){
        return fetch('/v2/api/getLastMonthAward', method, params, token)
    },
    //确认已读奖励信息
    readLastMonthAwardInfo(method,params,token){
        return fetch('/v2/api/readLastMonthAwardInfo', method, params, token)
    },
    //中秋活动相关
    //发送绑定手机号验证码
    sendVerificationCode: function(method, params) {
        return fetch('/v2/api/sendVerificationCode', method, params)
    },
    /**
     * 女神节活动
     */
    //是否参加女神节活动
    whetherAttendGoddessActivity(method, params,token) {
        return fetch('/v2/api/whetherAttendGoddessActivity', method, params,token)
    },
    //参加女神节活动
    attendGoddessActivity(method, params,token) {
        return fetch('/v2/api/attendGoddessActivity', method, params,token)
    },
    //女神节活动扫码
    scanGoddessActivityPickCode(method, params,token) {
        return fetch('/v2/api/scanGoddessActivityPickCode', method, params,token)
    },
    //女神节活动会员列表
    getGoddessActivityMemberList(method, params,token) {
        return fetch('/v2/api/getGoddessActivityMemberList', method, params,token)
    },
    /**
     * 演示活动
     */
    //是否参加演示活动
    whetherAttendDemoActivity(method, params,token) {
        return fetch('/v2/api/whetherAttendDemoActivity', method, params,token)
    },
    //参加演示活动
    attendDemoActivity(method, params,token) {
        return fetch('/v2/api/attendDemoActivity', method, params,token)
    },
    //获取参与活动会员列表
    getActivityMemberList(method, params,token) {
        return fetch('/v2/api/getActivityMemberList', method, params,token)
    },
    //粉丝绑定不验证手机号
    memFansBindMobileNumNotVerifying(method, params,token) {
        return fetch('/v2/api/memFansBindMobileNumNotVerifying', method, params,token)
    },
    /**
     * 会员卡活动
     */
    //是否参加会员卡活动
    whetherAttendVipActivity(method, params,token) {
        return fetch('/v2/api/whetherAttendVipActivity', method, params,token)
    },
    //浏览会员卡活动
    browseVipActivity(method, params,token) {
        return fetch('/v2/api/browseVipActivity', method, params,token)
    },
    //会员卡活动购买
    purchaseVipActivity(method, params,token) {
        return fetch('/v2/api/purchaseVipActivity', method, params,token)
    },
    //设置会员卡活动收款账户
    setVipActivityAccount(method, params,token) {
        return fetch('/v2/api/setVipActivityAccount', method, params,token)
    },
    //确认会员卡活动订单支付完成
    confirmVipActivityOrderPaid(method, params,token) {
        return fetch('/v2/api/confirmVipActivityOrderPaid', method, params,token)
    },
    //获取会员卡活动相关信息
    getVipActivityInfo(method, params,token) {
        return fetch('/v2/api/getVipActivityInfo', method, params,token)
    },
}
