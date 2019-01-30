<template>
    <div class="membership-mygifts">
        <div class="main-content">
            <img src="/static/images/activity/boss/membershipCard/header_bg.png" class="header-bg" alt="">
            <img src="/static/images/activity/applet/membershipCard/qr.png" alt="" class="qrcode">
          <div class="coupons-contain"  v-if="storeStatus==1">
            <img src="/static/images/activity/applet/membershipCard/coupons_package.png" alt="" class="coupons-bg">
            <p class="value">{{activityInfo.couponMoney}}</p>
            <p class="end-time">（限：{{activityInfo.couponEndTime}}前使用）<br/>代金券已成功发放至您的账户</p>
          </div>
            <div class="coupons-contain coupons-contain2"  v-else-if="storeStatus==2">
                <img src="/static/images/activity/applet/membershipCard/coupons_package2.png" alt="" class="coupons-bg">
                <p class="value">{{activityInfo.couponMoney}}</p>
                <p class="value-zhang">X5张</p>
                <p class="end-time">代金券已成功发放至您的账户</p>
            </div>

          <div class="coupons-contain  coupons-contain2"  v-else>
            <img src="/static/images/activity/applet/membershipCard/coupons_package.png" alt="" class="coupons-bg">
            <p class="value zommyBearCoupons">{{activityInfo.couponMoney}}</p>
            <p class="end-time">代金券已成功发放至您的账户</p>
          </div>


            <div class="pick-code">赠品领取码：{{activityInfo.pickCode}}</div>
            <div class="store-info">
                <div class="top">
                    <img :src="activityInfo.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt="">
                    <p class="name">{{activityInfo.storeName}}</p>
                </div>
                <p class="addr">领取地址：{{activityInfo.connectAddress}}</p>
            </div>
            <div class="share-line">
                <img src="/static/images/activity/applet/membershipCard/share_line.png" alt="" class="share-line-img">
                <p class="share-bonus">{{activityInfo.memBonus}}</p>
            </div>
            <a :href="'tel:' + activityInfo.linkStaffMobileNum" class="btn staffMobile" v-show="activityInfo.linkStaffMobileNum">导购电话：{{activityInfo.linkStaffMobileNum}}</a>
            <div class="btn" @click="shareTipShow=true;">一起分享一起赚钱</div>
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
                activityCode: "c6940ba3067b49cdb78018a14c29cf92",
                shareTipShow: false,
                loading: true,
                activityInfo: {},
                storeSet: {},
              storeStatus: 1,
              specialStore:"8bbc933e35334a4e98da3ad0cb53b541,9657338acae14804a734211703f16b07,8f00a07f106b4c8081134344d2c4228d,29e02e8a51a54f78bf32bf37a2957967,a2ccd2e79c1f44ada062dd8f0d2329bb"

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
      watch: {
        storeSet: function (val) {
          this.storeStatus = this.storeSet.participantType;
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
                    if (this.activityInfo.attendFlag===1&&this.activityInfo.pickFlag===1||this.activityInfo.attendFlag===0) {
                        this.routerLink("/activity_2018/mscard_index");
                        return;
                    }else{
                        this.loading = false;
                        this.getStoreSet();
                    }
                    this.initWxShare({
                        title: "我被卡了",
                        desc: "我被卡住了，快帮我卡出来",
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/mscard_index?xd_code=XD0005&storeCode=' + (this.activityInfo.storeCode||"") + '&staffCode=' + (this.activityInfo.linkStaffCode||"") + '&memberCode=' + (this.activityInfo.memberCode||""))
                    },()=>{
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0013",
                            "activityCode": this.activityCode,
                            "openId": this.openId,
                            "actJoinCode": this.activityInfo.actJoinCode
                        });
                        this.shareTipShow = false;
                        this.activityShare({
                            activityCode: this.activityCode,
                            actJoinCode: this.activityInfo.actJoinCode
                        });
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
            console.log(this.is);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membership-mygifts{
        position: relative;
        .main-content{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            background: url(/static/images/activity/boss/membershipCard/zebracrossing.jpg) center repeat-y;
            background-size: 100% auto;
            min-height: 101%;
            .header-bg{
                display: block;
                width: 100%;
            }
            .qrcode{
                display: block;
                width: px2rem(710px);
                margin: 0 auto;
            }
            .coupons-contain{
                position: relative;
                width: px2rem(710px);
                margin: 0 auto;
                .coupons-bg{
                    display: block;
                    width: 100%;
                }
                .value{
                    position: absolute;
                    top: px2rem(130px);
                    left: px2rem(440px);
                    width: px2rem(150px);
                    /*font-size: px2rem(80px);*/
                    font-size: px2rem(60px);
                    color: #fe2b56;
                    text-align: center;
                    white-space: nowrap;
                    &:before{
                        font-size: px2rem(42px);
                        /*font-size: px2rem(24px);*/
                        content: "￥";
                    };
                }
              .zommyBearCoupons{
                position: absolute;
                top: px2rem(140px);
                left: px2rem(440px);
                width: px2rem(150px);
                /*font-size: px2rem(80px);*/
                font-size: px2rem(40px);
                color: #fe2b56;
                text-align: center;
                white-space: nowrap;
                &:before{
                  font-size: px2rem(30px);
                  /*font-size: px2rem(24px);*/
                  content: "￥";
                  margin-right: -4px;
                  font-weight: 600;
                };
                  &:after{
                  font-size: px2rem(30px);
                  /*font-size: px2rem(24px);*/
                  content: "X2";
                };

              }
              .value-zhang{
                position: absolute;
                top: px2rem(190px);
                left: px2rem(440px);
                width: px2rem(150px);
                font-size: px2rem(26px);
                color: #fe2b56;
                text-align: center;
                white-space: nowrap;
              }
                .end-time{
                    position: absolute;
                    left: 0;
                    bottom: px2rem(45px);
                    width: 100%;
                    font-size: px2rem(26px);
                    color: #fff;
                    text-align: center;
                    line-height: px2rem(50px);
                }

            }
          .coupons-contain2{
            .end-time{
              position: absolute;
              left: 0;
              bottom: px2rem(75px);
              width: 100%;
              font-size: px2rem(30px);
              color: #fff;
              text-align: center;
              /*line-height: px2rem(50px);*/
            }
          }
            .pick-code{
                width: px2rem(650px);
                height: px2rem(102px);
                line-height: px2rem(102px);
                background-color: #fe2b56;
                text-align: center;
                margin: px2rem(80px) auto 0;
                border-radius: px2rem(16px);
                font-size: px2rem(30px);
                color: #fff;
            }
            .store-info{
                width: px2rem(650px);
                margin: px2rem(60px) auto;
                padding: px2rem(10px) px2rem(36px);
                background-color: #fe2b56;
                border-radius: px2rem(12px);
                box-sizing: border-box;
                .top{
                    padding: px2rem(30px) 0;
                    overflow: hidden;
                    border-bottom: 1px solid #fddc00;
                    img{
                        float: left;
                        width: px2rem(90px);
                        height: px2rem(90px);
                        border-radius: 50%;
                    }
                    .name{
                        float: left;
                        width: px2rem(420px);
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        line-height: px2rem(90px);
                        font-size: px2rem(26px);
                        color: #fff;
                        margin-left: px2rem(40px);
                    }
                }
                .addr{
                    font-size: px2rem(26px);
                    color: #fff;
                    line-height: px2rem(48px);
                    padding: px2rem(20px) 0;
                }
            }
            .share-line{
                position: relative;
                width: px2rem(750px);
                margin: px2rem(60px) auto px2rem(350px);
                .share-line-img{
                    display: block;
                    width: 100%;
                }
                .share-bonus{
                    position: absolute;
                    top: 0;
                    left: px2rem(514px);
                    font-size: px2rem(30px);
                    color: #fe2b56;
                    line-height: px2rem(109px);
                    width: px2rem(72px);
                    text-align: center;
                    white-space: nowrap;
                }
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
                background-color: #fe2b56;
                /*background: linear-gradient(-90deg, #108b10, #21c839);*/
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
