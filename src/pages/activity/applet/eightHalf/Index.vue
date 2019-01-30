<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  @import '../../../../../static/css/swiper.min.css';

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .eight-half-index {
    position: relative;
    height: 101%;
    @keyframes inOpacity {
      0% {
        top: -30px;
        opacity: 0
      }
      25% {
        top: 30px;
        opacity: 0
      }
      50% {
        top: 30px;
        opacity: 1
      }
      100% {
        top: -30px;
        opacity: 1
      }
    }
    @keyframes outOpacity {
      0% {
        top: 30px;
        opacity: 1
      }
      50% {
        top: -30px;
        opacity: 1
      }
      75% {
        top: -30px;
        opacity: 0
      }
      100% {
        top: 30px;
        opacity: 0
      }
    }

    .product-hot-outer {
      width: px2rem(750px);
      height: px2rem(320px);
      overflow-x: hidden;
      overflow-y: hidden;
      /*padding-left: px2rem(30px);*/
      /*padding-right: px2rem(30px);*/
      .product-hot-outer2 {
        width: 100%;
        height: 105%;
        .product-hot {
          width: 100%;
          height: 100%;
          overflow-x: scroll;
          display: flex;
          /*padding-right: px2rem(30px);*/
          .hot-item {
            width: px2rem(230px);
            height: px2rem(308px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            margin-left: px2rem(30px);
            img {
              width: px2rem(230px);
              height: px2rem(230px);
            }
            > div {
              width: px2rem(230px);
              height: px2rem(50px);
              line-height: px2rem(26px);
              color: #333333;
              font-size: px2rem(24px);
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical !important;
              -webkit-line-clamp: 2;
              padding-top: px2rem(28px);
            }
          }
        }
      }
    }

    .main-container {
      position: relative;
      min-height: 100%;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      background: #F5F5F5;
      /*margin-bottom: px2rem(170px);*/
      .swiper {

        /*swiper {*/
        /*z-index: 2;*/
        /*}*/
        /*.swiper-box {*/
        /*width: 100%;*/
        /*height: px2rem(750px);*/
        /*background-color: #f3f3f3;*/
        /*overflow: hidden;*/
        /*position: relative;*/
        /*}*/
        /*.swiper-box .swiper-item {*/
        /*width: px2rem(750px);*/
        /*height: px2rem(750px);*/
        /*}*/
        /*.swiper-box .swiper-item img {*/
        /*width: 100%;*/
        /*height: 100%;*/
        /*}*/
        .swiper-slide {
          width: px2rem(750px);
          height: px2rem(750px);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .swiper-pagination {
          position: absolute;
          left: px2rem(645px);
          top: px2rem(685px);
          width: px2rem(80px);
          height: px2rem(38px);
          line-height: px2rem(38px);
          text-align: center;
          font-size: px2rem(24px);
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: rgba(0, 0, 0, 0.52);
          border-radius: px2rem(19px);
        }
      }

      .buyer-outer {
        position: absolute;
        left: px2rem(32px);
        top: px2rem(30px);
        /*width: px2rem(350px);*/
        height: px2rem(48px);
        /*background: rgba(255, 255, 255, 1);*/
        background: #eee;
        opacity: 0.8;
        border: 1px solid rgba(255, 255, 255, 1);
        border-radius: px2rem(40px);
        padding: px2rem(10px) px2rem(20px);
        clear: both;
        z-index: 3;
        .buyer-outer2{
          width: px2rem(350px);
          height: px2rem(48px);
        }
        .swiper-container2{
          /*width: px2rem(350px);*/
          height: px2rem(48px);
          /*padding: px2rem(10px) px2rem(20px);*/
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          list-style: none;
          padding: 0;
          z-index: 1;
          .swiper-slide{
            /*width: px2rem(350px);*/
            height: px2rem(48px);
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
          }
        }

      }
      .buyer {
        /*position: absolute;*/
        /*left: px2rem(32px);*/
        /*top: px2rem(30px);*/
        /*!*width: px2rem(350px);*!*/
        /*!*height: px2rem(48px);*!*/
        /*background: rgba(255, 255, 255, 1);*/
        /*border: 1px solid rgba(255, 255, 255, 1);*/
        /*border-radius: px2rem(40px);*/
        /*padding: px2rem(10px) px2rem(20px);*/
        /*clear: both;*/
        /*z-index: 3;*/
        img {
          float: left;
          width: px2rem(48px);
          height: px2rem(48px);
          border-radius: 50%;
        }
        p {
          float: right;
          height: px2rem(48px);
          line-height: px2rem(48px);
          font-size: px2rem(24px);
          display: inline-block;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-left: px2rem(18px);
          span {
            color: #FF5959;
          }
        }
      }
      .buyer-on {
        /*display: block;*/
        -webkit-animation: inOpacity .5s linear;
        /*animation-name: inOpacity;*/
        /*animation-duration: 500ms;*/
      }
      .buyer-off {
        /*display: none;*/
        /*animation-name: outOpacity;*/
        /*animation-duration: 500ms;*/
        -webkit-animation: outOpacity .5s linear;
      }
      .price-content {
        height: px2rem(100px);
        display: flex;
        background-color: #FF2074;
        .price {
          width: px2rem(511px);
          display: flex;
          justify-content: center;
          align-items: center;
          .now-price {
            font-size: px2rem(48px);
            color: #fff;
            flex: 0.8;
            text-align: center;
            font-weight: normal;
            border-right: 1px solid;
            margin-left: px2rem(40px);
            span {
              font-size: px2rem(30px);
              margin-left: -20px;
              margin-right: 6px;
            }
          }
          .orig-price {
            font-size: px2rem(30px);
            color: #fff;
            text-decoration: line-through;
            flex: 1;
            text-align: center;
            margin-left: px2rem(-10px);
            i {
              font-size: px2rem(22px);
            }
          }
        }
        .price-noproduct {
          width: px2rem(481px);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #fff;
          margin-left: px2rem(30px);
          font-size: px2rem(40px);
        }
        .timer-content {
          display: flex;
          width: px2rem(264px);
          height: px2rem(100px);
          padding-left: px2rem(10px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          /*width: px2rem(239px);*/
          .timer-title {
            margin-top: px2rem(10px);
            font-size: px2rem(24px);
            font-weight: 400;
          }
          .timer {
            font-size: px2rem(30px);
            font-weight: 600;
            margin-top: px2rem(10px);
          }
        }
        .timer-content-bgred {
          background: url("/static/images/activity/applet/eightHalf/bg_red.png") no-repeat;
          background-size: px2rem(274px) px2rem(100px);
        }
        .timer-content-bgblack {
          background: url("/static/images/activity/applet/eightHalf/bg_black.png") no-repeat;
          background-size: px2rem(274px) px2rem(100px);
        }

      }
      .basic-price-content {
        /*height: px2rem(100px);*/
        /*line-height: px2rem(100px);*/
        /*padding: px2rem(30px) 0 px2rem(26px);*/
        /*display: flex;*/
        background: #fff;
        padding: px2rem(30px) 0 0;
        height: px2rem(60px);
        /*.price {*/
        /*width: px2rem(511px);*/
        .now-price {
          float: left;
          font-size: px2rem(48px);
          color: #FF2074;
          height: px2rem(40px);
          flex: 1;
          text-align: center;
          margin-left: px2rem(30px);
          font-weight: normal;
          span {
            font-size: px2rem(30px);
          }
        }
        .orig-price {
          float: left;
          font-size: px2rem(30px);
          height: px2rem(40px);
          color: #999999;
          text-decoration: line-through;
          text-align: left;
          margin-left: px2rem(22px);
          display: inline-block;
          margin-top: px2rem(15px);
          /*display: flex;*/
          /*justify-content: flex-end;*/
          /*align-items: flex-end;*/
          i {
            font-size: px2rem(22px);
          }
          /*}*/
        }
      }
      .price-content-green {
        height: px2rem(100px);
        display: flex;
        background-color: #0DAF3F;

      }
      .product-tip {
        width: 100%;
        height: px2rem(100px);
        line-height: px2rem(100px);
        background: #333;
        color: #fff;
        text-align: center;
        font-size: px2rem(30px);
      }
      .title {
        width: px2rem(690px);
        background: #fff;
        padding:px2rem(20px) px2rem(30px) px2rem(20px);
        div {
          width: 100%;
          /*height: px2rem(78px);*/
          max-height: px2rem(78px);
          line-height: px2rem(40px);
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: px2rem(34px);
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
      .tip {
        width: 100%;
        background: #fff;
        height: px2rem(50px);
        padding-bottom: px2rem(40px);
        /*h3 {*/
          /*float: left;*/
          /*font-size: px2rem(30px);*/
          /*padding: px2rem(10px);*/
          /*background: #FF2074;*/
          /*color: #fff;*/
          /*margin: 0 0 0 px2rem(30px);*/
          /*border-radius: px2rem(8px);*/
          /*height: px2rem(30px);*/
          /*line-height: px2rem(30px);*/
        /*}*/
        .second-time-img{
          float: left;
          padding: px2rem(10px);
          margin: 0  0 px2rem(30px) px2rem(30px);
          width: px2rem(146px);
          height: px2rem(50px);
          background: url("/static/images/activity/applet/eightHalf/xianshimiaosha@2x.png") center no-repeat;
          background-size: px2rem(146px) px2rem(50px);
        }
        h4 {
          float: left;
          color: #999999;
          font-size: px2rem(26px);
          height: px2rem(50px);
          line-height: px2rem(50px);
          padding: px2rem(10px) px2rem(30px);
          max-width:60%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .product-service{
          max-width:px2rem(690px);
        }

      }
      .sizeChoose {
        width: px2rem(690px);
        height: px2rem(102px);
        line-height: px2rem(102px);
        background: #fff;
        font-size: px2rem(28px);
        color: #999999;
        padding: 0 px2rem(30px);
        margin: px2rem(22px) 0;
        .choose-words {
          width: 100%;
          display: inline-block;
          .choose-words-info{
            width: 80%;
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            float: right;
          }
        }
        span {
          color: #333333;
          margin: 0 px2rem(26px);
        }
        .char {
          width: px2rem(16px);
          height: px2rem(26px);
          color: #999999;
          float: right;
          margin-top: 6%;
        }

      }
      .product-hot-content {
        background: #fff;
        padding: px2rem(39px) 0 px2rem(42px);
        h3 {
          font-size: px2rem(36px);
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          font-weight: 500;
          margin: 0 0 px2rem(31px) px2rem(29px);
        }

      }
      .guide-content {
        height: px2rem(167px);
        padding: 0 px2rem(30px);
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        margin-top: px2rem(20px);
        img {
          width: px2rem(90px);
          height: px2rem(90px);
        }
        .guide-name {
          width: px2rem(350px);
          margin-left: px2rem(17px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          color: #999999;
          font-size: px2rem(24px);
          > div {
            color: #000000;
            font-size: px2rem(32px);
            margin-bottom: px2rem(20px);
          }
        }
        .phone {
          width: px2rem(70px);
          height: px2rem(70px);
          margin-left: px2rem(115px);
          img{
            width: px2rem(70px);
            height: px2rem(70px);
          }
        }

      }
      .guide-tip {
        width: 100%;
        height: px2rem(45px);
        padding-top: px2rem(40px);
        background: url("/static/images/activity/applet/eightHalf/bg.png") center no-repeat;
        background-size: 100% px2rem(85px);
        color: #FF2074;
        text-align: center;
        font-size: px2rem(26px);
        margin-top: px2rem(-30px);
        margin-bottom: px2rem(30px);
      }
      .product-detail {
        img {
          width: 100%;
          display: inherit;
        }
      }

      .btn {
        position: fixed;
        left: px2rem(30px);
        bottom: px2rem(35px);
        width: px2rem(690px);
        height: px2rem(100px);
        line-height: px2rem(100px);
        text-align: center;
        background: rgba(255, 32, 116, 1);
        border-radius: px2rem(8px);
        font-size: px2rem(40px);
        /*margin: px2rem(35px) auto;*/
        color: #fff;
      }
      .btn-over {
        position: fixed;
        left: 0;
        bottom: 0;
        width: px2rem(750px);
        height: px2rem(100px);
        line-height: px2rem(100px);
        font-size: px2rem(30px);
        color: #fff;
        padding: 0 px2rem(40px);
        background-color: #FF2074;
        /*background: url("/static/images/activity/down.png") center no-repeat;*/
        /*background-size: px2rem(24px) px2rem(16px);*/
        img {
          width: px2rem(24px);
          height: px2rem(16px);
          margin-left: px2rem(180px);
        }
      }
      .btn-green {
        background: #0DAF3F;
      }
      .btn-grey {
        background: #333333;
      }

    }
    .no-container {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: px2rem(40px);
    }
    .popWindow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      z-index: 999;
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
      }
      .pop-contain {
        position: absolute;
        bottom: 0;
        left: 0;
        width: px2rem(750px);
        overflow: hidden;
        background-color: #fff;
      }

      /*规格选择*/
      .sizeChoosePop-contain {
        height: px2rem(810px);
        padding-bottom: px2rem(171px);
        overflow-y: scroll;
        /*position: relative;*/
        .close {
          width: px2rem(46px);
          height: px2rem(46px);
          position: fixed;
          right: px2rem(30px);
          bottom: px2rem(900px);
        }
        .product-info {
          margin: px2rem(50px) px2rem(45px);
          padding-bottom: px2rem(45px);

          height: px2rem(202px);
          .product-img {
            float: left;
            width: px2rem(202px);
            height: px2rem(202px);
            /*margin: px2rem(50px) px2rem(24px) px2rem(50px) px2rem(45px);*/
          }
          .price-content {
            float: left;
            display: flex;
            max-width: 60%;
            flex-direction: column;
            height: px2rem(202px);
            justify-content: flex-end;
            margin-left: px2rem(24px);

            .now-price {
              color: #FF5959;
              font-size: px2rem(36px);
              span {
                font-size: px2rem(32px);
              }
              .origPrice{
                margin-left: px2rem(20px);
                text-decoration: line-through;
                color:#999999;
              }
            }
            .select-tip {
              color: #999;
              font-size: px2rem(30px);
              padding-top: px2rem(20px);
              height: px2rem(30px);
              line-height: px2rem(32px);
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .orig-price {
              color: #999;
              font-size: px2rem(22px);
              margin-top: px2rem(20px);
              text-decoration: line-through;
              i {
                font-size: px2rem(22px);
              }
            }
          }

        }

        .size-title {
          font-size: px2rem(32px);
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          width: px2rem(662px);
          /*height: px2rem(662px);*/
          padding: px2rem(42px) 0 px2rem(31px);
          border-top: 1px solid #eee;
          margin: 0 auto;
          /*margin: px2rem(42px) 0 px2rem(31px) px2rem(46px);*/
        }
        .size-num-content {
          width: px2rem(662px);
          height: px2rem(44px);
          line-height: px2rem(44px);
          font-size: px2rem(32px);
          border-top: 1px solid #eee;
          margin: 0 auto;
          .size-num {
            width: px2rem(44px);
            height: px2rem(44px);
            line-height: px2rem(44px);
            background: rgba(238, 238, 238, 1);
            float: left;
            text-align: center;
            margin: px2rem(42px) 0 px2rem(31px) px2rem(10px);
          }
          .size-num-title {
            height: px2rem(44px);
            line-height: px2rem(44px);
            font-size: px2rem(32px);
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            padding: px2rem(42px) 0 px2rem(31px) px2rem(0px);
            margin: 0 auto;
            float: left;
          }
          .size-down {
            margin-left: px2rem(380px);
            font-size: px2rem(34px);

          }
          .size-unuse {
            color: #DCDCDC;
          }
        }

        .tip {
          font-size: px2rem(24px);
          border-top: none;
        }
        .size-list {
          width: px2rem(680px);
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          .size-item {
            height: px2rem(62px);
            line-height: px2rem(62px);
            background: rgba(238, 238, 238, 1);
            border-radius: px2rem(8px);
            color: #333333;
            font-size: px2rem(32px);
            padding: 0 px2rem(35px);
            border: 1px solid #EEEEEE;
            margin-right: px2rem(30px);
            margin-bottom: px2rem(30px);
          }

          .no-product {
            color: #B3B3B3;
          }
          .select {
            border: 1px solid #FF2074;
            color: #FF2074;
            background: #fff;
          }
        }
        .btn {
          position: fixed;
          bottom: px2rem(29px);
          left: px2rem(30px);
          width: px2rem(690px);
          height: px2rem(100px);
          line-height: px2rem(100px);
          text-align: center;
          background: rgba(255, 32, 116, 1);
          border-radius: px2rem(8px);
          font-size: px2rem(40px);
          color: #fff;
          /*margin: px2rem(42px) auto px2rem(29px);*/
        }
      }
      /*推荐好货*/
      .recommendPop-contain {
        height: px2rem(490px);
        .close {
          position: absolute;
          right: px2rem(40px);
          top: px2rem(40px);
          width: px2rem(22px);
          height: px2rem(22px);
        }
        .title {
          width: px2rem(720px);
          height: px2rem(102px);
          line-height: px2rem(102px);
          padding-left: px2rem(30px);
          background: #FF2074;
          color: #fff;
          margin-bottom: px2rem(40px);
        }

      }
    }
  }
</style>
<template>
  <div class="eight-half-index">
    <div class="main-container" v-show="productExist">
      <div>
        <div class="swiper">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in productInfo.productPicUrls">
                <img :src="item + '?imageView2/1/w/750/h/750/interlace/1/q/100'" @click="previewImg($event,item,productInfo.productPicUrls)">
              </div>
            </div>
            <div class="swiper-pagination" v-show="productInfo.productPicUrls&&productInfo.productPicUrls.length>=2"></div>
          </div>
        </div>
      </div>
      <!--<div class="buyer-outer" style="display: none">-->
        <!--<div :class="'buyer '+[buyerStatus?'buyer-on':'buyer-off'] ">-->
          <!--<img :src="buyerItem.headPicUrl"/>-->
          <!--<p><span>{{buyerItem.nickName}}</span>已购买了此商品</p>-->
        <!--</div>-->
      <!--</div>-->
      <div class="buyer-outer" v-show="buyerStatus">
        <div class="swiper-container2">
          <div class="swiper-wrapper">
            <div class="swiper-slide buyer" v-for="(item,index) in purchaseUserList">
              <img :src="item.headPicUrl">
              <p><span>{{item.nickName}}</span>已购买了此商品</p>
            </div>
          </div>
        </div>
      </div>


      <!--<div class="wrap">-->
      <!--<div class="content">-->
      <!--<p>第一行数据</p>-->
      <!--</div>-->
      <!--</div>-->


      <div class="price-content" v-show="productInfo.secSymbol==1&&secondSymbolStatus=='1'">
        <div class="price" v-show="haveStock>0">
          <div class="now-price"><span>¥</span>{{productInfo.salePrice}}</div>
          <div class="orig-price" v-show="productInfo.orgPrice&&productInfo.orgPrice.toString().length>0">
            原价¥{{productInfo.orgPrice}}
          </div>
        </div>
        <div class="price price-noproduct" v-show="haveStock<=0">
          商品已抢光
        </div>
        <div class="timer-content timer-content-bgred">
          <!--<p class="timer-title">距离结束</p>  class="timer"-->
          <v-timer :endTime='endTime' :timeStatus="secondSymbolStatus" @second-end-over="secondEndOver"></v-timer>
        </div>
      </div>
      <div class="price-content price-content-green" v-show="productInfo.secSymbol==1&&secondSymbolStatus=='0'">
        <div class="price">
          <div class="now-price"><span>¥</span>{{productInfo.salePrice}}</div>
          <div class="orig-price" v-show="productInfo.orgPrice&&productInfo.orgPrice.toString().length>0">
            原价¥{{productInfo.orgPrice}}
          </div>
        </div>
        <div class="timer-content timer-content-bgblack">
          <v-timer :endTime='startTime' :timeStatus="secondSymbolStatus" @second-end="secondEnd"
                   @second-start="secondStart"></v-timer>
        </div>
      </div>
      <div class="product-tip" v-show="productInfo.secSymbol==1&&secondSymbolStatus=='2'">
        已售罄 下场秒杀即将开启
      </div>
      <div class="basic-price-content" v-show="productInfo.secSymbol=='0'">
        <!--<div class="price">-->
        <div class="now-price"><span>¥</span>{{productInfo.salePrice}}</div>
        <div class="orig-price" v-show="productInfo.orgPrice&&productInfo.orgPrice.toString().length>0">
          ¥{{productInfo.orgPrice}}
        </div>
        <!--</div>-->
      </div>
      <div class="title">
        <div>{{productInfo.productName}}</div>
      </div>

      <div class="tip"
           v-show="productInfo.secSymbol=='1'||(productInfo.productServices&&productInfo.productServices.length>0)">
        <div class="second-time-img" v-show="productInfo.secSymbol=='1'"></div>
        <h4 :class="productInfo.secSymbol=='1'?'':'product-service'" v-show="productInfo.productServices&&productInfo.productServices.length>0">
        <span v-for="(item,index) in productInfo.productServices"
              v-if="productInfo.productServices&&(index<productInfo.productServices.length-1)">{{item}} • </span>
          <span v-for="(item,index) in productInfo.productServices"
                v-if="productInfo.productServices&&(index==productInfo.productServices.length-1)">{{item}}</span>
        </h4>
      </div>
      <div class="sizeChoose">
        <div @click="openSizeChoose" class="choose-words">规格
          <img class="char" src="/static/images/activity/applet/eightHalf/push_arrowRight_icon@2x.png"/>
          <span  class="choose-words-info" v-show="!(selectSize.specAttr1&&selectSize.specAttr2)">请选择</span>
          <span class="choose-words-info" v-show="selectSize.specAttr1&&selectSize.specAttr2">已选  "{{selectSize.specAttr1}}" "{{selectSize.specAttr2}}"</span>
        </div>
      </div>
      <div class="product-hot-content" v-show="hotProduct.length>0">
        <h3>热销精选</h3>
        <div class="product-hot-outer">
          <div class="product-hot-outer2">
            <div class="product-hot">
              <div class="hot-item" v-for="item in hotProduct"
                   @click="refreshProduct('/activity_2018/eightHalf_index',item,5);">
                <img :src="item.productPicUrl"/>
                <div>{{item.productName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="guide-content" v-show="productInfo.linkStaffCode">
        <img :src="productInfo.storeLogoUrl">
        <div class="guide-name">
          <div>{{productInfo.storeName}}</div>
          <h3>您的专属导购:{{productInfo.linkStaffName}}</h3>
        </div>
        <a :href="'tel:' + productInfo.linkStaffMobileNum" class="phone"><img
          src="/static/images/activity/applet/eightHalf/phone.png" /></a>
      </div>
      <div class="guide-tip" v-show="productInfo.linkStaffCode">您的专属导购携手身边店 用心帮您挑好货</div>
      <div class="product-detail">
        <img v-for="item in productInfo.picDetailUrls" :src="item">
      </div>


      <div class="btn" v-show="productInfo.secSymbol==1&&productInfo.buyStatus=='1'">您只能买一次秒杀商品哦！</div>
      <div class="btn btn-green" v-show="productInfo.secSymbol==1&&secondSymbolStatus=='0'">{{begin}}</div>
      <div class="btn" v-show="(secondSymbolStatus=='1'||productInfo.secSymbol==0)&&haveStock>0" @click="buy">立即购买</div>
      <div class="btn btn-grey" v-show="productInfo.secSymbol==1&&secondSymbolStatus=='2'">已售罄 下场秒杀即将开启</div>
      <div class="btn-over" @click="recommendProduct" v-show="haveStock<=0">
        商品已抢光，为您推荐一下好货。<img src="/static/images/activity/down.png">
      </div>
    </div>
    <div class="no-container" v-show="!productExist"></div>
    <!-- 规格选择 -->
    <div class="sizeChoosePop popWindow" v-show="sizeChooseShow&&haveStock>0">
      <div class="mask" @click="sizeChooseShow=false;"></div>
      <div class="sizeChoosePop-contain pop-contain">
        <img src="/static/images/close.png" alt="" @click="sizeChooseShow=false;" class="close">
        <div class="product-info">
          <img class="product-img" :src="selectSize.skuPicUrl||selectSizeStart.skuPicUrl||productInfo.productPicUrls[0]||''" @click="previewImg($event,selectSize.skuPicUrl||selectSizeStart.skuPicUrl||productInfo.productPicUrls[0]||'')"/>
          <div class="price-content">
            <p class="now-price"><span>¥</span>{{selectSize.salePrice||selectSizeStart.salePrice||''}}<span class="origPrice">市场价¥{{selectSize.orgPrice||selectSizeStart.orgPrice}}</span></p>
            <p class="select-tip">{{(selectSize.specAttr1&&selectSize.specAttr1.length>0)||(selectSize.specAttr2&&selectSize.specAttr2.length>0)?((selectSize.specAttr1||'')+(selectSize.specAttr2||'')):'请选择规格'}}</p>
            <!--<p class="orig-price">¥{{selectSize.orgPrice||selectSizeStart.orgPrice||''}}</p>-->
          </div>
        </div>
        <h3 class="size-title">{{productInfo.specName1}}</h3>
        <div class="size-list">
          <label v-for="(item,index) in sizeList1"
                 :class="'size-item '+[(selectSize.specAttr2&&item.storeSum<=0)?'no-product ':'']+[selectSize.specAttr1==item.specAttr1?'select':'']"
                 @click="sizeSelect1(item);">{{item.specAttr1}}</label>
          <!--<label class="size-item">红色</label>-->
          <!--<label class="size-item no-product">红色</label>-->
          <!--<label class="size-item">红色</label>-->
          <!--<label class="size-item">红色红色红色</label>-->

        </div>
        <h3 class="size-title">{{productInfo.specName2}}</h3>
        <div class="size-list">
          <label v-for="(item,index) in sizeList2"
                 :class="'size-item '+[selectSize.specAttr1&&item.storeSum<=0?'no-product ':'']+[selectSize.specAttr2==item.specAttr2?'select':'']"
                 @click="sizeSelect2(item)">{{item.specAttr2}}</label>
          <!--<label class="size-item select">50KG</label>-->
          <!--<label class="size-item">10KG</label>-->
          <!--<label class="size-item no-product">15KG</label>-->
        </div>
        <h3 class="size-title tip" v-show="productInfo.secSymbol=='1'">提示：秒杀商品，每人仅可限购一件。</h3>
        <div class="size-num-content" v-show="productInfo.secSymbol=='0'">
          <div class="size-num-title">购买数量</div>
          <div :class="'size-num size-down '+[buyNum<=1?'size-unuse':'']" @click="calcul('-')">－</div>
          <div class="size-num">{{buyNum}}</div>
          <div :class="'size-num '+[(selectSize.storeSum&&selectSize.storeSum<=buyNum)?'size-unuse':'']"
               @click="calcul('+')">+
          </div>
        </div>
        <div class="btn" @click="buy">立即购买</div>
      </div>
    </div>
    <!-- 商品已抢光，为您推荐一下好货 -->
    <div class="recommendPop popWindow" v-show="recommendShow">
      <div class="mask"></div>
      <div class="recommendPop-contain pop-contain">
        <img src="/static/images/activity/close.png" alt="" @click="recommendShow=false;" class="close">
        <h3 class="title">商品已抢光，为您推荐一下好货</h3>
        <div class="product-hot-outer">
          <div class="product-hot-outer2">
            <div class="product-hot">
              <div class="hot-item" v-for="item in recommProduct"
                   @click="refreshProduct('/activity_2018/eightHalf_index',item,4);">
                <img :src="item.productPicUrl"/>
                <div>{{item.productName}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import cutDown from '@/components/common/cutDown'
  import eightHalfApi from './../../../../fetch/eightHalf'
  import api from './../../../../fetch/api'
  import loading from '@/components/common/loading'
  import wxInit from "../../../../util/wxInit"
  import urlConfig from "../../../../util/urlConfig"

  export default{
    components: {
      swiper,
      swiperSlide,
      "v-timer": cutDown,
      "v-loading": loading
    },
    data () {
      return {
        productCode: this.$route.query.productCode,//产品编号
        linkStaffCode: this.$route.query.linkStaffCode || null,//导购编号
        appEntranceType: this.$route.query.appEntranceType,//应用入口
        orderEntryCode: this.$route.query.orderEntryCode,//订单入口
        xd_code: this.$route.query.xd_code,
        productType: this.$route.query.productType||null,
        productExist: true,
        buyerStatus: true,
        buyerItem: '',
        buyerNum: 0,
        buyNum: 1,
        startTime: "2018-11-24 15:03:00",
        endTime: "2018-11-24 15:04:00",
        begin: '',
        haveStock: 0,
        sizeChooseShow: false,
        recommendShow: false,
        productInfo: {
          productPicUrls:[],
        },
        hotProduct: [],
        recommProduct: [],
        secondSymbolStatus: '-1',//0还没开始，1：一开始 2：已结束
        sizeList1: [],
        sizeList2: [],
        selectSize: {},
        selectSizeStart: {},
        purchaseUserList: [],
        loading: false,
        shareInitContent:{},
      }
    },
    //判断重复进入
    beforeRouteEnter(to, from, next) {
      if (navigator.userAgent.match(/Android/i)) {
        sessionStorage.entryMark = "marked"
        next();
        return;
      } else {
        next((vm) => {
          if (sessionStorage.entryMark !== "marked") {
            sessionStorage.entryMark = "marked"
            vm.$router.go(0);
            return;
          }
        })
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
      },
    },
    watch: {
      productInfo: function () {
        var sizeList1 = [];
        var sizeList2 = [];
        var skuList = this.productInfo.skuList;
        var haveDefault = false;
        var haveStock = 0;
        for (var item in skuList) {
          haveStock += skuList[item].storeSum;
          sizeList1.push(skuList[item].specAttr1);
          sizeList2.push(skuList[item].specAttr2);
          if (skuList[item].isDefault == 1) {
            this.selectSizeStart = skuList[item];
            haveDefault = true;
          }
        }
        this.haveStock = haveStock;
        if (!haveDefault && skuList.length > 0) {
          this.selectSizeStart = skuList[0];
        }
        sizeList1 = [...new Set(sizeList1)];
        sizeList2 = [...new Set(sizeList2)];
        for (var item in skuList) {
          var itemValue = skuList[item];

          for (var key in sizeList1) {
            if (sizeList1[key] == itemValue.specAttr1) {
              sizeList1[key] = itemValue;
            }
          }
          for (var key in sizeList2) {
            if (sizeList2[key] == itemValue.specAttr2) {
              sizeList2[key] = itemValue;
            }
          }
        }
        this.sizeList1 = sizeList1;
        this.sizeList2 = sizeList2;

        if (this.productInfo.secSymbol == '1') {
          var secBeginTimeStamp = this.productInfo.secBeginTimeStamp;
          var secEndTimeStamp = this.productInfo.secEndTimeStamp;
          var nowTime = new Date().getTime();
          this.startTime = new Date(secBeginTimeStamp).toString();
          this.endTime = new Date(secEndTimeStamp).toString();
          if (nowTime < secBeginTimeStamp) {
            this.secondSymbolStatus = '0';
          } else if (nowTime >= secBeginTimeStamp && nowTime <= secEndTimeStamp) {
            this.secondSymbolStatus = '1';
          } else {
            this.secondSymbolStatus = '2';
          }
        } else {
          this.secondSymbolStatus = "-1";
          this.startBuyer();
        }

      },
      secondSymbolStatus: function () {
        var _this = this;
        if (this.secondSymbolStatus == '0') {
          this.buyerStatus = false;
          //还未开启
//          this.purchaseSwiper.destroy(false);
        } else {
          this.startBuyer();
        }
      }
    },
    methods: {
      previewImg:function(e,item,array){
        // 通过这个API就能直接调起微信客户端的图片播放组件了
        wx.previewImage({
          current: item,
          urls: array||[item]
        });
      },
      //数据收集
      collect(data, token){
        if (token) {
          eightHalfApi.collectData("post", data, token).then(res => {

          });
        } else {
          eightHalfApi.collectData("post", data, this.tokenInfo.token).then(res => {
          });
        }
      },
      openSizeChoose: function () {
        if (this.haveStock <= 0) {
          alert("商品已抢光");
          return;
        }

        this.sizeChooseShow = true;
        // if (this.productInfo.skuList.length == 1) {
        if((JSON.stringify(this.selectSize) == '{}') ){
          var skuList = this.productInfo.skuList;
          var sizeList1=this.sizeList1;
          var sizeList2=this.sizeList2;
          for(var i=0;i<sizeList1.length;i++){
            var curSize0Item=sizeList1[0].specAttr1;
            for(var j=0;j<skuList.length;j++){
              if(curSize0Item==skuList[j].specAttr1){
                if(skuList[j].storeSum>0){
                  // this.selectSize = this.productInfo.skuList[0];
                  this.selectSize = skuList[j];
                  return;
                }
              }
            }
          }

        }


        // }
      },
      secondEnd: function () {
        if (this.productInfo.secSymbol == 1) {
          this.secondSymbolStatus = '1';
        }

      },
      secondEndOver: function () {
        if (this.productInfo.secSymbol == 1) {
          this.secondSymbolStatus = '2';
        }
      },

      secondStart: function (time) {
        this.begin = time;
      },
      calcul(symbol){
        if (symbol == '-' && this.buyNum > 1) {
          this.buyNum = --this.buyNum;
        } else if (symbol == '+' && !(this.selectSize.storeSum && this.selectSize.storeSum <= this.buyNum)) {
          this.buyNum = ++this.buyNum;
        }
      },
      refreshProduct(path, item,productType){
          var orderEntryCode=3;
        if(productType==4){ //推荐好货
          orderEntryCode=3
          }else if(productType==5){//热销
          orderEntryCode=4;
          }
        let src = path + "?productCode=" + item.productCode + "&linkStaffCode=" + (this.linkStaffCode || "") + "&xd_code=" + this.xd_code + "&appEntranceType=3&orderEntryCode="+orderEntryCode+"&productType="+productType;
        window.location.href = src;
      },
      //规格1选择
      sizeSelect1(item) {
        if ((JSON.stringify(this.selectSize) == '{}') || !this.selectSize.specAttr2 || item.storeSum > 0) {
          var selectSize = this.selectSize;
          var specAttr2 = selectSize.specAttr2 || null;
          selectSize = JSON.parse(JSON.stringify(item));
          selectSize.specAttr2 = specAttr2;
          this.selectSize = selectSize;
          if (this.selectSize.specAttr1 && this.selectSize.specAttr2 && this.selectSize.storeSum < this.buyNum) {
            this.buyNum = this.selectSize.storeSum;
          }

          var specAttr1 = item.specAttr1;
          var sizeList2 = [];
          var skuList = this.productInfo.skuList;

          for (var value of skuList) {
            if (specAttr1 == value.specAttr1) {
              sizeList2.push(value);
            }
          }
          this.sizeList2 = sizeList2;
        }
      },
      //规格2选择
      sizeSelect2(item) {
        if ((JSON.stringify(this.selectSize) == '{}') || !this.selectSize.specAttr1 || item.storeSum > 0) {
          var selectSize = this.selectSize;
          var specAttr1 = selectSize.specAttr1 || null;
          selectSize = JSON.parse(JSON.stringify(item));
          selectSize.specAttr1 = specAttr1;
          this.selectSize = selectSize;
          if (this.selectSize.specAttr1 && this.selectSize.specAttr2 && this.selectSize.storeSum < this.buyNum) {
            this.buyNum = this.selectSize.storeSum;
          }
          var specAttr2 = item.specAttr2;
          var sizeList1 = [];
          var skuList = this.productInfo.skuList;

          for (var value of skuList) {
            if (specAttr2 == value.specAttr2) {
              sizeList1.push(value);
            }
          }
          this.sizeList1 = sizeList1;
        }
      },
      //请求数据
      getProductInfo: function () {
        this.loading = true;
        eightHalfApi.getProductDetail("post", {
          productCode: this.productCode,
          linkStaffCode: this.linkStaffCode
        }, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.productExist = true;
            this.loading = false;
            this.productInfo = res.returnContent;
            this.shareInitContent.title=res.returnContent.productName;
            this.shareInitContent.desc=res.returnContent.productDesc;
            this.shareInitContent.link=urlConfig.redirectBaseredirectURI+"/activity_2018/eightHalf_index?"+"productCode="+this.productCode+"&linkStaffCode="+this.linkStaffCode+"&appEntranceType="+this.appEntranceType+"&orderEntryCode="+this.orderEntryCode+"&xd_code="+this.xd_code+"&productType="+this.productType;
            this.shareInitContent.img=res.returnContent.productPicUrls[0];
            sessionStorage.setItem("eightHalf_shareContent",JSON.stringify(this.shareInitContent));
            this.initWxShare(this.shareInitContent,()=>{this.collect({
              "xdCode": this.xd_code,
              "ydCode": "YD0002",
              srcStaffCode:this.linkStaffCode||null,
              productCode:this.productCode||null,
              productType:this.productType||null
            })});

            this.$nextTick(function () {
              this.swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationType: 'fraction',
                paginationClickable: true,
                spaceBetween: 0,
                centeredSlides: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false
              });
            });

          } else {
            this.loading = false;
            this.productExist = false;
            this.$toast(res.message);
          }
        });
      },
      //取得热销商品
      getHotProduct: function () {
        eightHalfApi.listHotProduct("get", {}, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.hotProduct = res.returnContent;
          } else {
            this.$toast(res.message);
          }
        });
      },
      //取得推荐商品
      recommendProduct: function () {
        eightHalfApi.listRecommendProduct("get", {}, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.recommProduct = res.returnContent;
            this.recommendShow = true;
          } else {
            this.$toast(res.message);
          }
        });
      },
      //启动**某某购买了此商品
      startBuyer: function () {
        var _this = this;
        this.buyerStatus = true;
        _this.getPurchasedUser();
      },
      //购买用户
      getPurchasedUser: function () {
        eightHalfApi.listPurchasedUser("get", {
          productCode: this.productCode
        }, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.purchaseUserList = res.returnContent;
            this.$nextTick(function () {
//              this.purchaseSwiper.destroy(false);
              this.purchaseSwiper = new Swiper('.swiper-container2', {
                direction: 'vertical',
                paginationClickable: true,
                spaceBetween: 0,
                centeredSlides: true,
                autoplay: 3000,
                loop: true,
                autoplayDisableOnInteraction: false
              });
            });
          } else {
            this.$toast(res.message);
          }
        });
      },
      //购买
      buy: function () {
        if (this.productInfo.productStatus == 0) {
          alert("该商品已下架");
          return;
        }
        if (!this.selectSize.skuCode || !this.selectSize.specAttr1 || !this.selectSize.specAttr2 || this.selectSize.specAttr1.length <= 0 || this.selectSize.specAttr2.length <= 0) {
//          alert("请选择规格");
          if(!this.sizeChooseShow){
            this.openSizeChoose();
          }else {
            alert("请选择规格");
          }
          return;
        }
        if (this.productInfo.secSymbol == 1 && this.secondSymbolStatus == '0') {
          alert("商品还未开售！");
          return;
        }
        if (this.productInfo.secSymbol == 1 && this.secondSymbolStatus == '2') {
          alert("商品已售罄！");
          return;
        }
        if (this.selectSize.storeSum <= 0) {
          alert("库存不足");
          return;
        }

        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0005",
          srcStaffCode:this.linkStaffCode||null,
          productCode:this.productCode||null,
          productType:this.productType||null
        });
        let src = "/activity_2018/eightHalf_account?skuCode=" + this.selectSize.skuCode + "&buyNum=" + this.buyNum + "&productCode=" + this.productCode + "&linkStaffCode=" + (this.linkStaffCode || "") + "&appEntranceType=" + this.appEntranceType + "&orderEntryCode=" + this.orderEntryCode + "&xd_code=" + this.xd_code+"&productType="+this.productType||null;
        this.$router.push({
          path: src
        })
      },
      init: function () {
        this.getProductInfo();
        this.getHotProduct();
      },
      destory: function () {
        this.purchaseSwiper.destroy(false);
        this.swiper.destroy(false);
      }
    },
    created(){
      this.collect({
        "xdCode": this.xd_code,
        "ydCode": "YD0003",
        srcStaffCode:this.linkStaffCode||null,
        productCode:this.productCode||null,
        productType:this.productType||null
      });

      new wxInit(this);
      this.initWxConfig();


    },
    mounted(){
      this.init();
    },
    destroryed(){
      this.destory();
    }
  }
</script>
<!--<div class="product-other-content">-->
<!--<h3 class="title">&#45;&#45;&#45;&#45; 大家都在买 &#45;&#45;&#45;&#45;</h3>-->
<!--<div class="product-other">-->
<!--<div class="other-item">-->
<!--<img src="/static/images/activity/close_red.png">-->
<!--<div class="name">LANCOME小黑瓶精华肌底液启动基因LANCOME小黑瓶精华肌底液启动基因LANCOME小黑瓶精华肌底液启动基因LANCOME小黑瓶精华肌底液启动基因</div>-->
<!--<div class="price">¥466.0<span>¥466.0</span>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->
<!--</div>-->

<!--/*.product-other-content {*/-->

<!--/*!*background: #fff;*!*/-->
<!--/*.title {*/-->
<!--/*width: 100%;*/-->
<!--/*color: #333333;*/-->
<!--/*font-size: px2rem(30px);*/-->
<!--/*text-align: center;*/-->
<!--/*background: #fff;*/-->
<!--/*padding: px2rem(46px) 0 px2rem(66px) 0;*/-->
<!--/*}*/-->
<!--/*.product-other {*/-->
<!--/*width: 92%;*/-->
<!--/*display: flex;*/-->
<!--/*justify-content: space-between;*/-->
<!--/*align-items: center;*/-->
<!--/*flex-wrap: wrap;*/-->
<!--/*padding: 0 4%;*/-->
<!--/*.other-item {*/-->
<!--/*display: flex;*/-->
<!--/*flex-direction: column;*/-->
<!--/*flex-wrap: nowrap;*/-->
<!--/*width: px2rem(334px);*/-->
<!--/*height: px2rem(490px);*/-->
<!--/*border-radius: px2rem(8px);*/-->
<!--/*background: #fff;*/-->
<!--/*margin-top: px2rem(20px);*/-->
<!--/*img {*/-->
<!--/*width: px2rem(334px);*/-->
<!--/*height: px2rem(334px);*/-->
<!--/*}*/-->
<!--/*.name {*/-->
<!--/*width: px2rem(301px);*/-->
<!--/*height: px2rem(50px);*/-->
<!--/*line-height: px2rem(26px);*/-->
<!--/*font-size: px2rem(24px);*/-->
<!--/*display: -webkit-box;*/-->
<!--/*overflow: hidden;*/-->
<!--/*-webkit-line-clamp: 2;*/-->
<!--/*-webkit-box-orient: vertical;*/-->
<!--/*margin: px2rem(21px) auto;*/-->
<!--/*}*/-->
<!--/*.price {*/-->
<!--/*width: px2rem(301px);*/-->
<!--/*color: #FF2074;*/-->
<!--/*font-size: px2rem(24px);*/-->
<!--/*font-weight: 500;*/-->
<!--/*margin: 0 auto;*/-->
<!--/*i {*/-->
<!--/*font-size: px2rem(20px);*/-->
<!--/*}*/-->
<!--/*span {*/-->
<!--/*color: #999;*/-->
<!--/*text-decoration: line-through;*/-->
<!--/*margin-left: px2rem(20px);*/-->
<!--/*}*/-->
<!--/*}*/-->
<!--/*}*/-->
<!--/*}*/-->
<!--/*}*/-->
