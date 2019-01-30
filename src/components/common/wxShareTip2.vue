<template>
  <div class="shareTip-contain" v-show="shareTipShow"  @click="closeTip">
    <div class="mask"></div>
    <div class="contain">
      <img src="/static/images/activity/applet/double_11/share.png" alt="">
      <div><pre>{{tip}}</pre></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      shareTipShow: Boolean,
      isClose:Boolean,
      notice:String,
    },
    watch:{
      notice:{
        handler(newValue,oldValue){
          this.tip=this.$parent.notice||"点击右上角，选择分享到朋友圈，\n成功分享获取积分！";
        },
        deep:true
      },
      tip(){
          return this.$parent.notice||"点击右上角，选择分享到朋友圈，\n成功分享获取积分！";
      }
    },
    data () {
      return {
          tip:this.$parent.notice||"点击右上角，选择分享到朋友圈，\n成功分享获取积分！"
      }
    },
    methods: {
      closeTip: function () {
          if(this.$parent.isClose){
//            console.log(1);
            this.$parent.shareTipShow = false;
          }
      }
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/css/function';

  .shareTip-contain {
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
    text-align: center;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .8);
    }
    .contain {
      position: relative;
      img {
        width: px2rem(485px);
        height: px2rem(420px);
        margin: px2rem(25px) px2rem(19px) px2rem(59px) px2rem(246px);
      }
      div{
        font-size:px2rem(32px);
        font-weight:500;
        color:rgba(255,223,45,1);
        line-height:px2rem(48px);
        margin: 0 auto;
      }
    }
  }
</style>
