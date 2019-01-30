<template>
    <div class="pushing-guide-index">
        <activityHeader type="app" title="小推手"></activityHeader>
        <div class="main-container">
            <img src="/static/images/activity/guide/pushing/header.jpg" class="header-bg" alt="">
            <div class="main-content">
                <div class="slogan">身边店精选好货,为你提供商品挑选、购买链接、发货以及其他售后问题!你只需动动手指去转发，有人购买你就获得分红!门店销售拿工资, 手机转发赚分红！</div>
                <div class="act-container act-content">
                    <div class="title">— 活动内容 —</div>
                    <p class="intro-item"><span class="large">1.</span>点击商品下方“分享给会员”按钮</p>
                    <p class="intro-item"><span class="large">2.</span>保存图片或直接分享链接</p>
                    <p class="intro-item"><span class="large">3.</span>发送至微信朋友圈或微信好友</p>
                    <p class="intro-item"><span class="large">4.</span>有会员通过你的分享购买成功</p>
                    <p class="intro-item"><span class="large">5.</span>每成功销售一单你就获得对应分红。每满十单额外获得<span class="red"> {{productInfo.tenReward}}元 </span>奖励！（分红及奖励会在购买会员确认收货后发放）</p>
                </div>
                <div class="product-contain">
                    <div class="product-item" v-for="item in productInfo.productList">
                        <div class="left">
                            <img :src="item.productPicUrl" alt="" class="product-pic">
                            <div class="intro-btn" @click="showProductDetail(item)">查看商品介绍</div>
                        </div>
                        <div class="right">
                            <p class="name">{{item.productName}}</p>
                            <p class="bonus">分红<span class="red">{{item.staffCashBack}}元/单</span></p>
                            <p class="price">销售价格：<span class="red">{{item.salePrice}}元</span></p>
                            <div class="share-btn" v-if="item.activityStatus===1" @click="getShareImg(item)">分享给客户</div>
                            <div class="share-btn gray" v-else>分享给客户</div>
                        </div>
                    </div>
                </div>
                <div class="act-container data-content">
                    <div class="title">— 我的数据 —</div>
                    <p class="data-item">我已销售<br/><span class="red sheet">{{activityData.saleNum}} </span></p>
                    <p class="data-item">已完成订单<br/><span class="red sheet">{{activityData.completeNum}} </span></p>
                    <p class="data-item">已到账分红<br/><span class="red yuan">{{activityData.transferredCoupon}} </span></p>
                    <p class="data-item">额外奖励<br/><span class="red yuan">{{activityData.additionalCoupon}} </span></p>
                    <div class="tips-contain" v-show="showRules">
                        <p class="data-item">未到账分红<br/><span class="red yuan">{{activityData.notTransferredCoupon}} </span></p>
                        <p class="data-item">未完成订单<br/><span class="red sheet">{{activityData.notCompleteNum}} </span></p>
                        <div class="handle handle-fold">注意事项</div>
                        <p class="tips-item">1.所有的奖励都会在客户确认收到商品，即订单状态为已完成之后才发放，已关闭订单为无效订单，不计入奖励。</p>
                        <p class="tips-item">2.节假日及周日不发货，该期间发生的订单会在假日结束后第一个工作日处理。</p>
                        <p class="tips-item">3.如有其他问题请在工作日联系客服。</p>
                    </div>
                    <div class="handle handle-unfold" v-if="showRules" @click="showRules=false;">点击收起更多数据</div>
                    <div class="handle handle-unfold" v-else @click="showRules=true;">点击查看更多数据</div>
                </div>
                <div class="order-contain">
                    <p class="title">— 客户订单 —</p>
                    <div class="order-item" v-for="item in activityData.orderList">
                        <img :src="item.headPicUrl" alt="" class="product-pic">
                        <p class="cus-name">{{item.nickName}}</p>
                        <p class="product-name">{{item.productName}}*{{item.productSum}}</p>
                        <p class="order-num">订单编号：{{item.orderNum}}</p>
                        <p class="order-status">
                            <span v-if="item.orderStatus===1">待付款</span>
                            <span v-else-if="item.orderStatus===2" class="red-light">待发货</span>
                            <span v-else-if="item.orderStatus===3" class="red">已发货</span>
                            <span v-else-if="item.orderStatus===4" class="gray">已关闭</span>
                            <span v-else-if="item.orderStatus===5" class="blue">已完成</span>
                            <span v-else-if="item.orderStatus===6">已取消</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分享弹窗 -->
        <div class="popWindow" v-if="showShare">
            <div class="mask">
                <div class="share-contain pop-contain">
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="showShare=false;">
                    <img :src="shareImg" alt="" class="share-img">
                    <div class="pop-btn-contain">
                        <div class="share-btn btn" @click="savePic">保存图片</div>
                        <div class="exchange-btn btn" @click="doShare">链接分享</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品详情弹窗 -->
        <div class="popWindow" v-if="showDetail">
            <div class="mask">
                <div class="detail-contain pop-contain">
                    <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="showDetail=false;">
                    <div class="imgs-contain">
                        <img :src="item" alt="" class="detail-img" v-for="item in imgs">
                    </div>
                    <div class="pop-btn-contain">
                        <div class="detail-btn btn" @click="showDetail=false;">确定</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import api from '../../../../fetch/pushing_api'
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
                activityCode: "57739ead915d4247baa7f99709116da6",
                showRules: false,
                showShare: false,
                showDetail: false,
                linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/pushing_index",
                shareContent: {
                    title: "商品名称",
                    content: "每件商品都为你生活添彩，在你身边，为你精选！ ",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/pushing_index",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                selectedProduct: null,
                qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/pushing_index",
                shareImg: "",
                activityInfo: {},
                activityData: {
                    orderList: []
                },
                productInfo: {
                    productList: []
                },
                imgs: [],
                loading: false
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                api.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
            },
            //显示商品详情
            showProductDetail(item){
                this.collect({
                    "xdCode": "XD0007",
                    "ydCode": "YD0021",
                    "activityCode": this.activityCode,
                    "relBusinessCode": item.productCode
                });
                this.imgs = [...item.productDetailUrl.split(",")];
                this.showDetail = true;
            },
            //获取分享内容
            getShareImg(item){
                this.loading = true;
                let qrCodeUrl = this.qrCode + "&productCode=" + item.productCode;
                this.selectedProduct = item.productCode;
                this.shareContent.title = item.productName;
                this.shareContent.linkUrl = this.linkUrl + "&productCode=" + item.productCode;
                this.shareContent.imgUrl = item.productPicUrl  + '?imageView2/1/w/50/h/50/interlace/1/q/100';
                api.activityShareImageStaff("post",{
                    activityCode: this.activityCode,
                    backgroundImgUrl: item.sharePicUrl,
                    productCode: item.productCode,
                    startX: 308,
                    startY: 140,
                    qrContent: qrCodeUrl,
                    qrWidth: 110,
                    qrHeight: 110,
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.showShare = true;
                        this.shareImg = res.returnContent;
                    }else{
                        alert(res.message);
                    }
                    this.loading = false;
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
                    "activityCode": this.activityCode,
                    "relBusinessCode": this.selectedProduct
                });

                WebViewJavascriptBridge.callHandler('share',this.shareContent,function(response) {
                    alert("分享成功");
                });
            },
            getShopGuideInfo: function(){
                api.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.linkUrl = this.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                        this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/pushing_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0008";
                    }else{
                        alert(res.message);
                    }
                });
            },
            getActivityInfo(){
                api.activityInfo("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.productInfo = res.returnContent;
                        this.getShopGuideInfo();
                    }else{
                        alert(res.message);
                    }
                })
            },
            activityDataStaff(){
                api.activityDataStaff("post",{
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
                api.activityComplete("post",{
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
    .pushing-guide-index{
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
            background-color: #ff9501;
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
                .slogan{
                    font-size: px2rem(28px);
                    font-weight: bold;
                    color: #fff;
                    line-height: px2rem(50px);
                    text-indent: px2rem(56px);
                    width: px2rem(690px);
                    margin: px2rem(420px) auto 0;
                }
                .act-container{
                    position: relative;
                    width: px2rem(656px);
                    padding: px2rem(30px);
                    background-color: #fff;
                    overflow: hidden;
                    box-shadow: px2rem(11px) 0 px2rem(16px) rgba(150,98,0,.35);
                    &.act-content{
                        margin: px2rem(50px) auto 0;
                    }
                    &.data-content{
                        margin: px2rem(50px) auto 0;
                    }
                    .title{
                        font-family: "Simhei";
                        font-size: px2rem(36px);
                        font-weight: bold;
                        line-height: px2rem(66px);
                        text-align: center;
                        color: #343434;
                    }
                    .intro-item{
                        display: inline-block;
                        font-size: px2rem(24px);
                        color: #343434;
                        line-height: px2rem(50px);
                        .large{
                            font-size: px2rem(30px);
                            font-weight: bold;
                            color: #333;
                        }
                        .red{
                            font-size: px2rem(30px);
                            font-weight: bold;
                            color: #ff2929;
                        }
                    }
                    .data-item{
                        display: inline-block;
                        width: 49%;
                        font-size: px2rem(28px);
                        color: #343434;
                        line-height: px2rem(40px);
                        text-align: center;
                        padding: px2rem(10px) 0;
                        .red{
                            font-size: px2rem(50px);
                            font-weight: bold;
                            line-height: px2rem(100px);
                            color: #ff1f1f;
                            &.sheet{
                                &::after{
                                    font-size: px2rem(26px);
                                    content: "单";
                                }
                            }
                            &.yuan{
                                &::after{
                                    font-size: px2rem(26px);
                                    content: "元";
                                }
                            }
                        }
                    }
                    .tips-item{
                        font-size: px2rem(30px);
                        color: #343434;
                        line-height: px2rem(52px);
                    }
                    .tip{
                        font-weight: bold;
                        margin: px2rem(10px) 0;
                    }
                    .handle{
                        font-size: px2rem(30px);
                        color: #333;
                        text-align: center;
                        line-height: px2rem(88px);
                        text-decoration: underline;
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
                .product-contain{
                    width: px2rem(716px);
                    margin: 0 auto;
                    overflow: hidden;
                    .product-item{
                        overflow: hidden;
                        margin: px2rem(50px) auto 0;
                        background-color: #fff;
                        padding: px2rem(20px) px2rem(30px);
                        box-shadow: px2rem(11px) 0 px2rem(16px) rgba(150,98,0,.35);
                        .left{
                            float: left;
                            width: px2rem(306px);
                            text-align: center;
                            .product-pic{
                                width: px2rem(196px);
                                height: px2rem(196px);
                                background-color: #ccc;
                                margin: px2rem(40px) 0;
                            }
                            .intro-btn{
                                display: inline-block;
                                width: px2rem(228px);
                                line-height: px2rem(66px);
                                background-color: #ffeba3;
                                text-align: center;
                                font-size: px2rem(26px);
                                color: #444;
                            }
                        }
                        .right{
                            float: right;
                            width: px2rem(306px);
                            text-align: center;
                            p{
                                font-size: px2rem(30px);
                                color: #000;
                                line-height: px2rem(82px);
                                .red{
                                    font-size: px2rem(30px);
                                    font-weight: bold;
                                    color: #ff1c1c;
                                }
                            }
                            .name{
                                font-size: px2rem(34px);
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                margin-top: px2rem(20px);
                            }
                            .share-btn{
                                display: inline-block;
                                width: px2rem(228px);
                                line-height: px2rem(66px);
                                background-color: #ffdf6b;
                                text-align: center;
                                font-size: px2rem(26px);
                                color: #333;
                                margin-top: px2rem(18px);
                                &.gray{
                                    background-color: #dcdcdc;
                                }
                            }
                        }
                    }
                }
                .order-contain{
                    width: px2rem(716px);
                    margin: 0 auto px2rem(100px);
                    overflow: hidden;
                    .title{
                        font-size: px2rem(34px);
                        color: #fff;
                        font-weight: bold;
                        text-align: center;
                        margin-top: px2rem(50px);
                    }
                    .order-item{
                        position: relative;
                        overflow: hidden;
                        margin: px2rem(50px) auto 0;
                        background-color: #fff;
                        box-shadow: px2rem(11px) 0 px2rem(16px) rgba(150,98,0,.35);
                        .product-pic{
                            float: left;
                            width: px2rem(120px);
                            height: px2rem(120px);
                            background-color: #ccc;
                            margin: px2rem(26px) px2rem(20px);
                        }
                        p{
                            width: px2rem(400px);
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            font-size: px2rem(26px);
                            color: #000;
                            line-height: px2rem(46px);
                            &.cus-name{
                                font-size: px2rem(30px);
                                font-weight: bold;
                                margin-top: px2rem(20px);
                            }
                            &.order-num{
                                width: px2rem(550px);
                                color: #666;
                            }
                        }
                        .order-status{
                            position: absolute;
                            top: px2rem(30px);
                            right: px2rem(20px);
                            font-size: px2rem(34px);
                            color: #ff2121;
                            text-align: right;
                            .red-light{
                                color: #ff3131;
                            }
                            .red{
                                color: #df0404;
                            }
                            .blue{
                                color: #0309ff;
                            }
                            .gray{
                                color: #666;
                            }
                        }
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
                .share-img{
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
                        font-size: px2rem(26px);
                        font-weight: bold;
                        color: #333;
                        text-align: center;
                        background-color: #ffdf6b;
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
            /*商品详情*/
            .detail-contain{
                .imgs-contain{
                    position: relative;
                    margin: px2rem(80px) auto 0;
                    width: 95%;
                    max-height: px2rem(900px);
                    overflow-y: scroll;
                    z-index: 8;
                    .detail-img{
                        display: block;
                        width: 100%;
                    }
                }
                .detail-btn{
                    width: px2rem(250px);
                    height: px2rem(90px);
                    line-height: px2rem(90px);
                    font-size: px2rem(26px);
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                    background-color: #ffdf6b;
                    box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
                    margin: px2rem(30px) auto;
                }
            }
        }
    }
</style>
