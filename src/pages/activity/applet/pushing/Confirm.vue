<template>
    <div class="pushing-confirm">
        <div class="main-container">
            <div class="addr-contain">
                <div class="header">收货地址<span class="change" @click="changeAddr">修改</span></div>
                <div class="addr-info" v-if="addrInfo.receiptInfoCode&&addrInfo.receiptInfoCode!==null">
                    <div class="icon"></div>
                    <p class="receipter">
                        <span>收货人：{{addrInfo.receipter}}</span>
                        <span class="phone">{{addrInfo.connectTel}}</span>
                    </p>
                    <p class="addr">收货地址：{{addrInfo.zone}}{{addrInfo.detailAddress}}</p>
                </div>
                <div class="no-info" v-else @click="changeAddr">
                    <img src="../../../../assets/images/activity/pushing/location.png" alt="" class="location">
                    <p>点击填写您的地址</p>
                </div>
            </div>
            <img src="../../../../assets/images/activity/pushing/ribbon.png" alt="" class="ribbon">
            <div class="product-contain">
                <img :src="activityInfo.productPicUrl" alt="" class="product-pic">
                <p class="product-name">{{activityInfo.productName}}</p>
                <p class="price-box"><span class="price">{{activityInfo.salePrice}}</span><span class="num">x{{productSum}}</span></p>
            </div>
            <div class="payinfo-contain">
                <p class="price"><span class="label">总&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</span><span class="num">{{activityInfo.salePrice*productSum}}</span></p>
                <p class="pay-method"><span class="label">支付方式</span>微信</p>
            </div>
            <div class="btn pay-btn" v-if="addrInfo.receiptInfoCode&&addrInfo.receiptInfoCode!==null" @click="buy">立即支付</div>
            <div class="btn pay-btn disable" v-else>立即支付</div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import api from "../../../../fetch/pushing_api"
    import _urlConfig from "../../../../util/urlConfig"
    import loading from '@/components/common/loading'

    export default {
        components: {
            "v-loading": loading
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode||null,
                staffCode: this.$route.query.staffCode||null,
                productCode: this.$route.query.productCode||null,
                productSum: ~~this.$route.query.productSum||1,
                xd_code: this.$route.query.xd_code,
                activityCode: "57739ead915d4247baa7f99709116da6",
                showShare: false,
                activityInfo: {},
                addrInfo: {},
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
        methods: {
            //数据收集
            collect(data,token){
                api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
            },
            //收货地址编辑
            changeAddr(){
                let src = "/activity_2018/pushing_address" + "?xd_code=" + (this.xd_code||"")
                this.$router.push({
                    path: src
                })
            },
            //获取活动商品信息相关
            getActivityContent(){
                api.activityContent("post",{
                    productCode: this.productCode,
                    activityCode: this.activityCode,
                    storeCode: this.activityInfo.storeCode||this.storeCode,
                    linkStaffCode: this.staffCode||null
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            //购买礼包/参加活动
            buy(){
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0020",
                    "activityCode": this.activityCode,
                    "openId": this.openId,
                    "relBusinessCode": this.productCode
                });
                api.activityAttend("post",{
                    activityCode: this.activityCode,
                    openId: this.openId,
                    productCode: this.productCode,
                    linkStaffCode: this.staffCode,
                    receiptInfoCode: this.addrInfo.receiptInfoCode,
                    productSum: this.productSum
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.wxPay(res.returnContent);
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            //微信支付调起
            wxPay: function(data){
                var _this = this;
                //微信调用
                if (data.envType===1) {
                    _this.linktoSuccess();
                    _this.loading = false;
                    return;
                }
                window.wx.ready(function(){
                    wx.chooseWXPay({
                        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paySign, // 支付签名
                        envType: data.envType,
                        success: (callRes)=> {
                            _this.collect({
                                "xdCode": _this.xd_code,
                                "ydCode": "YD0018",
                                "activityCode": _this.activityCode,
                                "openId": _this.openId,
                                "relBusinessCode": _this.productCode
                            });
                            // 支付成功后的回调函数
                            api.activityConfirm("post",{
                                activityCode: _this.activityCode,
                                orderNum: data.orderNum
                            },_this.tokenInfo.token).then((res)=>{
                                _this.linktoSuccess();
                                _this.loading = false;
                            });
                        },
                        fail:()=>{
                            _this.loading = false;
                        },
                        complete: ()=>{
                            _this.loading = false;
                        }
                    });
                });
            },
            //跳转到支付成功
            linktoSuccess(){
                let src = "/activity_2018/pushing_success?storeCode=" + (this.storeCode||"") + "&staffCode=" + (this.staffCode||"") + "&productCode=" + (this.productCode||"") + "&productSum=" + this.productSum + "&xd_code=" + (this.xd_code||"")
                this.$router.push({
                    path: src
                })
            },
            //获取收货地址信息
            activityOrderInfoConfirm(){
                api.activityOrderInfoConfirm("post",{
                    activityCode: this.activityCode
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.addrInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            initWxConfig(){
                api.getSignMap("post",{url: location.href}).then(res => {
                    let content = res.returnContent;
                    window.wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: content.appId, // 必填，公众号的唯一标识
                        timestamp: content.timestamp, // 必填，生成签名的时间戳
                        nonceStr: content.nonceStr, // 必填，生成签名的随机串
                        signature: content.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                });
            }
        },
        created(){
            this.getActivityContent();
            this.activityOrderInfoConfirm();
            this.initWxConfig();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .pushing-confirm{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            height: 100%;
            .addr-contain{
                .header{
                    line-height: px2rem(88px);
                    font-size: px2rem(28px);
                    color: #1b1b1b;
                    border-bottom: 1px solid #e4e4e4;
                    padding: 0 px2rem(30px);
                    .change{
                        float: right;
                        color: #666;
                    }
                }
                .addr-info{
                    position: relative;
                    overflow: hidden;
                    padding: 0 px2rem(30px);
                    .icon{
                        position: absolute;
                        top: 0;
                        left: px2rem(30px);
                        width: px2rem(60px);
                        height: px2rem(210px);
                        background: url(../../../../assets/images/activity/pushing/location.png) center center no-repeat;
                        background-size: px2rem(27px) px2rem(37px);
                    }
                    .receipter{
                        font-size: px2rem(32px);
                        line-height: px2rem(86px);
                        color: #333;
                        float: right;
                        width: px2rem(600px);
                        .phone{
                            float: right;
                        }
                    }
                    .addr{
                        font-size: px2rem(28px);
                        line-height: px2rem(42px);
                        color: #333;
                        float: right;
                        width: px2rem(600px);
                        margin: px2rem(15px) 0;
                    }
                }
                .no-info{
                    border: 2px solid #e60012;
                    height: px2rem(210px);
                    img{
                        display: block;
                        width: px2rem(55px);
                        margin: px2rem(40px) auto px2rem(20px);
                    }
                    p{
                        font-size: px2rem(36px);
                        color: #666;
                        text-align: center;
                    }
                }
            }
            .ribbon{
                display: block;
                width: 100%;
                margin: 0 auto;
            }
            .product-contain{
                padding: px2rem(30px);
                overflow: hidden;
                border-bottom: px2rem(20px) solid #eee;
                .product-pic{
                    float: left;
                    width: px2rem(190px);
                    background-color: #ccc;
                    border-radius: px2rem(4px);
                    height: px2rem(190px);
                }
                .product-name{
                    float: right;
                    width: px2rem(460px);
                    font-size: px2rem(28px);
                    line-height: px2rem(36px);
                    height: px2rem(70px);
                    color: #333;
                    word-break: break-all;
                    overflow: hidden;
                    margin-top: px2rem(10px);
                }
                .price-box{
                    float: right;
                    width: px2rem(460px);
                    overflow: hidden;
                    margin-top: px2rem(60px);
                    .price{
                        font-size: px2rem(36px);
                        color: #ff2929;
                        &::before{
                            content: "￥";
                            font-size: px2rem(18px);
                        }
                    }
                    .num{
                        float: right;
                        font-size: px2rem(36px);
                        color: #333;
                    }
                }
            }
            .payinfo-contain{
                padding: 0 px2rem(30px);
                p{
                    font-size: px2rem(30px);
                    color: #1b1b1b;
                    line-height: px2rem(100px);
                    text-align: right;
                    border-bottom: 1px solid #e4e4e4;
                    .label{
                        float: left;
                    }
                    .num{
                        &::before{
                            content: "￥";
                            font-size: px2rem(24px);
                        }
                    }
                }
            }
            .pay-btn{
                position: absolute;
                left: 50%;
                bottom: px2rem(90px);
                width: px2rem(500px);
                line-height: px2rem(80px);
                transform: translateX(-50%);
                font-size: px2rem(28px);
                color: #000;
                text-align: center;
                letter-spacing: px2rem(4px);
                background-color: #ffe200;
                border-radius: px2rem(100px);
                &.disable{
                    background-color: #bfbfbf;
                }
            }
        }
    }
</style>
