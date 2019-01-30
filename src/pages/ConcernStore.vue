<template>
    <div class="concernStore-box">
        <div class="bg"></div>
        <div class="contain">
            <img src="../assets/images/concernStore/cs_words.png" alt="" class="title_words">
            <p class="part">朋友们，我是这家店的会员，他们的衣服不但好看，而且可以用他们的积分，免费拿东西，各种生活用品都有哦，快来吧！这风格一定适合你，这优惠一定大实惠。</p>
            <p class="tip">&nbsp;<span>{{tip}}</span>&nbsp;</p>
            <input type="phone" placeholder="输入手机号码" class="phone" v-model="phoneNum" @click="clearTip">
            <div class="rows">
                <input type="text" placeholder="输入您的真实姓名" class="trueName" v-model="trueName" @click="clearTip">
                <div class="switch" @click="changeGender">
                    <div :class="'btn ' +[gender==='女'?'off':'']">{{gender}}</div>
                </div>
            </div>
            <div class="submit yellowBtn" @click="concernStore">关注</div>
        </div>
        <div class="cs_toast" v-show="showToast">
            <div class="mask" @click="closeToast"></div>
            <div class="window">
                <div class="close" @click="closeToast">X</div>
                <div class="img-box">
                    <img src="../assets/images/concernStore/success.png" alt="" class="status">
                    <img src="../assets/images/concernStore/toast_bg.jpg" alt="">
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
            tip: "",
            trueName: "",
            phoneNum: "",
            storeCode: this.$route.query.storeCode,
            showToast: false,
            gender: "女"
        }
    },
    methods: {
        concernStore() {
            let data = {
                "storeCode": this.storeCode,
                "mobileNum": this.phoneNum,
                "name": this.trueName,
                "sex": this.gender
            }
            if (_validate.mobile(data.mobileNum)!==true) {
                this.tip = _validate.mobile(data.mobileNum);
                return;
            }
            if (_validate.trueName(data.name)!==true) {
                this.tip = _validate.trueName(data.name);
                return;
            }
            api.attractStoreByShare("get",data)
                .then(res => {
                    if(res.returnCode==="0"){
                        this.showToast = true;
                    }else{
                        alert(res.message);
                    }
                })
        },
        changeGender(){
            this.gender = this.gender==="女"?"男":"女";
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
    .concernStore-box{
        position: relative;
        height: 100%;
        overflow: auto;
        background-color: #362c51;
        .bg{
            position: relative;
            width: 100%;
            height: px2rem(1334px);
            background: url(../assets/images/concernStore/concern_bg.jpg) top center no-repeat;
            background-size: 100% auto;
        }
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
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            height: 100%;
            .title_words{
                margin: px2rem(200px) auto;
                display: block;
                width: px2rem(520px);
            }
            .part{
                position: relative;
                margin: 0 px2rem(100px) px2rem(32px);
                text-indent: px2rem(46px);
                line-height: px2rem(40px);
                color: #FFF;
            }
            .tip{
                color: #ffe448;
                font-size: px2rem(24px);
                margin-bottom: px2rem(10px);
                text-align: center;
            }
            .phone{
                display: block;
                width: px2rem(548px);
                height: px2rem(90px);
                margin: px2rem(38px) auto 0;
                text-align: center;
                font-size: px2rem(24px);
                border: px2rem(5px) solid #FFF;
                border-radius: px2rem(50px);
                background-color: #FFF;
            }
            .rows{
                display: block;
                width: px2rem(548px);
                height: px2rem(100px);
                margin: px2rem(38px) auto 0;
                .trueName{
                    width: px2rem(358px);
                    height: px2rem(90px);
                    text-align: center;
                    font-size: px2rem(24px);
                    border: px2rem(5px) solid #FFF;
                    border-radius: px2rem(50px);
                    background-color: #FFF;
                }
                .switch{
                    position: relative;
                    float: right;
                    width: px2rem(158px);
                    height: px2rem(90px);
                    text-align: center;
                    font-size: px2rem(24px);
                    border: px2rem(5px) solid #FFF;
                    border-radius: px2rem(50px);
                    border: px2rem(5px) solid #FFF;
                    background-color: #FFF;
                    text-align: center;
                    .btn{
                        position: absolute;
                        left: px2rem(68px);
                        width: px2rem(90px);
                        height: px2rem(90px);
                        background-color: #ffe23f;
                        border-radius: 50%;
                        line-height: px2rem(90px);
                        color: #666;
                        font-size: px2rem(24px);
                        transition: left 200ms;
                        -moz-transition: left 200ms;
                        -webkit-transition: left 200ms;
                        -o-transition: left 200ms;
                        &.off{
                            left: 0;
                            background-color: #fe6995;
                            color: #FFF;
                        }
                    }
                }
            }
        }
        .cs_toast{
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
                        top: px2rem(160px);
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
