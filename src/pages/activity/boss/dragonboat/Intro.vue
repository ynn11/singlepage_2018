<template>
    <div :class="'dragonboat-boss-intro ' + [showRules?'static':'']">
        <activityHeader type="app" title="活动报名"></activityHeader>
        <div class="main-container">
            <img src="/static/images/activity/boss/dragonboat/intro_bg.jpg" class="main_bg" alt="">
            <div class="main-content">
                <div class="act-time">
                    <p>端午节活动报名时间：</p>
                    <p>2018年6月1日 — 6月2日</p>
                </div>
                <div class="act-container act-content">
                    <div class="title">活动内容</div>
                    <p><span class="green">消费者在线支付XX元（门店自行设定）即可获得XX元（门店自行设定）门店代金券三张，可在9月10日之前消费，过期自动消失，并且获得市价80元的设计师品牌粽子一盒（具体按照端午节具体调整，在70-80元正常售价之间，由于是时令性商品所以采购价30元，市场最低采购价），内含2个鲜肉，2个蛋黄，2个豆沙，全部商品产自浙江嘉兴——粽子之乡。</span></p>
                    <div class="intro-video">
                        <video controls="" name="media" poster="https://img.alicdn.com/imgextra/i3/6000000005918/TB2iWpUfFooBKNjSZFPXXXa2XXa_!!6000000005918-0-tbvideo.jpg_600x600.jpg">
                            <source src="https://static.storeer.com/activity_2018/boss/drangonboat_gift.mp4" type="video/mp4">
                        </video>
                    </div>
                    <div class="view-rules" @click="showRules=true;">查看报名须知</div>
                </div>
            </div>
        </div>
        <div class="rule-contain popWindow" v-show="showRules">
            <div class="mask" @click="showRules=false;" @touchmove="preventBgMove"></div>
            <div class="pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="showRules=false;">
                <div class="rules-contain" id="rule-contain">
                    <p class="title">活动说明</p>
                    <p>建议：夏季T恤在<span class="orange"> 150 </span>元左右的门店可以设定消费者支付<span class="orange"> 50 </span>元，获得三张<span class="orange"> 30 </span>元的代金券；<span class="orange"> 250 </span>元左右门店可以设定消费者支付<span class="orange"> 60 </span>元，获得三张<span class="orange"> 50 </span>元的代金券。</p>
                    <p>说明：举例一家门店设定50元消费可以获得30元代金券3张，那么门店的成本是30元粽子+5元导购奖励=35元，门店可以获得15元的纯利润，每件衣服消费者都能抵用一张代金券。</p>
                    <p>申明：本次活动开启时间会在端午放假前一个礼拜，正是吸取了五一活动的经验，并且五一活动期间平均每家门店的活动知晓度是8000人次，所以本次活动我们希望能帮助门店提升整体的进店率和成交率。</p>
                    <p class="title">身边店奖励</p>
                    <p>本次活动前100名销售代金券导购，并且最低不少于<span class="orange">14 </span>张的导购将会获得身边店发放的<span class="orange"> 200 </span>元奖励；活动代金券销售最多的前五门店将会获得价值<span class="orange"> 5980 </span>元的《全球首届服装新零售盛典》门票一张，主办方身边店，协办方中国服装协会，互联网中国新零售联盟。</p>
                </div>
                <p class="scroll-tip">上滑可以查看更多<i class="iconfont icon-xiajiantou"></i></p>
            </div>
        </div>
        <div class="btn doShare" @click="doSign" v-if="signStatus===0">立即参与</div>
        <div class="btn members" @click="routerLink('/activity_2018/dragonboat_boss_manage')" v-else>查看活动</div>
    </div>
</template>

<script>
    import dragonboatApi from '../../../../fetch/dragonboat_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token||"",
                type: this.$route.query.type,
                activityCode: "e7aa087b5e2e11e88e64704d7b87a020",
                showRules: false,
                signStatus: 0
            }
        },
        methods: {
            //获取报名信息
            getMerActStatus(){
                dragonboatApi.getMerActStatus("get",{
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
                dragonboatApi.joinedAct("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.routerLink("/activity_2018/dragonboat_boss_manage")
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
    .dragonboat-boss-intro{
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
            .main_bg{
                position: absolute;
                width: 100%;
                z-index: 1;
            }
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                .act-time{
                    margin-top: px2rem(310px);
                    p{
                        font-size: px2rem(24px);
                        color: #202125;
                        line-height: px2rem(50px);
                        text-align: center;
                    }
                }
                .act-container{
                    position: relative;
                    width: px2rem(635px);
                    margin: px2rem(490px) auto px2rem(200px);
                    padding: px2rem(40px) 0;
                    background: url(/static/images/activity/boss/dragonboat/bg_border.png) center no-repeat;
                    background-size: 100% 100%;
                    background-color: #fff;
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
                    .intro-video{
                        width: 100%;
                        height: px2rem(300px);
                        video{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .view-rules{
                        width: px2rem(500px);
                        height: px2rem(68px);
                        line-height: px2rem(68px);
                        background-color: #e3efe2;
                        border-radius: px2rem(200px);
                        text-align: center;
                        font-size: px2rem(26px);
                        margin: px2rem(80px) auto px2rem(40px);
                        color: #108b10;
                    }
                }
            }
        }
        .btn{
            position: fixed;
            top: 100%;
            left: 50%;
            transform: translate(-50%,px2rem(-150px));
            width: px2rem(500px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            font-size: px2rem(26px);
            color: #fff;
            text-align: center;
            background-color: #139013;
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
                &:before{
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    content: "";
                    width: 100%;
                    height: px2rem(150px);
                    background: linear-gradient(0deg,rgba(255,255,255,0),rgba(255,255,255,.5),rgba(255,255,255,1),rgba(255,255,255,1));
                    z-index: 9;
                }
                .rules-contain{
                    position: relative;
                    max-height: px2rem(760px);
                    overflow: auto;
                    p{
                        font-size: px2rem(24px);
                        color: #202125;
                        line-height: px2rem(60px);
                        padding: 0 px2rem(40px);
                        margin-bottom: px2rem(75px);
                        .orange{
                            color: #f07511;
                            font-size: px2rem(36px);
                        }
                        &.title{
                            width: px2rem(260px);
                            height: px2rem(124px);
                            margin: px2rem(100px) auto px2rem(20px);
                            background: url(/static/images/activity/boss/dragonboat/title_bg.png) center no-repeat;
                            background-size: 100% 100%;
                            line-height: px2rem(114px);
                            text-align: center;
                            text-indent: px2rem(-20px);
                            font-size: px2rem(24px);
                            color: #fff;
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
