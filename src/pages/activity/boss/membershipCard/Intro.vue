<template>
    <div :class="'membershipCard-boss-intro ' + [showProduct?'static':'']">
        <activityHeader type="app" title="活动报名"></activityHeader>
        <div class="main-container">
            <div class="main-content">
                <img src="/static/images/activity/boss/membershipCard/header_bg.png" class="header_bg" alt="">
                <img src="/static/images/activity/boss/membershipCard/card.png" alt="" class="card">
                <div class="intro">
                    <p>各位身边店商户老板!<br/>身边店已经开启会员卡销售模式（198会员裂变），将会让门店每一天都能利用身边店系统提升整体成交率30%左右，并且更好的了解和熟悉会员，为下一阶段的功能推出做准备，同时，也为门店提前做好锁销动作，当然，每一项工作我们都离不开导购的辛勤付出，所以每一位导购都将会在这里得到丰厚的回报，并且，我们需要会员参与到本次活动中来，所以每一位会员只要能成功帮助介绍，也将能得到丰厚的回报。</p>
                </div>
                <div class="product-contain">
                    <h6>点击图片，查看活动商品组合</h6>
                    <div class="product-info" v-for="(item,index) in productList" @click="showProduct=true;selectedIndex=index;">
                        <img :src="item.productPicUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="product-pic">
                        <p class="product-name">{{item.productName}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn doShare" @click="doSign" v-if="signStatus===0">开启会员裂变模式</div>
        <div class="btn members" @click="routerLink('/activity_2018/mscard_boss_manage')" v-else>门店设置</div>
        <div class="popWindow" v-if="showProduct">
            <div class="mask"></div>
            <div class="pop-header">
                <div class="header-icon" @click="showProduct=false;"><i class="iconfont icon-fanhui"></i></div>
                <div class="header-cont"><p>商品详情</p></div>
            </div>
            <div class="product-contain pop-contain">
                <img :src="productList[selectedIndex].productDetailJson" alt="" class="product-detail-pic">
            </div>
        </div>
    </div>
</template>

<script>
    import * as _tool from "../../../../util/tool"
    import membershipCardApi from '../../../../fetch/membershipCard_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token||"",
                type: this.$route.query.type,
                activityCode: "c6940ba3067b49cdb78018a14c29cf92",
                productList: [],
                showProduct: false,
                signStatus: 0,
                selectedIndex: 0
            }
        },
        methods: {
            //获取报名信息
            getMerActStatus(){
                membershipCardApi.getMerActStatus("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.signStatus = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //报名活动
            doSign(){
                membershipCardApi.joinedAct("post",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.routerLink("/activity_2018/mscard_boss_manage")
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            routerLink(path){
                let src = path + "?token=" + this.token + "&type=" + this.type
                this.$router.push({
                    path: src
                })
            },
            listSvipProduct(){
                membershipCardApi.listSvipProduct("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.productList = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            preventBgMove(e){
                // e.preventDefault();
                e.stopPropagation();
            },

        },
        created(){
            this.getMerActStatus();
            this.listSvipProduct();
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.type);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membershipCard-boss-intro{
        position: relative;
        /*height: 101%;*/
        &.static{
            overflow: hidden !important;
        }
        .main-container{
            position: relative;
            letter-spacing: px2rem(2px);
            background: url(/static/images/activity/boss/membershipCard/zebracrossing.jpg) center repeat-y;
            background-size: 100% auto;
            padding-top: px2rem(80px);
            min-height: 101%;
            .main-content{
                position: relative;
                z-index: 2;
                overflow: hidden;
                .header_bg{
                    display: block;
                    width: 100%;
                }
                .card{
                    display: block;
                    width: px2rem(693px);
                    margin: px2rem(40px) auto;
                }
                .intro{
                    background-color: #fe2b56;
                    padding: px2rem(32px);
                    width: px2rem(650px);
                    margin: 0 auto;
                    box-sizing: border-box;
                    border-radius: px2rem(12px);
                    p{
                        line-height: px2rem(46px);
                        font-size: px2rem(26px);
                        color: #fff;
                    }
                }
                .product-contain{
                    width: px2rem(650px);
                    margin: px2rem(40px) auto px2rem(250px);
                    border-radius: px2rem(12px);
                    overflow: hidden;
                    background-color: #fe2b56;
                    h6{
                        line-height: px2rem(70px);
                        font-size: px2rem(26px);
                        color: #fff;
                        background-color: #d50d36;
                        padding: 0 px2rem(20px);
                    }
                    .product-info{
                        display: table;
                        width: 100%;
                        .product-pic{
                            display: block;
                            width: px2rem(216px);
                            height: px2rem(180px);
                            margin: px2rem(20px);
                            background-color: #fff;
                            border-radius: px2rem(12px);
                        }
                        .product-name{
                            width: px2rem(434px);
                            display: table-cell;
                            line-height: px2rem(46px);
                            font-size: px2rem(26px);
                            color: #fff;
                            padding: 0 px2rem(40px);
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
        .btn{
            position: fixed;
            top: 100%;
            left: 50%;
            transform: translate(-50%,px2rem(-150px));
            width: px2rem(500px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            font-size: px2rem(36px);
            /*margin: px2rem(100px) auto;*/
            color: #fff;
            text-align: center;
            background-color: #fe2b56;
            border-radius: px2rem(100px);
            box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
            z-index: 99999;
        }
        .popWindow{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling : touch;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            z-index:999;
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.6);
            }
            .pop-contain{
                position: absolute;
                top: 50%;
                left: 50%;
                width: px2rem(674px);
                transform: translate(-50%,-50%);
                overflow: hidden;
                background-color: #fff;
                border-radius: px2rem(16px);
                text-align: center;
                .close{
                    position: absolute;
                    top: px2rem(40px);
                    right: px2rem(30px);
                    width: px2rem(30px);
                    height: px2rem(30px);
                    z-index: 9;
                }
                .title{
                    font-size: px2rem(32px);
                    color: #f3e6b6;
                    line-height: px2rem(116px);
                    text-align: center;
                }
            }
            .pop-header{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: px2rem(80px);
                text-align: center;
                border-bottom: 1px solid #e4e4e4;
                background-color: #FFF;
                z-index: 999;
                .header-icon{
                    position: absolute;
                    left: 0;
                    width: px2rem(80px);
                    line-height: px2rem(80px);
                }
                .header-cont{
                    width: 100%;
                    line-height: px2rem(80px);
                }
                i{
                    color: #595959;
                }
                p{
                    font-size: px2rem(28px);
                    color: #292929;
                }
            }
            .product-contain{
                width: 100%;
                height: 100%;
                overflow-y: auto;
                border-radius: 0;
                padding-top: px2rem(80px);
                padding-bottom: px2rem(200px);
                box-sizing: border-box;
                .product-detail-pic{
                    display: block;
                    width: 100%;
                }
            }
        }
    }
</style>
