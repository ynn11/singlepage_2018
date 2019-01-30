<template>
  <div class="double-12-guide-elecEquipVerif">
    <activityHeader type="perpage" title="年末送礼冲业绩"></activityHeader>
    <div class="main-container">
      <div class="list-content">
        <div class="list-item">
          <div class="name">{{memberInfo.trueName}}<br/>{{memberInfo.mobileNum}}</div>
          <div class="money">实际付款<br/><span>{{memberInfo.totalOrderMoney}}</span></div>
        </div>
      </div>
      <h3 class="tip1">可兑换商品</h3>
      <div class="product-content">
        <div v-for="(item,index) in memberInfo.productList"
             :class="'product-item '+[item.fullMoney>memberInfo.totalOrderMoney?'product-unuse ':' '] +[index==curIndex?'product-select':'']"
             @click="selectElecEquip(item,index)">
          <img class="logo" :src="item.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
          <div class="info">
            <h3>{{item.goodsName}}</h3>
            <p>零售价 {{item.salePrice}} 元</p>
          </div>
          <img class="icon"
               :src="curIndex==index?'/static/images/activity/guide/double_12/select.png':'/static/images/activity/guide/double_12/unselect.png'"/>
        </div>
        <!--<div class="product-item">-->
        <!--<img class="logo" src="/static/images/activity/close_red.png"/>-->
        <!--<div class="info">-->
        <!--<h3>华光增压便携式手持挂烫机</h3>-->
        <!--<p>零售价 99.2 元</p>-->
        <!--</div>-->
        <!--<img class="icon" src="/static/images/activity/guide/double_12/unselect.png"/>-->
        <!--</div>-->
        <!--<div class="product-item product-unuse">-->
        <!--<img class="logo" src="/static/images/activity/close_red.png"/>-->
        <!--<div class="info">-->
        <!--<h3>华光增压便携式手持挂烫机</h3>-->
        <!--<p>零售价 99.2 元</p>-->
        <!--</div>-->
        <!--<div class="tip">消费未达标</div>-->
        <!--</div>-->

      </div>
      <div class="btn" @click="addressListShow=true;">确认核销</div>
    </div>
    <!-- 添加地址 -->
    <div class="addressList popWindow" v-if="addressListShow">
      <div class="mask"></div>
      <div class="addressList-contain pop-contain">
        <img class="close" src="/static/images/close.png" @click="addressListShow=false;">
        <h3 class="title">添加地址</h3>
        <input class="address-input" placeholder="收货人" ref="my-input" v-model="addressInfo.receipter">
        <input class="address-input" placeholder="手机号" ref="my-input" v-model="addressInfo.connectTel">
        <div class="address-input address-area-content">
          <div class="address-area" tabindex="1">{{zoneInfo}}{{addressInfo.zone}}</div>
          <i class="iconfont icon-qianjin"></i>
          <div id="multiPickerInput" class="multiPickerInput"></div>
        </div>
        <!--<p class="tip">请填写详细街道地址</p>-->
        <textarea contenteditable="true" class="address-detail" ref="my-input" placeholder="请填写详细街道地址"
                  v-model="addressInfo.detailAddress" @blur="textareaBlur"></textarea>
        <div class="btn" @click="sure">确定</div>
      </div>
    </div>

    <!-- 兑换成功 -->
    <div class="popWindow" v-if="exchangeSuccessShow">
      <div class="mask"></div>
      <img class="close" @click="goIndex" src="/static/images/close.png"/>
      <div class="exchange-success-contain pop-contain">
        <h3>兑换成功</h3>
        <p class="tip1">礼品将快递至客户填写的地址</p>
        <img src="/static/images/qrcode.jpg"/>
        <p class="tip2"> 请提示会员关注公众号<br/>
          获取礼品物流信息</p>
      </div>
    </div>


    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
    <div id="address-select" tabindex="1">

    </div>
  </div>
</template>

<script>
  import api from '../../../../fetch/api'
  require('../../../../util/city-picker.js')
  import $city from '../../../../util/city.js'
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
        type: this.$route.query.type,
        memberCode: this.$route.query.memberCode,
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        memberInfo: {},
        loading: false,
        curIndex: -1,
        addressListShow: false,
        addressInfo: {
          zone: ""
        },
        zoneInfo: '所在地区',
        exchangeSuccessShow: false,
        QrCodeUrl:'',
      }
    },
    methods: {
        goIndex(){
          this.exchangeSuccessShow=false;
          this.routerLink("/activity_2018/double_12_guide_index");
        },
      //跳转
      routerLink(path){
        let src = path + "?token=" + this.token + "&type=" + this.type
        this.$router.push({
          path: src
        })
      },
      //数据收集
      collect: function (data) {
        api.collectStatisticsOnActivitiesByStaff("post", data, this.token).then(res => {
          console.log(res);
        });
      },
      textareaBlur: function (e) {
//        alert("scrollTop="+document.body.scrollTop);
        document.body.scrollTop = 0;
      },
      sure: function () {
        if (!this.addressInfo.receipter || this.addressInfo.receipter.length < 2) {
          this.$toast("收货人输入有误！")
          return;
        }
        if (!this.addressInfo.connectTel || !/^1\d{10}$/.test(this.addressInfo.connectTel)) {
          this.$toast("手机号输入有误！")
          return;
        }
        if (!this.addressInfo.zone || this.addressInfo.zone.length < 2) {
          this.$toast("请选择地区")
          return;
        }
        if (!this.addressInfo.detailAddress || this.addressInfo.detailAddress.length < 5) {
          this.$toast("请输入准确地址")
          return;
        }

        this.addressListShow=false;
        this.sureVerif();
      },
      getOrderInfoEditByStaff: function () {
        double12Api.activityOrderInfoEditByStaff("post", {
          activityCode: this.activityCode,
          memberCode: this.memberCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.memberInfo = res.returnContent;
          } else {
            alert(res.message);
          }
        });
      },
      selectElecEquip(item, index) {
          if(item.fullMoney<=this.memberInfo.totalOrderMoney){
            this.curIndex = index;
          }
      },
      sureVerif(){
        if (this.curIndex <= -1) {
          alert("请选择可兑换商品");
        }
        var _this=this;
        var item = this.memberInfo.productList[this.curIndex];
        double12Api.activityOrderInfoConfirmByStaff("post", {
          activityCode: this.activityCode,
          memberCode: this.memberCode,
          goodsCode: item.goodsCode,
          receipter: this.addressInfo.receipter,
          connectTel: this.addressInfo.connectTel,
          zone: this.addressInfo.zone,
          detailAddress: this.addressInfo.detailAddress,
        }, this.token).then((res) => {
          if (res.returnCode === "0") {

            _this.exchangeSuccessShow=true;
//            double12Api.activityQrCodeByStaff("post",{
//              activityCode:_this.activityCode
//            },this.token).then(res=>{
//              if (res.returnCode === "0") {
//                _this.QrCodeUrl=res.returnContent;
//
//              }else {
//                alert(res.message);
//              }
//            });

          }
          else {
            alert(res.message);
          }
        });

      }
    },
    mounted(){
      //省市区选择
      this.picker = new MultiPicker({
        input: 'multiPickerInput',//点击触发插件的input框的id
        container: 'address-select',//插件插入的容器id
        jsonData: $city,
        success: (arr) => {
          switch (arr.length) {
            case 1:
              this.addressInfo.zone = arr[0].v;
//              this.addressInfo.zone = arr[0].v + ',"",""';
              break;
            case 2:
              this.addressInfo.zone = arr[0].v + ',' + arr[1].v;
//              this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',""';
              break;
            case 3:
              this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',' + arr[2].v;
//              this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',' + arr[2].v;
              break;
          }
          if (this.addressInfo.zone.length > 0) {
            this.zoneInfo = '';
          } else {
            this.zoneInfo = "所在地区";
          }
        }//回调
      });

      this.getOrderInfoEditByStaff();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  @import '/static/css/city-picker.css';

  .double-12-guide-elecEquipVerif {
    .main-container {
      position: relative;
      min-height: 91%;
      background-color: #12013A;
      text-align: center;
      padding: px2rem(80px) 0 px2rem(220px);
      .list-content {
        width: 100%;
        background-color: #fff;
        .list-item {
          height: px2rem(112px);
          padding: 0 px2rem(43px);
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            color: #333333;
            font-size: px2rem(28px);
            line-height: px2rem(40px);
            text-align: left;
            flex: 2;
          }
          .money {
            color: #999999;
            font-size: px2rem(24px);
            line-height: px2rem(40px);
            text-align: right;
            margin-right: px2rem(27px);
            flex: 2;
            span {
              color: #FF6B30;
              font-size: px2rem(30px);
            }
          }
        }
      }
      .tip1 {
        color: #FBBD01;
        font-size: px2rem(36px);
        margin: px2rem(49px) px2rem(66px) px2rem(33px);
        text-align: left;
      }
      .product-content {
        margin: 0 px2rem(56px);
        z-index: 1;
        .product-item {
          margin-bottom: px2rem(18px);
          background-color: #240261;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: px2rem(22px) px2rem(22px) px2rem(17px);
          .logo {
            width: px2rem(145px);
            height: px2rem(147px);
          }
          .info {
            width: 50%;
            min-height: px2rem(80px);
            color: #fff;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: space-between;
            font-size: px2rem(24px);
            text-align: left;
          }
          .icon {
            margin-left: px2rem(73px);
            width: px2rem(47px);
            height: px2rem(47px);
          }
          .tip {
            color: #FBBD01;
            font-size: px2rem(24px);
          }
        }
        .product-unuse {
          opacity: 0.5;
        }
      }
      .btn {
        position: fixed;
        left: 50%;
        bottom: px2rem(100px);
        transform: translateX(-50%);
        width: px2rem(540px);
        height: px2rem(90px);
        line-height: px2rem(90px);
        text-align: center;
        background: rgba(255, 232, 1, 1);
        box-shadow: 0px 5px 6px 1px rgba(255, 232, 1, 0.31), 0px 0px 40px 0px rgba(241, 165, 0, 1);
        border-radius: px2rem(45px);
        color: #7E26F9;
        font-size: px2rem(36px);
        z-index: 2;
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
      .close{
        position: absolute;
        left: 80%;
        top: 14%;
        width: px2rem(50px);
        height: px2rem(50px);
        z-index: 999;
      }
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
          padding: px2rem(30px) px2rem(10px);
          color: #333;
          border-bottom: 1px solid #EEEEEE;
          margin: 0 auto;
          display: block;

        }
        .address-input::-webkit-input-placeholder {
          color: #999999;
        }
        .address-area-content {
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
          .multiPickerInput {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
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
        .address-detail::-webkit-input-placeholder {
          color: #999;
        }
        .btn {
          width: px2rem(579px);
          height: px2rem(100px);
          line-height: px2rem(100px);
          background: #240261;
          border-radius: px2rem(8px);
          color: #fff;
          font-size: px2rem(40px);
          text-align: center;
          margin: px2rem(68px) auto 0;
          display: block;
        }
      }

      /*兑换成功*/
      .exchange-success-contain {
        width: px2rem(449px);
        height: px2rem(491px);
        background: url("/static/images/activity/guide/double_12/exchange_success.png") no-repeat;
        background-position: center 10%;
        background-size: px2rem(390px) px2rem(248px);
        background-color: #fff;
        border-radius: px2rem(10px);
        text-align: center;
        h3 {
          color: #FF6B30;
          font-size: px2rem(40px);
          margin: px2rem(33px) auto;
        }
        .tip1 {
          color: #333333;
          font-size: px2rem(24px);

        }
        img {
          width: px2rem(210px);
          height: px2rem(210px);
          border-radius: px2rem(10px);
          margin: px2rem(39px) auto;
        }
        .tip2 {
          color: #FF6E5A;
          font-size: px2rem(24px);
          line-height: px2rem(30px);
        }
      }

    }

  }
</style>


