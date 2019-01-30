<template>
    <div class="midautumn-boss-part1">
        <activityHeader type="perpage" title="迎中秋"></activityHeader>
        <div class="main-container">
            <img src="/static/images/activity/applet/midAutumn/header.jpg" class="header-bg" alt="">
            <img src="/static/images/activity/applet/midAutumn/bottom.jpg" class="bottom-bg" alt="">
            <div class="main-content">
                <div class="act-time"></div>
                <div class="act-container act-content">
                    <div class="title">------  活动内容  ------</div>
                    <p>1.你将活动分享给会员</p>
                    <p>2.会员打开你的分享，并在线支付69元购买中秋礼包（{{activityInfo.couponMoney}}元门店代金券一张，价值288元月饼一盒),分享活动至朋友圈后获得月饼兑换券你立即获得<span class="red"> {{activityInfo.staffShareBonus}}元 </span>销售礼包提成。</p>
                    <p>3.会员到店领取月饼，使用代金券购买服饰。你立即获得<span class="red"> {{activityInfo.staffBuyBonus}}元 </span>代金券使用提成。</p>
                    <p class="tip">1个中秋礼包售出并使用=你获得<span class="red"> {{Math.floor(activityInfo.staffShareBonus + activityInfo.staffBuyBonus)}}元</span>提成 ！</p>
                    <div class="rules-contain" v-if="showRules">
                        <p class="sub-tit">活动规则</p>
                        <p>1.每销售出一个中秋礼包，对应导购立即获得{{activityInfo.staffShareBonus}}元提成。每使用一张礼包中的门店代金券，对应导购立即获得{{activityInfo.staffBuyBonus}}元提成。会员在哪位导购的链接上支付购买，提成就给到哪位导购。</p>
                        <p>2.会员在线上购买中秋礼包后，需到店凭兑换码领取月饼，同时导购需在礼品兑换页核销该兑换码。</p>
                        <p>3.店内单件商品限用一张代金券。</p>
                        <div class="btn btn-fold" @click="showRules=false;">点击收起活动规则</div>
                    </div>
                    <div class="btn btn-unfold" v-else @click="showRules=true;">点击展开活动规则</div>
                </div>
                <div class="act-container data-content">
                    <div class="title">------  我的活动数据  ------</div>
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
        <div class="btn-contain">
            <div class="btn btn-left" @click="getShareImg">分享活动</div>
            <div class="btn btn-right" @click="checkPickcode=true;pickCode='';">礼品兑换</div>
        </div>
        <div class="popWindow" v-if="showShare">
            <div class="mask">
                <div class="share-contain pop-contain">
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="showShare=false;">
                    <img :src="shareImg" alt="" class="shareImg">
                    <div class="pop-btn-contain">
                        <div class="share-btn btn" @click="savePic">保存图片</div>
                        <div class="exchange-btn btn" @click="doShare">链接分享</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popWindow" v-if="checkPickcode">
            <div class="mask">
                <div class="check-contain pop-contain">
                    <p class="title">------  礼品兑换  ------</p>
                    <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="checkPickcode=false;pickCode='';">
                    <div class="barcode-contain">
                        <input type="text" placeholder="输入礼品码" v-model="pickCode">
                    </div>
                    <div class="confirm-btn" @click="activityComplete">确定</div>
                </div>
            </div>
        </div>
        <div class="popWindow" v-if="showTips">
            <div class="mask">
                <div class="tips-contain pop-contain">
                    <p class="title">------  礼品兑换  ------</p>
                    <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="showTips=false;pickCode='';">
                    <div class="content-tip" v-if="tipStatus===1">
                        <p class="title">领奖码错误<br>请重新输入</p>
                    </div>
                    <div class="content-tip" v-if="tipStatus===2">
                        <p class="title">奖品已经领取过<br/>&nbsp;</p>
                    </div>
                    <div class="content-tip" v-if="tipStatus===3">
                        <p class="title">恭喜您！礼品码兑换成功！<br/>请联系导购领取礼品</p>
                    </div>
                    <div class="content-tip" v-if="tipStatus===4">
                        <p class="title">请前往该门店兑换</p>
                        <p class="storeName"><i class="iconfont icon-shanghu"></i>{{tipStore}}</p>
                        <p class="storeAddr"><i class="iconfont icon-location"></i>{{tipAddr}}</p>
                    </div>
                    <div class="confirm-btn" @click="showTips=false;pickCode='';">确定</div>
                </div>
            </div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import midautumnApi from '../../../../fetch/midautumn_api'
    import _urlConfig from "../../../../util/urlConfig"
    import activityHeader from "@/components/common/activityHeader"
    import loading from '@/components/common/loading'

    export default {
        components:{
            "v-loading": loading,
            activityHeader,
            "mt-swipe": Swipe,
            "mt-swipe-item":SwipeItem
        },
        data() {
            return {
                token: this.$route.query.token||"",
                type: this.$route.query.type,
                activityCode: "07c88cf75b53489c99b503c15a9b0bd7",
                showRules: false,
                seipeList: [
                    "https://static.storeer.com/activity_2018/boss/midautumn/01.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/02.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/03.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/04.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/05.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/06.jpg",
                ],
                showShare: false,
                shareContent: {
                    title: "价值288元月饼免费送！",
                    content: "这个中秋礼包超值！数量有限，速戳来抢！",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/midautumn_index",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                shareBgSrc: "https://static.storeer.com/activity_2018/guide/midautumn/share_bg.jpg",
                qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/midautumn_index",
                shareImg: "",
                activityInfo: {},
                activityData: {},
                loading: false,
                showTips: false,
                tipStatus: 0,
                checkPickcode: false,
                tipStore: "",
                tipAddr: ""
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
                midautumnApi.activityShareImage("post",{
                    activityCode: this.activityCode,
                    backgroundImgUrl: this.shareBgSrc,
                    startX: 190,
                    startY: 662,
                    qrContent: this.qrCode,
                    qrWidth: 370,
                    qrHeight: 370,
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
                midautumnApi.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                        this.shareContent.content = `这个中秋礼包超值！数量有限，速戳来抢！`;
                        this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/midautumn_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0008";
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
            },
            //确认领奖
            activityComplete(){
                this.loading = true;
                if (!/\d{5}$/.test(this.pickCode)) {
                    this.checkPickcode = false;
                    this.showTips = true;
                    this.tipStatus = 1;
                    this.loading = false;
                    return;
                }
                midautumnApi.activityComplete("post",{
                    activityCode: this.activityCode,
                    pickCode: this.pickCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.showTips = true;
                        if (res.returnContent&&res.returnContent.storeName&&res.returnContent.connectAddress) {
                            this.tipStatus = 4;
                            this.tipStore = res.returnContent.storeName;
                            this.tipAddr = res.returnContent.connectAddress;
                        }else if(res.returnContent&&res.returnContent.pickFlag===1){
                            this.tipStatus = 2;
                        }else{
                            this.tipStatus = 3;
                        }
                    }else{
                        this.showTips = true;
                        this.tipStatus = 1;
                    }
                    this.checkPickcode = false;
                    this.loading = false;
                })
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
    .midautumn-boss-part1{
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
            background-color: #1a1934;
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
                        margin: px2rem(50px) auto px2rem(250px);
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
        .btn-contain{
            position: fixed;
            top: 100%;
            left: 50%;
            transform: translate(-50%,px2rem(-180px));
            width: px2rem(680px);
            overflow: hidden;
            z-index: 11;
            .btn{
                width: px2rem(250px);
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
                &.btn-left{
                    float: left;
                    margin: px2rem(25px) 0 px2rem(50px) px2rem(50px);
                }
                &.btn-right{
                    float: right;
                    margin: px2rem(25px) px2rem(50px) px2rem(50px) 0;
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
                    bottom: px2rem(65px);
                    left: 50%;
                    overflow: hidden;
                    width: px2rem(572px);
                    transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    -o-transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    z-index: 9;
                    .btn{
                        width: px2rem(250px);
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
                    }
                    .share-btn{
                        float: left;
                    }
                    .exchange-btn{
                        float: right;
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
