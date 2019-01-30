<template>
  <div class="double-boss-data">
    <activityHeader type="perpage" title="活动数据"></activityHeader>
    <div class="main-container">
      <div class="store-item">
        <img :src="storeList[curStoreIndex].storeLogoUrl||'' + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
        <div class="storeName">{{storeList[curStoreIndex].storeName||""}}</div>
        <div :class="'store-other ' +[showList?'store-other-select':'']" @click="showList=!showList">
          <label>查看其他门店</label></div>
        <div class="store-other-list" v-if="showList">
          <label v-for="(item,index) in storeList"  :class="curStoreIndex==index?'store-select':''" @click="storeSlect(item,index);">{{item.storeName}}</label>
        </div>
      </div>
      <div class="active">
        <h3 class="title">线下活动数据</h3>
        <div class="money-outer">
          <div class="money-title">累计充值金额</div>
          <div class="money-num">{{curduElevenActUnderData.rechargeMoney||0}}</div>
          <div class="money-unit">元</div>
        </div>
        <div class="table">
          <div class="td">
            <h3>充值会员（人）</h3>
            <p>{{curduElevenActUnderData.rechargeMemNum||0}}</p>
          </div>
          <div class="td">
            <h3>充值笔数（笔）</h3>
            <p>{{curduElevenActUnderData.rechargeSingularNum||0}}</p>
          </div>
          <div class="td">
            <h3>其中门店现金支付(元）</h3>
            <p>{{curduElevenActUnderData.rechargeCash||0}}</p>
          </div>
          <div class="td">
            <h3>商户账户收入(元）</h3>
            <p>{{curduElevenActUnderData.accountIncome||0}}</p>
          </div>
          <div class="td">
            <h3>获得线下奖励导购(人）</h3>
            <p>{{curduElevenActUnderData.dealStaffCount||0}}</p>
          </div>
          <div class="td">
            <h3>累计奖励金额(元）</h3>
            <p>{{curduElevenActUnderData.staffReward||0}}</p>
          </div>

        </div>
      </div>
      <div class="active">
        <h3 class="title">线上活动数据</h3>
        <div class="table">
          <div class="td">
            <h3>累计充值金额(元）</h3>
            <p>{{curduElevenActOnData.rechargeMoney||0}}</p>
          </div>
          <div class="td">
            <h3>充值笔数（笔）</h3>
            <p>{{curduElevenActOnData.rechargeSingularNum||0}}</p>
          </div>

          <div class="td">
            <h3>充值会员（人）</h3>
            <p>{{curduElevenActOnData.rechargeMemNum||0}}</p>
          </div>

          <div class="td">
            <h3>活动查看人数(人）</h3>
            <p>{{curduElevenActOnData.actViewUser||0}}</p>
          </div>

          <div class="td">
            <h3>获得线上奖励导购(人）</h3>
            <p>{{curduElevenActOnData.dealStaffCount||0}}</p>
          </div>
          <div class="td">
            <h3>累计奖励金额(元）</h3>
            <p>{{curduElevenActOnData.staffReward||0}}</p>
          </div>

        </div>
      </div>
      <div class="active active-data">
        <h3 class="title">导购获得奖励情况</h3>

        <table class="guid-table">
          <tr>
            <th> &nbsp;导购&nbsp;</th>
            <th>线下充值</th>
            <th>线上充值</th>
            <th>累计奖励</th>
            <th>转发查看数</th>
          </tr>
          <tr v-for="item in curduElevenActStaffData">
            <!--<div class="guid-td1"></div>-->
            <td>{{item.staffName}}</td>
            <td>{{item.underRechargeMoney}}</td>
            <td>{{item.onRechargeMoney}}</td>
            <td>{{item.staffReward}}</td>
            <td>{{item.staffShareCount}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
  import doubleApi from '../../../../fetch/double_api'
  import activityHeader from "@/components/common/activityHeader"
  export default{
    components: {
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token,
        type: this.$route.query.type,
        activityCode: "28bd0f3bd82611e8bc67704d7b87a020",
        showList: false,
        sel: {},
        storeList:[],
        storeListDate:[],
        curStoreIndex:0,
//        curStoreData:{},
        curduElevenActUnderData:{},
        curduElevenActOnData:{},
        curduElevenActStaffData:[],


      }
    },
    methods: {
      //获取门店列表
      getDuElevenActStoreForMerchant: function () {
        doubleApi.getDuElevenActStoreForMerchant("get", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if(res.returnCode==="0"){
            this.storeList = res.returnContent;
            this.getDuElevenActData(this.storeList[0],0);
          }else{
            this.$toast(res.message);
          }
        });
      },
      storeSlect:function (item,index) {
          this.curStoreIndex=index;
          this.showList=false;
        this.getDuElevenActData(item,index);
//          if(!this.storeListDate[index]){
//              this.getDuElevenActData(item,index);
//          }else {
////              this.curStoreData=this.storeListDate[index];
//              this.curduElevenActUnderData=this.storeListDate[index].duElevenActUnderData;
//              this.curduElevenActOnData=this.storeListDate[index].duElevenActOnData;
//              this.curduElevenActStaffData=this.storeListDate[index].duElevenActStaffData;
//          }
      },
      getDuElevenActData:function (item,index) {
        doubleApi.getDuElevenActData("get",{
          activityCode:this.activityCode,
          storeCode:item.storeCode
        },this.token).then((res)=>{
          if(res.returnCode==="0"){
//            this.curStoreData=res.returnContent;
            this.curduElevenActUnderData=res.returnContent.duElevenActUnderData;
            this.curduElevenActOnData=res.returnContent.duElevenActOnData;
            this.curduElevenActStaffData=res.returnContent.duElevenActStaffData;
            this.storeListDate[index]=res.returnContent;
          }else{
            this.$toast(res.message);
          }
        });
      }

    },
    mounted(){
        this.getDuElevenActStoreForMerchant();
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-boss-data {
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
      .active {
        text-align: left;
        background: #fff;
        margin-top: px2rem(20px);
        .title {
          font-size: px2rem(30px);
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: px2rem(60px);
          border-bottom: 1px solid #eee;
          padding: px2rem(27px) 0 px2rem(18px) px2rem(44px);
        }
        .money-outer {
          height: px2rem(93px);
          padding: 0 px2rem(54px) 0 px2rem(49px);
          .money-title {
            float: left;
            height: px2rem(93px);
            line-height: px2rem(93px);
            color: #333333;
            font-size: px2rem(24px);
          }
          .money-num {
            float: left;
            width: 65%;
            text-align: right;
            height: px2rem(93px);
            line-height: px2rem(93px);
            color: #F1472F;
            font-size: px2rem(36px);
          }
          .money-unit {
            float: right;
            height: px2rem(93px);
            line-height: px2rem(93px);
            color: #333333;
            font-size: px2rem(36px);
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
              color: #333333;
              font-size: px2rem(24px);
              margin: px2rem(35px) 0 px2rem(15px) px2rem(49px);
            }
            p {
              color: #999999;
              font-size: px2rem(36px);
              margin: px2rem(0px) 0 px2rem(0px) px2rem(49px);
            }
          }
        }
      }
      .active-data {
        table.guid-table {
          width: 100%;
          font-family: verdana, arial, sans-serif;
          font-size: px2rem(11px);
          color: #333333;
          /*border-width: px2rem(1px);*/
          border-color: #a9c6c9;
          border-collapse: collapse;
        }
        table.guid-table th {
          height: px2rem(82px);
          line-height: px2rem(82px);
          border-style: solid;
          border-color: #a9c6c9;
          color: #999999;
          font-size: px2rem(24px);
          border-bottom: px2rem(1px) solid #eee;
          text-align: center;
        }
        table.guid-table tr {
          height: px2rem(82px);
          height: px2rem(97px);
          border-bottom: px2rem(1px) solid #eee;
        }
        table.guid-table td {
          height: px2rem(82px);
          border-width: px2rem(0px);
          height: px2rem(97px);
          line-height: px2rem(97px);
          border-style: solid;
          border-color: #a9c6c9;
          color: #333333;
          font-size: px2rem(24px);
          text-align: center;
          vertical-align: middle;
        }
        .guid-td1 {
          width: px2rem(60px);
          height: px2rem(60px);
          background: rgba(241, 71, 47, 1);
          border-radius: 50%;
          margin: 0 auto;
        }
      }
    }
  }
</style>
