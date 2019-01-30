<template>
    <div class="mayday-boss-manage">
        <activityHeader type="perpage" title="活动设置"></activityHeader>
        <div class="main-content">
            <img src="/static/images/activity/boss/mayday/headpic_manage.jpg" class="main-bg" alt="">
            <div class="main-title">报名成功</div>
            <div class="store-select" v-if="actBeginStatus!==1">
                <div class="title">------  活动设置  ------</div>
                <div class="select-contain">
                    <div class="tip">未参与活动的门店</div>
                    <div class="" v-if="notJoinedStoreList.length>0">
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
                            <div class="set-btn btn" @click="routerLink('/activity_2018/mayday_boss_setting',item.id)" v-if="actBeginStatus!==1">设置</div>
                        </div>
                        <div class="setting-info">
                            <p v-show="item.discount1>0">2018年春装新款低至{{item.discount1}}折</p>
                            <p v-show="item.discount2>0">2018年夏季新款两件{{item.discount2}}折  三件{{item.discount3}}折  </p>
                            <p v-show="item.consumeMoney>0">活动期间进店消费满{{item.consumeMoney}}元就送价值1200元的安吉高山纯手工白茶礼包（每人限领一盒）</p>
                            <p>会员兑换礼品导购分成{{item.staffBonus||0}}元</p>
                            <p v-if="item.presentGift==='001'">门店赠送礼品：养生茶壶五件套</p>
                            <p v-else-if="item.presentGift==='002'">门店赠送礼品：3D美容瘦脸仪</p>
                            <p v-else>门店赠送礼品：未设置</p>
                        </div>
                    </div>
                </div>
                <div class="noList" v-else>没有参与活动的门店</div>
            </div>
            <div class="order-contain">
                <div class="title">------  进店礼品设置  ------</div>
                <div class="item">
                    <div class="label">养生茶壶五件套<span>（一箱起订，一箱24套）</span></div>
                    <div class="order-info">
                        <img src="/static/images/activity/boss/mayday/pot.jpg" alt="" class="product-img">
                        <p>共订货：{{productInfo[0].totalGoodsAmount}}件<br/>已领取：{{productInfo[0].arrivedGoodsAmount}}件<br/>还剩余：{{productInfo[0].receiveGoodsAmount}}件</p>
                        <div class="order-btn" @click="getHistory('001')">订货</div>
                    </div>
                </div>
                <div class="item">
                    <div class="label">3D美容瘦脸仪<span>（一箱起订，一箱30个）</span></div>
                    <div class="order-info">
                        <img src="/static/images/activity/boss/mayday/instrument.jpg" alt="" class="product-img">
                        <p>共订货：{{productInfo[1].totalGoodsAmount}}件<br/>已领取：{{productInfo[1].arrivedGoodsAmount}}件<br/>还剩余：{{productInfo[1].receiveGoodsAmount}}件</p>
                        <div class="order-btn" @click="getHistory('002')">订货</div>
                    </div>
                </div>
            </div>
            <div class="order-contain">
                <div class="title">------  满赠礼品设置  ------</div>
                <div class="item">
                    <div class="label">安吉高山白茶<span>（一盒起订）</span></div>
                    <div class="order-info">
                        <img src="/static/images/activity/boss/mayday/tea.jpg" alt="" class="product-img">
                        <p>共订货：{{productInfo[2].totalGoodsAmount}}件<br/>已领取：{{productInfo[2].arrivedGoodsAmount}}件<br/>还剩余：{{productInfo[2].receiveGoodsAmount}}件</p>
                        <div class="order-btn" @click="getHistory('003')">订货</div>
                    </div>
                </div>
            </div>
            <div class="store-data box-contain">
                <div class="title">------  运营数据  ------</div>
                <div class="" v-if="joinedStoreList.length>0">
                    <div class="store-item" v-for="item in joinedStoreList">
                        <div class="store-info">
                            <img :src="item.storeLogoUrl + '?imageView2/1/w/100/h/100/interlace/1/q/100'" alt="" class="storeLogo">
                            <div class="storeName">{{item.storeName}}</div>
                        </div>
                        <div class="data-info">
                            <p>共{{item.joinedMemberCount}}人参与活动，{{item.pickCount}}人已经领取礼品</p>
                            <p>共{{item.consumingCount}}人消费达标获得奖励</p>
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
                    <img src="/static/images/activity/close.png" alt="" class="close" @click="closePopOrder">
                    <div class="title">订货</div>
                    <div class="content-box">
                        <div class="form-item cell1" v-if="selectedProduct==='003'">
                            <div class="label">安吉高山白茶（1盒起订）</div>
                            <input type="text" placeholder="请输入盒数（一盒起订）" v-model="goodsAmount">
                            <div class="tip">共{{goodsAmount}}盒，合计{{goodsAmount*200}}元</div>
                        </div>
                        <div class="form-item cell" v-else>
                            <div class="label" v-show="selectedProduct==='001'">茶壶套组数量（24套/箱，1箱起订）</div>
                            <div class="label" v-show="selectedProduct==='002'">瘦脸仪数量（30个/箱，1箱起订）</div>
                            <input type="text" placeholder="请输入箱数（一箱起订）" v-model="goodsAmount">
                            <div class="tip" v-show="selectedProduct==='001'">共{{goodsAmount}}箱，合计{{goodsAmount*10*24}}元</div>
                            <div class="tip" v-show="selectedProduct==='002'">共{{goodsAmount}}箱，合计{{goodsAmount*15*30}}元</div>
                        </div>
                        <div class="form-item">
                            <div class="label">选择订货门店</div>
                            <div class="select-contain male-select">
                                <p class="store selected triangle" @click="storeSelectr=!storeSelectr;">{{storeNameSelected||"请选择门店"}}</p>
                                <div class="select-box" v-show="storeSelectr" v-if="orderHistory.goodsStoreList.length>0">
                                    <div class="item" @click="storeSelected=item.storeCode;storeNameSelected=item.storeName;storeSelectr=false;" v-for="item in orderHistory.goodsStoreList">{{item.storeName}}</div>
                                </div>
                                <div class="select-box" v-show="storeSelectr" v-else>
                                    <div class="item"  @click="storeSelectr=false;">没有门店设置该礼品为奖品</div>
                                </div>
                            </div>
                            <div class="tip">货品将快递至门店,如需修改地址请联系客服</div>
                        </div>
                        <div class="his-contain">
                            <div class="title">------  订货记录  ------</div>
                            <div class="his-item" v-for="item in orderHistory.labourGoodsRecordList">
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
        </div>
    </div>
</template>

<script>
    import maydayApi from '../../../../fetch/mayday_api'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "7d452712155a4dd19e28393c46fce84b",
                notJoinedStoreList: [],
                joinedStoreList: [],
                showPopOrder: false,
                storeSelectr: false,
                storeSelected: "",
                storeNameSelected: "",
                selectedProduct: "000",
                goodsAmount: "",
                actBeginStatus: 0,
                orderHistory: {
                    goodsStoreList: [],
                    labourGoodsRecordList: []
                },
                productInfo: [{},{},{}]
            }
        },
        beforeRouteEnter(to,from,next){
            if (from.name=="activity_2018_mayday_boss_intro") {
                document.getElementsByClassName("content")[0].scrollTop= 0;
            }
            next();
        },
        methods: {
            //关闭订货窗口
            closePopOrder(){
                this.storeSelected = "";
                this.goodsAmount = "";
                this.goodsCode = "";
                this.storeNameSelected = "";
                this.showPopOrder = false;
            },
            //获取订货记录
            getHistory(productType){
                maydayApi.listLabourGoodsRecordByCond("get",{
                    goodsCode: productType
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.selectedProduct = productType;
                        this.orderHistory = res.returnContent;
                        this.showPopOrder = true;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //获取订货总览
            getLabourActGoodsAmountByGoodsCode(){
                maydayApi.getLabourActGoodsAmountByGoodsCode("get",{},this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.productInfo = res.returnContent;
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
                maydayApi.saveLabourActGoodsRecord("post",{
                      "storeCode": this.storeSelected,
                      "goodsCode": this.selectedProduct,
                      "goodsAmount": ~~this.goodsAmount,
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        if(res.returnContent==="-1"){
                            this.$toast("商户余额不足，请前往充值")
                        }else{
                            this.$toast("订货成功");
                            this.getLabourActGoodsAmountByGoodsCode();
                            this.closePopOrder();
                        }
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //获取五一活动参与门店信息
            getLabourActStoreInfoByCond(){
                maydayApi.getLabourActStoreInfoByCond("get",{
                    activityCode: this.activityCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.notJoinedStoreList = res.returnContent.notJoinedLabourActStoreInfoList;
                        this.joinedStoreList = res.returnContent.joinedLabourActStoreInfoList;
                        this.actBeginStatus = res.returnContent.actBeginStatus;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //设置参与
            joinAct(item){
                maydayApi.updateLabourActStoreIsPartakeStatus("post",{
                    activityCode: this.activityCode,
                    storeCode: item.storeCode,
                    id: item.id,
                    isPartakeStatus: item.isPartake===0?1:0
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.getLabourActStoreInfoByCond();
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            routerLink(path,id){
                let src = path + "?token=" + this.token + "&type=" + this.type
                if (id) {
                    src = src + "&id=" + id
                }
                this.$router.push({
                    path: src
                })
            },
            preventBgMove(e){
                // e.preventDefault();
                e.stopPropagation();
            },

        },
        mounted(){
            this.getLabourActStoreInfoByCond();
            this.getLabourActGoodsAmountByGoodsCode();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .mayday-boss-manage{
        position: relative;
        height: 101%;
        background-color: #d4333a;
        .main-content{
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            overflow: hidden;
            background-color: #d4333a;
            padding-top: px2rem(80px);
            .main-bg{
                display: block;
                width: 100%;
            }
            .noList{
                line-height: px2rem(88px);
                text-align: center;
                font-size: px2rem(32px);
                color: #f3e6b6;
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
                color: #f3e6b6;
                text-align: center;
                letter-spacing: px2rem(2px);
            }
            .store-select{
                position: relative;
                margin-top: px2rem(110px);
                overflow: hidden;
                border-bottom: 1px solid #86211e;
                .select-contain{
                    padding: 0 px2rem(30px);
                    .tip{
                        margin-top: px2rem(30px);
                        font-size: px2rem(26px);
                        line-height: px2rem(48px);
                        color: #761815;
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
                            color: #f3e6b6;
                            line-height: px2rem(140px);
                        }
                        .btn{
                            float: right;
                            width: px2rem(190px);
                            height: px2rem(88px);
                            line-height: px2rem(88px);
                            text-align: center;
                            font-size: px2rem(32px);
                            color: #a42e2b;
                            background-color: #ffd337;
                            border-radius: 200px;
                            box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
                            margin-top: px2rem(26px);
                        }
                    }
                }
            }
            .box-contain{
                padding-top: px2rem(50px);
                border-top: px2rem(9px) solid #a42e2b;
                border-bottom: 1px solid #86211e;
                .store-item{
                    width: px2rem(690px);
                    overflow: hidden;
                    box-shadow: px2rem(8px) 0 px2rem(27px) rgba(109,24,24,.21);
                    margin: px2rem(40px) auto;
                    border-radius: px2rem(8px);
                    .store-info{
                        position: relative;
                        overflow: hidden;
                        &:after{
                            content: "";
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            width: px2rem(564px);
                            height: 1px;
                            background-color: #a42e2b;
                            transform: translateX(-50%);
                            -o-transform: translateX(-50%);
                            -moz-transform: translateX(-50%);
                            -webkit-transform: translateX(-50%);
                        };
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
                            color: #f3e6b6;
                            line-height: px2rem(144px);
                        }
                        .btn{
                            float: right;
                            width: px2rem(102px);
                            height: px2rem(48px);
                            line-height: px2rem(48px);
                            text-align: center;
                            font-size: px2rem(24px);
                            color: #a42e2b;
                            background-color: #ffd337;
                            border-radius: 200px;
                            box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
                            margin: px2rem(48px) px2rem(22px) 0;
                        }
                    }
                    .setting-info,.data-info{
                        padding: px2rem(30px) px2rem(22px);
                        p{
                            font-size: px2rem(24px);
                            color: #f3e6b6;
                            line-height: px2rem(42px);
                        }
                    }
                }
            }
            .order-contain{
                padding-top: px2rem(50px);
                border-top: px2rem(9px) solid #a42e2b;
                border-bottom: 1px solid #86211e;
                .label{
                    font-size: px2rem(26px);
                    color: #f3e6b6;
                    margin: px2rem(45px) 0 px2rem(25px);
                    text-indent: px2rem(30px);
                    span{
                        color: #761815;
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
                        color: #f3e6b6;
                        line-height: px2rem(50px);
                    }
                    .order-btn{
                        float: right;
                        width: px2rem(190px);
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        text-align: center;
                        font-size: px2rem(32px);
                        color: #a42e2b;
                        background-color: #ffd337;
                        border-radius: 200px;
                        box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
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
                background: url(/static/images/activity/boss/mayday/pop_bg.jpg) center center no-repeat;
                background-size: 100% 100%;
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
                        &.cell:after{
                            content: "箱";
                            position: absolute;
                            right: px2rem(40px);
                            bottom: px2rem(90px);
                            font-size: px2rem(28px);
                            color: #282828;
                        };
                        &.cell1:after{
                            content: "盒";
                            position: absolute;
                            right: px2rem(40px);
                            bottom: px2rem(90px);
                            font-size: px2rem(28px);
                            color: #282828;
                        };
                        .triangle:after{
                            position: absolute;
                            top: px2rem(30px);
                            right: px2rem(40px);
                            content: "";
                            border-top: px2rem(24px) solid #c34241;
                            border-bottom: px2rem(24px) solid transparent;
                            border-left: px2rem(16px) solid transparent;
                            border-right: px2rem(16px) solid transparent;
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
                            border-bottom: 1px solid #a42e2b;
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
                }
                .confirm-btn{
                    width: px2rem(496px);
                    height: px2rem(88px);
                    line-height: px2rem(88px);
                    text-align: center;
                    font-size: px2rem(32px);
                    color: #a42e2b;
                    background-color: #ffd337;
                    border-radius: 200px;
                    box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
                    margin: px2rem(26px) auto 0;
                }
            }
        }
    }
</style>
