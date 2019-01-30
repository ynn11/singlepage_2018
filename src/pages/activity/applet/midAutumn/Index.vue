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
                    <h3 class="title">1.中秋礼包</h3>
                    <p>1.价值288元月饼一盒</p>
                    <div class="intro-video">
                        <video controls="" name="media" poster="https://static.storeer.com/activity_2018/boss/midautumn/poster.jpg">
                            <source src="https://static.storeer.com/activity_2018/boss/midautumn/video.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="swiper-contain">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="item in seipeList">
                                <img :src="item" alt="">
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                    <p>2.门店代金券</p>
                    <div class="coupons-contain">
                        <p class="value">{{storeSet.couponMoney}}</p>
                    </div>
                    <h3 class="title">活动内容</h3>
                    <p class="sign-time">活动时间：9月15日—9月24日</p>
                    <p class="info-detail">月饼自是与家人一起吃的最香甜。价值<span class="red"> 288元</span>月饼与<span class="red"> {{storeSet.couponMoney}}元</span> 代金券的礼包在此，这个中秋礼包，愿您与家人共享！与家人一起吃月饼，和家人一起购美衣。礼包数量有限，速速点击购买噢！</p>
                    <div class="buy-btn" @click="buy">立即购买</div>
                </div>
                <div class="store-info">
                    <p class="name">该活动由{{storeSet.storeName}}举办</p>
                    <img :src="storeSet.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt="" class="logo">
                    <p class="addr">领取地址：{{storeSet.connectAddress}}</p>
                    <a :href="'tel:' + storeSet.mobileNum" class="call">拨打电话</a>
                </div>
            </div>
        </div>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="bindMobileNumShow=false;">
                <div class="pop-title">绑定手机</div>
                <p class="tip">为了您的账户安全，请先绑定手机号！</p>
                <div class="content-box">
                    <input type="number" class="mobileNum" v-model="mobileNum" placeholder="输入您的手机号码">
                    <div class="rows">
                        <input type="number" placeholder="" class="verificationCode" placeholder="输入验证码" v-model="verificationCode">
                        <div class="sendvCode" @click="send" v-show="!timerStatus">获取</div>
                        <div class="sendvCode run" v-show="timerStatus">{{timer}}s</div>
                    </div>
                    <div class="btn-contain">
                        <div class="btn btn-bind" @click="bindMobile">绑定</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 没有门店 -->
        <div class="noStore popWindow" v-show="noStoreShow">
            <div class="mask"></div>
            <div class="noStore-contain pop-contain">
                <p class="">抱歉，您关注的门店没有参与此次活动<br/>您无法参与该活动。</p>
                <!-- <div class="btn" @click="noStoreShow=false;">确定</div> -->
            </div>
        </div>
        <!-- 门店列表 -->
        <div class="storeList popWindow" v-if="storeListShow">
            <div class="mask"></div>
            <div class="storeList-contain pop-contain">
                <div class="pop-title">选择门店</div>
                <p class="tip">您可选择获取以下门店的中秋礼包</p>
                <div class="content-box">
                    <div class="listBox">
                        <div class="listItem" v-for="(item,index) in storeList" @click="storeCode=item.storeCode">
                            <div class="checkbox">
                                <img src="/static/images/activity/applet/midAutumn/checked.png" alt="" v-show="storeCode===item.storeCode">
                            </div>
                            <img class="icon" :src="item.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt=""/>
                            <div class="info-contain">
                                <div class="name">{{item.storeName}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn" @click="selectStore();" v-if="storeCode!==null">确定</div>
                <div class="btn unsel" v-else>确定</div>
            </div>
        </div>
        <!-- 分享领奖提示 -->
        <div class="share popWindow" v-show="shareShow">
            <div class="mask"></div>
            <div class="tip-contain pop-contain">
                <p class="pop-title">获取月饼</p>
                <p class="share-tip">您已成功购买中秋礼包<br/>立即分享活动到朋友圈<br/>获取月饼兑换码 </p>
                <div class="btn" @click="shareTipShow=true;">分享活动</div>
            </div>
        </div>
        <!-- 分享提示 -->
        <div class="shareTip-contain" v-show="shareTipShow" @click="closeTip">
            <div class="mask"></div>
            <div class="contain">
                <img src="/static/images/activity/applet/midAutumn/share_tip.png" alt="">
            </div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import api from "../../../../fetch/common_api"
    import ActivityClass from "../../../../class/activity/ActivityClass"
    import _urlConfig from "../../../../util/urlConfig"
    import * as _validate from "../../../../util/validate"
    import loading from '@/components/common/loading'

    export default {
        components:{
            "v-loading": loading,
            "mt-swipe": Swipe,
            "mt-swipe-item":SwipeItem
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode||null,
                staffCode: this.$route.query.staffCode||null,
                memberCode: this.$route.query.memberCode||null,
                xd_code: this.$route.query.xd_code,
                activityCode: "07c88cf75b53489c99b503c15a9b0bd7",
                seipeList: [
                    "https://static.storeer.com/activity_2018/boss/midautumn/01.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/02.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/03.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/04.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/05.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/06.jpg",
                ],
                showRules: false,
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
        //判断重复进入
        beforeRouteEnter(to, from, next) {
            if (navigator.userAgent.match(/Android/i)){
                sessionStorage.entryMark = "marked"
                next();
                return;
            }else{
                next((vm) => {
                    if(sessionStorage.entryMark !== "marked"){
                        sessionStorage.entryMark = "marked"
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
            closeTip: function(){
                this.shareTipShow = false;
            },
            //验证码倒计时
            runTimer() {
                if (this.timer > 0) {
                    --this.timer
                    setTimeout(this.runTimer, 1000);
                }else{
                    this.timerStatus = false
                }
            },
            routerLink(path){
                let src = path + "?storeCode=" + (this.activityInfo.storeCode||"") + "&staffCode=" + (this.activityInfo.staffCode||"") + "&xd_code=" + (this.xd_code||"")
                this.$router.push({
                    path: src
                })
            },
            //检查参加活动状态
            checkAttend(){
                this.whetherAttend(()=>{
                    if(this.activityInfo.shareFlag===1) { //(1：已分享 0：未分享)
                        this.routerLink("/activity_2018/midautumn_gifts");
                    }else if (this.activityInfo.attendFlag===1){  //未分享  且已参加   (1：已参加 0：未参加)
                        if (this.tokenInfo.imInfo===null){
                            this.bindMobileNumShow = true;
                            return;
                        }
                //获取门店活动设置
                        this.getStoreSet(()=>{
                            this.initWxShare({
                                title: "价值288元月饼免费送！",
                                desc: `这个中秋礼包超值！数量有限，速戳来抢！`,
                                link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/midautumn_index?xd_code=XD0005&storeCode=' + (this.storeCode||this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode||this.activityInfo.linkStaffCode||"") + '&memberCode=' + (this.activityInfo.memberCode||""))
                            },()=>{
                                this.collect({
                                    "xdCode": this.xd_code,
                                    "ydCode": "YD0013",
                                    "activityCode": this.activityCode,
                                    "openId": this.openId
                                });
                                this.shareTipShow = false;
                                this.activityShare({
                                    activityCode: this.activityCode
                                });
                            })
                            this.shareShow = true;
                        })
                    }else{
                        this.checkStore();
                    }
                });
            },
            //购买礼包/参加活动
            buy(){
                // if (this.tokenInfo.imInfo===null){
                //     this.bindMobileNumShow = true;
                //     return;
                // }
                if (JSON.stringify(this.storeSet)==="{}") {
                    this.$toast("获取门店设置失败，请刷新重试");
                    return;
                }
                this.loading = true;
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0002",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
                this.attendActivity(null,(data)=>{
                    this.storeListShow = false;
                    this.wxPay(data);
                });
            },
            //微信支付调起
            wxPay: function(data){
                var _this = this;
                //微信调用
                if (data.envType===1) {
                    _this.checkAttend();
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
                                "openId": _this.openId
                            });
                            // 支付成功后的回调函数
                            api.activityConfirm("post",{
                                activityCode: _this.activityCode,
                                orderNum: data.orderNum
                            },_this.tokenInfo.token).then((res)=>{
                                _this.checkAttend();
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
            //发送验证码
            send(){
                this.sendvCode();
            },
            //绑定手机号
            bindMobile(){
                this.bindMobileNum();
            }
        },
        created(){
            if(sessionStorage.entryMark !== "marked"){
                return;
            }
            //初始化公共方法
            new ActivityClass(this);
            this.checkStore= function(pre){
                this.bindMobileNumShow = false;
                if (!this.storeCode) {
                    if (this.tokenInfo.imInfo===null){
                        this.bindMobileNumShow = true;
                        return;
                    }
                    this.loadStoreList();
                }else{
                    this.getStoreSet(()=>{
                        this.initWxShare({
                            title: "价值288元月饼免费送！",
                            desc: `这个中秋礼包超值！数量有限，速戳来抢！`,
                            link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/midautumn_index?xd_code=XD0005&storeCode=' + (this.storeCode||this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode||this.activityInfo.linkStaffCode||"") + '&memberCode=' + (this.activityInfo.memberCode||""))
                        },()=>{
                            this.collect({
                                "xdCode": this.xd_code,
                                "ydCode": "YD0013",
                                "activityCode": this.activityCode,
                                "openId": this.openId
                            });
                            this.shareTipShow = false;
                            this.activityShare({
                                activityCode: this.activityCode
                            });
                            this.shareShow = true;
                        })
                        this.storeListShow = false;
                    });
                }
            };
            //绑定手机号
            this.bindMobileNum = function() {
                let data = {
                    "mobileNum": this.mobileNum,
                    "verificationCode": this.verificationCode,
                    "appEntranceType": 3
                }
                if (_validate.mobile(data.mobileNum)!==true) {
                    this.$toast(_validate.mobile(data.mobileNum));
                    return;
                }
                if (_validate.verificationCode(data.verificationCode)!==true) {
                    this.$toast(_validate.verificationCode(data.verificationCode));
                    return;
                }
                api.memFansBindMobileNum("post",data,this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        this.$store.dispatch("_login",{tokenInfo: JSON.stringify(res.returnContent),openId: this.openId});
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0005",
                            "activityCode": this.activityCode,
                            "openId": this.openId
                        },res.returnContent.token);
                        this.$toast("手机号绑定成功！");
                        this.bindMobileNumShow = false;
                        if (this.storeCode) {
                            this.checkAttend();
                        }else{
                            this.checkStore();
                        }
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //初始化分享
            this.initWxShare= function(options,cb){
                window.wx.ready(function(){
                    // wx.showMenuItems({
                    //     menuList: [
                    //         "menuItem:share:appMessage",
                    //         "menuItem:share:timeline"
                    //     ] // 要显示的菜单项，所有menu项见附录3
                    // });
                    console.log(options);
                    wx.onMenuShareAppMessage({
                        title: options.title, // 分享标题
                        desc: options.desc, // 分享描述
                        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: ()=> {
                            this.$toast("分享至朋友圈才可以领取奖励哦！");
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: options.title, // 分享标题
                        desc: options.desc, // 分享描述
                        link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        success: ()=> {
                            typeof cb === "function"&&cb();
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                            this.$toast("取消分享");
                        }
                    });
                });
            };
            //门店选择
            this.selectStore= function(){
                this.checkStore();
            };
            //如果是小白，且为导购分享链接，则关注门店
            if (this.tokenInfo.imInfo===null){
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0004",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
            }else{
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0003",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
            }
            this.checkAttend();
            this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0001",
                "activityCode": this.activityCode,
                "srcStaffCode": this.staffCode||"",
                "openId": this.openId
            });
            this.initWxConfig();
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
                    .slogan{
                        padding: px2rem(20px) 0;
                        background-size: 100% 100%;
                        line-height: px2rem(46px);
                        text-align: center;
                        font-size: px2rem(24px);
                        color: #aa3907;
                        font-family:"SimHei";
                    }
                    .title{
                        position: relative;
                        display: inline-block;
                        font-size: px2rem(36px);
                        height: px2rem(45px);
                        line-height: px2rem(54px);
                        color: #714e04;
                        margin: px2rem(20px) 0;
                        &::before{
                            content: "";
                            position: absolute;
                            left: px2rem(-30px);
                            top: 0;
                            width: px2rem(24px);
                            height: px2rem(45px);
                            background: url(/static/images/activity/boss/midAutumn/title_border.png) center no-repeat;
                            background-size: 100% 100%;
                        }
                        &::after{
                            content: "";
                            position: absolute;
                            right: px2rem(-30px);
                            top: 0;
                            width: px2rem(24px);
                            height: px2rem(45px);
                            background: url(/static/images/activity/boss/midAutumn/title_border.png) center no-repeat;
                            background-size: 100% 100%;
                            transform: rotateY(180deg);
                        }
                    }
                    .coupons-contain{
                        width: px2rem(492px);
                        height: px2rem(188px);
                        background: url(/static/images/activity/applet/midAutumn/coupons_bg.png) center no-repeat;
                        background-size: 100% 100%;
                        margin: px2rem(15px) auto;
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
                    .sign-time{
                        font-size: px2rem(28px);
                        font-weight: bold;
                        margin-bottom: px2rem(10px);
                    }
                    .info-detail{
                        text-align: left;
                        font-size: px2rem(26px);
                        text-indent: px2rem(50px)
                    }
                    .swiper-contain{
                        width: px2rem(500px);
                        margin: 0 auto;
                        .mint-swipe{
                            width: px2rem(500px);
                            height: px2rem(500px);
                            padding-bottom: px2rem(60px);
                            .mint-swipe-item{
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .mint-swipe-indicators{
                                bottom: px2rem(10px);
                                .mint-swipe-indicator{
                                    width: px2rem(16px);
                                    height: px2rem(16px);
                                    background: #a0a0a0;
                                    opacity: 1;
                                    &.is-active{
                                        background: #000;
                                    }
                                }
                            }
                        }
                    }
                    .intro-video{
                        width: px2rem(574px);
                        height: px2rem(312px);
                        margin: px2rem(10px) auto px2rem(30px);
                        video{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .buy-btn{
                        width: px2rem(450px);
                        line-height: px2rem(90px);
                        font-size: px2rem(36px);
                        color: #714e04;
                        text-align: center;
                        background: linear-gradient(-102deg,#ffba00,#ffea00);
                        box-shadow: 0 px2rem(16px) px2rem(24px) px2rem(5px) rgba(60,105,114,.3);
                        border-radius: px2rem(20px);
                        margin: px2rem(30px) auto 0;
                    }
                }
                .store-info{
                    padding: px2rem(30px) 0;
                    .name{
                        font-family: "SimHei";
                        font-size: px2rem(26px);
                        color: #fff;
                        line-height: px2rem(40px);
                        padding: 0 px2rem(50px);
                        text-align: center;
                    }
                    .logo{
                        display: block;
                        width: px2rem(156px);
                        height: px2rem(156px);
                        border-radius: px2rem(12px);
                        margin: px2rem(20px) auto;
                        background: #fff;
                    }
                    .addr{
                        font-size: px2rem(24px);
                        color: #fff;
                        padding: 0 px2rem(50px);
                        line-height: px2rem(40px);
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
        .shareTip-contain{
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
            .contain{
                position: relative;
                img{
                    width: 100%;
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
            /*用户绑定弹窗*/
            .bindMobileNum-contain{
                .close{
                    top: px2rem(50px);
                }
                .content-box{
                    background-color: #fff;
                    overflow: hidden;
                }
                .mobileNum{
                    display: block;
                    width: px2rem(472px);
                    margin: px2rem(30px) auto;
                    height: px2rem(72px);
                    font-size: px2rem(28px);
                    background-color: #fff;
                    text-indent: px2rem(20px);
                    border: px2rem(4px) solid #959595;
                    border-radius: px2rem(10px);
                }
                .rows{
                    display: block;
                    width: px2rem(480px);
                    margin: px2rem(30px) auto;
                    height: px2rem(90px);
                    .verificationCode{
                        float: left;
                        width: px2rem(260px);
                        height: px2rem(72px);
                        font-size: px2rem(24px);
                        text-indent: px2rem(20px);
                        border: px2rem(4px) solid #959595;
                        background-color: #FFF;
                        border-radius: px2rem(10px);
                    }
                    .sendvCode{
                        float: right;
                        position: relative;
                        display: block;
                        width: px2rem(210px);
                        line-height: px2rem(80px);
                        font-size: px2rem(30px);
                        text-align: center;
                        font-weight: bold;
                        color: #714e04;
                        background-color: #ffea00;
                        border-radius: px2rem(10px);
                   }
                }
            }
            /*门店列表弹窗*/
            .storeList-contain{
                .tip{
                    font-size: px2rem(26px);
                    font-weight: bold;
                    line-height: px2rem(42px);
                    color: #333;
                }
                .close{
                    top: px2rem(50px);
                }
                .listBox{
                    width: px2rem(560px);
                    max-height: px2rem(570px);
                    margin: px2rem(5px) auto 0;
                    overflow-x: hidden;
                    overflow-y: auto;
                    scroll-behavior: smooth;
                    -webkit-overflow-scrolling : touch;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    .listItem{
                        position: relative;
                        width: 100%;
                        height: px2rem(130px);
                        overflow: hidden;
                        background-color: #fff;
                        border-radius: px2rem(8px);
                        margin-bottom: px2rem(20px);
                        .checkbox{
                            float: left;
                            width: px2rem(42px);
                            height: px2rem(38px);
                            margin: px2rem(46px) px2rem(20px) 0 0;
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .icon{
                            float: left;
                            width: px2rem(100px);
                            height: px2rem(100px);
                            border-radius: 50%;
                            margin: px2rem(15px) px2rem(20px);
                        }
                        .name{
                            font-size: px2rem(32px);
                            color: #1b1b1b;
                            margin-top: px2rem(45px);
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }
                .unsel{
                    color: #fff;
                    background-color: #b2b2b2;
                }
            }
            /*无参与活动门店*/
            .noStore-contain{
                p{
                    margin: px2rem(100px) 0 px2rem(40px);
                }
            }
        }
    }
</style>
