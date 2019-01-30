<template>
    <div class="goddess-index-box">
        <div class="mainContent">
            <div class="time">2018/3/7 - 2018/3/11</div>
            <div class="turn-btn" @click="routerLink('goddess_rules')">点击查看活动详情</div>
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
                <div class="confirm-btn btn" @click="scan">马上领取</div>
            </div>
        </div>
        <div class="pop_prize popWindow" v-show="popShow">
            <div class="mask"></div>
            <div class="pop-contain">
                <img src="/static/images/activity/guide/goddess/pop_bg.png" alt="" class="pop_bg">
                <div class="title" v-show="successShow">领取成功</div>
                <div class="title" v-show="falseShow">该会员已领取奖品</div>
                <div class="btn" @click="popShow=false;successShow=false;falseShow=false;">确定</div>
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
                activityCode: "a19f63bd38b344749865a028e10ca42b",
                memberList: {},
                shareContent: {
                    title: "女王节，来就送！",
                    content: "身边店女王节正式开启，进店无门槛送168元钻石碗套装，消费达标更有398元豪华洗护套装，一切只等你开启！",
                    linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/goddess",
                    imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
                },
                popShow: false,
                successShow: false,
                falseShow: false
            }
        },
        methods: {
            //数据收集
            collect: function(data){
                api.collectStatisticsOnActivitiesByStaff("post",data,this.token).then(res => {});
            },
            //打电话
            call: function(mobileNum){
                WebViewJavascriptBridge.callHandler('call',mobileNum,function(response) {

                });
            },
            //扫码消券
            scan: function(){
                var that = this;
                WebViewJavascriptBridge.callHandler('getBarcode',null,function(response) {
                    that.scanGoddessActivityPickCode(response);
                });
            },
            //扫码
            scanGoddessActivityPickCode: function(barcode){
                api.scanGoddessActivityPickCode("get",{pickCode: barcode},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.popShow = true;
                        this.successShow = true;
                    }else{
                        this.popShow = true;
                        this.falseShow = true;
                    }
                });
            },
            //分享
            doShare: function(){
                this.collect({
                    "xdCode": "XD0007",
                    "ydCode": "YD0010",
                    "activityCode": this.activityCode
                });
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
                api.getGoddessActivityMemberList("get",{},this.token).then((res)=>{
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
                        let desc = '身边店女王节正式开启，进店无门槛送168元钻石碗套装，消费达标更有398元豪华洗护套装，一切只等你开启！';
                        if (['c2abf97eb4794d3daa31ce953c0eb6b4','2c6d479329964130bf29f05e89559c37','b2d87b88d180458a8926c1d9e9d8d44f','a2ccd2e79c1f44ada062dd8f0d2329bb'].indexOf(res.returnContent.storeCode) > -1) {
                            desc = '身边店女王节正式开启，任意消费即可领取168元钻石碗套装，消费达标更有398元豪华洗护套装，一切只等你开启！';
                        }
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
        background-color: #ffa1d6;
        overflow-x: hidden;
        overflow-y: scroll;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling : touch;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        .mainContent{
            position: relative;
            background: url(/static/images/activity/applet/goddess/bg.jpg) top center no-repeat;
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
                background: url(/static/images/activity/guide/goddess/turn_btn.png) bottom center  no-repeat;
                background-size: 100% 100%;
                margin: px2rem(36px) auto px2rem(60px);
                font-size: px2rem(34px);
                color: #fff;
                line-height: px2rem(87px);
                text-indent: px2rem(36px);
            }
            .memberList-contain{
                overflow: hidden;
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
                            background: url(/static/images/activity/guide/goddess/phone_icon.png) center center no-repeat;
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
                    width: px2rem(272px);
                    height: px2rem(108px);
                    line-height: px2rem(108px);
                    background-color: #fd7094;
                    border-radius: px2rem(60px);
                    font-size: px2rem(36px);
                    color: #fff;
                }
                .share-btn{
                    float: left;
                }
                .confirm-btn{
                    float: right;
                }
            }
        }
        .popWindow{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling : touch;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            z-index:999;
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.6);
            }
            .pop-contain{
                position: absolute;
                top: 50%;
                left: 50%;
                width: px2rem(606px);
                height: px2rem(489px);
                transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
                -o-transform: translate(-50%,-50%);
                overflow: hidden;
                .pop_bg{
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }
                .title{
                    font-size: px2rem(49px);
                    color: #fff;
                    font-weight: bold;
                    letter-spacing: px2rem(5px);
                    margin: px2rem(148px) 0 px2rem(108px);
                    text-align: center;
                }
                .btn{
                    display: block;
                    width: px2rem(423px);
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    font-size: px2rem(36px);
                    color: #FFF;
                    letter-spacing: px2rem(5px);
                    margin: px2rem(60px) auto 0;
                    font-weight: bold;
                    text-align: center;
                    background-color: #fd7094;
                    border-radius: px2rem(100px);
                    z-index: 4;
                }
            }
        }
    }
</style>
