<template>
  <div class="luckywheel">
    <div class="wheel-main">
      <div class="wheel-pointer-box">
        <div class="wheel-pointer" @click="rotate_handle()"
             :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
      </div>
      <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
        <div class="prize-list">
          <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
            <div class="prize-pic">
              <img :src="item.icon">
            </div>
            <div class="prize-count" v-if="item.count">
              {{item.count}}
            </div>
            <div class="prize-type">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        easejoy_bean: 0, //金豆
        lottery_ticket: 0, //抽奖次数
        result_angle: [324, 252, 180, 108, 36],
         //最终会旋转到下标的位置所需要的度数
        // result_index:0,// 最终要旋转到哪一块，对应prize_list的下标
        toast_control: false, //抽奖结果弹出框控制器
        hasPrize: false, //是否中奖
        start_rotating_degree: 0, //初始旋转角度
        rotate_angle: 0, //将要旋转的角度
        start_rotating_degree_pointer: 0, //指针初始旋转角度
        rotate_angle_pointer: 0, //指针将要旋转的度数
        rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
        rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        click_flag: true, //是否可以旋转抽奖
      }
    },
    props: {
      prize_list: {
        type: Array,
        default() {
          return []
        }
      },
      result_index: {
        type: Number,
        default() {
          return 0
        }
      },
    },

    computed: {

      toast_title() {
        return this.hasPrize
          ? "恭喜您，获得" + this.prize_list[this.result_index].count + ' ' + this.prize_list[this.result_index].name
          : "未中奖";
      },
      toast_pictrue() {
        return this.hasPrize
          ? require("../../../static/images/activity/applet/luckywheel/congratulation.png")
          : require("../../../static/images/activity/applet/luckywheel/sorry.png");
      }
    },
    methods: {
      //此方法为处理奖品数据
      init_prize_list(list) {
      },
      rotate_handle() {
        // var result_index = parseInt(Math.random() * 6);
        // // this.result_index = 4; //指定每次旋转到的奖品下标
        // this.result_index = result_index; //指定每次旋转到的奖品下标
        this.rotating();
      },
      rotating() {
        if (!this.click_flag) return;
        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        var rand_circle = 6; // 附加多转几圈，2-3
        this.click_flag = false; // 旋转结束前，不允许再次触发
        if (type == 0) {
          // 转动盘子
          var rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 +
            this.result_angle[this.result_index] -
            this.start_rotating_degree % 360;
          this.start_rotating_degree = rotate_angle;
          this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          // // //转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
          // this.start_rotating_degree_pointer =360*rand_circle;
          var that = this;
          // 旋转结束后，允许再次触发
          setTimeout(function () {
            that.click_flag = true;
            that.game_over();
          }, during_time * 1000 + 1500); // 延时，保证转盘转完
        } else {
          //
        }
      },
      game_over() {
        this.toast_control = true;
        this.hasPrize = this.prize_list[this.result_index].isPrize
      },
      //关闭弹窗
      close_toast() {
        this.toast_control = false;
      }
    },
    created() {
      this.init_prize_list();
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/css/function';

  .luckywheel {
    position: relative;
    width: 100%;
    height: 100%;

    .main-content {
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
              left: px2rem(172.5px);
              transform: rotate(180deg);
            }

            .prize-item:nth-child(4) {
              top: px2rem(187.5px);
              left: px2rem(15px);
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
