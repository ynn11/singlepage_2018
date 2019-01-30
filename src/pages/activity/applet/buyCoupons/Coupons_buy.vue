<template>
    <div class="coupons_buy-box">
        <div class="mainContent">
            <img src="/static/images/activity/applet/buyCoupons/buy_bg.jpg" class="main_bg" alt="">
            <div class="pay-contain">
                <div class="storeInfo">
                    <img :src="storeSet.storeLogoUrl" alt="" class="logo">
                    <p class="storeName">{{storeSet.storeName}}</p>
                    <p class="storeAddr"><i class="iconfont icon-location"></i>{{storeSet.connectAddress}}</p>
                </div>
                <div class="coupons-contain">
                    <img src="/static/images/activity/applet/buyCoupons/select_tit.png" alt="" class="slect-tit">
                    <div class="coupons-box">
                        <div class="coupons-item" v-for="(item,index) in storeSet.voucherList" @click="selectedVoucherCode=item.voucherCode;">
                            <img src="/static/images/activity/applet/buyCoupons/coupons_30.jpg" alt="" class="" v-if="item.voucherCode==='e47605d8d3514fa09c2b30e55c55f915'" class="coupons">
                            <img src="/static/images/activity/applet/buyCoupons/coupons_60.jpg" alt="" class="" v-if="item.voucherCode==='3740359ecdce11e78c93704d7b87a020'" class="coupons">
                            <div class="select-box">
                                <img src="/static/images/activity/applet/buyCoupons/selected.png" alt="" v-show="item.voucherCode===selectedVoucherCode" class="selected">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="introduce-contain">
                    <img src="/static/images/activity/applet/buyCoupons/introduce_tit.png" alt="" class="introduce-tit">
                    <p class="item">1. 请选择以上任意一张代金券，然后点击购买</p>
                    <p class="item">2. 代金券可以在您的支付的店内使用</p>
                    <p class="item">3. 每间门店只可购买使用一张代金券</p>
                </div>
                <div class="pay-btn" @click="commitOrder">我要支付</div>
            </div>
        </div>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
                <img class="pop_bg" src="/static/images/activity/applet/buyCoupons/pop_bind.png" alt="">
                <div class="content-box">
                    <input type="number" class="mobileNum" v-model="mobileNum" placeholder="输入您的手机号码">
                    <div class="rows">
                        <input type="number" placeholder="" class="verificationCode" placeholder="输入验证码" v-model="verificationCode">
                        <div class="sendvCode" @click="sendvCode" v-show="!timerStatus">获取</div>
                        <div class="sendvCode run" v-show="timerStatus">{{timer}}s</div>
                    </div>
                    <div class="btn-contain">
                        <div class="btn btn-bind" @click="bindMobileNum">绑定</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 没有门店 -->
        <div class="noStore popWindow" v-show="noStoreShow">
            <div class="mask" @click="noStoreShow=false;"></div>
            <div class="noStore-contain pop-contain">
                <img class="pop_bg" src="/static/images/activity/applet/buyCoupons/pop_nostore.png" alt="">
            </div>
        </div>
        <!-- 门店列表 -->
        <div class="storeList popWindow" v-if="storeListShow">
            <div class="mask"></div>
            <div class="storeList-contain pop-contain">
                <img class="pop_bg" src="/static/images/activity/applet/buyCoupons/pop_select_store.png" alt="">
                <div class="content-box">
                    <div class="listBox">
                        <div class="listItem" v-for="(item,index) in storeList" @click="selectStore(item);">
                            <img class="icon" :src="item.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt=""/>
                            <div class="">
                                <div class="name">{{item.storeName}}</div>
                                <div class="detail"><i class="iconfont icon-location"></i>{{item.connectAddress}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../../fetch/api'
    import * as _tool from "../../../../util/tool"
    import * as _validate from "../../../../util/validate"
    import _urlConfig from "../../../../util/urlConfig"
    export default {
        components: {
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode,
                staffCode: this.$route.query.staffCode,
                memberCode: this.$route.query.memberCode,
                xd_code: this.$route.query.xd_code,
                bindMobileNumShow: false,
                noStoreShow: false,
                storeList: [],
                storeListShow: false,
                mobileNum: "",
                verificationCode: "",
                timer: 60,
                timerStatus: false,
                storeSet: {},
                selectedVoucherCode: "",
                paying: false
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
            collect: function(data,token){
                if (token) {
                    api.collectStatisticsOnActivities("post",data,token).then(res => {});
                }else{
                    api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
                }
            },
            //验证码倒计时
            runTimer: function() {
                if (this.timer > 0) {
                    --this.timer
                    setTimeout(this.runTimer, 1000);
                }else{
                    this.timerStatus = false
                }
            },
            //绑定手机号
            bindMobileNum() {
                let data = {
                    "mobileNum": this.mobileNum,
                    "verificationCode": this.verificationCode,
                    "appEntranceType": 3
                }
                if (_validate.mobile(data.mobileNum)!==true) {
                    alert(_validate.mobile(data.mobileNum));
                    return;
                }
                if (_validate.verificationCode(data.verificationCode)!==true) {
                    alert(_validate.verificationCode(data.verificationCode));
                    return;
                }
                api.memFansBindMobileNum("post",data,this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        this.$store.dispatch("_login",{tokenInfo: JSON.stringify(res.returnContent),openId: this.openId});
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0005",
                            "activityCode": "b94f745886cb42219d22250d4bb51f47",
                            "openId": this.openId
                        },res.returnContent.token);
                        this.checkStore();
                    }else{
                        alert(res.message);
                    }
                })
            },
            //发送绑定验证码
            sendvCode: function(){
                if (_validate.mobile(this.mobileNum)!==true) {
                    alert(_validate.mobile(this.mobileNum))
                    return;
                }
                let data = {
                    "mobileNum":this.mobileNum,
                    "verificationType": 5
                };
                api.sendVerificationCode("get",data).then((res)=>{
                    if(res.returnCode==="0"){
                        this.timer = 60;
                        this.timerStatus = true;
                        this.runTimer();
                    }else{
                        alert(res.message);
                    }
                });
            },
            //门店选取
            checkStore: function(){
                this.bindMobileNumShow = false;
                if (!this.storeCode) {
                    this.loadStoreList();
                }else{
                    this.getStoreSet();
                }
            },
            //加载门店列表
            loadStoreList: function(){
                api.getMemberStoreInfoList("get",{appuserCode: this.tokenInfo.imInfo.accId},this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.storeList = res.returnContent;
                        if (this.storeList.length===0) {
                            this.collect({
                                "xdCode": this.xd_code,
                                "ydCode": "YD0011",
                                "activityCode": "b94f745886cb42219d22250d4bb51f47",
                                "openId": this.openId
                            });
                            this.noStoreShow = true;
                        }else if (this.storeList.length===1) {
                            this.storeCode = res.returnContent[0].storeCode;
                            this.getStoreSet();
                        }else{
                            this.storeListShow = true;
                        }
                    }else{
                        alert(res.message);
                    }
                });
            },
            //门店选择
            selectStore: function(item){
                this.storeCode = item.storeCode;
                this.getStoreSet();
            },
            //获取门店活动设置
            getStoreSet: function(){
                let data = {
                    "storeCode": this.storeCode
                }
                api.getAttendArtifactActivityStore("get",data,this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        this.storeSet = res.returnContent;
                        this.storeListShow = false;
                    }else{
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0011",
                            "activityCode": "b94f745886cb42219d22250d4bb51f47",
                            "openId": this.openId
                        });
                        alert(res.message);
                    }
                })
            },
            //提交活动订单
            commitOrder: function(){
                if (this.selectedVoucherCode==="") {
                    alert("请先选择购买面额");
                    return;
                }
                if (this.paying===true) {
                    return;
                }
                this.paying = true;
                let data = {
                    "openId": this.openId, // 微信公众号用户id
                    "storeCode": this.storeCode, // 门店编号
                    "voucherCode": this.selectedVoucherCode, // 券面额编号
                    "srcStaffCode": this.staffCode||"", // 来源导购编号
                    "srcMemberCode": this.memberCode||"" // 来源分享会员编号
                }
                api.commitArtifactActivityOrder("post",data,this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        this.wxPay(res.returnContent);
                        this.paying = false;
                    }else{
                        alert(res.message);
                        this.paying = false;
                    }
                })
            },
            //微信支付调起
            wxPay: function(data){
                var that = this;
                //微信调用
                window.wx.ready(function(){
                    wx.chooseWXPay({
                        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paySign, // 支付签名
                        success: function (callRes) {
                            if (that.selectedVoucherCode === "e47605d8d3514fa09c2b30e55c55f915") {
                                that.collect({
                                    "xdCode": that.xd_code,
                                    "ydCode": "YD0006",
                                    "activityCode": "b94f745886cb42219d22250d4bb51f47",
                                    "openId": that.openId
                                });
                            }else{
                                that.collect({
                                    "xdCode": that.xd_code,
                                    "ydCode": "YD0007",
                                    "activityCode": "b94f745886cb42219d22250d4bb51f47",
                                    "openId": that.openId
                                });
                            }
                            // 支付成功后的回调函数
                            api.confirmArtifactActivityOrderPaid("get",{orderNum: data.orderNum}).then((res)=>{
                                that.paidRouter();
                            });
                        }
                    });
                });
            },
            //支付成功跳转
            paidRouter: function(){
                let src = "/activity/coupons_success?xd_code=" + this.xd_code;
                this.$router.replace(src);
            },
            //初始化微信
            initWxConfig(){
                api.getSignMap("post",{url: location.href}).then(res => {
                    let content = res.returnContent;
                    window.wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: content.appId, // 必填，公众号的唯一标识
                        timestamp: content.timestamp, // 必填，生成签名的时间戳
                        nonceStr: content.nonceStr, // 必填，生成签名的随机串
                        signature: content.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareAppMessage','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                });
            },
            //是否参加活动
            whetherAttend: function(){
                api.whetherAttendArtifactActivity("get",{},this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        if (res.returnContent.isAlreadyShare===1||res.returnContent.attendFlag===1) {
                            let src = "/activity/coupons_success?k=1";
                            this.$router.replace(src);
                        }
                    }else if(res.returnCode==="10"){
                        let fullPath = location.pathname + location.search;
                        let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                        location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                    }else{
                        alert(res.message);
                    }
                })
            },
        },
        mounted(){
            //初始化sdk
            this.initWxConfig();
            this.whetherAttend();
            if (this.tokenInfo.imInfo===null){
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0004",
                    "activityCode": "b94f745886cb42219d22250d4bb51f47",
                    "openId": this.openId
                });
                this.bindMobileNumShow = true;
            }else{
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0003",
                    "activityCode": "b94f745886cb42219d22250d4bb51f47",
                    "openId": this.openId
                });
                this.checkStore();
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .coupons_buy-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            height: 100%;
            .main_bg{
                display: block;
                width: 100%;
            }
            .pay-contain{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                .storeInfo{
                    position: relative;
                    overflow: hidden;
                    .logo{
                        float: left;
                        width: px2rem(160px);
                        height: px2rem(160px);
                        border-radius: 50%;
                        background-color: #000;
                        margin: px2rem(70px) px2rem(40px) 0 px2rem(60px);
                    }
                    .storeName{
                        font-size: px2rem(38px);
                        color: #fff;
                        margin-top: px2rem(90px);
                    }
                    .storeAddr{
                        font-size: px2rem(24px);
                        color: #fff;
                        margin-top: px2rem(30px);
                        i{
                            font-size: px2rem(24px);
                            margin-right: px2rem(10px);
                        }
                    }
                }
                .coupons-contain{
                    position: relative;
                    margin-top: px2rem(70px);
                    .slect-tit{
                        display: block;
                        width: px2rem(289px);
                        margin: 0 auto;
                    }
                    .coupons-box{
                        width: px2rem(640px);
                        background-color: #fff;
                        margin: px2rem(30px) auto 0;
                        overflow: hidden;
                        border-radius: px2rem(24px);
                        .coupons-item{
                            position: relative;
                            width: px2rem(578px);
                            margin: px2rem(30px) auto;
                            .coupons{
                                display: block;
                                width: 100%;
                            }
                            .select-box{
                                position: absolute;
                                top: px2rem(54px);
                                right: px2rem(20px);
                                width: px2rem(44px);
                                height: px2rem(44px);
                                background-color: #fff;
                                border-radius: 50%;
                                .selected{
                                    width: px2rem(24px);
                                    margin: px2rem(10px);
                                }
                            }
                        }
                    }
                }
                .introduce-contain{
                    position: relative;
                    margin-top: px2rem(64px);
                    .introduce-tit{
                        display: block;
                        width: px2rem(750px);
                        margin: 0 auto;
                    }
                    .item{
                        font-size: px2rem(24px);
                        color: #fff;
                        text-indent: px2rem(60px);
                        margin-top: px2rem(24px);
                    }
                }
                .pay-btn{
                    position: relative;
                    margin: px2rem(100px) auto;
                    width: px2rem(614px);
                    height: px2rem(119px);
                    line-height: px2rem(119px);
                    font-size: px2rem(36px);
                    color: #fff;
                    text-align: center;
                    background: url(/static/images/activity/applet/buyCoupons/btn_bg.png);
                    background-size: contain;
                    border-radius: px2rem(100px);
                    z-index: 4;
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
                width: px2rem(600px);
                margin-top: px2rem(-510px);
                margin-left: px2rem(-300px);
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
            .bindMobileNum-contain{
                .close{
                    top: px2rem(50px);
                }
                .mobileNum{
                    display: block;
                    width: px2rem(520px);
                    margin: px2rem(284px) auto 0;
                    height: px2rem(90px);
                    font-size: px2rem(28px);
                    background-color: #fff;
                    text-indent: px2rem(8px);
                    border-bottom: 1px solid #dededf;
                }
                .rows{
                    display: block;
                    width: px2rem(520px);
                    margin: 0 auto;
                    height: px2rem(90px);
                    .verificationCode{
                        width: px2rem(294px);
                        height: px2rem(90px);
                        font-size: px2rem(24px);
                        border-bottom: 1px solid #dededf;
                        background-color: #FFF;
                    }
                    .sendvCode{
                        float: right;
                        position: relative;
                        display: block;
                        width: px2rem(194px);
                        height: px2rem(92px);
                        line-height: px2rem(90px);
                        font-size: px2rem(28px);
                        text-align: center;
                        color: #ff5552;
                        border-bottom: 1px solid #ffcac9;
                    }
                }
                .btn-contain{
                    margin-top: px2rem(50px);
                    text-align: center;
                    .btn-bind{
                        position: relative;
                        display: inline-block;
                        width: px2rem(454px);
                        height: px2rem(119px);
                        line-height: px2rem(119px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background: url(/static/images/activity/applet/buyCoupons/btn_bg.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            //门店列表弹窗
            .storeList-contain{
                .close{
                    top: px2rem(50px);
                }
                .listBox{
                    width: px2rem(560px);
                    height: px2rem(570px);
                    margin: px2rem(240px) auto 0;
                    overflow-x: hidden;
                    overflow-y: auto;
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling : touch;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    .listItem{
                        width: 100%;
                        height: px2rem(170px);
                        overflow: hidden;
                        background-color: #fff;
                        border-radius: px2rem(8px);
                        margin-bottom: px2rem(20px);
                        &:after{
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            margin-left: px2rem(260px);
                            height: 1px;
                            background-color: #d2d2d2;
                        }
                        .icon{
                            float: left;
                            width: px2rem(102px);
                            height: px2rem(102px);
                            border-radius: 50%;
                            margin: px2rem(34px) px2rem(20px);
                        }
                        .name{
                            font-size: px2rem(32px);
                            color: #1b1b1b;
                            margin-top: px2rem(45px);
                        }
                        .detail{
                            display: inline-block;
                            width: px2rem(408px);
                            font-size: px2rem(24px);
                            color: #6c6c6c;
                            margin-top: px2rem(20px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            i{
                                font-size: px2rem(18px);
                                line-height: px2rem(18px);
                                color: #a4a4a4;
                                margin-right: px2rem(15px);
                            }
                        }
                    }
                }
            }
            //没有门店
            .noStore-contain{
                position: relative;
                height: px2rem(698px);
                border-radius: 0 0 px2rem(8px) px2rem(8px);
                .close{
                    top: px2rem(55px);
                }
                .pop_bg{
                    height: px2rem(698px);
                }
                .btn{
                    width: px2rem(474px);
                    height: px2rem(90px);
                    font-size: px2rem(32px);
                    margin: px2rem(555px) auto 0;
                    background: linear-gradient(-69deg, #f6c43f, #f5e430);
                    background: -webkit-linear-gradient(-69deg, #f6c43f, #f5e430);
                    background: -moz-linear-gradient(-69deg, #f6c43f, #f5e430);
                    border-radius: px2rem(100px);
                    text-align: center;
                    line-height: px2rem(90px);
                }
            }
        }
    }
</style>
