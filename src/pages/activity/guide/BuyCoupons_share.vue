<template>
    <div class="buycoupons-guide-share-box">
        <div class="mainContent">
            <img src="/static/images/activity/applet/buyCoupons/bg_1.jpg" class="main_bg" alt="">
            <img src="/static/images/activity/applet/buyCoupons/bg_2.jpg" class="main_bg" alt="">
            <div class="introduce-content">
                <div class="coupons-contain coupons-contain1">
                    <img src="/static/images/activity/applet/buyCoupons/coupons_30.jpg" alt="" class="item">
                    <img src="/static/images/activity/applet/buyCoupons/gifts1.jpg" alt="" class="item">
                    <img src="/static/images/activity/applet/buyCoupons/gifts2.jpg" alt="" class="item">
                    <img src="/static/images/activity/applet/buyCoupons/select_tip.png" alt="" class="item select-tip">
                </div>
                <div class="coupons-contain coupons-contain2">
                    <img src="/static/images/activity/applet/buyCoupons/coupons_60.jpg" alt="" class="item">
                    <img src="/static/images/activity/applet/buyCoupons/gifts1.jpg" alt="" class="item">
                    <img src="/static/images/activity/applet/buyCoupons/gifts2.jpg" alt="" class="item">
                    <img src="/static/images/activity/applet/buyCoupons/both_tip.png" alt="" class="item select-tip">
                </div>
                <div class="rules-contain">
                    <img src="/static/images/activity/applet/buyCoupons/rules_tit.png" alt="" class="introduce-tit">
                    <p class="item">1.购买30元代金券，可在门店抵100元使用；</p>
                    <p class="item">2.购买60元代金券，可在门店抵200元使用；</p>
                    <p class="item">3.购买30元代金券，在两款礼品中任选一个；</p>
                    <p class="item">4. 购买60元代金券，可同时获得两款礼品；</p>
                    <p class="item">5. 支付完成并分享，门店员工确认，领取对应礼品。</p>
                    <p class="item">6. 本次活动最终解释权归身边店所有</p>
                </div>
                <div class="rebate-contain">
                    <img src="/static/images/activity/applet/buyCoupons/guide_rebate_tit.png" alt="" class="rebate-tit">
                    <p class="item">1.员工首次分享或介绍会员成功购买30元代金券，该员工可获得10元奖励</p>
                    <p class="item">2.员工首次分享或介绍会员成功购买60元代金券，该员工可获得20元奖励</p>
                    <p class="item">3.会员分享介绍好友成功购买30元代金券，该会员可获得5元奖励，同时直属导购一并获得5元奖励</p>
                    <p class="item">4. 会员分享介绍好友成功购买60元代金券，该会员可获得10元奖励，同时直属导购一并获得10元奖励</p>
                </div>
            </div>
            <div class="btn" @click="doShare">分享</div>
        </div>
    </div>
</template>

<script>
import api from '../../../fetch/api'
import * as _tool from "../../../util/tool"
import _urlConfig from "../../../util/urlConfig"
export default {
    data() {
        return {
            token: this.$route.query.token,
            type: this.$route.query.type,
            shareContent: {
                title: "超值礼包免费送，立即领取！",
                content: "198瘦脸神器和218电动牙刷免费送，邀请好友参加，还有惊喜等着您！赶紧和好友一起分享吧！",
                linkUrl: _urlConfig.redirectBaseredirectURI + "/activity/coupons_introduce",
                imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
            }
        }
    },
    methods: {
        //数据收集
        collect: function(data){
            api.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
        },
        //分享
        doShare: function(){
            var _this = this;
            _this.collect({
                "xdCode": "XD0007",
                "ydCode": "YD0010",
                "activityCode": "b94f745886cb42219d22250d4bb51f47"
            });
            WebViewJavascriptBridge.callHandler('share',this.shareContent,function(response) {
                alert("分享成功");
            });
        },
        getShopGuideInfo: function(){
            api.getShopGuideInfo("get",{},this.token).then((res)=>{
                if(res.returnCode==="0"){
                    this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                }else{
                    alert(res.message);
                }
            });
        }
    },
    mounted(){
        //初始化webViewJavascriptBridge
        _tool.webviewBridgeInit(this.type);
        this.getShopGuideInfo();
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .buycoupons-guide-share-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            height: px2rem(3450px);
            background-color: #d13ece;
            .main_bg{
                display: block;
                width: 100%;
            }
            .introduce-content{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                .coupons-contain{
                    width: px2rem(640px);
                    background-color: #fff;
                    overflow: hidden;
                    margin: 0 auto;
                    border-radius: px2rem(24px);
                    margin-top: px2rem(668px);
                    box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    -moz-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    -webkit-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    &.coupons-contain2{
                        margin-top: px2rem(45px);
                    }
                    .item{
                        display: block;
                        width: px2rem(578px);
                        margin: px2rem(32px) auto;
                        &.select-tip{
                            width: px2rem(340px);
                        }
                    }
                }
                .rules-contain{
                    position: relative;
                    margin-top: px2rem(64px);
                    .introduce-tit{
                        display: block;
                        width: px2rem(750px);
                        margin: 0 auto px2rem(64px);
                    }
                    .item{
                        font-size: px2rem(24px);
                        line-height: px2rem(48px);
                        color: #fff;
                        padding: 0 px2rem(60px);
                    }
                }
                .rebate-contain{
                    position: relative;
                    margin-top: px2rem(64px);
                    .rebate-tit{
                        display: block;
                        width: px2rem(750px);
                        margin: 0 auto px2rem(64px);
                    }
                    .item{
                        font-size: px2rem(24px);
                        line-height: px2rem(48px);
                        color: #fff;
                        padding: 0 px2rem(60px);
                    }
                }
            }
            .btn{
                position: fixed;
                bottom: px2rem(78px);
                left: 50%;
                margin-left: px2rem(-307px);
                width: px2rem(614px);
                height: px2rem(119px);
                line-height: px2rem(119px);
                font-size: px2rem(36px);
                color: #fff;
                text-align: center;
                background: url(/static/images/activity/applet/buyCoupons/btn_bg.png);
                background-size: contain;
                border-radius: px2rem(100px);
                z-index: 4;
            }
        }
    }
</style>
