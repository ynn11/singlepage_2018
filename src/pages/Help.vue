<template>
    <div class="contain">
        <div class="head">
            <div class="logo">
                <img src="../assets/images/help/logo.png" alt="">
                <p class="slogen">就在你<span>身边</span></p>
            </div>
        </div>
        <div class="itemBox" id="itemBox">
            <div v-if="!show01" class="item">
                <p class="title" @click="show01 = !show01">如何获得积分</p>
            </div>
            <transition name="slide-fade">
                <div class="item on" v-if="show01">
                    <p class="title" @click="show01 = !show01">如何获得积分</p>
                    <div class="content">
                        <p>1.参与活动，好友邀请关注店铺</p>
                        <p>2.在会员店铺内产生消费获得积分</p>
                    </div>
                </div>
            </transition>
            <div v-if="!show02" class="item">
                <p class="title" @click="show02 = !show02">如何使用积分兑换商品</p>
            </div>
            <transition name="slide-fade">
                <div class="item on" v-if="show02">
                    <p class="title" @click="show02 = !show02">如何使用积分兑换商品</p>
                    <div class="content">
                        <p>1.选择店铺</p>
                        <img src="../assets/images/help/step1.jpg" alt="">
                        <p>2.进入积分商城</p>
                        <img src="../assets/images/help/step2.jpg" alt="">
                        <p>3.挑选喜欢的商品</p>
                        <img src="../assets/images/help/step3.jpg" alt="">
                        <p>4.点击兑换商品</p>
                    </div>
                </div>
            </transition>
            <div v-if="!show03" class="item">
                <p class="title" @click="show03 = !show03">如何领取商品</p>
            </div>
            <transition name="slide-fade">
                <div class="item on" v-if="show03">
                    <p class="title" @click="show03 = !show03">如何领取商品</p>
                    <div class="content">
                        <p>前提：已用积分成功兑换商品</p>
                        <p>1.供货商发货</p>
                        <p>2.门店收货并提醒会员取货</p>
                        <p>3.会员前往门店取货并确认领取</p>
                    </div>
                </div>
            </transition>
            <div v-if="!show04" class="item">
                <p class="title" @click="show04 = !show04">如何邀请好友参加活动</p>
            </div>
            <transition name="slide-fade">
                <div class="item on" v-if="show04">
                <p class="title" @click="show04 = !show04">如何邀请好友参加活动</p>
                    <div class="content">
                        <p>前提：已参与店铺活动，被商家设为活动会员</p>
                        <p>1.点击活动广告图进入活动页面</p>
                        <p>2.填写受邀好友手机号码（该好友未关注过该门店及同商户下级门店）</p>
                        <p>3.确认邀请</p>
                        <p>4.选择分享方式告知好友或线下告知</p>
                        <p>5.好友下载APP或关注微信公共号完成注册</p>
                        <p>填写用户信息并接受邀请获得积分</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import api from '../fetch/api'
export default {
    data() {
        return {
            show01: false,
            show02: false,
            show03: false,
            show04: false
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../assets/css/function';
    /**
     * header
    */
    .contain{
        width: 100%;
        max-width: 750px;
        margin: 0 auto;
    }
    .contain .head{
        position: relative;
        height: px2rem(510px);
        background: url('../assets/images/help/html_bg.jpg') top center no-repeat;
        background-size: 100% 100%;
    }
    .contain .head .logo{
        position: absolute;
        top: px2rem(206px);
        left: 50%;
        margin-left: px2rem(-99px);
        width: px2rem(198px);
        text-align: center;
    }
    .contain .head .logo img{
        width: 100%;
        display: block;
    }
    .contain .head .logo p{
        margin-top: px2rem(20px);
        font-size: px2rem(26px);
        color: #343434;
    }
    .contain .head .logo p span{
        color: #ff5b5b;
    }
    /**
     * item
     */
    .contain p{
        font-size: px2rem(24px);
    }
    .contain .itemBox{
    }
    .contain .itemBox .item{
        width: 100%;
        text-align: center;
    }
    .contain .itemBox .item.on{
        background-color: #f4f4f4;
    }
    .contain .itemBox .item .title{
        font-size: px2rem(28px);
        line-height: px2rem(96px);
        color: #9198d5;
    }
    .contain .itemBox .item .content{
        padding: 0 px2rem(96px) px2rem(20px);
    }
    .contain .itemBox .item .content img{
        width: 80%;
        margin: 0 auto;
    }
    .contain .itemBox .item .content p{
        line-height: px2rem(50px);
        color: #656565;
        font-size: px2rem(20px);
    }
</style>
