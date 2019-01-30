<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../assets/css/function';
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
.eight-half-detail {
  position: unset;
    width: 100%;
    /*height: auto !important;*/
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .item{
      display: block;
      width: 100%;
      .img-box{
        display: block;
        width: 100%;
        img {
          display: block;
          width: 100%;
        }
      }
    }



}
</style>
<template>
    <div class="eight-half-detail">
        <div class="item img" v-for="item in productInfo.picDetailUrls" >
          <div class="img-box">
            <img :src="item+ '?imageslim'" alt>
          </div>
        </div>
    </div>
</template>

<script>
  import eightHalfApi from '../../../../fetch/eightHalf'
    export default{
        components: {},
        data () {
            return {
              productCode: this.$route.query.productCode,//产品编号
              token:this.$route.query.token,
              productInfo:{},

            }
        },
        watch: {},
        methods: {
          //请求数据
          getProductInfo: function () {
            eightHalfApi.getProductDetail_guide("get", {
              productCode: this.productCode,
            }, this.token).then((res) => {
              if (res.returnCode === '0') {
                this.productInfo = res.returnContent;
              } else {
                this.$toast(res.message);
              }
            });
          },
        },
        created(){

        },
        mounted(){
          this.getProductInfo();
        }
    }
</script>
