<template>
    <div class="midautumn-boss-setting">
        <activityHeader type="perpage" title="活动设置"></activityHeader>
        <div class="main-content">
            <img src="/static/images/activity/boss/midAutumn/header.jpg" class="header-bg" alt="">
            <img src="/static/images/activity/boss/midAutumn/bottom.jpg" class="bottom-bg" alt="">
            <!-- <div class="main-title">报名成功</div> -->
            <div class="act-time"></div>
            <div class="store-select" v-if="actBeginStatus!==1">
                <p class="main-tip">提示：请在9月14日24点前完成所有设置。<br/>活动开启后，即9月15日起，活动设置不可更改。</p>
                <div class="title">------  活动设置  ------</div>
                <div class="select-contain">
                    <div class="tip">未参与活动的门店</div>
                    <div class="border-bottom" v-if="notJoinedStoreList.length>0">
                        <div class="store-item" v-for="item in notJoinedStoreList">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                            <div class="join-btn btn" @click="joinAct(item)">参与</div>
                        </div>
                    </div>
                    <div class="noList" v-else>没有未参与活动的门店</div>
                </div>
                <div class="select-contain">
                    <div class="tip">已参与活动的门店</div>
                    <div class="" v-if="joinedStoreList.length>0">
                        <div class="store-item" v-for="item in joinedStoreList">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                            <div class="cancel-btn btn" @click="joinAct(item)">取消</div>
                        </div>
                    </div>
                    <div class="noList" v-else>没有参与活动的门店</div>
                </div>
            </div>
            <div class="store-setting box-contain">
                <div class="title">------  门店设置  ------</div>
                <div class="" v-if="joinedStoreList.length>0">
                    <div class="store-item" v-for="item in joinedStoreList">
                        <div class="store-info">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                            <div class="set-btn btn" @click="getStoreSet(item)" v-if="actBeginStatus!==1">设置</div>
                        </div>
                        <div class="setting-info" v-if="item.mafVoucherCode!==''">
                            <p>69元购买{{item.mafCouponMoney}}元代金券+月饼礼盒</p>
                            <p>国庆折扣券{{item.nadCommCouponQuota}}折，{{item.nadTwoCouponQuota}}折</p>
                        </div>
                        <div class="setting-info not-set" v-else>
                            <p>未设置</p>
                        </div>
                    </div>
                </div>
                <div class="noList" v-else>没有参与活动的门店</div>
            </div>
            <div class="order-contain">
                <div class="title">------  进店礼品设置  ------</div>
                <div class="item">
                    <div class="label">谜月月饼</span></div>
                    <div class="order-info">
                        <img src="/static/images/activity/boss/midAutumn/gift.png" alt="" class="product-img">
                        <p>微信客服订货<br/>共订货：{{productInfo.goodsAmount}}件</p>
                        <div class="order-btn" @click="getHistory">订货记录</div>
                    </div>
                </div>
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
        <div class="storeSetting-contain popWindow" v-if="showStoreSetting">
            <div class="mask"></div>
            <div class="setting-contain pop-contain">
                <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="showStoreSetting=false;">
                <div class="title">------  活动设置  ------</div>
                <div class="content-box">
                    <h2 class="store-name">{{selectedItem.storeName}}</h2>
                    <p>店内当季服装单价：<input type="number" v-model="selectedItem.unitPrice" @focus="unitPriceFocus" @keyup="unitPriceChange" placeholder="请输入"><span class="red large">元</span></p>
                    <p>以下参数为推荐设置参数，您可根据门店情况进行修改。</p>
                    <h3 class="sub-tit">中秋活动</h3>
                    <p>客户支付<span class="red large"> 69 元</span>，获得中秋礼包：<br><input type="number" v-model="selectedItem.mafCouponMoney"><span class="red large">元</span>代金券一张<br/>月饼一盒</p>
                    <p class="tip"><span class="gray">提示：代金券请设定一个大金额噢，这样才有诱惑力！</span></p>
                    <h3 class="sub-tit">国庆活动</h3>
                    <p><input class="mini" type="number" v-model="selectedItem.nadCommCouponQuota"><span class="red large">折</span>通用打折券一张</p>
                    <p><input class="mini" type="number" v-model="selectedItem.nadTwoCouponQuota"><span class="red large">折</span>两件以上可用打折券一张</p>
                    <p class="tip"><span class="red">代金券及打折券在10月31日24点前有效,且不可叠加使用。</span></p>
                </div>
                <div class="confirm-btn" @click="confirmSetting">确&nbsp;&nbsp;&nbsp;&nbsp;定</div>
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
                notJoinedStoreList: [],
                joinedStoreList: [],
                showPopOrder: false,
                showStoreSetting: false,
                selectedProgram: 1,
                actBeginStatus: 0,
                selectedItem: {},
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
            //输入监听
            unitPriceChange(){
                if (this.selectedItem.unitPrice<200) {
                    this.selectedItem.mafCouponMoney = 50;
                }else if(this.selectedItem.unitPrice>=200&&this.selectedItem.unitPrice<400){
                    this.selectedItem.mafCouponMoney = 80;
                }else if(this.selectedItem.unitPrice>=400&&this.selectedItem.unitPrice<600){
                    this.selectedItem.mafCouponMoney = 130;
                }else if(this.selectedItem.unitPrice>=600&&this.selectedItem.unitPrice<800){
                    this.selectedItem.mafCouponMoney = 180;
                }else if(this.selectedItem.unitPrice>=800){
                    this.selectedItem.mafCouponMoney = 200;
                }
            },
            //聚焦
            unitPriceFocus(){
                if (this.selectedItem.unitPrice == false) {
                    this.selectedItem.unitPrice = "";
                }
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
            //获取活动参与门店信息
            getDualActStoreInfoByCond(){
                midautumnApi.getDualActStoreInfoByCond("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.notJoinedStoreList = res.returnContent.notJoinedDualActStoreInfoList;
                        this.joinedStoreList = res.returnContent.joinedDualActStoreInfoList;
                        this.actBeginStatus = res.returnContent.actBeginStatus;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //设置参与
            joinAct(item){
                midautumnApi.updateDualActStorePartakeStatus("post",{
                    activityCode: this.activityCode,
                    storeCode: item.storeCode,
                    id: item.id,
                    isPartakeStatus: item.isPartake===0?1:0
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.getDualActStoreInfoByCond();
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //选择方案
            selectProgram(type){
                switch(type){
                    case 1:
                        this.selectedProgram = type;
                        this.couponPrice = "";
                        this.couponMoney = "";
                    break;
                    case 2:
                        this.selectedProgram = type;
                        this.couponPrice = 50;
                        this.couponMoney = 30;
                    break;
                    case 3:
                        this.selectedProgram = type;
                        this.couponPrice = 60;
                        this.couponMoney = 50;
                    break;
                }
            },
            //完成设置
            confirmSetting(){
                if (!/^[1-9]\d*$/.test(this.selectedItem.unitPrice)) {
                    this.$toast("当季单价输入有误");
                    return;
                }
                if (!/^[1-9]\d*$/.test(this.selectedItem.mafCouponMoney)) {
                    this.$toast("中秋代金券面额输入有误");
                    return;
                }
                if (!/^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/.test(this.selectedItem.nadCommCouponQuota)) {
                    this.$toast("国庆普通折扣券面额错误");
                    return;
                }
                if (!/^((0\.[1-9]{1})|(([1-9]{1})(\.\d{1})?))$/.test(this.selectedItem.nadTwoCouponQuota)) {
                    this.$toast("国庆两件起折扣券面额错误");
                    return;
                }
                midautumnApi.dualActStoreSet("post",this.selectedItem,this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.$toast("设置成功");
                        this.selectProgram(1);
                        this.getDualActStoreInfoByCond();
                        this.showStoreSetting = false;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //门店设置
            getStoreSet(item){
                this.selectedItem = JSON.parse(JSON.stringify(item));
                this.showStoreSetting = true;
            },
            preventBgMove(e){
                // e.preventDefault();
                e.stopPropagation();
            },

        },
        mounted(){
            this.getDualActStoreInfoByCond();
            this.listDualGoodsRecord();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .midautumn-boss-setting{
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
                background: url(/static/images/activity/boss/midAutumn/sign_time_man.png) top center no-repeat;
                background-size: 100% 100%;
                z-index: 10;
            }
            .header-bg{
                position: relative;
                display: block;
                width: 100%;
                margin-bottom: px2rem(-1190px);
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
            .store-select{
                position: relative;
                margin: 0 auto;
                width: px2rem(656px);
                background-color: #fff;
                overflow: hidden;
                z-index: 2;
                border-radius: px2rem(20px);
                margin-bottom: px2rem(30px);
                .main-tip{
                    font-size: px2rem(24px);
                    line-height: px2rem(30px);
                    color: #fd3236;
                    margin: px2rem(40px) 0;
                    text-align: center;
                }
                .select-contain{
                    padding: 0 px2rem(20px);
                    .border-bottom{
                        border-bottom: 1px solid #dcdcdc;
                    }
                    .tip{
                        margin-top: px2rem(30px);
                        font-size: px2rem(26px);
                        line-height: px2rem(48px);
                        color: #989898;
                    }
                    .store-item{
                        height: px2rem(140px);
                        overflow: hidden;
                        .storeLogo{
                            float: left;
                            width: px2rem(100px);
                            height: px2rem(100px);
                            border-radius: 50%;
                            margin: px2rem(20px) px2rem(20px) px2rem(20px) 0;
                        }
                        .storeName{
                            float: left;
                            width: px2rem(320px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 26rpx;
                            color: #343434;
                            line-height: px2rem(140px);
                        }
                        .btn{
                            float: right;
                            width: px2rem(140px);
                            line-height: px2rem(60px);
                            text-align: center;
                            font-size: px2rem(28px);
                            color: #fff;
                            background-color: #f39800;
                            border-radius: px2rem(12px);
                            margin-top: px2rem(26px);
                            &.cancel-btn{
                                font-size: px2rem(30px);
                                color: #646464;
                                background-color: #d4d4d4;
                            }
                        }
                    }
                }
            }
            .box-contain{
                position: relative;
                padding-top: px2rem(50px);
                width: px2rem(656px);
                background-color: #fff;
                margin: 0 auto;
                z-index: 2;
                border-radius: px2rem(20px);
                margin-bottom: px2rem(30px);
                .store-item{
                    width: px2rem(656px);
                    margin: px2rem(40px) auto;
                    border-radius: px2rem(8px);
                    padding-bottom: px2rem(40px);
                    .store-info{
                        position: relative;
                        overflow: hidden;
                        &.border-bottom{
                            &:after{
                                content: "";
                                position: absolute;
                                left: 50%;
                                bottom: 0;
                                width: px2rem(564px);
                                height: 1px;
                                background-color: #dcdcdc;
                                transform: translateX(-50%);
                                -o-transform: translateX(-50%);
                                -moz-transform: translateX(-50%);
                                -webkit-transform: translateX(-50%);
                            };
                        }
                        .storeLogo{
                            float: left;
                            width: px2rem(100px);
                            height: px2rem(100px);
                            border-radius: 50%;
                            margin: px2rem(22px);
                        }
                        .storeName{
                            float: left;
                            width: px2rem(320px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-size: 26rpx;
                            color: #343434;
                            line-height: px2rem(144px);
                        }
                        .btn{
                            float: right;
                            width: px2rem(140px);
                            line-height: px2rem(60px);
                            text-align: center;
                            font-size: px2rem(30px);
                            color: #313131;
                            background-color: #ffe970;
                            border-radius: px2rem(12px);
                            margin: px2rem(36px) px2rem(20px) 0 0;
                        }
                    }
                    .setting-info{
                        background-color: #f2f2f2;
                        overflow: hidden;
                        &.not-set{
                            padding: px2rem(20px) 0;
                        }
                        p{
                            font-size: px2rem(24px);
                            color: #7f7f7f;
                            line-height: px2rem(26px);
                            text-indent: px2rem(24px);
                            margin: px2rem(20px) 0;
                        }
                    }
                    .data-info{
                        padding: px2rem(30px) px2rem(22px);
                        p{
                            font-size: px2rem(24px);
                            color: #343434;
                            line-height: px2rem(42px);
                        }
                    }
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
                    font-size: px2rem(36px);
                    line-height: px2rem(100px);
                    color: #444;
                    text-align: center;
                    letter-spacing: px2rem(2px);
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
            .setting-contain{
                border-radius: px2rem(8px);
                padding-bottom: px2rem(54px);
                .content-box{
                    max-height: none;
                    overflow: hidden;
                    .store-name{
                        font-size: px2rem(24px);
                        color: #323232;
                        text-align: center;
                        line-height: 30px;
                    }
                    .sub-tit{
                        font-size: px2rem(28px);
                        color: #323232;
                        font-weight: bold;
                        margin-top: px2rem(40px);
                    }
                    p{
                        font-size: px2rem(26px);
                        line-height: px2rem(40px);
                        color: #323232;
                        &.tip{
                            font-size: px2rem(24px);
                            color: #878787;
                        }
                        .red{
                            color: #ff2020;
                        }
                        .large{
                            font-size: px2rem(30px);
                        }
                        input{
                            width: px2rem(130px);
                            height: px2rem(40px);
                            border: 2px solid #999;
                            border-radius: px2rem(8px);
                            text-align: center;
                            &.mini{
                                width: px2rem(60px);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
