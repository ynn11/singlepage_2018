<template>
  <div :class="'double_12_index ' + [showRules?'static':'']">
    <img src="../../../../../static/images/activity/applet/double_12/banner.png" class="banner"/>
    <div class="main-content">
      <h3 class="title">活动时间：{{activityInfo.beginTime}}-{{activityInfo.endTime}}</h3>
      <div class="content1">
        <div class="store">
          <img :src="activityInfo.storeLogoUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'" class="logo"/>
          <div class="store-info">
            <h3>{{activityInfo.storeName||''}}</h3>
            <div>{{activityInfo.connectAddress}}</div>
          </div>
        </div>
        <div class="tip-content">
          <div class="tip">高端家电，<span>送！送！送！</span></div>
          <br/>
          <div class="tip">进店消费现金实付<span>满额就送啦！</span></div>
          <br/>
          <div class="tip">多买多送</div>
          <br/>
          <div class="tip">我们来真的！</div>
          <br/>
        </div>
        <div class="gifts-content">
          <div class="gifts-item" v-for="item in activityInfo.productList">
            <div class="gifts-item-info">
              <div class="img">
                <img :src="item.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
              </div>
              <p>市场价￥{{item.salePrice}}</p>
              <div class="exchange" v-show="consumptionAmount>=item.fullMoney">可兑换</div>
            </div>
            <p class="gifts-item-title">消费满{{item.fullMoney}}元赠</p>
          </div>
          <!--<div class="gifts-item">-->
          <!--<div class="gifts-item-info">-->
          <!--<div class="img">-->
          <!--<img src="../../../../../static/images/activity/close_red.png"/>-->
          <!--</div>-->
          <!--<p>市场价￥169</p>-->
          <!--<div class="exchange">可兑换</div>-->
          <!--</div>-->
          <!--<p class="gifts-item-title">消费满200元赠</p>-->
          <!--</div>-->
          <!--<div class="gifts-item">-->
          <!--<div class="gifts-item-info">-->
          <!--<div class="img">-->
          <!--<img src="../../../../../static/images/activity/close_red.png"/>-->
          <!--</div>-->
          <!--<p>市场价￥169</p>-->
          <!--<div class="exchange">可兑换</div>-->
          <!--</div>-->
          <!--<p class="gifts-item-title">消费满200元赠</p>-->
          <!--</div>-->
        </div>
        <div class="gifts-progress">
          <div class="gifts-progress-img" :style="'width:'+autoWidth+'%'"></div>
          <!--<img class="gifts-progress-img" src="/static/images/activity/applet/double_12/progress.png"/>-->
          <div class="gifts-progress-num" :style="'width:'+autoWidth+'%'">已消费{{consumptionAmount}}元</div>
        </div>
        <div class="edge">
          <h3 class="tip2">~直接联系导购兑换礼品噢~</h3>
          <p class="tip3">礼品数量有限！送完为止！</p>
          <p class="tip3"> 提示：使用身边店余额支付不计入该活动哦~</p>
          <img class="tip4" src="/static/images/activity/applet/double_12/title.png"/>
        </div>
      </div>
      <div class="content2">
        <p class="tip1">转发活动至朋友圈，立即<span>获得{{activityInfo.cashCouponPrice}}元</span><br/>购买新年礼包资格，礼品到店领取</p>
        <div class="gifts">
          <div class="left">
            <h3 class="gifts-coupon"><span>¥</span>{{activityInfo.cashQuota}}</h3>
            <h3 class="gifts-tip">无门槛代金券</h3>
            <h3 class="gifts-title">{{activityInfo.storeName||''}}</h3>
            <img src="/static/images/activity/applet/double_12/add.png"/>
          </div>
          <div class="right">
            <img class="gifts-img" :src="activityInfo.goodsPicUrl+ '?imageView2/1/w/200/h/200/interlace/1/q/100'"/>
            <h3 class="gifts-name">{{activityInfo.goodsName}}</h3>
            <h3 class="gifts-scale">市价:{{activityInfo.salePrice}}元</h3>
          </div>

          <!--<h3 class="gifts-title">商品名称商品名称商品名称</h3>-->
          <!--<h3 class="gifts-orig">市价:500.0元</h3>-->
          <!--<h3 class="gifts-sale">分享后<br/><span>250.0</span>元</h3>-->
          <!--<div class="gifts-coupon"><span>100</span>元<br/>无门槛代金券</div>-->
        </div>
        <h3 :class="showRules?'report-btn-up':'report-btn-down'" @click="showRules=!showRules">活动规则</h3>
        <div class="active-content" v-show="showRules">
          <p>1.活动期间，在同一门店现金消费的实付金额可累计，累计金额达到标准后可联系导购兑换对应礼品，礼品可寄送至您指定的地址。</p>
          <p>2.实付金额达标后只可兑换一次仅限一件商品。需兑换成功后，原实付金额清零，您需再次消费达标才可兑换第二件商品。</p>
          <p>3.活动期间，在门店产生消费使用门店充值余额支付的金额不计入活动。</p>
          <p>4.在活动结束后达到条件未兑换礼品的会员，默认放弃兑换。</p>
          <p>5.礼包内礼品到店兑换，选择到店支付的需到店支付对应金额后方能领走礼包礼品。</p>
          <p>6.本次活动优惠不与其他优惠同享，详情请咨询门店。</p>
        </div>
        <a :href="'tel:'+activityInfo.linkStaffMobileNum"
           v-show="activityInfo.linkStaffMobileNum&&activityInfo.linkStaffMobileNum.length>0">
          <div class="btn btn-call"><img src="/static/images/activity/applet/double_12/phone.png"/>立即联系导购</div>
        </a>
        <div class="btn btn-share" v-show="showStart" @click="shareTipShow=true;">立即转发</div>
        <div class="btn btn-nostart" v-show="!showStart">活动还未开启哦</div>
        <p class="tip2">礼包包含：精美加湿器+门店无门槛代金券</p>
      </div>
    </div>
    <!--弹窗 兑换成功-->
    <div class="success-pop popWindow" v-if="showShareSuc">
      <div class="mask"></div>
      <img class="close" @click="showShareSuc=false" src="/static/images/close.png"/>
      <img class="gift-img" src="/static/images/activity/applet/double_12/pop.png"/>
      <div class="success-contain pop-contain">
        <div class="tip1">你已成功砍价<br/>获得<span>{{activityInfo.cashCouponPrice}}元</span>购买原价<span>新年</span>礼包资格</div>

        <div class="btn-content">
          <div class="btn red-btn" @click="shopPayment">到店支付</div>
          <div class="btn blue-btn" @click="attendActive(1)">立即支付</div>
        </div>

      </div>
      <p class="tip2" v-show="lowStocks">门店商品库存不足，无法支付</p>
    </div>
    <!-- 购买成功 -->
    <div class="popWindow" v-if="successShow">
      <div class="mask"></div>
      <img class="close" src="/static/images/close.png" @click="refreshPage"/>
      <div class="success-contain pop-contain">
        <h3>购买成功</h3>
        <p class="tip1">已获得礼品提货码及优惠券</p>
        <img src="/static/images/qrcode.jpg"/>
        <p class="tip2">关注公众号获取更多优惠信息</p>
      </div>
    </div>
    <!-- 绑定手机号 -->
    <div class="bindMobileNum popWindow" v-show="bindMobileNumShow">
      <div class="mask"></div>
      <!--<img class="close" @click="bindMobileNumShow=false" src="/static/images/close.png"/>-->
      <div class="bindMobileNum-contain pop-contain">
        <!--<img src="/static/images/activity/close_gray.png" alt="" class="close close-gray"-->
        <!--@click="bindMobileNumShow=false;">-->
        <div class="pop-title">验证手机号，获取礼品锁定码</div>
        <div class="content-box">
          <input type="number" class="mobileNum" v-model="mobileNum" placeholder="请输入手机号">
          <div class="rows">
            <input type="number" class="verificationCode" placeholder="输入验证码" v-model="verificationCode">
            <div class="sendvCode" @click="send" v-show="!timerStatus">获取验证码</div>
            <div class="sendvCode run" v-show="timerStatus">{{timer}}s</div>
          </div>
          <div class="btn-contain">
            <div class="btn btn-bind" @click="bindMobileNum">确定</div>
          </div>
        </div>
      </div>
    </div>
    <v-loading v-show="loading"></v-loading>
    <wxShareTip :shareTipShow="shareTipShow" :isClose="false" :notice="notice"></wxShareTip>
  </div>
</template>

<script>
  import api from "../../../../fetch/common_api"
  import double12Api from "../../../../fetch/double_12_api"
  import wxShareTip from "@/components/common/wxShareTip2"
  import loading from "@/components/common/loading"
  import _urlConfig from "../../../../util/urlConfig"
  import * as _validate from "../../../../util/validate"
  export default{
    components: {
      'v-loading': loading,
      wxShareTip,
    },
    data () {
      return {
        activityCode: "2adf2191f83711e884f8704d7b87a020",
        storeCode: this.$route.query.storeCode || null,//门店编号
        staffCode: this.$route.query.staffCode || null,//导购编号
        linkType: this.$route.query.linkType||null,//链接类型
        xd_code: this.$route.query.xd_code,  //来源
        showRules: false,
        showStart: false,
        showShareSuc: false,
        bindMobileNumShow: false,
        timerStatus: false,
        verificationCode: '',
        mobileNum: '',
        timer: 60,
        loading: false,
        shareTipShow: false,
        notice: "点击右上角选择分享至朋友圈\n立即获得元购买新年礼包资格",
        attendFlag: -1,
        shareFlag: -1,
        payFlag: -1,
        activityInfo: {},
        consumptionAmount: 0, //满送消费金额
        allAmount: 0,  //最大消费金额
        autoWidth:0,
        order: {},
        lowStocks: false,
        payMode: 1,
        isBuying: false,
        successShow: false,


      }
    },
    //判断重复进入
    beforeRouteEnter(to, from, next) {
      if (navigator.userAgent.match(/Android/i)) {
        sessionStorage.entryMark = "marked"
        next();
        return;
      } else {
        next((vm) => {
          if (sessionStorage.entryMark !== "marked") {
            sessionStorage.entryMark = "marked"
            vm.$router.go(0);
            return;
          }
        })
      }
    },
    computed: {
      tokenInfo () {
        let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
        return tokenInfo
      },
      openId(){
        let openId = this.$store.state.user.openId;
        return openId;
      },


    },
    watch: {
      activityInfo(){
        let data = this.activityInfo.cashCouponPrice;
        this.notice = "点击右上角选择分享至朋友圈\n立即获得" + data + "元购买新年礼包资格"
      },
      consumptionAmount(){
          if(this.allAmount&&parseInt(this.allAmount)>0){
            let width=parseInt(100*parseInt(this.consumptionAmount)/parseInt(this.allAmount));
            this.autoWidth=width;
          }
      },
      allAmount(){
        if(this.allAmount&&parseInt(this.allAmount)>0) {
          let width = parseInt(100*parseInt(this.consumptionAmount) / parseInt(this.allAmount));
          this.autoWidth = width;
        }
      },


    },

    methods: {
      refreshPage(){
        this.successShow = false;
        this.whetherAttend();
      },
      //数据收集
      collect(data,token){
        if (token) {
          api.collectStatisticsOnActivities("post",data,token).then(res => {});
        }else{
          api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
        }
      },
      shopPayment(){
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0023",
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode||"",
          "openId": this.openId
        });

        this.payMode = 2;
        if(this.tokenInfo.imInfo === null){
            this.bindMobileNumShow=true;
            return;
        }
        this.attendActive(2);
      },
      attendActive(payMode) {
        if (!this.isBuying) {
//          alert("444");
            if(payMode==1){
              this.collect({
                "xdCode": this.xd_code,
                "ydCode": "YD0020",
                "activityCode": this.activityCode,
                "srcStaffCode": this.staffCode||"",
                "openId": this.openId
              });
            }
          this.isBuying = true;
          this.loading = true;
          this.payMode = payMode;
          api.activityAttend("post", {
            activityCode: this.activityCode,
            openId: this.openId,
            storeCode: this.storeCode,
            linkStaffCode: this.staffCode,
            payMode: payMode
          }, this.tokenInfo.token).then(res => {
            if (res.returnCode === '0') {
              this.order = res.returnContent;
              if(this.payMode===1){
                this.isBuying=false;
                this.loading = false;
                this.wxPay(res.returnContent);
              }else {
                this.collect({
                  "xdCode": this.xd_code,
                  "ydCode": "YD0024",
                  "activityCode": this.activityCode,
                  "srcStaffCode": this.staffCode||"",
                  "openId": this.openId
                });
                this.isBuying=false;
                this.loading = false;
                this.whetherAttend();
              }
            }
//            else if (res.returnCode === '-1') {
//              this.lowStocks = true;
//              this.loading = false;
//            }
            else {
              this.isBuying=false;
              this.$toast(res.message);
              this.loading = false;
            }
          });
        }

      },
      //微信支付调起
      wxPay: function (data) {
        var _this = this;
        //微信调用
        if (data.envType === 1) {  //(1：测试 2:正式)
          _this.paySuccess(data);
        }
        else {
          window.wx.ready(function () {
            wx.chooseWXPay({
              timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
              package: data.pkg, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: data.paySign, // 支付签名
              envType: data.envType,
              success: (callRes) => {
//                  alert("111");
                _this.paySuccess(data);
              },
              fail: () => {
//                alert("222");
                _this.loading = false;
                _this.isBuying = false;
                _this.payError();

              },
              complete: () => {
//                alert("333");
                _this.loading = false;
                _this.isBuying=false;
              }
            });
          });
        }
      },
      //微信支付成功
      paySuccess: function (data) {
        var _this = this;
        // 支付成功后的回调函数
        api.activityConfirm("post", {
          activityCode: _this.activityCode,
          orderNum: data.orderNum
        }, _this.tokenInfo.token).then((res) => {
          if (res.returnCode === '0') {
            _this.collect({
              "xdCode": _this.xd_code,
              "ydCode": "YD0018",
              srcStaffCode:_this.linkStaffCode||null,
              productCode:_this.productCode||null,
              productType:_this.productType||null
            });
            _this.loading = false;
            _this.isBuying = false;
            _this.showShareSuc = false;
//            _this.routerLink("/activity_2018/eightHalf_paySuccess");
            //判断是否是用户，不是的显示绑定界面
            if (_this.tokenInfo.imInfo === null) {
              _this.bindMobileNumShow = true;
              return;
            }
            _this.successShow = true;
          } else {
            _this.$toast(res.message);
          _this.loading = false;
          _this.isBuying = false;
            _this.payError();
          }
        });
      },
      //微信支付失败
      payError: function () {
        this.showShareSuc = true;
      },
      //绑定手机号
      bindMobileNum() {
        let data = {
          "mobileNum": this.mobileNum,
          "verificationCode": this.verificationCode,
          "appEntranceType": 3
        }
        if (_validate.mobile(data.mobileNum) !== true) {
          this.$toast(_validate.mobile(data.mobileNum));
          return;
        }
        if (_validate.verificationCode(data.verificationCode) !== true) {
          this.$toast(_validate.verificationCode(data.verificationCode));
          return;
        }
        api.memFansBindMobileNum("post", data, this.tokenInfo.token).then(res => {
          if (res.returnCode === "0") {
            this.$store.dispatch("_login", {tokenInfo: JSON.stringify(res.returnContent), openId: this.openId});
            this.collect({
              "xdCode": this.xd_code,
              "ydCode": "YD0005",
              "activityCode": this.activityCode,
              "openId": this.openId
            }, res.returnContent.token);
            this.$toast("手机号绑定成功！");
            //从用户开始进入
            this.bindMobileNumShow = false;
            if(this.payMode===2){
              this.attendActive(2);
            }else {
                if(this.payFlag===1){
                    this.successShow=true;
                }else {
                  this.whetherAttend();
                }

            }

          } else {
            this.$toast(res.message);
          }
        })
      },
      //发送验证码
      send(){
//        vue.sendvCode= function(){
        if (_validate.mobile(this.mobileNum) !== true) {
          this.$toast(_validate.mobile(this.mobileNum))
          return;
        }
        let data = {
          "mobileNum": this.mobileNum,
          "verificationType": 5
        };
        api.sendVerificationCode("get", data).then((res) => {
          if (res.returnCode === "0") {
            this.timer = 60;
            this.timerStatus = true;
            this.runTimer();
          } else {
            this.$toast(res.message);
          }
        });
//        },
      },
      //验证码倒计时
      runTimer() {
        if (this.timer > 0) {
          --this.timer;
          setTimeout(this.runTimer, 1000);
        } else {
          this.timerStatus = false
        }
      },
      whetherAttend: function () {
        double12Api.activityWhetherAttend("post", {
          activityCode: this.activityCode,
          linkStaffCode: this.staffCode,
          storeCode: this.storeCode,
          openId:this.openId,
          linkType: Number(this.linkType)
        }, this.tokenInfo.token).then(res => {
          console.log(res.returnContent);
          if (res.returnCode === '0') {
            this.shareFlag = res.returnContent.shareFlag;
            this.attendFlag = res.returnContent.attendFlag;
            this.payFlag = res.returnContent.payFlag;

            this.activityContent();
            if (res.returnContent.attendFlag == 0&&res.returnContent.shareFlag == 0) { //未参加活动 正常参与活动
              this.consumptionAmount = res.returnContent.consumptionAmount;
            } else if (res.returnContent.attendFlag == 0&&res.returnContent.payFlag==0&&res.returnContent.shareFlag == 1 && res.returnContent.lockCode==null && res.returnContent.checkCode==null) {
              //已分享未选择支付方式
              this.showShareSuc = true;
            } else if (res.returnContent.attendFlag == 0&&res.returnContent.payFlag==1&&res.returnContent.shareFlag == 1 && res.returnContent.lockCode==null && res.returnContent.checkCode==null&& this.tokenInfo.imInfo === null) {
              //已分享 支付方式成功 为绑定手机号
              this.bindMobileNumShow = true;
            } else if (res.returnContent.shareFlag == 1 && res.returnContent.lockCode && res.returnContent.lockCode.length > 0) {
              //已选择到店支付
              this.routerLink("/activity_2018/double_12_gift");
            } else if ( res.returnContent.shareFlag == 1 &&res.returnContent.payFlag==1 && this.tokenInfo.imInfo == null) {
              //已支付成功未绑定手机号
              this.bindMobileNumShow = true;
            } else if (res.returnContent.shareFlag == 1 &&res.returnContent.checkCode!=null && this.tokenInfo.imInfo != null) {
              //已参加，已支付成功获取礼品兑换码
              this.routerLink("/activity_2018/double_12_gift");
            }else {
              this.consumptionAmount = res.returnContent.consumptionAmount;
            }
          } else {
            this.$toast(res.message);
          }
        });
      },
      routerLink(path){
        let src = path + "?storeCode=" + (this.storeCode || this.activityInfo.storeCode || "") + "&staffCode=" + (this.staffCode || this.activityInfo.linkStaffCode || "") + "&xd_code=" + (this.xd_code || "")
        this.$router.push({
          path: src
        })
      },
      activityContent: function () {
        var _this = this;
        double12Api.activityContent("post", {
          activityCode: this.activityCode,
          storeCode: this.storeCode,
          linkStaffCode:this.staffCode
        }, this.tokenInfo.token).then(res => {
          if (res.returnCode === '0') {
            _this.allAmount = res.returnContent.productList[res.returnContent.productList.length-1].fullMoney;
            _this.activityInfo = res.returnContent;
            _this.initShare(res.returnContent);
            //判断活动是否开启
            var nowTime = new Date().getTime();
            var beginTime = new Date(res.returnContent.beginTime.toString().replace(/\./g,"-")).getTime();
            var endTime = new Date(res.returnContent.endTime.toString().replace(/\./g,"-")).getTime()+ 24 * 60 * 60 * 1000;
            if (nowTime >= beginTime && nowTime <= endTime) {
              _this.showStart = true;
            } else {
              _this.showStart = false;
            }

          } else {
            _this.$toast(res.message);
          }
        });
      },
      //初始化分享
      initWxShare(options, cb){
        window.wx.ready(function () {
          // wx.showMenuItems({
          //     menuList: [
          //         "menuItem:share:appMessage",
          //         "menuItem:share:timeline"
          //     ] // 要显示的菜单项，所有menu项见附录3
          // });
          console.log(options);
          wx.onMenuShareAppMessage({
            title: options.title, // 分享标题
            desc: options.desc, // 分享描述
            link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: options.imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: () => {
              typeof cb === "function" && cb();
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });

          wx.onMenuShareTimeline({
            title: options.title, // 分享标题
            desc: options.desc, // 分享描述
            link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: options.imgUrl, // 分享图标
            success: () => {
              typeof cb === "function" && cb();
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      },
      initShare(data){
        var that = this;
        //分享
        this.initWxShare({
          title:  `过年季，高档家电白送你！`,
          desc:data.storeName||'',
          link: encodeURI(_urlConfig.redirectBaseredirectURI + '/activity_2018/double_12_index?xd_code=XD0005&storeCode=' + (this.storeCode || this.activityInfo.storeCode) + '&staffCode=' + (this.staffCode || this.activityInfo.linkStaffCode || "") + '&memberCode=' + (this.activityInfo.memberCode || "")),
          imgUrl: data.storeLogoUrl||''
        }, () => {
          //年终活动分享成功
          this.collect({
            "xdCode": this.xd_code,
            "ydCode": "YD0008",
            "activityCode": this.activityCode,
            "srcStaffCode": this.staffCode||"",
            "openId": this.openId
          });

          //分享提示框
          that.shareTipShow = false;
          //活动分享
          api.activityShare("post", {
            activityCode: that.activityCode,
            storeCode: that.storeCode,
            linkStaffCode: that.staffCode,
            openId:this.openId,

          }, that.tokenInfo.token).then((res) => {
            if (res.returnCode === "0") {
              //分享成功
              that.showShareSuc = true;
            } else {
              that.$toast(res.message);
            }
          });
        });
      },
      //初始化微信
      initWxConfig(){
        api.getSignMap("post", {url: location.href}).then(res => {
          let content = res.returnContent;
          window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: content.appId, // 必填，公众号的唯一标识
            timestamp: content.timestamp, // 必填，生成签名的时间戳
            nonceStr: content.nonceStr, // 必填，生成签名的随机串
            signature: content.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        });
      },
    },
    created(){
      this.collect({
        "xdCode": this.xd_code,
        "ydCode": "YD0001",
        "activityCode": this.activityCode,
        "srcStaffCode": this.staffCode||"",
        "openId": this.openId
      });
      //数据收集
      //如果是小白，且为导购分享链接，则关注门店
      if (this.tokenInfo.imInfo===null){
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0004",//需要绑定手机号
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode||"",
          "openId": this.openId
        });
      }else{
        this.collect({
          "xdCode": this.xd_code,
          "ydCode": "YD0003",//无需绑定手机号
          "activityCode": this.activityCode,
          "srcStaffCode": this.staffCode||"",
          "openId": this.openId
        });
      }

      this.initWxConfig();
    },
    mounted(){
      this.whetherAttend();
      this.activityContent();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../../assets/css/function';

  .double_12_index {
    position: relative;
    height: 101%;
    &.static {
      overflow: hidden;
    }
    .banner {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(1025px);
      z-index: 1;
    }
    .main-content {
      position: absolute;
      left: 0;
      top: px2rem(750px);
      width: 100%;
      text-align: center;
      margin: 0 auto;
      z-index: 2;
      .title {
        display: inline-block;
        font-size: px2rem(24px);
        color: #fff;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          left: px2rem(-30px);
          top: px2rem(5px);
          width: px2rem(17px);
          height: px2rem(16px);
          background: url(/static/images/activity/applet/double_12/unit.png) center no-repeat;
          background-size: 100% 100%;
        }
        &::after {
          content: "";
          position: absolute;
          right: px2rem(-30px);
          top: px2rem(5px);
          width: px2rem(17px);
          height: px2rem(16px);
          background: url(/static/images/activity/applet/double_12/unit.png) center no-repeat;
          background-size: 100% 100%;
        }
      }
      .content1 {
        width: 100%;
        height: auto;
        background-color: #23035C;
        .store {
          margin: px2rem(41px) px2rem(52px) px2rem(73px);
          padding: px2rem(38px);
          height: px2rem(114px);
          background-color: #fff;
          border-radius: px2rem(10px);
          .logo {
            width: px2rem(113px);
            height: px2rem(113px);
            float: left;
          }
          .store-info {
            float: left;
            width: 75%;
            height: px2rem(113px);
            margin: px2rem(13px) 0 0 px2rem(22px);
            text-align: left;
            h3 {
              color: #333333;
              height: px2rem(50px);
              line-height: px2rem(50px);
              font-size: px2rem(36px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            > div {
              color: #999999;
              height: px2rem(50px);
              line-height: px2rem(50px);
              font-size: px2rem(24px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

          }
        }
        .tip-content {
          width: 100%;
          margin: px2rem(20px) auto;
          .tip {
            height: px2rem(35px);
            line-height: px2rem(35px);
            font-size: px2rem(36px);
            color: #fff;
            font-weight: 400;
            border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);
            padding: px2rem(17px) px2rem(17px);
            display: inline-block;
            span {
              color: #FFE901;
            }
          }
        }
        .gifts-content {
          width: 100%;
          height: px2rem(250px);
          display: flex;
          justify-content: space-around;
          align-items: center;
          .gifts-item {
            width: px2rem(199px);
            height: 100%;
            display: flex;
            flex-direction: column;
            .gifts-item-info {
              width: px2rem(199px);
              height: px2rem(199px);
              border-radius: px2rem(20px);
              background-color: #FFE801;
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
              .img {
                height: px2rem(150px);
                display: flex;
                align-items: center;
                img {
                  /*max-width:100%;*/
                  max-height: px2rem(150px);
                }
              }
              p {
                height: px2rem(21px);
                line-height: px2rem(21px);
                font-size: px2rem(20px);
                color: #FF0000;
                margin: px2rem(10px) auto;
              }
              .exchange {
                position: absolute;
                right: -6%;
                top: 7%;
                color: #FF0000;
                font-size: px2rem(30px);
                border: 1px solid #FF0000;
                padding: px2rem(5px);
                transform: rotate(45deg);
                -ms-transform: rotate(45deg); /* IE 9 */
                -moz-transform: rotate(45deg); /* Firefox */
                -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
                -o-transform: rotate(45deg); /* Opera */
              }
            }
            .gifts-item-title {
              width: px2rem(199px);
              margin-top: px2rem(25px);
              color: #FFE801;
              font-size: px2rem(26px);
            }
          }
        }
        .gifts-progress {
          height: px2rem(44px);
          margin: px2rem(40px) px2rem(36px);
          padding: px2rem(8px) px2rem(10px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          background-color: #380782;
          text-align: left;
          border-radius: px2rem(30px);
          position: relative;
          .gifts-progress-img {
            position: absolute;
            left: px2rem(10px);
            top: px2rem(8px);
            /*width: 60%;*/
            max-width: 100%;
            height: px2rem(44px);
            background: url("/static/images/activity/applet/double_12/progress.png") 0 no-repeat;
            background-size: px2rem(650px) px2rem(44px);
            border-radius: px2rem(22px);
          }
          .gifts-progress-num {
            position: absolute;
            left: px2rem(10px);
            top: px2rem(8px);
            /*width: 60%;*/
            min-width: 21%;
            max-width: 100%;
            height: px2rem(44px);
            line-height: px2rem(44px);
            text-align: center;
            color: #FFE801;
            font-size: px2rem(24px);
          }
        }
        .edge {
          width: 100%;
          height: px2rem(622px);
          background: url(/static/images/activity/applet/double_12/arc_bg.png) center no-repeat;
          background-size: 100%;
          .tip2 {
            color: #FFE801;
            font-size: px2rem(36px);
            margin: px2rem(50px) auto;
          }
          .tip3 {
            color: rgba(255, 255, 255, 0.52);
            font-weight: 300;
            font-size: px2rem(24px);
            line-height: px2rem(28px);
          }
          .tip4 {
            width: px2rem(647px);
            height: px2rem(153px);
            margin-top: 43%;
          }
        }

      }
      .content2 {
        background-color: #3B0A87;
        width: 100%;
        margin-top: -5%;
        padding-top: 5%;
        padding-bottom: px2rem(58px);
        .tip1 {
          font-size: px2rem(30px);
          color: #fff;
          margin: px2rem(36px) px2rem(75px) px2rem(75px);
          line-height: px2rem(36px);
          font-weight: 300;
          text-align: center;
          span {
            color: #FFE801;
          }
        }
        .gifts {
          position: relative;
          height: px2rem(377px);
          border-radius: px2rem(20px);
          background-color: #5315B1;
          margin: px2rem(60px) px2rem(52px) px2rem(40px);
          /*padding: px2rem(20px);*/
          display: flex;
          .left {
            width: px2rem(303px);
            position: relative;
            background-color: #E29894;
            border-radius: px2rem(20px) 0 0 px2rem(20px);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 3;
            .gifts-coupon {
              position: absolute;
              left: 0;
              top: 32%;
              width: 100%;
              display: flex;
              align-items: flex-start;
              justify-content: center;
              color: #fff;
              font-weight: bold;
              font-size: px2rem(100px);
              span {
                font-size: px2rem(40px);
              }
            }
            .gifts-tip {
              font-size: px2rem(30px);
              color: #fff;
              position: absolute;
              left: 0;
              top: 62%;
              width: 100%;
            }
            .gifts-title {
              font-size: px2rem(30px);
              color: #fff;
              position: absolute;
              left: 0;
              top: 85%;
              width: 100%;
              span {
                font-size: px2rem(24px);
              }
            }
            img {
              width: px2rem(59px);
              height: px2rem(59px);
              position: absolute;
              right: -10%;
              top: 39%;
            }

          }
          .right {
            width: px2rem(342px);
            border-radius: 0 px2rem(20px) px2rem(20px) 0;
            position: relative;
            z-index: 2;
            img {
              width: px2rem(342px);
              height: px2rem(377px);
              border-radius: 0 px2rem(20px) px2rem(20px) 0;
            }
            .gifts-name {
              position: absolute;
              top: 10%;
              left: 8%;
              color: #fff;
              font-size: px2rem(36px);
            }
            .gifts-scale {
              position: absolute;
              top: 32%;
              width: 100%;
              left: 0;;
              color: #E34444;
              font-size: px2rem(36px);
            }

          }
        }
        .btn {
          margin: px2rem(30px) px2rem(49px);
          height: px2rem(100px);
          line-height: px2rem(100px);
          text-align: center;
          font-size: px2rem(36px);
          border-radius: px2rem(49px);
        }
        .btn-call {
          color: #fff;
          background-color: #190041;
          img {
            width: px2rem(33px);
            height: px2rem(33px);
            margin-right: px2rem(20px);
          }
        }
        .btn-share {
          color: #7E26F9;
          background-color: #FFE801;
        }
        .btn-nostart {
          background-color: rgba(83, 40, 150, 1);
          color: #fff;
        }
        .tip2 {
          font-size: px2rem(30px);
          color: #fff;
          margin-top: px2rem(13px);
        }
        .report-btn-down, .report-btn-up {
          position: relative;
          height: px2rem(33px);
          line-height: px2rem(33px);
          font-size: px2rem(25px);
          color: #fff;
          margin: px2rem(50px) 0 0 55%;
          display: inline-block;
        }
        .report-btn-down::after {
          content: "";
          position: absolute;
          right: px2rem(-50px);
          top: 0;

          width: px2rem(33px);
          height: px2rem(33px);
          background: url(/static/images/activity/applet/double_12/down.png) center no-repeat;
          background-size: 100% 100%;
        }
        .report-btn-up::after {
          content: "";
          position: absolute;
          right: px2rem(-50px);
          top: 0;
          width: px2rem(33px);
          height: px2rem(33px);
          background: url(/static/images/activity/applet/double_12/up.png) center no-repeat;
          background-size: 100% 100%;
        }
        .active-content {
          background: rgba(83, 21, 177, 1);
          border-radius: px2rem(20px);
          margin: px2rem(39px) px2rem(52px) px2rem(49px);
          padding: px2rem(20px) px2rem(52px) px2rem(52px);
          p {
            font-size: px2rem(26px);
            color: #fff;
            margin-top: px2rem(30px);
            line-height: px2rem(32px);
            text-align: left;
          }
        }
      }
    }
    .popWindow {
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
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        z-index: 1;
      }
      .pop-contain {
        position: absolute;
        top: 50%;
        left: 50%;
        width: px2rem(530px);
        transform: translate(-50%, -50%);
        overflow: hidden;
        background-color: #fff;
        border-radius: px2rem(16px);
        text-align: center;
        opacity: 1;
        z-index: 2;
      }
      .close {
        position: absolute;
        left: 80%;
        top: px2rem(160px);
        width: px2rem(50px);
        height: px2rem(50px);
        z-index: 9;
      }
      /*兑换成功*/
      .success-contain {
        width: px2rem(522px);
        height: px2rem(624px);
        background-color: #4D0BAA;
        border-radius: px2rem(20px);
        text-align: center;
        h3 {
          color: #fff;
          font-size: px2rem(48px);
          margin: px2rem(99px) auto px2rem(20px);
        }
        .tip1 {
          color: #fff;
          font-size: px2rem(30px);

        }
        img {
          width: px2rem(239px);
          height: px2rem(239px);
          border-radius: px2rem(10px);
          margin: px2rem(53px) auto px2rem(36px);
        }
        .tip2 {
          color: #fff;
          font-size: px2rem(20px);
          line-height: px2rem(36px);
        }
      }
    }
    /*成功*/
    .success-pop {
      .gift-img {
        position: absolute;
        left: 50%;
        top: 15%;
        transform: translate(-50%, 0%);
        width: px2rem(428px);
        height: px2rem(363px);
        z-index: 3;
      }
      .success-contain {
        width: px2rem(629px);
        height: px2rem(396px);
        background: #4D0BAA;
        border-radius: px2rem(45px);
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .tip1 {
          font-size: px2rem(36px);
          color: #fff;
          margin-top: 18%;
          line-height: px2rem(50px);
          span {
            color: #FF4180;
            font-size: px2rem(48px);
          }
        }

      }
      .tip2 {
        position: absolute;
        left: 50%;
        top: 68%;
        width: 100%;
        text-align: center;
        transform: translate(-50%, 0%);
        font-size: px2rem(30px);
        color: #fff;
        opacity: 1;
        z-index: 999;
      }
      .btn-content {
        margin: 0 px2rem(10px);
        height: px2rem(100px);
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #5315B1;
        font-size: px2rem(36px);
        .btn {
          width: px2rem(253px);
          height: px2rem(90px);
          line-height: px2rem(90px);
          text-align: center;
          border-radius: px2rem(45px);
          font-size: px2rem(36px);
          margin-top: 5%;
        }
        .red-btn {
          background-color: #FF4180;
          color: #fff;
        }
        .blue-btn {
          background-color: #FFE801;
          color: #7E26F9;
        }
      }

    }

    //用户绑定弹窗
    .bindMobileNum {
      .close {
        top: 19%;
        left:84%;
      }
      .bindMobileNum-contain {
        width: px2rem(629px);
        height: px2rem(582px);
        background-color: #4D0BAA;
        border-radius: px2rem(20px);

        .pop-title {
          color: #fff;
          font-size: px2rem(30px);
          text-align: left;
          margin: px2rem(67px) 0 px2rem(31px) px2rem(58px);
        }

        .mobileNum {
          display: block;
          width: px2rem(471px);
          margin: 0 auto;
          height: px2rem(104px);
          font-size: px2rem(30px);
          background-color: #23035C;
          text-indent: px2rem(8px);
          box-sizing: content-box;
          padding: 0 px2rem(27px);
          color: #fff;
        }
        .mobileNum::-webkit-input-placeholder {
          font-size: px2rem(30px);
          color: #fff;
        }
        .rows {
          width: px2rem(525px);
          margin: 0 auto;
          height: px2rem(96px);
          padding: 0;
          margin-top: px2rem(30px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .verificationCode {
            width: px2rem(244px);
            height: px2rem(96px);
            line-height: px2rem(96px);
            font-size: px2rem(30px);
            background-color: #23035C;
            padding: 0 px2rem(28px);
            color:#fff;
          }
          .verificationCode::-webkit-input-placeholder {
            color:#fff;
            font-size: px2rem(30px);
          }
          .sendvCode {
            width: px2rem(205px);
            height: px2rem(96px);
            line-height: px2rem(96px);
            margin: 0;
            font-size: px2rem(30px);
            text-align: center;
            background-color: #FFE701;
            color: #7E26F9;
            border-radius: px2rem(6px);
          }
          .run {
            background-color: #fff;
          }
        }
        .btn-contain {
          margin: px2rem(55px) auto;
          text-align: center;
          .btn-bind {
            position: relative;
            display: inline-block;
            width: px2rem(525px);
            height: px2rem(100px);
            line-height: px2rem(100px);
            font-size: px2rem(36px);
            color: #7E26F9;
            text-align: center;
            background-color: #FFE701;
            border-radius: 50px;
          }
        }
      }
    }
  }
</style>
