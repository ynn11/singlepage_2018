<template>
  <div class="double-12-guide-gifts">
    <activityHeader type="perpage" title="年末送礼冲业绩"></activityHeader>
    <div class="main-container">
      <p class="tip1">若会员出示的为<span>锁定码</span>， <br/> 请先向会员收取{{activityInfo.cashCouponPrice}}元后进行核销。</p>
      <p class="tip2">请输入会员出示的6位数：</p>
      <div class="my-input-content">
        <input class="my-input" placeholder="请输入" v-model="checkCode"/>
      </div>
      <!--<p class="tip2 fsize30">门店商品库存不足</p>-->
      <div class="btn" @click="confirmCancellation(1)">确认核销</div>
    </div>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>

    <!--弹窗 输入码无效-->
    <div class="popWindow" v-if="showNoEffect">
      <div class="mask"></div>
      <div class="no-effect-contain pop-contain">
        <div class="title tip-other">输入的码无效噢<br/>请检查后重新输入</div>
        <div class="btn-content">
          <div class="btn" @click="showNoEffect=false">确定</div>
        </div>
      </div>
    </div>

    <!--弹窗 确认支付-->
    <div class="popWindow" v-if="showIsPay">
      <div class="mask"></div>
      <div class="no-effect-contain pop-contain">
        <div class="title">该码为锁定码，<br/>请确定会员已支付{{activityInfo.cashCouponPrice}}元给你！</div>
        <div class="btn-content">
          <div class="btn unpay" @click="showIsPay=false;">未支付</div>
          <div class="btn" @click="confirmCancellation(2)">已支付</div>
        </div>
      </div>
    </div>

    <!--弹窗 兑换成功-->
    <div class="popWindow" v-if="showExchangeSuc">
      <div class="mask"></div>
      <img class="gift-img" src="/static/images/activity/guide/double_12/gift.png"/>
      <div class="success-contain pop-contain">
        <div class="tip1">兑换成功</div>
        <p class="tip2">可以把礼品给会员啦！</p>
        <div class="btn-content">
          <div class="btn " @click="exchangeSucSure">确定</div>
        </div>
      </div>
    </div>

    <!--弹窗 核销成功-->
    <div class="popWindow" v-if="showVerifiSuc">
      <div class="mask"></div>
      <img class="gift-img" src="/static/images/activity/guide/double_12/gift.png"/>
      <div class="success-contain pop-contain">
        <div class="tip1">核销成功</div>
        <p class="tip2">可以把礼品给会员啦！</p>
        <div class="btn-content">
          <div class="btn " @click="verifiSucSure">确定</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '../../../../fetch/api'
  import _urlConfig from "../../../../util/urlConfig"
  import double12Api from '../../../../fetch/double_12_api'
  import activityHeader from "@/components/common/activityHeader"
  import * as _tool from "../../../../util/tool"
  import loading from '@/components/common/loading'

  export default{
    components: {
      "v-loading": loading,
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,//android，ios
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        loading: false,
        showNoEffect: false,
        showIsPay: false,
        showExchangeSuc: false,
        showVerifiSuc: false,
        activityInfo: {},
        checkCode: "",

      }
    },
    methods: {
      verifiSucSure(){
        this.showVerifiSuc = false;
        this.$router.back();
      },
      exchangeSucSure(){
        this.showExchangeSuc = false;
        this.$router.back();
      },
      //数据收集
      collect: function (data) {
        api.collectStatisticsOnActivitiesByStaff("post", data, this.token).then(res => {
          console.log(res);
        });
      },
      getActivityInfo: function () {
        double12Api.activityInfo("post", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityInfo = res.returnContent;
          } else {
            alert(res.message);
          }
        })
      },
      confirmCancellation(checkType) {
        if (!this.checkCode || !(/^[0-9]+$/.test(Number(this.checkCode)))) {
          alert("请输入正确的6位数字！");
          return;
        }
        if(checkType==1){
          this.collect({
            "xdCode": "XD0007",
            "ydCode": "YD0025",
            "activityCode": this.activityCode
          });
        }


        double12Api.activityComplete("post", {
          activityCode: this.activityCode,
          checkType: checkType,
          checkCode: this.checkCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            if (checkType === 1) { //是否有效
              if (res.returnContent.effective === 1) { //有效
                if (res.returnContent!=null&&res.returnContent.codeType!=null&&res.returnContent.codeType === 2) { //类型(1：核销码 2：锁定码)
                  this.showIsPay = true;
                } else {
                  this.confirmCancellation(2);
                }
              } else {//无效
                this.collect({
                  "xdCode": "XD0007",
                  "ydCode": "YD0026",
                  "activityCode": this.activityCode
                });
                this.showNoEffect = true;
              }
            } else { //2：使用兑换码
              if (res.returnContent!=null&&res.returnContent.codeType!=null&&res.returnContent.codeType === 2) { //类型(1：核销码 2：锁定码)
                this.showIsPay = false;
                this.showExchangeSuc = true;

              } else {
                this.showVerifiSuc = true;
              }
            }

          } else {
            alert(res.message);
          }
        })
      },
    },
    mounted(){
      this.getActivityInfo();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-12-guide-gifts {
    .fsize30 {
      font-size: px2rem(30px);
    }
    .main-container {
      position: relative;
      width: 100%;
      min-height: 200%;
      padding-top: px2rem(80px);
      background-color: #12013A;
      .tip1 {
        font-size: px2rem(36px);
        font-weight: 600;
        line-height: px2rem(43px);
        color: rgba(255, 255, 255, 1);
        margin: px2rem(98px) px2rem(67px) px2rem(78px);
        span {
          color: #FBBD01;
          font-weight: 600;
        }
      }
      .tip2 {
        font-size: px2rem(30px);
        color: rgba(251, 189, 1, 1);
        margin: 0 px2rem(67px);
      }
      .my-input-content {
        margin: px2rem(27px) px2rem(67px);
        padding: px2rem(30px) px2rem(23px);
        border-radius: px2rem(8px);
        background-color: #fff;
        .my-input {
          width: 100%;
          color: #FBBD01;
          font-size: px2rem(36px);
          font-weight: 600;
        }
        .my-input::-webkit-input-placeholder {
          color: #5F527C;
          font-size: px2rem(30px);
          font-weight: 300;
        }
      }
      .btn {
        height: px2rem(105px);
        line-height: px2rem(105px);
        text-align: center;
        margin: px2rem(68px) px2rem(105px);
        font-weight: 600;
        font-size: px2rem(36px);
        color: #7E26F9;
        background: rgba(255, 232, 1, 1);
        box-shadow: 0px 5px 6px 1px rgba(255, 232, 1, 0.31), 0px 0px 40px 0px rgba(241, 165, 0, 1);
        border-radius: px2rem(45px);
      }

    }

    .popWindow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      /*overflow-x: hidden;*/
      /*overflow-y: auto;*/
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
        z-index: 998;
      }
      .close{
        position: absolute;
        left: 80%;
        top: 32%;
        width: px2rem(50px);
        height: px2rem(50px);
        z-index: 999;
      }
      .pop-contain {
        position: absolute;
        top: 50%;
        left: 50%;
        width: px2rem(530px);
        transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        border-radius: px2rem(16px);
        text-align: center;
        z-index: 999;

      }
      .btn-content {
        margin: 0 px2rem(10px);
        border-top: 1px solid #eee;
        height: px2rem(100px);
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #5315B1;
        font-size: px2rem(36px);
        > div {
          /*width: 50%;*/
          height: px2rem(100px);
          flex: 1;
          line-height: px2rem(100px);
          text-align: center;
        }
      }
      /*无效核销码*/
      .no-effect-contain {
        border-radius: px2rem(10px);
        background-color: #fff;
        .title {
          font-size: px2rem(32px);
          line-height: px2rem(40px);
          color: rgba(51, 51, 51, 1);
          margin: px2rem(83px) auto px2rem(62px);
        }

        .unpay {
          color: #8470A3;
        }
      }
      /*成功*/
      .gift-img {
        position: absolute;
        left: 50%;
        top: 29.5%;
        transform: translate(-50%, 0%);
        width: px2rem(261px);
        height: px2rem(194px);
        z-index: 3;
      }
      .success-contain {
        height: px2rem(324px);
        background: rgba(255, 255, 255, 1);
        border-radius: px2rem(10px);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .tip1 {
          font-size: px2rem(40px);
          color: rgba(255, 107, 48, 1);
          margin-top: 18%;
        }
        .tip2 {
          font-size: px2rem(30px);
          color: rgba(153, 153, 153, 1);

        }
      }
    }

  }
</style>


