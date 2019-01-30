<style lang="scss" rel="stylesheet/scss">
  @import '../../../../../../assets/css/function';
  .eightHalf_activ_bonus_index{
    position: relative;
    height: 100%;
    background-color: #550011;

    *{
      font-weight: bold !important;
    }
    .main-containner{
      padding-top: px2rem(80px);
      padding-bottom: px2rem(80px);
      font-weight: bold !important;
      .banner-content{
        width: 100%;
        height: px2rem(1045px);
        position: relative;
        .banner{
          position: absolute;
          left: 0;
          top:0;
          width: 100%;
          height: px2rem(1045px);
          z-index: 1;
        }
        .title{
          position: absolute;
          left: 0;
          top:px2rem(643px);
          width: 100%;
          font-size: px2rem(38px);
          text-align: center;
          color:#fff;
          z-index: 2;
        }
        .bonusCommodities{
          position: relative;
          left: 0;
          top:px2rem(707px);
          height: px2rem(265px);
          margin: 0 px2rem(77px);

          background:#550011;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color:#fff;
          z-index: 2;
          img{
            position: absolute;
            left: px2rem(-20px);
            top:50%;
            transform: translateY(-50%);

            width: px2rem(225px);
            height: px2rem(224px);
          }
          .bonusCommodities-info{
            position: absolute;
            left: px2rem(250px);
            top:0;
            right: px2rem(30px);
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          p{
            text-indent: px2rem(30px);
            /*margin: 0 px2rem(30px);*/
            font-size: px2rem(24px);
            line-height: px2rem(32px);
            text-align: left;
          }
        }

      }
      .get-divid{
        /*width: px2rem(664px);*/
        height: px2rem(540px);
        margin: px2rem(100px) auto 0;
        background: url("/static/images/activity/guide/eightHalf/activity/bonus/square.png") center center no-repeat;
        background-size: px2rem(664px) px2rem(540px);
        position: relative;
        z-index: 2;
        .title{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top:px2rem(-60px);
          width: px2rem(449px);
          height:px2rem(113px);
        }
        .tip-content{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top:px2rem(160px);
          /*height: px2rem(218px);*/
          width: px2rem(618px);
          /*margin: 0 px2rem(65px);*/
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          .arrow{
            width: px2rem(25px);
            height: px2rem(20px);
            margin: px2rem(30px) px2rem(5px) 0;
          }
          .img1{
            width: px2rem(46px);
            height: px2rem(54px);
          }
          .img2{
            width: px2rem(59px);
            height: px2rem(50px);
          }
          .img3{
            width: px2rem(50px);
            height: px2rem(50px);
          }
          .img4{
            width: px2rem(53px);
            height: px2rem(53px);
          }
          .img5{
            width: px2rem(51px);
            height: px2rem(51px);
          }

          .tip{
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            p{
              color: #fff;
              font-size: px2rem(24px);
              margin: px2rem(10px) 0;
              text-align: center;
              line-height: px2rem(30px);

            }
          }
        }
        .tip-content2{
          top:px2rem(340px);
          width: 70%;
        }
      }
      .ruls{
        height: px2rem(540px);
        margin: px2rem(100px) auto 0;
        background: url("/static/images/activity/guide/eightHalf/activity/bonus/square.png") center center no-repeat;
        background-size: px2rem(664px) px2rem(540px);
        position: relative;
        z-index: 2;
        .title{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top:px2rem(-60px);
          width: px2rem(449px);
          height:px2rem(113px);
        }
        .ruls-content{
          position: absolute;
          left: 0%;
          top:px2rem(120px);
          margin: 0 px2rem(90px);
          p{
            color:#fff;
            font-size: px2rem(24px);
            margin-bottom: px2rem(20px);
            line-height: px2rem(32px);
          }
        }
      }

    }
  }
</style>
<template>
  <div class="eightHalf_activ_bonus_index">
    <activityHeader type="app" title="分红"></activityHeader>
    <div class="main-containner">
      <div class="banner-content">
        <img class="banner" src="/static/images/activity/guide/eightHalf/activity/bonus/banner@2x.png"/>
        <h3 class="title">哪些商品有分红?</h3>
        <div class="bonusCommodities">
          <img src="/static/images/activity/guide/eightHalf/activity/bonus/goods.png"/>
          <div class="bonusCommodities-info">
            <p>若商品有上图所示“赚”标志时，为分红商品。</p>
            <p> 例如左边商品：赚49元表示分红49元，当好友通过您的分享，购买此商品，您就能赚49元的分红。</p>
          </div>
        </div>
      </div>
      <div class="get-divid">
        <img class="title" src="/static/images/activity/guide/eightHalf/activity/bonus/get_divide.png"/>
        <div class="tip-content">
          <div class="tip">
            <img class="img1" src="/static/images/activity/guide/eightHalf/activity/bonus/tip1.png"/>
            <p>点击立即分享</p>
          </div>
          <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/bonus/arrow.png"/>
          <div class="tip">
            <img class="img2" src="/static/images/activity/guide/eightHalf/activity/bonus/tip2.png"/>
            <p>选择发送给微信好友<br/>或分享到朋友圈</p>
          </div>
          <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/bonus/arrow.png"/>
          <div class="tip">
            <img class="img3" src="/static/images/activity/guide/eightHalf/activity/bonus/tip3.png"/>
            <p>客户在你分享的<br/>链接里面下单</p>
          </div>
        </div>
        <div class="tip-content tip-content2">
          <div class="tip">
            <img class="img4" src="/static/images/activity/guide/eightHalf/activity/bonus/tip4.png"/>
            <p>买家确认商品<br/>且订单成为已完成状态</p>
          </div>
          <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/bonus/arrow.png"/>
          <div class="tip">
            <img class="img5" src="/static/images/activity/guide/eightHalf/activity/bonus/tip5.png"/>
            <p>你获得分红奖励</p>
          </div>
        </div>
      </div>
      <div class="ruls">
        <img class="title" src="/static/images/activity/guide/eightHalf/activity/bonus/ruls.png"/>
        <div class="ruls-content">
          <p>1. 订单完成规则：买家收到商品确认无误并且没有退款情况下，订单为完成状态。</p>
          <p>2. 分红奖励会在订单成为已完成状态时，发放至你绑定的支付宝中。若出现订单关闭，则无分红。</p>
          <p>3. 仅在有分红商品有买家购买，你才有分红。节假日及周日不发货，该期间发生的订单会在假日结束后第一个工作日处理。</p>
          <p>4. 如有问题请联系客服。电话客服15372072897<br/>微信客服13735433487。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import activityHeader from "@/components/common/activityHeader"
  import eightHalfApi from "../../../../../../fetch/eightHalf"
  export default{
    components: {
      activityHeader
    },
    data () {
      return {
        token:this.$route.query.token,
        xd_code: this.$route.query.xd_code,
        type: this.$route.query.type,
        activityCode: "201eac13ae874f28a3e02f37feff2cc1",

      }
    },
    computed: {},
    watch: {},
    methods: {
      //数据收集
      collect(data){
        eightHalfApi.guidecollectData("post", data,this.token).then(res => {
        });
      },
    },
    created(){
      this.collect({
        "xdCode": this.xd_code,
        "ydCode": "YD0011",
        "tsActivityCode":this.activityCode,
      });
    },
    mounted(){

    }
  }
</script>
