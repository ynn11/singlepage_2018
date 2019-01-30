<template>
    <div class="guideRank-box">
        <activityHeader type="app" title="活动数据"></activityHeader>
        <div class="header">
            <img src="../../../assets/images/activity/guideRank/head.jpg" alt="">
        </div>
        <div class="contain" v-if="allLoaded">
            <div class="tip">注：用身边店的收银系统收银将会让你的外快分红越来越多哦！</div>
            <div class="rank-contain">
                <div class="storeInfo">
                    <div class="info">
                        <img :src="rankInfo.storeInfo.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="">
                        <span class="name">{{rankInfo.storeInfo.storeName}}</span>
                    </div>
                    <div class="prize">当月奖金({{rankInfo.storeInfo.month}})：{{rankInfo.storeInfo.totalCashBack}}</div>
                </div>
                <div class="guideList">
                    <div :class="'list-item ' + [item.isChampion===1?'isChampion':''] + [item.isSelf===1?' isSelf':'']" v-for="(item,index) in rankInfo.staffCashBackList">
                        <div class="headPic" v-if="item.isChampion===1">
                            <img class="head-line" src="../../../assets/images/activity/guideRank/head-line.png" alt="">
                            <img class="headImg" :src="[item.staffHeadPicUrl===null?defaultheadPic:item.staffHeadPicUrl] + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="">
                            <img class="head-crown" src="../../../assets/images/activity/guideRank/head-crown.png" alt="">
                        </div>
                        <div class="headPic" v-else>
                            <img class="headImg" :src="[item.staffHeadPicUrl===null?defaultheadPic:item.staffHeadPicUrl] + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="">
                            <div :class="'rank rank' + (++index)">{{index}}</div>
                        </div>
                        <div class="backInfo">
                            <div class="name">
                                <span class="left">{{item.staffNickName}}</span>
                                <span class="right">本月累计分红：{{item.cashBack}}</span>
                            </div>
                            <div class="grade">
                                <span>业绩：{{item.performance}}</span>
                                <span class="percent">占比：{{item.performancePercent*100}}%</span>
                            </div>
                            <div class="championAward" v-if="item.isChampion===1">
                                冠军奖励：{{item.championAward}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule-contain">
                <img class="rule-tit" src="../../../assets/images/activity/guideRank/rule-tit.png" alt="">
                <img class="rules" src="../../../assets/images/activity/guideRank/rules.jpg" alt="">
            </div>
            <div class="accountInfo">
                <img class="headImg" :src="[rankInfo.receiveAccountInfo.staffHeadPicUrl===null?defaultheadPic:rankInfo.receiveAccountInfo.staffHeadPicUrl] + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="">
                <div class="info">
                    <div class="nickName">{{rankInfo.receiveAccountInfo.staffNickName}}</div>
                    <div class="trueInfo">
                        <p>收款账户：{{rankInfo.receiveAccountInfo.receiveAccount}}</p>
                        <p>收款姓名：{{rankInfo.receiveAccountInfo.receiveTrueName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span @click="changeModalStatus=true;">更改</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" v-if="bindModalStatus">
            <div class="mask"></div>
            <div class="modal-contain">
                <div class="panel">
                    <img src="../../../assets/images/activity/guideRank/bind-tit.png" alt="" class="tit">
                    <div class="bind-tip">
                        <p>想赚更多的钱？</p>
                        <p>现在只要一个动作你就可以赚更多的钱，</p>
                        <p>赶快<span>绑定账户</span>参与进来！</p>
                    </div>
                    <input type="text" class="line-input" v-model="receiveAccount" placeholder="输入您的支付宝账户">
                    <input type="text" class="line-input" v-model="receiveTrueName" placeholder="输入支付宝账户真实姓名">
                    <div class="yellowBtn" @click="editAccount(0)">绑定</div>
                </div>
            </div>
        </div>
        <div class="modal" v-if="changeModalStatus">
            <div class="mask"></div>
            <div class="modal-contain">
                <div class="panel">
                    <img src="../../../assets/images/activity/guideRank/close.png" @click="changeModalStatus=false;" alt="" class="close">
                    <img src="../../../assets/images/activity/guideRank/bind-tit.png" alt="" class="tit">
                    <input type="text" class="line-input" v-model="receiveAccount" placeholder="输入您的支付宝账户">
                    <input type="text" class="line-input" v-model="receiveTrueName" placeholder="输入支付宝账户真实姓名">
                    <div class="yellowBtn" @click="editAccount(1)">确定</div>
                </div>
            </div>
        </div>
        <div class="modal" v-if="checkModalStatus">
            <div class="mask"></div>
            <div class="modal-contain">
                <div class="panel">
                    <img src="../../../assets/images/activity/guideRank/bind-tit.png" alt="" class="tit">
                    <div class="reward-tip">
                        <p>哎哟，导购大神，</p>
                        <p>你上个月的外快分红是：</p>
                        <p class="money">{{lastMonthAwardInfo.totalDivideMoney}}元<span v-if="lastMonthAwardInfo.championReward!==0">（冠军奖励：{{lastMonthAwardInfo.championReward}}元）</span></p>
                        <p>已经到你绑定的账户中啦，</p>
                        <p>快去查看吧！</p>
                        <p>还要再接再历哦！</p>
                    </div>
                    <div class="yellowBtn" @click="read">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../fetch/api'
    import * as _validate from "../../../util/validate"
    import activityHeader from "@/components/common/activityHeader"
    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                rankInfo: {},
                defaultheadPic: "http://static.storeer.com/appuser/headpic/0abead7c-b35e-4ccf-a7bc-0cffd0585a45_1499502189760",
                allLoaded: false,
                receiveAccount: "",
                receiveTrueName: "",
                bindModalStatus: false,
                changeModalStatus: false,
                checkModalStatus: false,
                lastMonthAwardInfo: {}
            }
        },
        methods: {
            //已读
            read: function(){
                api.readLastMonthAwardInfo("get",{"divideDetailCode": this.lastMonthAwardInfo.divideDetailCode},this.token).then(res => {
                    //接口返回成功
                    if (res.returnCode==="0") {
                        this.checkModalStatus = false;
                    }
                    //返回失败
                    else{
                        alert(res.message);
                    }
                })
            },
            //获取上个月分红信息
            getLastMonthAward: function(){
                api.getLastMonthAward("get",{},this.token).then(res => {
                    //接口返回成功
                    if (res.returnCode==="0") {
                        if (res.returnContent!==null) {
                            this.lastMonthAwardInfo = res.returnContent;
                            this.checkModalStatus = true;
                        }
                    }
                    //返回失败
                    else{
                        alert(res.message);
                    }
                })
            },
            //获取排行信息
            loadRank: function(){
                api.getStaffCashBackActivityRank("get",{},this.token).then(res => {
                    //接口返回成功
                    if (res.returnCode==="0") {
                        this.rankInfo = res.returnContent;
                        this.allLoaded = true;
                        if (this.rankInfo.receiveAccountInfo.receiveAccount===null) {
                            this.bindModalStatus = true;
                            return;
                        }
                        this.getLastMonthAward();
                    }
                    //返回失败
                    else{
                        alert(res.message);
                    }
                })
            },
            //编辑支付宝账户
            editAccount: function(type){
                if(_validate.email(this.receiveAccount)!==true&&_validate.mobile(this.receiveAccount)!==true){
                    alert("支付宝账户为邮箱或手机号，请确认填写是否正确");
                    return;
                }
                if (_validate.trueName(this.receiveTrueName)!==true) {
                    alert("请输入真实姓名");
                    return;
                }
                api.editShopGuideReceiveAccount("post",{"receiveAccount":this.receiveAccount,"receiveTrueName":this.receiveTrueName},this.token).then(res => {
                    //接口返回成功
                    if (res.returnCode==="0") {
                        alert(type===1?"修改成功":"绑定成功");
                        this.bindModalStatus = false;
                        this.changeModalStatus = false;
                        this.loadRank();
                    }
                    //返回失败
                    else{
                        alert(res.message);
                    }
                })
            }
        },
        mounted(){
            this.loadRank();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .guideRank-box{
        position: relative;
        .header{
            padding-top: px2rem(80px);
            img{
                display: block;
                width: 100%;
            }
        }
        .contain{
            background-color: #ff597c;
            overflow: hidden;
            .tip{
                margin-top: px2rem(80px);
                font-size: px2rem(22px);
                color: #ffc6c6;
                text-align: center;
            }
            .rank-contain{
                margin: px2rem(20px) auto px2rem(155px);
                width: px2rem(700px);
                background-color: #fff;
                border-radius: px2rem(18px);
                overflow: hidden;
                .storeInfo{
                    text-align: center;
                    .info{
                        display: inline-block;
                        line-height: px2rem(75px);
                        font-size: px2rem(32px);
                        color: #2b2b2b;
                        margin: px2rem(30px) 0;
                        img{
                            float: left;
                            width: px2rem(75px);
                            height: px2rem(75px);
                            border-radius: 50%;
                        }
                    }
                    .prize{
                        display: block;
                        width: px2rem(600px);
                        height: px2rem(115px);
                        line-height: px2rem(115px);
                        font-size: px2rem(36px);
                        margin: 0 auto px2rem(20px);
                        border-radius: px2rem(8px);
                        -webkit-box-shadow:0 px2rem(9px) px2rem(30px) px2rem(8px) rgba(0,0,0,.1);
                        -moz-box-shadow:0 px2rem(9px) px2rem(30px) px2rem(8px) rgba(0,0,0,.1);
                        box-shadow:0 px2rem(9px) px2rem(30px) px2rem(8px) rgba(0,0,0,.1);
                        span{
                            font-size: px2rem(42px);
                        }
                    }
                }
                .guideList{
                    .list-item{
                        position: relative;
                        height: px2rem(180px);
                        padding: 0 px2rem(20px);
                        overflow: hidden;
                        &:after{
                            content: "";
                            position: absolute;
                            left: px2rem(30px);
                            bottom: 0;
                            width: px2rem(640px);
                            height: 1px;
                            background-color: #e2e2e2;
                        }
                        .headPic{
                            position: relative;
                            float: left;
                            width: px2rem(116px);
                            height: px2rem(116px);
                            overflow: visible;
                            margin: px2rem(32px) px2rem(50px) 0 px2rem(30px);
                            .head-line{
                                position: absolute;
                                left: px2rem(-28.5px);
                                width: px2rem(175px);
                                bottom: px2rem(8px);
                                z-index: 1;
                            }
                            .headImg{
                                position: relative;
                                display: block;
                                width: px2rem(116px);
                                height: px2rem(116px);
                                border-radius: 50%;
                                z-index: 2;
                            }
                            .head-crown{
                                position: absolute;
                                bottom: px2rem(-6px);
                                left: px2rem(-12px);
                                width: px2rem(140px);
                                height: px2rem(145px);
                                z-index: 3;
                            }
                            .rank{
                                position: absolute;
                                left: px2rem(32px);
                                bottom: px2rem(-26px);
                                width: px2rem(52px);
                                height: px2rem(52px);
                                line-height: px2rem(52px);
                                border-radius: 50%;
                                text-align: center;
                                font-size: px2rem(24px);
                                color: #fff;
                                background-color: #a1a1a1;
                                z-index: 3;
                                &.rank2{
                                    background-color: #ff597c;
                                }
                                &.rank3{
                                    background-color: #59afff;
                                }
                            }
                        }
                        .backInfo{
                            float: left;
                            display: inline-block;
                            width: px2rem(450px);
                            overflow: hidden;
                            font-size: px2rem(24px);
                            line-height: px2rem(26px);
                            color: #1f1f1f;
                            .name{
                                margin-top: px2rem(50px);
                                overflow: hidden;
                                .left{
                                    float: left;
                                }
                                .right{
                                    float: right;
                                }
                            }
                            .grade{
                                margin-top: px2rem(50px);
                                .percent{
                                    margin-left: px2rem(15px);
                                }
                            }
                        }
                        &.isChampion{
                            .backInfo{
                                .name{
                                    margin-top: px2rem(40px);
                                }
                                .grade{
                                    margin-top: px2rem(16px);
                                }
                                .championAward{
                                    margin-top: px2rem(16px);
                                    color: #ff597c;
                                }
                            }
                        }
                        &.isSelf{
                            background-color: #fef362;
                        }
                    }
                }
            }
            .rule-contain{
                position: relative;
                background-color: #fef362;
                padding: px2rem(110px) 0 px2rem(60px);
                .rule-tit{
                    position: absolute;
                    top: px2rem(-45px);
                    left: 50%;
                    margin-left: px2rem(-100px);
                    width: px2rem(200px);
                    height: px2rem(90px);
                }
                .rules{
                    display: block;
                    width: 100%;
                }
            }
            .accountInfo{
                position: relative;
                background-color: #fef362;
                overflow: hidden;
                height: px2rem(188px);
                &:before{
                    content: "";
                    position: absolute;
                    top: 0;
                    left: px2rem(43px);
                    width: px2rem(664px);
                    height: px2rem(3px);
                    background-color: #fffbc5;
                }
                .headImg{
                    float: left;
                    width: px2rem(94px);
                    height: px2rem(94px);
                    border-radius: 50%;
                    margin: px2rem(47px) px2rem(35px) px2rem(47px) px2rem(25px);
                }
                .info{
                    float: left;
                    width: px2rem(565px);
                    font-size: px2rem(26px);
                    color: #1f1f1f;
                    .nickName{
                        margin-top: px2rem(45px)
                    }
                    .trueInfo{
                        p{
                            margin-top: px2rem(10px);
                        }
                        span{
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .modal{
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
            z-index: 9;
        }
        .modal .mask{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
        }
        .modal .modal-contain{
            position: relative;
            width: px2rem(640px);
            margin: 0 auto;
            overflow: hidden;
            .panel{
                position: relative;
                margin: px2rem(200px) auto;
                width: 100%;
                background-color: #fff;
                border-radius: px2rem(18px);
                overflow: hidden;
                .close{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: px2rem(26px);
                    height: px2rem(26px);
                    padding: 20px;
                }
                .tit{
                    display: block;
                    width: 100%;
                }
                .bind-tip{
                    font-size: px2rem(32px);
                    color: #404040;
                    margin: px2rem(100px) auto;
                    p{
                        line-height: px2rem(52px);
                        text-align: center;
                        span{
                            color: #ff597c;
                        }
                    }
                }
                .reward-tip{
                    font-size: px2rem(32px);
                    color: #404040;
                    p{
                        line-height: px2rem(64px);
                        text-align: center;
                        &.money{
                            font-size: px2rem(42px);
                            color: #ff597c;
                        }
                    }
                }
            }
            //input通用，btn通用
            .line-input{
                display: block;
                width: px2rem(568px);
                height: px2rem(90px);
                line-height: px2rem(90px);
                border-bottom: 1px solid #bebebe;
                margin: px2rem(44px) auto 0;
                font-size: px2rem(32px);
                text-align: center;
            }
            .yellowBtn{
                position: relative;
                display: block;
                width: px2rem(548px);
                height: px2rem(90px);
                margin: px2rem(38px) auto px2rem(38px);
                line-height: px2rem(90px);
                background-color: #ffe23f;
                color: #302950;
                font-size: px2rem(30px);
                border: px2rem(5px) solid #272440;
                text-align: center;
                border-radius: px2rem(50px);
                box-shadow: inset px2rem(6px) 0 0 0 #ffad08;
                &:before{
                    position: absolute;
                    top: px2rem(10px);
                    left: px2rem(42px);
                    content: " ";
                    width: px2rem(10px);
                    height: px2rem(10px);
                    border-radius: 50%;
                    background-color: #FFF;
                }
                &:after{
                    position: absolute;
                    top: px2rem(10px);
                    left: px2rem(58px);
                    content: " ";
                    width: px2rem(70px);
                    height: px2rem(10px);
                    border-radius: px2rem(10px);
                    background-color: #FFF;
                }
            }
        }
    }
</style>
