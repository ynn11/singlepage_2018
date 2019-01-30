<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  @import '/static/css/city-picker.css';
  .eight-half-account {

    position: relative;
    /*min-height: 90%;*/
    background-color: #EEEEEE;

    .main-container {
      background-color: #EEEEEE;
      padding-bottom: px2rem(160px);
      .address-content {
        height: px2rem(170px);
        color: #999999;
        font-size: px2rem(30px);
        background: url("/static/images/activity/applet/eightHalf/bar.png") no-repeat;
        background-size: px2rem(750px) px2rem(4px);
        background-position: 0 px2rem(165px);
        padding: 0 px2rem(30px);
        margin: 0 auto;
        background-color: #FFFFFF;
        position: relative;
        .char{
          /*float: right;*/
          width: px2rem(16px);
          height: px2rem(26px);
          position: absolute;
          display: block;
          right: 5%;
          top:48%;
        }
      }
      .address {
        h3 {
          clear: both;
          color: #333333;
          font-size: px2rem(30px);
          height: px2rem(30px);
          padding: px2rem(30px) px2rem(40px) px2rem(20px);
          span {
            float: right;
            height: px2rem(30px);
          }
        }
        p {
          clear: both;
          color: #999999;
          height: px2rem(72px);
          line-height: px2rem(36px);
          font-size: px2rem(28px);
          background: url("/static/images/activity/applet/eightHalf/address.png") left 0 no-repeat;
          background-size: px2rem(29px) px2rem(36px);
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical !important;
          -webkit-line-clamp: 2;
          padding: 0 0 0 px2rem(40px);
          width: px2rem(590px);
        }
        i {
          float: right;
          font-size: px2rem(28px);
          margin-top: px2rem(-50px);
        }

      }
      .no-address {
        line-height: px2rem(170px);
        .char{
            top:40%;
        }
      }
      .order-content {
        background-color: #fff;
        margin: px2rem(20px) 0;
        color: #333;
        .order-title {
          clear: both;
          font-size: px2rem(30px);
          height: px2rem(85px);
          line-height: px2rem(85px);
          border-bottom: 1px solid #eee;
          padding: 0 px2rem(30px);
          .money {
            float: right;
            color: #333333;
            font-size: px2rem(28px);
            i {
              font-size: px2rem(16px);
            }
          }
          input {
            color: #999999;
            margin-left: px2rem(30px);
          }
          .memo{
            width:75%;
          }
        }
        .order-title-money {
          width: px2rem(690px);
          text-align: right;
          i {
            color: #FF2074;
            font-size: px2rem(16px);
          }
          span {
            color: #FF2074;
          }
        }
        .order-info-content {
          padding: px2rem(30px);
          height: px2rem(200px);
          border-bottom: 1px solid #eee;
          img {
            float: left;
            width: px2rem(180px);
            height: px2rem(180px);
          }
          .order-info-right {
            float: left;
            margin-left: px2rem(30px);
            width: px2rem(460px);

            h3 {
              width: 100%;
              max-height: px2rem(62px);
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical !important;
              -webkit-line-clamp: 2;
              font-weight: 600;
              font-size: px2rem(28px);
              line-height: px2rem(32px);
              margin-bottom: px2rem(27px);
            }
            .grey {
              color: #999999;
              font-size: px2rem(24px);
            }
            .price {
              color: #FF5959;
              font-size: px2rem(28px);
              margin-top: px2rem(57px);
              i {
                font-size: px2rem(12px);
              }
              .grey {
                float: right;
              }
            }
            .num-select {
              float: right;
              margin-top: px2rem(-10px);
              color: #333333;

              .size-num {
                width: px2rem(44px);
                height: px2rem(44px);
                line-height: px2rem(44px);
                background: rgba(238, 238, 238, 1);
                font-size: px2rem(32px);
                float: left;
                text-align: center;
                margin: px2rem(0px) 0 px2rem(0px) px2rem(10px);
              }
              .size-down{
                font-size: px2rem(34px);
              }

              .size-unuse {
                color: #DCDCDC;
              }
            }

          }

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
          /*border-radius: 50%;*/
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
      .guide-tip{
        width: 100%;
        height: px2rem(45px);
        padding-top: px2rem(40px);
        background: url("/static/images/activity/applet/eightHalf/bg.png") center no-repeat;
        background-size: 100% px2rem(85px);
        color:#FF2074;
        text-align: center;
        font-size: px2rem(26px);
        margin-top: px2rem(-30px);
        margin-bottom: px2rem(30px);
      }
      .btn {
        position: fixed;
        bottom: px2rem(30px);
        left: px2rem(30px);
        width: px2rem(690px);
        height: px2rem(100px);
        line-height: px2rem(100px);
        background: rgba(39, 181, 21, 1);
        border-radius: px2rem(8px);
        margin: 0 auto;
        font-size: px2rem(40px);
        color: #fff;
        text-align: center;
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
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        /*border-radius: px2rem(16px);*/
        padding-left: px2rem(40px);
        padding-right: px2rem(40px);
        padding-bottom: px2rem(45px);
        .close {
          position: absolute;
          right: px2rem(30px);
          top: px2rem(30px);
          width: px2rem(46px);
          height: px2rem(46px);
        }
      }
      /*地址列表*/
      .addressList-contain {
        padding: px2rem(30px);
        width: px2rem(633px);
        .title {
          text-align: center;
          font-size: px2rem(32px);
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
          line-height: px2rem(70px);
        }
        .tip {
          clear: both;
          font-size: px2rem(30px);
          color: #999;
          height: px2rem(97px);
          line-height: px2rem(97px);
          width: px2rem(568px);
          padding-left: px2rem(10px);
          margin: 0 auto;
          display: block;
        }
        .address-input {
          width: px2rem(558px);
          height: px2rem(37px);
          line-height: px2rem(37px);
          font-size: px2rem(30px);
          padding:px2rem(30px) px2rem(10px);
          color: #333;
          border-bottom: 1px solid #EEEEEE;
          margin: 0 auto;
          display: block;

        }
        .address-input::-webkit-input-placeholder {
          color: #999999;
        }
        .address-area-content{
          position: relative;
          .address-area {
            width: 100%;
            height: px2rem(37px);
            line-height: px2rem(37px);
            font-size: px2rem(30px);
            color: #333;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            float: left;
            /*border-bottom: 1px solid #EEEEEE;*/
          }
          .multiPickerInput{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top:0;
          }
          i {
            /*float: right;*/
            position: absolute;
            right: 2%;
          }
        }

        .address-detail {
          clear: both;
          width: px2rem(568px);
          height: auto;
          font-size: px2rem(30px);
          padding-left: px2rem(10px);
          color: #333;
          border-bottom: 1px solid #EEEEEE;
          margin: px2rem(30px) auto;
          display: block;
        }
        .address-detail::-webkit-input-placeholder{
          color:#999;
        }
        .btn {
          width: px2rem(579px);
          height: px2rem(100px);
          line-height: px2rem(100px);
          background: rgba(255, 32, 116, 1);
          border-radius: px2rem(8px);
          color: #fff;
          font-size: px2rem(40px);
          text-align: center;
          margin: px2rem(68px) auto 0;
          display: block;
        }
      }

    }

    .noAddress{
      position: fixed;
      top: 42%;
      left: 10%;
      width:70%;
      height:auto;
      background:rgba(0,0,0,0.8);
      border-radius:px2rem(20px);
      font-size: px2rem(36px);
      line-height: px2rem(46px);
      padding: px2rem(60px) 5%;
      color:#fff;
      z-index: 999;
    }

  }

</style>
<template>
  <div class="eight-half-account">
    <div class="main-container">
      <div class="address-content address" @click="routerLink('/activity_2018/eightHalf_Address');"
           v-if="productList&&productList.length>0">
        <h3>{{defaultAddress.receipter}}<span>{{defaultAddress.connectTel}}</span></h3>
        <p>{{defaultAddress.zone}}{{defaultAddress.detailAddress}}</p>
        <!--<span class="char">＞</span>-->
        <img class="char" src="/static/images/activity/applet/eightHalf/push_arrowRight_icon@2x.png"/>
      </div>
      <div class="address-content no-address" @click="routerLink('/activity_2018/eightHalf_Address');" v-else>
        <div>您还没有收货地址，请点击填写。</div>
        <!--<span class="char">＞</span>-->
        <img class="char" src="/static/images/activity/applet/eightHalf/push_arrowRight_icon@2x.png"/>
      </div>
      <div class="order-content">
        <h3 class="order-title">订单信息</h3>
        <div class="order-info-content">
          <img :src="selectSize.skuPicUrl||productInfo.productPicUrls[0]||''"/>
          <div class="order-info-right">
            <h3>{{productInfo.productName}}</h3>
            <p class="grey">{{selectSize.specAttr1}}；{{selectSize.specAttr2}}</p>
            <div class="price">¥{{selectSize.salePrice}}
              <div class="grey" v-show="productInfo.secSymbol=='1'">X1</div>
              <div class="num-select" v-show="productInfo.secSymbol=='0'">
                <div :class="'size-num size-down '+[buyNum<=1?'size-unuse':'']" @click="calcul('-')">－</div>
                <div class="size-num">{{buyNum}}</div>
                <div :class="'size-num '+[(selectSize.storeSum&&selectSize.storeSum<=buyNum)?'size-unuse':'']"
                     @click="calcul('+')">+
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-title"><span>商品总额</span>
          <p class="money">¥{{(selectSize.salePrice*buyNum||0).toFixed(2)}}</p>
        </div>
        <div class="order-title"><span>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费</span>
          <p class="money">¥{{(orderInfo.shipFee||0).toFixed(2)}}</p></div>
        <div class="order-title"><span>买家留言</span><input v-model="buyerMessage" @blur="inputBlur" placeholder="这里可以备注需求哦" class="memo"/></div>
        <div class="order-title order-title-money">共{{buyNum}}件商品&nbsp;&nbsp;&nbsp;&nbsp;小计&nbsp;&nbsp; ¥<span>{{(selectSize.salePrice*buyNum+orderInfo.shipFee||0).toFixed(2)}}</span></div>
      </div>
      <div class="guide-content" v-show="productInfo.linkStaffCode">
        <img :src="productInfo.storeLogoUrl">
        <div class="guide-name">
          <div>{{productInfo.storeName}}</div>
          <h3>您的专属导购:{{productInfo.linkStaffName}}</h3>
        </div>
        <a :href="'tel:' + productInfo.linkStaffMobileNum" class="phone"><img src="/static/images/activity/applet/eightHalf/phone.png"/></a>
      </div>
      <div class="guide-tip" v-show="productInfo.linkStaffCode">您的专属导购携手身边店 用心帮您挑好货</div>
      <div class="btn" @click="buy">微信支付</div>
    </div>
    <v-loading v-show="loading"></v-loading>
    <!-- 添加地址 -->
    <div class="addressList popWindow" v-if="addressListShow">
      <div class="mask"></div>
      <div class="addressList-contain pop-contain">
        <img class="close" src="/static/images/close.png" @click="addressListShow=false;">
        <h3 class="title">添加地址</h3>
        <input class="address-input" placeholder="收货人" v-model="addressInfo.receipter">
        <input class="address-input" placeholder="手机号" v-model="addressInfo.connectTel">
        <div class="address-input address-area-content" ><div class="address-area"  tabindex="1">{{zoneInfo}}{{addressInfo.zone}}</div><i class="iconfont icon-qianjin"></i><div id="multiPickerInput2" class="multiPickerInput"></div></div>
        <!--<p class="tip">请填写详细街道地址</p>-->
        <textarea contenteditable="true" class="address-detail" placeholder="请填写详细街道地址" @blur="textareaBlur" v-model="addressInfo.detailAddress"></textarea>
        <div class="btn" @click="sure">确定</div>
      </div>
    </div>
    <div id="address-select2" tabindex="1">

    </div>
    <div class="popWindow noAddress" v-if="noAddressShow">
      该地址暂时无法发货，请重新<br/>选择/添加新地址。
    </div>
  </div>
</template>

<script>
  import eightHalfApi from "../../../../fetch/eightHalf"
  import api from "../../../../fetch/common_api"
  import loading from '@/components/common/loading'
  require('../../../../util/city-picker.js')
  import $city from '../../../../util/city.js'
  import _urlConfig from "../../../../util/urlConfig"
  import wxInit from "../../../../util/wxInit"

  export default{
    components: {
      "v-loading": loading
    },
    data () {
      return {
        productCode: this.$route.query.productCode,//产品编号
        linkStaffCode: this.$route.query.linkStaffCode || null,//导购编号
        skuCode:this.$route.query.skuCode,
        appEntranceType: this.$route.query.appEntranceType,//应用入口
        orderEntryCode: this.$route.query.orderEntryCode,//订单入口
        buyNum: this.$route.query.buyNum,
        xd_code: this.$route.query.xd_code,
        isBuying:false,
//        receiptInfoCode:this.$route.query.receiptInfoCode||'',
        receiptInfoCode:sessionStorage.getItem("receiptInfoCode")||'',
        productType: this.$route.query.productType||null,
        selectSize: {},
        haveDefault: false,
        productInfo: {
          productPicUrls:[]
        },
        orderInfo: {},
        productList: [],
        buyerMessage: '',
        defaultAddress: {},
        loading: false,
        addressListShow: false,
        addressInfo: {
          zone: ""
        },
        zoneInfo:'所在地区',
        shareInitContent:{},
        noAddressShow:false,

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
    watch: {
      addressInfo:function () {
        if(this.addressInfo.zone.length>0){
          this.zoneInfo='';
        }else {
          this.zoneInfo="所在地区";
        }
      }
    },
    methods: {
      inputBlur:function () {
        document.body.scrollTop=0;
      },
      textareaBlur:function (e) {
//        alert("scrollTop="+document.body.scrollTop);
        document.body.scrollTop=0;
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
      //初始化微信
      initWxConfig(){
        api.getSignMap("post",{url: location.href}).then(res => {
          let content = res.returnContent;
          window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: content.appId, // 必填，公众号的唯一标识
            timestamp: content.timestamp, // 必填，生成签名的时间戳
            nonceStr: content.nonceStr, // 必填，生成签名的随机串
            signature: content.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        });
      },
      //链接跳转
      routerLink(path){

        let src=path+"?skuCode="+ this.selectSize.skuCode+"&buyNum="+this.buyNum + "&productCode=" + this.productCode + "&linkStaffCode=" + (this.linkStaffCode || "") + "&appEntranceType=" + this.appEntranceType + "&orderEntryCode=" + this.orderEntryCode+"&xd_code="+this.xd_code+"&productType="+this.productType;
        this.$router.push({
          path: src
        })
      },
      //数量选择
      calcul: function (symbol) {
        if (symbol == '-' && this.buyNum > 1) {
          this.buyNum = --this.buyNum;
          this.confirmOrderInfo();
        } else if (symbol == '+' && !(this.selectSize.storeSum && this.selectSize.storeSum <= this.buyNum)) {
          this.buyNum = ++this.buyNum;
          this.confirmOrderInfo();
        }
      },
      //请求数据
      getProductInfo: function () {
          this.loading=true;
        eightHalfApi.getProductDetail("post", {
          productCode: this.productCode,
          linkStaffCode: this.linkStaffCode
        }, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.productInfo = res.returnContent;
            //取选中的规格
            if(res.returnContent.skuList.length>0){
              for(var item of res.returnContent.skuList){
                if(item.skuCode==this.skuCode){
                  this.selectSize=item;
                  //获取地址列表
                  this.getDeliveryAddress();
                  break;
                }
              }
            }else{
              this.loading=false;
            }


          } else {
              this.loading=false;
            this.$toast(res.message);
          }
        });
      },
      //购买
      buy: function () {
          if(!this.isBuying){
            this.isBuying=true;
            this.loading=true;
            let defaultAddress = this.defaultAddress;
            let orderInfo = this.orderInfo;
            if (JSON.stringify(defaultAddress) != "{}" && JSON.stringify(orderInfo) != "{}" && defaultAddress.receiptInfoCode) {
                this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0006",
                srcStaffCode:this.linkStaffCode||null,
                productCode:this.productCode||null,
                productType:this.productType||null
              });

              //支付
              eightHalfApi.commitOrder("post", {
                skuCode: this.orderInfo.skuCode,
                productSum: this.orderInfo.productSum,
                receiptInfoCode: this.defaultAddress.receiptInfoCode,
                payMode: 2,
                appEntranceType: 3,
                orderEntryCode: this.orderEntryCode,
                buyNote: this.buyerMessage || '',
                linkStaffCode: this.productInfo.linkStaffCode || null,
              }, this.tokenInfo.token).then((res) => {
                if (res.returnCode === '0') {
                  this.isBuying=false;
                  this.loading=false;
                  this.wxPay(res.returnContent);
                } else {
                  this.$toast(res.message);
                  this.isBuying=false;
                  this.loading=false;
                }
              });
            } else {
              this.$toast(" 您还没有收货地址，请点击填写");
              this.isBuying=false;
              this.loading=false;
            }
          }
      },
      //微信支付调起
      wxPay: function (data) {
        var _this = this;
        //微信调用
        if (data.envType === 1) {  //(1：测试 2:正式)
          _this.paySuccess(data);
          return;
        } else {
          window.wx.ready(function () {
            wx.chooseWXPay({
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              envType: data.envType,
              success: (callRes) => {
                _this.collect({
                  "xdCode": _this.xd_code,
                  "ydCode": "YD0007",
                  srcStaffCode:_this.linkStaffCode,
                  productCode:_this.productCode,
                  productType:_this.productType
                });
                _this.loading = false;
                _this.isBuying=false;
                _this.paySuccess(data);
              },
              fail: () => {
                _this.loading = false;
                _this.isBuying=false;
              },
              complete: () => {
              _this.loading = false;
              _this.isBuying=false;

              }
            });
          });
        }
      },
      //微信支付成功
      paySuccess: function (data) {
        var _this = this;
        // 支付成功后的回调函数
        eightHalfApi.confirmOrderPaid("get", {
          orderNum: data.orderNum
        }, _this.tokenInfo.token).then((res) => {
          if (res.returnCode == '0') {
            _this.loading = false;
            _this.isBuying=false;
            _this.routerLink("/activity_2018/eightHalf_paySuccess");
          } else {
            _this.$toast(res.message);
            _this.isBuying=false;
            _this.loading = false;
          }
        });
      },
      //确认购买订单信息
      confirmOrderInfo: function () {
        eightHalfApi.confirmOrderInfo("post", {
          skuCode: this.selectSize.skuCode,
          productSum: this.buyNum,
          receiptInfoCode: this.defaultAddress.receiptInfoCode
        }, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.orderInfo = res.returnContent;
            this.loading=false;
            var that=this;
            if(res.returnContent.shipping==0){
              that.noAddressShow=true;
              setTimeout(res=>{
                that.noAddressShow=false;
                this.routerLink('/activity_2018/eightHalf_Address');
              },3000);

            }
          } else {
            this.loading=false;
            this.$toast(res.message);
          }
        });
      },
      //获取地址列表
      getDeliveryAddress: function () {
        eightHalfApi.listDeliveryAddress("get", {productCode:this.productCode}, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.productList = res.returnContent;
              if (res.returnContent.length > 0) {
                this.haveDefault = true;
                for (var value of res.returnContent) {
                    if(this.receiptInfoCode.length>0){
                      if(this.receiptInfoCode==value.receiptInfoCode){
                        this.defaultAddress=value;
                        break;
                      }
                    }else {
                      if (value.isDefault == '1') {
                        this.defaultAddress = value;
                        break;
                      }
                    }
                }
                if (JSON.stringify(this.defaultAddress) == '{}') {
                  this.defaultAddress = res.returnContent[0];
                }
                this.confirmOrderInfo();
              } else {
                this.loading=false;
                this.haveDefault = false;
                this.addressListShow=true;
              }
          }
          else {
            this.loading=false;
            this.$toast(res.message);
          }
        })
        ;
      },
      sure: function () {
        if (!this.addressInfo.receipter||this.addressInfo.receipter.length < 2) {
          this.$toast("收货人输入有误！")
          return;
        }
        if (!this.addressInfo.connectTel||!/^1\d{10}$/.test(this.addressInfo.connectTel)) {
          this.$toast("手机号输入有误！")
          return;
        }
        if (!this.addressInfo.zone||this.addressInfo.zone.length < 2) {
          this.$toast("请选择地区")
          return;
        }
        if (!this.addressInfo.detailAddress||this.addressInfo.detailAddress.length < 5) {
          this.$toast("请输入准确地址")
          return;
        }
        let data;
        if(!this.addressInfo.isDefault){
          data = Object.assign(this.addressInfo, {isDefault: 0, isDeleted: 0});
        }else {
          data = Object.assign(this.addressInfo);
        }

        this.editRequest(data);
      },
      editRequest: function (data) {
        this.loading=true;
        eightHalfApi.editDeliveryAddress("post", data, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            this.addressListShow=false;
            this.addressInfo={zone: ""};
            this.loading=false;
            this.collect({
              "xdCode": this.xd_code,
              "ydCode": "YD0004",
              srcStaffCode:this.linkStaffCode||null,
              productCode:this.productCode||null,
              productType:this.productType||null
            });
            this.getDeliveryAddress();
          } else {
            this.loading=false;
            this.$toast(res.message);
          }
        });
      }

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

      //省市区选择
      new MultiPicker({
        input: 'multiPickerInput2',//点击触发插件的input框的id
        container: 'address-select2',//插件插入的容器id
        jsonData: $city,
        success: (arr) => {
          switch (arr.length) {
            case 1:
              this.addressInfo.zone = arr[0].v;
//              this.addressInfo.zone = arr[0].v + ',"",""';
              break
            case 2:
              this.addressInfo.zone = arr[0].v + ',' + arr[1].v ;
//              this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',""';
              break
            case 3:
              this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',' + arr[2].v;
//              this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',' + arr[2].v;
              break
          }
          if(this.addressInfo.zone.length>0){
            this.zoneInfo='';
          }else {
            this.zoneInfo="所在地区";
          }
        }//回调
      });
      this.getProductInfo();
    },
  }
</script>
