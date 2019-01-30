<template>
    <div class="mayday-boss-intro">
        <div class="mainContent">
            <img src="/static/images/activity/boss/mayday/headpic.jpg" class="main_bg" alt="">
            <div class="act-title">精美礼品免费领</div>
            <div class="activity-time">活动时间：4月25日-5月04日</div>
            <div class="desc" id="target">
                <div class="title">------&nbsp;&nbsp;活动内容&nbsp;&nbsp;------</div>
                <div class="detail" style="">
                    劳动者最光荣，一起来点亮荣耀徽章吧！活动期间邀请好友在24小时内帮您点亮5枚荣耀徽章，即可到店免费领取：
                    <span v-if="activityInfo.presentGift==='001'">养身茶壶五件套</span>
                    <span v-else>3D美容瘦脸仪</span>
                </div>
                <div class="coin-contain">
                    <div class="img-contain" v-for="n in 5">
                        <img :src="'/static/images/activity/applet/mayday/light_' + [n<=activityInfo.badgeNum?'':'gray_'] + n +'.png'" alt="" @click="lightBadge">
                    </div>
                </div>
                <div class="timer" v-if="activityInfo.countdownTime!==null">倒计时：{{countdownTimeShow}}</div>
                <div class="title">------&nbsp;&nbsp;精美礼品&nbsp;&nbsp;------</div>
                <img src="/static/images/activity/boss/mayday/pot.jpg" alt="" class="product-pic" v-if="activityInfo.presentGift==='001'">
                <img src="/static/images/activity/boss/mayday/instrument.jpg" alt="" class="product-pic" v-else>
                <div class="store-info">
                    <p class="name">领取门店：{{activityInfo.storeName}}</p>
                    <p class="addr">门店地址：{{activityInfo.connectAddress}}</p>
                </div>
                <div class="view-rules" @click="showRules=true;">查看活动规则</div>
                <div class="no-offline" v-if="activityInfo.discount1===''&&activityInfo.discount2===''&&activityInfo.discount3===''&&activityInfo.consumeMoney===''">
                </div>
            </div>
            <div class="offline" v-if="activityInfo.discount1!==''||activityInfo.discount2!==''||activityInfo.discount3!==''||activityInfo.consumeMoney!==''">
                <div class="title">------&nbsp;&nbsp;&nbsp;五一期间实体门店活动&nbsp;&nbsp;&nbsp;------</div>
                <div class="detail">
                    <p>4月28日（周六）-5月4日（周五） </p>
                    <p>{{activityInfo.storeName}}</p>
                    <p v-if="activityInfo.discount1!==''">2018年春装新款低至{{activityInfo.discount1}}折</p>
                    <p v-if="activityInfo.discount2!==''||activityInfo.discount3!==''">2018年夏季新款<span v-if="activityInfo.discount2!==''"></span>两件{{activityInfo.discount2}}折<span v-if="activityInfo.discount3!==''">，三件{{activityInfo.discount3}}折</span></p>
                    <p v-if="activityInfo.consumeMoney!==''">活动期间进店消费满{{activityInfo.consumeMoney}}元就送价值1200元的<br/>安吉高山纯手工白茶礼包（每人限领一盒）</p>
                    <p>门店地址：{{activityInfo.connectAddress}}</p>
                    <p>联系电话：{{activityInfo.mobileNum}}</p>
                </div>
            </div>
            <div class="btn members" @click="doShare">邀请好友来点亮</div>
        </div>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
                <div class="pop-title">绑定手机</div>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 规则弹窗 -->
        <div class="rule-contain popWindow" v-if="showRules">
            <div class="mask" @click="showRules=false;"></div>
            <div class="rules-contain pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="showRules=false;">
                <p class="title">活动规则</p>
                <div class="rules-words">
                    <p>1.礼品领取时间：2018年4月28日（周六）-5月4日（周五）（逾期不候）</p>
                    <p>2.相同的微信ID、手机号、设备视为同一人。</p>
                    <p>3.请在礼品规定领取时间内进店领取，逾期作废。</p>
                    <p>4.礼品数量有限，领完为止。</p>
                    <p>5.礼品为赠品非卖品，请使用前仔细阅读说明书，本店不承担售后责任哦。</p>
                    <p>6.如用户在活动期间，存在作弊行为，例如虚拟伪造微信好友等情形的，身边店有权终止用户参加本活动。</p>
                    <p>7.礼品不允许代领，需本人凭礼品领取码到门店领取，每人限领一件。</p>
                    <p>8.活动最终解释权归门店所有！</p>
                </div>
            </div>
        </div>
        <!-- 徽章点击提示 -->
        <div class="badgeTip" v-if="showBadgeTip">
            <img src="/static/images/activity/applet/mayday/light_tip.png" alt="" @click="scrollToBadge">
        </div>
        <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
        <!-- 参与状态提示 -->
        <div class="tip popWindow" v-show="tipShow">
            <div class="mask"></div>
            <div class="tip-contain pop-contain" v-show="tipShow==='shareSuccess'">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="tipShow=false;">
                <div class="pop-min-title">分享成功</div>
                <div class="pop-min-tip">倒计时24小时活动结束<br/>如未完成任务可重新发起</div>
                <img src="/static/images/qrcode.jpg" alt="" class="share-img" v-if="subscribeStatus===0">
                <p class="pop-min-tip" v-if="subscribeStatus===0">关注公众号查看活动通知</p>
                <div class="btn" @click="tipShow=false;">确定</div>
            </div>
            <div class="tip-contain pop-contain" v-show="tipShow==='tipTimeout'">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="tipShow=false;">
                <div class="pop-min-title">倒计时结束</div>
                <div class="pop-min-tip">活动未完成</div>
                <div class="btn" @click="tipShow=false;attendActivity();">重新发起活动</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../../fetch/api'
    import maydayApi from '../../../../fetch/mayday_api'
    import * as _validate from "../../../../util/validate"
    import _urlConfig from "../../../../util/urlConfig"
    import wxShareTip from "@/components/common/wxShareTip"

    export default {
        components: {
            wxShareTip
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode,
                staffCode: this.$route.query.staffCode,
                memberCode: this.$route.query.memberCode,
                xd_code: this.$route.query.xd_code,
                activityCode: "7d452712155a4dd19e28393c46fce84b",
                showRules: false,
                signStatus: 0,
                productCode: "001",
                lighted: 3,
                bindMobileNumShow: false,
                noStoreShow: false,
                showBadgeTip: false,
                storeList: [],
                storeListShow: false,
                mobileNum: "",
                verificationCode: "",
                timer: 60,
                timerStatus: false,
                activityInfo: {

                },
                countdownTime: 0,
                countdownTimeShow: "",
                shareTipShow: false,
                //shareSuccess\tipTimeout
                tipShow: false,
                subscribeStatus: 0
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
        methods: {
            scrollToBadge(){
                var anchor = document.querySelector("#target");
                document.querySelector(".content").scrollTop = anchor.offsetTop;
                this.showBadgeTip = false;
            },
            doShare(){
                this.shareTipShow = true;
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0012",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
            },
            //数据收集
            collect: function(data,token){
                // if (token) {
                //     api.collectStatisticsOnActivities("post",data,token).then(res => {});
                // }else{
                //     api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
                // }
            },
            routerLink(path){
                let src = path + "?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode
                this.$router.push({
                    path: src
                })
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
            //验证码倒计时
            countdownTimer: function() {
                if (this.countdownTime > 0) {
                    this.countdownTime -= 1000;
                    let h = Math.floor(this.countdownTime/60/60/1000);
                    let m = Math.floor(this.countdownTime/60/1000%60);
                    let s = Math.floor(this.countdownTime/1000%60);
                    let H = h==0?'00':h<10?'0'+h:h;
                    let M = m==0?'00':m<10?'0'+m:m;
                    let S = s==0?'00':s<10?'0'+s:s;
                    this.countdownTimeShow = H + ":" + M + ":" + S;
                    setTimeout(this.countdownTimer, 1000);
                }else{
                    this.activityInfo.countdownTime = false
                    this.whetherAttend();
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
                        this.checkStore();
                    }else{
                        this.$toast(res.message);
                    }
                })
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
                    this.attendActivity();
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
                                "activityCode": this.activityCode,
                                "openId": this.openId
                            });
                            this.noStoreShow = true;
                        }else if (this.storeList.length===1) {
                            this.storeCode = res.returnContent[0].storeCode;
                            this.attendActivity();
                        }else{
                            this.storeListShow = true;
                        }
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            //参与活动
            attendActivity(){
                maydayApi.attendMayDayActivity("post",{
                    storeCode: this.storeCode||this.activityInfo.storeCode,
                    linkSrcStaff: this.staffCode||this.activityInfo.staffCode
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.storeListShow = false;
                        this.whetherAttend();
                    }else{
                        this.$toast(res.message);
                        this.collect({
                            "xdCode": this.xd_code,
                            "ydCode": "YD0011",
                            "activityCode": this.activityCode,
                            "openId": this.openId
                        });
                    }
                })
            },
            //点亮徽章
            lightBadge(){
                maydayApi.lightUpMayDayActivity("get",{
                    actJoinId: this.activityInfo.actJoinId
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.whetherAttend();
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //门店选择
            selectStore: function(item){
                this.storeCode = item.storeCode;
                this.attendActivity();
            },
            whetherAttend(){
                maydayApi.whetherAttendMayDayActivity("get",{},this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                        this.initWxShare();
                        if (this.activityInfo.badgeNum===5) {
                            this.routerLink("/activity_2018/mayday_success")
                            return;
                        }
                        if (this.activityInfo.countdownTime<0) {
                            this.tipShow = "tipTimeout";
                            return;
                        }
                        if (this.activityInfo.attendFlag===0) {
                            this.checkStore();
                        }
                        if (this.activityInfo.badgeFlag===0) {
                            this.showBadgeTip = true;
                        }
                        if (this.activityInfo.countdownTime!==null) {
                            this.countdownTime = this.activityInfo.countdownTime;
                            this.countdownTimer();
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
            //活动分享
            shareMayDayActivity(){
                maydayApi.shareMayDayActivity("get",{
                    actJoinId: this.activityInfo.actJoinId
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.tipShow = "shareSuccess";
                        this.whetherAttend();
                    }else{
                        this.$toast(res.message);
                    }
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
                        jsApiList: ['onMenuShareAppMessage','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                });
            },
            //初始化分享
            initWxShare: function(){
                let _this = this;
                window.wx.ready(function(){
                    // wx.showMenuItems({
                    //     menuList: [
                    //         "menuItem:share:appMessage",
                    //         "menuItem:share:timeline"
                    //     ] // 要显示的菜单项，所有menu项见附录3
                    // });
                    wx.onMenuShareAppMessage({
                        title: '快来帮我点亮徽章', // 分享标题
                        desc: '我正在参加点亮5枚徽章礼品免费领的活动，快来帮我点亮吧！', // 分享描述
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/mayday_help_other?xd_code=XD0005&storeCode=' + _this.activityInfo.storeCode + '&staffCode=' + (_this.activityInfo.staffCode||"") + '&memberCode=' + _this.activityInfo.memberCode + "&actJoinId=" + (_this.activityInfo.actJoinId||"")), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            _this.collect({
                                "xdCode": _this.xd_code,
                                "ydCode": "YD0013",
                                "activityCode": _this.activityCode,
                                "openId": _this.openId
                            });
                            _this.shareTipShow = false;
                            _this.shareMayDayActivity();
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: '快来帮我点亮徽章', // 分享标题
                        desc: '我正在参加点亮5枚徽章礼品免费领的活动，快来帮我点亮吧！', // 分享描述
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/mayday_help_other?xd_code=XD0005&storeCode=' + _this.activityInfo.storeCode + '&staffCode=' + (_this.activityInfo.staffCode||"") + '&memberCode=' + _this.activityInfo.memberCode + "&actJoinId=" + (_this.activityInfo.actJoinId||"")), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        success: function () {
                            _this.collect({
                                "xdCode": _this.xd_code,
                                "ydCode": "YD0013",
                                "activityCode": _this.activityCode,
                                "openId": _this.openId
                            });
                            _this.shareTipShow = false;
                            _this.shareMayDayActivity();
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            //是否关注公众号
            getSubscribeStatus(){
                api.getSubscribeStatus("get",{
                    openId: this.openId
                }).then((res)=>{
                    if (res.returnCode==='0') {
                        this.subscribeStatus = res.returnContent;
                    }
                })
            }
        },
        mounted(){
            if(sessionStorage.entryMark !== "marked"){
                return;
            }
            //如果是小白，且为导购分享链接，则关注门店
            if (this.storeCode) {
                this.concernStore();
            }
            this.getSubscribeStatus();
            this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0001",
                "activityCode": this.activityCode,
                "srcStaffCode": this.staffCode||"",
                "openId": this.openId
            });
            if (this.tokenInfo.imInfo===null){
                this.bindMobileNumShow = true;
                this.loading = false;
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0004",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
            }else{
                this.whetherAttend();
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0003",
                    "activityCode": this.activityCode,
                    "srcStaffCode": this.staffCode||"",
                    "openId": this.openId
                });
            }
            this.initWxConfig();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .mayday-boss-intro{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            /*height: 100%;*/
            background-color: #d4333a;
            letter-spacing: px2rem(2px);
            overflow: hidden;
            .main_bg{
                display: block;
                width: 100%;
            }
            .act-title{
                position: absolute;
                top: px2rem(286px);
                left: 50%;
                font-size: px2rem(32px);
                color: #c34241;
                transform: translateX(-50%);
                -o-transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                letter-spacing: px2rem(8px);
            }
            .activity-time{
                margin: px2rem(-40px) 0 px2rem(100px);
                font-size: px2rem(36px);
                color: #f3e6b6;
                text-align: center;
            }
            .title{
                font-size: px2rem(32px);
                color: #f3e6b6;
                text-align: center;
                letter-spacing: px2rem(2px);
            }
            .desc{
                overflow: hidden;
                padding-bottom: px2rem(10px);
                .no-offline{
                    width: 100%;
                    height: px2rem(130px);
                }
                .detail{
                    width: px2rem(616px);
                    margin: px2rem(50px) auto 0;
                    line-height: px2rem(50px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    text-indent: px2rem(56px);
                    word-break: break-all;
                }
                .coin-contain{
                    display: flex;
                    justify-content: center;
                    flex-flow: row wrap;
                    padding: px2rem(30px) 0;
                    .img-contain{
                        width: 33%;
                        img{
                            display: block;
                            width: px2rem(164px);
                            height: px2rem(164px);
                            margin: px2rem(30px) auto;
                        }
                    }
                }
                .timer{
                    margin: px2rem(50px) auto;
                    width: px2rem(366px);
                    height: px2rem(68px);
                    font-size: px2rem(26px);
                    color: #c34241;
                    background-color: #ede2b9;
                    line-height: px2rem(68px);
                    border-radius: px2rem(100px);
                    text-align: center;
                }
                .product-pic{
                    width: 100%;
                    height: auto;
                    margin: px2rem(50px) auto;
                }
                .store-info{
                    text-align: center;
                    padding: 0 px2rem(100px);
                    overflow: hidden;
                    .name,.addr{
                        font-size: px2rem(24px);
                        color: #fff;
                        line-height: px2rem(42px);
                        margin: px2rem(20px) 0;
                    }
                }
                .view-rules{
                    width: px2rem(308px);
                    height: px2rem(68px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    line-height: px2rem(68px);
                    background-color: #a42e2b;
                    border-radius: 100px;
                    margin: px2rem(30px) auto px2rem(45px);
                    text-align: center;
                }
            }
            .offline{
                position: relative;
                overflow: hidden;
                border-top: px2rem(10px) solid #a42e2b;
                padding: px2rem(75px) 0 px2rem(235px);
                &:before{
                    content: "";
                    position:absolute;
                    top: px2rem(-10px);
                    left: 0;
                    display: block;
                    width: 100%;
                    border-top: 1px solid #86211e;
                };
                .detail{
                    margin-top: px2rem(55px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    line-height: px2rem(50px);
                    text-align: center;
                }
            }
            .btn{
                position: fixed;
                bottom: px2rem(54px);
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
                background-color: #ffd337;
                border-radius: px2rem(100px);
                box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
            }
        }
        .badgeTip{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index:999;
            background-color: rgba(0,0,0,.6);
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                width: px2rem(632px);
                height: px2rem(804px);
                transform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
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
                -o-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
                overflow: hidden;
                background-color: #d34b4a;
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
                        color: #ff5552;
                        border-bottom: 1px solid #ffcac9;
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
                        color: #c34241;
                        text-align: center;
                        background-color: #ffd337;
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
                    background: -webkit-linear-gradient(-69deg, #f6c43f, #f5e430);
                    background: -moz-linear-gradient(-69deg, #f6c43f, #f5e430);
                    border-radius: px2rem(100px);
                    text-align: center;
                    line-height: px2rem(90px);
                }
            }
            .tip-contain{
                .share-img{
                    display: block;
                    width: px2rem(250px);
                    height: px2rem(250px);
                    margin: px2rem(25px) auto px2rem(0px);
                }
                .pop-min-title{
                    font-size: px2rem(32px);
                    color: #fff;
                    font-weight: bold;
                    margin: px2rem(100px) 0 px2rem(30px);
                    text-align: center;
                }
                .pop-min-tip{
                    font-size: px2rem(24px);
                    color: #fff;
                    line-height: px2rem(54px);
                    text-align: center;
                }
                .btn{
                    position: relative;
                    display: block;
                    width: px2rem(424px);
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    font-size: px2rem(36px);
                    color: #c34241;
                    text-align: center;
                    background-color: #ffd337;
                    border-radius: 200px;
                    margin: px2rem(60px) auto;
                }
            }
        }
    }
</style>
