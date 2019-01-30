<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  .newYearGreetCard_index{
    position: relative;
    width: 100%;
    /*height: 100%;*/
    /*overflow-x:hidden;*/
    /*overflow-y: scroll;*/
    /*background-color: #8F160B;*/
    .main-containner{
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;

      .ruls{
        position: fixed;
        right:px2rem(25px);
        top:px2rem(25px);
        color:#FFCA17;
        font-size: px2rem(28px);
        z-index: 55;
        border-radius: px2rem(6px);
        width: px2rem(138px);
        height: px2rem(49px);
        background: url("/static/images/activity/applet/newYearGreetCard/ruls.png") center no-repeat;
        background-size: 100%;
        z-index: 55;
      }
      .banner-content{
        /*position: absolute;*/
        /*left:0;*/
        /*top:0;*/
        position: relative;
        width: 100%;
        height: px2rem(868px);
        /*z-index: 1;*/
        .banner{
          width: 100%;
          height: px2rem(868px);
          z-index: 2;
        }
        .store-content{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top:px2rem(463px);
          /*margin: 0 px2rem(30px);*/
          width: px2rem(690px);
          height: px2rem(157px);
          z-index: 1;
          display: flex;justify-content: center;
          align-items: center;
          .logo{
            width: px2rem(82px);
            height: px2rem(82px);
          }
          .store-info{
            margin: 0 px2rem(20px);
            color:#fff;
            width: 70%;
            h3{
              width: 100%;
              font-size: px2rem(32px);
              line-height: px2rem(50px);
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            p{
              width: 100%;
              font-size: px2rem(24px);
              line-height: px2rem(32px);
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }

        }
        .time{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top:px2rem(648px);
          color:#FEB845;
          font-size: px2rem(30px);
          &::before{
            position: absolute;
            left: px2rem(-30px);
            top:px2rem(5px);
            content: "";
            width: px2rem(14px);
            height: px2rem(16px);
            background: url("/static/images/activity/applet/newYearGreetCard/pre.png") center no-repeat;
            background-size: px2rem(14px) px2rem(16px);
          }
          &::after{
            position: absolute;
            right: px2rem(-30px);
            top:px2rem(5px);
            content: "";
            width: px2rem(14px);
            height: px2rem(16px);
            background: url("/static/images/activity/applet/newYearGreetCard/pre.png") center no-repeat;
            background-size: px2rem(14px) px2rem(16px);
          }

        }
      }
      .info-content{
        /*position: absolute;*/
        /*left:0;*/
        /*top:px2rem(417px);*/
        flex-grow: 1;
        width: 100%;
        height: auto;
        z-index: 2;
        background: url("/static/images/activity/applet/newYearGreetCard/bg@2x.png") center no-repeat;
        background-size: cover;
        position: relative;
        padding-bottom: px2rem(50px);
        .card-content{
          position: relative;
          top:px2rem(-160px);
          margin: 0 px2rem(30px);
          background:rgba(157,5,3,1);
          /*height: px2rem(326px);*/
          text-align: center;
          padding-top: px2rem(43px);
          padding-bottom: px2rem(55px);

          .title{
            color:#F4D49F;
            font-size: px2rem(30px);
            margin: 0 auto px2rem(20px);
            height: px2rem(60px);
            line-height: px2rem(60px);
            /*position: relative;*/
            display: flex;
            align-items: center;
            justify-content: center;
            .nickName{
              margin-right: px2rem(10px);
            }
            .head{
              /*position: absolute;*/
              /*left: px2rem(100px);*/
              /*top:px2rem(20px);*/
              width: px2rem(50px);
              height: px2rem(50px);
              margin: 0 px2rem(5px) 0 px2rem(10px);
              border-radius: 50%;
            }
            .num{
              font-size: px2rem(36px);
              margin: 0 px2rem(20px);
            }
          }

          .coupon-content{
            position: relative;
            width: px2rem(587px);
            height: px2rem(155px);
            background: url("/static/images/activity/guide/newYearGreetCard/cupons.png") center no-repeat;
            background-size: 100%;
            margin: 0 auto;
            .title{
              position: absolute;
              left: px2rem(33px);
              top:px2rem(28px);
              font-size: px2rem(48px);
              color:#C7211E;
            }
            .fullmoney{
              position: absolute;
              left: px2rem(33px);
              top:px2rem(90px);
              font-size: px2rem(24px);
              color:#C7211E;
            }
            .time{
              position: absolute;
              left: px2rem(33px);
              top:px2rem(122px);
              font-size: px2rem(24px);
              color:#C7211E;
            }
            .coupon{
              position: absolute;
              right: px2rem(34px);
              top:px2rem(36px);
              color:#C7211E;
              display: flex;
              align-items: flex-start;
              span{
                font-size: px2rem(23px);
                margin-top: px2rem(10px);
              }
              p{
                font-size: px2rem(104px);
              }
            }
          }
          .card{
            width: px2rem(587px);
            height: px2rem(186px);
          }

        }
        .share-btn{
          position:fixed;
          left:50%;
          bottom:px2rem(80px);
          transform:translateX(-50%);
          width: px2rem(526px);
          height: px2rem(92px);
          line-height: px2rem(92px);
          background: url("/static/images/activity/applet/newYearGreetCard/btn@2x.png") center no-repeat;
          background-size: 100%;
          color:#C7211E;
          font-size: px2rem(40px);
          text-align: center;
          margin: 0 auto;
        }
        .tip{
          position: relative;
          top:px2rem(-140px);
          color:#F4D49F;
          font-size: px2rem(28px);
          text-align: center;
        }
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
        background-color: rgba(0, 0, 0, .8);
        z-index: 1;
      }
      .pop-contain {
        position: absolute;
        top: 50%;
        left: 50%;
        width: px2rem(530px);
        transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        border-radius: px2rem(16px);
        text-align: center;
        opacity: 1;
        z-index: 2;
      }
      .close {
        position: absolute;
        left: 85%;
        top: px2rem(140px);
        width: px2rem(46px);
        height: px2rem(46px);
        z-index: 9;
      }
      //活动规则
      .ruls-content{
        width: px2rem(623px);
        padding: px2rem(68px) 0;
        color:#000;
        .pop-title{
          margin-bottom: px2rem(40px);
          font-size: px2rem(40px);

        }
        p{
          font-size: px2rem(28px);
          line-height: px2rem(40px);
          text-align: left;
          margin: px2rem(50px) px2rem(30px) 0;
        }
      }
      //人气太旺
      .over-content{
        /*width: px2rem(623px);*/
        padding: px2rem(82px) px2rem(56px) px2rem(58px);
        border-radius:px2rem(20px);
        .saveBless{
          height:px2rem(100px);
          line-height:px2rem(100px);
          margin: 0 auto;
          text-align: center;
          background:#BF210F;
          border-radius:px2rem(8px);
          color:#fff;
          font-size: px2rem(40px);
        }
        p{
          color:#000000;
          font-size: px2rem(36px);
          margin: px2rem(17px) auto px2rem(70px);
          line-height: px2rem(40px);
          text-align: center;
          span{
            color:#BF210F;
          }
        }
        .pop-title{
          color:#E7422F;
          font-size: px2rem(40px);
        }
      }

    }

    //用户绑定弹窗
    .bindMobileNum {
      .bindMobileNum-contain {
        width: px2rem(629px);
        height: px2rem(582px);
        background-color: #fff;
        border-radius: px2rem(20px);

        .pop-title {
          color: #000000;
          font-size: px2rem(40px);
          text-align: center;
          margin: px2rem(67px) auto px2rem(31px);
        }

        .mobileNum {
          display: block;
          width: px2rem(471px);
          margin: 0 auto;
          height: px2rem(104px);
          font-size: px2rem(30px);
          text-indent: px2rem(8px);
          box-sizing: content-box;
          padding: 0 px2rem(27px);
          border-bottom: 1px solid #EEEEEE;
          color: #333;
        }
        .mobileNum::-webkit-input-placeholder {
          font-size: px2rem(30px);
          color: #666;
        }
        .rows {
          width: px2rem(525px);
          margin: px2rem(30px) auto px2rem(20px);
          height: px2rem(96px);
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #EEEEEE;
          .verificationCode {
            width: px2rem(370px);
            height: px2rem(96px);
            line-height: px2rem(96px);
            font-size: px2rem(30px);
            padding: 0 px2rem(28px);
            color: #333;
          }
          .verificationCode::-webkit-input-placeholder {
            color: #666;
            font-size: px2rem(30px);
          }
          .sendvCode {
            width: px2rem(140px);
            height: px2rem(75px);
            line-height: px2rem(75px);
            margin: 0;
            font-size: px2rem(30px);
            text-align: center;
            background-color: #FFB813;
            color: #fff;
            border-radius: px2rem(20px);
          }

        }
        .btn-contain {
          margin: px2rem(55px) auto;
          text-align: center;
          .btn-bind {
            position: relative;
            display: inline-block;
            width: px2rem(525px);
            height: px2rem(100px);
            line-height: px2rem(100px);
            font-size: px2rem(36px);
            color: #fff;
            text-align: center;
            background-color: #BF210F;
            border-radius: px2rem(8px);
          }
        }
      }
    }

    .concern{
      position: absolute;
      left: 0;
      top:0;
      width: 100%;
      height: px2rem(379px);
      background-color: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: px2rem(250px);
        height: px2rem(250px);
      }
      p{
        height: px2rem(200px);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        color:#fff;
        font-size: px2rem(30px);
        line-height: px2rem(40px);
        margin-left: px2rem(50px);
      }
    }
  }
</style>
<template>
  <div class="newYearGreetCard_index">
    <div class="main-containner">
      <div class="ruls" @click="showRuls=true"></div>
      <div class="banner-content">
        <img class="banner" src="/static/images/activity/applet/newYearGreetCard/banner@2x.png"/>
        <div class="store-content">
          <img class="logo" :src="activityData.storeLogoUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
          <div class="store-info">
            <h3>{{activityData.storeName}}</h3>
            <p>{{activityData.connectAddress}}</p>
          </div>
        </div>
        <h3 class="time">活动结束时间：{{activityData.endTime}}</h3>
      </div>
      <div class="info-content">
        <div class="card-content">
          <h3 class="title" v-show="activityInfo.selfFlag==1&&(activityInfo.surplusCardNum>0)">您有<span class="num">{{activityInfo.surplusCardNum==0?'0':'1'}}</span>张祝福卡待刮开</h3>
          <h3 class="title" v-show="activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==0)">恭喜您获得：两张代金券</h3>
          <div class="title" v-show="activityInfo.selfFlag==0"><span>您的好友</span><img class="head" :src="activityInfo.headPicUrl"/><span class="nickName">{{activityInfo.nickName}}</span><span>请你帮忙!</span></div>
          <img class="card" v-show="(activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==2))||activityInfo.selfFlag==0" src="/static/images/activity/applet/newYearGreetCard/card.png"/>
          <img class="card" v-show="activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==1)" src="/static/images/activity/applet/newYearGreetCard/card2.png"/>
          <div class="coupon-content" v-show="(activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==0))" v-for="item in activityData.couponList">
            <h3 class="title">代金券</h3>
            <h3 class="fullmoney">满{{item.deductCond}}可用</h3>
            <h3 class="time">使用日期:{{item.startTime}}-{{item.endTime}}</h3>
            <div class="coupon"><span>¥</span><p>{{item.deductQuota}}</p></div>
          </div>
        </div>

        <p class="tip" v-show="activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==2||activityInfo.surplusCardNum==1)">邀请两位好友帮忙就可以刮开啦！</p>
        <p class="tip" v-show="activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==0)">恭喜您获得新年祝福，也把祝福送朋友吧！</p>
        <p class="tip" v-show="activityInfo.selfFlag==0">快点击上方按钮帮我刮开</p>
        <div class="share-btn" v-show="activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==2||activityInfo.surplusCardNum==1)" @click="activityShare">请朋友刮开</div>
        <div class="share-btn" v-show="activityInfo.selfFlag==1&&(activityInfo.surplusCardNum==0)" @click="activityShare">把祝福送给朋友</div>
        <div class="share-btn" v-show="activityInfo.selfFlag==0" @click="activityAttend">帮好友刮开</div>
      </div>

    </div>
    <!--关注公众号-->
    <div class="concern" v-show="showPublicNumber">
      <img class="img" src="/static/images/qrcode.jpg"/>
      <p>长按识别图中二维码，获取<br/>更多门店优惠信息</p>
    </div>
    <!-- 绑定手机号 -->
    <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
      <div class="mask"></div>
      <!--<img class="close" @click="bindMobileNumShow=false" src="/static/images/activity/applet/newYearGreetCard/close.png"/>-->
      <div class="bindMobileNum-contain pop-contain">
        <div class="pop-title">成为会员获得祝福卡</div>
        <div class="content-box">
          <input type="number" class="mobileNum" v-model="mobileNum" placeholder="请输入手机号">
          <div class="rows">
            <input type="number" class="verificationCode" placeholder="输入验证码" v-model="verificationCode">
            <div class="sendvCode" @click="send" v-show="!timerStatus">获取</div>
            <div class="sendvCode run" v-show="timerStatus">{{timer}}s</div>
          </div>
          <div class="btn-contain">
            <div class="btn btn-bind" @click="bindMobileNum">确定</div>
          </div>
        </div>
      </div>
    </div>
    <!--活动规则-->
    <div class="popWindow" v-show="showRuls">
      <div class="mask"></div>
      <img class="close" @click="showRuls=false" src="/static/images/activity/applet/newYearGreetCard/close.png"/>
      <div class="pop-contain ruls-content">
        <div class="pop-title">活动规则</div>
        <p>1. 本活动的祝福卡需邀请两位好友刮开后即获得卡上所示优惠券，未刮开无效。优惠券在2019年1月31日前有效，仅限在门店购买商品使用。</p>
        <p>2. 优惠券在身边收银台可用，在使用前告知门店工作人员即可。</p>
        <p>3. 本活动优惠不与其他优惠同享，详情请咨询门店。</p>
        <p>4. 优惠券不可与身边店余额同用。</p>
      </div>
    </div>
    <!--人气太旺，已被刮开-->
    <div class="popWindow" v-show="showOver">
      <div class="mask"></div>
      <img class="close" @click="showOver=false" src="/static/images/activity/applet/newYearGreetCard/close.png"/>
      <div class="pop-contain over-content">
        <div class="pop-title">人气太旺已被刮开</div>
        <p>感谢你的帮助，也送你<span>1</span>张祝福卡</p>
        <div class="saveBless" @click="saveGreet('2')">收下祝福</div>
      </div>
    </div>
    <!--帮完-->
    <div class="popWindow" v-show="showSuccess">
      <div class="mask"></div>
      <img class="close" @click="showSuccess=false" src="/static/images/activity/applet/newYearGreetCard/close.png"/>
      <div class="pop-contain over-content">
        <p>感谢你的帮助,<br/>也送你<span>1</span>张祝福卡</p>
        <div class="saveBless" @click="saveGreet('1')">收下祝福</div>
      </div>
    </div>

    <v-loading v-show="loading"></v-loading>
    <wxShareTip :shareTipShow="shareTipShow" :isClose="false" :notice="notice"></wxShareTip>
  </div>
</template>

<script>
  import wxShareTip from "@/components/common/wxShareTip2"
  import loading from "@/components/common/loading"
  import _urlConfig from "../../../../util/urlConfig"
  import * as _validate from "../../../../util/validate"
  import newYearApi from '../../../../fetch/newYearGreetCard'
    export default{
        components: {
          wxShareTip,
          'v-loading':loading,
        },
        data () {
            return {
              activityCode: "10c56904f34341f1b6e679b5763cfb2a",
              storeCode: this.$route.query.storeCode || null,//门店编号
              staffCode: this.$route.query.staffCode || null,//导购编号
              xd_code: this.$route.query.xd_code||'',  //来源
              linkType: this.$route.query.linkType||'',  //来源
              actJoinCode: '', // 参与活动编号(可选 若为空则表示自己参与活动 若不为空则表示帮好友刮卡)
              fromOpenId: this.$route.query.openId||null, // 来源openid
              isOwner:true,
              shareTipShow:false,
              loading:false,
              notice:"点击右上角选择分享给好友或朋友圈\n请好友刮开祝福卡！",
              bindMobileNumShow:false,
              timerStatus:false,
              shareContent:{},
              mobileNum:'',
              verificationCode:'',
              timer:60,
              showRuls:false,
              showOver:false,
              showSuccess:false,
              showPublicNumber:false,
              activityData:{},
              activityInfo:{},
              link: '',

            }
        },
      //判断重复进入
      beforeRouteEnter(to, from, next) {
        if (navigator.userAgent.match(/Android/i)) {
          sessionStorage.entryMark = "marked"
          next();
          return;
        } else {
          next((vm) => {
            if (sessionStorage.entryMark !== "marked") {
              sessionStorage.entryMark = "marked"
              vm.$router.go(0);
              return;
            }
          })
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
        },
        actJoinCode(){
            if(this.actJoinCode&&this.actJoinCode.length<32){
                this.actJoinCode=null;
            }
        }
      },
        watch: {},
        methods: {
          //绑定手机号
          bindMobileNum() {
            let data = {
              "mobileNum": this.mobileNum,
              "verificationCode": this.verificationCode,
              "appEntranceType": 3
            }
            if (_validate.mobile(data.mobileNum) !== true) {
              this.$toast(_validate.mobile(data.mobileNum));
              return;
            }
            if (_validate.verificationCode(data.verificationCode) !== true) {
              this.$toast(_validate.verificationCode(data.verificationCode));
              return;
            }
            newYearApi.memFansBindMobileNum("post", data, this.tokenInfo.token).then(res => {
              if (res.returnCode === "0") {
                this.$store.dispatch("_login", {tokenInfo: JSON.stringify(res.returnContent), openId: this.openId});
//                this.collect({
//                  "xdCode": this.xd_code,
//                  "ydCode": "YD0005",
//                  "activityCode": this.activityCode,
//                  "openId": this.openId
//                }, res.returnContent.token);
                this.$toast("手机号绑定成功！");
                //从用户开始进入
                this.bindMobileNumShow = false;
                if(this.isOwner){
                  this.activityShareDo();
                }else{
                  this.refreshPage('/activity_2018/newYearGreetCard_index');
                }

              } else {
                this.$toast(res.message);
              }
            })
          },
          //发送验证码
          send(){
//        vue.sendvCode= function(){
            if (_validate.mobile(this.mobileNum) !== true) {
              this.$toast(_validate.mobile(this.mobileNum))
              return;
            }
            let data = {
              "mobileNum": this.mobileNum,
              "verificationType": 5
            };
            newYearApi.sendVerificationCode("get", data).then((res) => {
              if (res.returnCode === "0") {
                this.timer = 60;
                this.timerStatus = true;
                this.runTimer();
              } else {
                this.$toast(res.message);
              }
            });
//        },
          },
          //验证码倒计时
          runTimer() {
            if (this.timer > 0) {
              --this.timer;
              setTimeout(this.runTimer, 1000);
            } else {
              this.timerStatus = false
            }
          },
          activityContent:function(){
              this.loading=true;
              newYearApi.activityContent("post",{
                activityCode:this.activityCode,
                linkStaffCode:this.staffCode
              },this.tokenInfo.token).then(res=>{
                if (res.returnCode === '0') {
                  this.activityData=res.returnContent;
                  this.storeCode=res.returnContent.storeCode;
                  //存储状态
                  if(this.fromOpenId!=null){
                    let status=localStorage.getItem("newYearStatus"+this.fromOpenId+this.storeCode);//-1代表初始状态 0:收下祝福 1：请朋友刮开
                    if(!status||status==null){
                      localStorage.setItem("newYearStatus"+this.fromOpenId+this.storeCode,'-1');
                    }
                  }
                  this.link=encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/newYearGreetCard_index?xd_code=XD0005&storeCode=' + (this.storeCode ||'') + '&staffCode=' + (this.staffCode|| "") + '&openId=' + (this.openId));

                  this.shareContent=res.returnContent;
                  this.initShare(res.returnContent);
                  this.activityWhetherAttend();

                }else {
                  this.$toast(res.message);
                  this.loading=false;
                }
              });
          },
          activityWhetherAttend:function(){
              let data={
                activityCode:this.activityCode,
                linkStaffCode:this.staffCode,
              };
              if(!this.isOwner&&this.actJoinCode!=null&&this.actJoinCode.length==32){
                data.actJoinCode=this.actJoinCode;
                data.openId=this.openId;
              }

              newYearApi.activityWhetherAttend("post",data,this.tokenInfo.token).then(res=>{
                if (res.returnCode === '0') {
                    let activityInfo=res.returnContent;
                  if(activityInfo.actJoinCode&&activityInfo.actJoinCode.length==32){
                    this.actJoinCode=activityInfo.actJoinCode;
                  }
                  this.activityInfo=activityInfo;
                  if(activityInfo.surplusCardNum==0){
                      this.showPublicNumber=true;
                  }else{
                      this.showPublicNumber=false;
                  }

//                    this.activityContent();
                    if(res.returnContent.scratchFlag==1){
                        if(localStorage.getItem("newYearStatus"+this.fromOpenId+this.storeCode)=='-1'){
                            this.showSuccess=true;
                        }else {
                          if(this.tokenInfo.imInfo === null){
                            this.bindMobileNumShow=true;
                            return;
                          }
                          this.refreshPage('/activity_2018/newYearGreetCard_index');
                        }

                    }else if(res.returnContent.scratchFlag==2){
                      if(localStorage.getItem("newYearStatus"+this.fromOpenId+this.storeCode)=='-1'){
                        this.showOver=true;
                      }else {
                        if(this.tokenInfo.imInfo === null){
                          this.bindMobileNumShow=true;
                          return;
                        }
                        this.refreshPage('/activity_2018/newYearGreetCard_index');
                      }
                    }
                  this.loading=false;
                }else {
                  this.loading=false;
                  this.$toast(res.message);
                }
              });
          },
          //好友请求参加活动编号
          activityConfirm:function(){
              newYearApi.activityConfirm("post",{
                activityCode:this.activityCode,
                openId:this.fromOpenId,
                linkStaffCode:this.staffCode
              },this.tokenInfo.token).then(res=>{
                if (res.returnCode === '0') {
                  this.actJoinCode=res.returnContent.actJoinCode;
//                  this.activityWhetherAttend();
                  this.activityContent();
                }else {
                  this.$toast(res.message);
                }
              });
          },
          //帮好友刮开
          activityAttend:function () {
            newYearApi.activityAttend("post",{
              activityCode:this.activityCode,
              linkStaffCode:this.staffCode,
              actJoinCode:this.actJoinCode,
              openId:this.openId
            },this.tokenInfo.token).then(res=>{
              if (res.returnCode === '0') {
//                this.activityWhetherAttend();
                this.activityContent();
              }else {
                this.$toast(res.message);
              }
            });
          },
          //分享
          activityShare() {
            if(this.tokenInfo.imInfo === null){
                this.bindMobileNumShow=true;
                return;
            }
            this.activityShareDo();
          },
          activityShareDo() {
            if(this.actJoinCode==null||this.actJoinCode.length<=0){
              newYearApi.activityShare("post",{
                activityCode:this.activityCode,
                linkStaffCode:this.staffCode,
              },this.tokenInfo.token).then(res=>{
                if (res.returnCode === '0') {
                  this.actJoinCode=res.returnContent;
//                  this.link=encodeURI(_urlConfig.redirectBaseredirectURI
//                    + '/activity_2018/newYearGreetCard_index?xd_code=XD0005&storeCode='
//                    + (this.storeCode || this.activityInfo.storeCode||'')
//                    + '&staffCode=' + (this.staffCode || this.activityInfo.linkStaffCode || "")
//                    + '&openId=' + (this.openId));

//                  this.initShare(this.shareContent,true);
                  this.shareTipShow = true;
                }else {
                  this.$toast(res.message);
                }
              });
            }else {
              this.shareTipShow=true;
            }
          },
          saveGreet(status) {
            localStorage.setItem("newYearStatus"+this.fromOpenId+this.storeCode,status);

            if(this.tokenInfo.imInfo === null){
              this.bindMobileNumShow=true;
              this.showOver=false;
              this.showSuccess=false;
              return;
            }
            this.refreshPage('/activity_2018/newYearGreetCard_index');
          },
          //
          refreshPage:function (path) {
            let src=path+"?storeCode="+this.storeCode+"&staffCode="+this.staffCode+"&xd_code="+this.xd_code+"&linkType="+this.linkType+"&openId="+this.openId;
            window.location.href = src;
          },

          //初始化分享
          initWxShare(options, cb,other){
            window.wx.ready(function () {
              // wx.showMenuItems({
              //     menuList: [
              //         "menuItem:share:appMessage",
              //         "menuItem:share:timeline"
              //     ] // 要显示的菜单项，所有menu项见附录3
              // });
              console.log(options);
              wx.onMenuShareAppMessage({
                title: options.title, // 分享标题
                desc: options.desc, // 分享描述
                link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: options.imgUrl||'http://static.storeer.com/getheadimg_300.png', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: () => {
                  typeof cb === "function" && cb();
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              });

              wx.onMenuShareTimeline({
                title: options.title, // 分享标题
                desc: options.desc, // 分享描述
                link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: options.imgUrl, // 分享图标
                success: () => {
                  typeof cb === "function" && cb();
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              typeof other === "function" && other();
            });
          },
          initShare(data){
            var that = this;
            //分享
            this.initWxShare({
              title:  `新年祝福卡来啦!`,
              desc:data.storeName||'',
              link:that.link,
              imgUrl: data.storeLogoUrl||''
            }, () => {

              //分享提示框
              that.shareTipShow = false;
            });
          },
          //初始化微信
          initWxConfig(){
            newYearApi.getSignMap("post", {url: location.href}).then(res => {
              let content = res.returnContent;
              window.wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: content.appId, // 必填，公众号的唯一标识
                timestamp: content.timestamp, // 必填，生成签名的时间戳
                nonceStr: content.nonceStr, // 必填，生成签名的随机串
                signature: content.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
            });
          },

        },
        created(){
//          this.initShare();
          this.initWxConfig();
        },
        mounted(){
            if(this.fromOpenId!=null&&this.fromOpenId!=this.openId){
                this.isOwner=false;
                this.activityConfirm();
            }else{
              this.isOwner=true;
//              this.activityWhetherAttend();
              this.activityContent();
            }



        }
    }
</script>
