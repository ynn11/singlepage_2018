<template>
    <div class="demo_198-uCenter">
        <div class="mainContent">
            <div class="info">
                <p class="tip"><i class="iconfont icon-wallet"></i>我的分红（元）</p>
                <p class="bonus">{{activityInfo.bonus}}</p>
            </div>
            <div class="bought friendList">
                <p class="tip">共{{activityInfo.purchaseList.length}}人购买会员卡</p>
                <div v-if="activityInfo.purchaseList.length>0">
                    <div :class="'bought-item ' + [index===0?'first':'']" v-for="(item,index) in activityInfo.purchaseList">
                        <img :src="item.headPicUrl" alt="" class="headPic">
                        <p class="name">{{item.nickName}}</p>
                        <p class="mobile">{{item.mobileNum}}</p>
                        <p class="bonus">分红+{{item.bonus}}</p>
                        <div class="invitedList-contain" v-if="item.invitedPurchaseList.length>0">
                            <div class="invitedList-item" v-for="(iItem,iIndex) in item.invitedPurchaseList">
                                <img :src="iItem.headPicUrl" alt="" class="iHeadPic">
                                <p class="iName">{{iItem.nickName}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="noList"  v-else>
                    还没有会员购买哦！
                </div>
            </div>
            <div class="viewed friendList">
                <p class="tip">共{{activityInfo.browseList.length}}人浏览了会员卡链接</p>
                <div v-if="activityInfo.browseList.length>0">
                    <div :class="'browser-item ' + [index===0?'first':'']" v-for="(item,index) in activityInfo.browseList">
                        <img :src="item.headPicUrl" alt="" class="headPic">
                        <p class="name">{{item.nickName}}</p>
                    </div>
                </div>
                <div class="noList"  v-else>
                    还没有会员浏览哦！
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../../../fetch/api'
import * as _tool from "../../../../util/tool"
import _urlConfig from "../../../../util/urlConfig"
import * as _validate from "../../../../util/validate"

export default {
    data() {
        return {
            token: this.$route.query.token,
            type: this.$route.query.type,
            activityInfo: {
                purchaseList: [],
                browseList: []
            }
        }
    },
    methods: {
        getVipActivityInfo(){
            api.getVipActivityInfo("get",{

            },this.token).then((res)=>{
                if (res.returnCode==="0") {
                    this.activityInfo = res.returnContent;
                }else{
                    this.$toast(res.message);
                }
            });
        }
    },
    mounted(){
        this.getVipActivityInfo();
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
                .tip{
                    margin: px2rem(30px) 0;
                    text-indent: px2rem(40px);
                }
                .bought-item{
                    position: relative;
                    width: px2rem(680px);
                    min-height: px2rem(150px);
                    overflow: hidden;
                    margin: 0 auto px2rem(25px);
                    box-shadow: px2rem(10px) 0 px2rem(27px) rgba(96,96,96,.2);
                    -moz-box-shadow: px2rem(10px) 0 px2rem(27px) rgba(96,96,96,.2);
                    -o-box-shadow: px2rem(10px) 0 px2rem(27px) rgba(96,96,96,.2);
                    -webkit-box-shadow: 0 px2rem(10px) px2rem(27px) rgba(96,96,96,.2);
                    border-radius: px2rem(8px);
                    .headPic{
                        float: left;
                        margin: px2rem(30px) px2rem(25px);
                        width: px2rem(90px);
                        height: px2rem(90px);
                        border-radius: 50%;
                    }
                    .name,.mobile{
                        font-size: px2rem(26px);
                        margin-top: px2rem(33px);
                        color: #2c2c2c;
                    }
                    .bonus{
                        position: absolute;
                        top: px2rem(30px);
                        right: px2rem(40px);
                        font-size: px2rem(26px);
                        color: #ec4b4b;
                    }
                    .invitedList-item{
                        position: relative;
                        height: px2rem(102px);
                        overflow: hidden;
                        width: px2rem(640px);
                        margin-left: px2rem(25px);
                        &:after{
                            content: "";
                            position: absolute;
                            left: px2rem(10px);
                            top: 0;
                            width: 100%;
                            height: 1px;
                            background-color: #f3f3f3;
                        }
                        .iHeadPic{
                            float: left;
                            margin: px2rem(24px) px2rem(15px) px2rem(24px) 0;
                            width: px2rem(60px);
                            height: px2rem(60px);
                            border-radius: 50%;
                        }
                        .iName{
                            line-height: px2rem(102px);
                        }
                    }
                }
                .browser-item{
                    position: relative;
                    height: px2rem(102px);
                    overflow: hidden;
                    width: px2rem(640px);
                    margin-left: px2rem(40px);
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
                    text-indent: px2rem(40px);
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
                background: linear-gradient(90deg,#7f3292, #e84d5d);
                background: -webkit-linear-gradient(90deg,#7f3292, #e84d5d);
                background: -moz-linear-gradient(90deg,#7f3292, #e84d5d);
                border-radius: px2rem(100px);
                z-index: 4;
                &.account{
                    bottom: px2rem(54px);
                }
            }
        }
    }
</style>
