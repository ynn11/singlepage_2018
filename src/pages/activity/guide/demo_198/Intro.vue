<template>
    <div class="demo_198-box">
        <div class="mainContent">
            <!-- <img src="/static/images/activity/applet/198/main_title.png" class="main_bg" alt="">
            <img src="/static/images/activity/applet/198/card.png" class="main_bg" alt=""> -->
            <img src="/static/images/activity/applet/198/content2.png" class="main_bg" alt="">
            <div class="btn doShare" @click="doShare">分享活动</div>
            <div class="btn members" @click="routerLink('demo_198_members')">查看我的活动会员</div>
        </div>
    </div>
</template>

<script>
import api from '../../../../fetch/api'
import * as _tool from "../../../../util/tool"
import _urlConfig from "../../../../util/urlConfig"

export default {
    data() {
        return {
            token: this.$route.query.token,
            type: this.$route.query.type,
            memberList: {},
            shareContent: {
                title: "198会员卡",
                content: "198会员卡限量领取！",
                linkUrl: _urlConfig.redirectBaseredirectURI + "/activity_2018/demo_198",
                imgUrl: "http://static.storeer.com/resource/daogou_logo.png"
            }
        }
    },
    methods: {
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
        getShopGuideInfo: function(){
            api.getShopGuideInfo("get",{},this.token).then((res)=>{
                if(res.returnCode==="0"){
                    this.shareContent.linkUrl = this.shareContent.linkUrl + "?staffCode=" + res.returnContent.staffCode + "&storeCode=" + res.returnContent.storeCode ;
                }else{
                    alert(res.message);
                }
            });
        }
    },
    mounted(){
        this.getShopGuideInfo();
        //初始化webViewJavascriptBridge
        _tool.webviewBridgeInit(this.type);
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .demo_198-box{
        position: relative;
        height: 101%;
        .mainContent{
            position: relative;
            /*height: 100%;*/
            // padding:px2rem(150px) 0 px2rem(320px);
            // background: url(/static/images/activity/applet/198/bg.jpg) center repeat-y /100% auto;
            .main_bg{
                display: block;
                width: 100%;
            }
            .introduce-content{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                .coupons-contain{
                    width: px2rem(640px);
                    background-color: #fff;
                    overflow: hidden;
                    margin: 0 auto;
                    border-radius: px2rem(24px);
                    margin-top: px2rem(668px);
                    box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    -moz-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    -webkit-box-shadow: 0 px2rem(6px) px2rem(35px) 0 rgba(109,20,110,.25);
                    &.coupons-contain2{
                        margin-top: px2rem(45px);
                    }
                    .item{
                        display: block;
                        width: px2rem(578px);
                        margin: px2rem(32px) auto;
                        &.select-tip{
                            width: px2rem(340px);
                        }
                    }
                }
                .handle-tip{
                    display: block;
                    margin: px2rem(80px) auto 0;
                    width: px2rem(750px);
                }
                .rules-contain{
                    position: relative;
                    margin-top: px2rem(64px);
                    .introduce-tit{
                        display: block;
                        width: px2rem(750px);
                        margin: 0 auto;
                    }
                    .item{
                        font-size: px2rem(24px);
                        color: #fff;
                        text-indent: px2rem(60px);
                        margin-top: px2rem(24px);
                    }
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
                &.members{
                    bottom: px2rem(54px);
                }
            }
        }
    }
</style>
