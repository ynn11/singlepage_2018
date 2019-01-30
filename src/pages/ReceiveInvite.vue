<template>
    <div class="receiveShare-box">
        <img src="../assets/images/receiveShare/receive_top.png" alt="" class="bg_top">
        <img src="../assets/images/receiveShare/receive_bottom.png" alt="" class="bg_bottom">
        <div class="contain">
            <img src="../assets/images/receiveShare/receive_words.png" alt="" class="title_words">
            <p class="part part1">亲爱的，我是{{username}}，这家店是我最爱的衣服店，我也是这家店的会员。</p>
            <p class="part part2">现在我可以把我的积分分一半给你。积分可以在店里的积分商城兑换各种礼物噢！不拿白不拿，别浪费了，快去关注吧</p>
            <p class="tip">&nbsp;<span>{{tip}}</span>&nbsp;</p>
            <input type="text" placeholder="输入您的真实姓名" class="trueName" v-model="trueName" @click="clearTip">
            <div class="submit yellowBtn" @click="acceptInvitation">关注</div>
        </div>
        <div class="rs_toast" v-show="showToast">
            <div class="mask" @click="closeToast"></div>
            <div class="window">
                <div class="close" @click="closeToast">X</div>
                <div class="img-box">
                    <img src="../assets/images/receiveShare/success.png" alt="" class="status">
                    <p class="point">{{point}}<img src="../assets/images/receiveShare/point.png" alt=""></p>
                    <img src="../assets/images/receiveShare/toast_bg.jpg" alt="">
                </div>
                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.lb.nearshop" class="download yellowBtn">点击下载APP</a>
                <img src="../assets/images/receiveShare/qrcode.jpg" alt="" class="qrcode">
                <p class="watch">长按二维码直接进入门店</p>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../fetch/api'
import * as _validate from "../util/validate"
export default {
    components: {
    },
    data() {
        return {
            username: this.$route.query.trueName || "你的朋友",
            tip: "",
            trueName: "",
            point: "",
            showToast: false
        }
    },
    methods: {
        acceptInvitation() {
            let data = {
                "inviteCode": this.$route.query.inviteCode,
                "trueName": this.trueName
            }
            let trueName = this.trueName;
            if (_validate.trueName(data.trueName)!==true) {
                this.tip = _validate.trueName(data.trueName);
                return;
            }
            api.acceptInvitation("post",data)
                .then(res => {
                    //接口返回失败
                    if (res.returnCode==="-1") {
                        alert(res.message);
                    }
                    //邀请成功
                    if(res.returnCode==="121"){
                        this.showToast = true;
                        this.point = res.returnContent;
                        //告知APP关注成功
                        if(window.android){
                            //告知Android
                            window.android.receiveSuccess();
                        }else{
                            //告知IOS
                            window.location.href = "receivesharesuccess://receiveSuccess";
                        }
                    }
                    //邀请失败（122）
                    else{
                        this.tip = res.message;
                    }
                })
        },
        clearTip(){
            this.tip = "";
        },
        closeToast(){
            this.showToast = false;
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../assets/css/function';
    .receiveShare-box{
        position: relative;
        height: 100%;
        background: -ms-linear-gradient(top,#342a4f,#524469);
        background: -moz-linear-gradient(top,#342a4f,#524469);
        background: -webkit-linear-gradient(top,#342a4f,#524469);
        .yellowBtn{
            position: relative;
            display: block;
            width: px2rem(548px);
            height: px2rem(90px);
            margin: px2rem(38px) auto 0;
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
        .bg_top{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
        .bg_bottom{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
        .contain{
            position: relative;
            z-index: 2;
            height: 100%;
            overflow: auto;
            .title_words{
                margin: px2rem(200px) auto;
                display: block;
                width: px2rem(520px);
            }
            .part{
                position: relative;
                margin: 0 px2rem(100px);
                text-indent: px2rem(46px);
                line-height: px2rem(40px);
                color: #FFF;
            }
            .part1{
                &:before{
                    position: absolute;
                    left: px2rem(6px);
                    top: px2rem(6px);
                    content: "";
                    width: 0;
                    height: 0;
                    border-top:px2rem(12px) solid transparent;
                    border-bottom:px2rem(12px) solid transparent;
                    border-left:px2rem(16px) solid #FFF;
                }
            }
            .part2{
                margin-bottom: px2rem(40px);
            }
            .tip{
                color: #ffe448;
                font-size: px2rem(24px);
                margin-bottom: px2rem(10px);
                text-align: center;
            }
            .trueName{
                display: block;
                width: px2rem(548px);
                height: px2rem(90px);
                margin: 0 auto;
                text-align: center;
                font-size: px2rem(24px);
                border: px2rem(5px) solid #FFF;
                border-radius: px2rem(50px);
                background-color: #FFF;
            }
        }
        .rs_toast{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            text-align: center;
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.4);
                z-index: 1;
            }
            .window{
                position: relative;
                width: px2rem(660px);
                vertical-align: middle;
                margin: px2rem(100px) auto 0;
                background-color: #FFF;
                border-radius: px2rem(15px);
                padding-bottom: 1px;
                overflow: hidden;
                z-index: 2;
                .close{
                    position: absolute;
                    top: px2rem(32px);
                    right: px2rem(32px);
                    width: px2rem(20px);
                    height: px2rem(20px);
                    line-height: px2rem(20px);
                    color: #FFF;
                    z-index: 999;
                }
                .img-box{
                    position: relative;
                    width: 100%;
                    .status{
                        position: absolute;
                        top: px2rem(135px);
                        left: 50%;
                        margin-left: px2rem(-120px);
                        width: px2rem(240px);
                        font-size: px2rem(51px);
                        font-weight: bold;
                        color: #FFF;
                        -moz-text-stroke: px2rem(5px) #4c1091;
                        -webkit-text-stroke: px2rem(5px) #4c1091;
                        text-align: center;
                    }
                    .point{
                        position: absolute;
                        top: px2rem(215px);
                        width: 100%;
                        font-size: px2rem(72px);
                        font-weight: bold;
                        color: #FFF;
                        -moz-text-stroke: px2rem(5px) #4c1091;
                        -webkit-text-stroke: px2rem(5px) #4c1091;
                        text-align: center;
                        img{
                            display: inline-block;
                            width: px2rem(64px);
                        }
                    }
                    img{
                        width: 100%;
                    }
                }
                .qrcode{
                    width: px2rem(204px);
                    margin: px2rem(20px) auto 0;
                }
                .watch{
                    font-size: px2rem(28px);
                    margin: px2rem(20px) 0 px2rem(60px);
                }
            }
        }
    }
</style>
