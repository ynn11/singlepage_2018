<template>
    <div class="sell-template-store-box">
        <div class="content-box">
            <div class="act-content panel">
                <div class="sub-title">活动内容说明</div>
                <img :src="applyInfo.activityDescPic" alt="">
            </div>
            <div class="rules-content panel">
                <div class="sub-title">活动内容说明</div>
            </div>
            <div class="apply-info panel">
                <div class="info-item">
                    <img src="../../../assets/images/boss/sell_template/store_icon.png" alt="" class="icon">
                    <p>申请门店：{{applyInfo.storeName}}</p>
                </div>
                <div class="info-item">
                    <img src="../../../assets/images/boss/sell_template/act_icon.png" alt="" class="icon">
                    <p>申请活动：{{applyInfo.activityName}}</p>
                </div>
                <div class="info-item">
                    <img src="../../../assets/images/boss/sell_template/time_apply_icon.png" alt="" class="icon">
                    <p>申请时间：{{applyInfo.createTime}}</p>
                </div>
                <div class="info-item">
                    <img src="../../../assets/images/boss/sell_template/time_icon.png" alt="" class="icon">
                    <p>活动时间：{{applyInfo.actBeginTime}}&nbsp;至&nbsp;                                 {{applyInfo.actEndTime}}</p>
                </div>
            </div>
            <div class="main-title">活动对象：</div>
            <div class="object-content panel" v-if="applyInfo.templateObject===1">
                <div class="sub-title">分组</div>
                <div class="block-contain">
                    <div class="block">{{applyInfo.obejctGrupName}}</div>
                </div>
            </div>
            <div class="object-content panel" v-else>
                <div class="sub-title">会员属性</div>
                <div class="block-contain">
                    <div class="block">{{applyInfo.obejctGrupName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../fetch/boss_api'
    import bossHeader from "@/components/common/bossHeader"
    export default {
        components: {
            bossHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                applyCode: this.$route.query.applyCode,
                msgId: this.$route.query.msgId||null,
                applyInfo: {}
            }
        },
        methods: {
            //活动申请详情
            getApplicationDetail(){
                api.getActivityApplicationDetail("get",{
                    applyCode: this.applyCode,
                    msgId: this.msgId
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.applyInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            }
        },
        created(){
            this.getApplicationDetail();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .sell-template-store-box{
        .content-box{
            position: relative;
            background-color: #F4F4F4;
            min-height: 101%;
            box-sizing: border-box;
            overflow: hidden;
            .panel{
                position: relative;
                padding: px2rem(30px);
                margin: px2rem(10px) 0;
                background-color: #fff;
                .sub-title{
                    font-size: px2rem(30px);
                    line-height: px2rem(42px);
                    color: #333;
                    margin-bottom: px2rem(30px);
                }
                &.act-content{
                    img{
                        display: block;
                        width: 100%;
                    }
                }
                &.apply-info{
                    padding: 0;
                    .info-item{
                        padding: 0 px2rem(30px);
                        border-bottom: 1px solid #f4f4f4;
                        overflow: hidden;
                        .icon{
                            float: left;
                            width: px2rem(34px);
                            margin: px2rem(35px) px2rem(25px) px2rem(35px) 0;
                        }
                        p{
                            float: left;
                            line-height: px2rem(102px);
                        }
                    }
                }
                .block{
                    display: inline-block;
                    font-size: px2rem(28px);
                    color: #333;
                    padding: px2rem(16px) px2rem(68px);
                    background-color: #F4F4F4;
                    border-radius: px2rem(4px);
                }
            }
            .main-title{
                font-size: px2rem(32px);
                color: #333;
                text-indent: px2rem(30px);
                margin: px2rem(60px) 0 px2rem(30px);
            }
        }
    }
</style>
