<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';
  .newYearGreetCard-guide-index{
    position: relative;

    .main-containner{
      background-color: #8F160B;
      text-align: center;
      padding-top: px2rem(80px);
      padding-bottom: px2rem(50px);
      .banner-content{
        position: relative;
        z-index: 1;
        .banner{
          width: px2rem(713px);
          height: px2rem(415px);
        }
        .time{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top:px2rem(350px);
          color:#B60703;
          font-size: px2rem(36px);
          width: 100%;
        }
      }
      .active-content{
        position: relative;
        height: px2rem(373px);
        padding-top: px2rem(71px);
        margin: 0 px2rem(30px) 0;
        text-align: center;
        background-color: #6A0B05;
        border-radius: px2rem(10px);
        .title{
          color:#FFFFFF;
          font-size: px2rem(38px);
          line-height: px2rem(40px);
          position: relative;
          display: inline-block;
          &::before{
            position: absolute;
            left: px2rem(-150px);
            top:px2rem(20px);
            width: px2rem(120px);
            height: px2rem(2px);
            content: '';
            background:-webkit-linear-gradient(to right,#6A0B05, #fee);

            background:-o-linear-gradient(to right,#6A0B05, #fee);

            background:-moz-linear-gradient(to right,#6A0B05, #fee);

            background:linear-gradient(to right,#6A0B05, #fee);

          }
          &::after{
            position: absolute;
            right: px2rem(-150px);
            top:px2rem(20px);
            width: px2rem(120px);
            height: px2rem(2px);
            content: '';
            background:-webkit-linear-gradient(to left,#6A0B05, #eee);

            background:-o-linear-gradient(to left,#6A0B05, #eee);

            background:-moz-linear-gradient(to left,#6A0B05, #eee);

            background:linear-gradient(to left,#6A0B05, #eee);

          }
        }
        .active-info{
          color:#fff;
          font-size: px2rem(28px);
          line-height: px2rem(32px);
          text-indent: px2rem(50px);
          margin: px2rem(45px) px2rem(49px) 0;
          text-align: left;
        }
      }
      .active{
        margin-top: px2rem(-20px);
      }
      .tip-content-outer{
        height: px2rem(336px);
        margin: px2rem(30px);
        padding-top: px2rem(71px);
        .arrow{
          width: px2rem(25px);
          height: px2rem(20px);
          margin-top: px2rem(30px);
        }
        .img1{
          width: px2rem(60px);
          height: px2rem(70px);
        }
        .img2{
          width: px2rem(82px);
          height: px2rem(69px);
        }
        .img3{
          width: px2rem(68px);
          height: px2rem(68px);
        }
        .img4{
          width: px2rem(68px);
          height: px2rem(67px);
        }
        .tip-content{
          margin: px2rem(50px) px2rem(10px) 0;
          flex-direction: row;
          display: flex;
          align-items: flex-start;
          justify-content: space-around;
          .tip{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            p{
              color:#fff;
              font-size: px2rem(24px);
              margin-top: px2rem(30px);
              line-height: px2rem(32px);
            }
          }
        }


      }
      .ruls-content{
        height: px2rem(538px);
        padding-top: px2rem(71px);
        .title{
          margin-bottom: px2rem(52px);
        }
        p{
          color:#fff;
          font-size: px2rem(28px);
          line-height: px2rem(32px);
          text-align:left;
          margin: 0 px2rem(46px) px2rem(30px);
        }

      }
      .btn{
        width: px2rem(526px);
        height:px2rem(92px);
        margin: px2rem(48px)  auto;
        line-height:px2rem(92px);
        border-radius:px2rem(38px);
        color:#C7211E;
        font-size:px2rem(40px);
        background: url("/static/images/activity/applet/newYearGreetCard/btn@2x.png") center no-repeat;
        background-size: px2rem(526px) px2rem(89px);
      }

    }

  }
</style>
<template>
    <div class="newYearGreetCard-guide-index">
      <activityHeader type="app" title="新年祝福卡来啦！"></activityHeader>
      <div class="main-containner">
        <div class="banner-content">
          <img class="banner" src="/static/images/activity/guide/newYearGreetCard/banner@2x.png"/>
          <div class="time">即日起截至{{activityInfo.endTime}}</div>
        </div>

        <div class="active-content active">
          <div class="title">活动内容</div>
          <p class="active-info">
            你点击分享活动，将活动分享给会员，会员点击链接进入活动根据页面提示邀请2位微信好友帮忙成功刮开祝福卡，会员即可获得门店的两张满减代金券（满{{activityInfo.firCouCond}}元减{{activityInfo.firCouQuota}}元，满{{activityInfo.secCouCond}}元减{{activityInfo.secCouQuota}}元）。在你的链接上获得满减券的会员到店消费，使用满{{activityInfo.firCouCond}}元券获得奖励{{activityInfo.firCouRewardMoney}}元，使用满{{activityInfo.secCouCond}}元券获得奖励{{activityInfo.secCouRewardMoney}}元。
          </p>
        </div>
        <div class="active-content tip-content-outer">
          <div class="title">操作步骤</div><br/>
          <div class="tip-content">
            <div class="tip">
              <img class="img1" src="/static/images/activity/guide/newYearGreetCard/tip1.png"/>
              <p>点击分享<br/>活动按钮</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/newYearGreetCard/arrow.png"/>
            <div class="tip">
              <img class="img2" src="/static/images/activity/guide/newYearGreetCard/tip2.png"/>
              <p>分享微信会员<br/>介绍优惠信息</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/newYearGreetCard/arrow.png"/>
            <div class="tip">
              <img class="img3" src="/static/images/activity/guide/newYearGreetCard/tip3.png"/>
              <p>会员使用<br/>满减券消费</p>
            </div>
            <img class="arrow" src="/static/images/activity/guide/newYearGreetCard/arrow.png"/>
              <div class="tip">
              <img class="img4" src="/static/images/activity/guide/newYearGreetCard/tip4.png"/>
              <p>你获得奖励</p>
            </div>

          </div>
        </div>
        <div class="active-content ruls-content">
          <div class="title">活动规则</div>
          <p>1. 会员只有完成邀请2位微信好友成功刮卡，才能获得门店满减券。</p>
          <p>2. 会员在你的链接上获得的满减券在门店成功消费，你才能获得奖励。</p>
          <p>3. 满减券仅可在身边店收银台及快速收银功能中时使用，但不支持与身边店余额同用。</p>
          <p>4. 如有问题请联系身边店客服：微信号sbdkffw。</p>
        </div>
        <div class="btn" @click="doShare">分享活动</div>

      </div>
    </div>
</template>

<script>
  import activityHeader from "@/components/common/activityHeader"
  import newYearGreetCard from "../../../../fetch/newYearGreetCard"
  import _urlConfig from "../../../../util/urlConfig"
  import * as _tool from "../../../../util/tool"
    export default{
        components: {
          activityHeader,

        },
        data () {
            return {
              token: this.$route.query.token,
              type: this.$route.query.type,
              activityCode: "10c56904f34341f1b6e679b5763cfb2a",
              activeStatus:0,
              activityInfo:{},
              shareContent: {
                title: "新年祝福卡来啦!",
                content: "",
                linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/newYearGreetCard_index",
                imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
              },
              linkUrl:_urlConfig.redirectBaseredirectURI + "/activity_2018/newYearGreetCard_index",

            }
        },
        computed: {},
        watch: {},
        methods: {
          //分享
          doShare: function(){
//            this.collect({
//              "xdCode": "XD0007",
//              "ydCode": "YD0010",
//              "activityCode": this.activityCode,
//            });
            WebViewJavascriptBridge.callHandler('share',this.shareContent,function(response) {
              alert("分享成功");
            });
          },
            getactivityInfo:function () {
              newYearGreetCard.activityInfo("post",{
                  activityCode:this.activityCode
              },this.token).then(res=>{
                if (res.returnCode === "0") {
                  this.activityInfo = res.returnContent;
                } else {
                  alert(res.message);
                }
              });
            },
          getShopGuideInfo: function(){
            newYearGreetCard.getShopGuideInfo("get",{},this.token).then((res)=>{
              if(res.returnCode==="0"){
//                this.linkUrl = this.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
//                this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/double_12_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0008";
//                let shareContent=this.shareContent;
//                shareContent.content=res.returnContent.storeName;
//                shareContent.imgUrl=res.returnContent.storeLogoUrl;
//                this.shareContent=shareContent;
                let shareContent=this.shareContent;
                shareContent.linkUrl=this.linkUrl+"?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                shareContent.content=res.returnContent.storeName;
                shareContent.imgUrl=res.returnContent.storeLogoUrl;
                this.shareContent=shareContent;

              }else{
                alert(res.message);
              }
            });
          },
        },
        created(){

        },
        mounted(){
          //初始化webViewJavascriptBridge
          _tool.webviewBridgeInit(this.type);
          this.getactivityInfo();
          this.getShopGuideInfo();
        }
    }
</script>
