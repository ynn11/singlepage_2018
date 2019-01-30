<template>
    <div class="sell-template-act-box">
        <bossHeader title="活动详情" @on-back="back"></bossHeader>
        <div class="content-box">
            <img :src="actDetailPic" alt="" class="detail-pic">
            <div class="btn" v-if="selected==='no'" @click="selectAct">选择使用</div>
            <div class="btn sel" v-else>已选择</div>
            <div class="btn" @click="back">返回</div>
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
                actDetailPic: this.$route.query.actDetailPic,
                activityCode: this.$route.query.activityCode,
                selected: this.$route.query.selected
            }
        },
        methods: {
            back(){
                this.$router.back();
            },
            //选择活动
            selectAct(){
                this.$store.dispatch("updateSellTemplateActivityCode",this.activityCode)
                this.$router.go(-2)
            }
        },
        created(){
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .sell-template-act-box{
        .content-box{
            position: relative;
            padding-top: px2rem(120px);
            background-color: #F4F4F4;
            min-height: 101%;
            box-sizing: border-box;
            overflow: hidden;
            .detail-pic{
                display: block;
                width: px2rem(690px);
                margin: 0 auto;
            }
            .btn{
                width: px2rem(690px);
                height: px2rem(99px);
                background: #F7574D;
                border-radius:4px;
                margin: px2rem(30px) auto;
                font-size: px2rem(32px);
                color: #fff;
                text-align: center;
                letter-spacing: px2rem(3px);
                line-height: px2rem(99px);
                &.sel{
                    background-color: #9a9a9a;
                }
            }
        }
    }
</style>
