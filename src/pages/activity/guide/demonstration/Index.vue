<template>
    <div class="goddess-index-box">
        <div class="mainContent">
            <div class="memberList-contain">
                <img src="/static/images/activity/guide/goddess/mem-title.png" alt="" class="title">
                <div class="list" v-if="memberList.length>0">
                    <div class="item" v-for="(item,index) in memberList">
                        <img :src="item.headPicUrl" alt="" class="headpic">
                        <p class="name">{{item.nickName}}<span v-if="item.trueName">（{{item.trueName}}）</span></p>
                        <p class="mobileNum">{{item.mobileNum}}</p>
                        <div class="call" @click="call(item.mobileNum)"></div>
                    </div>
                </div>
                <div class="list" v-else>
                    <div class="nolist">暂无参加活动会员</div>
                </div>
            </div>
            <div class="btns">
                <div class="share-btn btn" @click="doShare">分享</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../../fetch/api'
    import _urlConfig from "../../../../util/urlConfig"
    import * as _tool from "../../../../util/tool"

    export default {
        components: {
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "dc4501ea1e92420a90c13b07d1d30da0",
                memberList: {},
                shareContent: {
                    title: "疯了，疯了，老板娘居然干了这事！",
                    content: "3176元的礼品全部送给你，全年优享6.9折的实惠你带回去！",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/demonstration",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                popShow: false,
                successShow: false,
                falseShow: false
            }
        },
        methods: {
            //打电话
            call: function(mobileNum){
                WebViewJavascriptBridge.callHandler('call',mobileNum,function(response) {

                });
            },
            //分享
            doShare: function(){
                WebViewJavascriptBridge.callHandler('share',this.shareContent,function(response) {
                    alert("分享成功");
                });
            },
            //跳转
            routerLink: function(page){
                this.$router.push({
                    "path": "/activity_2018/" + page + "?token=" + this.token + "&type=" + this.type
                });
            },
            //获取会员列表
            getMemberList: function(){
                api.getActivityMemberList("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.memberList = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            getShopGuideInfo: function(){
                api.getShopGuideInfo("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode + "&xd_code=XD0001";
                        this.shareContent.content = desc;
                    }else{
                        alert(res.message);
                    }
                });
            }
        },
        mounted(){
            this.getShopGuideInfo();
            this.getMemberList();
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.type);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .goddess-index-box{
        position: relative;
        height: 100%;
        background-color: #ef3a64;
        overflow-x: hidden;
        overflow-y: scroll;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling : touch;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        .mainContent{
            position: relative;
            background: url(/static/images/activity/guide/demonstration/bg.jpg) top center no-repeat;
            background-size: 100% auto;
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
            .turn-btn{
                width: px2rem(475px);
                height: px2rem(87px);
                background: url(/static/images/activity/guide/demonstration/turn_btn.png) bottom center  no-repeat;
                background-size: 100% 100%;
                margin: px2rem(36px) auto px2rem(60px);
                font-size: px2rem(34px);
                color: #fff;
                line-height: px2rem(87px);
                text-indent: px2rem(36px);
            }
            .memberList-contain{
                overflow: hidden;
                margin-top: px2rem(600px);
                .title{
                    display: block;
                    width: px2rem(582px);
                    margin: 0 auto;
                }
                .list{
                    overflow: hidden;
                    padding: 0 0 px2rem(268px);
                    width: px2rem(540px);
                    margin: 0 auto;
                    .nolist{
                        font-size: px2rem(32px);
                        color: #fff;
                        height: px2rem(90px);
                        line-height: px2rem(90px);
                        text-align: center;
                    }
                    .item{
                        position: relative;
                        overflow: hidden;
                        border-bottom: 1px solid #ffc5e3;
                        .headpic{
                            float: left;
                            display: block;
                            width: px2rem(88px);
                            height: px2rem(88px);
                            border-radius: 50%;
                            margin: px2rem(20px) px2rem(36px) px2rem(20px) 0;
                            background-color: #eee;
                        }
                        .name{
                            font-size: px2rem(26px);
                            color: #fff;
                            line-height: px2rem(46px);
                            margin-top: px2rem(20px);
                        }
                        .mobileNum{
                            font-size: px2rem(26px);
                            color: #fff;
                            line-height: px2rem(46px);
                        }
                        .call{
                            position: absolute;
                            top: 50%;
                            right: 0;
                            display: block;
                            width: px2rem(42px);
                            height: px2rem(42px);
                            transform: translateY(-50%);
                            -webkit-transform: translateY(-50%);
                            -o-transform: translateY(-50%);
                            background: url(/static/images/activity/guide/demonstration/phone_icon.png) center center no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .btns{
                position: fixed;
                left: 50%;
                bottom: px2rem(60px);
                width: px2rem(594px);
                text-align: center;
                transform: translateX(-50%);
                -webkit-transform: translateX(-50%);
                -o-transform: translateX(-50%);
                .btn{
                    display: inline-block;
                    width: px2rem(454px);
                    height: px2rem(119px);
                    line-height: px2rem(119px);
                    font-size: px2rem(36px);
                    color: #fff;
                    text-align: center;
                    background: url(/static/images/activity/applet/demonstration/btn_bg.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>
