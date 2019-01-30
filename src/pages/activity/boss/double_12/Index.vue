<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  .double_12_boss_index{
    background-color: #12013A;

    .main-contaniner{
      text-align: center;
      background-size: 100% px2rem(712px);
      position: relative;
      padding-bottom: px2rem(120px);
      padding-top: px2rem(80px);
      z-index: 2;
      .banner{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        height: px2rem(712px);
        background: url("/static/images/activity/boss/double_12/banner@2x.png") 0 px2rem(80px) no-repeat;
        background-size: 100%;
        z-index: 1;
        h3{
          position: absolute;
          left: 0;
          top:17%;
          font-size: px2rem(22px);
          color: #fff;
          width: 100%;
          text-align: center;
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
          font-size: px2rem(28px);
          text-align: left;
          margin: px2rem(71px) px2rem(62px) px2rem(81px);
          line-height: px2rem(40px);
          text-indent: px2rem(40px);
        }
        .gift{
          margin: 0 px2rem(59px) px2rem(25px);
          padding: px2rem(35px) px2rem(33px);
          display: flex;
          background-color: #240261;
          img{
            width: px2rem(145px);
            height: px2rem(147px);
          }
          .gift-info{
            margin: 0 0 0 px2rem(30px);
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            text-align: left;
            .gift-title{
              color: #fff;
              font-size: px2rem(30px);
            }
            p{
              .mark{
                color: #fff;
                font-size: px2rem(24px);
                opacity: 0.3;
              }

              .order{
                color: #FBBD01;
                font-size: px2rem(24px);
                margin-left: px2rem(32px);
              }
              .money{
                color: #FBBD01;
                font-size: px2rem(36px);
                margin-left: px2rem(10px);
              }
            }

          }


        }
        .tip2{
          margin:px2rem(38px) px2rem(60px);
          font-size: px2rem(28px);
          color:#FAB301;
          text-align: left;
          line-height: px2rem(40px);
        }
      }
      .content1{
        position: relative;
        left: 0;
        top:0%;
        padding-top: 66%;
        padding-bottom: 10%;
      }
      .content2,.content3{
        position: relative;
        top: 0%;
        left: 0;
        padding-top: 9%;
        background: linear-gradient(top,#240261 0, #12013A 100px);
        background: -webkit-linear-gradient(top,#240261 0, #12013A 100px);
      }
      .content3{
        margin-top: 15%;
      }
      .tip3{
        font-size: px2rem(28px);
        color:#fff;
        margin: px2rem(175px) auto px2rem(63px);
      }

      .btn-call {
        margin: px2rem(30px) px2rem(49px);
        height: px2rem(100px);
        line-height: px2rem(100px);
        text-align: center;
        font-size: px2rem(36px);
        border-radius: px2rem(49px);
        color: #fff;
        background-color: #1B044C;
        img {
          width: px2rem(33px);
          height: px2rem(33px);
          margin-right: px2rem(20px);
        }
      }
      .btn {
        position: fixed;
        left:0;
        bottom: 0;
        width: 100%;
        height: px2rem(100px);
        line-height: px2rem(100px);
        color:#7E26F9;
        font-size: px2rem(36px);
        font-weight:800;
        background:rgba(255,232,1,1);
        box-shadow:0px 5px 6px 1px rgba(255,232,1,0.31), 0px 0px 40px 0px rgba(241,165,0,1);
        z-index:999;
      }
    }
    .popWindow{
      position: fixed;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      /*background-color: #000;*/
      z-index: 9999;
      div{
        margin:px2rem(160px) px2rem(48px) 0;
        height: px2rem(209px);
        line-height: px2rem(42px);
        display: flex;
        align-items: center;
        justify-content: center;
        color:#fff;
        font-size: px2rem(36px);
        font-weight: bold;
        background-color: rgba(0,0,0,0.8);
        border-radius: px2rem(20px);
        text-align: center;
      }
    }
  }
</style>
<template>
    <div class="double_12_boss_index">
      <activityHeader type="app" title="年末送礼冲业绩"></activityHeader>
      <div class="main-contaniner">
        <div class="banner">
          <h3>活动时间：12月22日-01月18日</h3>
        </div>
        <div class="content1">
          <img class="num" src="/static/images/activity/boss/double_12/1@2x.png"/><br/>
          <h3 class="title">会员到店消费满额送</h3>
          <p class="tip1">
            会员进店消费实付金额达标赠送家电礼品，有会员获得礼品，对应导购获得对应奖励，满送礼品及对应导购奖励共三档，不同门槛对应不同价格礼品及导购奖励。标准由门店自行设定。刺激到店会员连单、多消费。
          </p>
          <div class="gift" v-for="item in fullData">
            <img :src="item.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'">
            <div class="gift-info">
              <h3 class="gift-title">{{item.goodsName}}</h3>
              <p><span class="mark">市场价 {{item.salePrice}}</span><span class="order">订货价</span><span class="money">{{item.costPrice}}</span></p>
            </div>
          </div>
          <p class="tip2">家电在活动期间根据实际兑换数量进行订货，身边店收到货款后安排发货，若出现商户打款不及时出现的问题，后果由商户自行承担。活动前门店需选择3样活动商品作为样品</p>
        </div>
        <div class="content2">
          <img class="num" src="/static/images/activity/boss/double_12/2@2x.png"/><br/>
          <h3 class="title">线上锁销引流传播</h3>
          <p class="tip1">
            会员在线上转发活动，完成任务后可以59元的价格购买礼包（可线上或到店支付），礼包包含一台加湿器及一张门店代金券（无门槛）。加湿器到店领取，代金券用于门店消费。礼包售出导购获得对应奖励。刺激会员传播活动并到店。
          </p>
          <div class="gift" v-for="item in LockData">
            <img :src="item.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'">
            <div class="gift-info">
              <h3 class="gift-title">{{item.goodsName}}</h3>
              <p><span class="mark">市场价 {{item.salePrice}}</span><span class="order">订货价</span><span class="money">{{item.costPrice}}</span></p>
            </div>
          </div>
          <p class="tip2">礼品需提前订货</p>
        </div>
        <div class="content3">
          <img class="num" src="/static/images/activity/boss/double_12/3@2x.png"/><br/>
          <h3 class="title">节后放券余热不散</h3>
          <p class="tip1">
            在12月30日，系统给会员发放一张满额可用优惠券。刺激会员来消费，不放过未参与活动的所有会员。
          </p>
        </div>
        <h3 class="tip3">活动对应礼品订货 电话：153-7207-2897</h3>
        <div class="btn-call"  @click="call('153-7207-2897')"><img src="/static/images/activity/applet/double_12/phone.png"/>联系客服订货</div>
        <div class="btn" v-show="activeStatus==0" @click="joinAct">立即报名</div>
        <div class="btn" v-show="activeStatus==1" @click="routerLink('/activity_2018/double_12_boss_setstore')">设置活动</div>
        <div class="btn" v-show="activeStatus==2" @click="routerLink('/activity_2018/double_12_boss_data')">查看活动数据</div>
      </div>
      <div class="popWindow" v-show="showSuccess">
        <div>您已报名成功<br/>正在前往设置活动</div>
      </div>
    </div>
</template>

<script>
  import activityHeader from "@/components/common/activityHeader"
  import double12Api from "../../../../fetch/double_12_api";
  import * as _tool from "../../../../util/tool"
    export default{
      components: {
        activityHeader
      },
        data () {
            return {
              token: this.$route.query.token || "",
              type: this.$route.query.type,
              activityCode: "2adf2191f83711e884f8704d7b87a020",
              activeStatus:0,//(0:可报名,1:可设置,2:可查看数据)
              showSuccess:false,
              fullData:[],
              LockData:[],

            }
        },
        computed: {},
        watch: {},
        methods: {
          //打电话
          call: function(mobileNum){
            WebViewJavascriptBridge.callHandler('call',mobileNum,function(response) {

            });
          },
          routerLink:function(path){
            let src = path + "?token=" + this.token + "&type=" + this.type;
            this.$router.push({
              path: src
            })
          },
          getDualActMerStatus:function() {
            double12Api.getDualActMerStatus("get",{activityCode:this.activityCode},this.token).then(res=>{
                if(res.returnCode==='0'){
                    this.activeStatus=res.returnContent;
                }else {
                  this.$toast(res.message);
                }
            });
          },
          joinAct:function () {
              var _this=this;
            double12Api.joinedAct("post",{activityCode:this.activityCode},this.token).then(res=>{
              if(res.returnCode==='0'){
                this.showSuccess=true;
                setTimeout(function () {
                  _this.showSuccess=false;
                  _this.routerLink("/activity_2018/double_12_boss_setstore");
                },1500);
              }else {
                this.$toast(res.message);
              }
            });
          },
          getFullDelivery:function (goodsSymbol) {
            double12Api.listGnjGoods("get",{goodsSymbol:goodsSymbol},this.token).then(res=>{
              if(res.returnCode==='0'){
                if(goodsSymbol==1){
                  this.fullData=res.returnContent;
                }else {
                    this.LockData=res.returnContent;
                }

              }else {
                this.$toast(res.message);
              }
            });
          },
          //数据收集
          collect: function (data) {
            double12Api.collectData("post", data, this.token).then(res => {
              console.log(res);
            });
          },

        },

        created(){
          //初始化webViewJavascriptBridge
          _tool.webviewBridgeInit(this.type);
          this.collect({
            xdCode:"XD0009",
            ydCode:"YD0022",
            activityCode:this.activityCode
          });

        },
        mounted(){
        //获取状态
          this.getFullDelivery(1);//(1为满送商品,2为锁销商品)
          this.getFullDelivery(2);//(1为满送商品,2为锁销商品)
          this.getDualActMerStatus();
        }
    }
</script>
