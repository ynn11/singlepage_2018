<template>
    <div class="concernStore-QR-box">
        <div class="bg"></div>
        <div class="contain">
            <img src="../assets/images/concernStore/csbq_words.png" alt="" class="title_words">
            <p class="tip">&nbsp;<span>{{tip}}</span>&nbsp;</p>
            <input type="number" placeholder="输入手机号码" class="phone" v-model="mobileNum" @blur="textareaBlur" @click="clearTip" v-show="showVerifyMobileNum">
            <div class="rows" v-show="showVerifyMobileNum">
                <input type="number" placeholder="输入验证码" class="verificationCode" v-model="verificationCode" @click="clearTip" @blur="textareaBlur">
                <div class="sendvCode" @click="sendvCode" v-show="!timerStatus">获取验证码</div>
                <div class="sendvCode run" v-show="timerStatus">{{timer}}s</div>
            </div>
            <input type="text" placeholder="输入您的真实姓名" @blur="textareaBlur" class="trueName" v-model="trueName" @click="clearTip">
            <div class="submit yellowBtn" @click="concernStore">关注</div>
        </div>
        <div class="cs_toast" v-show="showToast" @touchmove="touchmove">
            <div class="mask"></div>
            <div class="window">
                <!--  不许关闭 -->
                <!-- <div class="close" @click="closeToast">X</div> -->
                <div class="img-box">
                  <div class="status one-img" v-show="!concerned"></div>
                  <div class="status status_concerned two-img" v-show="concerned"></div>
                  <div class="three-img" ></div>
                    <!--<img src="../assets/images/concernStore/success.png" alt="" class="status" v-show="!concerned">-->
                    <!--<img src="../assets/images/concernStore/concerned.png" alt="" class="status status_concerned" v-show="concerned">-->
                    <!--<img src="../assets/images/concernStore/toast_bg.jpg" alt="">-->
                </div>
                <!-- <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.lb.nearshop" class="download yellowBtn">点击下载APP</a> -->
                <img class="qrcode" src="../assets/images/common/qrcode.jpg" alt="二维码">
                <p class="watch">长按二维码直接进入门店</p>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../fetch/api'
import * as _validate from "../util/validate"
import _urlConfig from "../util/urlConfig"
export default {
    components: {
    },
    //判断登录
    beforeRouteEnter(to, from, next) {
        var ua = navigator.userAgent.toLowerCase();
        if(!to.query.tokenInfo&&ua.match(/MicroMessenger/i)=="micromessenger"){
            let href = location.href;
            location.href = _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
            return;
        }else{
            setTimeout(function(){
                next()
            },500)
        }
    },
    data() {
        return {
            tip: "",
            trueName: "",
            mobileNum: "",
            verificationCode: "",
            storeCode: this.$route.query.storeCode,
            staffCode: this.$route.query.staffCode,
            showToast: false,
            concerned: false,
            tokenInfo: this.$route.query.tokenInfo===undefined?"":JSON.parse(this.$route.query.tokenInfo),
            timer: 60,
            timerStatus: false,
            showVerifyMobileNum: false
        }
    },
    methods: {
        runTimer: function() {
            if (this.timer > 0) {
                --this.timer
                setTimeout(this.runTimer, 1000);
            }else{
                this.timerStatus = false
            }
        },
        touchmove: function(e){
            e.preventDefault();
        },
        //关注门店
        concernStore() {
            let data = {
                "storeCode": this.storeCode,
                "staffCode": this.staffCode,
                "mobileNum": this.mobileNum,
                "verificationCode": this.verificationCode,
                "appEntranceType": 3,
                "trueName": this.trueName
            }
            if (_validate.mobile(data.mobileNum)!==true&&this.showVerifyMobileNum===true) {
                this.tip = _validate.mobile(data.mobileNum);
                return;
            }
            if (_validate.verificationCode(data.verificationCode)!==true&&this.showVerifyMobileNum===true) {
                this.tip = _validate.verificationCode(data.verificationCode);
                return;
            }
            if (_validate.trueName(data.trueName)!==true) {
                this.tip = _validate.trueName(data.trueName);
                return;
            }
            //浏览器打开
            if (this.tokenInfo==="") {
                api.followStoreByShare("post",data).then(res => {
                    if(res.returnCode==="0"){
                        this.showToast = true;
                    }else if(res.returnCode==="302"){
                        this.showToast = true;
                        this.concerned = true;
                    }else{
                        alert(res.message);
                    }
                });
            }
            //微信打开
            else{
                api.followStoreStaff("post",data,this.tokenInfo.token).then(res => {
                    if(res.returnCode==="0"){
                        this.showToast = true;
                    }else{
                        alert(res.message);
                    }
                })
            }
        },
        //验证是否关注过门店
        checkConcernStatus: function(){
            let data = {
                "storeCode": this.storeCode,
                "staffCode": this.staffCode,
                "mobileNum": "",
                "verificationCode": "",
                "appEntranceType": 3,
                "trueName": ""
            }
            api.whetherFollowStore("get",data,this.tokenInfo.token).then(res => {
                if (res.returnCode==="0") {

                }else if(res.returnCode==="301"){
                    this.showToast = true;
                    this.concerned = true;
                }else{
                    alert(res.message);
                }
            })
        },
        //验证码发送
        sendvCode: function(){
            if (_validate.mobile(this.mobileNum)!==true) {
                this.tip = _validate.mobile(this.mobileNum);
                return;
            }
            let data = {
                "mobileNum":this.mobileNum,
                "verificationType": this.tokenInfo===""?6:5
            };
            api.sendVerificationCode("get",data).then((res)=>{
                if(res.returnCode==="0"){
                    this.timer = 60;
                    this.timerStatus = true;
                    this.runTimer();
                }else{
                    alert(res.message);
                }
            });
        },
        changeGender(){
            this.gender = this.gender==="女"?"男":"女";
        },
        clearTip(){
            this.tip = "";
        },
        closeToast(){
            this.showToast = false;
        },
      textareaBlur:function (e) {
//        alert("scrollTop="+document.body.scrollTop);
        document.body.scrollTop=0;
      },
    },
    mounted(){
        console.log(this.staffCode);
        //会员只用输入真实姓名并判断是否关注过
        console.log(this.tokenInfo.imInfo);
        if (this.tokenInfo==="") {
            this.showVerifyMobileNum = true;
        }else{
            if (this.tokenInfo.imInfo===null) {
                this.showVerifyMobileNum = true;
            }else{
              //验证是否关注过门店
                this.checkConcernStatus();
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../assets/css/function';
    .concernStore-QR-box{
        position: relative;
        height: 100%;
        background-color: #362c51;
        overflow: auto;
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
            width: 100%;
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
            .trueName{
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
                .verificationCode{
                    width: px2rem(326px);
                    height: px2rem(90px);
                    text-align: center;
                    font-size: px2rem(24px);
                    border: px2rem(5px) solid #FFF;
                    border-radius: px2rem(50px);
                    background-color: #FFF;
                }
                .sendvCode{
                    float: right;
                    position: relative;
                    display: block;
                    width: px2rem(190px);
                    height: px2rem(90px);
                    line-height: px2rem(90px);
                    background-color: #ffe23f;
                    color: #302950;
                    font-size: px2rem(30px);
                    border: px2rem(5px) solid #272440;
                    text-align: center;
                    border-radius: px2rem(50px);
                    box-shadow: inset px2rem(6px) 0 0 0 #ffad08;
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
                        &.status_concerned{
                            width: px2rem(470px);
                            margin-left: px2rem(-235px);
                        }
                    }
                    img{
                        width: 100%;
                    }
                  .one-img{
                    width: px2rem(240px);
                    height: px2rem(60px);
                    background: url("../assets/images/concernStore/success.png") center no-repeat;
                    background-size: 100%;
                  }
                  .two-img{
                    width: px2rem(469px);
                    height: px2rem(61px);
                    background: url("../assets/images/concernStore/concerned.png") center no-repeat;
                    background-size: 100%;
                  }
                  .three-img{
                    width: px2rem(660px);
                    height: px2rem(395px);
                    background: url("../assets/images/concernStore/toast_bg.jpg") center no-repeat;
                    background-size: 100%;
                  }
                }
                .qrcode{
                    width: px2rem(250px);
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
