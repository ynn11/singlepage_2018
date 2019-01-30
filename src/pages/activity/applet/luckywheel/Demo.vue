<template>
  <div class="luckywheel">
      <div class="luckywheel-content">
        <div class="lucky-wheel">
          <div class="lucky-title"></div>
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
        <div class="main">
          <div class="main-bg"></div>
          <div class="bg-p"></div>
          <div class="content">
            <div class="lottery_ticket">今日免费抽奖次数： {{ lottery_ticket}}</div>
          </div>
          <div class="tip">
            <div class="tip-title">活动规则</div>
            <div class="tip-content">
              <p> 1.每日签到后，即可获得一次幸运大转盘的机会，仅限当天有效，过期作废。 2.金币抽奖，每10个金豆可兑换一次大转盘机会。</p>
              <p> 2.金币抽奖，每10个金豆可以兑换一次大转盘抽奖机会</p>
              <p> 3.所中金豆或积分到【我的账户】中查询。累计达到100金豆及以上，可以兑换相应奖品</p>
            </div>
          </div>
        </div>
        <div class="toast" v-show="toast_control">
          <div class="toast-container">
            <img :src="toast_pictrue" class="toast-picture">
            <div class="close" @click="close_toast()"></div>
            <div class="toast-title">
              {{toast_title}}
            </div>
            <div class="toast-btn">
              <div class="toast-cancel" @click="close_toast">关闭</div>
            </div>
          </div>
        </div>
        <div class="toast-mask" v-show="toast_control"></div>
      </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        easejoy_bean: 0, //金豆
        lottery_ticket: 0, //抽奖次数
        prize_list: [
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_500.png"), // 奖品图片
            count: 10, // 奖品数量
            name: "易趣豆", // 奖品名称
            isPrize: 1 // 该奖项是否为奖品
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_five.png"),
            count: 5,
            name: "豆",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_one.png"),
            count: 10,
            name: "易趣豆",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/point_five.png"),
            count: 5,
            name: "积分",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/point_ten.png"),
            count: 10,
            name: "积分",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_500.png"),
            count: 10,
            name: "易趣豆",
            isPrize: 1
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/give_up.png"),
            count: 0,
            name: "未中奖",
            isPrize: 0
          },
          {
            icon: require("../../../../../static/images/activity/applet/luckywheel/bean_500.png"),
            count: 10,
            name: "易趣豆",
            isPrize: 1
          }
        ], //奖品列表
        toast_control: false, //抽奖结果弹出框控制器
        hasPrize: false, //是否中奖
        start_rotating_degree: 0, //初始旋转角度
        rotate_angle: 0, //将要旋转的角度
        start_rotating_degree_pointer: 0, //指针初始旋转角度
        rotate_angle_pointer: 0, //指针将要旋转的度数
        rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
        rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        click_flag: true, //是否可以旋转抽奖
        index: 0
      };
    },
    created() {
      this.init_prize_list();
    },
    computed: {
      toast_title() {
        return this.hasPrize
          ? "恭喜您，获得" + this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
          : "未中奖";
      },
      toast_pictrue() {
        return this.hasPrize
          ? require("../../../../../static/images/activity/applet/luckywheel/congratulation.png")
          : require("../../../../../static/images/activity/applet/luckywheel/sorry.png");
      }
    },
    methods: {
      //此方法为处理奖品数据
      init_prize_list(list) {
      },
      rotate_handle() {
        var index = parseInt(Math.random() * 9);
        this.index = index; //指定每次旋转到的奖品下标
        this.rotating();
      },
      rotating() {
        if (!this.click_flag) return;
        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        var random = Math.floor(Math.random() * 7);
        var result_index = this.index; // 最终要旋转到哪一块，对应prize_list的下标
        var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
        var rand_circle = 6; // 附加多转几圈，2-3
        this.click_flag = false; // 旋转结束前，不允许再次触发
        if (type == 0) {
          // 转动盘子
          var rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 +
            result_angle[result_index] -
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
        this.hasPrize = this.prize_list[this.index].isPrize
      },
      //关闭弹窗
      close_toast() {
        this.toast_control = false;
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../../../assets/css/function';
  .luckywheel {
    position: relative;
    width: 100%;
    height: 100%;

    .luckywheel-content {
      width: 100%;
      height: 100%;

      .lucky-wheel {
        width: 100%;
        height: px2rem(1010px);
        background: rgb(252, 207, 133) url("/static/images/activity/applet/luckywheel/color_pillar.png") no-repeat center bottom;
        background-size: 100%;
        padding-top:px2rem(50px);
      }

      .lucky-title {
        width: 100%;
        height: px2rem(230px);
        background: url("/static/images/activity/applet/luckywheel/lucky_title.png") no-repeat center top;
        background-size: 100%;
      }

      .wheel-main {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .wheel-bg {
        width: px2rem(590px);
        height: px2rem(590px);
        background: url("/static/images/activity/applet/luckywheel/draw_wheel.png") no-repeat center top;
        background-size: 100%;
        color: #fff;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        transition: transform 3s ease;
      }

      .wheel-pointer-box {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform: translate(-50%, -60%);
        width: px2rem(170px);
        height: px2rem(170px);
      }

      .wheel-pointer {
        width: px2rem(170px);
        height: px2rem(170px);
        background: url("/static/images/activity/applet/luckywheel/draw_btn.png") no-repeat center top;
        background-size: 100%;
        transform-origin: center 60%;
      }

      .wheel-bg div {
        text-align: center;
      }

      .prize-list {
        width: 100%;
        height: 100%;
        position: relative;
      }

      .prize-list .prize-item {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }

      .prize-list .prize-item:first-child {
        top: 0;
        left: px2rem(266px);
        transform: rotate(20deg);
      }

      .prize-list .prize-item:nth-child(2) {
        top: px2rem(90px);
        left: px2rem(337.5px);
        transform: rotate(67deg);
      }

      .prize-list .prize-item:nth-child(3) {
        top: px2rem(204.8px);
        left: px2rem(339.2px);
        transform: rotate(-250deg);
      }

      .prize-list .prize-item:nth-child(4) {
        top: px2rem(288px);
        left:px2rem(262.8px);
        transform: rotate(-210deg);
      }

      .prize-list .prize-item:nth-child(5) {
        top: px2rem(292px);
        left: px2rem(140.8px);
        transform: rotate(-160deg);
      }

      .prize-list .prize-item:nth-child(6) {
        top: px2rem(204.4px);
        left: px2rem(60.8px);
        transform: rotate(-111deg);
      }

      .prize-list .prize-item:nth-child(7) {
        top: px2rem(89.6px);
        left: px2rem(58px);
        transform: rotate(-69deg);
      }

      .prize-list .prize-item:nth-child(8) {
        top: 0;
        left: px2rem(144px);
        transform: rotate(-20deg);
      }

      .prize-item {
        width: px2rem(188px);
        height: px2rem(288px);
      }

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

      .main {
        position: relative;
        width: 100%;
        min-height:px2rem(456px);
        background: rgb(243, 109, 86);
        padding-bottom: px2rem(54px);
      }

      .main-bg {
        width: 100%;
        height: px2rem(210px);
        position: absolute;
        top: px2rem(-110px);
        left: 0;
        background: url("/static/images/activity/applet/luckywheel/luck_bg.png") no-repeat center top;
        background-size: 100%;
      }

      .bg-p {
        width: 100%;
        height: px2rem(94.4px);
        background: rgb(252, 207, 133);
      }

      .content {
        position: absolute;
        top: px2rem(5.6px);
        left: 0;
        background: rgb(243, 109, 86);
        width: 100%;
        height: px2rem(188px);
        font-size: px2rem(36px);
        color: #ffeb39;
        padding-left:px2rem(24px);
      }

      .content div {
        text-align: left;
      }

      .tip {
        position: relative;
        margin: px2rem(80px) auto 0;
        width: px2rem(560px);
        border: 1px solid #fbc27f;
      }

      .tip-title {
        position: absolute;
        top: -1rem;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: px2rem(32px);
        color: #fccc6e;
        background: rgb(243, 109, 86);
        padding: px2rem(10px) px2rem(20px);
      }

      .tip-content {
        padding: px2rem(50px) px2rem(20px);
        font-size: px2rem(28px);
        color: #fff8c5;
        line-height: 1.5;
      }

      .toast-mask {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10000;
        width: 100%;
        height: 100%;
      }

      .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 20000;
        transform: translate(-50%, -50%);
        width: px2rem(494px);
        background: #fff;
        border-radius: px2rem(10px);
        padding:px2rem(10px);
        background-color: rgb(252, 244, 224);
      }

      .toast-container {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px dotted #fccc6e;
      }

      .toast-picture {
        position: absolute;
        top: px2rem(-208px);
        left: px2rem(-45px);
        width: px2rem(600px);
        height: px2rem(274px);
      }

      .toast-pictrue-change {
        position: absolute;
        top: px2rem(-48px);
        left: px2rem(-44px);
        width: px2rem(560px);
        height: px2rem(100px);
      }

      .toast-title {
        padding: px2rem(90px) 0;
        font-size: 18px;
        color: #fc7939;
        text-align: center;
      }

      .toast-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: px2rem(30px);
      }

      .toast-btn div {
        background-image: -moz-linear-gradient(
            -18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%
        );

        background-image: -ms-linear-gradient(
            -18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%
        );
        background-image: -webkit-linear-gradient(
            -18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%
        );
        box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
        width: px2rem(150px);
        height: px2rem(60px);
        border-radius: px2rem(60px);
        text-align: center;
        line-height: px2rem(60px);
        color: #fff;
      }

      .close {
        position: absolute;
        top:px2rem(-30px);
        right: px2rem(-30px);
        width: px2rem(64px);
        height: px2rem(64px);
        background: url("/static/images/activity/applet/luckywheel/close_store.png") no-repeat center top;
        background-size: 100%;
      }
    }
  }
</style>

