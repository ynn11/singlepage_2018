<template>
    <div :class="'midautumn-boss-intro ' + [showRules?'static':'']">
        <activityHeader type="app" title="活动报名"></activityHeader>
        <div class="main-container">
            <img src="/static/images/activity/boss/midAutumn/header.jpg" class="header-bg" alt="">
            <img src="/static/images/activity/boss/midAutumn/bottom.jpg" class="bottom-bg" alt="">
            <div class="main-content">
                <div class="act-time"></div>
                <div class="act-container act-content">
                    <img class="corner top left" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <img class="corner top right" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <img class="corner bottom left" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <img class="corner bottom right" src="/static/images/activity/boss/midAutumn/corner.png"></img>
                    <h2 class="slogan">中秋+国庆，想做活动？<br/>可是太忙，没有时间策划活动？<br/>看看我们为您定制的活动！</h2>
                    <h3 class="title">1.中秋节：线上锁销，线下领取</h3>
                    <p>消费者在线上支付69元并分享活动即可获得中秋礼包：XX元（您设定金额）门店代金券一张（10月31日前有效）及市值288元的月饼一盒（订货价40元）</p>
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
                    <h3 class="title">2.国庆节：线上派发折扣券</h3>
                    <p>身边店系统向门店所有会员派发：通用X折券一张，两件商品以上可用X折券一张（折扣由门店自行设置）。并以微信告知会员门店优惠活动。<br/>新注册会员在注册成功后发放折扣券，吸引新会员注册。</p>
                    <p class="sign-time">活动报名时间：9月5日-11日</p>
                    <div class="view-rules" @click="showRules=true;">点击查看活动详情</div>
                </div>
                <div class="btn-contain" v-if="signStatus===0">
                    <div class="btn doShare" @click="doSign">立即报名</div>
                    <div class="btn uninterest" @click="uninterestMark" v-if="uninterest===false">不感兴趣</div>
                    <div class="btn uninterest gray" v-else>已收到您的反馈</div>
                </div>
                <div class="padding" v-else></div>
            </div>
        </div>
        <div class="btn-float btn-setting" v-if="signStatus===1" @click="routerLink('/activity_2018/midautumn_boss_manage')">已报名活动，设置活动</div>
        <div class="btn-float btn-data" v-else-if="signStatus===2" @click="routerLink('/activity_2018/midautumn_boss_data')">查看活动数据</div>
        <div class="rule-contain popWindow" v-show="showRules">
            <div class="mask" @click="showRules=false;" @touchmove="preventBgMove"></div>
            <div class="pop-contain">
                <img src="/static/images/activity/boss/midAutumn/rules_wave.png" alt="" class="top-wave">
                <img src="/static/images/activity/close_gray_new.png" alt="" class="close" @click="showRules=false;">
                <div class="rules-contain" id="rule-contain">
                    <p class="title">活动须知</p>
                    <p><b>举例：</b>每售出一个中秋礼包，会员在线上传播了活动，在线下到店，同时代金券刺激了他消费。中秋礼包售价为69元,会员获得X元代金券1张及月饼一盒，门店成本=月饼成本+导购奖励。</p>
                    <p><b>活动说明：</b>本活动时间 9.15-10.7，在中秋假期前七天开启，该活动有中秋活动及国庆活动两部分组成。中秋活动以月饼吸引客户线下到店，国庆活动向全体会员线上发放优惠，会员在家也能得知门店优惠。</p>
                    <p><b>参数设定建议：</b>系统会根据您输入的门店单件商品价格为您推荐设定参数，若您不满意可在想修改的位置直接输入修改。</p>
                </div>
                <img src="/static/images/activity/boss/midAutumn/rules_wave.png" alt="" class="bottom-wave">
            </div>
        </div>
    </div>
</template>

<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import midautumnApi from '../../../../fetch/midautumn_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader,
            "mt-swipe": Swipe,
            "mt-swipe-item":SwipeItem
        },
        data() {
            return {
                token: this.$route.query.token||"",
                type: this.$route.query.type,
                activityCode: "07c88cf75b53489c99b503c15a9b0bd7",
                showRules: false,
                signStatus: 0,
                seipeList: [
                    "https://static.storeer.com/activity_2018/boss/midautumn/01.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/02.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/03.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/04.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/05.jpg",
                    "https://static.storeer.com/activity_2018/boss/midautumn/06.jpg",
                ],
                uninterest: (localStorage.uninterest||false)
            }
        },
        methods: {
            //不感兴趣记录
            uninterestMark(){
                midautumnApi.recordNointentMer("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.$toast("已收到您的反馈，谢谢");
                        localStorage.uninterest = true;
                        this.uninterest = true;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //获取报名信息
            getMerActStatus(){
                midautumnApi.getDualActMerStatus("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.signStatus = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //报名活动
            doSign(){
                midautumnApi.joinedAct("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.routerLink("/activity_2018/midautumn_boss_manage")
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            routerLink(path){
                let src = path + "?token=" + this.token + "&type=" + this.type
                this.$router.push({
                    path: src
                })
            },
            preventBgMove(e){
                // e.preventDefault();
                e.stopPropagation();
            },

        },
        mounted(){
            this.getMerActStatus();
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
            overflow: hidden;
            padding-top: px2rem(80px);
            background-color: #003369;
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
                .act-time{
                    position: absolute;
                    top: px2rem(50px);
                    left: px2rem(510px);
                    width: px2rem(60px);
                    height: px2rem(172px);
                    background: url(/static/images/activity/boss/midAutumn/sign_time.png) top center no-repeat;
                    background-size: 100% 100%;
                }
                .act-container{
                    position: relative;
                    width: px2rem(635px);
                    margin: px2rem(468px) auto px2rem(20px);
                    background-color: #fcfbcd;
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
                        font-size: px2rem(28px);
                        height: px2rem(45px);
                        line-height: px2rem(45px);
                        color: #5c4004;
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
                    p{
                        font-size: px2rem(24px);
                        color: #5c4004;
                        line-height: px2rem(50px);
                        padding: 0 px2rem(40px);
                        text-indent: px2rem(24px);
                    }
                    .sign-time{
                        font-size: px2rem(28px);
                        margin-top: px2rem(40px);
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
                        width: 100%;
                        height: px2rem(300px);
                        margin: px2rem(10px) auto px2rem(30px);
                        video{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .view-rules{
                        font-size: px2rem(30px);
                        color: #5c4004;
                        line-height: px2rem(80px);
                        margin-bottom: px2rem(30px);
                        text-decoration: underline;
                    }
                }
                .btn-contain{
                    overflow: hidden;
                    padding-bottom: px2rem(54px);
                    .btn{
                        width: px2rem(500px);
                        height: px2rem(90px);
                        line-height: px2rem(90px);
                        font-size: px2rem(30px);
                        font-weight: bold;
                        color: #714e04;
                        text-align: center;
                        margin: px2rem(60px) auto;
                        background: linear-gradient(-102deg,#ffba00,#ffea00);
                        border-radius: px2rem(100px);
                        box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
                        &.uninterest{
                            background: linear-gradient(-102deg,#f8f4c4,#faf8de);

                        }
                        &.gray{
                            background: linear-gradient(-102deg,#fff,#ddd);
                        }
                    }
                }
                .padding{
                    height: px2rem(260px);
                }
            }
        }
        .btn-float{
            position: fixed;
            top: 100%;
            left: 50%;
            transform: translate(-50%,px2rem(-250px));
            width: px2rem(500px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            font-size: px2rem(30px);
            font-weight: bold;
            color: #714e04;
            text-align: center;
            margin: px2rem(60px) auto;
            background: linear-gradient(-102deg,#ffba00,#ffea00);
            border-radius: px2rem(100px);
            box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
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
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    line-height: px2rem(116px);
                    text-align: center;
                }
            }
        }
    }
</style>
