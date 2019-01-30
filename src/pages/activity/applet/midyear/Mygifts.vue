<template>
    <div class="midyear-mygifts">
        <div class="main-container">
            <div class="main-content">
                <img src="/static/images/activity/applet/midyear/intro_header.png" alt="" class="header">
                <div class="act-time">
                    <div class="time-contain">
                        <p>巅峰让利招募 超值会员服务</p>
                        <!-- <p><span>2018年7月30日</span>到<span>8月20日</span>正式开启</p> -->
                    </div>
                </div>
                <div class="gift-contain">
                    <div class="pickcode-box out-box">
                        <div class="box">
                            <p class="tip">这是您的领取码</p>
                            <div class="pick-code">{{activityInfo.pickCode}}</div>
                        </div>
                    </div>
                    <div class="coupon-box out-box">
                        <div class="box">
                            <p class="tip">这是您的代金券</p>
                            <div class="coupon">
                                <img src="/static/images/activity/applet/midyear/coupon_bg.jpg" alt="">
                                <p class="value">{{storeSet.couponMoney}}元</p>
                            </div>
                            <p class="use-tip">代金券使用规则：以线下门店为准</p>
                        </div>
                    </div>
                    <div class="addr-box out-box">
                        <div class="box">
                            <p class="storename"><i class="iconfont icon-shanghu"></i>{{storeSet.storeName}}</p>
                            <p class="storeaddr"><i class="iconfont icon-location"></i>{{storeSet.connectAddress}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-contain">
            <a :href="'tel:' + activityInfo.linkStaffMobileNum" class="btn staff-mobile" v-show="activityInfo.linkStaffMobileNum">导购电话：{{activityInfo.linkStaffMobileNum}}</a>
            <div class="btn share-btn" @click="shareTipShow=true;">将活动分享给好友</div>
        </div>
        <v-loading v-show="loading"></v-loading>
        <!-- 分享提示 -->
        <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
    </div>
</template>

<script>
    import ActivityClass from "../../../../class/activity/ActivityClass"
    import _urlConfig from "../../../../util/urlConfig"
    import wxShareTip from "@/components/common/wxShareTip"
    import loading from '@/components/common/loading'
    export default {
        components: {
            "v-loading": loading,
            wxShareTip
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
        data() {
            return {
                storeCode: this.$route.query.storeCode||null,
                staffCode: this.$route.query.staffCode||null,
                memberCode: this.$route.query.memberCode||null,
                xd_code: this.$route.query.xd_code,
                activityCode: "f2ff673d880511e88e64704d7b87a020",
                shareTipShow: false,
                loading: true,
                activityInfo: {},
                storeSet: {}
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
                        this.routerLink("/activity_2018/midyear_index");
                        return;
                    }else{
                        this.loading = false;
                        this.getStoreSet();
                    }
                    this.initWxShare({
                        title: "第一个想到你",
                        desc: `我已领到${this.storeSet.goodsCode==='001'?'3D瘦脸仪':'健康保健枕'}，加入超级会员立享特权，名额有限，赶紧去领！`,
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/midyear_index?xd_code=XD0005&storeCode=' + (this.activityInfo.storeCode||"") + '&staffCode=' + (this.activityInfo.linkStaffCode||"") + '&memberCode=' + this.activityInfo.memberCode)
                    },()=>{
                        this.shareTipShow = false;
                    })
                });
            },
        },
        created(){
            //初始化公共方法
            new ActivityClass(this);
            this.getStoreSet(()=>{
                this.initWxConfig();
                this.checkAttend();
            });
        },
        mounted(){

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .midyear-mygifts{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            background: url(/static/images/activity/applet/midyear/gift_bg.jpg) top center no-repeat;
            background-size: 100% auto;
            background-color: #49efd0;
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                padding-bottom: px2rem(280px);
                .header{
                    display: block;
                    width: px2rem(690px);
                    margin: px2rem(28px) auto 0;
                }
                .act-time{
                    background: linear-gradient(63deg, #ff0a60, #87fede);
                    width: px2rem(678px);
                    padding: px2rem(6px);
                    border-radius: px2rem(60px);
                    margin: px2rem(15px) auto 0;
                    .time-contain{
                        border-radius: px2rem(60px);
                        overflow: hidden;
                        background-color: #6a00e1;
                        p{
                            font-size: px2rem(26px);
                            color: #fff;
                            margin: px2rem(35px) 0;
                            text-align: center;
                            span{
                                color: #7bfec8;
                            }
                        }
                    }
                }
                .gift-contain{
                    position: relative;
                    margin: px2rem(220px) auto 0;
                    .out-box{
                        position: relative;
                        background: linear-gradient(12deg, #890aff, #e426ba);
                        width: px2rem(632px);
                        padding: px2rem(6px);
                        border-radius: px2rem(20px);
                        margin: px2rem(30px) auto 0;
                        z-index: 9;
                        .box{
                            position: relative;
                            background-color: #fff;
                            border-radius: px2rem(20px);
                            overflow: hidden;
                            .tip{
                                font-size: px2rem(30px);
                                line-height: px2rem(150px);
                                color: #5c00bb;
                                text-align: center;
                            }
                            .pick-code{
                                font-size: px2rem(48px);
                                color: #5c00bb;
                                line-height: px2rem(94px);
                                width: px2rem(560px);
                                height: px2rem(94px);
                                background: #ffe3f3;
                                border-radius: px2rem(16px);
                                text-align: center;
                                margin: 0 auto px2rem(100px);
                            }
                            .coupon{
                                position: relative;
                                width: px2rem(564px);
                                margin: 0 auto ;
                                box-shadow: 0 px2rem(8px) px2rem(8px) px2rem(7px) rgba(92,13,0,.1);
                                img{
                                    display: block;
                                    width: 100%;
                                }
                                .value{
                                    position: absolute;
                                    top: px2rem(130px);
                                    left: 0;
                                    width: 100%;
                                    font-size: px2rem(56px);
                                    text-align: center;
                                    background: linear-gradient(0, #e7388a, #ed7550);
                                    -webkit-background-clip: text;
                                    color: transparent;
                                }
                            }
                            .use-tip{
                                font-size: px2rem(26px);
                                color: #9d9d9d;
                                line-height: px2rem(100px);
                                text-align: center;
                            }
                        }
                        &.addr-box{
                            .box{
                                padding: px2rem(50px) px2rem(34px);
                                i{
                                    font-size: px2rem(26px);
                                    font-weight: bold;
                                    color: #c666a1;
                                    margin-right: px2rem(15px);
                                }
                                p{
                                    font-size: px2rem(24px);
                                    line-height: px2rem(34px);
                                    color: #5c00bb;
                                    margin-top: px2rem(28px);
                                }
                            }
                        }
                    }
                }
            }
        }
        .btn-contain{
            position: fixed;
            bottom: px2rem(50px);
            left: 50%;
            width: px2rem(632px);
            transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -o-transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            z-index: 9;
            .btn{
                display: block;
                width: 100%;
                height: px2rem(90px);
                line-height: px2rem(90px);
                box-shadow: 0 px2rem(16px) px2rem(24px) px2rem(5px) rgba(60,105,114,.3);
                font-size: px2rem(32px);
                color: #fff;
                text-align: center;
                border-radius: px2rem(100px);
            }
            .staff-mobile{
                background: linear-gradient(-90deg, #ed0567, #f9c908);
            }
            .share-btn{
                margin-top: px2rem(30px);
                background: linear-gradient(-90deg, #33dbff, #ff3b93);
            }
        }
    }
</style>
