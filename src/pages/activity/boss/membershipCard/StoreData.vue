<template>
    <div class="membership-boss-store">
        <activityHeader type="perpage" title="门店数据"></activityHeader>
        <div class="mainContent">
            <div class="bought member-list">
                <div v-if="guideList.length>0">
                    <div :class="'bought-item ' + [index===0?'first':'']" v-for="(item,index) in guideList">
                        <div class="member-contain">
                            <img :src="item.headPicUrl" alt="" class="headPic">
                            <p class="true-name">{{item.trueName}}</p>
                            <p class="nick-name">{{item.nickName}}</p>
                        </div>
                        <div class="invitedList-contain">
                            <div class="invitedList-item" v-if="item.srcMemTrueName!==''">
                                <img :src="item.srcMemHeadPicUrl" alt="" class="iHeadPic">
                                <p class="iName">介绍人：{{item.srcMemTrueName}}</p>
                            </div>
                            <div class="invitedList-item">
                                <img :src="item.staffHeadPicUrl" alt="" class="iHeadPic">
                                <p class="iName">成交导购：{{item.staffName}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="noList"  v-else>
                    该门店还没有会员购买哦！
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
                storeCode: this.$route.query.storeCode,
                guideList: []
            }
        },
        methods: {
            getDealMemCountByMerchantCode(){
                membershipCardApi.getDealMemCountByMerchantCode("get",{
                    storeCode: this.storeCode
                },this.token).then((res)=>{
                    if (res.returnCode==="0") {
                        this.guideList = res.returnContent.memDetailList;
                    }else{
                        this.$toast(res.message);
                    }
                });
            }
        },
        created(){
            this.getDealMemCountByMerchantCode();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membership-boss-store{
        position: relative;
        height: 101%;
        .mainContent{
            padding-top: px2rem(80px);
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
                }
                .noList{
                    line-height: px2rem(60px);
                    text-align: center;
                }
            }
        }
    }
</style>
