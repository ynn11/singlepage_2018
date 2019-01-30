/**
 * 活动类
 * 包含活动流程中的各项操作，请求
 * @zzw
 * @DateTime 2018-06-01T10:08:08+0800
 */
import api from "../../fetch/common_api"
import _urlConfig from "../../util/urlConfig"
import * as _validate from "../../util/validate"

var ActivityClass = function (vue) {
    //加载门店列表（仅显示参与活动的门店）
    vue.loadStoreList = function(){
        api.getActivityStoreList("get",{activityCode: this.activityCode},this.tokenInfo.token).then((res)=>{
            if(res.returnCode==="0"){
                this.storeList = res.returnContent;
                if (this.storeList.length===0) {
                    this.collect({
                        "xdCode": this.xd_code,
                        "ydCode": "YD0011",
                        "activityCode": this.activityCode,
                        "openId": this.openId
                    });
                    this.noStoreShow = true;
                }else if (this.storeList.length===1) {
                    this.storeCode = res.returnContent[0].storeCode;
                    this.checkStore();
                }else{
                    this.storeListShow = true;
                }
            }else{
                this.$toast(res.message);
            }
        });
    }
    //数据收集
    vue.collect= function(data,token){
        if (token) {
            api.collectStatisticsOnActivities("post",data,token).then(res => {});
        }else{
            api.collectStatisticsOnActivities("post",data,this.tokenInfo.token).then(res => {});
        }
    },
    //粉丝关注/用户关注
    vue.concernStore= function(){
        let data = {
            "storeCode": this.storeCode,
            "staffCode": this.staffCode,
            "mobileNum": "",
            "verificationCode": "",
            "appEntranceType": 3,
            "trueName": ""
        }
        api.followStoreStaffByShare("post",data,this.tokenInfo.token).then(res => {
            if(res.returnCode==="0"){

            }else{
                this.$toast(res.message);
            }
        })
    },
    //发送绑定验证码
    vue.sendvCode= function(){
        if (_validate.mobile(this.mobileNum)!==true) {
            this.$toast(_validate.mobile(this.mobileNum))
            return;
        }
        let data = {
            "mobileNum":this.mobileNum,
            "verificationType": 5
        };
        api.sendVerificationCode("get",data).then((res)=>{
            if(res.returnCode==="0"){
                this.timer = 60;
                this.timerStatus = true;
                this.runTimer();
            }else{
                this.$toast(res.message);
            }
        });
    },
    //绑定手机号
    vue.bindMobileNum = function() {
        let data = {
            "mobileNum": this.mobileNum,
            "verificationCode": this.verificationCode,
            "appEntranceType": 3
        }
        if (_validate.mobile(data.mobileNum)!==true) {
            this.$toast(_validate.mobile(data.mobileNum));
            return;
        }
        if (_validate.verificationCode(data.verificationCode)!==true) {
            this.$toast(_validate.verificationCode(data.verificationCode));
            return;
        }
        api.memFansBindMobileNum("post",data,this.tokenInfo.token).then(res => {
            if(res.returnCode==="0"){
                this.$store.dispatch("_login",{tokenInfo: JSON.stringify(res.returnContent),openId: this.openId});
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0005",
                    "activityCode": this.activityCode,
                    "openId": this.openId
                },res.returnContent.token);
                this.$toast("手机号绑定成功！");
                this.checkStore();
            }else{
                this.$toast(res.message);
            }
        })
    },
    //门店选取
    vue.checkStore= function(pre){
        this.bindMobileNumShow = false;
        if (!this.storeCode) {
            this.loadStoreList();
        }else{
            this.getStoreSet(()=>{
                this.attendActivity();
            });
        }
    },
    //获取门店活动设置
    vue.getStoreSet= function(cb){
        api.activityContent("post",{
            activityCode: this.activityCode,
            storeCode: this.activityInfo.storeCode||this.storeCode,
            linkStaffCode: this.staffCode||null
        },this.tokenInfo.token).then((res)=>{
            if(res.returnCode==="0"){
                this.storeSet = res.returnContent||{};
                typeof cb === "function"&&cb();
            }else{
                this.$toast(res.message);
            }
        })
    },
    //参与活动
    vue.attendActivity= function(data,cb){
        api.activityAttend("post",data||{
            activityCode: this.activityCode,
            openId: this.openId,
            storeCode: this.storeCode||this.activityInfo.storeCode,
            linkStaffCode: this.staffCode||this.activityInfo.staffCode,
            voucherCode: this.storeSet.voucherCode||null
        },this.tokenInfo.token).then((res)=>{
            if(res.returnCode==="0"){
                typeof cb === "function"&&cb(res.returnContent);
            }else{
                this.$toast(res.message);
                this.collect({
                    "xdCode": this.xd_code,
                    "ydCode": "YD0011",
                    "activityCode": this.activityCode,
                    "openId": this.openId
                });
                this.loading = false;
            }
        })
    },
    //支付成功回调
    vue.activityConfirm = function(data,cb,from){
        api.activityConfirm("post",data,this.tokenInfo.token).then((res)=>{
            this.checkAttend(from);
            this.loading = false;
            typeof cb === "function"&&cb(res.returnContent);
        });
    }
    //门店选择
    vue.selectStore= function(item) {
      this.storeCode = item.storeCode;
      this.checkStore();
    },
      //判断是否参加活动
    vue.whetherAttend= function(cb){
        api.activityWhetherAttend("post",{
            activityCode: this.activityCode,
            linkStaffCode: this.staffCode||null,
            openId: this.openId||null,
        },this.tokenInfo.token).then((res)=>{
            if(res.returnCode==="0"){
                this.activityInfo = res.returnContent;
                typeof cb === "function"&&cb();
            }else if(res.returnCode==="10"){
                let fullPath = location.pathname + location.search;
                let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
            }else{
                this.$toast(res.message);
            }
        })
    },
    //活动分享
    vue.activityShare= function(data){
        api.activityShare("post",data,this.tokenInfo.token).then((res)=>{
            if(res.returnCode==="0"){
                this.checkAttend();
            }else{
                this.$toast(res.message);
            }
        });
    },
    //初始化微信
    vue.initWxConfig= function(){
        api.getSignMap("post",{url: location.href}).then(res => {
            let content = res.returnContent;
            window.wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: content.appId, // 必填，公众号的唯一标识
                timestamp: content.timestamp, // 必填，生成签名的时间戳
                nonceStr: content.nonceStr, // 必填，生成签名的随机串
                signature: content.signature,// 必填，签名，见附录1
                jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        });
    },
    //初始化分享
    vue.initWxShare= function(options,cb){
        window.wx.ready(function(){
            // wx.showMenuItems({
            //     menuList: [
            //         "menuItem:share:appMessage",
            //         "menuItem:share:timeline"
            //     ] // 要显示的菜单项，所有menu项见附录3
            // });
            console.log(options);
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: options.title, // 分享标题
                desc: options.desc, // 分享描述
                link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: ()=> {
                    typeof cb === "function"&&cb();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
          wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
            //分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: options.title, // 分享标题
                desc: options.desc, // 分享描述
                link: options.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                success: ()=> {
                    typeof cb === "function"&&cb();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    },
    //是否关注公众号
    vue.getSubscribeStatus= function(){
        api.getSubscribeStatus("get",{
            openId: this.openId
        }).then((res)=>{
            if (res.returnCode==='0') {
                this.subscribeStatus = res.returnContent;
            }
        })
    }
}

export default ActivityClass

//判断是否参加活动           whetherAttend（function）

//加载门店列表（仅显示参与活动的门店） loadStoreList

//门店选取         checkStore

//获取门店活动设置       getStoreSet

//门店选择             selectStore

//活动分享          activityShare

//初始化微信          initWxConfig

//初始化分享            initWxShare

//是否关注公众号          getSubscribeStatus

//参与活动             attendActivity


//支付成功回调         activityConfirm

//数据收集                 collect

//粉丝关注/用户关注            concernStore


//发送绑定验证码            sendvCode

//绑定手机号                bindMobileNum
