<template>
  <div class="double-boss-set">
    <activityHeader type="perpage" title="活动设置"></activityHeader>
    <div class="main-container">
      <h3 class="tip-title">提示:</h3>
      <p class="tip-content">请在11月4日24点前完成参与活动门店的所有设置。活动开启后，即11月5日起，活动设置不可更改。</p>
      <div class="store-select" v-if="actBeginStatus!==1">
        <h3 class="title">活动设置</h3>
        <p class="store-title">未参与活动的门店</p>
        <div class="store-list" v-if="notJoinedStoreList.length>0">
          <div class="store-item bottom-line" v-for="item in notJoinedStoreList">
            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
            <div class="storeName">{{item.storeName}}</div>
            <div class="join-btn btn" @click="joinAct(item)">参与活动</div>
          </div>
        </div>
        <div class="noList" v-else>没有未参与活动的门店</div>

        <p class="store-title">参与活动的门店</p>
        <div class="store-list" v-if="joinedStoreList.length>0">
          <div class="store-item bottom-line" v-for="item in joinedStoreList">
            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
            <div class="storeName">{{item.storeName}}</div>
            <div class="join-btn btn cancell-btn" @click="joinAct(item)">取消参与活动</div>
          </div>
        </div>
        <div class="noList" v-else>没有参与活动的门店</div>
      </div>

      <h3 class="title">参与活动门店设置</h3>
      <div class="store-list store-list-outer" v-if="joinedStoreList.length>0">
        <div class="store-item-outer" v-for="item in joinedStoreList">
          <div class="store-item bottom-line2">
            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
            <div class="storeName">{{item.storeName}}</div>
            <div class="join-btn btn edit-btn" @click="getStoreSet(item)"
                 v-if="actBeginStatus!==1&&item.unlStaffBonus.toString()!=''">修改
            </div>
            <div class="join-btn btn set-btn" @click="getStoreSet(item)"
                 v-else-if="actBeginStatus!==1&&item.unlStaffBonus.toString()===''">设置
            </div>
          </div>
          <div class="store-info" v-if="item.unlStaffBonus.toString()!=''">
            <p class="store-info-line">线下充值：充值导购奖励{{item.unlStaffBonus}}元，</p>
            <p class="store-info-line">线上充值：每300元得{{item.onlPerGainMoney}}元，活动导购奖励{{item.onlStaffBonus}}元。</p>
          </div>
          <div class="store-info" v-else>
            <p class="store-info-line">未设置</p>
          </div>
        </div>

      </div>
      <div class="noList" v-else>没有参与活动的门店</div>
    </div>

    <div class="storeSetting-contain popWindow" v-if="showStoreSetting">
      <div class="mask"></div>
      <div class="setting-contain pop-contain">
        <div class="head">
          <div class="title">活动设置</div>
          <img src="/static/images/activity/close_gray_new.png" class="close" @click="close">
        </div>
        <div class="content">
          <h3>线下充值</h3>
          <p>会员充值每{{sel.unlPerScoreMoney}}元奖励1个积分，{{sel.unlBeginRechargeMoney}}元起充，每成功充值一位会员，<span>奖励充值导购</span></p>
          <div class="input-outer">
            <input type="number" placeholder="输入奖励金额" v-model="sel.unlStaffBonus">
            <div class="unit">元</div>
          </div>
          <h3>线上充值</h3>
          <p>会员充值每300元获得{{sel.onlPerGainMoney}}元，奖励{{sel.onlPerGainScore}}个积分，每一位会员成功充值，<span>奖励转发活动导购</span></p>
          <div class="input-outer">
            <input type="number" placeholder="输入奖励金额" v-model="sel.onlStaffBonus">
            <div class="unit">元</div>
          </div>
        </div>
        <div class="confirm-btn" @click="confirmSetting">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as _tool from "../../../../util/tool"
  import doubleApi from '../../../../fetch/double_api'
  import activityHeader from "@/components/common/activityHeader"

  export default{
    components: {
      activityHeader
    },
    data() {
      return {
        token: this.$route.query.token,
        type: this.$route.query.type,
        activityCode:"28bd0f3bd82611e8bc67704d7b87a020",
        productInfo: [],
        notJoinedStoreList: [],
        joinedStoreList: [],
        actBeginStatus: 0,
        sites: [
          {name: 'Runoob'},
          {name: 'Google'},
          {name: 'Taobao'}
        ],
        showStoreSetting: false,
        sel: {
          unlStaffBonus: '',
          onlStaffBonus: ''
        },
        isRequest:false,

      }
    },
    methods: {
      //获取活动参与门店信息
      getDuElevenActStoreInfoByCond(){
        doubleApi.getDuElevenActStoreInfoByCond("get", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
            console.log(res);
//            console.log(JSON.stringify(res));
          if(res.returnCode==="0"){
            this.notJoinedStoreList = res.returnContent.notJoinedDuelevenActStoreInfoList;
            this.joinedStoreList = res.returnContent.joinedDuelevenActStoreInfoList;
            this.actBeginStatus = res.returnContent.actBeginStatus;
          } else {
            this.$toast(res.message);
          }
        })
      },
      //设置参与
      joinAct(item){
        if (this.isRequest) {
          return;
        }
        this.isRequest=true;
        doubleApi.updateDuelevenActStoreIsPartakeStatus("post", {
          activityCode: this.activityCode,
          storeCode: item.storeCode,
          id: item.id,
          isPartakeStatus: item.isPartake === 0 ? 1 : 0
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            if (item.isPartake === 0) {
              this.showStoreSetting = true;
              this.sel=res.returnContent;
            }
            this.getDuElevenActStoreInfoByCond();
          } else {
            this.$toast(res.message);
          }
          this.isRequest=false;
        })
      },
      //门店设置
      getStoreSet(item){
        this.sel = item;
//        this.settingStore = item.id;
//        this.couponPrice = item.couponPrice;
//        this.couponMoney = item.couponMoney;
//        this.voucherCode = item.voucherCode;
        this.showStoreSetting = true;
      },
      //完成设置
      confirmSetting(){
//        if (!/^[1-9]\d*$/.test(this.sel.couponPrice) || !/^[1-9]\d*$/.test(this.sel.couponPrice)) {
//          this.$toast("金额错误");
//          return;
//        }
        if(!(/^[0-9]+$/.test(this.sel.unlStaffBonus)&&/^[0-9]+$/.test(this.sel.onlStaffBonus))){
          this.$toast("金额错误");
          return;
        }
        doubleApi.setDuelevenActMerStoreConsumeMoney("post", {
          id: this.sel.id,
          unlStaffBonus: parseInt(this.sel.unlStaffBonus),
          onlStaffBonus: parseInt(this.sel.onlStaffBonus)
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.$toast("设置成功");
            this.getDuElevenActStoreInfoByCond();
            this.showStoreSetting = false;
            this.sel = {
              unlStaffBonus: '',
              onlStaffBonus: ''
            };
          } else {
            this.$toast(res.message);
          }
        })
      },
      //关闭
      close:function () {
        this.showStoreSetting=false;
        this.sel = {
          unlStaffBonus: '',
          onlStaffBonus: ''
        };
      }
    },
    mounted(){
      this.getDuElevenActStoreInfoByCond();

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-boss-set {
    position: relative;
    height: 101%;
    .main-container {
      position: relative;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      background-color: #F14831;
      text-align: center;
      padding-bottom: px2rem(43px);
      padding-top: px2rem(80px);
      .tip-title {
        height: px2rem(34px);
        font-size: px2rem(36px);
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: px2rem(36px);
        margin: px2rem(73px) px2rem(65px) px2rem(30px);
        padding-left: px2rem(30px);
        text-align: left;
      }
      .tip-title::before {
        position: absolute;
        left: px2rem(50px);
        content: "1";
        width: px2rem(33px);
        height: px2rem(33px);
        background: rgba(251, 244, 125, 1);
        border-radius: 50%;
        background: #FBF47D;
        text-align: center;
      }
      .tip-content {
        width: px2rem(617px);
        font-size: px2rem(30px);
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: px2rem(36px);
        margin: 0 auto;
        text-align: left;
      }

      .title {
        position: relative;
        display: inline-block;
        font-size: px2rem(46px);
        height: px2rem(45px);
        line-height: px2rem(45px);
        color: #FBEC70;
        margin: px2rem(71px) auto;
        &::before {
          content: "!";
          position: absolute;
          left: px2rem(-60px);
          top: 0;
          color: #F1472F;
          width: px2rem(54px);
          height: px2rem(60px);
          background: url(/static/images/activity/boss/double_11/title_icon_left.png) center no-repeat;
          background-size: 100% 100%;
        }
        &::after {
          content: "";
          position: absolute;
          right: px2rem(-60px);
          top: 0;
          width: px2rem(54px);
          height: px2rem(60px);
          background: url(/static/images/activity/boss/double_11/title_icon_right.png) center no-repeat;
          background-size: 100% 100%;
        }
      }
      .store-title {
        /*width: px2rem(660px);*/
        height: px2rem(29px);
        font-size: px2rem(30px);
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: px2rem(36px);
        margin: px2rem(56px) px2rem(45px);
        text-align: left;
      }

      .store-list {
        width: px2rem(660px);
        margin: 0 auto;
        background: #FFFFFF;

        .store-item {
          height: px2rem(153px);
          overflow: hidden;
          margin: 0 px2rem(51px) 0 px2rem(33px);

          .storeLogo {
            float: left;
            width: px2rem(86px);
            height: px2rem(86px);
            border-radius: px2rem(10px);
            margin: px2rem(36px) px2rem(20px) px2rem(31px) 0;
          }
          .storeName {
            float: left;
            width: px2rem(240px);
            height: px2rem(70px);
            /*line-height: px2rem(70px);*/
            text-align: left;
            /*text-overflow: -o-ellipsis-lastline;*/
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            font-weight: 600;
            font-size: px2rem(24px);
            line-height: px2rem(30px);
            color: #333;
            margin-top: px2rem(51px);
          }
          .btn {
            float: right;
            /*width: px2rem(136px);*/
            height: px2rem(57px);
            line-height: px2rem(57px);
            text-align: center;
            font-size: px2rem(24px);
            color: #F1472F;
            border: 1px solid rgba(241, 71, 47, 1);
            border-radius: 10px;
            margin-top: px2rem(52px);
            padding: px2rem(0px) px2rem(10px);
          }
          .cancell-btn {
            color: #B3B3B3;
            border: 1px solid rgba(179, 179, 179, 1);
          }
          .edit-btn {
            width: px2rem(136px);
            color: #B3B3B3;
            border: 1px solid rgba(179, 179, 179, 1);
          }
          .set-btn {
            width: px2rem(136px);
            color: #5693F9;
            border: 1px solid #5693F9;
          }

        }
        .bottom-line {
          border-bottom: 1px solid #eee;
        }
        .bottom-line2 {
          border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        }
        .store-info {
          width: px2rem(520px);
          margin: px2rem(42px) auto 0;
          padding-bottom: px2rem(42px);
          text-align: left;
        }
        .store-info-line {
          font-size: px2rem(24px);
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: px2rem(36px);
          display: inline-block;
          position: relative;
          padding-left: 10px;

        }
        .store-info-line::before {
          position: absolute;
          left: px2rem(-20px);
          content: "";
          width: px2rem(16px);
          height: px2rem(16px);
          margin: px2rem(8px) 0 0 px2rem(8px);
          -webkit-transform-origin: 0 100%;
          -moz-transform-origin: 0 100%;
          -o-transform-origin: 0 100%;
          -ms-transform-origin: 0 100%;
          transform-origin: 0 100%;
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
          background: #999999;
        }
      }
      .store-list-outer {
        background-color: #F14831;
        background: #F14831;
      }
      .store-item-outer {
        width: px2rem(660px);
        margin: 0 auto;
        background: #FFFFFF;
        margin-bottom: px2rem(20px);
      }
      .noList {
        line-height: px2rem(88px);
        text-align: center;
        font-size: px2rem(32px);
        color: #343434;
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
        /*top: px2rem(122px);*/
        /*left: px2rem(90px);*/
        left: 50%;
        top: 50%;
        width: px2rem(560px);
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        /*padding: px2rem(0px) px2rem(40px);*/
        &.orders-contain {
          border-radius: px2rem(8px);
          padding-bottom: px2rem(54px);
        }
        .head {
          width: 100%;
          height: px2rem(90px);
          background: #EEEEEE;
          text-align: left;
          .close {
            position: absolute;
            top: px2rem(40px);
            right: px2rem(35px);
            width: px2rem(30px);
            height: px2rem(30px);
            z-index: 9;
          }
          .title {
            font-size: px2rem(30px);
            color: #000;
            line-height: px2rem(90px);
            text-align: left;
            margin-left: px2rem(40px);
            font-weight: 600;
          }
        }
        .content {
          padding: px2rem(0px) px2rem(38px) 0;
          h3 {
            font-size: px2rem(28px);
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            line-height: px2rem(36px);
            margin-bottom: px2rem(16px);
            margin-top: px2rem(43px);
          }
          p {
            color: #999999;
            font-weight: px2rem(24px);
            line-height: px2rem(32px);
            margin-bottom: px2rem(42px);
            span {
              color: #333333;
            }
          }
          .input-outer {
            width: px2rem(475px);
            border-bottom: 2px solid #eee;
            margin: 0 auto;
            position: relative;
            input {
              width: 100%;
              height:px2rem(36px);
              line-height: px2rem(36px);
              margin-bottom: 2px;
              /*border-left: 1px solid #5693F9;*/
              font-size: px2rem(30px);
              font-weight: 500;
             color:#000000;
              padding: 0 px2rem(20px) 0 px2rem(5px);
              display: inline-block;
              text-align: center;
            }
            input::-webkit-input-placeholder{
              color: #999999;
              text-align: center;
            }
            .unit {
              color:#000000;
              width: px2rem(20px);
              height: px2rem(20px);
              position: absolute;
              right: px2rem(10px);
              top: px2rem(5px);
            }

          }
        }
        .confirm-btn {
          width: px2rem(480px);
          height: px2rem(79px);
          line-height: px2rem(79px);
          text-align: center;
          font-size: px2rem(36px);
          color: #fff;
          font-weight: 500;
          background-color: #F1472F;
          margin: px2rem(20px) auto 0 px2rem(44px);
        }
      }
      .setting-contain {
        border-radius: px2rem(8px);
        padding-bottom: px2rem(54px);

      }
    }
  }
</style>
