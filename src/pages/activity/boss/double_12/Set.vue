<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double-12-boss-set {
    position: relative;
    height: 101%;
    overflow: scroll;
    .main-container {
      position: relative;
      text-align: center;
      background-color: #F0F0F0;
      /*padding: 0 px2rem(28px);*/
      padding-top: px2rem(80px);
      padding-bottom: 50%;
      .banner {
        background-color: #601A8F;
        padding: px2rem(30px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: px2rem(24px);
        p {
          color: #fff;
          margin-left: px2rem(30px);
          text-align: left;
          line-height: px2rem(46px);
        }
        a {
          height: px2rem(45px);
          line-height: px2rem(45px);
          padding: 0 px2rem(10px);
          border: 1px solid rgba(250, 179, 1, 1);
          color: rgba(250, 179, 1, 1);
          margin-left: px2rem(30px);
        }
      }
      .title {
        font-size: px2rem(32px);
        color: #1B1B1F;
        margin: px2rem(40px) px2rem(28px) px2rem(40px) px2rem(28px);
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        span {
          color: #1B1B1F;
          font-size: px2rem(24px);
          margin-top: 1%;
        }
      }
      .set-content {
        padding-bottom: px2rem(20px);
        margin: 0 px2rem(28px);
        .table-set-content {
          width: 100%;
          height: px2rem(120px);
          background-color: #fff;
          border-bottom: 1px solid #eee;
          .set-item {
            width: 50%;
            height: px2rem(120px);
            float: left;
            padding: px2rem(47px) auto;
            box-sizing: border-box;
            font-size: px2rem(30px);
            display: flex;
            justify-content: center;
            align-items: center;
            .label {
              color: #333333;
            }
            .money {
              width: 52%;
              margin: 0 px2rem(5px);
              font-size: px2rem(34px);
              color: #FF6E5A;
              display: inline-block;
              text-align: center;
            }
            .money2 {
              width: 40%;
            }
            .money::-webkit-input-placeholder {
              font-size: px2rem(28px);
              color: #B3B3B3;
            }

            .unit {
              color: #628FEB;
            }
          }
          .item-left {
            border-right: 1px solid #eee;
          }
          .item-right {
            border-left: 1px solid #eee;
          }
        }
        .label-set-tip {
          height: px2rem(120px);
          line-height: px2rem(120px);
          color: #333333;
          background-color: #fff;
          font-size: px2rem(30px);
          text-align: left;
          padding: 0 px2rem(40px);
        }
        .table-set-content2 {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #fff;
        }
        .label-set-content {
          width: 100%;
          height: px2rem(120px);
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid #eee;
          .logo {
            width: px2rem(68px);
            height: px2rem(68px);
            background: rgba(255, 110, 90, 1);
          }
          p {
            width: 80%;
            color: #B3B3B3;
            font-size: px2rem(30px);
            text-align: left;
          }

          h3 {
            width: 70%;
            color: #333333;
            font-size: px2rem(30px);
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

          }
          .btn-img {
            width: px2rem(17px);
            height: px2rem(10px);
          }
          .select-img {
            width: px2rem(40px);
            height: px2rem(40px);
          }
        }
      }
      .tip1 {
        color: #1B1B1F;
        font-size: px2rem(24px);
        margin: px2rem(44px) px2rem(28px) px2rem(88px);
        text-align: left;
        line-height: px2rem(32px);
      }
      .btn {
        height: px2rem(100px);
        line-height: px2rem(100px);
        background: rgba(36, 2, 97, 1);
        font-size: px2rem(36px);
        color: #fff;
        margin: px2rem(88px) px2rem(28px) px2rem(30px);
      }

    }
  }
</style>
<template>
  <div class="double-12-boss-set">
    <activityHeader type="perpage" title="活动设置"></activityHeader>
    <div class="main-container">
      <div class="banner" @click="call('153-7207-2897')">
        <p>若在设置活动时遇到问题请直接电话联系客服<br/>联系电话：153-7207-2897</p>
        <a>点击拨打</a>
      </div>
      <h3 class="title">1. 线下满送设置 （共3个档次,您设定门槛）</h3>
      <div class="set-content">
        <div class="table-set-content">
          <div class="set-item item-left">
            <span class="label">实付</span>
            <input class="money"  type="number" placeholder="输入满送门槛" v-model="storeInfo.fullMoney1"/>
            <span class="unit">元</span>
          </div>
          <div class="set-item item-right">
            <span class="label">奖励导购</span>
            <input class="money money2"  type="number" placeholder="输入金额" v-model="storeInfo.fullStaffReward1"/>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="label-set-content" v-if="curIndex1==-1" @click="showProduct1=!showProduct1">
          <p>请选择满送礼品</p>
          <img class="btn-img" src="/static/images/activity/down_grey.png"/>
        </div>
        <div class="label-set-content" @click="showProduct1=!showProduct1" v-else="fullData.length>=1">
          <img class="logo" :src="fullData[curIndex1].goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
          <h3>{{fullData[curIndex1].goodsName}}</h3>
          <img class="btn-img" src="/static/images/activity/down_grey.png"/>
        </div>
        <div class="product-list" v-show="showProduct1">
          <div class="label-set-content" v-for="(item,index) in fullData" @click="selectProduct(item,index,1)">
            <img class="logo" :src="item.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <h3>{{item.goodsName||''}}</h3>
            <img class="select-img"
                 :src="curIndex1==index?'/static/images/activity/boss/double_12/select.png':'/static/images/activity/boss/double_12/unselect.png'"/>
          </div>
        </div>
      </div>
      <div class="set-content">
        <div class="table-set-content">
          <div class="set-item item-left">
            <span class="label">实付</span>
            <input class="money" type="number" placeholder="输入满送门槛" v-model="storeInfo.fullMoney2"/>
            <span class="unit">元</span>
          </div>
          <div class="set-item item-right">
            <span class="label">奖励导购</span>
            <input class="money money2" type="number" placeholder="输入金额" v-model="storeInfo.fullStaffReward2"/>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="label-set-content" v-if="curIndex2==-1" @click="showProduct2=!showProduct2">
          <p>请选择满送礼品</p>
          <img class="btn-img" src="/static/images/activity/down_grey.png"/>
        </div>
        <div class="label-set-content" @click="showProduct2=!showProduct2" v-else="fullData.length>=1">
          <img class="logo" :src="fullData[curIndex2].goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
          <h3>{{fullData[curIndex2].goodsName}}</h3>
          <img class="btn-img" src="/static/images/activity/down_grey.png"/>
        </div>
        <div class="product-list" v-show="showProduct2">
          <div class="label-set-content" v-for="(item,index) in fullData" @click="selectProduct(item,index,2)">
            <img class="logo" :src="item.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <h3>{{item.goodsName||''}}</h3>
            <img class="select-img"
                 :src="curIndex2==index?'/static/images/activity/boss/double_12/select.png':'/static/images/activity/boss/double_12/unselect.png'"/>
          </div>
        </div>
      </div>
      <div class="set-content">
        <div class="table-set-content">
          <div class="set-item item-left">
            <span class="label">实付</span>
            <input class="money" type="number" placeholder="输入满送门槛" v-model="storeInfo.fullMoney3"/>
            <span class="unit">元</span>
          </div>
          <div class="set-item item-right">
            <span class="label">奖励导购</span>
            <input class="money money2" type="number" placeholder="输入金额" v-model="storeInfo.fullStaffReward3"/>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="label-set-content" v-if="curIndex3==-1" @click="showProduct3=!showProduct3">
          <p>请选择满送礼品</p>
          <img class="btn-img" src="/static/images/activity/down_grey.png"/>
        </div>
        <div class="label-set-content" @click="showProduct3=!showProduct3" v-else="fullData.length>=1">
          <img class="logo" :src="fullData[curIndex3].goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
          <h3>{{fullData[curIndex3].goodsName}}</h3>
          <img class="btn-img" src="/static/images/activity/down_grey.png"/>
        </div>
        <div class="product-list" v-show="showProduct3">
          <div class="label-set-content" v-for="(item,index) in fullData" @click="selectProduct(item,index,3)">
            <img class="logo" :src="item.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <h3>{{item.goodsName||''}}</h3>
            <img class="select-img"
                 :src="curIndex3==index?'/static/images/activity/boss/double_12/select.png':'/static/images/activity/boss/double_12/unselect.png'"/>
          </div>
        </div>
      </div>
      <h3 class="title">2. 锁销礼包设置 会员支付59元</h3>
      <div class="set-content">
        <div class="label-set-tip">
          获得：加湿器+无门槛代金券
        </div>
        <div class="table-set-content table-set-content2">
          <div class="set-item item-left">
            <span class="label">代金券</span>
            <input class="money money2" type="number" placeholder="输入金额" v-model="storeInfo.cashQuota" @click="inputScrollIntoView($event)"/>
            <span class="unit">元</span>
          </div>
          <div class="set-item item-right">
            <span class="label">奖励导购</span>
            <input class="money money2" type="number" placeholder="输入金额" v-model="storeInfo.lockStaffReward" @click="inputScrollIntoView($event)"/>
            <span class="unit">元</span>
          </div>
        </div>
      </div>
      <h3 class="title" v-show="storeInfo.isPartakeCoupon==1">3. 节后送券<span>有效时间：2019年1月31日前有效</span></h3>
      <div class="set-content"  v-show="storeInfo.isPartakeCoupon==1">
        <div class="table-set-content table-set-content2">
          <div class="set-item item-left">
            <span class="label">满</span>
            <input class="money" type="number" placeholder="请输入金额" v-model="storeInfo.deductLimit"/>
            <span class="unit">元</span>
          </div>
          <div class="set-item item-right">
            <span class="label">减</span>
            <input class="money" type="number" placeholder="请输入金额" v-model="storeInfo.deductQuota"/>
            <span class="unit">元</span>
          </div>
        </div>
      </div>
      <p class="tip1" v-show="storeInfo.isPartakeCoupon==1">提示：活动导购奖励由系统直接发放到导购支付宝，请您确保身边店余额充足！</p>
      <div class="btn" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
  import activityHeader from "@/components/common/activityHeader"
  import double12Api from '../../../../fetch/double_12_api'
  import * as _tool from "../../../../util/tool"
  export default{
    components: {
      activityHeader
    },
    data () {
      return {
        token: this.$route.query.token || "",
        type: this.$route.query.type,
        storeCode: this.$route.query.storeCode,

//        id: this.$route.query.id,
//        isPartakeCoupon: this.$route.query.isPartakeCoupon,
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        showProduct1: false,
        showProduct2: false,
        showProduct3: false,
        curIndex1: -1,
        curIndex2: -1,
        curIndex3: -1,
        storeInfo: {
          fullMoney1:'',
          fullStaffReward1:'',
            fullMoney2:'',
          fullStaffReward2:'',
            fullMoney3:'',
          fullStaffReward3:'',
        },
        fullData: [],
        LockData: [],
      }
    },
    computed: {},
    watch: {},
    methods: {
      inputScrollIntoView(e) {
          var target=e.currentTarget;
//          target.scrollIntoView();
      },
      //打电话
      call(mobileNum){
        WebViewJavascriptBridge.callHandler('call',mobileNum,function(response) {

        });
      },
      getFullDelivery: function (goodsSymbol) {
          var _this=this;
        double12Api.listGnjGoods("get", {goodsSymbol: goodsSymbol}, this.token).then(res => {
          if (res.returnCode === '0') {
            if (goodsSymbol == 1) {
                var list=res.returnContent;
              _this.fullData = list;
              if(_this.storeInfo.goodsCode1&&this.storeInfo.goodsCode1.length>0){
                  for(var i=0;i<list.length;i++){
                      if(_this.storeInfo.goodsCode1==list[i].goodsCode){
                        _this.curIndex1=i;
                      }
                      if(_this.storeInfo.goodsCode2==list[i].goodsCode){
                        _this.curIndex2=i;
                      }
                      if(_this.storeInfo.goodsCode3==list[i].goodsCode){
                        _this.curIndex3=i;
                      }
                  }
              }
            } else {
              this.LockData = res.returnContent;
            }
          } else {
            this.$toast(res.message);
          }
        });
      },
      selectProduct(item, index, giftIndex) {
        this['curIndex' + giftIndex] = index;
        this['showProduct' + giftIndex] = false;

      },
      sure(){
        let storeInfo = this.storeInfo;

        if (!(/^[1-9]\d*$/.test(Number(this.storeInfo.fullMoney1)) && /^[1-9]\d*$/.test(Number(this.storeInfo.fullStaffReward1)))) {
          this.$toast("商品A 输入金额错误");
          return;
        }

        if (!(/^[1-9]\d*$/.test(Number(this.storeInfo.fullMoney2)) && /^[1-9]\d*$/.test(Number(this.storeInfo.fullStaffReward2)))) {
          this.$toast("商品B 输入金额错误");
          return;
        }

        if (!(/^[1-9]\d*$/.test(Number(this.storeInfo.fullMoney3)) && /^[1-9]\d*$/.test(Number(this.storeInfo.fullStaffReward3)))) {
          this.$toast("商品C 输入金额错误");
          return;
        }

        if (!(/^[1-9]\d*$/.test(Number(this.storeInfo.cashQuota)) && /^[1-9]\d*$/.test(Number(this.storeInfo.lockStaffReward)))) {
          this.$toast("锁销礼包 输入金额错误");
          return;
        }
        if (this.curIndex1 <= -1) {
          this.$toast("请选择满送礼品A");
          return;
        }
        if (this.curIndex2 <= -1) {
          this.$toast("请选择满送礼品B");
          return;
        }
        if (this.curIndex3 <= -1) {
          this.$toast("请选择满送礼品C");
          return;
        }

        if(this.curIndex1==this.curIndex2||this.curIndex1==this.curIndex3||this.curIndex2==this.curIndex3){
          this.$toast("线下满送商品不能重复");
          return;
        }

        if(!storeInfo.deductVoucherCode){
          storeInfo.deductVoucherCode='';
        }
        if(this.storeInfo.isPartakeCoupon==1){
            console.log(this.storeInfo.deductLimit+"=="+this.storeInfo.deductQuota);
          if (!(/^[1-9]\d*$/.test(Number(this.storeInfo.deductLimit)) && /^[1-9]\d*$/.test(Number(this.storeInfo.deductQuota)))) {
            this.$toast("节后送券 输入金额错误");
            return;
          }
        }

//        if (this.storeInfo.deductLimit.length > 0 && this.storeInfo.deductQuota.length > 0) {
//          storeInfo.isPartakeCoupon = 1;
//          if (!(/^[1-9]\d*$/.test(Number(this.storeInfo.deductLimit)) && /^[1-9]\d*$/.test(Number(this.storeInfo.deductQuota)))) {
//            this.$toast("节后送券 输入金额错误");
//            return;
//          }
//          if(!storeInfo.deductVoucherCode){
//            storeInfo.deductVoucherCode='';
//          }
//        } else {
//          storeInfo.isPartakeCoupon = 0;
//        }

        storeInfo.goodsCode1=this.fullData[this.curIndex1].goodsCode;
        storeInfo.goodsCode2=this.fullData[this.curIndex2].goodsCode;
        storeInfo.goodsCode3=this.fullData[this.curIndex3].goodsCode;
        if(!storeInfo.cashVoucherCode){
          storeInfo.cashVoucherCode='';
        }
        double12Api.gnjActStoreSet("post",storeInfo,this.token).then(res => {
          if (res.returnCode === '0') {
           this.$router.back();
          } else {
            this.$toast(res.message);
          }
        });

      },
      getGnjActStoreInfoByCond:function () {
        this.loading=true;
        double12Api.getGnjActStoreInfoByCond("get",{activityCode:this.activityCode},this.token).then(res=>{
          if(res.returnCode==='0'){
            console.log(res.returnContent.joinedGnjActStoreInfoList);
            this.joinedGnjActStoreInfoList=res.returnContent.joinedGnjActStoreInfoList;
            var joinedGnjActStoreInfoList=res.returnContent.joinedGnjActStoreInfoList;
            for(var i=0;i<joinedGnjActStoreInfoList.length;i++){
                if(joinedGnjActStoreInfoList[i].storeCode==this.storeCode){
                  this.storeInfo=joinedGnjActStoreInfoList[i];
                  this.getFullDelivery(1);//(1为满送商品,2为锁销商品)
                }
            }
            this.loading=false;
          }else {
            this.$toast(res.message);
            this.loading=false;
          }
        });
      },
    },
    created(){
      //初始化webViewJavascriptBridge
      _tool.webviewBridgeInit(this.type);
    },
    mounted(){
//      let storeInfo= sessionStorage.getItem("storeInfo");
//      this.storeInfo= JSON.parse(storeInfo);
      this.getGnjActStoreInfoByCond();

    }
  }
</script>
