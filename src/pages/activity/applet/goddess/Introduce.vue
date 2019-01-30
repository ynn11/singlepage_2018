<template>
    <div class="goddess-intro-box">
        <div class="mainContent">
            <img src="/static/images/activity/applet/goddess/bg.jpg" alt="" class="bg1">
            <div class="bg2"></div>
            <div class="bg3"></div>
            <div class="content-box">
                <div class="time">2018/3/7 - 2018/3/11</div>
                <img src="/static/images/activity/applet/goddess/bowl-tip-sale.png" alt="" class="bowl-tip" v-if="['c2abf97eb4794d3daa31ce953c0eb6b4','2c6d479329964130bf29f05e89559c37','b2d87b88d180458a8926c1d9e9d8d44f','a2ccd2e79c1f44ada062dd8f0d2329bb'].indexOf(storeCode) > -1">
                <img src="/static/images/activity/applet/goddess/bowl-tip.png" alt="" v-else class="bowl-tip">
                <img src="/static/images/activity/applet/goddess/bowl.png" alt="" class="bowl">
                <div class="bowl-words">无铅钻石碗六件礼品套装，先到先得哦！</div>
                <img src="/static/images/activity/applet/goddess/more-tip.png" alt="" class="more-tip">
                <div class="jl-1">
                    <img src="/static/images/activity/applet/goddess/jl-1.png" alt="">
                    <div class="tip title">姜力防脱洗护发套装</div>
                    <div class="tip">原生姜汁健发平衡洗发露500毫升<br/>姜花发丝调理润发乳500毫升</div>
                </div>
                <div class="jl-2">
                    <img src="/static/images/activity/applet/goddess/jl-2.png" alt="">
                    <div class="tip">防脱固发&nbsp;&nbsp;●<br/>生发育发&nbsp;&nbsp;●<br/>起屑止痒&nbsp;&nbsp;●<br/>去油清爽&nbsp;&nbsp;●<br/>改善毛躁&nbsp;&nbsp;●</div>
                </div>
                <div class="jl-3">
                    <img src="/static/images/activity/applet/goddess/jl-3.jpg" alt="">
                </div>
                <img src="/static/images/activity/applet/goddess/tip.png" alt="" class="last-tip">
                <div class="btn" @click="getChance">马上抢</div>
            </div>
        </div>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
                <img class="pop_bg" src="/static/images/activity/applet/goddess/pop_bind.png" alt="">
                <img src="/static/images/activity/applet/goddess/close.png" alt="" class="close" @click="bindMobileNumShow=false;">
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
                <img class="pop_bg" src="/static/images/activity/applet/goddess/pop_nostore.png" alt="">
                <img src="/static/images/activity/applet/goddess/close.png" alt="" class="close" @click="noStoreShow=false;">
            </div>
        </div>
        <!-- 门店列表 -->
        <div class="storeList popWindow" v-if="storeListShow">
            <div class="mask"></div>
            <div class="storeList-contain pop-contain">
                <img class="pop_bg" src="/static/images/activity/applet/goddess/pop_select_store.png" alt="">
                <img src="/static/images/activity/applet/goddess/close.png" alt="" class="close" @click="storeListShow=false;">
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
        <!-- 分享提示 -->
        <div class="shareTip popWindow" v-show="shareTipShow">
            <div class="mask" @click="shareTipShow=false;"></div>
            <div class="shareTip-contain">
                <img src="/static/images/activity/share_tip.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../../../fetch/api'
    import * as _tool from "../../../../util/tool"
    import * as _validate from "../../../../util/validate"
    import _urlConfig from "../../../../util/urlConfig"

    import loading from '@/components/common/loading'
    export default {
        components: {
            "v-loading": loading,
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode,
                account: this.$route.query.account,
                staffCode: this.$route.query.staffCode,
                xd_code: this.$route.query.xd_code,
                activityCode: "a19f63bd38b344749865a028e10ca42b",
                activityInfo: [],
                bindMobileNumShow: false,
                noStoreShow: false,
                storeList: [],
                storeListShow: false,
                mobileNum: "",
                verificationCode: "",
                timer: 60,
                timerStatus: false,
                showContent: false,
                frontDisplay: true,
                backDisplay: false,
                playStatus: true,
                loading: true,
                //弹窗
                shareTipShow: false
            }
        },
        //判断重复进入
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                if(sessionStorage.entryMark !== "marked"){
                    sessionStorage.entryMark = "marked"
                    vm.$router.go(0);
                    return;
                }
            })
        },
        computed: {
            tokenInfo () {
                let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
                return tokenInfo;
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
            //发送绑定验证码
            sendvCode: function(){
                if (_validate.mobile(this.mobileNum)!==true) {
                    this.$toast(_validate.mobile(this.mobileNum))
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
                        this.$toast(res.message);
                    }
                });
            },
            //门店选取
            checkStore: function(){
                this.bindMobileNumShow = false;
                if (!this.storeCode) {
                    this.loadStoreList();
                }else{
                    this.attendGoddessActivity();
                }
            },
            //参加活动
            attendGoddessActivity: function(){
                let data = {
                    storeCode: this.storeCode,
                    staffCode: this.staffCode||null
                };
                api.attendGoddessActivity("post",data,this.tokenInfo.token).then((res)=>{
                    if (res.returnCode==='0') {
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0018",
                            "activityCode": this.activityCode,
                            "srcStaffCode": this.staffCode||"",
                            "openId": this.openId
                        });
                        let src = "/activity_2018/goddess_signed?xd_code=" + this.xd_code;
                        this.$router.replace(src);
                    }else{
                        this.$toast(res.message);
                        this.storeCode = null;
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0011",
                            "activityCode": this.activityCode,
                            "srcStaffCode": this.staffCode||"",
                            "openId": this.openId
                        });
                    }
                });
            },
            //门店选择
            selectStore: function(item){
                this.storeCode = item.storeCode;
                this.storeListShow = false;
                this.attendGoddessActivity();
            },
            //加载门店列表
            loadStoreList: function(){
                api.getActivityStoreList("get",{activityCode: this.activityCode},this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.storeList = res.returnContent;
                        if (this.storeList.length===0) {
                            this.collect({
                                "xdCode": this.xd_code,
                                "ydCode": "YD0011",
                                "activityCode": this.activityCode,
                                "openId": this.openId
                            });
                            this.noStoreShow = true;
                        }else if (this.storeList.length===1) {
                            this.storeCode = res.returnContent[0].storeCode;
                            this.checkStore();
                        }else{
                            this.storeListShow = true;
                        }
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            //参加活动
            getChance: function(){
                if(localStorage.goddessShare==="true"){
                    if (this.tokenInfo.imInfo===null) {
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0014",
                            "activityCode": this.activityCode,
                            "srcStaffCode": this.staffCode||"",
                            "openId": this.openId
                        });
                        this.bindMobileNumShow = true;
                    }else{
                        this.checkStore();
                    }
                }else{
                    this.collect({
                        "xdCode": this.xd_code,
                        "ydCode": "YD0012",
                        "activityCode": this.activityCode,
                        "srcStaffCode": this.staffCode||"",
                        "openId": this.openId
                    });
                    this.shareTipShow = true;
                }
            },
            //粉丝关注/用户关注
            concernStore: function(){
                let data = {
                    "storeCode": this.storeCode,
                    "staffCode": this.staffCode,
                    "mobileNum": "",
                    "verificationCode": "",
                    "appEntranceType": 3,
                    "trueName": ""
                }
                api.followStoreStaffByShare("post",data,this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){

                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //绑定手机号
            bindMobileNum() {
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
                        this.checkStore();
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0015",
                            "activityCode": this.activityCode,
                            "srcStaffCode": this.staffCode||"",
                            "openId": this.openId
                        });
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //是否参加活动
            whetherAttend: function(){
                api.whetherAttendGoddessActivity("get",{},this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        if (res.returnContent.attendFlag===1) {
                            let src = "/activity_2018/goddess_signed?xd_code=" + this.xd_code;
                            if (this.storeCode) {
                                src += '&storeCode=' + this.storeCode;
                            }
                            if (this.staffCode) {
                                src += '&staffCode=' + this.staffCode;
                            }
                            this.$router.replace(src);
                        }else{
                            //活动信息
                            this.activityInfo = res.returnContent;
                            this.loading = false;
                        }
                    }else if(res.returnCode==="10"){
                        let fullPath = location.pathname + location.search;
                        let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                        location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //初始化分享
            initWxShare: function(){
                let _this = this;
                let link = _urlConfig.redirectBaseredirectURI + '/activity_2018/goddess?xd_code=XD0005';
                if (this.storeCode) {
                    link += '&storeCode=' + this.storeCode;
                }
                if (this.staffCode) {
                    link += '&staffCode=' + this.staffCode;
                }
                let desc = '身边店女王节正式开启，进店无门槛送168元钻石碗套装，消费达标更有398元豪华洗护套装，一切只等你开启！';
                if (['c2abf97eb4794d3daa31ce953c0eb6b4','2c6d479329964130bf29f05e89559c37','b2d87b88d180458a8926c1d9e9d8d44f','a2ccd2e79c1f44ada062dd8f0d2329bb'].indexOf(this.storeCode) > -1) {
                    desc = '身边店女王节正式开启，任意消费即可领取168元钻石碗套装，消费达标更有398元豪华洗护套装，一切只等你开启！';
                }
                window.wx.ready(function(){
                    wx.onMenuShareAppMessage({
                        title: '女王节，来就送！', // 分享标题
                        desc: desc, // 分享描述
                        link: encodeURI(link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            _this.shareTipShow = false;
                            localStorage.goddessShare = "true";
                            _this.getChance();
                            _this.collect({
                                "xdCode": _this.xd_code,
                                "ydCode": "YD0013",
                                "activityCode": _this.activityCode,
                                "srcStaffCode": _this.staffCode||"",
                                "openId": _this.openId
                            });
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: '女王节，来就送！', // 分享标题
                        desc: desc, // 分享描述
                        link: encodeURI(link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        success: function () {
                            _this.shareTipShow = false;
                            localStorage.goddessShare = "true";
                            _this.getChance();
                            _this.collect({
                                "xdCode": _this.xd_code,
                                "ydCode": "YD0013",
                                "activityCode": _this.activityCode,
                                "srcStaffCode": _this.staffCode||"",
                                "openId": _this.openId
                            });
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
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
                        jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','showMenuItems','hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    this.initWxShare();
                });
            },
        },
        mounted(){
            //如果是小白，且为导购分享链接，则关注门店
            if (this.storeCode) {
                this.concernStore();
            }
            //阻止多余数据统计 初始化微信
            if(sessionStorage.entryMark !== "marked"){
                return;
            }
            this.initWxConfig();
            //流程
            this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0001",
                "activityCode": this.activityCode,
                "srcStaffCode": this.staffCode||"",
                "openId": this.openId
            });
            //数据统计
            if (this.tokenInfo.imInfo===null){
                this.loading = false;
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
                this.whetherAttend();
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';

    .goddess-intro-box{
        position: relative;
        height: 100%;
        .mainContent{
            position: relative;
            width: px2rem(750px);
            .bg1{
                position: absolute;
                top: 0;
                left: 50%;
                width: px2rem(750px);
                transform: translateX(-50%);
                -webkittransform: translateX(-50%);
                -o-transform: translateX(-50%);
                z-index: 1;
            }
            .bg2{
                position: absolute;
                top: px2rem(1080px);
                left: 50%;
                width: px2rem(750px);
                height: px2rem(1615px);
                transform: translateX(-50%);
                -webkittransform: translateX(-50%);
                -o-transform: translateX(-50%);
                z-index: 1;
                background: linear-gradient(135deg,#ffa6d4 0%,#ffa6d4 37%, #fff 37%, #fff 100%);
                background: -webkit-linear-gradient(135deg,#ffa6d4 0%,#ffa6d4 37%, #fff 37%, #fff 100%);
                background: -moz-linear-gradient(135deg,#ffa6d4 0%,#ffa6d4 37%, #fff 37%, #fff 100%);
            }
            .bg3{
                position: absolute;
                top: px2rem(2695px);
                left: 50%;
                width: px2rem(750px);
                height: px2rem(625px);
                transform: translateX(-50%);
                -webkittransform: translateX(-50%);
                -o-transform: translateX(-50%);
                z-index: 1;
                background: linear-gradient(135deg, #fff 0%, #fff 55%,#ffa6d4 55%,#ffa6d4 100%);
                background: -webkit-linear-gradient(135deg, #fff 0%, #fff 55%,#ffa6d4 55%,#ffa6d4 100%);
                background: -moz-linear-gradient(135deg, #fff 0%, #fff 55%,#ffa6d4 55%,#ffa6d4 100%);
            }
            .content-box{
                position: relative;
                overflow: hidden;
                z-index: 2;
                .time{
                    width: px2rem(475px);
                    height: px2rem(49px);
                    line-height: px2rem(49px);
                    font-size: px2rem(34px);
                    color: #fff;
                    margin: px2rem(685px) auto px2rem(60px);
                    background-color: #fd7094;
                    text-align: center;
                }
                .bowl-tip{
                    display: block;
                    width: px2rem(543px);
                    margin: 0 auto;
                }
                .bowl{
                    display: block;
                    width: px2rem(680px);
                    margin: 0 auto;
                }
                .bowl-words{
                    width: px2rem(750px);
                    height: px2rem(46px);
                    line-height: px2rem(46px);
                    font-size: px2rem(26px);
                    color: #fff;
                    text-align: center;
                    margin-top: px2rem(50px);
                    background: linear-gradient(-90deg, rgba(216,142,216,0) 0, rgba(216,142,216,1) 40%,rgba(216,142,216,1) 60%,rgba(216,142,216,0) 100%);
                    background: -webkit-linear-gradient(-90deg, rgba(216,142,216,0) 0, rgba(216,142,216,1) 40%,rgba(216,142,216,1) 60%,rgba(216,142,216,0) 100%);
                    background: -moz-linear-gradient(-90deg, rgba(216,142,216,0) 0, rgba(216,142,216,1) 40%,rgba(216,142,216,1) 60%,rgba(216,142,216,0) 100%);
                }
                .more-tip{
                    display: block;
                    width: px2rem(430px);
                    margin: px2rem(80px) auto 0;
                }
                .jl-1{
                    width: px2rem(750px);
                    margin: px2rem(80px) auto 0;
                    position: relative;
                    overflow: hidden;
                    img{
                        float: left;
                        width: px2rem(234px);
                        margin-left: px2rem(80px);
                    }
                    .tip{
                        line-height: px2rem(38px);
                        font-size: px2rem(24px);
                        margin-left: px2rem(355px);
                        &.title{
                            font-size: px2rem(36px);
                            margin-top: px2rem(72px);
                            margin-bottom: px2rem(36px);
                        }
                    }
                }
                .jl-2{
                    width: px2rem(750px);
                    margin: px2rem(38px) auto 0;
                    position: relative;
                    overflow: hidden;
                    img{
                        float: right;
                        width: px2rem(265px);
                        margin-right: px2rem(72px);
                    }
                    .tip{
                        margin-left: px2rem(140px);
                        font-size: px2rem(28px);
                        line-height: px2rem(42px);
                        margin-top: px2rem(40px);
                    }
                }
                .jl-3{
                    width: px2rem(750px);
                    margin: px2rem(48px) auto 0;
                    position: relative;
                    overflow: hidden;
                    img{
                        float: left;
                        width: px2rem(418px);
                        margin-left: px2rem(92px);
                    }
                }
                .last-tip{
                    display: block;
                    width: px2rem(451px);
                    margin: px2rem(95px) auto px2rem(80px);
                }
                .btn{
                    display: block;
                    width: px2rem(482px);
                    height: px2rem(108px);
                    font-size: px2rem(36px);
                    color: #fff;
                    line-height: px2rem(108px);
                    margin: 0 auto px2rem(70px);
                    text-align: center;
                    background-color: #fd7094;
                    border-radius: px2rem(60px);
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
                transform: translate(-50%,-50%);
                -webkittransform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                overflow: hidden;
                .pop_bg{
                    display: block;
                    width: 100%;
                }
                .close{
                    position: absolute;
                    top: px2rem(30px);
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
                    top: px2rem(90px);
                }
                .mobileNum{
                    display: block;
                    width: px2rem(490px);
                    margin: px2rem(330px) auto 0;
                    height: px2rem(90px);
                    font-size: px2rem(28px);
                    background-color: #fff;
                    text-indent: px2rem(8px);
                    border-bottom: 1px solid #dededf;
                }
                .rows{
                    display: block;
                    width: px2rem(490px);
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
                        width: px2rem(154px);
                        height: px2rem(92px);
                        line-height: px2rem(90px);
                        font-size: px2rem(28px);
                        text-align: center;
                        color: #ff5552;
                        border-bottom: 1px solid #ffcac9;
                    }
                }
                .btn-contain{
                    margin-top: px2rem(60px);
                    text-align: center;
                    .btn-bind{
                        position: relative;
                        display: inline-block;
                        width: px2rem(424px);
                        height: px2rem(90px);
                        line-height: px2rem(90px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background-color: #fd7094;
                        border-radius: px2rem(60px);
                    }
                }
            }
            //门店列表弹窗
            .storeList-contain{
                width: px2rem(606px);
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
                            width: px2rem(400px);
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
                height: px2rem(426px);
                border-radius: 0 0 px2rem(8px) px2rem(8px);
            }
            //分享提示弹窗
            .shareTip-contain{
                position: relative;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
