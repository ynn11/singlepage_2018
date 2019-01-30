<template>
    <div class="coupons_introduce-box">
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
                <img src="/static/images/activity/applet/buyCoupons/handle_tip.png" alt="" class="handle-tip">
                <div class="rules-contain">
                    <img src="/static/images/activity/applet/buyCoupons/rules_tit.png" alt="" class="introduce-tit">
                    <p class="item">1.购买30元，可在门店抵100元使用。</p>
                    <p class="item">2.购买60元，可在门店抵200元使用。</p>
                    <p class="item">3.支付完成并分享，门店员工确认，领取对应礼品。</p>
                    <p class="item">4. 本活动最终解释权归身边店所有。</p>
                </div>
            </div>
            <div class="btn tobuy" @click="tobuy">我要领取</div>
        </div>
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
import api from '../../../../fetch/api'
import * as _tool from "../../../../util/tool"
import _urlConfig from "../../../../util/urlConfig"

import loading from '@/components/common/loading'
export default {
    components: {
        "v-loading": loading,
    },
    data() {
        return {
            storeCode: this.$route.query.storeCode,
            staffCode: this.$route.query.staffCode,
            memberCode: this.$route.query.memberCode,
            xd_code: this.$route.query.xd_code,
            loading: true
        }
    },
    computed: {
        tokenInfo () {
            let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
            return tokenInfo
        },
        openId(){
            let openId = this.$store.state.user.openId;
            return openId;
        }
    },
    methods: {
        //数据收集
        collect: function(data){
            api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
        },
        //粉丝关注/用户关注
        concernStore: function(){
            let data = {
                "storeCode": this.storeCode,
                "staffCode": this.staffCode,
                "mobileNum": "",
                "verificationCode": "",
                "appEntranceType": 3,
                "trueName": ""
            }
            api.followStoreStaffByShare("post",data,this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){

                }else{
                    alert(res.message);
                }
            })
        },
        //前往购买
        tobuy: function(){
            this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0002",
                "activityCode": "b94f745886cb42219d22250d4bb51f47",
                "openId": this.openId
            });
            let src = "/activity/coupons_buy?xd_code=" + this.xd_code;
            if (this.storeCode) {
                src += "&storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
            }
            if(this.memberCode){
                src += "&memberCode=" + this.memberCode;
            }
            this.$router.push({
                "path": src
            });
        },
        //是否参加活动
        whetherAttend: function(){
            api.whetherAttendArtifactActivity("get",{},this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    if (res.returnContent.isAlreadyShare===1||res.returnContent.attendFlag===1) {
                        let src = "/activity/coupons_success?xd_code=" + this.xd_code;
                        this.$router.replace(src);
                    }else{
                        this.loading = false;
                    }
                }else if(res.returnCode==="10"){
                    let fullPath = location.pathname + location.search;
                    let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                    location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                }else{
                    alert(res.message);
                }
            })
        },
    },
    mounted(){
        this.collect({
            "xdCode": this.xd_code,
            "ydCode": "YD0001",
            "activityCode": "b94f745886cb42219d22250d4bb51f47",
            "openId": this.openId
        });
        //如果是小白，且为导购分享链接，则关注门店
        if (this.storeCode) {
            this.concernStore();
        }
        this.whetherAttend();
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .coupons_introduce-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            height: 100%;
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
                .handle-tip{
                    display: block;
                    margin: px2rem(80px) auto 0;
                    width: px2rem(750px);
                }
                .rules-contain{
                    position: relative;
                    margin-top: px2rem(64px);
                    .introduce-tit{
                        display: block;
                        width: px2rem(750px);
                        margin: 0 auto;
                    }
                    .item{
                        font-size: px2rem(24px);
                        color: #fff;
                        text-indent: px2rem(60px);
                        margin-top: px2rem(24px);
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
