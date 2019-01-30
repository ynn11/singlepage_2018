<template>
    <div class="membership-boss-data">
        <activityHeader type="perpage" title="活动数据"></activityHeader>
        <div class="mainContent">
            <div class="info">
                <p class="tip"><i class="iconfont icon-huiyuanguanli"></i>总成交会员</p>
                <p class="bonus">{{activityInfo.totalDealMemCount||0}} 位</p>
            </div>
            <div class="info">
                <p class="tip"><i class="iconfont icon-wallet"></i>获得分红</p>
                <p class="bonus">{{activityInfo.totalBonusMoney||0}} 元</p>
            </div>
            <div class="storeList">
                <div class="item" v-for="item in activityInfo.svipActMerData" @click="toStoreData(item)">
                    <img class="store-logo" :src="item.storeLogoUrl + '?imageView2/1/w/200/h/200/interlace/1/q/100'" alt=""/>
                    <div class="name">{{item.storeName}}</div>
                    <div class="members">成交会员：<span class="red">{{item.pickCount}}位</span></div>
                    <i class="iconfont icon-qianjin"></i>
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
                activityInfo: {
                    svipActMerData: []
                }
            }
        },
        methods: {
            toStoreData(item){
                let src = "mscard_boss_store?token=" + this.token + "&type=" + this.type + "&storeCode=" + item.storeCode
                this.$router.push({
                    path: src
                })
            },
            getSvipActMerData(){
                membershipCardApi.getSvipActMerData("get",{

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
            this.getSvipActMerData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membership-boss-data{
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
            .storeList{
                padding: px2rem(20px) 0;
                .item{
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
                    .store-logo{
                        float: left;
                        margin: px2rem(30px) px2rem(25px);
                        width: px2rem(90px);
                        height: px2rem(90px);
                        border-radius: 50%;
                        background-color: #ccc;
                    }
                    .name,.members{
                        font-size: px2rem(26px);
                        margin-top: px2rem(33px);
                        color: #2c2c2c;
                        .red{
                            color: #ec4b4b;
                        }
                    }
                    .icon-qianjin{
                        position: absolute;
                        right: px2rem(25px);
                        top: px2rem(60px);
                        color: #acacac;
                    }
                }
            }
        }
    }
</style>
