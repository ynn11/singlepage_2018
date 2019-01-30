<template>
    <div class="midyear-applet-index">
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
                    <img src="/static/images/activity/applet/midyear/content_bg.png" alt="" class="header">
                    <img src="/static/images/activity/applet/midyear/gift_header.png" alt="" class="title">
                    <div class="gift-box">
                        <div class="box" v-if="storeSet.goodsCode==='001'">
                            <img src="/static/images/activity/applet/midyear/functions.jpg" alt="" class="functions">
                            <img src="/static/images/activity/applet/midyear/uses.jpg" alt="" class="uses">
                        </div>
                        <div class="box pillow-box" v-else>
                            <img src="/static/images/activity/applet/midyear/functions_pillow.jpg" alt="" class="functions_pillow">
                            <img src="/static/images/activity/applet/midyear/functions_pillow_2.jpg" alt="" class="functions_pillow">
                        </div>
                    </div>
                </div>
                <div class="coupon-contain">
                    <div class="box">
                        <img src="/static/images/activity/applet/midyear/coupon_bg.jpg" alt="">
                        <p class="value">{{storeSet.couponMoney}}元</p>
                    </div>
                </div>
                <div class="rules-contain">
                    <div class="box">
                        <p class="title">更美更瘦，你准备好了吗？</p>
                        <p class="detail" v-if="storeSet.goodsCode==='001'">21世纪小仙女必备强效瘦脸神器，太阳能+微电流，动能致美，让年轻常住，价值398元韩国原装进口3D瘦脸仪免费领取。还可获得本店{{storeSet.couponMoney}}元现金券。</p>
                        <p class="detail" v-else>30元=696元，送{{storeSet.couponMoney}}现金抵用券（每人仅限使用1张）送价值298员健康保健枕；送价值298元私人大礼包；送100%中奖机会一次，最高10倍免单免费领取。</p>
                    </div>
                </div>
                <div class="store-info">
                    <p class="storename"><i class="iconfont icon-shanghu"></i>{{storeSet.storeName}}</p>
                    <p class="storeaddr"><i class="iconfont icon-location"></i>{{storeSet.connectAddress}}</p>
                </div>
            </div>
        </div>
        <div class="buy-btn" @click="buy">加入超级会员</div>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="bindMobileNumShow=false;">
                <div class="pop-title">绑定手机</div>
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
                <div class="pop-min-title">无法参与活动</div>
            </div>
        </div>
        <!-- 门店列表 -->
        <div class="storeList popWindow" v-if="storeListShow">
            <div class="mask"></div>
            <div class="storeList-contain pop-contain">
                <div class="pop-title">选择门店</div>
                <div class="content-box">
                    <div class="listBox">
                        <div class="listItem" v-for="(item,index) in storeList" @click="selectStore(item);">
                            <img class="icon" :src="item.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt=""/>
                            <div class="info-contain">
                                <div class="name">{{item.storeName}}</div>
                                <div class="detail"><i class="iconfont icon-location"></i>{{item.connectAddress}}</div>
                            </div>
                            <i class="iconfont icon-qianjin"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分享领奖提示 -->
        <div class="share popWindow" v-show="shareShow">
            <div class="mask"></div>
            <div class="tip-contain pop-contain">
                <p class="share-tip">恭喜您成为超级会员<br/>马上将这个好消息告诉好朋友</p>
                <div class="btn" @click="shareTipShow=true;">点击分享</div>
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
            routerLink(path){
                let src = path + "?storeCode=" + (this.storeCode||"") + "&staffCode=" + (this.staffCode||"") + "&xd_code=" + (this.xd_code||"")
                this.$router.push({
                    path: src
                })
            },
            //检查参加活动状态
            checkAttend(){
                this.whetherAttend(()=>{
                    if (this.activityInfo.shareFlag===1) {
                        this.routerLink("/activity_2018/midyear_gifts");
                    }else if(this.activityInfo.attendFlag===1){
                        this.getStoreSet(()=>{
                            this.initWxShare({
                                title: "第一个想到你",
                                desc: `我已领到${this.storeSet.goodsCode==='001'?'3D瘦脸仪':'健康保健枕'}，加入超级会员立享特权，名额有限，赶紧去领！`,
                                link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/midyear_index?xd_code=XD0005&storeCode=' + (this.storeCode||this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode||this.activityInfo.linkStaffCode||"") + '&memberCode=' + (this.activityInfo.memberCode||""))
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
                if (this.tokenInfo.imInfo===null){
                    this.bindMobileNumShow = true;
                    return;
                }
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
                window.wx.ready(function(){
                    wx.chooseWXPay({
                        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paySign, // 支付签名
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
                    this.loadStoreList();
                }else{
                    this.getStoreSet(()=>{
                        this.initWxShare({
                            title: "第一个想到你",
                            desc: `我已领到${this.storeSet.goodsCode==='001'?'3D瘦脸仪':'健康保健枕'}，加入超级会员立享特权，名额有限，赶紧去领！`,
                            link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/midyear_index?xd_code=XD0005&storeCode=' + (this.storeCode||this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode||this.activityInfo.linkStaffCode||"") + '&memberCode=' + (this.activityInfo.memberCode||""))
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
            //如果是小白，且为导购分享链接，则关注门店
            if (this.storeCode) {
                this.concernStore();
            }
            this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0001",
                "activityCode": this.activityCode,
                "srcStaffCode": this.staffCode||"",
                "openId": this.openId
            });
            if (this.tokenInfo.imInfo===null){
                    this.getStoreSet(()=>{
                        this.initWxShare({
                            title: "第一个想到你",
                            desc: `我已领到${this.storeSet.goodsCode==='001'?'3D瘦脸仪':'健康保健枕'}，加入超级会员立享特权，名额有限，赶紧去领！`,
                            link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/midyear_index?xd_code=XD0005&storeCode=' + (this.storeCode||this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode||this.activityInfo.linkStaffCode||"") + '&memberCode=' + (this.activityInfo.memberCode||""))
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
                this.loading = false;
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0004",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
            }else{
                this.checkAttend();
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0003",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
            }
            this.initWxConfig();
        },
        mounted(){

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .midyear-applet-index{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            background: url(/static/images/activity/applet/midyear/intro_bg.jpg) top center no-repeat;
            background-size: 100% auto;
            background-color: #49efd0;
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                padding-bottom: px2rem(230px);
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
                    .header{
                        display: block;
                        width: 100%;
                        max-width: px2rem(750px);
                        margin: 0 auto;
                    }
                    .title{
                        position: absolute;
                        top: px2rem(110px);
                        left: px2rem(250px);
                        width: px2rem(250px);
                        z-index: 10;
                    }
                    .gift-box{
                        position: relative;
                        background: linear-gradient(12deg, #890aff, #e426ba);
                        width: px2rem(632px);
                        padding: px2rem(6px);
                        border-radius: px2rem(20px);
                        margin: px2rem(-506px) auto 0;
                        z-index: 9;
                        .box{
                            background-color: #fff;
                            border-radius: px2rem(20px);
                            overflow: hidden;
                            &.pillow-box{
                                padding: px2rem(60px) 0 px2rem(50px);
                            }
                            .functions{
                                width: 100%;
                                margin: px2rem(30px) 0 px2rem(7px);
                            }
                            .uses{
                                width: 100%;
                                margin: px2rem(7px) 0 px2rem(30px);
                            }
                            .functions_pillow{
                                display: block;
                                width: px2rem(595px);
                                margin: 0 auto;
                            }
                        }
                    }
                }
                .coupon-contain{
                    position: relative;
                    background: linear-gradient(12deg, #890aff, #e426ba);
                    width: px2rem(632px);
                    padding: px2rem(6px);
                    border-radius: px2rem(20px);
                    margin: px2rem(28px) auto 0;
                    z-index: 9;
                    .box{
                        background-color: #fff;
                        overflow: hidden;
                        border-radius: px2rem(20px);
                        img{
                            display: block;
                            width: px2rem(563px);
                            margin: px2rem(35px);
                        }
                        .value{
                            position: absolute;
                            top: px2rem(160px);
                            left: 0;
                            width: 100%;
                            font-size: px2rem(56px);
                            text-align: center;
                            background: linear-gradient(0, #e7388a, #ed7550);
                            -webkit-background-clip: text;
                            color: transparent;
                        }
                    }
                }
                .rules-contain{
                    position: relative;
                    background: linear-gradient(12deg, #890aff, #e426ba);
                    width: px2rem(632px);
                    padding: px2rem(6px);
                    border-radius: px2rem(20px) px2rem(20px) 0 0;
                    margin: px2rem(28px) auto 0;
                    z-index: 9;
                    .box{
                        background-color: #fff;
                        overflow: hidden;
                        border-radius: px2rem(20px) px2rem(20px) 0 0;
                        padding: px2rem(20px) px2rem(32px) px2rem(30px);
                        .title{
                            font-size: px2rem(36px);
                            color: #5c00bb;
                            line-height: px2rem(84px);
                            text-align: center;
                            white-space: nowrap;
                        }
                        .detail{
                            font-size: px2rem(26px);
                            color: #5c00bb;
                            line-height: px2rem(60px);
                        }
                    }
                }
                .store-info{
                    background-color: #fff9ea;
                    border-radius: 0 0 px2rem(20px) px2rem(20px);
                    width: px2rem(564px);
                    padding: px2rem(40px);
                    margin: 0 auto;
                    i{
                        font-size: px2rem(26px);
                        font-weight: bold;
                        color: #c666a1;
                        margin-right: px2rem(15px);
                    }
                    .storename{
                        font-size: px2rem(24px);
                        line-height: px2rem(34px);
                        color: #5c00bb;
                    }
                    .storeaddr{
                        font-size: px2rem(24px);
                        line-height: px2rem(34px);
                        color: #5c00bb;
                        margin-top: px2rem(28px);
                    }
                }
            }
        }
        .buy-btn{
            position: fixed;
            bottom: px2rem(50px);
            left: 50%;
            width: px2rem(572px);
            transform: translateX(-50%);
            height: px2rem(90px);
            line-height: px2rem(90px);
            font-size: px2rem(32px);
            color: #fff;
            text-align: center;
            /*background-color: #ffde00;*/
            background: linear-gradient(90deg, #ed0567, #f9c908);
            box-shadow: 0 px2rem(16px) px2rem(24px) px2rem(5px) rgba(60,105,114,.3);
            border-radius: px2rem(45px);
            z-index: 9;
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
                background-color: #5a5de9;
                border-radius: px2rem(16px);
                .pop-title{
                    font-size: px2rem(60px);
                    color: #fff;
                    font-weight: bold;
                    margin: px2rem(104px) 0 px2rem(80px);
                    text-align: center;
                }
                .pop-min-title{
                    font-size: px2rem(32px);
                    color: #fff;
                    font-weight: bold;
                    margin: px2rem(104px) 0 px2rem(80px);
                    text-align: center;
                }
                &.rules-contain{
                    border-radius: px2rem(8px);
                    padding-bottom: px2rem(54px);
                    background: url(/static/images/activity/boss/mayday/pop_bg.jpg) center center no-repeat;
                    background-size: 100% 100%;
                    .rules-words{
                        max-height: px2rem(760px);
                        overflow-x: hidden;
                        overflow-y: auto;
                        margin-bottom: px2rem(50px);
                        p{
                            padding: 0 px2rem(38px);
                            font-size: px2rem(26px);
                            color: #f3e6b6;
                            line-height: px2rem(40px);
                        }
                    }
                }
                .close{
                    position: absolute;
                    top: px2rem(40px);
                    right: px2rem(30px);
                    width: px2rem(30px);
                    height: px2rem(30px);
                    z-index: 9;
                }
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    line-height: px2rem(116px);
                    text-align: center;
                }
            }
            //用户绑定弹窗
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
                    width: px2rem(520px);
                    margin: px2rem(50px) auto 0;
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
                        color: #d3343b;
                        border-bottom: 1px solid #ffc7c8;
                    }
                }
                .btn-contain{
                    margin: px2rem(50px) auto;
                    text-align: center;
                    .btn-bind{
                        position: relative;
                        display: inline-block;
                        width: px2rem(424px);
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background-color: #5a5de9;
                        border-radius: 200px;
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
                        .info-contain{
                            overflow: hidden;
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
                        .icon-qianjin{
                            position: absolute;
                            top: 50%;
                            right: px2rem(30px);
                            color: #e0e0e0;
                            font-weight: bold;
                            transform: translateY(-50%);
                        }
                    }
                }
            }
            //没有门店
            .noStore-contain{
                position: relative;
                height: px2rem(298px);
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
                    border-radius: px2rem(100px);
                    text-align: center;
                    line-height: px2rem(90px);
                }
            }
            .tip-contain{
                background: url(/static/images/activity/applet/midyear/pop_share_bg.jpg) center center no-repeat;
                background-size: 100% 100%;
                padding: px2rem(70px) 0;
                .share-tip{
                    font-size: px2rem(26px);
                    color: #5c00bb;
                    line-height: px2rem(60px);
                    text-align: center;
                    margin: px2rem(240px) 0;
                }
                .btn{
                    position: relative;
                    display: block;
                    width: px2rem(424px);
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    font-size: px2rem(36px);
                    color: #fff;
                    text-align: center;
                    background-color: #5c00bb;
                    border-radius: 200px;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
