<template>
  <div class="double-12-guide-elecEquip">
    <activityHeader type="perpage" title="年末送礼冲业绩"></activityHeader>
    <div class="main-container">
      <div class="card1">
        <h3 class="title">兑换流程</h3>
        <p>选择兑换会员---选择兑换礼品---点击确认兑换
          ---输入会员收货信息---确定兑换---会员等待发货</p>
      </div>
      <h3 class="tip1">以下会员已达到兑换标准<br/>请选择兑换会员</h3>
      <p class="tip2">注意：兑换单次有效，兑换成功后会员本次兑换资格即失效</p>
      <div class="list-content">
        <div class="list-item" v-for="item in memberList" @click="goVerif(item)">
          <div class="name">{{item.trueName}}<br/>{{item.mobileNum}}</div>
          <div class="money">实际付款<br/><span>{{item.totalOrderMoney}}</span></div>
          <img class="icon" src="/static/images/activity/up_grey.png"/>

        </div>
      </div>
    </div>

    <!-- loading -->
    <v-loading v-show="loading"></v-loading>
  </div>
</template>

<script>
  import api from '../../../../fetch/api'
  import _urlConfig from "../../../../util/urlConfig"
  import double12Api from '../../../../fetch/double_12_api'
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
        loading: false,
        memberList:[],

      }
    },
    methods: {
      //数据收集
      collect: function (data) {
        api.collectStatisticsOnActivitiesByStaff("post", data, this.token).then(res => {
          console.log(res);
        });
      },
      getOrderInfoEditByStaff: function () {
        double12Api.activityOrderInfoEditByStaff("post", {
          activityCode: this.activityCode
        }, this.token).then((res) => {
          if (res.returnCode === "0") {
            this.memberList = res.returnContent;
          } else {
            alert(res.message);
          }
        });
      },
      goVerif(item) {
        let src = "/activity_2018/double_12_guide_elecEquipVerif" + "?token=" + (this.token)+ "&staffCode=" + (this.staffCode || "") + "&xd_code=" + (this.xd_code || "")+"&memberCode="+item.memberCode;
        this.$router.push({
          path: src
        })
      }
    },
    mounted(){
      this.getOrderInfoEditByStaff();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-12-guide-elecEquip {
    .main-container {
      position: relative;
      min-height: 100%;
      background-color: #12013A;
      text-align: center;
      padding: px2rem(80px) px2rem(57px);
      .card1 {
        margin: px2rem(53px) auto;
        padding: px2rem(42px) px2rem(28px);
        border-radius: px2rem(10px);
        background-color: #fff;
        .title {
          color: #FBBD01;
          font-size: px2rem(36px);
          display: inline-block;
          position: relative;
        }
        .title::before {
          position: absolute;
          content: ' ';
          width: 0.38667rem;
          height: 0.06667rem;
          background: #fbbd01;
          border-radius: 3px;
          left: -25%;
          top: 31%;
        }
        .title::after {
          position: absolute;
          content: ' ';
          width: 0.38667rem;
          height: 0.06667rem;
          background: #fbbd01;
          border-radius: 3px;
          right: -25%;
          top: 31%;
        }
        p {
          font-size: px2rem(24px);
          font-weight: 500;
          text-align: left;
          margin-top: px2rem(29px);
          color: rgba(102, 102, 102, 1);
          line-height: px2rem(36px);
        }
      }
      .tip1 {
        color: #FBBD01;
        font-size: px2rem(36px);
        line-height: px2rem(42px);
        text-align: left;
      }
      .tip2 {
        color: #fff;
        font-size: px2rem(24px);
        text-align: left;
        margin: px2rem(20px) auto px2rem(59px);
      }
      .list-content {
        width: 100%;
        background-color: #fff;
        .list-item {
          height: px2rem(112px);
          padding: 0 px2rem(43px);
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            color: #333333;
            font-size: px2rem(28px);
            line-height: px2rem(40px);
            text-align: left;
            flex: 2;
          }
          .money {
            color: #999999;
            font-size: px2rem(24px);
            line-height: px2rem(40px);
            text-align: right;
            margin-right: px2rem(27px);
            flex: 2;
            span {
              color: #FF6B30;
              font-size: px2rem(30px);
            }
          }
          .icon {
            width: px2rem(17px);
            height: px2rem(10px);
            transform: rotate(90deg);
            -ms-transform: rotate(90deg); /* IE 9 */
            -moz-transform: rotate(90deg); /* Firefox */
            -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
            -o-transform: rotate(90deg); /* Opera */
          }

        }
      }
    }

  }
</style>


