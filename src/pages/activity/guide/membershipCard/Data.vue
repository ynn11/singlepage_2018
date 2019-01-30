<template>
    <div class="membership-guide-data">
        <activityHeader type="perpage" title="活动数据"></activityHeader>
        <div class="mainContent">
            <div class="info">
                <p class="tip"><i class="iconfont icon-huiyuanguanli"></i>购买客户</p>
                <p class="bonus">{{activityInfo.buyCount||0}} 人</p>
            </div>
            <div class="info">
                <p class="tip"><i class="iconfont icon-wallet"></i>获得分红</p>
                <p class="bonus">{{activityInfo.bonusMoney||0}} 元</p>
            </div>
            <div class="bought member-list">
                <div v-if="activityInfo.memberList.length>0">
                    <div :class="'bought-item ' + [index===0?'first':'']" v-for="(item,index) in activityInfo.memberList">
                        <div class="member-contain">
                            <img :src="item.headPicUrl" alt="" class="headPic">
                            <p class="true-name">{{item.trueName}}</p>
                            <p class="nick-name">{{item.nickName}}</p>
                        </div>
                        <div class="invitedList-contain" v-if="item.srcTrueName!==''">
                            <div class="invitedList-item">
                                <img :src="item.srcHeadPicUrl" alt="" class="iHeadPic">
                                <p class="iName">介绍人：{{item.srcTrueName}}</p>
                            </div>
                        </div>
                        <div class="status">是否领取赠品<span class="no" v-if="item.pickStatus===0">否</span><span class="yes" v-else-if="item.pickStatus===1">是</span></div>
                    </div>
                </div>
                <div class="noList"  v-else>
                    还没有会员购买哦！
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import membershipCardApi from '../../../../fetch/membershipCard_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "c6940ba3067b49cdb78018a14c29cf92",
                activityInfo: {
                    bonusMoney: 0,
                    buyCount: 0,
                    memberList: []
                }
            }
        },
        methods: {
            routerLink(path){
                let src = path + "?token=" + this.token + "&type=" + this.type
                this.$router.push({
                    path: src
                })
            },
            activityDataStaff(){
                membershipCardApi.activityDataStaff("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if (res.returnCode==="0") {
                        this.activityInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            }
        },
        created(){
            this.activityDataStaff();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membership-guide-data{
        position: relative;
        height: 101%;
        .mainContent{
            padding-top: px2rem(80px);
            .info{
                overflow: hidden;
                border-bottom: px2rem(10px) solid #f2f2f2;
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
            .member-list{
                overflow: hidden;
                .bought-item{
                    position: relative;
                    width: px2rem(680px);
                    min-height: px2rem(150px);
                    overflow: hidden;
                    margin: px2rem(40px) auto;
                    box-shadow: px2rem(10px) 0 px2rem(27px) rgba(96,96,96,.2);
                    -moz-box-shadow: px2rem(10px) 0 px2rem(27px) rgba(96,96,96,.2);
                    -o-box-shadow: px2rem(10px) 0 px2rem(27px) rgba(96,96,96,.2);
                    -webkit-box-shadow: 0 px2rem(10px) px2rem(27px) rgba(96,96,96,.2);
                    border-radius: px2rem(8px);
                    .member-contain{
                        overflow: hidden;
                    }
                    .headPic{
                        float: left;
                        margin: px2rem(30px) px2rem(25px);
                        width: px2rem(90px);
                        height: px2rem(90px);
                        border-radius: 50%;
                        background-color: #ccc;
                    }
                    .true-name,.nick-name{
                        font-size: px2rem(26px);
                        margin-top: px2rem(33px);
                        color: #2c2c2c;
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
                            background-color: #ccc;
                        }
                        .iName{
                            line-height: px2rem(102px);
                        }
                    }
                    .status{
                        position: relative;
                        height: px2rem(102px);
                        line-height: px2rem(102px);
                        overflow: hidden;
                        padding: 0 px2rem(40px);
                        color: #9d9d9d;
                        &:before{
                            content: "";
                            position: absolute;
                            left: px2rem(10px);
                            top: 0;
                            width: 100%;
                            height: 1px;
                            background-color: #f3f3f3;
                        }
                        span{
                            float: right;
                            &.yes{
                                color: #02b00a;
                            }
                            &.no{
                                color: #f60a0f;
                            }
                        }
                    }
                }
                .noList{
                    line-height: px2rem(60px);
                    text-indent: px2rem(40px);
                }
            }
        }
    }
</style>
