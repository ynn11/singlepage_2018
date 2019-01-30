<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  @import '/static/css/city-picker.css';

  .eight-half-address {
    position: relative;
    /*position: fixed;*/
    /*left:0;*/
    /*top:0;*/
    overflow: hidden;
    background-color: #EEEEEE;
    .main-container {
      position: relative;
      min-height: 100%;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      background: url("/static/images/activity/applet/eightHalf/bar.png") no-repeat;
      background-size: px2rem(750px) px2rem(4px);
      background-position: 0 0;
      /*background-color:#EEEEEE;*/
      .address-add {
        background-color: #fff;
        height: px2rem(119px);
        width: 100%;
      }
      .btn {
        float: right;
        margin: px2rem(30px) px2rem(30px) px2rem(30px) 0;
        height: px2rem(55px);
        line-height: px2rem(55px);
        padding: 0 px2rem(30px);
        color: #333333;
        border: 1px solid #D2D2D2;
        border-radius: px2rem(8px);
        font-size: px2rem(28px);
        background-color: #fff;
      }
      .red {
        color: #FF2074;
        border: 1px solid #FF2074;
      }
      .address-item {
        clear: both;
        background-color: #fff;
        margin-bottom: px2rem(30px);
        padding: px2rem(30px) px2rem(30px) 0;
        .address-name {
          color: #333333;
          font-size: px2rem(36px);
          span {
            float: right;
          }
        }
        .address-info {
          color: #999999;
          font-size: px2rem(28px);
          padding: px2rem(30px) 0;
          border-bottom: 1px solid #EEE;
          line-height: px2rem(30px);
        }
        .address-set-content {
          height: px2rem(111px);
          line-height: px2rem(111px);
          font-size: px2rem(28px);
        }
        .address-set {
          background: url("/static/images/activity/white_circle.png") left center no-repeat;
          background-size: px2rem(46px);
          padding-left: px2rem(60px);
          float: left;
        }
        .address-default {
          background: url("/static/images/activity/red_circle.png") left center no-repeat;
          background-size: px2rem(46px);
          padding-left: px2rem(60px);
          float: left;
        }

      }
      .noaddress-item{
        opacity: 0.5;
      }

    }
    .popWindow {
      position: absolute;
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
  <div class="eight-half-address">
    <div class="main-container">
      <div class="address-add">
        <div class="btn red" @click="this.addressInfo={zone:''};addressListShow=true;">新增地址</div>
      </div>
      <div :class="'address-item '+[item.shipping==0?'noaddress-item':'']" v-for="(item,index) in productList" @click="selectThisItem(item,$event)">
        <div class="address-name">{{item.receipter}}<span>{{item.connectTel}}</span></div>
        <h3 class="address-info">{{item.zone}}{{item.detailAddress}}</h3>
        <div class="address-set-content">
          <div :class="'address-set '+[curIndex==index?'address-default':'']" @click="setDefaultAddress(item,index,$event);">设为默认地址</div>
          <div class="btn" @click="deleteAddress(item,$event);">删除</div>
          <div class="btn" @click="editAddress(item,$event);">编辑</div>
        </div>
      </div>
    </div>
    <!-- 添加地址 -->
    <div class="addressList popWindow" v-if="addressListShow">
      <div class="mask"></div>
      <div class="addressList-contain pop-contain">
        <img class="close" src="/static/images/close.png" @click="addressListShow=false;">
        <h3 class="title">添加地址</h3>
        <input class="address-input" placeholder="收货人" ref="my-input" v-model="addressInfo.receipter" @blur="inputBlur">
        <input class="address-input" placeholder="手机号" ref="my-input" v-model="addressInfo.connectTel">
        <div class="address-input address-area-content" ><div class="address-area"  tabindex="1">{{zoneInfo}}{{addressInfo.zone}}</div><i class="iconfont icon-qianjin"></i><div id="multiPickerInput" class="multiPickerInput" @click="myBlur"></div></div>
        <!--<p class="tip">请填写详细街道地址</p>-->
        <textarea contenteditable="true" class="address-detail" ref="my-input" placeholder="请填写详细街道地址" v-model="addressInfo.detailAddress" @blur="textareaBlur"></textarea>
        <div class="btn" @click="sure">确定</div>
      </div>
    </div>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
    <div id="address-select" tabindex="1">

    </div>
    <div class="popWindow noAddress" v-if="noAddressShow">
      该地址暂时无法发货，请重新<br/>选择/添加新地址。
    </div>
  </div>

</template>

<script>
  import eightHalfApi from "../../../../fetch/eightHalf"
  require('../../../../util/city-picker.js')
  import $city from '../../../../util/city.js'
  import _urlConfig from "../../../../util/urlConfig"
  import loading from '@/components/common/loading'
  import wxInit from "../../../../util/wxInit"
  export default{
    components: {
      "v-loading": loading
    },
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
        addressListShow: false,
        addressInfo: {
          zone: ""
        },
        zoneInfo:'所在地区',
        curIndex:-1,
        loading: false,
        productList: [],
        defaultAddress: {},
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
      curIndex:function(){
          var productList=this.productList;
          var curIndex=this.curIndex;
          for(var item in productList){
              if(item==curIndex){
                productList[item].isDefault=1;
              }else {
                productList[item].isDefault=0;
              }
          }
          this.productList=productList;
      },
      addressInfo:function () {
        if(this.addressInfo.zone.length>0){
            this.zoneInfo='';
        }else {
            this.zoneInfo="所在地区";
        }
      }
    },
    methods: {
      //数据收集
      collect(data, token){
        if (token) {
          eightHalfApi.collectData("post", data, token).then(res => {});
        } else {
          eightHalfApi.collectData("post", data, this.tokenInfo.token).then(res => {});
        }
      },
      textareaBlur:function (e) {
//        alert("scrollTop="+document.body.scrollTop);
        document.body.scrollTop=0;
      },
      myBlur:function () {
        window.blur();
      },
      inputBlur:function () {
        console.log("bbb");
      },
      pickerBlur:function () {
        console.log("aaaa");
      },
      toggleMenu(e) {
        this.isMenuActive = !this.isMenuActive
        console.log('event', e)
      },
      //获取地址列表
      getDeliveryAddress: function () {
          this.loading=true;
        eightHalfApi.listDeliveryAddress("get", {
          productCode:this.productCode
        }, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            var productList=res.returnContent;

            this.productList = productList;

            if (res.returnContent.length > 0) {
              for (var i=0;i<productList.length;i++) {
                if (productList[i].isDefault == '1') {
                  this.defaultAddress = productList[i];
                  this.curIndex=i;
                }
              }
              if (JSON.stringify(this.defaultAddress) == '{}') {
                this.defaultAddress = res.returnContent[0];
              }

            }
            this.loading=false;
          }
          else {
            this.loading=false;
            this.$toast(res.message);
          }
        });
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

        this.editRequest(data,"add");
      },
      selectThisItem:function (item,e) {
        e.preventDefault();
        if(item.shipping!=0){
          sessionStorage.setItem("receiptInfoCode",item.receiptInfoCode);
          this.$router.back();
        }else {
          var that=this;
          that.noAddressShow=true;
          setTimeout(()=>{
            that.noAddressShow=false;
          },3000);
        }
      },
      setDefaultAddress: function (item,index,e) {
        e.stopPropagation();
        if(this.curIndex!=index&&item.shipping!=0){
          let data = Object.assign(item, {isDefault: 1, isDeleted: 0});
          this.editRequest(data,"setDefault",index);
        }
        else if(item.shipping==0){
          var that=this;
          that.noAddressShow=true;
          setTimeout(()=>{
            that.noAddressShow=false;
          },3000);
        }
      },

      deleteAddress: function (item,e) {
        e.stopPropagation();
        if(item.shipping!=0){
          let data = Object.assign(item, {isDefault: 0, isDeleted: 1});
          this.editRequest(data);
        }
        else {
          var that=this;
          that.noAddressShow=true;
          setTimeout(()=>{
            that.noAddressShow=false;
          },3000);
        }

      },
      editAddress: function (item,e) {
        e.stopPropagation();
        if(item.shipping!=0){

          this.addressListShow=true;
          this.addressInfo = JSON.parse(JSON.stringify(item));
        }
        else {
          var that=this;
          that.noAddressShow=true;
          setTimeout(()=>{
            that.noAddressShow=false;
          },3000);
        }
      },

      editRequest: function (data,params,index) {
        this.loading=true;
        eightHalfApi.editDeliveryAddress("post", data, this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
              this.addressListShow=false;
              this.addressInfo={zone: ""};
            this.loading=false;
              if(params=="setDefault"){
                this.curIndex=index;
                  return;
              }else if(params=="add"){
                this.collect({
                  "xdCode": this.xd_code,
                  "ydCode": "YD0004",
                  srcStaffCode:this.linkStaffCode||null,
                  productCode:this.productCode||null,
                  productType:this.productType||null
                });
              }
            this.curIndex=0;
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
      this.picker=new MultiPicker({
        input: 'multiPickerInput',//点击触发插件的input框的id
        container: 'address-select',//插件插入的容器id
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
      //请求列表
      this.getDeliveryAddress();
    }
  }
</script>
