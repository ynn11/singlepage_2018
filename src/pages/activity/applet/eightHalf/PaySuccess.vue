<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .eight-half-paysuccess {
    .main-container {
      background: #fff;
      text-align: center;
      padding-bottom: px2rem(30px);
      .pay-success-img {
        width: px2rem(154px);
        height: px2rem(154px);
        margin: px2rem(92px) 0 px2rem(40px);

      }
      h3 {
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: px2rem(34px);
        font-size: px2rem(30px);
        color: #000000;
        margin-bottom: px2rem(47px);
      }
      p {
        color: #999999;
        font-size: px2rem(28px);
        height: px2rem(137px);
        border-bottom: px2rem(20px) solid #eee;
        line-height: px2rem(34px);
      }
      .tip {
        width: 100%;
        margin: 0 auto;
        img{
          width: 100%;
        }
      }

    }
  }
</style>
<template>
  <div class="eight-half-paysuccess">
    <div class="main-container">
      <img class="pay-success-img" src="/static/images/activity/applet/eightHalf/pay_success.png"/>
      <h3>支付成功</h3>
      <p class="title-info">如有问题请在工作日：9:00-17:00<br/>
        联系售后客服：<a href="'tel:15356637653'">15356637653</a></p>
      <div class="tip"><a ><img :src="payPicUrl"/></a></div>
    </div>
  </div>
</template>

<script>
  import eightHalfApi from '../../../../fetch/eightHalf'
  import wxInit from "../../../../util/wxInit"
  export default{
    components: {},
    data () {
      return {
        productCode: this.$route.query.productCode || null,//产品编号
        linkStaffCode: this.$route.query.linkStaffCode || null,//导购编号
        skuCode: this.$route.query.skuCode,
        appEntranceType: this.$route.query.appEntranceType || 1,//应用入口
        orderEntryCode: this.$route.query.orderEntryCode || 1,//订单入口
        buyNum: this.$route.query.buyNum,
        receiptInfoCode:this.$route.query.receiptInfoCode,
        xd_code:this.$route.query.xd_code,
        productType:this.$route.query.productType,
        payPicUrl:"",
        payPicLink:""
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
    watch: {},
    methods: {

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
    },
    created(){
        new wxInit(this);
      this.initWxConfig();
      this.shareInitContent=JSON.parse(sessionStorage.getItem("eightHalf_shareContent"));
      this.initWxShare(this.shareInitContent,()=>{this.collect({
        "xdCode": this.xd_code,
        "ydCode": "YD0002",
        srcStaffCode:this.linkStaffCode||null,
        productCode:this.productCode||null,
        productType:this.productType||null
      })});
    },
    mounted(){
      eightHalfApi.getPaySuccessPicture("get",{}).then((res)=>{
          if(res.returnCode==='0'){
              this.payPicUrl=res.returnContent.payPicUrl;
              this.payPicLink=res.returnContent.payPicLink;
          } else {
            this.$toast(res.message);
          }
      });
    }
  }
</script>
