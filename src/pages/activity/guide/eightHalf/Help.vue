<template>
  <div class="eight-half-guide-help">
    <!--<activityHeader type="app" title="帮助中心"></activityHeader>-->

    <div class="main-container">
      <!--<a><img :src="imgUrl"/></a>-->
      <a :href="imgLink"><img :src="imgUrl"/></a>
    </div>

  </div>
</template>

<script>
  import eightHalfApi from '../../../../fetch/eightHalf'
  import activityHeader from '@/components/common/activityHeader'
  export default{
    components: {
//      activityHeader: activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        imgUrl:'',
        imgLink:''
      }
    },
    computed: {},
    watch: {},
    methods: {
        getImg:function () {
          eightHalfApi.getMaterialUrl("get",{}).then((res)=>{
              if(res.returnCode==='0'){
                  this.imgUrl=res.returnContent.helpPicUrl;
                  this.imgLink=res.returnContent.helpPicLink;
              }else {
                  this.$toast(res.message);
              }
          });
        }
    },
    created(){},
    mounted() {
        this.getImg();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .eight-half-guide-help {
    position: relative;
    overflow: hidden;
    height: 100%;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .main-container{
      position: relative;
      width: 100%;
      height: 100%;
      overflow: auto;
      z-index: 1;
      img{
        width: 100%;
        height: auto;
      }
    }
  }
</style>
