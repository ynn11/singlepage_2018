<template>
    <div class="invite-newuser-index">
        <div class="main-container">
            <img src="/static/images/activity/applet/newMember/newmember_header.jpg" alt="" class="head-pic">
            <div class="rules-contain">
                <div class="rule-title">具体规则</div>
                <p class="item">1.新人专享券仅限此初次关注该店铺的用户领取,每天限量, 领完为止。</p>
                <p class="item">2.新人红包可在“我的卡券”查看，代金券仅限在对应门店使用，详可询问门店工作人员。</p>
                <p class="item">3.通过不正当手段获得奖励, 身边店有权撤销奖励及相关订单。</p>
                <p class="item">4.同一登录帐号、同一手机号、同一终端设备号、同一支付帐户、同一收货地址等合理显示为同一用户的情形, 均视为同一用户。</p>
            </div>
            <div class="store-info">
                <p>该活动由智成儿童商场举办</p>
                <img src="" alt="TAT" class="store-logo">
                <p>门店地址：江苏省丹阳市新民东路3号智成儿童商场（锦豪大酒店对面）</p>
                <a href="" class="call-btn">拨打电话</a>
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
        components: {
            "v-loading": loading,
            wxShareTip
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode||null,
                staffCode: this.$route.query.staffCode||null,
                memberCode: this.$route.query.memberCode||null,
                xd_code: this.$route.query.xd_code,
                activityCode: "f2ff673d880511e88e64704d7b87a020",
                showShare: false,
                activityInfo: {},
                storeSet: {},
                storeList: [],
                storeListShow: false,
                bindMobileNumShow: false,
                noStoreShow: false,
                shareTipShow: false,
                mobileNum: "",
                verificationCode: "",
                timer: 60,
                timerStatus: false,
                shareShow: false,
                loading: false
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
        otherFunc: {

        },
        methods: {

        },
        created(){
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .invite-newuser-index{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            background-size: 100% auto;
            background-color: #ff4b49;
            .head-pic{
                display: block;
                width: 100%;
            }
            .rules-contain{
                padding: px2rem(12px) px2rem(65px);
                .rule-title{
                    display: block;
                    width: px2rem(316px);
                    height: px2rem(75px);
                    background: url(/static/images/activity/applet/newMember/title_bg.png) center center;
                    background-size: 100% 100%;
                    margin: 0 auto;
                    font-size: px2rem(36px);
                    color: #fff;
                    text-align: center;
                    line-height: px2rem(60px);
                }
                .item{
                    font-size: px2rem(26px);
                    color: #fff;
                    margin: px2rem(30px) 0;
                    line-height: px2rem(32px);
                }
            }
            .store-info{
                background: url(/static/images/activity/applet/newMember/bottom_bg.png) bottom center no-repeat;
                background-size: 100% auto;
                overflow: hidden;
                .store-logo{
                    display: block;
                    width: px2rem(156px);
                    height: px2rem(156px);
                    border-radius: px2rem(16px);
                    box-shadow: 0 px2rem(10px) px2rem(18px) rgba(137,9,9,.35);
                    background-color: #fff;
                    margin: 0 auto;
                }
                p{
                    font-size: px2rem(26px);
                    color: #fff;
                    line-height: px2rem(32px);
                    margin: px2rem(30px) px2rem(60px);
                    text-align: center;
                }
                .call-btn{
                    display: block;
                    width: px2rem(180px);
                    height: px2rem(49px);
                    line-height: px2rem(49px);
                    border-radius: px2rem(8px);
                    background-color: #f9d400;
                    font-size: px2rem(24px);
                    color: #855604;
                    text-align: center;
                    margin: px2rem(30px) auto;
                }
            }
        }
    }
</style>
