<template>
  <div class="double-12-guide-poster">
    <activityHeader type="perpage" title="年末送礼冲业绩"></activityHeader>
    <div class="main-container">
      <img class="poster-bg"  :src="shareImg"/>
    </div>
    <div class="btn-content">
      <div class="down-poster" @click="savePic">下载海报</div>
      <div class="share-link" @click="doShare">分享链接</div>
    </div>

    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import api from '../../../../fetch/api'
  import double12Api from '../../../../fetch/double_12_api'
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
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        shareImg: "",
        shareContent: {
          title: "过年季，高档家电白送你！",
          content: "",
          linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/double_12_index",
          imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
        },
        loading:false,
        linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/double_12_index",
        qrCode: _urlConfig.redirectBaseredirectURI + "/activity_2018/double_12_index",
        bg:"https://static.storeer.com/activity_2018/guide/double12.jpg",
        activityInfo:{},

      }
    },
    watch:{
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
        double12Api.activityShareImage("post",{
          activityCode:this.activityCode,
          backgroundImgUrl:this.bg,
          startX:495,
          startY: 497,
          qrContent:this.qrCode,
          qrWidth:181,
          qrHeight:181
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
        double12Api.getShopGuideInfo("get",{},this.token).then((res)=>{
          if(res.returnCode==="0"){
            this.linkUrl = this.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
            this.qrCode = _urlConfig.redirectBaseredirectURI + "/activity_2018/double_12_index?storeCode=" + res.returnContent.storeCode + "&staffCode=" + res.returnContent.staffCode + "&xd_code=XD0008";
            let shareContent=this.shareContent;
          shareContent.content=res.returnContent.storeName;
          shareContent.imgUrl=res.returnContent.storeLogoUrl;
          this.shareContent=shareContent;
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

  .double-12-guide-poster {
    .main-container {
      position: relative;
      width: 100%;
      padding-top: px2rem(80px);
      /*background: rgba(236, 47, 30, 1);*/
      .poster-bg{
        position: absolute;
        left: 0;
        top:px2rem(80px);
        width: px2rem(750px);
        height: px2rem(1210px);
      }

    }
    .btn-content{
      width: 100%;
      height: px2rem(104px);
      position: fixed;
      left:0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #23035C;
      z-index: 9;
      .down-poster {
        width: 50%;
        height: px2rem(104px);
        line-height: px2rem(104px);
        background:rgba(83,21,177,1);
        box-shadow:0px 5px 6px 1px rgba(26,7,59,0.31), 0px 0px 40px 0px rgba(111,40,219,1);
        text-align: center;
        color: #fff;
        font-size: px2rem(36px);
        z-index: 2;
        font-weight: 600;
        border-radius: px2rem(10px);
      }
      .share-link {
        width: 50%;
        height: px2rem(104px);
        line-height: px2rem(104px);
        background:rgba(255,232,1,1);
        box-shadow:0px 5px 6px 1px rgba(255,232,1,0.31), 0px 0px 40px 0px rgba(241,165,0,1);
        text-align: center;
        color: #7E26F9;
        font-size: px2rem(36px);
        z-index: 2;
        border-radius: px2rem(10px);
        font-weight: 600;


      }
    }

  }
</style>


