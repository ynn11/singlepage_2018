<template>
  <div class="double-12-boss-setstore">
    <activityHeader type="perpage" title="年末送礼冲业绩"></activityHeader>
    <div class="main-container">
      <h3 class="tip-title">提示：请在活动开启前完成活动设置，以免影响活动正常进行。</h3>
      <div class="content1">
        <img class="num" src="/static/images/activity/boss/double_12/1@2x.png"/><br/>
        <h3 class="title">活动设置</h3>
        <h3 class="tip1">未参与活动的门店</h3>
        <div class="store-content" v-if="notJoinedGnjActStoreInfoList.length>=1">
          <div class="store-item" v-for="item in notJoinedGnjActStoreInfoList">
            <img :src="item.storeLogoUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <div class="store-title store-title1">{{item.storeName||''}}</div>
            <div class="store-btn" @click="joinAct(item)">参与活动</div>
          </div>
          <!--<div class="store-item">-->
            <!--<img src="/static/images/activity/close_red.png"/>-->
            <!--<div class="store-title">苹果城西银泰第三号 <br/>主门店</div>-->
            <!--<div class="store-btn">参与活动</div>-->
          <!--</div>-->
        </div>
        <div class="noList" v-else>没有未参与活动的门店</div>
        <h3 class="tip1">参与活动的门店</h3>
        <div class="store-content" v-if="joinedGnjActStoreInfoList.length>=1">
          <div class="store-item" v-for="item in joinedGnjActStoreInfoList" >
            <img :src="item.storeLogoUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <div class="store-title">{{item.storeName||''}}</div>
            <div class="store-btn grey" @click="joinAct(item)">取消参与活动</div>
          </div>
        </div>
        <div class="noList" v-else>没有参与活动的门店</div>
      </div>
      <div class="content1 content2">
        <img class="num" src="/static/images/activity/boss/double_12/2@2x.png"/><br/>
        <h3 class="title">参与活动门店设置</h3>
        <div class="store-content"  v-for="item in joinedGnjActStoreInfoList" v-show="item.goodsCode1&&item.goodsCode1!=''" >
          <div class="store-item">
            <img :src="item.storeLogoUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <div class="store-title store-title1">{{item.storeName||''}}</div>
            <div class="store-btn grey" @click="routerLink('/activity_2018/double_12_boss_set',item)">修改</div>
          </div>
          <div class="store-info">
            <p class="store-info-line">
              1.满{{item.fullMoney1||''}}元送{{item.goodsName1||''}}，奖励导购{{item.fullStaffReward1||''}}元/单；
              满{{item.fullMoney2||''}}元送{{item.goodsName2||''}}，奖励导购{{item.fullStaffReward2||''}}元/单；
              满{{item.fullMoney3||''}}元送{{item.goodsName3||''}}，奖励导购{{item.fullStaffReward3||''}}元/单。</p>
            <p class="store-info-line">2.无门槛代金券{{item.cashQuota||''}}元，奖励导购{{item.lockStaffReward||''}}元。</p>
            <p class="store-info-line" v-show="item.isPartakeCoupon&&item.isPartakeCoupon==1">3.满{{item.deductLimit||''}}元减{{item.deductQuota||''}}元优惠券。</p>
          </div>
        </div>
        <div class="store-content"  v-for="item in joinedGnjActStoreInfoList" v-show="!item.goodsCode1||item.goodsCode1==''">
          <div class="store-item" >
            <img :src="item.storeLogoUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <div class="store-title store-title1">{{item.storeName||''}}</div>
            <div class="store-btn blue" @click="routerLink('/activity_2018/double_12_boss_set',item)">设置</div>
          </div>
          <div class="store-info">
            <p class="store-info-line">未设置</p>
          </div>
        </div>
        <div class="noList" v-if="joinedGnjActStoreInfoList.length<=0">没有参与活动的门店</div>
      </div>
      </div>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import * as _tool from "../../../../util/tool"
  import double12Api from '../../../../fetch/double_12_api'
  import activityHeader from "@/components/common/activityHeader"
  import loading from '@/components/common/loading'

  export default{
    components: {
      activityHeader,
      "v-loading": loading,
    },
    data() {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        joinedGnjActStoreInfoList:[],
        notJoinedGnjActStoreInfoList:[],
        isRequest:false,
        loading:false,


      }
    },
    methods: {
      //设置参与
      joinAct(item){
        if (this.isRequest) {
          return;
        }
        this.isRequest=true;
        double12Api.updateGnjActStorePartakeStatus("post", {
          activityCode: this.activityCode,
          storeCode: item.storeCode,
          id: item.id,
          isPartakeStatus: item.isPartake === 0 ? 1 : 0
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
          this.getGnjActStoreInfoByCond();
          if(item.isPartake===0){
              this.routerLink("/activity_2018/double_12_boss_set",item);
          }
          } else {
            this.$toast(res.message);
          }
          this.isRequest=false;
        })
      },
      getGnjActStoreInfoByCond:function () {
          this.loading=true;
          double12Api.getGnjActStoreInfoByCond("get",{activityCode:this.activityCode},this.token).then(res=>{
          if(res.returnCode==='0'){
              console.log(res.returnContent.joinedGnjActStoreInfoList);
            this.joinedGnjActStoreInfoList=res.returnContent.joinedGnjActStoreInfoList;
            this.notJoinedGnjActStoreInfoList=res.returnContent.notJoinedGnjActStoreInfoList;
          this.loading=false;
          }else {
            this.$toast(res.message);
          this.loading=false;
          }
        });
      },
      routerLink(path,item){
        let src = path + "?token=" + this.token + "&type=" + this.type+"&storeCode="+item.storeCode;
        this.$router.push({
          path: src
        })
      },
    },
    mounted(){
        this.getGnjActStoreInfoByCond();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-12-boss-setstore {
    position: relative;
    height: 101%;
    .main-container {
      position: relative;
      letter-spacing: px2rem(2px);
      overflow: hidden;
      background-color: #12013A;
      text-align: center;
      padding-bottom: px2rem(43px);
      padding-top: px2rem(80px);
      .tip-title {
        font-size: px2rem(28px);
        font-weight: 500;
        color: #FBBD01;
        line-height: px2rem(30px);
        margin: px2rem(49px) px2rem(56px) px2rem(45px);
        text-align: left;
      }
      .content1{
        position: relative;
        top: 0%;
        left: 0;
        padding-top: 14%;
        padding-bottom: 3%;
        background: linear-gradient(top,#240261 0, #12013A 100px);
        background: -webkit-linear-gradient(top,#240261 0, #12013A 100px);
        .num{
          width: px2rem(171px);
          height: px2rem(97px);
        }
        .title{
          color:#FBBD01;
          font-size: px2rem(40px);
          display: inline-block;
          position: relative;
        }
        .title::before{
          position: absolute;
          content: ' ';
          width: 0.38667rem;
          height: 0.06667rem;
          background: #fbbd01;
          border-radius: 3px;
          left: -25%;
          top: 53%;
        }
        .title::after{
          position: absolute;
          content: ' ';
          width: 0.38667rem;
          height: 0.06667rem;
          background: #fbbd01;
          border-radius: 3px;
          right: -25%;
          top: 53%;
        }
        .tip1{
          color: #fff;
          font-size: px2rem(30px);
          margin: px2rem(68px) 0 px2rem(34px) px2rem(48px);
          text-align: left;
        }
        .store-content{
          margin:0 px2rem(45px);
          background-color: #fff;
          .store-item{
            padding:px2rem(34px) px2rem(12px);
            margin: 0 px2rem(30px);
            /*margin: px2rem(34px) px2rem(42px);*/
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
              width: px2rem(86px);
              height: px2rem(86px);
            }
            .store-title{
              width: 44%;
              color:#333333;
              font-size: px2rem(24px);
              text-align: left;
            }
            .store-title1{
              width: 54%;
            }
            .store-btn{
              padding: 0 px2rem(20px);
              height:px2rem(57px);
              line-height:px2rem(57px);
              border:1px solid rgba(241,71,47,1);
              border-radius:px2rem(10px);
              color:rgba(241,71,47,1);
            }
            .grey{
              color:#B3B3B3;
              border: 1px solid #B3B3B3;
            }
            .blue{
              color:#5693F9;
              border:1px solid #5693F9;
            }

          }
        }
        .noList {
          line-height: px2rem(88px);
          text-align: center;
          font-size: px2rem(32px);
          color: #fff;
        }

      }
      .content2{
        margin-top: px2rem(74px);
        .title{
          margin-bottom: px2rem(65px);
        }
        .store-content{
          margin-bottom: px2rem(40px);
          .store-item{
            margin: 0 px2rem(20px);
            padding: px2rem(34px) px2rem(22px);
            border-bottom: 1px dashed #eee;
          }
          .store-info{
            margin: px2rem(42px) px2rem(44px) 0;
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
      }

    }
  }
</style>
