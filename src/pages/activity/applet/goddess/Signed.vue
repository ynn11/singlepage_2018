<template>
    <div class="guide-slot_prize-box">
        <div class="mainContent">
            <img src="/static/images/activity/applet/goddess/bg.jpg" alt="" class="main_bg">
            <div class="content-box">
                <div class="time">2018/3/7 - 2018/3/11</div>
                <img src="/static/images/activity/applet/goddess/signed-tip.png" alt="" class="signed-tip">
                <div class="barcode-contain">
                    <barcode :value="activityInfo.pickCode" :options="{ displayValue: false }" class="barcode"></barcode>
                    <p class="value">{{activityInfo.pickCode}}</p>
                </div>
                <div class="store-info">
                    <div class="storeName">领取门店：{{activityInfo.storeName}}</div>
                    <div class="storeAddr">门店地址：{{activityInfo.connectAddress}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../../fetch/api'
import * as _validate from "../../../../util/validate"
import * as _tool from "../../../../util/tool"
import _urlConfig from "../../../../util/urlConfig"
import VueBarcode from '@xkeshi/vue-barcode'
export default {
    components: {
        'barcode': VueBarcode
    },
    //判断登录
    computed: {
        tokenInfo () {
            let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
            return tokenInfo;
        },
        openId(){
            let openId = this.$store.state.user.openId;
            return openId;
        }
    },
    data() {
        return {
            activityInfo: {
                pickCode: ""
            },
        }
    },
    methods: {
        //是否参加活动
        whetherAttendGoddessActivity: function(){
            api.whetherAttendGoddessActivity("get",{},this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    this.activityInfo = res.returnContent;
                }else{
                    alert(res.message);
                }
            })
        },
        //初始化分享
        initWxShare: function(){
            let _this = this;
            let link = _urlConfig.redirectBaseredirectURI + '/activity_2018/goddess?xd_code=XD0005';
            if (this.storeCode) {
                link += '&storeCode=' + this.storeCode;
            }
            if (this.staffCode) {
                link += '&staffCode=' + this.staffCode;
            }
            window.wx.ready(function(){
                wx.onMenuShareAppMessage({
                    title: '女王节，来就送！', // 分享标题
                    desc: '身边店女王节正式开启，进店无门槛送168元钻石碗套装，消费达标更有398元豪华洗护套装，一切只等你开启！', // 分享描述
                    link: encodeURI(link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {

                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareTimeline({
                    title: '女王节，来就送！', // 分享标题
                    desc: '身边店女王节正式开启，进店无门槛送168元钻石碗套装，消费达标更有398元豪华洗护套装，一切只等你开启！', // 分享描述
                    link: encodeURI(link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                    success: function () {

                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        },
        //初始化微信
        initWxConfig(){
            api.getSignMap("post",{url: location.href}).then(res => {
                let content = res.returnContent;
                window.wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: content.appId, // 必填，公众号的唯一标识
                    timestamp: content.timestamp, // 必填，生成签名的时间戳
                    nonceStr: content.nonceStr, // 必填，生成签名的随机串
                    signature: content.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','showMenuItems','hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                this.initWxShare();
            });
        },
    },
    mounted(){
        this.whetherAttendGoddessActivity();
        this.initWxConfig();
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .guide-slot_prize-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            // height: 100%;
            background-color: #ffa1d6;
            .main_bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 0;
            }
        }
        .content-box{
            position: relative;
            display: block;
            width: 100%;
            overflow: hidden;
            .time{
                width: px2rem(475px);
                height: px2rem(49px);
                line-height: px2rem(49px);
                font-size: px2rem(34px);
                color: #fff;
                margin: px2rem(685px) auto px2rem(60px);
                background-color: #fd7094;
                text-align: center;
            }
            .signed-tip{
                display: block;
                width: px2rem(394px);
                margin: 0 auto;
            }
            .barcode-contain{
                position: relative;
                margin: px2rem(72px) auto;
                width: px2rem(450px);
                height: px2rem(220px);
                background-color: #fff;
                border-radius: px2rem(8px);
                overflow: hidden;
                .barcode{
                    display: block;
                    width: px2rem(370px);
                    height: px2rem(160px);
                    margin: px2rem(10px) auto 0 ;
                }
                .value{
                    width: 100%;
                    text-align: center;
                    font-size: px2rem(36px);
                    letter-spacing: px2rem(15px);
                }
            }
            .store-info{
                font-size: px2rem(26px);
                line-height: px2rem(32px);
                color: #fff;
                text-align: center;
                overflow: hidden;
                .storeName{
                    margin-bottom: px2rem(20px);
                }
                .storeAddr{
                    margin-bottom: px2rem(70px);
                }
            }
        }
    }
</style>
