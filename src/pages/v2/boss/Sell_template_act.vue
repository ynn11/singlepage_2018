<template>
    <div class="sell-template-act-box">
        <bossHeader title="活动选择" @on-back="back"></bossHeader>
        <div class="content-box">
            <div class="act-list">
                <div :class="'act-item ' + [item.recommendFlag===1?'rec':'']" v-for="item in actList">
                    <img :src="item.activityPic" alt="" class="banner">
                    <p class="title">
                        <span class="name">{{item.activityName}}</span>
                        <img src="../../../assets/images/boss/sell_template/next.png" alt="" class="next" @click="toActDetail(item)">
                        <span class="more" @click="toActDetail(item)">查看详情</span>
                    </p>
                    <div class="btn sel" v-if="item.activityCode===activityCode">已选择</div>
                    <div class="btn" v-else @click="selectAct(item.activityCode)">选择</div>
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
                templateCode: this.$route.query.templateCode,
                activityCode: this.$route.query.activityCode,
                actList: []
            }
        },
        methods: {
            back(){
                this.$router.back();
            },
            //获取活动列表
            getActList(){
                api.listActivity("get",{
                    templateCode: this.templateCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.actList = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //查看活动详情
            toActDetail(item){
                this.$router.push({
                    path: `/boss/sell_template_act_detail?actDetailPic=${item.activityDescPic}&activityCode=${item.activityCode}&selected=${item.activityCode===this.activityCode?'yes':'no'}`
                })
            },
            //选择活动
            selectAct(activityCode){
                this.$store.dispatch("updateSellTemplateActivityCode",activityCode)
                this.$router.back();
            }
        },
        created(){
            this.getActList();
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
            .act-list{
                .act-item{
                    position: relative;
                    width: px2rem(690px);
                    margin: 0 auto px2rem(30px);
                    padding: px2rem(30px);
                    background-color: #fff;
                    border-radius: px2rem(4px);
                    box-sizing: border-box;
                    overflow: hidden;
                    &.rec{
                        &:before{
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: px2rem(94px);
                            height: px2rem(94px);
                            background: url(../../../assets/images/boss/sell_template/recommend_icon.png);
                            background-size: 100% 100%;
                        };
                    }
                    .banner{
                        display: block;
                        width: px2rem(630px);
                        height: px2rem(220px);
                    }
                    .title{
                        font-size: px2rem(28px);
                        color: #333;
                        margin: px2rem(30px) 0 px2rem(60px);
                        overflow: hidden;
                        line-height: px2rem(30px);
                        .name{
                            float: left;
                            width: px2rem(480px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .more{
                            float: right;
                            font-size: px2rem(26px);
                            color: #6F6F6F;
                        }
                        .next{
                            float: right;
                            /*margin-left: px2rem(10px);*/
                            width: px2rem(20px);
                            height: px2rem(20px);
                            margin: px2rem(5px) 0 px2rem(5px) px2rem(10px);
                        }
                    }
                    .btn{
                        width: 100%;
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        text-align: center;
                        font-size: px2rem(28px);
                        color: #fff;
                        background-color: #EE4112;
                        &.sel{
                            background-color: #EB9983;
                        }
                    }
                }
            }
        }
    }
</style>
