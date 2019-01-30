<template>
  <div class="pushing-index">
    <div class="main-container">
      <div class="pic-contain">
        <img :src="item" alt="" v-for="item in activityInfo.productDetailUrl.split(',')">
      </div>
      <div :class="'service-icon ' + [iconStatus?'on':'']" @click="toast"></div>
      <div class="buy-box gray"
           v-if="activityInfo.isDeleted===1||activityInfo.activityStatus===0||activityInfo.productStatus===0">
        <div class="sales-over">商品已售罄</div>
      </div>
      <div class="buy-box" v-else>
        <span class="label">购买数量</span>
        <img src="../../../../assets/images/activity/pushing/minus.png" alt="" class="minus" @click="reduce">
        <span>{{productSum}}</span>
        <img src="../../../../assets/images/activity/pushing/plus.png" alt="" class="plus" @click="add">
        <div class="buy-btn" @click="buy">立即购买</div>
      </div>
    </div>
    <!-- 客服选择弹窗 -->
    <div class="share popWindow" v-show="servicePopShow">
      <div class="mask"></div>
      <div class="service-contain pop-contain">
        <img src="/static/images/activity/close_gray_new.png" alt="" class="close" @click="servicePopShow=false;">
        <div class="man-contain item">
          <img src="/static/images/activity/applet/pushing/service_ava_woman.png" alt="" class="avatar">
          <a :href="'tel:' + activityInfo.staffMobileNum" class="contact-btn">联系导购</a>
        </div>
        <div class="woman-contain item">
          <img src="/static/images/activity/applet/pushing/service_ava_man.png" alt="" class="avatar">
          <a :href="'tel:' + activityInfo.serviceMobileNum" class="contact-btn">联系售后</a>
        </div>
        <div class="tip">客服服务时间:工作日9:00-17:00</div>
      </div>
    </div>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import api from "../../../../fetch/pushing_api"
  import _urlConfig from "../../../../util/urlConfig"
  import loading from '@/components/common/loading'

  export default {
    components: {
      "v-loading": loading
    },
    data() {
      return {
        storeCode: this.$route.query.storeCode || null,
        staffCode: this.$route.query.staffCode || null,
        productCode: this.$route.query.productCode || null,
        xd_code: this.$route.query.xd_code,
        activityCode: "57739ead915d4247baa7f99709116da6",
        activityInfo: {
          productDetailUrl: "",
          isDeleted: 0
        },
        loading: false,
        iconStatus: true,
        servicePopShow: false,
        productSum: 1,
        timeoutFn: null
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
      //数据收集
      collect(data, token){
        api.collectStatisticsOnActivities("post", data, this.tokenInfo.token).then(res => {
        });
      },
      reduce(){
        if (this.productSum !== 1) {
          --this.productSum;
        }
      },
      add(){
        if (this.productSum !== 99) {
          ++this.productSum;
        }
      },
      toast(){
        this.servicePopShow = true;
      },
      handleScroll(e){
        this.iconStatus = false;
        clearTimeout(this.timeoutFn);
        this.timeoutFn = setTimeout(() => {
          this.iconStatus = true;
        }, 1000);
      },
      getActivityContent(){
        api.activityContent("post", {
          productCode: this.productCode,
          activityCode: this.activityCode,
          storeCode: this.activityInfo.storeCode || this.storeCode,
          linkStaffCode: this.staffCode || null
        }, this.tokenInfo.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityInfo = res.returnContent;
          } else {
            this.$toast(res.message);
          }
        });
      },
      //购买礼包/参加活动
      buy(){
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0002",
          "activityCode": this.activityCode,
          "openId": this.openId,
          "relBusinessCode": this.productCode
        });
        let src = "/activity_2018/pushing_confirm?storeCode=" + (this.storeCode || "") + "&staffCode=" + (this.staffCode || "") + "&productCode=" + (this.productCode || "") + "&productSum=" + this.productSum + "&xd_code=" + (this.xd_code || "")
        this.$router.push({
          path: src
        })
      },
    },
    created(){
      if (sessionStorage.entryMark !== "marked") {
        return;
      }
    },
    mounted(){
      document.querySelector(".content").addEventListener('scroll', this.handleScroll);
      this.getActivityContent();
      this.collect({
        "xdCode": this.xd_code,
        "ydCode": "YD0001",
        "activityCode": this.activityCode,
        "openId": this.openId,
        "relBusinessCode": this.productCode
      });
    },
    destroryed(){
      document.querySelector(".content").removeEventListener('scroll', this.handleScroll);
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .pushing-index {
    position: relative;
    .main-container {
      position: relative;
      overflow: visible;
      height: 101%;
      .pic-contain {
        img {
          display: block;
          width: 100%;
        }
      }
      .service-icon {
        position: fixed;
        bottom: px2rem(285px);
        left: px2rem(-40px);
        width: px2rem(80px);
        height: px2rem(80px);
        transition: all 500ms;
        background: url("../../../../assets/images/activity/pushing/service_light.png");
        background-size: 100% 100%;
        z-index: 999;
        &.on {
          left: 4%;
          background: url("../../../../assets/images/activity/pushing/service.png");
          background-size: 100% 100%;
        }
      }
      .buy-box {
        overflow: hidden;
        position: fixed;
        bottom: px2rem(28px);
        left: 50%;
        width: px2rem(532px);
        line-height: px2rem(88px);
        background: linear-gradient(90deg, #333 0%, #333 80%, #ffd200 80%, #ffd200 100%);
        border-radius: px2rem(100px);
        transform: translateX(-50%);
        &.gray {
          background: transparent;
        }
        span {
          font-size: px2rem(30px);
          color: #fff;
          display: inline-block;
          vertical-align: middle;
          margin: 0 px2rem(16px);
        }
        .label {
          margin-left: px2rem(30px)
        }
        .minus, .plus {
          width: px2rem(34px);
          height: px2rem(34px);
          vertical-align: middle;
        }
        .buy-btn {
          float: right;
          display: block;
          vertical-align: middle;
          width: px2rem(195px);
          height: px2rem(88px);
          font-size: px2rem(30px);
          font-weight: bold;
          color: #333;
          line-height: px2rem(88px);
          background-color: #ffd200;
          letter-spacing: px2rem(4px);
          text-align: center;
          /*margin-left: px2rem(60px);*/
        }
        .sales-over {
          width: 100%;
          height: 100%;
          font-size: px2rem(32px);
          font-weight: bold;
          text-align: center;
          color: #fff;
          background-color: #bcbcbc;
          border-radius: px2rem(100px);
        }
      }
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
        top: 50%;
        left: 50%;
        width: px2rem(674px);
        transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        border-radius: px2rem(16px);
        .close {
          position: absolute;
          top: px2rem(40px);
          right: px2rem(30px);
          width: px2rem(30px);
          height: px2rem(30px);
          z-index: 9;
        }
        .title {
          font-size: px2rem(32px);
          color: #f3e6b6;
          line-height: px2rem(116px);
          text-align: center;
        }
      }
      .service-contain {
        overflow: hidden;
        width: px2rem(565px);
        .item {
          float: left;
          width: 49%;
          .avatar {
            display: block;
            width: px2rem(100px);
            margin: px2rem(75px) auto 0;
          }
          .contact-btn {
            display: block;
            width: px2rem(170px);
            line-height: px2rem(60px);
            background-color: #ffd200;
            border-radius: px2rem(30px);
            font-size: px2rem(28px);
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: px2rem(30px) auto;
          }
        }
        .tip {
          font-size: px2rem(24px);
          color: #666;
          line-height: px2rem(28px);
          text-align: center;
          margin: px2rem(30px) 0;
        }
      }
    }
  }
</style>
