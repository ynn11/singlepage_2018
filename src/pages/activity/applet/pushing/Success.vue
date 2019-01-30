<template>
    <div class="pushing-success">
        <div class="main-container">
            <div class="success-contain">
                <img src="/static/images/activity/applet/pushing/success_icon.png" alt="" class="success-icon">
                <h2>恭喜您!<br/>购买成功</h2>
                <p>如有问题请在工作日9:00-17:00<br/>联系售后客服：15356637653</p>
            </div>
            <div class="product-contain">
                <img :src="activityInfo.productPicUrl" alt="" class="product-pic">
                <p class="product-name">{{activityInfo.productName}}</p>
                <p class="price-box"><span class="price">{{activityInfo.salePrice}}</span><span class="num">x{{productSum}}</span></p>
            </div>
            <div class="aftersale-tip">
                <h3 class="title">— 售后提示 —</h3>
                <p>商品除质量问题外不接受退货，发货后七天自动确认收货。</p>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "../../../../fetch/pushing_api"
    export default {
        data() {
            return {
                storeCode: this.$route.query.storeCode||null,
                staffCode: this.$route.query.staffCode||null,
                productCode: this.$route.query.productCode||null,
                productSum: ~~this.$route.query.productSum||1,
                xd_code: this.$route.query.xd_code,
                activityCode: "57739ead915d4247baa7f99709116da6",
                showShare: false,
                activityInfo: {}
            }
        },
        computed: {
            tokenInfo () {
                let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
                return tokenInfo
            },
            openId(){
                let openId = this.$store.state.user.openId;
                return openId;
            }
        },
        methods: {
            //获取活动商品信息相关
            getActivityContent(){
                api.activityContent("post",{
                    productCode: this.productCode,
                    activityCode: this.activityCode,
                    storeCode: this.activityInfo.storeCode||this.storeCode,
                    linkStaffCode: this.staffCode||null
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.activityInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
        },
        created(){
            this.getActivityContent();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .pushing-success{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            height: 100%;
            .success-contain{
                overflow: hidden;
                border-bottom: px2rem(20px) solid #eee;
                .success-icon{
                    display: block;
                    width: px2rem(130px);
                    height: px2rem(130px);
                    margin: px2rem(90px) auto px2rem(30px);
                }
                h2{
                    font-size: px2rem(40px);
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                    line-height: px2rem(60px);
                }
                p{
                    font-size: px2rem(30px);
                    color: #333;
                    text-align: center;
                    line-height: px2rem(52px);
                    margin: px2rem(52px) 0;
                }
            }
            .product-contain{
                padding: px2rem(30px);
                overflow: hidden;
                border-bottom: px2rem(20px) solid #eee;
                .product-pic{
                    float: left;
                    width: px2rem(190px);
                    background-color: #ccc;
                    border-radius: px2rem(4px);
                    height: px2rem(190px);
                }
                .product-name{
                    float: right;
                    width: px2rem(460px);
                    font-size: px2rem(28px);
                    line-height: px2rem(36px);
                    height: px2rem(70px);
                    color: #333;
                    word-break: break-all;
                    overflow: hidden;
                    margin-top: px2rem(10px);
                }
                .price-box{
                    float: right;
                    width: px2rem(460px);
                    overflow: hidden;
                    margin-top: px2rem(60px);
                    .price{
                        font-size: px2rem(36px);
                        color: #ff2929;
                        &::before{
                            content: "￥";
                            font-size: px2rem(18px);
                        }
                    }
                    .num{
                        float: right;
                        font-size: px2rem(36px);
                        color: #333;
                    }
                }
            }
            .aftersale-tip{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                .title{
                    font-size: px2rem(36px);
                    color: #333;
                    line-height: px2rem(100px);
                    text-align: center;
                }
                p{
                    font-size: px2rem(24px);
                    color: #333;
                    line-height: px2rem(45px);
                    text-align: center;
                    margin-bottom: px2rem(70px);
                }
            }
        }
    }
</style>
