<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  .double_12_guide_index{
    background-color: #12013A;
    .fsize24{
      font-size: px2rem(24px);
    }
      .fsize25{
      font-size: px2rem(25px);
    }

      .fsize28{
      font-size: px2rem(28px);
    }
        .fsize30{
      font-size: px2rem(30px);
    }
   .fsize30{
      font-size: px2rem(26px);
    }

    .main-contaniner{
      text-align: center;
      background-size: 100% px2rem(712px);
      position: relative;
      padding-bottom: px2rem(120px);
      padding-top: px2rem(80px);
      z-index: 2;
      .ruls{
        color:#8855EF;
        font-size: px2rem(30px);
        text-align: left;
        margin: px2rem(30px) px2rem(58px);
        position: relative;
      }

      .ruls:after{
        content: "";
        position: absolute;
        left:23%;
        width: px2rem(27px);
        height: px2rem(27px);
        background: url("/static/images/activity/guide/double_12/down.png") no-repeat;
        background-size: px2rem(27px);
      }
      .ruls-select:after{
        content: "";
        position: absolute;
        left:23%;
        width: px2rem(27px);
        height: px2rem(27px);
        background: url("/static/images/activity/guide/double_12/up.png") no-repeat;
        background-size: px2rem(27px);
      }
      .ruls3:after{
        left: 37%;
      }


      .ruls-content{
        background-color: #fff;
        margin: 0 px2rem(58px);
        border-radius: px2rem(10px);
        padding: px2rem(23px) px2rem(38px) px2rem(53px);
        p{
          color:#4D4D4D;
          font-size: px2rem(26px);
          line-height: px2rem(36px);
          margin-top: px2rem(30px);
          text-align: left;
        }
        .pre{
          padding-left: 10%;
          position: relative;
        }
        .pre1::before{
          position: absolute;
          left: 0%;
          content: "1.";
          padding-top: 1%;
          text-align: center;
          width: px2rem(42px);
          height: px2rem(42px);
          border-radius: 50%;
          background-color: #250362;
          color:#fff;
        }
        .pre2::before{
          position: absolute;
          left: 0%;
          content: "2.";
          padding-top: 1%;
          text-align: center;
          width: px2rem(42px);
          height: px2rem(42px);
          border-radius: 50%;
          background-color: #250362;
          color:#fff;
        }
        .pre3::before{
          position: absolute;
          left: 0%;
          content: "3.";
          padding-top: 1%;
          text-align: center;
          width: px2rem(42px);
          height: px2rem(42px);
          border-radius: 50%;
          background-color: #250362;
          color:#fff;
        }

      }
      .banner{
        position: relative;
        left: 0;
        top:0;
        width: 100%;
        height: px2rem(419px);
        background: url("/static/images/activity/guide/double_12/banner@2x.png") center no-repeat;
        background-size: 100%;
        z-index: 1;
        h3{
          position: absolute;
          left: 0;
          top:5%;
          font-size: px2rem(22px);
          color: #fff;
          width: 100%;
          text-align: center;
        }


      }
      .share-btn{
        position: fixed;
        right: 3%;
        top: 8%;
        width:  px2rem(54px);
        height: px2rem(140px);
        background: url("/static/images/activity/guide/double_12/share.png") center no-repeat;
        background-size: px2rem(54px) px2rem(140px);
        /*background-color:#f00;*/
        z-index: 99;
      }
      .tip3{
        color:#fff;
        font-size: px2rem(24px);
        line-height: px2rem(40px);
        margin: px2rem(20px) px2rem(126px) 0;
        text-align: center;
      }
      .guide-content{
        .ruls::after{
          left:32%;
        }
        .ruls::after{
          left:32%;
        }
        .ruls-select::after{
          left:32%;
        }

        .guide-data{
          margin: 0 px2rem(58px);
          padding: px2rem(47px) px2rem(78px) 0;
          background:rgba(36,2,97,1);
          box-shadow:0px 0px px2rem(62px) 0px rgba(42,4,107,0.42);
          border-radius:px2rem(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          .guide-item{
            width: 50%;
            height: px2rem(78px);
            display: flex;
            justify-content: center;
            align-items: center;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: px2rem(20px);
            padding-bottom: px2rem(20px);
            h3{
              color:#735A9D;
              font-size: px2rem(26px);
              text-align: left;
            }
            p{
              color:#fff;
              font-size: px2rem(40px);
              font-weight: 600;
              margin-top: px2rem(10px);
              text-align: left;
            }
            .yellow{
              color:#FBBD01;
            }
          }
          .borderBo{
            border-bottom:1px solid rgba(133,67,255,0.5);
          }
        }
      }
      .content1,.content2,.content3{
        z-index: 2;
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
          left: -12%;
          top: 53%;
        }
        .title::after{
          position: absolute;
          content: ' ';
          width: 0.38667rem;
          height: 0.06667rem;
          background: #fbbd01;
          border-radius: 3px;
          right: -12%;
          top: 53%;
        }

        .tip1{
          color:#fff;
          text-align: left;
          margin: px2rem(71px) px2rem(62px) px2rem(81px);
          line-height: px2rem(40px);
          text-indent: px2rem(40px);
        }

        .tip2{
          margin:px2rem(60px) px2rem(62px);
          color:#FAB301;
          text-align: left;
          line-height: px2rem(40px);
        }
        .other1{
          margin:px2rem(-30px) px2rem(62px);
        }
        .table-content{
          width: px2rem(632px);
          margin: 0 auto;
          padding: px2rem(10px) 0;
          background-color: #fff;
          border-radius: px2rem(10px);
          table.table {
            width: px2rem(592px);
            border: 2px solid #fff;
            border-collapse: collapse;
            margin-left: px2rem(20px);
             tr {
               width: px2rem(592px);
              height: px2rem(89px);
              border-bottom: px2rem(1px) solid #eee;
            }
            td {
              width: px2rem(280px);
              /*border-width: px2rem(0px);*/
              border-right: 1px solid #eee;
              height: px2rem(89px);
              line-height: px2rem(89px);
              color: #4D4D4D;
              font-size: px2rem(24px);
              text-align: center;
              vertical-align: middle;
              display: block;
              float: left;
              span{
                width:px2rem(200px);
                color:#F03622;
                margin: 0 px2rem(0px) 0 px2rem(10px);
              }
            }
            .tab_title{
            }
            .tab_info{
              width: px2rem(290px);
              border-right:0px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .content1,.content2,.content3{
        position: relative;
        top: 0%;
        left: 0;
        padding-top: 11%;
        padding-bottom: 11%;
        margin-top: 5%;
        background: linear-gradient(top,#240261 0, #12013A 100px);
        background: -webkit-linear-gradient(top,#240261 0, #12013A 100px);
      }

      .btn-content{
        margin: px2rem(69px) 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .btn{
          width: px2rem(260px);
          height: px2rem(90px);
          line-height: px2rem(90px);
          border-radius: px2rem(45px);
          font-size: px2rem(36px);
        }
        .yellow{
          background:rgba(255,232,1,1);
          box-shadow:0px 5px 6px 1px rgba(255,232,1,0.31), 0px 0px 40px 0px rgba(241,165,0,1);
          color: #7E26F9;
        }
        .blu{
          background:rgba(83,21,177,1);
          box-shadow:0px 5px 6px 1px rgba(26,7,59,0.31), 0px 0px 40px 0px rgba(111,40,219,1);
          color:#fff;
        }
      }

    }
    .advert{
      position: fixed;
      left: 0%;
      bottom: 0;
      height: px2rem(158px);
      width: 100%;
      z-index: 9;
    }
  }
</style>
<template>
  <div class="double_12_guide_index">
    <activityHeader type="app" title="年末送礼冲业绩"></activityHeader>
    <div class="main-contaniner">
      <div class="banner">
        <h3>活动时间：12月22日-01月18日</h3>

      </div>
      <div class="share-btn"  @click="routerLink('/activity_2018/double_12_guide_poster')"></div>


      <div class="guide-content" v-show="showStart">
        <div :class="'ruls '+[showRules3?'ruls-select':'']" @click="showRules3=!showRules3">查看活动数据</div>
        <div class="guide-data" v-show="showRules3">
          <div class="guide-item borderBo">
            <h3>售出礼包</h3>
            <p>{{activityDataStaff.soldNum}}</p>
          </div>
          <div class="guide-item borderBo">
            <h3>奖励(元）</h3>
            <p class="yellow">{{activityDataStaff.soldReward}}</p>
          </div>
          <div class="guide-item borderBo">
            <h3>已兑换家电</h3>
            <p>{{activityDataStaff.exchangedNum}}</p>
          </div>
          <div class="guide-item borderBo">
            <h3>获得家电奖励(元）</h3>
            <p class="yellow">{{activityDataStaff.exchangedReward}}</p>
          </div>
          <div class="guide-item">
            <h3>待兑换家电</h3>
            <p>{{activityDataStaff.notExchangeNum}}</p>
          </div>
          <div class="guide-item"></div>
        </div>
        <div class="btn-content" >
          <div class="btn yellow" @click="routerLink('/activity_2018/double_12_guide_elecEquip')">兑换家电</div>
          <div class="btn blu" @click="routerLink('/activity_2018/double_12_guide_gifts')">兑换礼品</div>
        </div>
      </div>
      <p class="tip3" v-show="!showStart">活动将于12月22日正式开启，活动开启前，你可查看、转发及操作相关步骤进行熟悉，活动开启后会员可参与活动！</p>
      <div class="content1">
        <img class="num" src="/static/images/activity/boss/double_12/1@2x.png"/><br/>
        <h3 class="title ">会员消费达标你拿奖励</h3>
        <p class="tip1 fsize28">会员进店消费满额（实际付款金额）送家电，具体规则如下：会员实付金额达标后只可兑换一次仅限一件商品。兑换成功后，原实付金额清零，会员再次消费达标才可兑换第二件商品！</p>
        <div class="table-content" v-if="activityInfo.productList&&activityInfo.productList.length>0">
          <table class="table">
            <tr v-for="item in activityInfo.productList">
              <td class="td tab_title">
                会员实付满<span>{{item.fullMoney}}</span>元
              </td>
              <td class="td tab_info">
                获得价值{{item.salePrice}}元的{{item.goodsName}}
              </td>
            </tr>
            <!--<tr>-->
              <!--<td class="td">-->
                <!--会员实付满<span>300</span>元-->
              <!--</td>-->
              <!--<td class="td">-->
                <!--获得价值300元的烫衣器-->
              <!--</td>-->
            <!--</tr>-->


          </table>
        </div>

        <p class="tip2 fsize24">注意：会员需先成为身边店会员才能参加活动。只有在您手上买单达标的会员，你才能为他兑换礼品，获得奖励！</p>
        <p class="tip1 fsize24">你只需在会员达到标准后，在该页面点击家电兑换，选择会员进行兑换，并输入会员的收货地址，兑换成功你即可获得对应奖励。</p>
      </div>
      <div class="content2">
        <img class="num" src="/static/images/activity/boss/double_12/2@2x.png"/><br/>
        <h3 class="title">会员购买礼包你拿奖励</h3>
        <p class="tip1 fsize30">分享活动：会员线上分享活动成功购买（线上或到店支付都可以），你就获得对应奖励。</p>
        <p class="tip2 other1 fsize30">{{activityInfo.cashCouponPrice}}元礼包=价值{{activityInfo.salePrice}}元的礼品+{{activityInfo.cashQuota}}元无门槛代金券</p>
        <p class="tip1 fsize28">礼品到店核销提货码后领取礼品，代金券在门店消费使用（身边店快速收银）。</p>
        <div :class="'ruls '+[showRules1?'ruls-select':'']" @click="showRules1=!showRules1">执行流程</div>
        <div class="ruls-content" v-show="showRules1">
          <p class="pre pre1 fsize25">分享活动---告知会员活动优惠---会员转发活动---获得砍价后价格购买礼包资格---会员选择线上支付或到店支付---会员支付成功---你获得对应奖励</p>

          <p class="pre pre2 fsize25"> 会员到店---出示礼品兑换码---你在该页面点击礼包兑换---输入兑换码---兑换码核销成功---会员领走礼品</p>

          <p class="pre pre3 fsize25"> 若会员为到店购买礼包- --会员砍价成功后选择到店支付---会员出示锁定码---你收取会员支付的{{activityInfo.cashCouponPrice}}元---你在该页面点击礼包兑换---输入锁定码---确定已收到{{activityInfo.cashCouponPrice}}元---锁定码核销成功---会员领走礼品</p>

        </div>
      </div>
      <div class="content3">
        <img class="num" src="/static/images/activity/boss/double_12/3@2x.png"/><br/>
        <h3 class="title">全员放券，为你招来会员</h3>
        <p class="tip1 fsize28">
          在12月30日—01月18日，身边店系统会向门店所有会员发放满额可用优惠券一张，会员消费可用（身边店快速收银）。该期间，新加入的会员会在加入后立即收到该优惠券。快邀请新会员加入吧！
        </p>
        <div :class="'ruls ruls3 '+[showRules2?'ruls-select':'']" @click="showRules2=!showRules2">如何邀请新会员</div>
        <div class="ruls-content" v-show="showRules2">
          <p>首页---点击页面左上角正方形图案---出现二维码---让会员打开微信扫描图中二维码---绑定手机号、填写真实姓名---根据提示完成注册---成为你的新会员</p>

        </div>
      </div>
      <div class="btn-content" v-show="!showStart">
        <div class="btn yellow" >兑换家电</div>
        <div class="btn blu" >兑换礼品</div>
      </div>
    </div>
    <!--<img class="advert" src="/static/images/activity/guide/double_12/advert.png">-->
  </div>
</template>

<script>
  import activityHeader from "@/components/common/activityHeader"
  import double12Api from "../../../../fetch/double_12_api"

  export default{
    components: {
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        showStart:false,
        showRules1:false,
        showRules2:false,
        showRules3:false,
        activeStatus:0,
        activityInfo:{},
        activityDataStaff:{},

      }
    },
    computed: {},
    watch: {},
    methods: {
      getActivityInfo:function () {
        double12Api.activityInfo("post", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityInfo = res.returnContent;

            //判断是否在活动期间
            var beginTime = res.returnContent.beginTime.toString().replace(/\./g,"-");
            beginTime = new Date(beginTime).getTime();
            var endTime = res.returnContent.endTime.toString().replace(/\./g,"-");
            endTime = new Date(endTime).getTime()+24*60*60*1000;
            var nowTime = new Date().getTime();
            if (nowTime >= beginTime && nowTime <= endTime) {
              this.showStart = true;
              this.getactivityDataStaff();
            } else {
              this.showStart = false;
            }
//            alert(this.showStart);
          } else {
            alert(res.message);
          }
        })
      },
      //获取活动统计数据
      getactivityDataStaff: function () {
        double12Api.activityDataStaff("post", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.activityDataStaff = res.returnContent;
          } else {
            alert(res.message);
          }
        })
      },
      //跳转
      routerLink(path){
        let src = path + "?token=" + this.token + "&type=" + this.type
        this.$router.push({
          path: src
        })
      },
    },
    created(){

    },
    mounted(){
        this.getActivityInfo();
    }
  }
</script>
