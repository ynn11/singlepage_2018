<template>
    <div class="mayday-success-manage">
        <div class="main-content">
            <img src="/static/images/activity/boss/mayday/headpic_manage.jpg" class="main-bg" alt="">
            <div class="main-title">恭喜！点亮成功</div>
            <div class="desc">
                <div class="tip">恭喜您5枚徽章已经全部点亮<br/>快使用下方礼品领取码前往门店领取奖品吧！</div>
                <div class="pick-code">{{activityInfo.pickCode.slice(0,3)}}&nbsp;&nbsp;{{activityInfo.pickCode.slice(3,6)}}</div>
                <div class="store-info">
                    <p class="time">礼品领取时间：2018年4月28日-5月4日</p>
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
            <div class="btn" @click="shareTipShow=true;">快把好消息告诉好友</div>
        </div>
        <div class="rule-contain popWindow" v-if="showRules">
            <div class="mask" @click="showRules=false;">
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
        </div>
        <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
    </div>
</template>

<script>
    import api from '../../../../fetch/api'
    import maydayApi from '../../../../fetch/mayday_api'
    import _urlConfig from "../../../../util/urlConfig"
    import * as _validate from '../../../../util/validate'
    import wxShareTip from "@/components/common/wxShareTip"

    export default {
        components: {
            wxShareTip
        },
        data() {
            return {
                storeCode: this.$route.query.storeCode,
                staffCode: this.$route.query.staffCode,
                activityCode: "7d452712155a4dd19e28393c46fce84b",
                showRules: false,
                activityInfo: {
                    pickCode: "123456"
                },
                shareTipShow: false
            }
        },
        computed: {
            tokenInfo () {
                let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
                return tokenInfo
            }
        },
        //判断重复进入
        beforeRouteEnter(to, from, next) {
            next((vm) => {
                if(sessionStorage.entryMark1 !== "marked"){
                    sessionStorage.entryMark1 = "marked"
                    vm.$router.go(0);
                    return;
                }
            })
        },
        methods: {
            routerLink(path){
                let src = path + "?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode
                this.$router.push({
                    path: src
                })
            },
            whetherAttend(){
                maydayApi.whetherAttendMayDayActivity("get",{},this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                        this.initWxShare();
                        if (this.activityInfo.attendFlag===0) {
                            this.routerLink('/activity_2018/mayday_index');
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
                        title: '点亮徽章礼品免费领', // 分享标题
                        desc: '劳动者最光荣，一起点亮荣耀徽章，精品礼品免费领。', // 分享描述
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/mayday_index?xd_code=XD0005&storeCode=' + _this.activityInfo.storeCode + '&staffCode=' + (_this.activityInfo.staffCode||"") + '&memberCode=' + _this.activityInfo.memberCode), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            _this.shareTipShow = false;
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: '点亮徽章礼品免费领', // 分享标题
                        desc: '劳动者最光荣，一起点亮荣耀徽章，精品礼品免费领。', // 分享描述
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/mayday_index?xd_code=XD0005&storeCode=' + _this.activityInfo.storeCode + '&staffCode=' + (_this.activityInfo.staffCode||"") + '&memberCode=' + _this.activityInfo.memberCode), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                        success: function () {
                            _this.shareTipShow = false;
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
        },
        mounted(){
            this.whetherAttend();
            this.initWxConfig();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .mayday-success-manage{
        position: relative;
        height: 101%;
        background-color: #d4333a;
        .main-content{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            background-color: #d4333a;
            .main-bg{
                display: block;
                width: 100%;
            }
            .main-title{
                font-size: px2rem(32px);
                color: #c34241;
                margin-top: px2rem(-70px);
                text-align: center;
                letter-spacing: px2rem(5px);
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
                .tip{
                    width: px2rem(616px);
                    margin: px2rem(50px) auto 0;
                    line-height: px2rem(50px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    text-align: center;
                    word-break: break-all;
                }
                .pick-code{
                    width: px2rem(612px);
                    height: px2rem(102px);
                    line-height: px2rem(102px);
                    background-color: #d34b4a;
                    border-radius: px2rem(16px);
                    font-size: px2rem(48px);
                    color: #f3e6b6;
                    font-weight: bold;
                    text-align: center;
                    margin: px2rem(45px) auto;
                    box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
                }
                .store-info{
                    text-align: center;
                    padding: 0 px2rem(100px);
                    overflow: hidden;
                    .time,.name,.addr{
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
                background: url(/static/images/activity/boss/mayday/pop_bg.jpg) center center no-repeat;
                background-size: 100% 100%;
                &.rules-contain{
                    border-radius: px2rem(8px);
                    padding-bottom: px2rem(54px);
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
        }
    }
</style>
