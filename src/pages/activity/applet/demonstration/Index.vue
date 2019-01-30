<template>
    <div class="coupons_introduce-box">
        <div class="mainContent">
            <img src="/static/images/activity/applet/demonstration/bg_1.jpg" class="main_bg" alt="">
            <img src="/static/images/activity/applet/demonstration/bg_2.jpg" class="main_bg" alt="">
            <img src="/static/images/activity/applet/demonstration/bg_3.jpg" class="main_bg" alt="">
            <div class="btn tobuy" v-if="activityInfo.attendFlag===1">已参与</div>
            <div class="btn tobuy" @click="tobuy" v-else>我要抢</div>
        </div>
        <v-loading v-show="loading"></v-loading>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
                <img class="pop_bg" src="/static/images/activity/applet/demonstration/pop_bind.png" alt="">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="bindMobileNumShow=false;">
                <div class="content-box">
                    <input type="number" class="mobileNum" v-model="mobileNum" placeholder="输入您的手机号码">
                    <div class="btn-contain">
                        <div class="btn btn-bind" @click="bindMobileNum">绑定</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../../fetch/api'
import * as _tool from "../../../../util/tool"
import _urlConfig from "../../../../util/urlConfig"
import * as _validate from "../../../../util/validate"

import loading from '@/components/common/loading'
export default {
    components: {
        "v-loading": loading,
    },
    data() {
        return {
            storeCode: this.$route.query.storeCode,
            staffCode: this.$route.query.staffCode,
            mobileNum: "",
            bindMobileNumShow: false,
            loading: true,
            activityInfo: {}
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
                    this.$toast(res.message);
                }
            })
        },
        //前往购买
        tobuy: function(){
            if (this.tokenInfo.imInfo===null){
                this.bindMobileNumShow = true;
                return;
            }
            this.attendActivity();
        },
        attendActivity: function(){
            api.attendDemoActivity("post",{
                linkSrcStaff: this.staffCode
            },this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    this.$toast("您已成功参与！");
                    this.activityInfo = {
                        attendFlag: 1
                    };
                }else if(res.returnCode==="10"){
                    let fullPath = location.pathname + location.search;
                    let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                    location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                }else{
                    this.$toast(res.message);
                }
            })
        },
        //绑定手机号
        bindMobileNum() {
            let data = {
                "mobileNum": this.mobileNum,
                "appEntranceType": 3
            }
            if (_validate.mobile(data.mobileNum)!==true) {
                this.$toast(_validate.mobile(data.mobileNum));
                return;
            }
            api.memFansBindMobileNumNotVerifying("post",data,this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    this.$store.dispatch("_login",{tokenInfo: JSON.stringify(res.returnContent),openId: this.openId});
                    this.attendActivity();
                    this.bindMobileNumShow = false;
                }else{
                    this.$toast(res.message);
                    this.bindMobileNumShow = false;
                }
            })
        },
        //是否参加活动
        whetherAttend: function(){
            api.whetherAttendDemoActivity("get",{},this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    // if (res.returnContent.isAlreadyShare===1||res.returnContent.attendFlag===1) {
                    //     let src = "/activity/coupons_success?xd_code=" + this.xd_code;
                    //     this.$router.replace(src);
                    // }else{
                    //     this.loading = false;
                    // }
                    this.activityInfo = res.returnContent;
                    this.loading = false;
                }else if(res.returnCode==="10"){
                    let fullPath = location.pathname + location.search;
                    let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                    location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                }else{
                    this.$toast(res.message);
                }
            })
        },
    },
    mounted(){
        //如果是小白，且为导购分享链接，则关注门店
        if (this.storeCode) {
            this.concernStore();
        }
        if (this.tokenInfo.imInfo===null){
            this.bindMobileNumShow = true;
            this.loading = false;
        }else{
            this.whetherAttend();
        }
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
                background: url(/static/images/activity/applet/demonstration/btn_bg.png);
                background-size: contain;
                border-radius: px2rem(100px);
                z-index: 4;
            }
        }
        .popWindow{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling : touch;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            z-index:999;
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.6);
            }
            .pop-contain{
                position: absolute;
                top: 50%;
                left: 50%;
                width: px2rem(600px);
                margin-top: px2rem(-510px);
                margin-left: px2rem(-300px);
                overflow: hidden;
                .pop_bg{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .close{
                    position: absolute;
                    top: px2rem(70px);
                    right: px2rem(30px);
                    width: px2rem(40px);
                    height: px2rem(40px);
                    z-index: 9;
                }
                .content-box{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
            }
            //用户绑定弹窗
            .bindMobileNum-contain{
                .close{
                    top: px2rem(50px);
                }
                .mobileNum{
                    display: block;
                    width: px2rem(520px);
                    margin: px2rem(324px) auto 0;
                    height: px2rem(90px);
                    font-size: px2rem(28px);
                    background-color: #fff;
                    text-indent: px2rem(8px);
                    border-bottom: 1px solid #dededf;
                }
                .btn-contain{
                    margin-top: px2rem(100px);
                    text-align: center;
                    .btn-bind{
                        position: relative;
                        display: inline-block;
                        width: px2rem(454px);
                        height: px2rem(119px);
                        line-height: px2rem(119px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background: url(/static/images/activity/applet/demonstration/btn_bg.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
</style>
