<template>
    <div class="midautumn-boss-data">
        <activityHeader type="perpage" title="活动设置"></activityHeader>
        <div class="main-content">
            <img src="/static/images/activity/boss/midAutumn/header.jpg" class="header-bg" alt="">
            <img src="/static/images/activity/boss/midAutumn/bottom.jpg" class="bottom-bg" alt="">
            <div class="act-time"></div>
            <div class="order-contain box-contain">
                <div class="title">------  中秋活动数据  ------</div>
                <div class="item">
                    <p class="type">1.礼品数据</p>
                    <div class="label">谜月月饼</span></div>
                    <div class="order-info">
                        <img src="/static/images/activity/boss/midAutumn/gift.png" alt="" class="product-img">
                        <p>已兑换：{{activityInfo.pickGoodsAmount}}件<br/>待兑换：{{activityInfo.notPickGoodsAmount}}件<br/>还剩余：{{activityInfo.remainderGoodsAmount}}件</p>
                        <p class="order-total">共订货：{{activityInfo.goodsAmount}}件</p>
                        <div class="order-btn" @click="getHistory">订货记录</div>
                    </div>
                </div>
                <div class="data-contain">
                    <p class="type">2.门店数据</p>
                    <div class="store-item" v-for="item in activityInfo.autumnActStoreData">
                        <div class="store-info border-bottom">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                            <div class="storeSet">（69元购买{{item.mafCouponMoney}}元代金券1张+月饼）</div>
                        </div>
                        <div class="data-info">
                            <p>新增会员<span class="red">{{item.memberIncreaseCount}}</span>人</p>
                            <p><span class="red">{{item.receiveRewardMemberCount}}</span>人已购买中秋礼包，<br/><span class="red">{{item.pickRewardMemberCount}}</span>人已到店领取月饼,<br/><span class="red">{{item.couponUseCount}}</span>张代金券已使用</p>
                            <p>会员消费总金额：<span class="red">{{item.orderLinkedMoney}}</span>元</p>
                            <p><span class="red">{{item.clickNum}}</span>人收到并查看了这个活动</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="store-setting box-contain">
                <div class="title">------  国庆活动数据  ------</div>
                <div class="" v-if="activityInfo.nationalActStoreData.length>0">
                    <div class="store-item" v-for="item in activityInfo.nationalActStoreData">
                        <div class="store-info border-bottom">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                            <div class="storeSet">（{{item.nadCommCouponQuota}}折券，{{item.nadTwoCouponQuota}}折券）</div>
                        </div>
                        <div class="data-info">
                            <p>新增会员<span class="red">{{item.memberIncreaseCount}}</span>人</p>
                            <p>使用折扣券<span class="red">{{item.couponUseCount}}</span>张</p>
                            <p>会员消费总金额：<span class="red">{{item.orderLinkedMoney}}</span>元</p>
                        </div>
                    </div>
                </div>
                <div class="noList" v-else>没有参与活动的门店</div>
            </div>
        </div>
        <div class="order-contain popWindow" v-if="showPopOrder">
            <div class="mask" @click="showPopOrder=false;"></div>
            <div class="orders-contain pop-contain">
                <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="showPopOrder=false;">
                <div class="title">订货记录</div>
                <div class="content-box">
                    <div class="his-contain" v-if="productInfo.goodsStoreList.length>0">
                        <div class="his-item" v-for="item in productInfo.goodsStoreList">
                            <div class="line">
                                <span class="name">{{item.storeName}}</span>
                                <span class="time">{{item.createTime}}</span>
                            </div>
                            <div class="line">
                                <span class="num">数量：{{item.goodsAmount}}件</span>
                                <span class="status">{{item.isArrive===0?'未到货':'已到货'}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="noList" v-else>
                        没有订货记录
                    </div>
                </div>
                <div class="total-amount">共订货：{{productInfo.goodsAmount}}件</div>
                <div class="confirm-btn" @click="showPopOrder=false;">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import midautumnApi from '../../../../fetch/midautumn_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "07c88cf75b53489c99b503c15a9b0bd7",
                activityInfo: {
                    autumnActStoreData: [],
                    nationalActStoreData: []
                },
                showPopOrder: false,
                productInfo: {
                    goodsStoreList: []
                }
            }
        },
        beforeRouteEnter(to,from,next){
            if (from.name=="activity_2018_midautumn_boss_intro") {
                document.getElementsByClassName("content")[0].scrollTop= 0;
            }
            next();
        },
        methods: {
            getActData(){
                midautumnApi.getDualActData("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if (res.returnCode==="0") {
                        this.activityInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            //获取订货记录
            getHistory(){
                this.showPopOrder = true;
            },
            //获取订货总览
            listDualGoodsRecord(){
                midautumnApi.listDualGoodsRecord("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.productInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
        },
        mounted(){
            this.getActData();
            this.listDualGoodsRecord();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .midautumn-boss-data{
        position: relative;
        height: 101%;
        background-color: #fff;
        .main-content{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            background-color: #003369;
            padding-top: px2rem(80px);
            .act-time{
                position: absolute;
                top: px2rem(130px);
                left: px2rem(510px);
                width: px2rem(60px);
                height: px2rem(172px);
                background: url(/static/images/activity/boss/midAutumn/sign_time_data.png) top center no-repeat;
                background-size: 100% 100%;
                z-index: 10;
            }
            .header-bg{
                position: relative;
                display: block;
                width: 100%;
                z-index: 1;
            }
            .bottom-bg{
                position: absolute;
                bottom: 0;
                width: 100%;
                z-index: 1;
            }
            .noList{
                line-height: px2rem(88px);
                text-align: center;
                font-size: px2rem(32px);
                color: #343434;
            }
            .main-title{
                font-size: px2rem(32px);
                color: #c34241;
                margin-top: px2rem(-70px);
                text-align: center;
                letter-spacing: px2rem(5px);
            }
            .title{
                font-size: px2rem(36px);
                line-height: px2rem(40px);
                color: #444;
                text-align: center;
                letter-spacing: px2rem(2px);
            }
            .box-contain{
                position: relative;
                padding-top: px2rem(50px);
                width: px2rem(656px);
                background-color: #fff;
                margin: 0 auto px2rem(112px);
                z-index: 2;
                border-radius: px2rem(20px);
                .store-item{
                    width: px2rem(596px);
                    /*overflow: hidden;*/
                    /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(137,137,137,.21);*/
                    margin: px2rem(40px) auto;
                    border-bottom: 1px solid #aaa;
                    &:last-child{
                        border-bottom: none;
                    }
                    .store-info{
                        position: relative;
                        overflow: hidden;
                        .storeLogo{
                            float: left;
                            width: px2rem(100px);
                            height: px2rem(100px);
                            border-radius: 50%;
                            margin: px2rem(22px);
                        }
                        .storeSet,.storeName{
                            float: left;
                            width: px2rem(450px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: px2rem(26px);
                            color: #343434;
                            line-height: px2rem(36px);
                        }
                        .storeName{
                            margin-top: px2rem(30px);
                        }
                        .btn{
                            float: right;
                            width: px2rem(102px);
                            height: px2rem(48px);
                            line-height: px2rem(48px);
                            text-align: center;
                            font-size: px2rem(24px);
                            color: #f1fe9a;
                            background-color: #43b259;
                            border-radius: 200px;
                            /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                            margin: px2rem(48px) px2rem(22px) 0;
                        }
                    }
                    .setting-info{
                        background-color: #f2f2f2;
                        p{
                            font-size: px2rem(24px);
                            color: #7f7f7f;
                            line-height: px2rem(105px);
                            text-indent: px2rem(24px);
                        }
                    }
                    .data-info{
                        padding: px2rem(30px) px2rem(22px);
                        p{
                            font-size: px2rem(24px);
                            color: #343434;
                            line-height: px2rem(42px);
                            .red{
                                color: #fe0000;
                            }
                        }
                    }
                }
            }
            .order-contain{
                position: relative;
                padding-top: px2rem(50px);
                width: px2rem(656px);
                background-color: #fff;
                margin: px2rem(-1190px) auto px2rem(48px);
                z-index: 2;
                border-radius: px2rem(20px);
                margin-bottom: px2rem(100px);
                .type{
                    font-size: px2rem(28px);
                    color: #333333;
                    font-weight: bold;
                    text-indent: px2rem(30px);
                    line-height: px2rem(82px);
                }
                .data-contain{
                    border-top: 1px solid #aaa;
                }
                .label{
                    font-size: px2rem(26px);
                    color: #343434;
                    margin: px2rem(45px) 0 px2rem(25px);
                    text-indent: px2rem(30px);
                    span{
                        color: #989898;
                    }
                }
                .order-info{
                    overflow: hidden;
                    padding: 0 px2rem(30px) px2rem(40px);
                    .product-img{
                        float: left;
                        width: px2rem(150px);
                        height: px2rem(150px);
                        border-radius: px2rem(8px);
                        margin-right: px2rem(10px);
                    }
                    p{
                        float: left;
                        font-size: px2rem(26px);
                        color: #343434;
                        line-height: px2rem(48px);
                    }
                    .order-total{
                        float: right;
                    }
                    .order-btn{
                        float: right;
                        width: px2rem(140px);
                        height: px2rem(60px);
                        line-height: px2rem(60px);
                        text-align: center;
                        font-size: px2rem(28px);
                        color: #fff;
                        background-color: #f39800;
                        border-radius: px2rem(12px);
                        /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                        margin-top: px2rem(16px);
                    }
                }
            }
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
                -o-transform: translate(-50%,-50%);
                -moz-transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
                overflow: hidden;
                background-color: #fff;
                &.orders-contain{
                    border-radius: px2rem(8px);
                    padding-bottom: px2rem(54px);
                }
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
                    color: #343434;
                    line-height: px2rem(116px);
                    text-align: center;
                }
                .content-box{
                    padding: 0 px2rem(40px);
                    max-height: px2rem(640px);
                    overflow-x: hidden;
                    overflow-y: auto;
                    .his-contain{
                        .his-item{
                            overflow: hidden;
                            border-bottom: 1px solid #ece9e1;
                            .name,.num{
                                float: left;
                                font-size: px2rem(26px);
                                color: #343434;
                                line-height: px2rem(45px);
                                width: px2rem(380px);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .time,.status{
                                float: right;
                                font-size: px2rem(26px);
                                color: #343434;
                                line-height: px2rem(45px);
                            }
                            .time{
                                font-size: px2rem(18px);
                            }
                        }
                    }
                    .noList{
                        font-size: px2ren(36px);
                        line-height: px2rem(80px);
                        text-align: center;
                    }
                }
                .total-amount{
                    text-align: right;
                    font-size: px2rem(26px);
                    color: #666;
                    line-height: px2rem(60px);
                    padding: px2rem(40px) px2rem(40px) 0;
                }
                .confirm-btn{
                    width: px2rem(400px);
                    line-height: px2rem(70px);
                    text-align: center;
                    font-size: px2rem(40px);
                    color: #fff;
                    background-color: #f39800;
                    border-radius: px2rem(12px);
                    /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                    margin: px2rem(26px) auto 0;
                }
            }
            .order-contain{
                position: relative;
                padding-top: px2rem(50px);
                width: px2rem(656px);
                background-color: #fff;
                margin: 0 auto;
                z-index: 2;
                border-radius: px2rem(20px);
                margin-bottom: px2rem(100px);
                .label{
                    font-size: px2rem(26px);
                    color: #343434;
                    margin: px2rem(45px) 0 px2rem(25px);
                    text-indent: px2rem(30px);
                    span{
                        color: #989898;
                    }
                }
                .order-info{
                    overflow: hidden;
                    padding: 0 px2rem(20px) px2rem(40px);
                    .product-img{
                        float: left;
                        width: px2rem(150px);
                        height: px2rem(150px);
                        border-radius: px2rem(8px);
                        margin-right: px2rem(10px);
                    }
                    p{
                        float: left;
                        font-size: px2rem(26px);
                        color: #343434;
                        line-height: px2rem(60px);
                        margin-top: px2rem(15px);
                    }
                    .order-btn{
                        float: right;
                        width: px2rem(140px);
                        line-height: px2rem(60px);
                        text-align: center;
                        font-size: px2rem(28px);
                        color: #fff;
                        background-color: #f39800;
                        border-radius: px2rem(12px);
                        /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                        margin-top: px2rem(36px);
                    }
                }
            }
        }
    }
</style>
