<template>
    <div class="dragonboat-boss-manage">
        <activityHeader type="perpage" title="活动设置"></activityHeader>
        <div class="main-content">
            <img src="/static/images/activity/boss/dragonboat/headpic_manage.jpg" class="main-bg" alt="">
            <!-- <div class="main-title">报名成功</div> -->
            <div class="store-select" v-if="actBeginStatus!==1">
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
                            <div class="join-btn btn" @click="joinAct(item)">取消</div>
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
                        <div class="setting-info">
                            <p v-if="item.couponPrice!==''">{{item.couponPrice}}元购买{{item.couponMoney}}代金券三张+粽子礼盒</p>
                            <p v-else>未设置</p>
                        </div>
                    </div>
                </div>
                <div class="noList" v-else>没有参与活动的门店</div>
            </div>
            <div class="order-contain">
                <div class="title">------  进店礼品设置  ------</div>
                <div class="item">
                    <div class="label">如果似花嘉兴粽子礼盒</span></div>
                    <div class="order-info">
                        <img src="/static/images/activity/boss/dragonboat/gift.png" alt="" class="product-img">
                        <p>库存：{{productInfo.stockGoodsAmount}}件<br/>出货：{{productInfo.pickGoodsAmount}}件<br/>在途：{{productInfo.notReceivedGoodsAmount}}件</p>
                        <div class="order-btn" @click="getHistory">订货记录</div>
                    </div>
                </div>
            </div>
            <div class="store-data box-contain">
                <div class="title">------  运营数据  ------</div>
                <div class="" v-if="joinedStoreList.length>0">
                    <div class="store-item" v-for="item in joinedStoreList">
                        <div class="store-info border-bottom">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                        </div>
                        <div class="data-info">
                            <p>共{{item.joinedMemberCount}}人参与活动，{{item.pickCount}}人已经领取礼品</p>
                            <p>会员消费总金额：{{item.orderLinkedMoney}}元</p>
                            <p>门店新增会员：{{item.memberIncreaseCount}}人</p>
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
                    <div class="his-contain" v-if="orderHistory.dbfGoodsRecordList.length>0">
                        <div class="his-item" v-for="item in orderHistory.dbfGoodsRecordList">
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
                <div class="confirm-btn" @click="showPopOrder=false;">确定</div>
            </div>
        </div>
        <div class="storeSetting-contain popWindow" v-if="showStoreSetting">
            <div class="mask"></div>
            <div class="setting-contain pop-contain">
                <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="showStoreSetting=false;">
                <div class="title">活动设置</div>
                <div class="content-box">
                    <div class="program-contain">
                        <div :class="'program-item ' + [selectedProgram===1?'selected':'']" @click="selectProgram(1)">
                            <div class="header">方案1</div>
                            <div class="desc"><span>自行设置<br/>活动参数</span></div>
                        </div>
                        <div :class="'program-item ' + [selectedProgram===2?'selected':'']" @click="selectProgram(2)">
                            <div class="box"></div>
                            <div class="header">方案2</div>
                            <div class="desc"><span>消费50元得30元代金券3张+礼盒粽子</span></div>
                        </div>
                        <div :class="'program-item ' + [selectedProgram===3?'selected':'']" @click="selectProgram(3)">
                            <div class="header">方案3</div>
                            <div class="desc"><span>消费60元得50元代金券3张+礼盒粽子</span></div>
                        </div>
                    </div>
                    <div class="tips">
                        <div class="tip"></div>
                        <div class="tip">夏季基本服装在100-200元门店建议使用</div>
                        <div class="tip">夏季基本服装在200元以上门店建议使用</div>
                    </div>
                    <div class="selected-program">已选择
                        <span v-if="selectedProgram===1">方案1（自行设置活动参数）</span>
                        <span v-else-if="selectedProgram===2">方案2（客单价100-200建议使用）</span>
                        <span v-else="selectedProgram===3">方案3（客单价200以上建议使用）</span>
                    </div>
                    <div class="price">
                        <span>客户消费</span>
                        <span class="unit">元</span>
                        <input type="number" placeholder="消费金额" v-model="couponPrice">
                    </div>
                    <div class="coupons">
                        <span>成功消费获得代金券x3张</span>
                        <span class="unit">元</span>
                        <input type="number"  placeholder="代金券金额" v-model="couponMoney">
                    </div>
                    <div class="gift">精品粽子礼盒(一盒)</div>
                </div>
                <div class="confirm-btn" @click="confirmSetting">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import dragonboatApi from '../../../../fetch/dragonboat_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "f2ff673d880511e88e64704d7b87a020",
                notJoinedStoreList: [],
                joinedStoreList: [],
                showPopOrder: false,
                showStoreSetting: false,
                selectedProgram: 1,
                actBeginStatus: 0,
                couponPrice: "",
                couponMoney: "",
                voucherCode: "",
                orderHistory: {
                    goodsStoreList: [],
                    dbfGoodsRecordList: []
                },
                productInfo: {}
            }
        },
        beforeRouteEnter(to,from,next){
            if (from.name=="activity_2018_dragonboat_boss_intro") {
                document.getElementsByClassName("content")[0].scrollTop= 0;
            }
            next();
        },
        methods: {
            //获取订货记录
            getHistory(){
                dragonboatApi.listDbfGoodsRecordByCond("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.orderHistory = res.returnContent;
                        this.showPopOrder = true;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //获取订货总览
            getDbfActGoodsAmountByGoodsCode(){
                dragonboatApi.getDbfActGoodsAmountByGoodsCode("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.productInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //获取端午活动参与门店信息
            getDbfActStoreInfoByCond(){
                dragonboatApi.getDbfActStoreInfoByCond("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.notJoinedStoreList = res.returnContent.notJoinedDbfActStoreInfoList;
                        this.joinedStoreList = res.returnContent.joinedDbfActStoreInfoList;
                        this.actBeginStatus = res.returnContent.actBeginStatus;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //设置参与
            joinAct(item){
                dragonboatApi.updateDbfActStoreIsPartakeStatus("post",{
                    activityCode: this.activityCode,
                    storeCode: item.storeCode,
                    id: item.id,
                    isPartakeStatus: item.isPartake===0?1:0
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.getDbfActStoreInfoByCond();
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
                if (!/^[1-9]\d*$/.test(this.couponPrice)||!/^[1-9]\d*$/.test(this.couponPrice)) {
                    this.$toast("消费金额或者券面额错误");
                    return;
                }
                dragonboatApi.updateDbfActMerStoreSet("post",{
                    id: this.settingStore,
                    couponPrice: this.couponPrice,
                    couponMoney: this.couponMoney,
                    voucherCode: this.voucherCode,
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.$toast("设置成功");
                        this.selectProgram(1);
                        this.getDbfActStoreInfoByCond();
                        this.showStoreSetting = false;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //门店设置
            getStoreSet(item){
                this.settingStore = item.id;
                this.couponPrice = item.couponPrice;
                this.couponMoney = item.couponMoney;
                this.voucherCode = item.voucherCode;
                this.showStoreSetting = true;
            },
            preventBgMove(e){
                // e.preventDefault();
                e.stopPropagation();
            },

        },
        mounted(){
            this.getDbfActStoreInfoByCond();
            this.getDbfActGoodsAmountByGoodsCode();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .dragonboat-boss-manage{
        position: relative;
        height: 101%;
        background-color: #fff;
        .main-content{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            background-color: #fff;
            padding-top: px2rem(80px);
            .main-bg{
                display: block;
                width: 100%;
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
                font-size: px2rem(32px);
                color: #343434;
                text-align: center;
                letter-spacing: px2rem(2px);
            }
            .store-select{
                position: relative;
                margin-top: px2rem(110px);
                overflow: hidden;
                .select-contain{
                    padding: 0 px2rem(30px);
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
                            width: px2rem(190px);
                            height: px2rem(88px);
                            line-height: px2rem(88px);
                            text-align: center;
                            font-size: px2rem(32px);
                            color: #f1fe9a;
                            background-color: #43b259;
                            border-radius: 200px;
                            /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                            margin-top: px2rem(26px);
                        }
                    }
                }
            }
            .box-contain{
                padding-top: px2rem(50px);
                border-top: px2rem(10px) solid #ece9e1;
                .store-item{
                    width: px2rem(690px);
                    /*overflow: hidden;*/
                    box-shadow: px2rem(8px) 0 px2rem(27px) rgba(137,137,137,.21);
                    margin: px2rem(40px) auto;
                    border-radius: px2rem(8px);
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
                        }
                    }
                }
            }
            .order-contain{
                padding-top: px2rem(50px);
                border-top: px2rem(10px) solid #ece9e1;
                /*border-bottom: 1px solid #86211e;*/
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
                        line-height: px2rem(50px);
                    }
                    .order-btn{
                        float: right;
                        width: px2rem(190px);
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        text-align: center;
                        font-size: px2rem(32px);
                        color: #f1fe9a;
                        background-color: #43b259;
                        border-radius: 200px;
                        /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                        margin-top: px2rem(26px);
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
                .confirm-btn{
                    width: px2rem(496px);
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    text-align: center;
                    font-size: px2rem(32px);
                    color: #f1fe9a;
                    background-color: #43b259;
                    border-radius: 200px;
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
                    .program-contain{
                        overflow: hidden;
                        display: flex;
                        justify-content: space-between;
                        .program-item{
                            width: px2rem(174px);
                            height: px2rem(208px);
                            border: 1px solid #e5e5e5;
                            border-radius: px2rem(8px);
                            box-sizing: content-box;
                            &.selected{
                                border: none;
                                border-radius: px2rem(8px);
                                overflow: hidden;
                                .header{
                                    background-color: #931592;
                                    color: #fff;
                                }
                                .desc{
                                    background-color: #f33171;
                                    color: #fff;
                                }
                            }
                            .header{
                                background-color: #dcdcdc;
                                color: #f6f6f6;
                                font-size: px2rem(22px);
                                line-height: px2rem(58px);
                                text-align: center;
                            }
                            .desc{
                                background-color: #fff;
                                color: #9e9e9e;
                                width: px2rem(174px);
                                height: px2rem(150px);
                                font-size: px2rem(24px);
                                line-height: px2rem(38px);
                                text-align: center;
                                display: table;
                                span{
                                    padding: 0 px2rem(12px);
                                    display: table-cell;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                    .tips{
                        overflow: hidden;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #dcdcdc;
                        .tip{
                            width: px2rem(174px);
                            font-size: px2rem(22px);
                            color: #9c9c9c;
                            line-height: px2rem(32px);
                            padding: px2rem(10px) 0;
                            text-align: center;
                            letter-spacing: px2rem(2px);
                        }
                    }
                    .selected-program{
                        font-size: px2rem(24px);
                        color: #858585;
                        line-height: px2rem(60px);
                    }
                    .price,.coupons{
                        height: px2rem(80px);
                        line-height: px2rem(80px);
                        border-bottom: 1px solid #dcdcdc;
                        span{
                            font-size: px2rem(26px);
                            color: #333;
                        }
                        input{
                            float: right;
                            font-size: px2rem(26px);
                            height: px2rem(80px);
                            width: px2rem(200px);
                            text-align: right;
                            padding-right: px2rem(20px);
                        }
                        .unit{
                            float: right;
                        }
                    }
                    .gift{
                        font-size: px2rem(26px);
                        color: #333;
                        line-height: px2rem(60px);
                    }
                }
            }
        }
    }
</style>
