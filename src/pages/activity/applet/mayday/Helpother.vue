<template>
    <div class="mayday-help-other">
        <div class="mainContent">
            <img src="/static/images/activity/boss/mayday/headpic.jpg" class="main_bg" alt="">
            <div class="act-title">精美礼品免费领</div>
            <div class="activity-time">活动时间：4月25日-5月04日</div>
            <div class="desc" id="target">
                <div class="title">------&nbsp;&nbsp;活动内容&nbsp;&nbsp;------</div>
                <div class="detail" style="">
                    您的好友“{{activityInfo.nickName}}”邀请您帮TA点亮荣耀徽章。点亮5枚徽章，
                    <span v-if="activityInfo.presentGift==='001'">养身茶壶五件套</span>
                    <span v-else>3D美容瘦脸仪</span>
                    即可免费领！
                </div>
                <div class="coin-contain">
                    <div class="img-contain" v-for="n in 5">
                        <img :src="'/static/images/activity/applet/mayday/light_' + [n<=activityInfo.badgeNum?'':'gray_'] + n +'.png'" alt="" @click="lightBadge">
                    </div>
                </div>
                <div class="title">------&nbsp;&nbsp;精美礼品&nbsp;&nbsp;------</div>
                <img src="/static/images/activity/boss/mayday/pot.jpg" alt="" class="product-pic" v-if="activityInfo.presentGift==='001'">
                <img src="/static/images/activity/boss/mayday/instrument.jpg" alt="" class="product-pic" v-else>
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
            <div class="btn members" @click="routerLink('/activity_2018/mayday_index')">我也要领取</div>
        </div>
        <!-- 规则弹窗 -->
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
        <!-- 没有门店 -->
        <div class="tip popWindow" v-show="tipShow">
            <div class="mask"></div>
            <div class="tip-contain pop-contain" v-show="tipShow==='tipSuccess'">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="tipShow=false;">
                <img :src="'/static/images/activity/applet/mayday/light_' + ligthed +'.png'" alt="" class="light">
                <div class="pop-min-title">点亮成功</div>
                <div class="pop-min-tip">谢谢您帮“{{activityInfo.nickName}}”点亮勋章<br/>点亮5枚徽章，礼品您也可以免费领</div>
                <div class="btn" @click="tipShow=false;">确定</div>
            </div>
            <div class="tip-contain pop-contain" v-show="tipShow==='tipTimeout'">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="tipShow=false;">
                <div class="pop-min-title">好友发起的活动已过期</div>
                <div class="pop-min-tip">点亮5枚勋章，<br/>礼品您也可以免费领！</div>
                <div class="btn" @click="tipShow=false;">确定</div>
            </div>
            <div class="tip-contain pop-contain" v-show="tipShow==='tipDone'">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="tipShow=false;">
                <div class="pop-min-title">徽章已全部点亮</div>
                <div class="pop-min-tip">点亮5枚勋章，<br/>礼品您也可以免费领！</div>
                <div class="btn" @click="tipShow=false;">确定</div>
            </div>
        </div>
        <!-- 徽章点击提示 -->
        <div class="badgeTip" v-if="showBadgeTip">
            <img src="/static/images/activity/applet/mayday/light_tip.png" alt="" @click="scrollToBadge">
        </div>
    </div>
</template>

<script>
    import api from '../../../../fetch/api'
    import maydayApi from '../../../../fetch/mayday_api'

    export default {
        data() {
            return {
                storeCode: this.$route.query.storeCode,
                staffCode: this.$route.query.staffCode,
                memberCode: this.$route.query.memberCode,
                xd_code: this.$route.query.xd_code,
                actJoinId: this.$route.query.actJoinId,
                activityCode: "7d452712155a4dd19e28393c46fce84b",
                activityInfo: {

                },
                showRules: false,
                showBadgeTip: false,
                //tipSuccess\tipTimeout\tipDone
                tipShow: false,
                ligthed: 1
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
            scrollToBadge(){
                var anchor = document.querySelector("#target");
                document.querySelector(".content").scrollTop = anchor.offsetTop;
                this.showBadgeTip = false;
            },
            //数据收集
            collect: function(data,token){
                if (token) {
                    api.collectStatisticsOnActivities("post",data,token).then(res => {});
                }else{
                    api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
                }
            },
            routerLink(path){
                let src = path + "?storeCode=" + this.storeCode + "&staffCode=" + (this.staffCode||"") + "&xd_code=" + (this.xd_code||"") + "&memberCode=" + (this.memberCode||"");
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
            //点亮徽章
            lightBadge(){
                maydayApi.lightUpMayDayActivity("get",{
                    actJoinId: this.actJoinId
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        if(this.activityInfo.effectFlag===0){
                            this.tipShow = "tipTimeout";
                        }else if (this.activityInfo.badgeNum===5) {
                            this.tipShow = "tipDone";
                        }else{
                            this.ligthed = res.returnContent.badgeNum + 1;
                            this.tipShow = "tipSuccess";
                            this.whetherLighted();
                        }
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //是否点亮过
            whetherLighted(){
                maydayApi.whetherLightUpMayDayActivity("get",{
                    actJoinId: this.actJoinId
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                        if (this.activityInfo.actJoinAppUserCode===this.tokenInfo.imInfo.accid) {
                            this.routerLink('/activity_2018/mayday_index');
                        }
                        if(this.activityInfo.effectFlag===0){
                            this.tipShow = "tipTimeout";
                        }else if (this.activityInfo.badgeNum===5) {
                            this.tipShow = "tipDone";
                        }
                        if (this.activityInfo.lightUpFlag===0) {
                            this.showBadgeTip = true;
                        }
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
        },
        mounted(){
            //如果是小白，且为导购分享链接，则关注门店
            if (this.storeCode) {
                this.concernStore();
            }
            this.whetherLighted();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .mayday-help-other{
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
                border-bottom: 1px solid #86211e;
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
                .light{
                    display: block;
                    width: px2rem(164px);
                    height: px2rem(164px);
                    margin: px2rem(125px) auto px2rem(-40px);
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
