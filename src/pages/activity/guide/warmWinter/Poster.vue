<template>
  <div class="warmwinter-guide-poster">
    <activityHeader type="perpage" title="暖冬型动 “羽”你相伴"></activityHeader>
    <div class="main-container">
      <img class="poster-bg"  :src="shareImg"/>
    </div>
    <div class="down-poster" @click="savePic">下载海报</div>
    <div class="share-link" @click="doShare">分享链接</div>
    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import api from '../../../../fetch/api'
  import _urlConfig from "../../../../util/urlConfig"
  import warmWinterApi from '../../../../fetch/warmwinter_api'
  import activityHeader from "@/components/common/activityHeader"
  import * as _tool from "../../../../util/tool"
  import loading from '@/components/common/loading'

  export default{
    components: {
      "v-loading": loading,
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        activityCode: "f7d09961e18611e8bc67704d7b87a020",
        shareImg: "",
        shareContent: {
          title: "暖冬型动 “羽”你相伴",
          content: "这个冬天佐米熊和您一起爱孩子！",
          linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/warmwinter_index",
          imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
        },
        loading:false,
        linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/warmwinter_index",
        qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/warmwinter_index",
        bg:"https://static.storeer.com//activity_2018/guide/warm_winter_bg.jpg",
      }
    },
    methods: {
      //数据收集
      collect: function(data){
        api.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {
            console.log(res);
        });
      },
      activityShareImage:function () {
        this.loading = true;
        this.shareContent.linkUrl = this.linkUrl;
        warmWinterApi.activityShareImage("post",{
          activityCode:this.activityCode,
          backgroundImgUrl:this.bg,
          startX:242,
          startY: 516,
          qrContent:this.qrCode,
          qrWidth:265,
          qrHeight:265
        },this.token).then((res)=>{
          if(res.returnCode==="0"){
            this.shareImg = res.returnContent;
          }else{
            alert(res.message);
          }
          this.loading = false;
        });
      },
      getShopGuideInfo: function(){
        api.getShopGuideInfo("get",{},this.token).then((res)=>{
          if(res.returnCode==="0"){
            this.linkUrl = this.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
            this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/warmwinter_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0008";
            this.activityShareImage();
          }else{
            alert(res.message);
          }
        });
      },
      //保存图片到本地
      savePic: function(){
        WebViewJavascriptBridge.callHandler('savePic',this.shareImg,function(response) {

        });
      },
      //分享
      doShare: function(){
        this.collect({
          "xdCode": "XD0007",
          "ydCode": "YD0010",
          "activityCode": this.activityCode,
//          "relBusinessCode": this.selectedProduct
        });
        this.shareContent.linkUrl=this.linkUrl;
        WebViewJavascriptBridge.callHandler('share',this.shareContent,function(response) {
          alert("分享成功");
        });
      },
    },
    mounted(){
      //初始化webViewJavascriptBridge
      _tool.webviewBridgeInit(this.type);
      this.getShopGuideInfo();

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .warmwinter-guide-poster {
    .main-container {
      position: relative;
      width: 100%;
      padding-top: px2rem(80px);
      background: rgba(236, 47, 30, 1);
      .poster-bg{
        position: absolute;
        left: 0;
        top:px2rem(80px);
        width: px2rem(750px);
        height: px2rem(1210px);
      }
      .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(1211px);
        z-index: 1;
      }
      .bg-font {
        position: absolute;
        left: px2rem(81px);
        top: px2rem(116px);
        z-index: 2;
        width: px2rem(514px);
        height: px2rem(429px);
      }
      .tip {
        position: absolute;
        left: px2rem(81px);
        top: px2rem(616px);
        font-size: px2rem(26px);
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: px2rem(35px);
        coplor: #fff;
        span {
          font-size: px2rem(34px);
          coplor: #FBF97B;
        }
        z-index: 2;
      }
      .qrcode {
        position: absolute;
        left: px2rem(79px);
        top: px2rem(744px);
        width: px2rem(265px);
        height: px2rem(265px);
        z-index: 2;
      }
      .qrcode-tip {
        position: absolute;
        left: px2rem(79px);
        top: px2rem(1030px);
        width: px2rem(265px);
        text-align: center;
        color: #fff;
        font-size: px2rem(30px);
        z-index: 2;
      }
    }
    .down-poster {
      position: absolute;
      left: px2rem(68px);
      bottom: px2rem(7px);
      width: px2rem(290px);
      height: px2rem(104px);
      line-height: px2rem(104px);
      background:#DA3938;
      text-align: center;
      color: #fff;
      font-size: px2rem(36px);
      z-index: 2;
      border-radius: px2rem(10px);
      font-weight: 600;
    }
    .share-link {
      position: absolute;
      left: px2rem(386px);
      bottom: px2rem(7px);
      width: px2rem(290px);
      height: px2rem(104px);
      line-height: px2rem(104px);
      background: #4E2713;
      text-align: center;
      color: #fff;
      font-size: px2rem(36px);
      z-index: 2;
      font-weight: 600;
      border-radius: px2rem(10px);
    }
  }
</style>


