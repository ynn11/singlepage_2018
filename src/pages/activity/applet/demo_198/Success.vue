<template>
    <div class="demo_198-success">
        <div class="mainContent">
            <img src="/static/images/activity/applet/198/success_title2.png" class="main_bg" alt="">
            <img src="/static/images/activity/applet/198/card.png" class="main_bg card_bg" alt="">
            <img src="/static/images/activity/applet/198/success_rule2.png" class="main_bg" alt="">
            <div class="btn tobuy" @click="toUCenter">进入个人中心分享</div>
        </div>
        <v-loading v-show="loading"></v-loading>
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
            loading: false,
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
        //返回首页
        toHome(){
            let src = "/activity_2018/demo_198?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
            this.$router.replace(src);
        },
        //前往购买
        toUCenter: function(){
            let src = "/activity_2018/demo_198_uCenter?memberCode=" + this.activityInfo.memberCode + "&storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
            this.$router.push({
                path: src
            });
        },
        attendActivity: function(){
            api.purchaseVipActivity("post",{
                openId: this.openId,
                staffCode: this.staffCode,
                memberCode: this.memberCode||""
            },this.tokenInfo.token).then(res => {
                // if(res.returnCode==="0"){
                //     this.$toast("您已成功参与！");
                //     this.activityInfo = {
                //         attendFlag: 1
                //     };
                // }else if(res.returnCode==="10"){
                //     let fullPath = location.pathname + location.search;
                //     let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                //     location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                // }else{
                //     this.$toast(res.message);
                // }
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
            api.whetherAttendVipActivity("get",{},this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    if (res.returnContent.attendFlag===0) {
                        this.toHome();
                        return;
                    }
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
        if (this.tokenInfo.imInfo===null){
            this.toHome();
        }else{
            this.whetherAttend();
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .demo_198-success{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            /*height: 100%;*/
            padding:px2rem(150px) 0 px2rem(220px);
            background: url(/static/images/activity/applet/198/bg.jpg) center repeat-y /100% auto;
            .main_bg{
                display: block;
                width: 100%;
                &.card_bg{
                    margin-top: px2rem(-80px);
                }
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
                width: px2rem(584px);
                height: px2rem(90px);
                line-height: px2rem(90px);
                font-size: px2rem(36px);
                color: #fff;
                text-align: center;
                background: linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                background: -webkit-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                background: -moz-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                border-radius: px2rem(100px);
                z-index: 4;
            }
        }
    }
</style>
