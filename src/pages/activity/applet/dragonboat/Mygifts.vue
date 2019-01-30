<template>
    <div class="dragonboat-mygifts">
        <div class="main-content">
            <img src="/static/images/activity/applet/dragonboat/mygifts_header_bg.jpg" class="header-bg" alt="">
            <div class="contain-box">
                <div class="contain">
                    <p class="title">这是您的领取码</p>
                    <p class="pickcode">{{activityInfo.pickCode}}</p>
                </div>
            </div>
            <div class="contain-box">
                <div class="contain">
                    <p class="title">这是您的代金券</p>
                    <div class="coupons-contain">
                        <div class="coupon-item">
                            <img src="/static/images/activity/applet/dragonboat/coupons_detail_bg.jpg" alt="">
                            <div class="coupon-money">{{storeSet.couponMoney||""}}</div>
                        </div>
                        <div class="coupon-item">
                            <img src="/static/images/activity/applet/dragonboat/coupons_detail_bg.jpg" alt="">
                            <div class="coupon-money">{{storeSet.couponMoney||""}}</div>
                        </div>
                        <div class="coupon-item">
                            <img src="/static/images/activity/applet/dragonboat/coupons_detail_bg.jpg" alt="">
                            <div class="coupon-money">{{storeSet.couponMoney||""}}</div>
                        </div>
                    </div>
                    <p class="use-tip">代金券使用规则：以线下门店为准</p>
                </div>
            </div>
            <div class="store-info">
                <p class="store-name">店铺名称：{{activityInfo.storeName}}</p>
                <p class="store-addr">门店地址：{{activityInfo.connectAddress}}</p>
                <!-- <p class="mobile" v-show="activityInfo.linkStaffMobileNum"><a :href="'tel:' + activityInfo.linkStaffMobileNum">导购电话：{{activityInfo.linkStaffMobileNum}}</a></p> -->
            </div>
            <a :href="'tel:' + activityInfo.linkStaffMobileNum" class="btn staffMobile" v-show="activityInfo.linkStaffMobileNum">导购电话：{{activityInfo.linkStaffMobileNum}}</a>
            <div class="btn" @click="shareTipShow=true;">将活动分享给好友</div>
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
                activityCode: "e7aa087b5e2e11e88e64704d7b87a020",
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
                        this.routerLink("/activity_2018/dragonboat_index");
                        return;
                    }else{
                        this.loading = false;
                        this.getStoreSet();
                    }
                    this.initWxShare({
                        title: "你没见过的粽子！",
                        desc: "这样的粽子，第一次见，免费送！这样的福利，第一次见，快来领！",
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/dragonboat_index?xd_code=XD0005&storeCode=' + (this.activityInfo.storeCode||"") + '&staffCode=' + (this.activityInfo.linkStaffCode||"") + '&memberCode=' + this.activityInfo.memberCode)
                    },()=>{
                        this.shareTipShow = false;
                    })
                });
            },
        },
        created(){
            //初始化公共方法
            new ActivityClass(this);
            this.initWxConfig();
            this.checkAttend();
        },
        mounted(){

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .dragonboat-mygifts{
        position: relative;
        height: 101%;
        .main-content{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            background-color: #ece9e1;
            .header-bg{
                display: block;
                width: 100%;
            }
            .contain-box{
                width: px2rem(635px);
                padding: px2rem(20px);
                background-color: #fff;
                margin: px2rem(20px) auto;
                .contain{
                    border: 1px dashed #7fcca1;
                    padding-bottom: px2rem(40px);
                    .title{
                        font-size: px2rem(30px);
                        color: #108c11;
                        line-height: px2rem(140px);
                        text-align: center;
                    }
                    .pickcode{
                        font-size: px2rem(48px);
                        color: #108c11;
                        width: px2rem(560px);
                        height: px2rem(92px);
                        line-height: px2rem(92px);
                        background-color: #ccebda;
                        border-radius: px2rem(16px);
                        margin: 0 auto;
                        text-align: center;
                    }
                    .coupons-contain{
                        padding: 0 px2rem(20px);
                        .coupon-item{
                            position: relative;
                            width: 100%;
                            margin-bottom: px2rem(40px);
                            box-shadow: 0 px2rem(8px) px2rem(27px) 0 rgba(4,92,4,.21);
                            img{
                                display: block;
                                width: 100%;
                            }
                            .coupon-money{
                                position: absolute;
                                top: px2rem(120px);
                                left: px2rem(12px);
                                width: px2rem(170px);
                                font-size: px2rem(70px);
                                text-align: center;
                                color: #fff;
                                &:after{
                                    content: "￥";
                                    font-size: px2rem(36px);
                                };
                            }
                        }
                    }
                    .use-tip{
                        font-size: px2rem(26px);
                        text-align: center;
                        color: #9d9d9d;
                    }
                }
            }
            .store-info{
                width: px2rem(635px);
                padding: 1px px2rem(20px);
                margin: 0 auto px2rem(330px);
                background-color: #f6f4f0;
                p{
                    font-size: px2rem(26px);
                    color: #343434;
                    line-height: px2rem(30px);
                    margin: px2rem(60px) 0;
                    padding-left: px2rem(40px);
                    text-align: left;
                    &:before{
                        font-size: px2rem(30px);
                        font-family:"iconfont";
                        color: #87a587;
                        margin-left: px2rem(-40px);
                        margin-right: px2rem(10px);
                    }
                }
                .store-name{
                    &:before{
                        content: "\e616";
                    }
                }
                .store-addr{
                    &:before{
                        content: "\e606";
                    }
                }
           /*     .mobile{
                    a{
                        color: #343434;
                    }
                    &:before{
                        content: "\e623";
                    }
                }*/
            }
            .btn{
                position: fixed;
                bottom: px2rem(60px);
                left: 50%;
                transform: translateX(-50%);
                -o-transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                width: px2rem(572px);
                height: px2rem(88px);
                line-height: px2rem(88px);
                font-size: px2rem(36px);
                color: #fff;
                text-align: center;
                background: linear-gradient(-90deg, #108b10, #21c839);
                border-radius: px2rem(100px);
                box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
                &.staffMobile{
                    font-size: px2rem(26px);
                    bottom: px2rem(200px);
                    background: linear-gradient(-90deg, #e85e13, #fbb630);
                    &:before{
                        content: "\e623";
                        font-size: px2rem(30px);
                        font-family:"iconfont";
                        color: #fff;
                        margin-left: px2rem(-40px);
                        margin-right: px2rem(30px);
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
