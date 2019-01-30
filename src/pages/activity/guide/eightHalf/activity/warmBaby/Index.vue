<style lang="scss" rel="stylesheet/scss">
  @import '../../../../../../assets/css/function';
  .eightHalf_activ_warmBaby_index{
    position: relative;
    height: 100%;
    background-color: #E7587C;
    *{
      font-weight: bold !important;
    }
    .main-containner{
      /*height: 100%;*/
      /*overflow: scroll;*/
      padding-top: px2rem(80px);

      .banner-content{
        width: 100%;
        height: px2rem(975px);
        position: relative;
        z-index: 2;
        .banner{
          width: 100%;
          height: px2rem(975px);
          z-index: 1;
        }
        .tip-content-outer{
          position: relative;
          bottom: px2rem(100px);
          /*<!--left: 50%;-->*/
          /*<!--transform: translateX(-50%);-->*/
          transform: translateY(-50%);
          height: px2rem(363px);
          border-radius: px2rem(10px);
          background-color: #fff;
          margin: 0 px2rem(35px);
          .title{
            position: absolute;
            top:px2rem(-40px);
            left: 50%;
            transform: translateX(-50%);
            width: px2rem(342px);
            height: px2rem(72px);
            line-height: px2rem(72px);
            background: url("/static/images/activity/guide/eightHalf/activity/warmBaby/title.png") center no-repeat;
            background-size: 100%;
            color:#fff;
            font-size: px2rem(32px);
            text-align: center;
          }
          .tip-content{
            position: absolute;
            left:50%;
            transform: translateX(-50%);
            top:px2rem(60px);
            width: 80%;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-wrap: wrap;
            .arrow{
              width: px2rem(24px);
              height: px2rem(20px);
              margin-top: px2rem(15px);
            }
            .img1{
              width: px2rem(54px);
              height: px2rem(53px);
            }
            .img2{
              width: px2rem(45px);
              height: px2rem(53px);
            }
            .img3{
              width: px2rem(56px);
              height: px2rem(47px);
            }
            .img4{
              width: px2rem(54px);
              height: px2rem(54px);
            }
            .img5{
              width: px2rem(50px);
              height: px2rem(50px);
            }

            .tip{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              p{
                color:#333333;
                font-size: px2rem(24px);
                margin-top: px2rem(10px);
                text-align: center;
              }
            }
          }
          .tip-content2{
            top:px2rem(230px);
            justify-content: space-around;
            width: 40%;
            padding-right: 40%;
          }

        }
      }

      .info-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: px2rem(50px) px2rem(35px);
        z-index: 1;
        .tip{
          height: px2rem(357px);
          display: flex;
          justify-content: center;
          line-height: px2rem(32px);
          margin-left: px2rem(20px);
          align-items: center;
          font-size: px2rem(26px);
          color:#fff;
        }
        .info-img{
          width: px2rem(353px);
          height: px2rem(357px);
          position: relative;
          .cat{
            width: px2rem(353px);
            height: px2rem(357px);
            z-index: 1;
          }
          .over{
            position: absolute;;
            right: 8%;
            top:50%;
            width: px2rem(161px);
            height: px2rem(161px);
            z-index: 2;
          }

        }

      }
      .caption{
        font-size: px2rem(30px);
        color:#fff;
        text-align: center;
        span{
          text-decoration: line-through;
        };
      }
      .count-content{
        margin: px2rem(20px) px2rem(35px);
        background-color: #fff;
        border-radius: px2rem(10px);
        height: px2rem(320px);
        padding-top: px2rem(54px);
        h3{
          color: #4D4D4D;
          font-size: px2rem(26px);
          text-align: center;
          margin: 0 auto px2rem(35px);
          span{
            color:#FF638A;
          }
          .num{
            font-size: px2rem(30px);
          }
        }
        .count{
          margin: 0 px2rem(30px);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          label{
            width: px2rem(80px);
            height: px2rem(80px);
            line-height: px2rem(80px);
            border-radius: 100%;
            color:#999999;
            border:1px solid #DCDCDC;
            font-size: px2rem(36px);
            text-align: center;
            background-color: #fff;
            margin:px2rem(15px) px2rem(18px);
          }
          label.select{
            color:#FFFFFF;
            background-color: #F64E78;
          }
        }
      }
      .ruls-content{
        height: px2rem(665px);
        border-radius: px2rem(10px);
        background-color: #fff;
        margin: px2rem(128px) px2rem(35px);
        position: relative;
        padding-top: px2rem(88px);
        .title{
          position: absolute;
          top:px2rem(-40px);
          left: 50%;
          transform: translateX(-50%);
          width: px2rem(342px);
          height: px2rem(72px);
          line-height: px2rem(72px);
          background: url("/static/images/activity/guide/eightHalf/activity/warmBaby/title.png") center no-repeat;
          background-size: 100%;
          color:#fff;
          font-size: px2rem(32px);
          text-align: center;
        }
        p{
          color:#4D4D4D;
          font-size: px2rem(28px);
          margin: px2rem(30px);
          line-height: px2rem(35px);
        }

      }

    }
    .main-containner2{
      /*overflow: hidden;*/
      position: relative;
      padding-top: px2rem(80px);
      padding-bottom: px2rem(50px);
      width: 100%;
      height: 100%;
      background: url("/static/images/activity/guide/eightHalf/activity/warmBaby/beijing@2x.png") center no-repeat;
      background-size: 100%;
      text-align: center;
      /*&.static{*/
        /*overflow: scroll;*/
      /*}*/
      .banner{
        width: px2rem(671px);
        height: px2rem(300px);
        margin: 0 auto;
      }
      .info{
        font-size: px2rem(24px);
        color:#fff;
        line-height: px2rem(30px);
        text-indent: px2rem(30px);
        text-align: left;
        margin: px2rem(49px) px2rem(53px) px2rem(40px);
      }
      .rank-content{
        background-color: #fff;
        border-radius: px2rem(10px);
        margin: 0 px2rem(45px);
        padding-bottom: px2rem(60px);
        .rank-list{
          height: px2rem(450px);
          overflow: hidden;
          .rank{
            margin: 0 px2rem(40px);
            border-bottom: 1px solid #E5E5E5;
            height: px2rem(90px);
            /*line-height: px2rem(101px);*/
            font-size: px2rem(24px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            color:#666666;
            label{
              color:#F64E78;
            }
          }
        }
        .rank-more{
          height: auto;

        }

        .more{
          width:px2rem(229px);
          height:px2rem(60px);
          line-height:px2rem(60px);
          border:1px solid rgba(255,99,138,1);
          border-radius:px2rem(10px);
          color:#F64E78;
          font-size: px2rem(24px);
          text-align: center;
          margin: px2rem(50px) auto 0;
        }
      }
      .tip{
        margin: px2rem(50px) px2rem(110px);
        color: #fff;
        font-size: px2rem(24px);
        line-height: px2rem(32px);
      }
    }
  }
</style>
<template>
    <div class="eightHalf_activ_warmBaby_index">
      <activityHeader type="app" title="动动手指就能获得充电暖宝宝"></activityHeader>
      <div class="main-containner" v-show="activityInfo.activityStatus==1">
        <div class="banner-content">
          <img class="banner" src="/static/images/activity/guide/eightHalf/activity/warmBaby/banner@2x.png"/>
          <div class="tip-content-outer">
            <div class="title">如何获得礼品</div>
            <div class="tip-content">
              <div class="tip">
                <img class="img1" src="/static/images/activity/guide/eightHalf/activity/warmBaby/tip1.png"/>
                <p>选择商品</p>
              </div>
              <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/warmBaby/arrow.png">
              <div class="tip">
                <img  class="img2" src="/static/images/activity/guide/eightHalf/activity/warmBaby/tip2.png"/>
                <p>立即分享<br/>商品链接</p>
              </div>
              <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/warmBaby/arrow.png">
              <div class="tip">
                <img  class="img3" src="/static/images/activity/guide/eightHalf/activity/warmBaby/tip3.png"/>
                <p>选择发送给微信好友<br/>或分享到朋友圈</p>
              </div>

            </div>
            <div class="tip-content tip-content2">
              <div class="tip">
                <img  class="img4" src="/static/images/activity/guide/eightHalf/activity/warmBaby/tip4.png"/>
                <p>达成任务</p>
              </div>
              <img class="arrow" src="/static/images/activity/guide/eightHalf/activity/warmBaby/arrow.png">
              <div class="tip">
                <img  class="img5" src="/static/images/activity/guide/eightHalf/activity/warmBaby/tip5.png"/>
                <p>获得礼品</p>
              </div>
            </div>
          </div>
        </div>
        <div class="info-content">
          <div class="tip">有了它，<br/>再也不必担心冬天手冷。<br/>有了它，<br/>手机随时随地都能充电。
          </div>
          <div class="info-img">
            <img class="cat" src="/static/images/activity/guide/eightHalf/activity/warmBaby/cat.png"/>
            <img class="over" v-show="activityData.activityFinishStatus==1" src="/static/images/activity/guide/eightHalf/activity/warmBaby/commplete.png"/>
          </div>

        </div>
        <h3 class="caption">猫爪暖手宝&充电宝 <span>市场售价198元</span></h3>
        <div class="count-content">
          <h3>还差<span class="num">{{activityData.actPercentNum-activityData.curProcessNum}}</span><span>天</span>登陆分享就可以获得猫爪暖手宝哦</h3>
          <div class="count">
            <label v-for="n in activityData.actPercentNum" :class="n<=activityData.curProcessNum?'select':''">{{n}}</label>
          </div>
        </div>
        <div class="ruls-content">
          <div class="title">活动规则</div>
          <p>1. 活动时间：{{activityInfo.beginTime}}-{{activityInfo.endTime}}</p>
          <p>2. 在活动期间有10天登陆app并分享商品链接到微信，则可以获得充电暖宝宝。</p>
          <p>3. 每个导购仅限参与1次活动。</p>
          <p>4. 奖品发放：活动结束后，3个工作日后统一寄出。</p>
          <p>5. {{activityInfo.actLimitNum}}个获奖名额，先到先得。</p>
          <p>6. 如有问题请联系客服。电话客服15372072897微信客服：13735433487。</p>
          <p>7. 如有发生作弊行为，则取消获奖资格。活动解释权归身边店所有。</p>
        </div>
      </div>
      <div class="main-containner2"  v-show="activityInfo.activityStatus==2">
        <img  class="banner" src="/static/images/activity/guide/eightHalf/activity/warmBaby/banner2@2x.png"/>
        <p class="info">恭喜以下100位精英导购获得了李总的暖心礼品，请大家耐心等待，身边店客服会尽快将礼品寄送到您的门店。如未收到奖品，请记得联系客服哦～</p>
        <div class="rank-content">
          <div :class="'rank-list '+[showMore?'rank-more':'']">
            <div class="rank" v-for="(item,index) in activityData">
              <label>No.{{item.id}}</label>
              <p>{{item.staffName}}/{{item.storeName}}</p>
            </div>
          </div>

          <div class="more" @click="showMore=!showMore">{{showMore?'点击收缩':'点击查看更多'}}</div>
        </div>
        <div class="tip">如果名单中没有你，不要气馁，积极分享商品，<br/>就能获得更多的现金分红！</div>
      </div>
    </div>
</template>

<script>
  import activityHeader from "@/components/common/activityHeader"
  import eightHalfApi from "../../../../../../fetch/eightHalf"
    export default{
        components: {
          activityHeader
        },
        data () {
            return {
              token:this.$route.query.token,
              xd_code:this.$route.query.xd_code,
              type: this.$route.query.type,
              activityCode: "53c907cd924549cd81fa607cdc340dc7",
              showMore:false,
              activityInfo:{},
              activityData:{},
            }
        },
        computed: {

        },
        watch: {
          activityInfo(){
            if(this.activityInfo.activityStatus==2){
              let activityData=this.activityData;
              for(var item in activityData){
                activityData[item].staffName=activityData[item].staffName.split("")[0]+"**";
              }
              this.activityData=activityData;
            }
          }
        },
        methods: {
          //数据收集
          collect(data){
            eightHalfApi.guidecollectData("post", data,this.token).then(res => {
            });
          },
          getActivityInfo:function () {
            eightHalfApi.activityInfo("post",{
              activityCode:this.activityCode
            },this.token).then(res=>{
              if(res.returnCode==="0"){
                this.activityInfo=res.returnContent;
              } else {
                alert(res.message);
              }
            })
          },
          getActivityDataStaff:function () {
            eightHalfApi.activityDataStaff("post",{
              activityCode:this.activityCode
            },this.token).then(res=>{
              if(res.returnCode==="0"){
                this.activityData=res.returnContent;
                this.getActivityInfo();
              } else {
                alert(res.message);
              }
            })
          }
        },
        created(){
          this.collect({
            "xdCode": this.xd_code,
            "ydCode": "YD0011",
            "tsActivityCode":this.activityCode,
          });
        },
        mounted(){

            this.getActivityDataStaff();
        }
    }
</script>
