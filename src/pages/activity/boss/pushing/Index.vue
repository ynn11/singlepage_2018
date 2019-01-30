<template>
    <div class="pushing-boss-index">
        <activityHeader type="app" title="活动数据"></activityHeader>
        <div class="main-container">
            <img src="/static/images/activity/boss/pushing/header.png" class="header-bg" alt="">
            <div class="main-content">
                <!-- <div class="act-time">活动时间：9月17-10.30</div> -->
                <div class="act-time"></div>
                <div class="slogan">
                    <span>不用店面</span>
                    <span>不用招人</span>
                    <span>不用进货</span>
                    <span>没有成本</span>
                </div>
                <div class="act-content">
                    <p>身边店为您的门店提供好货，让导购转发链接，有顾客购买，您就能坐享收益！不管门店是否营业，只要链接传播就是生意！让导购无论在哪都为您效力<br/>门店导购每销售成功一单，门店就能获得对应收益！(收益会在顾客确认收货后发放至您的身边店账户）</p>
                </div>
                <div class="data-contain">
                    <p class="data-item">您已获得共 <span class="red">{{bossdata.merCoupon}}</span> 元额外收益 </p>
                    <p class="data-item">其中 <span class="red">{{bossdata.transferredCoupon}}</span> 元已到账</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../../fetch/pushing_api'
    import _urlConfig from "../../../../util/urlConfig"
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token||"",
                type: this.$route.query.type,
                activityCode: "57739ead915d4247baa7f99709116da6",
                bossdata: {}
            }
        },
        methods: {
            getData(){
                api.activityDataBoss("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.bossdata = res.returnContent;
                    }else{
                        alert(res.message);
                    }
                })
            },
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .pushing-boss-index{
        position: relative;
        height: 101%;
        &.static{
            overflow: hidden;
        }
        .main-container{
            position: relative;
            height: 100%;
            letter-spacing: px2rem(2px);
            overflow: hidden;
            padding-top: px2rem(80px);
            background-color: #ff9501;
            box-sizing: border-box;
            .header-bg{
                position: absolute;
                top: px2rem(80px);
                left: 0;
                width: 100%;
                z-index: 1;
            }
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                .act-time{
                    font-size: px2rem(36px);
                    color: #fff;
                    line-height: px2rem(50px);
                    text-align: center;
                    margin: px2rem(330px) auto 0;
                }
                .slogan{
                    font-size: px2rem(48px);
                    color: #fff;
                    line-height: px2rem(84px);
                    overflow: hidden;
                    text-align: center;
                    margin: px2rem(20px) auto;
                    span{
                        float: left;
                        display: inline-block;
                        width: 49.5%;
                    }
                }
                .act-content{
                    position: relative;
                    width: px2rem(656px);
                    padding: px2rem(30px);
                    background-color: #fff;
                    overflow: hidden;
                    box-shadow: px2rem(11px) 0 px2rem(16px) rgba(150,98,0,.35);
                    margin: 0 auto;
                    p{
                        font-size: px2rem(24px);
                        color: #343434;
                        line-height: px2rem(50px);
                        .large{
                            font-size: px2rem(30px);
                            font-weight: bold;
                            color: #ff3131;
                        }
                    }
                }
                .data-contain{
                    margin: px2rem(20px) auto px2rem(200px);
                    .data-item{
                        font-size: px2rem(44px);
                        color: #fff;
                        line-height: px2rem(80px);
                        text-align: center;
                        .red{
                            font-size: px2rem(56px);
                            font-weight: bold;
                            color: #ff3131;
                        }
                    }
                }
            }
        }
    }
</style>
