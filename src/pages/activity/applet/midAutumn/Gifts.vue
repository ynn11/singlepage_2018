<template>
    <div :class="'midautumn-boss-intro ' + [showRules?'static':'']">
        <div class="main-container">
            <img src="/static/images/activity/applet/midAutumn/header.jpg" class="header-bg" alt="">
            <img src="/static/images/activity/applet/midAutumn/bottom.jpg" class="bottom-bg" alt="">
            <div class="main-content">
                <div class="act-time"></div>
                <div class="act-container act-content">
                    <img class="corner top left" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <img class="corner top right" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <img class="corner bottom left" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <img class="corner bottom right" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <div class="store-info">
                        <p class="store-name">该活动由{{activityInfo.storeName}}举办</p>
                        <img :src="storeSet.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt="" class="logo">
                        <p class="addr">门店地址：{{activityInfo.connectAddress}}</p>
                    </div>
                    <div class="gifts-info">
                        <p class="gift-name">您的月饼兑换码</p>
                        <span class="pickcode">{{activityInfo.pickCode||"*****"}}</span>
                        <p class="gift-name">您的代金券</p>
                        <div class="coupons-contain">
                            <p class="value">{{storeSet.couponMoney}}</p>
                        </div>
                    </div>
                    <div class="rules-info">
                        <p class="rule-title">活动规则</p>
                        <p class="rule-item">1.月饼兑换券在活动期间有效，您可提前致电导购询问相关信息。</p>
                        <p class="rule-item">2.每件衣服限用一张代金券，详请进店询。</p>
                        <p class="rule-item">3.身边店对本活动有最终解释权。</p>
                    </div>
                    <div class="share-btn" @click="shareTipShow=true;">立即分享</div>
                </div>
                <div class="guide-info" v-if="activityInfo.linkStaffName&&activityInfo.linkStaffName!==null">
                    <p class="name">我的专属导购：{{activityInfo.linkStaffName}}</p>
                    <a :href="'tel:' + activityInfo.linkStaffMobileNum" class="call">联系导购</a>
                </div>
            </div>
        </div>
        <!-- 分享提示 -->
        <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import api from "../../../../fetch/common_api"
    import ActivityClass from "../../../../class/activity/ActivityClass"
    import _urlConfig from "../../../../util/urlConfig"
    import wxShareTip from "@/components/common/wxShareTip"
    import loading from '@/components/common/loading'

    export default {
        components:{
            "v-loading": loading,
            wxShareTip
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode||null,
                staffCode: this.$route.query.staffCode||null,
                memberCode: this.$route.query.memberCode||null,
                xd_code: this.$route.query.xd_code,
                activityCode: "07c88cf75b53489c99b503c15a9b0bd7",
                showRules: false,
                activityInfo: {},
                storeSet: {},
                shareTipShow: false,
                loading: false
            }
        },
        //判断重复进入
        beforeRouteEnter(to, from, next) {
            if (navigator.userAgent.match(/Android/i)){
                sessionStorage.entryMark1 = "marked"
                next();
                return;
            }else{
                next((vm) => {
                    if(sessionStorage.entryMark1 !== "marked"){
                        sessionStorage.entryMark1 = "marked"
                        vm.$router.go(0);
                        return;
                    }
                })
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
            routerLink(path){
                let src = path + "?storeCode=" + (this.storeCode||"") + "&staffCode=" + (this.staffCode||"") + "&xd_code=" + (this.xd_code||"")
                this.$router.push({
                    path: src
                })
            },
            //检查参加活动状态
            checkAttend(){
                this.whetherAttend(()=>{
                    if (this.activityInfo.shareFlag===0) {
                        this.routerLink("/activity_2018/midautumn_index");
                        return;
                    }else{
                        this.loading = false;
                        this.getStoreSet();
                    }
                    this.initWxShare({
                        title: "价值288元月饼免费送！",
                        desc: `这个中秋礼包超值！数量有限，速戳来抢！`,
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/midautumn_index?xd_code=XD0005&storeCode=' + (this.activityInfo.storeCode||"") + '&staffCode=' + (this.activityInfo.linkStaffCode||"") + '&memberCode=' + this.activityInfo.memberCode)
                    },()=>{
                        this.shareTipShow = false;
                    })
                });
            }
        },
        created(){
            //初始化公共方法
            new ActivityClass(this);
            this.getStoreSet(()=>{
                this.initWxConfig();
                this.checkAttend();
            });
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .midautumn-boss-intro{
        position: relative;
        height: 101%;
        &.static{
            overflow: hidden;
        }
        .main-container{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            /*overflow: hidden;*/
            background-color: #1a1934;
            padding-bottom: px2rem(30px);
            .header-bg{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1;
            }
            .bottom-bg{
                position: absolute;
                bottom: 0;
                width: 100%;
                z-index: 1;
            }
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                .act-time{
                    position: absolute;
                    top: px2rem(330px);
                    left: px2rem(315px);
                    width: px2rem(143px);
                    height: px2rem(24px);
                    background: url(/static/images/activity/applet/midAutumn/act-time.png) top center no-repeat;
                    background-size: 100% 100%;
                }
                .act-container{
                    position: relative;
                    width: px2rem(635px);
                    margin: px2rem(468px) auto 0;
                    padding: px2rem(30px) 0 px2rem(80px);
                    background-color: #f7f3af;
                    text-align: center;
                    overflow: hidden;
                    .corner{
                        position: absolute;
                        width: px2rem(60px);
                        height: px2rem(60px);
                        &.top{
                            top: px2rem(10px);
                        }
                        &.right{
                            right: px2rem(10px);
                            transform: rotateY(180deg);
                        }
                        &.bottom{
                            bottom: px2rem(10px);
                            transform: rotateZ(180deg);
                        }
                        &.left{
                            left: px2rem(10px);
                            transform: rotateX(180deg);
                            &.top{
                                transform: rotateX(0);
                            }
                        }
                    }
                    p{
                        font-size: px2rem(24px);
                        color: #714e04;
                        line-height: px2rem(50px);
                        padding: 0 px2rem(40px);
                        .red{
                            font-size: px2rem(30px);
                            color: #ff2525;
                        }
                    }
                    .store-info{
                        width: px2rem(544px);
                        margin: 0 auto;
                        border-bottom: 2px dashed #7e6b5a;
                        overflow: hidden;
                        .store-name{
                            font-size: px2rem(30px);
                            padding: 0 px2rem(60px);
                        }
                        .logo{
                            float: left;
                            width: px2rem(156px);
                            height: px2rem(156px);
                            margin: px2rem(20px);
                            border-radius: px2rem(12px);
                        }
                        .addr{
                            color: #583d04;
                            margin-top: px2rem(20px);
                        }
                    }
                    .gifts-info{
                        width: px2rem(544px);
                        margin: 0 auto;
                        border-bottom: 2px dashed #7e6b5a;
                        overflow: hidden;
                        .gift-name{
                            font-size: px2rem(36px);
                            color: #ef642e;
                            margin: px2rem(30px) 0;
                            text-align: center;
                        }
                        .pickcode{
                            font-size: px2rem(96px);
                            font-weight: bold;
                            line-height: px2rem(136px);
                            color: #583d04;
                            border: 2px solid #583d04;
                            border-radius: px2rem(10px);
                            padding: 0 px2rem(20px);
                            margin: px2rem(30px) 0;
                        }
                        .coupons-contain{
                            width: px2rem(492px);
                            height: px2rem(188px);
                            background: url(/static/images/activity/applet/midAutumn/coupons_bg.png) center no-repeat;
                            background-size: 100% 100%;
                            margin: px2rem(30px) auto;
                            .value{
                                font-family:"SimHei";
                                font-size: px2rem(130px);
                                line-height: px2rem(190px);
                                text-align: right;
                                padding: 0 px2rem(20px) 0 0;
                                color: #fff;
                                text-shadow: 0 px2rem(8px) px2rem(6px) rgba(120,71,224,.35);
                                &::before{
                                    content: "￥";
                                    font-family: initial;
                                    font-size: px2rem(40px);
                                }
                            }
                        }
                    }
                    .rules-info{
                        .rule-title{
                            font-size: px2rem(30px);
                            line-height: px2rem(50px);
                            color: #714e04;
                            margin: px2rem(30px) 0;
                        }
                        .rule-item{
                            font-size: px2rem(26px);
                            line-height: px2rem(50px);
                            color: #714e04;
                            text-align: left;
                        }
                    }
                    .share-btn{
                        width: px2rem(450px);
                        line-height: px2rem(90px);
                        font-size: px2rem(36px);
                        color: #714e04;
                        text-align: center;
                        background: linear-gradient(-78deg,#ffba00,#ffea00,#ffea00,#ffea00);
                        box-shadow: 0 px2rem(16px) px2rem(24px) px2rem(5px) rgba(60,105,114,.3);
                        border-radius: px2rem(20px);
                        margin: px2rem(30px) auto 0;
                    }
                }
                .guide-info{
                    padding: px2rem(30px) 0;
                    .name{
                        font-family: "SimHei";
                        font-size: px2rem(26px);
                        color: #fff;
                        line-height: px2rem(60px);
                        padding: 0 px2rem(50px);
                        text-align: center;
                    }
                    .call{
                        display: block;
                        width: px2rem(180px);
                        line-height: px2rem(50px);
                        margin: 0 auto;
                        font-size: px2rem(24px);
                        font-weight: bold;
                        color: #855604;
                        text-align: center;
                        background-color: #f9d400;
                        border-radius: px2rem(8px);
                    }
                }
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
                width: px2rem(674px);
                transform: translate(-50%,-50%);
                overflow: hidden;
                background-color: #fff;
                border-radius: px2rem(16px);
                text-align: center;
                .close{
                    position: absolute;
                    top: px2rem(32px);
                    right: px2rem(30px);
                    width: px2rem(32px);
                    height: px2rem(32px);
                    z-index: 9;
                }
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    line-height: px2rem(116px);
                    text-align: center;
                }
                .pop-title{
                    font-size: px2rem(40px);
                    line-height: px2rem(42px);
                    color: #333;
                    font-weight: bold;
                    margin: px2rem(30px) 0;
                    text-align: center;
                }
                p{
                    font-size: px2rem(32px);
                    line-height: px2rem(54px);
                    color: #333;
                }
                .btn{
                    width: px2rem(400px);
                    line-height: px2rem(90px);
                    font-size: px2rem(36px);
                    font-weight: bold;
                    color: #714e04;
                    text-align: center;
                    background: linear-gradient(-78deg,#ffba00,#ffea00,#ffea00,#ffea00);
                    border-radius: px2rem(20px);
                    margin: px2rem(30px) auto;
                }
            }
        }
    }
</style>
