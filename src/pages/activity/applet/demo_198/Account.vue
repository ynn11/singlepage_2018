<template>
    <div class="demo_198-account">
        <div class="mainContent">
            <div class="account-contain">
                <div class="account item">
                    <p class="title">账户</p>
                    <p class="cont">{{activityInfo.receiveAccount}}</p>
                </div>
                <div class="name item">
                    <p class="title">真实姓名</p>
                    <p class="cont">{{activityInfo.receiveTrueName}}</p>
                </div>
            </div>
            <div class="btn resetAccount" @click="resetAccount">账户重置</div>
        </div>
        <v-loading v-show="loading"></v-loading>
        <div class="setAccount popWindow" v-show="setAccountShow">
            <div class="mask"></div>
            <div class="setAccount-contain pop-contain">
                <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="closeSet">
                <div class="content-box">
                    <p class="title">收款支付宝设置</p>
                    <input type="text" class="mobileNum" v-model="account" placeholder="输入支付宝账号">
                    <img src="/static/images/activity/close_red.png" alt="" class="clear" @click="account='';" v-show="account.length>0">
                    <input type="text" class="trueName" v-model="trueName" placeholder="输入账户真实姓名">
                    <div class="btn-contain">
                        <div class="btn btn-bind" @click="setVipActivityAccount">确定</div>
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
        "v-loading": loading
    },
    data() {
        return {
            storeCode: this.$route.query.storeCode,
            staffCode: this.$route.query.staffCode,
            loading: false,
            shareTipShow: false,
            setAccountShow: false,
            account: "",
            trueName: "",
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
        //关闭设置
        closeSet(){
            if (!this.activityInfo.receiveAccount) {
                this.$router.back();
            }else{
                this.setAccountShow = false;
            }
        },
        //返回首页
        toHome(){
            let src = "/activity_2018/demo_198?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
            this.$router.replace(src);
        },
        //清除账户
        clear(){
            this.account = "";
        },
        //重置账户
        resetAccount: function(){
            this.setAccountShow = true;
        },
        //是否参加活动
        whetherAttend(){
            api.whetherAttendVipActivity("get",{},this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    if (res.returnContent.attendFlag===0) {
                        this.toHome();
                        return;
                    }
                    this.activityInfo = res.returnContent;
                    if (!this.activityInfo.receiveAccount) {
                        this.setAccountShow = true;
                    }
                    this.loading = false;
                }else if(res.returnCode==="10"){
                    let fullPath = location.pathname + location.search;
                    let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                    location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                }else{
                    this.$toast(res.message);
                    this.toHome();
                }
            })
        },
        //设置账户
        setVipActivityAccount: function(){
            if (this.account==="") {
                this.$toast("请输入账户");
                return;
            }
            if (this.trueName==="") {
                this.$toast("请输入账户真实姓名");
                return;
            }
            api.setVipActivityAccount("post",{
                "receiveAccount": this.account, // 收款账号
                "receiveTrueName": this.trueName // 收款真实姓名
            },this.tokenInfo.token).then((res)=>{
                if(res.returnCode==="0"){
                    this.account = "";
                    this.trueName = "";
                    this.setAccountShow = false;
                    this.whetherAttend();
                }else{
                    this.$toast(res.message);
                    this.setAccountShow = false;
                }
            })
        }
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
    .demo_198-account{
        position: relative;
        height: 101%;
        .mainContent{
            .account-contain{
                border-top: px2rem(10px) solid #f2f2f2;
                border-bottom: px2rem(10px) solid #f2f2f2;
                .item{
                    position: relative;
                    padding: 0 px2rem(30px);
                    overflow: hidden;
                    line-height: px2rem(102px);
                    &:after{
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: px2rem(700px);
                        height: 1px;
                        background-color: #f3f3f3;
                    }
                    .title{
                        float: left;
                        font-size: px2rem(32px);
                        color: #2c2c2c;
                    }
                    .cont{
                        float: right;
                        font-size: px2rem(32px);
                        color: #7c7c7c;
                    }
                }
            }
            .resetAccount{
                position: relative;
                margin: px2rem(64px) auto;
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
                transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
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
            .setAccount-contain{
                width: px2rem(606px);
                height: px2rem(554px);
                background-color: #fff;
                border-radius: px2rem(18px);
                .close{
                    top: px2rem(40px);
                }
                .title{
                    text-align: center;
                    line-height: px2rem(112px);
                    color: #1c1b20;
                    border-bottom: 1px solid #e7e7e7;
                }
                .mobileNum,.trueName{
                    display: block;
                    width: px2rem(520px);
                    margin: px2rem(20px) auto 0;
                    height: px2rem(90px);
                    font-size: px2rem(28px);
                    background-color: #fff;
                    text-indent: px2rem(8px);
                    border-bottom: 1px solid #dededf;
                    text-align: center;
                }
                .clear{
                    position: absolute;
                    top: px2rem(165px);
                    right: px2rem(60px);
                    width: px2rem(26px);
                    height: px2rem(26px);
                    z-index: 9;
                }
                .btn-contain{
                    margin-top: px2rem(70px);
                    text-align: center;
                    .btn-bind{
                        position: relative;
                        display: inline-block;
                        width: px2rem(424px);
                        height: px2rem(90px);
                        line-height: px2rem(90px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background: linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                        background: -webkit-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                        background: -moz-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                        border-radius: px2rem(50px);
                    }
                }
            }
        }
    }
</style>
