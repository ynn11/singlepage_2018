<template>
    <div class="mayday-boss-intro">
        <activityHeader type="app" title="活动报名"></activityHeader>
        <div class="mainContent">
            <img src="/static/images/activity/boss/mayday/headpic.jpg" class="main_bg" alt="">
            <div class="act-title">精美礼品免费领</div>
            <div class="activity-time">报名时间：4月20日-4月22日</div>
            <div class="desc">
                <div class="title">------  活动内容  ------</div>
                <div class="detail" style="">五一活动为线上与门店活动相结合形式。线上通过邀请好友帮忙点亮徽章的活动形式，使老会员去邀请身边的亲朋好友成为身边店的新会员。新会员再去拉新，使会员数快速增长，同时通过到店自提精美礼品时配合门店的让利活动，将流量转化变现，带来营业收入。</div>
                <div class="view-rules" @click="showRules=true;">查看报名须知</div>
            </div>
            <div class="product">
                <div class="title">------  活动商品  ------</div>
                <img src="/static/images/activity/boss/mayday/pot.jpg" alt="" class="product-pic">
                <div class="product-name">养身茶壶五件套</div>
                <img src="/static/images/activity/boss/mayday/instrument.jpg" alt="" class="product-pic">
                <div class="product-name">3D美容瘦脸仪</div>
                <img src="/static/images/activity/boss/mayday/tea.jpg" alt="" class="product-pic">
                <div class="product-name">安吉高山白茶</div>
            </div>
            <div class="btn doShare" @click="doSign" v-if="signStatus===0">立即参与</div>
            <div class="btn members" @click="routerLink('/activity_2018/mayday_boss_manage')" v-else>查看活动</div>
        </div>
        <div class="rule-contain popWindow" v-if="showRules">
            <div class="mask" @click="showRules=false;" @touchmove="preventBgMove"></div>
                <div class="rules-contain pop-contain">
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="showRules=false;">
                    <p class="title">报名须知</p>
                    <div class="rules-words">
                        <p>1.选择参加活动的门店；</p>
                        <p>2.确认实体门店的活动力度，例如：2018年春装新款低至X折 2018年夏季新款两件X折  三件X折，以及活动期间进店消费满xxx元就送价值1200元的安吉高山纯手工白茶礼包（每人限领一盒）；</p>
                        <p>3.线上活动参加成功就送免费礼品，“3D美容瘦脸仪”与“养生茶壶五件套”二选一，由门店自主选择（只能选择一个）；</p>
                        <p>4.确认每家门店礼品的采购数量，礼品包含3D美容瘦脸仪/养生茶壶五件套和安吉高山纯手工白茶礼包250g；</p>
                        <p>5.每送出一个3D美容瘦脸仪/养生茶壶五件套，奖励导购多少元（建议3元），此费用由门店承担，需门店确认并填写。</p>
                        <p>6.请于活动前保持账户余额充足，礼品采购金额以及导购奖励金将从账号余额里面扣除；</p>
                        <p>7.请于活动前将门店海报、吊旗、地贴等和活动相关的物料布置好，打造良好的活动氛围，提升活动整体效果；</p>
                        <p>8.请于活动进行时鼓励导购积极参与到活动中来，积极转发活动，以及顾客到店做好货品的推销以及服务工作；</p>
                        <p>9.活动中有任何意见和建议请于身边店客服联系，感谢您的积极参与！</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import maydayApi from '../../../../fetch/mayday_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token||this.$route.query.token1.replace("null?token=",""),
                type: this.$route.query.type,
                activityCode: "7d452712155a4dd19e28393c46fce84b",
                showRules: false,
                signStatus: 0
            }
        },
        methods: {
            //获取报名信息
            getMerActStatus(){
                maydayApi.getMerActStatus("get",{
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
                maydayApi.joinedAct("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.routerLink("/activity_2018/mayday_boss_manage")
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
    .mayday-boss-intro{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            /*height: 100%;*/
            background-color: #d4333a;
            letter-spacing: px2rem(2px);
            overflow: hidden;
            padding-top: px2rem(80px);
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
            .desc{
                overflow: hidden;
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    text-align: center;
                    letter-spacing: px2rem(2px);
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
                .view-rules{
                    width: px2rem(308px);
                    height: px2rem(68px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    line-height: px2rem(68px);
                    background-color: #a42e2b;
                    border-radius: 100px;
                    margin: px2rem(80px) auto px2rem(120px);
                    text-align: center;
                }
            }
            .product{
                overflow: hidden;
                padding-bottom: px2rem(150px);
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    text-align: center;
                    letter-spacing: px2rem(2px);
                    margin-bottom: px2rem(54px);
                }
                .product-pic{
                    display: block;
                    width: px2rem(514px);
                    height: px2rem(322px);
                    margin: 0 auto px2rem(34px);
                }
                .product-name{
                    width: px2rem(514px);
                    height: px2rem(57px);
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    line-height: px2rem(57px);
                    background-color: #a42e2b;
                    margin: 0 auto px2rem(80px);
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
