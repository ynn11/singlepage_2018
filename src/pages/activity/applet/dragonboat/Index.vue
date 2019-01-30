<template>
    <div class="dragonboat-applet-index">
        <div class="main-container">
            <div class="act-time">
                <p>端午节活动时间：</p>
                <p>2018年6月6日 — 6月18日</p>
            </div>
            <img src="/static/images/activity/applet/dragonboat/header_bg.jpg" class="header_bg" alt="">
            <div class="main-content">
                <img src="/static/images/activity/applet/dragonboat/tit_header.jpg" alt="" class="tit-header">
                <div class="act-container act-product">
                    <div class="tie-contain">
                        <div class="nail"></div>
                        <div class="tie"></div>
                    </div>
                    <div class="intro-video">
                        <video controls="" name="media" poster="https://img.alicdn.com/imgextra/i3/6000000005918/TB2iWpUfFooBKNjSZFPXXXa2XXa_!!6000000005918-0-tbvideo.jpg_600x600.jpg">
                            <source src="https://static.storeer.com/activity_2018/boss/drangonboat_gift.mp4" type="video/mp4">
                        </video>
                    </div>
                    <img src="/static/images/activity/guide/dragonboat/gift.jpg" alt="" class="product-pic">
                    <img src="/static/images/activity/applet/dragonboat/zongzi_1.jpg" alt="" class="product-pic">
                    <img src="/static/images/activity/applet/dragonboat/zongzi_2.jpg" alt="" class="product-pic">
                    <img src="/static/images/activity/applet/dragonboat/zongzi_3.jpg" alt="" class="product-pic">
                </div>
                <div class="act-container act-conpons">
                    <div class="coupons-item">
                        <span class="num">{{storeSet.couponMoney||""}}</span>
                    </div>
                    <div class="coupons-item">
                        <span class="num">{{storeSet.couponMoney||""}}</span>
                    </div>
                    <div class="coupons-item">
                        <span class="num">{{storeSet.couponMoney||""}}</span>
                    </div>
                </div>
                <img src="/static/images/activity/applet/dragonboat/tit_content.jpg" alt="" class="tit-content">
                <div class="act-container act-content">
                    <div class="title">活动内容</div>
                    <p class="intro-words"><span class="green">粽子一盒，有豆沙，有大肉，有蛋黄，设计师独立作品，市场售价80元免费送给你，再加本店{{storeSet.couponMoney||""}}元的现金券3张，每件衣服只限一张代金券，端午节我们爱的粽是你，全城限额100名，只限5天，要就行动！</span></p>
                    <img src="/static/images/activity/applet/dragonboat/divider.jpg" alt="" class="divider">
                    <div class="store-info">
                        <p class="store-name">领取门店：{{storeSet.storeName}}</p>
                        <p class="store-addr">门店地址：{{storeSet.connectAddress}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="buy-btn" @click="buy">立即购买礼包</div>
        <!-- 绑定手机号 -->
        <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
            <div class="mask"></div>
            <div class="bindMobileNum-contain pop-contain">
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
                <p class="share-tip">亲！<br/>最后一步了分享一下朋友圈！<br/>让你的好友也知道我们的活动！<br/>就能领取赠品拉！<br/>这粽子可是畅销品，备货不足哦～<br/>快些去吧！</p>
                <div class="btn" @click="shareTipShow=true;">告诉我的好朋友们</div>
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
                activityCode: "e7aa087b5e2e11e88e64704d7b87a020",
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
                    this.initWxShare({
                        title: "你没见过的粽子！",
                        desc: "这样的粽子，第一次见，免费送！这样的福利，第一次见，快来领！",
                        link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/dragonboat_index?xd_code=XD0005&storeCode=' + (this.storeCode||this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode||this.activityInfo.linkStaffCode||"") + '&memberCode=' + this.activityInfo.memberCode)
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
                    if (this.activityInfo.shareFlag===1) {
                        this.routerLink("/activity_2018/dragonboat_gifts");
                    }else if(this.activityInfo.attendFlag===1){
                        this.shareShow = true;
                    }else{
                        this.checkStore();
                    }
                });
            },
            //购买礼包/参加活动
            buy(){
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
    .dragonboat-applet-index{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            .header_bg{
                display: block;
                width: 100%;
                z-index: 1;
            }
            .act-time{
                position: absolute;
                top: px2rem(308px);
                width: 100%;
                p{
                    font-size: px2rem(24px);
                    color: #202125;
                    line-height: px2rem(50px);
                    text-align: center;
                }
            }
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                background-color: #009944;
                .tit-header{
                    display: block;
                    width: px2rem(262px);
                    margin: px2rem(100px) auto;
                }
                .tit-content{
                    display: block;
                    width: px2rem(708px);
                    margin: px2rem(80px) auto px2rem(40px);
                }
                .act-container{
                    position: relative;
                    width: px2rem(635px);
                    &.act-product{
                        margin: 0 auto px2rem(40px);
                        background-color: #fffded;
                        border-radius: px2rem(12px);
                        border-top: 1px solid transparent;
                        padding: 0 px2rem(20px) px2rem(88px);
                        .tie-contain{
                            position: relative;
                            width: px2rem(344px);
                            height: px2rem(30px);
                            margin: px2rem(30px) auto px2rem(64px);
                            &:before{
                                position: relative;
                                float: left;
                                content: "";
                                width: px2rem(30px);
                                height: px2rem(30px);
                                border-radius: 50%;
                                background-color: #072d44;
                                z-index: 1;
                            }
                            &:after{
                                position: relative;
                                float: right;
                                content: "";
                                width: px2rem(30px);
                                height: px2rem(30px);
                                border-radius: 50%;
                                background-color: #072d44;
                                z-index: 1;
                            }
                            .nail{
                                position: absolute;
                                top: px2rem(-80px);
                                left: 50%;
                                transform: translateX(-50%);
                                width: px2rem(41px);
                                height: px2rem(41px);
                                border-radius: 50%;
                                background-color: #fdfbe4;
                                z-index: 3;
                            }
                            .tie{
                                position: relative;
                                z-index: 2;
                                width: 100%;
                                height: 1px;
                                &:before{
                                    position: absolute;
                                    top: px2rem(-34px);
                                    left: 0;
                                    transform: rotate(-27deg);
                                    content: "";
                                    width: px2rem(190px);
                                    height: px2rem(16px);
                                    border-radius: px2rem(8px);
                                    background-color: #ded465;
                                }
                                &:after{
                                    position: absolute;
                                    top: px2rem(-34px);
                                    right: 0;
                                    content: "";
                                    transform: rotate(27deg);
                                    width: px2rem(190px);
                                    height: px2rem(16px);
                                    border-radius: px2rem(8px);
                                    background-color: #ded465;
                                }
                            }
                        }
                        .intro-video{
                            width: 100%;
                            height: px2rem(300px);
                            margin: 0 auto;
                            video{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .product-pic{
                            display: block;
                            width: 100%;
                            margin: px2rem(40px) auto;
                        }
                    }
                    &.act-content{
                        width: px2rem(675px);
                        background-color: #fff;
                        margin: 0 auto px2rem(330px);
                        border-radius: px2rem(12px);
                        padding: px2rem(40px) 0 0;
                        overflow: hidden;
                        .divider{
                            display: block;
                            width: 100%;
                        }
                        .intro-words{
                            margin: px2rem(40px) 0;
                        }
                        .store-info{
                            background-color: #f4efd6;
                            overflow: hidden;
                            p{
                                font-size: px2rem(26px);
                                line-height: px2rem(32px);
                                color: #343434;
                                margin: px2rem(40px) 0;
                                padding-left: px2rem(80px);
                                &:before{
                                    font-size: px2rem(30px);
                                    font-family:"iconfont";
                                    color: #87a587;
                                    margin-left: px2rem(-40px);
                                    margin-right: px2rem(10px);
                                }
                            }
                            .store-name{
                                &:before{
                                    content: "\e616";
                                }
                            }
                            .store-addr{
                                &:before{
                                    content: "\e606";
                                }
                            }
                        }
                    }
                    &.act-conpons{
                        width: px2rem(655px);
                        padding: px2rem(68px) px2rem(10px);
                        background-color: #ffe326;
                        border-radius: px2rem(12px);
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-around;
                        .coupons-item{
                            width: px2rem(180px);
                            height: px2rem(130px);
                            background: url(/static/images/activity/applet/dragonboat/coupons_bg.jpg) center no-repeat;
                            background-size: 100% 100%;
                            text-align: center;
                            overflow: hidden;
                            line-height: px2rem(170px);
                            .num{
                                font-size: px2rem(58px);
                                color: #fff;
                                &:after{
                                    content: "￥";
                                    font-size: px2rem(28px);
                                }
                            }
                        }
                    }
                    .title{
                        width: px2rem(260px);
                        height: px2rem(124px);
                        margin: 0 auto;
                        background: url(/static/images/activity/boss/dragonboat/title_bg.png) center no-repeat;
                        background-size: 100% 100%;
                        line-height: px2rem(114px);
                        text-align: center;
                        text-indent: px2rem(-20px);
                        font-size: px2rem(24px);
                        color: #fff;
                    }
                    p{
                        font-size: px2rem(24px);
                        color: #202125;
                        line-height: px2rem(60px);
                        padding: 0 px2rem(40px);
                        .green{
                            color: #0f8157;
                        }
                        .orange{
                            color: #f07511;
                        }
                        .large{
                            font-size: px2rem(36px);
                        }
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
            color: #007301;
            text-align: center;
            background-color: #ffde00;
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
                background-color: #009a44;
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
                        color: #ffe010;
                        text-align: center;
                        background-color: #009a44;
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
                background: url(/static/images/activity/applet/dragonboat/pop_share_bg.jpg) center center no-repeat;
                background-size: 100% 100%;
                padding: px2rem(100px) 0;
                .share-tip{
                    font-size: px2rem(26px);
                    color: #108c10;
                    line-height: px2rem(60px);
                    text-align: center;
                }
                .btn{
                    position: relative;
                    display: block;
                    width: px2rem(572px);
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    font-size: px2rem(36px);
                    color: #fff;
                    text-align: center;
                    background: linear-gradient(-90deg, #108b10, #21c839);
                    border-radius: 200px;
                    margin: px2rem(60px) auto 0;
                }
            }
        }
    }
</style>
