<template>
    <div :class="'dragonboat-boss-manage ' + [showPopOrder?'static':'']">
        <activityHeader type="perpage" title="活动设置"></activityHeader>
        <div class="main-content">
            <img src="/static/images/activity/boss/membershipCard/header_bg.png" class="header_bg" alt="">
            <!-- <div class="main-title">报名成功</div> -->
            <div class="manage-tip">各位老板请认真填写所有内容，设定参加活动的门店、会员卡的折扣、代金券的金额，这是一张一卡通会员卡，老板选择参加活动的门店会员都能享受折扣，所有门店利润和奖励金额都会实时到账。</div>
            <div class="store-select">
                <div class="title">------  <span>活动设置</span>  ------</div>
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
                <div class="title">------  <span>门店设置</span>  ------</div>
                <div class="" v-if="joinedStoreList.length>0">
                    <div class="store-item" v-for="item in joinedStoreList">
                        <div class="store-info">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                            <div class="set-btn btn" @click="getStoreSet(item)">设置</div>
                        </div>
                        <div class="setting-info">
                            <p v-if="item.couponMoney!==''">购买{{item.discountQuota}}折会员卡送：{{item.couponMoney}}元代金券一张，{{item.productName}}  <span v-if="item.productStatus==='0'">该套组已下架请尽快修改</span></p>
                            <p v-else>未设置</p>
                        </div>
                    </div>
                </div>
                <div class="noList" v-else>没有参与活动的门店</div>
            </div>
            <div class="order-contain">
                <div class="title">------  <span>进店礼品设置</span>  ------</div>
                <div class="item" v-for="item in productList">
                    <div class="label">{{item.productName}}<span>({{item.productOrderDesc}})</span></div>
                    <div class="order-info">
                        <img :src="item.productPicUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="product-img">
                        <p>库存：{{item.stockGoodsAmount}}件<br/>出货：{{item.pickGoodsAmount}}件<br/>在途：{{item.notReceivedGoodsAmount}}件</p>
                        <div class="order-btn" @click="getHistory(item)">订货</div>
                    </div>
                </div>
            </div>
            <div class="btn view-btn" @click="routerLink('mscard_boss_data')">查看活动数据</div>
        </div>
        <div class="order-contain popWindow" v-if="showPopOrder">
            <div class="mask" @click="showPopOrder=false;"></div>
            <div class="orders-contain pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="closePopOrder">
                <div class="title">订货</div>
                <div class="content-box">
                    <div class="form-item cell">
                        <div class="label">{{productDesc}}</div>
                        <input type="text" placeholder="请输入数" v-model="goodsAmount">
                    </div>
                    <div class="form-item">
                        <div class="label">选择订货门店</div>
                        <div class="select-contain male-select">
                            <p class="store selected triangle" @click="initStorePicker">{{storeNameSelected||"请选择门店"}}</p>
                        </div>
                        <div class="tip">货品将快递至门店,如需修改地址请联系客服</div>
                    </div>
                    <div class="his-contain">
                        <div class="title">------  订货记录  ------</div>
                        <div class="his-item" v-for="item in orderHistory.vipGoodsRecordList">
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
                </div>
                <div class="confirm-btn" @click="confirmOrder">确定</div>
            </div>
        </div>
        <div class="storeSetting-contain popWindow" v-if="showStoreSetting">
            <div class="mask"></div>
            <div class="setting-contain pop-contain">
                <img src="/static/images/activity/close.png" alt="" class="close" @click="showStoreSetting=false;">
                <div class="title">活动设置</div>
                <div class="content-box">
                    <div class="form-item">
                        <div class="label">代金券金额</div>
                        <input type="text" placeholder="请输入代金券金额" v-model="couponMoney">
                    </div>
                    <div class="form-item">
                        <div class="label">会员折扣</div>
                        <div class="select-contain male-select">
                            <p class="store selected triangle" @click="popupVisible=true;picker='discount';">{{discountQuota}}折</p>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="label">门店选择会员套餐</div>
                        <div class="select-contain male-select">
                            <p class="store selected triangle" @click="productSelectr=!productSelectr;">{{productNameSelected||"请选择商品"}}</p>
                            <div class="select-box" v-show="productSelectr" v-if="productList.length>0">
                                <div class="item" @click="productSelected=item.productCode;productNameSelected=item.productName;productSelectr=false;" v-for="item in productList">{{item.productName}}</div>
                            </div>
                            <div class="select-box" v-show="productSelectr" v-else>
                                <div class="item"  @click="productSelectr=false;">没有上架奖品</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="confirm-btn" @click="confirmSetting">确定</div>
            </div>
        </div>
        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="picker-contain">
                <mt-picker :slots="slots_store" :valueKey="'storeName'" @change="onStoreChange" v-show="picker==='store'"></mt-picker>
                <mt-picker :slots="slots_discount" @change="onDiscountChange" v-show="picker==='discount'"></mt-picker>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import * as _validate from "../../../../util/validate"
    import membershipCardApi from '../../../../fetch/membershipCard_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "c6940ba3067b49cdb78018a14c29cf92",
                notJoinedStoreList: [],
                joinedStoreList: [],
                showPopOrder: false,
                showStoreSetting: false,
                selectedProgram: 1,
                actBeginStatus: 0,
                discountQuota: "1.0",
                couponMoney: "",
                voucherCode: "",
                storeSelectr: false,
                productSelectr: false,
                storeSelected: "",
                productSelected: "",
                storeNameSelected: "",
                productNameSelected: "",
                selectedProduct: "",
                productDesc: "",
                goodsAmount: "",
                orderHistory: {
                    goodsStoreList: [],
                    vipGoodsRecordList: []
                },
                productList: {},
                popupVisible: false,
                picker: "",
                slots_store: [{
                    flex: 1,
                    values: ['没有参与活动的门店'],
                    className: 'slot1',
                    defaultIndex: 0,
                    textAlign: 'center'
                }],
                slots_discount: [
                    {
                        flex: 1,
                        values: [1,2,3,4,5,6,7,8,9],
                        className: 'slot1',
                        defaultIndex: 0,
                        textAlign: 'center'
                    }, {
                        divider: true,
                        content: '点',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: [0,1,2,3,4,5,6,7,8,9],
                        className: 'slot3',
                        defaultIndex: 0,
                        textAlign: 'center'
                    }
                ],
            }
        },
        methods: {
            routerLink(path){
                let src = path + "?token=" + this.token + "&type=" + this.type
                this.$router.push({
                    path: src
                })
            },
            //获取订货记录
            getHistory(item){
                membershipCardApi.listVipGoodsRecordByCond("get",{
                    productCode: item.productCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.selectedProduct = item.productCode;
                        this.productDesc = item.productOrderDesc;
                        this.orderHistory = res.returnContent;
                        this.showPopOrder = true;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //获取参与门店信息
            getSvipActStoreInfoByCond(){
                membershipCardApi.getSvipActStoreInfoByCond("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.notJoinedStoreList = res.returnContent.notJoinedSvipActStoreInfoList;
                        this.joinedStoreList = res.returnContent.joinedSvipActStoreInfoList;
                        this.actBeginStatus = res.returnContent.actBeginStatus;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //设置参与
            joinAct(item){
                membershipCardApi.updateSvipActStoreIsPartakeStatus("post",{
                    activityCode: this.activityCode,
                    storeCode: item.storeCode,
                    id: item.id,
                    isPartakeStatus: item.isPartake===0?1:0
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.getSvipActStoreInfoByCond();
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //门店选择
            initStorePicker(){
                console.log(this);
                if (this.joinedStoreList.length>0) {
                    this.slots_store[0].values = this.joinedStoreList
                }
                this.popupVisible = true;
                this.picker = "store";
            },
            //选择门店
            onStoreChange(picker,values){
                if (picker.values[0].storeName) {
                    this.storeNameSelected = picker.values[0].storeName;
                    this.storeSelected = picker.values[0].storeCode;
                }
                console.log(picker.values[0].storeName,values);
            },
            //选择折扣
            onDiscountChange(picker,values){
                this.discountQuota = values[0] + "." + values[1];
            },
            //获取商品列表
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
            //订货
            confirmOrder(){
                if (this.storeSelected=="") {
                    this.$toast("请选择门店")
                    return;
                }
                if (!/^[1-9]\d*$/.test(this.goodsAmount)) {
                    this.$toast("请输入订货箱数")
                    return;
                }
                membershipCardApi.saveVipGoodsRecord("post",{
                      "storeCode": this.storeSelected,
                      "productCode": this.selectedProduct,
                      "goodsAmount": ~~this.goodsAmount,
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        if(res.returnContent==="-1"){
                            this.$toast("商户余额不足，请前往充值")
                        }else{
                            this.$toast("订货成功");
                            this.listSvipProduct();
                            this.closePopOrder();
                        }
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //关闭订货窗口
            closePopOrder(){
                this.goodsAmount = "";
                this.goodsCode = "";
                this.showPopOrder = false;
            },
            //完成设置
            confirmSetting(){
                if (!/^[1-9]\d*$/.test(this.couponMoney)) {
                    this.$toast("代金券券金额错误");
                    return;
                }
                if (this.productSelected==="") {
                    this.$toast("请选择商品");
                    return;
                }
                membershipCardApi.updateSvipActMerStoreSet("post",{
                    id: this.settingStore,
                    discountQuota: this.discountQuota,
                    couponMoney: this.couponMoney,
                    voucherCode: this.voucherCode,
                    productCode: this.productSelected
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.$toast("设置成功");
                        this.getSvipActStoreInfoByCond();
                        this.showStoreSetting = false;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //门店设置
            getStoreSet(item){
                console.log(item);
                this.settingStore = item.id;
                this.discountQuota = item.discountQuota||"1.0";
                this.couponMoney = item.couponMoney;
                this.voucherCode = item.voucherCode;
                this.productSelected = item.productCode;
                this.productNameSelected = item.productName;
                this.showStoreSetting = true;
            },
        },
        created(){
            this.getSvipActStoreInfoByCond();
            this.listSvipProduct();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .dragonboat-boss-manage{
        position: relative;
        &.static{
            overflow: hidden !important;
        }
        .header{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: px2rem(80px);
            // display: flex;
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
                color: #c0c0c0;
            }
            p{
                font-size: px2rem(28px);
                color: #292929;
            }
        }
        .main-content{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            background: url(/static/images/activity/boss/membershipCard/zebracrossing.jpg) center repeat-y;
            background-size: 100% auto;
            padding-top: px2rem(80px);
            .header_bg{
                display: block;
                width: 100%;
            }
            .manage-tip{
                background-color: #fe2b56;
                padding: px2rem(32px);
                width: px2rem(650px);
                line-height: px2rem(46px);
                font-size: px2rem(26px);
                color: #fff;
                margin: px2rem(60px) auto;
                box-sizing: border-box;
                border-radius: px2rem(12px);
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
                color: #e99092;
                text-align: center;
                letter-spacing: px2rem(2px);
                span{
                    color: #323232;
                }
            }
            .store-select{
                position: relative;
                margin-top: px2rem(110px);
                overflow: hidden;
                background-color: #fff;
                margin-bottom: px2rem(10px);
                padding-top: px2rem(50px);
                .select-contain{
                    padding: 0 px2rem(30px);
                    overflow: hidden;
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
                            background-color: #fe2b56;
                            border-radius: 200px;
                            /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                            margin-top: px2rem(26px);
                        }
                    }
                }
            }
            .box-contain{
                padding-top: px2rem(50px);
                background-color: #fff;
                margin-bottom: px2rem(10px);
                overflow: hidden;
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
                            padding: px2rem(12px) 0 px2rem(8px);
                            text-align: center;
                            font-size: px2rem(24px);
                            color: #f1fe9a;
                            background-color: #fe2b56;
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
                            line-height: px2rem(40px);
                            padding: px2rem(24px);
                            span{
                                color: #e10017;
                            }
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
                background-color: #fff;
                margin-bottom: px2rem(10px);
                .label{
                    font-size: px2rem(26px);
                    line-height: px2rem(36px);
                    color: #343434;
                    margin: px2rem(45px) 0 px2rem(25px);
                    padding: 0 px2rem(30px);
                    span{
                        color: #fe2b56;
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
                        background-color: #fe2b56;
                        border-radius: 200px;
                        /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                        margin-top: px2rem(26px);
                    }
                }
            }
        }
        .view-btn{
            width: px2rem(500px);
            height: px2rem(90px);
            line-height: px2rem(90px);
            font-size: px2rem(36px);
            margin: px2rem(100px) auto;
            color: #fff;
            text-align: center;
            /*background-color: #fe2b56;*/
            background: linear-gradient(90deg,#eb45c2,#df0b13);
            border-radius: px2rem(100px);
            box-shadow: px2rem(16px) px2rem(5px) px2rem(24px) rgba(60,105,114,.3);
            z-index: 9;
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
                background-color: #de233e;
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
                    color: #f3e6b6;
                    line-height: px2rem(116px);
                    text-align: center;
                }
                .content-box{
                    padding: 0 px2rem(40px);
                    max-height: px2rem(640px);
                    overflow-x: hidden;
                    overflow-y: auto;
                    .form-item{
                        position: relative;
                        /*overflow: hidden;*/
                        .triangle:after{
                            position: absolute;
                            top: px2rem(36px);
                            right: px2rem(30px);
                            content: "";
                            border-top: px2rem(18px) solid #c34241;
                            border-bottom: px2rem(18px) solid transparent;
                            border-left: px2rem(9px) solid transparent;
                            border-right: px2rem(9px) solid transparent;
                        };
                        .label{
                            font-size: px2rem(24px);
                            color: #f3e6b6;
                            line-height: px2rem(80px)
                        }
                        .tip{
                            font-size: px2rem(24px);
                            color: #f3e6b6;
                            line-height: px2rem(60px);
                            text-align: right;
                        }
                        input{
                            position: relative;
                            width: 100%;
                            height: px2rem(90px);
                            font-size: px2rem(24px);
                            color: #888;
                            background-color: #fff;
                            border-radius: px2rem(12px);
                            text-indent: px2rem(30px);
                        }
                        .select-contain{
                            position: relative;
                            width: 100%;
                            height: px2rem(90px);
                            font-size: px2rem(24px);
                            color: #888;
                            background-color: #fff;
                            border-radius: px2rem(12px);
                            text-indent: px2rem(30px);
                            &.province-select{
                                float: right;
                                width: px2rem(462px);
                            }
                            .selected{
                                width: 100%;
                                height: px2rem(88px);
                                line-height: px2rem(88px);
                            }
                            .select-box{
                                position: absolute;
                                top: px2rem(88px);
                                left: -1px;
                                // margin-top: 2px;
                                width: 100%;
                                border: 1px solid #cbcbcb;
                                border-radius: px2rem(8px);
                                z-index: 9999;
                                background-color: #fff;
                                font-size: px2rem(28px);
                                max-height: px2rem(360px);
                                overflow-y: auto;
                                .item{
                                    height: px2rem(88px);
                                    line-height: px2rem(88px);
                                }
                            }
                        }
                    }
                    .his-contain{
                        .his-item{
                            overflow: hidden;
                            border-bottom: 1px solid #e8d134;
                            .name,.num{
                                float: left;
                                font-size: px2rem(26px);
                                color: #f3e6b6;
                                line-height: px2rem(45px);
                                width: px2rem(380px);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .time,.status{
                                float: right;
                                font-size: px2rem(26px);
                                color: #f3e6b6;
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
                    color: #de233e;
                    background-color: #ffd337;
                    border-radius: 200px;
                    /*box-shadow: px2rem(8px) 0 px2rem(27px) rgba(149,132,38,.32);*/
                    margin: px2rem(26px) auto 0;
                }
            }
            .setting-contain{
                border-radius: px2rem(8px);
                padding-bottom: px2rem(54px);
                overflow: visible;
                .content-box{
                    max-height: none;
                    overflow: visible;
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
        .mint-popup{
            width: 100%;
        }
    }
</style>
