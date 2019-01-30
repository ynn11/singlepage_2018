<template>
    <div class="sell-template-store-box">
        <bossHeader title="门店选择" @on-back="back"></bossHeader>
        <div class="content-box">
            <div class="store-list">
                <div class="store-item" v-for="item in storeList">
                    <img :src="item.storeLogoUrl" alt="" class="logo">
                    <p class="name"><span>{{item.storeName}}</span></p>
                    <div class="btn sel" v-if="item.storeCode===storeCode">已选择</div>
                    <div class="btn" v-else @click="selectStore(item.storeCode)">选择</div>
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
                storeCode: this.$route.query.storeCode,
                storeList: []
            }
        },
        methods: {
            back(){
                this.$router.back();
            },
            //门店列表
            getStoreList(){
                api.listStore("get",{
                    templateCode: this.templateCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.storeList = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //选择门店
            selectStore(storeCode){
                this.$store.dispatch("updateSellTemplateStoreCode",storeCode);
                this.$router.back();
            }
        },
        created(){
            this.getStoreList();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .sell-template-store-box{
        .content-box{
            position: relative;
            padding-top: px2rem(120px);
            background-color: #F4F4F4;
            min-height: 101%;
            box-sizing: border-box;
            overflow: hidden;
            .store-list{
                .store-item{
                    position: relative;
                    width: px2rem(690px);
                    height: px2rem(135px);
                    margin: 0 auto px2rem(30px);
                    background-color: #fff;
                    border-radius: px2rem(4px);
                    overflow: hidden;
                    display: flex;
                    justify-content: space-around;
                    .logo{
                        width: px2rem(114px);
                        height: px2rem(114px);
                        margin: px2rem(10px);
                    }
                    .name{
                        width: px2rem(416px);
                        display: table;
                        height: 100%;
                        span{
                            font-size: px2rem(28px);
                            color: #333;
                            padding: 0 px2rem(20px);
                            display: table-cell;
                            vertical-align: middle;
                        }
                    }
                    .btn{
                        width: px2rem(150px);
                        height: 100%;
                        line-height: px2rem(135px);
                        text-align: center;
                        font-size: px2rem(28px);
                        color: #fff;
                        background: linear-gradient(-90deg,rgba(243,130,53,1),rgba(247,85,78,1));
                        &.sel{
                            font-size: px2rem(20px);
                            background: #9A9A9A;
                        }
                    }
                }
            }
        }
    }
</style>
