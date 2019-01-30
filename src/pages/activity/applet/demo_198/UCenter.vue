<template>
    <div class="demo_198-uCenter">
        <div class="mainContent">
            <div class="info">
                <img :src="activityInfo.headPicUrl" alt="" class="headPic">
                <p class="name">{{activityInfo.nickName}}</p>
                <p class="storeName">{{activityInfo.storeName}} <span>超级VIP</span></p>
                <p class="tip"><i class="iconfont icon-wallet"></i>我的分红（元）</p>
                <p class="bonus">{{activityInfo.bonus}}</p>
            </div>
            <div class="bought friendList">
                <p class="tip">已购买的好友</p>
                <div v-if="activityInfo.purchaseList.length>0">
                    <div :class="'item ' + [index===0?'first':'']" v-for="(item,index) in activityInfo.purchaseList">
                        <img :src="item.headPicUrl" alt="" class="headPic">
                        <p class="name">{{item.nickName}}</p>
                    </div>
                </div>
                <div class="noList"  v-else>
                    还没有好友购买哦！
                </div>
            </div>
            <div class="viewed friendList">
                <p class="tip">浏览过的好友</p>
                <div v-if="activityInfo.browseList.length>0">
                    <div :class="'item ' + [index===0?'first':'']" v-for="(item,index) in activityInfo.browseList">
                        <img :src="item.headPicUrl" alt="" class="headPic">
                        <p class="name">{{item.nickName}}</p>
                    </div>
                </div>
                <div class="noList"  v-else>
                    还没有好友浏览哦！
                </div>
            </div>
            <div class="btn share" @click="doShare">分享给好友</div>
            <div class="btn account" @click="setAccount">设置提现账户</div>
        </div>
        <v-loading v-show="loading"></v-loading>
        <wxShareTip :shareTipShow="shareTipShow"></wxShareTip>
    </div>
</template>

<script>
import wxShareTip from "@/components/common/wxShareTip"

import api from '../../../../fetch/api'
import * as _tool from "../../../../util/tool"
import _urlConfig from "../../../../util/urlConfig"
import * as _validate from "../../../../util/validate"

import loading from '@/components/common/loading'
export default {
    components: {
        "v-loading": loading,
        wxShareTip
    },
    //判断登录
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if(sessionStorage.entryMark !== "marked"){
                sessionStorage.entryMark = "marked"
                vm.$router.go(0);
                return;
            }
        })
    },
    data() {
        return {
            storeCode: this.$route.query.storeCode,
            staffCode: this.$route.query.staffCode,
            loading: false,
            shareTipShow: false,
            activityInfo: {
                purchaseList: [],
                browseList: []
            }
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
        }
    },
    methods: {
        //分享
        doShare(){
            this.shareTipShow = true;
        },
        //设置提现账户
        setAccount(){
            let src = "/activity_2018/demo_198_account?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
            this.$router.push({
                path: src
            });
        },
        //返回首页
        toHome(){
            let src = "/activity_2018/demo_198?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode;
            this.$router.replace(src);
        },
        //是否参加活动
        whetherAttend(){
            api.whetherAttendVipActivity("get",{},this.tokenInfo.token).then(res => {
                if(res.returnCode==="0"){
                    if (res.returnContent.attendFlag===0) {
                        this.toHome();
                        return;
                    }
                    this.activityInfo = res.returnContent;
                    this.initWxShare();
                    this.loading = false;
                }else if(res.returnCode==="10"){
                    let fullPath = location.pathname + location.search;
                    let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(fullPath);
                    location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
                }else{
                    this.$toast(res.message);
                    this.toHome();
                }
            })
        },
        //初始化分享
        initWxShare: function(){
            let _this = this;
            let title = "198会员卡";
            let link = _urlConfig.redirectBaseredirectURI + "/activity_2018/demo_198?storeCode=" + this.storeCode + "&staffCode=" + this.staffCode + "&memberCode=" + this.activityInfo.memberCode;
            let desc = '198会员卡限额100个！';
            window.wx.ready(function(){
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: encodeURI(link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        _this.shareTipShow = false;
                        localStorage.goddessShare = "true";
                        _this.getChance();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareTimeline({
                    title: '女王节，来就送！', // 分享标题
                    desc: desc, // 分享描述
                    link: encodeURI(link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'http://static.storeer.com/getheadimg_300.png', // 分享图标
                    success: function () {
                        _this.shareTipShow = false;
                        localStorage.goddessShare = "true";
                        _this.getChance();
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
            });
        },
    },
    mounted(){
        //如果是小白，且为导购分享链接，则关注门店
        if (this.tokenInfo.imInfo===null){
            this.toHome();
        }else{
            this.whetherAttend();
            this.initWxConfig();
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .demo_198-uCenter{
        position: relative;
        height: 101%;
        .mainContent{
            padding-bottom: px2rem(300px);
            .info{
                overflow: hidden;
                .headPic{
                    float: left;
                    width: px2rem(90px);
                    height: px2rem(90px);
                    border-radius: 50%;
                    margin: px2rem(40px) px2rem(30px);
                }
                .name{
                    font-size: px2rem(36px);
                    margin-top: px2rem(50px);
                    color: #2c2c2c;
                }
                .storeName{
                    font-size: px2rem(26px);
                    margin-top: px2rem(20px);
                    color: #727272;
                }
                .tip{
                    font-size: px2rem(22px);
                    color: #9b9b9b;
                    margin-top: px2rem(60px);
                    text-indent: px2rem(30px);
                    .iconfont{
                        font-size: px2rem(32px);
                        color: #a6a6a6;
                        margin-right: px2rem(15px);
                    }
                }
                .bonus{
                    font-size: px2rem(72px);
                    color: #ec4b4b;
                    margin: px2rem(50px) 0 px2rem(36px);
                    text-indent: px2rem(30px);
                }
            }
            .friendList{
                border-top: px2rem(10px) solid #f2f2f2;
                padding: px2rem(20px) px2rem(75px) 0;
                .tip{
                    margin: px2rem(15px) 0;
                    text-indent: px2rem(-40px);
                }
                .item{
                    position: relative;
                    height: px2rem(102px);
                    overflow: hidden;
                    margin-left: px2rem(-40px);
                    &.first{
                        &:after{
                            content: none;
                        }
                    }
                    &:after{
                        content: "";
                        position: absolute;
                        left: px2rem(40px);
                        top: 0;
                        width: 100%;
                        height: 1px;
                        background-color: #f3f3f3;
                    }
                    .headPic{
                        float: left;
                        margin: px2rem(24px) px2rem(15px) px2rem(24px) 0;
                        width: px2rem(60px);
                        height: px2rem(60px);
                        border-radius: 50%;
                    }
                    .name{
                        line-height: px2rem(102px);
                    }
                }
                .noList{
                    line-height: px2rem(60px);
                    text-indent: px2rem(-40px);
                }
            }
            .btn{
                position: fixed;
                bottom: px2rem(184px);
                left: 50%;
                margin-left: px2rem(-307px);
                width: px2rem(584px);
                height: px2rem(90px);
                line-height: px2rem(90px);
                font-size: px2rem(36px);
                color: #fff;
                text-align: center;
                background: linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                background: -webkit-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                background: -moz-linear-gradient(90deg,#a32e2b, #cc3228, #a32e2b);
                border-radius: px2rem(100px);
                z-index: 4;
                &.account{
                    bottom: px2rem(54px);
                }
            }
        }
    }
</style>
