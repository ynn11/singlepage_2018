<template>
    <div class="midautumn-boss-part2">
        <activityHeader type="perpage" title="庆国庆"></activityHeader>
        <div class="main-container">
            <img src="/static/images/activity/guide/midAutumn/header.jpg" class="header-bg" alt="">
            <img src="/static/images/activity/guide/midAutumn/bottom.jpg" class="bottom-bg" alt="">
            <div class="main-content">
                <div class="act-time">活动时间：9.25-10.7</div>
                <div class="act-container act-content">
                    <div class="title">------  活动内容  ------</div>
                    <p>你的会员已收到门店打折券啦！<span class="red">{{activityInfo.commCouponQuota}}折 </span> 通用打折券一张，<span class="red">{{activityInfo.twoCouponQuota}}折 </span>两件以上可用打折券一张。快去告诉会员到店来使用吧！</p>
                    <br/>
                    <p>另外，活动期间新注册会员在注册成功后，也会自动发放这两张券哦。快告诉顾客让他享受优惠，成为你的新会员吧！</p>
                </div>
                <div class="act-container data-content">
                    <div class="title">------  我的国庆数据  ------</div>
                    <p>{{activityInfo.commCouponQuota}}折代金券已使用 <span class="red">{{activityData.commCouponQuotaNum}} </span>张</p>
                    <p>{{activityInfo.twoCouponQuota}}折代金券已使用 <span class="red">{{activityData.twoCouponQuotaNum}} </span>张</p>
                </div>
                <div class="act-container data-content">
                    <div class="title">------  我的中秋数据  ------</div>
                    <p>我的链接已转发 <span class="red">{{activityData.shareNum}} </span>次</p>
                    <p><span class="red">{{activityData.clickNum}} </span>人点击了我的链接</p>
                    <p><span class="red">{{activityData.buyNum}} </span>人通过我的链接购买</p>
                    <p><span class="red">{{activityData.pickNum}} </span>人已领取月饼</p>
                    <p><span class="red">{{activityData.useNum}} </span>人已使用代金券</p>
                    <br/>
                    <p>我获得共 <span class="red">{{activityData.totalBonus}} </span>元提成，其中</p>
                    <p>礼包售出奖励 <span class="red">{{activityData.saleBonus}} </span>元</p>
                    <p>代金券使用奖励 <span class="red">{{activityData.useBonus}} </span>元。</p>
                </div>
            </div>
        </div>
        <div class="btn btn-share" @click="getShareImg">立即分享</div>
        <div class="popWindow" v-if="showShare">
            <div class="mask">
                <div class="share-contain pop-contain">
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="showShare=false;">
                    <img :src="shareImg" alt="" class="shareImg">
                    <div class="pop-btn-contain">
                        <div class="share-btn btn" @click="savePic">保存图片</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import midautumnApi from '../../../../fetch/midautumn_api'
    import _urlConfig from "../../../../util/urlConfig"
    import activityHeader from "@/components/common/activityHeader"
    import loading from '@/components/common/loading'

    export default {
        components:{
            "v-loading": loading,
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token||"",
                type: this.$route.query.type,
                activityCode: "07c88cf75b53489c99b503c15a9b0bd7",
                showShare: false,
                shareBgSrc: "https://static.storeer.com/activity_2018/guide/midautumn/share_bg_2.jpg",
                qrCode: _urlConfig.redirectBaseredirectURI + "/concernStoreByQR",
                shareImg: "",
                activityInfo: {},
                activityData: {},
                loading: false
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                midautumnApi.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
            },
            //获取分享内容
            getShareImg(){
                this.loading = true;
                if (this.shareImg!=="") {
                    this.loading = false;
                    this.showShare = true;
                    return;
                }
                //假活动编号获取不同分享图
                midautumnApi.activityShareImage("post",{
                    activityCode: "07c88cf75basddas99b503c15a9b0bd7",
                    backgroundImgUrl: this.shareBgSrc,
                    startX: 226,
                    startY: 624,
                    qrContent: this.qrCode,
                    qrWidth: 309,
                    qrHeight: 309,
                },this.token).then((res)=>{
                    this.loading = false;
                    if(res.returnCode==="0"){
                        this.showShare = true;
                        this.shareImg = res.returnContent;
                    }else{
                        alert(res.message);
                    }
                });
            },
            //保存图片到本地
            savePic: function(){
                WebViewJavascriptBridge.callHandler('savePic',this.shareImg,function(response) {

                });
            },
            //分享
            doShare: function(){
                this.collect({
                    "xdCode": "XD0007",
                    "ydCode": "YD0010",
                    "activityCode": this.activityCode
                });
                WebViewJavascriptBridge.callHandler('share',this.shareContent,function(response) {
                    alert("分享成功");
                });
            },
            getShopGuideInfo: function(){
                this.loading = true;
                midautumnApi.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.qrCode = _urlConfig.redirectBaseredirectURI + "/concernStoreByQR?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0008";
                        this.loading = false;
                    }else{
                        alert(res.message);
                    }
                });
            },
            getActivityInfo(){
                midautumnApi.activityInfo("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                        this.getShopGuideInfo();
                    }else{
                        alert(res.message);
                    }
                })
            },
            activityDataStaff(){
                midautumnApi.activityDataStaff("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if (res.returnCode==="0") {
                        this.activityData = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            }
        },
        mounted(){
            this.getActivityInfo();
            this.activityDataStaff();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .midautumn-boss-part2{
        position: relative;
        height: 101%;
        &.static{
            overflow: hidden;
        }
        .main-container{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            padding-top: px2rem(80px);
            background-color: #f44433;
            .header-bg{
                position: absolute;
                top: px2rem(80px);
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
                padding-bottom: px2rem(200px);
                .act-time{
                    position: absolute;
                    top: px2rem(375px);
                    left: 0;
                    width: 100%;
                    height: px2rem(24px);
                    text-align: center;
                    font-size: px2rem(30px);
                    color: #FFF;
                }
                .act-container{
                    position: relative;
                    width: px2rem(656px);
                    padding: px2rem(30px);
                    background-color: #fff;
                    overflow: hidden;
                    box-sizing: border-box;
                    border-radius: px2rem(20px);
                    &.act-content{
                        margin: px2rem(542px) auto 0;
                    }
                    &.data-content{
                        margin: px2rem(50px) auto;
                    }
                    .title{
                        font-family: "Simhei";
                        font-size: px2rem(36px);
                        font-weight: bold;
                        line-height: px2rem(66px);
                        text-align: center;
                        color: #343434;
                    }
                    p{
                        font-size: px2rem(26px);
                        color: #343434;
                        line-height: px2rem(40px);
                        .red{
                            color: #ff2f2f;
                        }
                    }
                    .tip{
                        font-weight: bold;
                        margin: px2rem(10px) 0;
                    }
                    .btn{
                        width: px2rem(350px);
                        line-height: px2rem(80px);
                        font-size: px2rem(30px);
                        font-weight: bold;
                        color: #714e04;
                        text-align: center;
                        margin: px2rem(6px) auto;
                        background: linear-gradient(-102deg,#ffba00,#ffea00);
                        border-radius: px2rem(20px);
                        box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
                    }
                    .rules-contain{
                        .sub-tit{
                            font-size: px2rem(30px);
                            color: #333;
                            text-decoration: underline;
                            margin: px2rem(20px) 0;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .btn-share{
            position: fixed;
            top: 100%;
            left: 50%;
            transform: translate(-50%,px2rem(-180px));
            width: px2rem(450px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            font-size: px2rem(30px);
            font-weight: bold;
            color: #714e04;
            text-align: center;
            /*background: linear-gradient(-102deg,#ffba00,#ffea00);*/
            background-color: #ffe200;
            border-radius: px2rem(20px);
            box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
            z-index: 11;
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
                .top-wave{
                    display: block;
                    width: px2rem(472px);
                    height: px2rem(90px);
                    margin: px2rem(30px) auto 0;
                }
                .bottom-wave{
                    display: block;
                    width: px2rem(472px);
                    height: px2rem(90px);
                    margin: 0 auto px2rem(30px);
                    transform: rotateX(180deg);
                }
                .rules-contain{
                    position: relative;
                    overflow: hidden;
                    p{
                        font-size: px2rem(22px);
                        color: #714e04;
                        line-height: px2rem(32px);
                        padding: 0 px2rem(40px);
                        margin-bottom: px2rem(75px);
                        text-align: left;
                        b{
                            font-weight: bold;
                        }
                        &.title{
                            margin: 0 auto px2rem(20px);
                            text-align: center;
                            font-size: px2rem(40px);
                            line-height: px2rem(46px);
                            color: #6b3806;
                        }
                    }
                }
                .scroll-tip{
                    font-size: px2rem(20px);
                    line-height: px2rem(32px);
                    color: #ff9728;
                    padding-bottom: px2rem(20px);
                    text-align: center;
                    i{
                        font-size: px2rem(20px);
                        vertical-align: middle;
                    }
                }
                .close{
                    position: absolute;
                    top: px2rem(32px);
                    right: px2rem(30px);
                    width: px2rem(32px);
                    height: px2rem(32px);
                    z-index: 9;
                }
                .title{
                    font-size: px2rem(36px);
                    color: #343434;
                    line-height: px2rem(116px);
                    text-align: center;
                }
            }
            /*图片分享*/
            .share-contain{
                position: absolute;
                width: 100%;
                height: 100%;
                overflow-x: hidden;
                overflow-y: auto;
                background: transparent;
                .shareImg{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    -o-transform: translate(-50%,-50%);
                    -moz-transform: translate(-50%,-50%);
                    -webkit-transform: translate(-50%,-50%);
                    width: px2rem(426px);
                    height: px2rem(757px);
                    z-index: 8;
                }
                .pop-btn-contain{
                    position: absolute;
                    bottom: px2rem(90px);
                    left: 50%;
                    overflow: hidden;
                    width: px2rem(572px);
                    transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    -o-transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    z-index: 9;
                    .btn{
                        width: px2rem(450px);
                        height: px2rem(90px);
                        line-height: px2rem(90px);
                        font-size: px2rem(30px);
                        font-weight: bold;
                        color: #714e04;
                        text-align: center;
                        /*background: linear-gradient(-102deg,#ffba00,#ffea00);*/
                        background-color: #ffe200;
                        border-radius: px2rem(20px);
                        box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
                        margin: 0 auto;
                    }
                }
            }
            /*兑换码输入*/
            .check-contain{
                .barcode-contain{
                    position: relative;
                    overflow: hidden;
                    input{
                        width: px2rem(480px);
                        height: px2rem(80px);
                        background-color: #fff;
                        border-radius: px2rem(8px);
                        text-align: center;
                        box-sizing: border-box;
                        font-size: px2rem(26px);
                        border: px2rem(4px) solid #959595;;
                        margin: px2rem(64px) auto;
                    }
                }
                .confirm-btn{
                    width: px2rem(250px);
                    line-height: px2rem(90px);
                    font-size: px2rem(34px);
                    font-weight: bold;
                    color: #714e04;
                    text-align: center;
                    /*background: linear-gradient(-102deg,#ffba00,#ffea00);*/
                    background-color: #ffe200;
                    border-radius: px2rem(20px);
                    box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
                    margin: px2rem(50px) auto;
                }
            }
            /*提示*/
            .tips-contain{
                width: px2rem(594px);
                /*height: px2rem(486px);*/
                background-color: #fff;
                border-radius: px2rem(12px);
                box-shadow: px2rem(3px) 0 px2rem(7px) rgba(11,119,169,.15);
                overflow: hidden;
                .content-tip{
                    width: px2rem(440px);
                    text-align: center;
                    margin: px2rem(64px) auto;
                    .title{
                        font-size: px2rem(36px);
                        color: #333;
                        line-height: px2rem(48px);
                    }
                    .storeName,.storeAddr{
                        font-size: px2rem(24px);
                        line-height: px2rem(38px);
                        color: #9d9d9d;
                        margin: px2rem(35px) 0;
                        text-align: left;
                        i{
                            font-size: px2rem(18px);
                            color: #9d9d9d;
                            margin-right: px2rem(10px);
                        }
                    }
                }
                .confirm-btn{
                    width: px2rem(250px);
                    line-height: px2rem(90px);
                    font-size: px2rem(34px);
                    font-weight: bold;
                    color: #714e04;
                    text-align: center;
                    /*background: linear-gradient(-102deg,#ffba00,#ffea00);*/
                    background-color: #ffe200;
                    border-radius: px2rem(20px);
                    box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
                    margin: px2rem(50px) auto;
                }
            }
        }
    }
</style>
