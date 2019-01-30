<template>
  <div class="luckywheel">
    <div class="main-content">
      <v-LuckyWheel :prize_list="prize_list" :result_index="result_index"></v-LuckyWheel>
    </div>
  </div>
</template>

<script>
  import luckyWheel from '@/components/common/luckywheel'

  export default {
    components:{
      'v-LuckyWheel':luckyWheel,
    },
    data() {
      return {
        prize_list: [
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_500.png"), // 奖品图片
            count: 1, // 奖品数量
            name: "等奖", // 奖品名称
            isPrize: 1 // 该奖项是否为奖品
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_five.png"),
            count: 2,
            name: "等奖",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_one.png"),
            count: 3,
            name: "等奖",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/point_five.png"),
            count: 4,
            name: "积分",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/point_ten.png"),
            count: 5,
            name: "等奖",
            isPrize: 1
          }
        ],
        result_index:0,
      };
    },

    computed: {

    },
    methods: {

    },
    created() {

    },
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../assets/css/function';

  .luckywheel {
    position: relative;
    width: 100%;
    height: 100%;

    .main-content{
      /*
      轮子
      */
      .wheel-main {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .wheel-pointer-box {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 100;
          transform: translate(-50%, -60%);
          width: px2rem(170px);
          height: px2rem(170px);
          .wheel-pointer {
            width: px2rem(170px);
            height: px2rem(170px);
            background: url("/static/images/activity/applet/luckywheel/draw_btn.png") no-repeat center top;
            background-size: 100%;
            transform-origin: center 60%;
          }

        }

        .wheel-bg {
          width: px2rem(590px);
          height: px2rem(590px);
          background: url("/static/images/activity/applet/luckywheel/draw_wheel2.png") no-repeat center top;
          background-size: 100%;
          color: #fff;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          transition: transform 3s ease;
          .prize-list {
            width: 100%;
            height: 100%;
            position: relative;
            .prize-item {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
              width: px2rem(250px);
              height: px2rem(300px);
              .prize-pic img {
                width: px2rem(130px);
                height: px2rem(80px);
                margin-top: px2rem(50px);
              }
              .prize-count {
                font-size: px2rem(28px);
              }

              .prize-type {
                font-size: px2rem(24px);
              }

            }
            .prize-item:first-child {
              top: px2rem(22.5px);
              left: px2rem(266px);
              transform: rotate(36deg);
            }

            .prize-item:nth-child(2) {
              top: px2rem(187.5px);
              left: px2rem(337.5px);
              transform: rotate(108deg);
            }

            .prize-item:nth-child(3) {
              top: px2rem(292.5px);
              left:px2rem(172.5px);
              transform: rotate(180deg);
            }

            .prize-item:nth-child(4) {
              top: px2rem(187.5px);
              left:px2rem(15px);
              transform: rotate(252deg);
            }

           .prize-item:nth-child(5) {
              top: px2rem(22.5px);
              left: px2rem(75px);
              transform: rotate(324deg);
            }
          }

        }
        .wheel-bg div {
          text-align: center;
        }
      }

    }
  }
</style>
