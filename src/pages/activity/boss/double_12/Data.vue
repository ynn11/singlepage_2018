<template>
  <div class="double-12-boss-data">
    <activityHeader type="perpage" title="年末送礼冲业绩"></activityHeader>
    <div class="main-container">
      <div class="store-item" v-if="storeList.length>0">
        <img :src="storeList[curStoreIndex].storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
        <div class="storeName">{{storeList[curStoreIndex].storeName||""}}</div>
        <div :class="'store-other ' +[showList?'store-other-select':'']" @click="showList=!showList">
          <label>查看其他门店</label></div>
        <div class="store-other-list" v-if="showList">
          <label v-for="(item,index) in storeList"  :class="curStoreIndex==index?'store-select':''" @click="storeSlect(item,index);">{{item.storeName}}</label>
        </div>
      </div>
      <div class="money-all2">
        <div class="money-all">
          <div class="money-title">门店营业额</div>
          <div class="money-num">{{storeListDate.income}}</div>
          <div class="money-unit">元</div>
        </div>
      </div>
      <div class="product-outer" v-if="storeListDate.goodsExchangeCountList&&storeListDate.goodsExchangeCountList.length>0">
      <div class="product" v-for="item in storeListDate.goodsExchangeCountList">
        <img :src="item.goodsPicUrl+ '?imageView2/1/w/100/h/100/interlace/1/q/100'"/>
        <h3>{{item.goodsName}}</h3>
        <div>已兑换<span>{{item.exchangeCount}}</span>件</div>
      </div>
      </div>
      <div class="active">
        <div class="title">线上锁销</div>
        <div class="table">
          <div class="td">
            <h3>礼包累计售出</h3>
            <p>{{storeListDate.saleCouponCount}}</p>
          </div>
          <div class="td">
            <h3>已使用的代金券</h3>
            <p>{{storeListDate.usedCouponCount}}</p>
          </div>
          <div class="td">
            <h3>线下累计支付(元）</h3>
            <p>{{storeListDate.underPayMoney}}</p>
          </div>
          <div class="td">
            <h3>线上累计支付(元）</h3>
            <p>{{storeListDate.onPayMoney}}</p>
          </div>
          <div class="td">
            <h3>锁销礼品已领取</h3>
            <p>{{storeListDate.receiveCount}}</p>
          </div>
          <div class="td">
            <h3>锁销礼品待领取</h3>
            <p>{{storeListDate.notReceiveCount}}</p>
          </div>
          <div class="td">
            <h3>获得导购奖励(人)</h3>
            <p>{{storeListDate.rewardStaffCount}}</p>
          </div>
          <div class="td">
            <h3>奖励金额(元)</h3>
            <p>{{storeListDate.rewardStaffMoney}}</p>
          </div>


        </div>
      </div>
      <div class="active">
        <h3 class="title">节后送券</h3>
        <div class="table">
          <div class="td">
            <h3>累计发券</h3>
            <p>{{storeListDate.blessingCouponCount}}</p>
          </div>
          <div class="td">
            <h3>已使用</h3>
            <p>{{storeListDate.usedBlessCouponCount}}</p>
          </div>
        </div>

          <div class="money-outer">
            <div class="money-title">身边店累计收银业绩</div>
            <div class="money-num">{{storeListDate.lbIncome}}</div>
            <div class="money-unit">元</div>
          </div>

      </div>

    </div>
  </div>
</template>


<script>
  import double12Api from '../../../../fetch/double_12_api'
  import activityHeader from "@/components/common/activityHeader"
  export default{
    components: {
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        storeList:[],
        storeListDate:{},
        showList:false,
        curStoreIndex:0,

      }
    },
    methods: {
      //获取门店列表
      listGnjActStoreByMerchantCode: function () {
        double12Api.listGnjActStoreByMerchantCode("get", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if(res.returnCode==="0"){
          this.storeList = res.returnContent;
          if(this.storeList.length>0){
            this.getGnjActData(this.storeList[0],0);
          }
        }else{
          this.$toast(res.message);
        }
      });
      },
      storeSlect:function (item,index) {
          this.curStoreIndex=index;
        this.showList=false;
        this.getGnjActData(item,index);
      },
      getGnjActData:function (item,index) {
        double12Api.getGnjActData("get",{
          activityCode:this.activityCode,
          storeCode:item.storeCode
        },this.token).then((res)=>{
          if(res.returnCode==="0"){
            this.storeListDate=res.returnContent;
          }else{
            this.$toast(res.message);
          }
        });
      }

    },
    mounted(){
        this.listGnjActStoreByMerchantCode();
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-12-boss-data {
    position: relative;
    height: 101%;
    .main-container {
      position: relative;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      background-color: #eee;
      text-align: center;
      padding-top: px2rem(80px);
      padding-bottom: px2rem(82px);
      .store-item {
        position: relative;
        height: px2rem(122px);
        padding: px2rem(30px) px2rem(40px);
        background-color: #FFFFFF;
        .storeLogo {
          float: left;
          width: px2rem(122px);
          height: px2rem(122px);
          /*margin: px2rem(25px) px2rem(25px) px2rem(25px) px2rem(25px);*/
          /*border: 1px solid #eee;*/
          margin-right: px2rem(25px);
        }
        .storeName {
          float: left;
          width: px2rem(240px);
          /*height: px2rem(70px);*/
          height: px2rem(122px);
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          font-weight: 600;
          font-size: px2rem(30px);
          line-height: px2rem(30px);
          color: #333;
          display: flex;
          align-items: center;
        }
        .store-other {
          position: absolute;
          right: px2rem(42px);
          top: px2rem(60px);
          width: px2rem(225px);
          height: px2rem(58px);
          border: 1px solid rgba(220, 220, 220, 1);
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          text-align: left;
          label {
            color: rgba(0, 0, 0, 1);
            display: inline-block;
            padding-left: px2rem(17px);
            line-height: px2rem(58px);
            position: relative;
            font-size: px2rem(24px);
            font-weight: 500;
            text-align: left;
          }
          label::after {
            position: absolute;
            right: px2rem(-30px);
            width: px2rem(17px);
            height: px2rem(10px);
            margin-top: px2rem(24px);
            content: "";
            background: url("/static/images/activity/down_grey.png") center no-repeat;
            background-size: 100%;
          }

        }
        .store-other-select label:after {
          position: absolute;
          right: px2rem(-30px);
          width: px2rem(17px);
          height: px2rem(10px);
          margin-top: px2rem(24px);
          content: "";
          background: url("/static/images/activity/up_grey.png") center no-repeat;
          background-size: 100%;
        }
        .store-other-list {
          position: absolute;
          right: px2rem(42px);
          top: px2rem(118px);
          width: px2rem(225px);
          border: 1px solid rgba(220, 220, 220, 1);
          border-top: none;
          border-bottom: none;
          background-color: #fff;
          label {
            width: px2rem(208px);
            height: px2rem(58px);
            line-height: px2rem(58px);
            color: rgba(0, 0, 0, 1);
            display: inline-block;
            padding-left: px2rem(17px);
            position: relative;
            font-weight: 500;
            text-align: left;
            border-bottom: 1px solid rgba(220, 220, 220, 1);
          }
          .store-select{
            background-color: #eee;
          }
        }
      }
      .money-all2{
        height: px2rem(86px);
        background-color: #fff;
        border-bottom: 1px solid #eee;
        padding-top: px2rem(33px);
        margin-top: px2rem(20px);
        .money-all{
          font-size: px2rem(36px);
          font-weight: 600;
          color:#333;
          height: px2rem(49px);
          line-height: px2rem(49px);
          margin: 0 0 px2rem(33px);
          padding: 0 px2rem(43px);
          border-left:px2rem(10px) solid #333;
          .money-title {
            float: left;
            height: px2rem(49px);
            line-height: px2rem(49px);
            color: #333;
            font-weight: 600;
            font-size: px2rem(36px);
          }
          .money-num {
            float: left;
            width: 64%;
            text-align: right;
            height: px2rem(49px);
            line-height: px2rem(49px);
            color: #FF6853;
            font-size: px2rem(36px);
          }
          .money-unit {
            float: right;
            height: px2rem(49px);
            line-height: px2rem(49px);
            color: #333333;
            font-size: px2rem(24px);
          }
        }
      }
      .product-outer{
        /*height:px2rem(134px);*/
        background-color: #fff;
        .product{
          margin: 0 px2rem(52px);
          border-bottom: 1px solid #eee;
          padding: px2rem(26px) 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img{
            width: px2rem(82px);
            height: px2rem(82px);
          }
          h3{
            width: 55%;
            color:#333333;
            text-align: left;
            font-size: px2rem(30px);
          }
          div{
            color: #333;
            font-size: px2rem(24px);
            span{
              color:#FF6853;
            }
          }
        }
      }
      .active {
        text-align: left;
        background: #fff;
        margin-top: px2rem(20px);
        padding-top: px2rem(33px);
        .title{
          font-size: px2rem(36px);
          font-weight: 600;
          color:#333;
          height: px2rem(49px);
          line-height: px2rem(49px);
          margin: 0 0 px2rem(33px);
          padding: 0 px2rem(43px);
          border-left:px2rem(10px) solid #333;
        }
        .money-outer {
          height: px2rem(99px);
          padding: 0 px2rem(54px) 0 px2rem(49px);
          border-top:1px solid #eee;
          .money-title {
            float: left;
            height: px2rem(99px);
            line-height: px2rem(99px);
            color: #999;
            font-size: px2rem(24px);
          }
          .money-num {
            float: left;
            width: 55%;
            text-align: right;
            height: px2rem(99px);
            line-height: px2rem(99px);
            color: #FF6853;
            font-size: px2rem(36px);
          }
          .money-unit {
            float: right;
            height: px2rem(99px);
            line-height: px2rem(99px);
            color: #333333;
            font-size: px2rem(24px);
          }
        }
        .table {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .td {
            width: 50%;
            height: px2rem(134px);
            vertical-align: middle;
            border-right: 1px solid #eee;
            display: flex;
            border-top: 1px solid #eee;
            /*align-items: center;*/
            /*justify-content: center;*/
            flex-direction: column;
            box-sizing: border-box;
            text-align: left;
            h3 {
              color: #999;
              font-size: px2rem(24px);
              margin: px2rem(35px) 0 px2rem(15px) px2rem(49px);
            }
            p {
              color: #333;
              font-size: px2rem(36px);
              font-weight: 600;
              margin: px2rem(0px) 0 px2rem(0px) px2rem(49px);
            }
          }
        }
      }
    }
  }
</style>
