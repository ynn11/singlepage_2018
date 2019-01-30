<template>
    <div class="daily-index-box">
        <div class="preview-contain">
            <div class="income-title">
                <img src="/static/images/boss/curve.png" alt="">
                {{reportInfo.reportTime.split("-")[0]}}年
                {{reportInfo.reportTime.split("-")[1]}}月
                {{reportInfo.reportTime.split("-")[2]}}日总收入:
            </div>
            <div class="income-sum" v-if="reportInfo.totalMoney===null">--</div>
            <div class="income-sum" v-else>{{reportInfo.totalMoney.split(".")[0]}}.<span>{{reportInfo.totalMoney.split(".")[1]}}</span></div>
            <div class="member-title">
                <img src="/static/images/boss/diamond.png" alt="">
                {{reportInfo.reportTime.split("-")[0]}}年
                {{reportInfo.reportTime.split("-")[1]}}月
                {{reportInfo.reportTime.split("-")[2]}}日总计新增会员:
            </div>
            <div class="member-sum">{{reportInfo.totalMemberNum}}人</div>
            <div class="other-preview">
                <div class="item">{{reportInfo.totalOrderNumber}}<br><span>订单总数(单)</span></div>
                <div class="item">{{reportInfo.quantitySold}}<br><span>售出服装(件)</span></div>
                <div class="item">{{reportInfo.offlineMemberNum}}<br><span>线下推荐(人)</span></div>
                <div class="item">{{reportInfo.onlineMemberNum}}<br><span>线上吸粉(人)</span></div>
            </div>
        </div>
        <div class="rate-box">
            <div class="tab">
                <div class="item income" @click="tab='income';"><p :class="[tab==='member'||'sel']">收入占比</p></div>
                <div class="item member" @click="tab='member';"><p :class="[tab==='income'||'sel']">新增会员占比</p></div>
            </div>
            <div class="income-rate-contain rate-contain" v-if="tab==='income'">
                <div class="item" v-for="(item,index) in reportInfo.storeIncomeDetailList">
                    <div class="name">{{item.storeName}}</div>
                    <div class="info">
                        <span>{{item.totalOrderNumber}}单</span>
                        <span>售出{{item.quantitySold}}件服装</span>
                        <span>客单价{{item.perCustomerTransaction===null?'--':item.perCustomerTransaction}}元</span>
                    </div>
                    <div class="bar-contain">
                        <div class="total">{{item.totalMoney===null?'--':item.totalMoney}}</div>
                        <div class="rate">{{item.incomeRatio}}%</div>
                        <div class="progress-bar">
                            <div class="bar-width" :style="'width:' + ~~item.incomeRatio +'%'"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="member-rate-contain rate-contain" v-else>
                <div class="item" v-for="(item,index) in reportInfo.storeMemberDetailList">
                    <div class="name">{{item.storeName}}</div>
                    <div class="bar-contain">
                        <div class="total">新增{{item.totalMemberNum}}人</div>
                        <div class="rate">{{item.memberRatio}}%</div>
                        <div class="progress-bar">
                            <div class="bar-width" :style="'width:' + ~~item.memberRatio +'%'"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../../fetch/api'
    import _urlConfig from "../../../util/urlConfig"
    import * as _tool from "../../../util/tool"

    export default {
        components: {
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                appMsgCode: this.$route.query.appMsgCode,
                msgItemTypeCode: this.$route.query.msgItemTypeCode,
                reportInfo: {
                    reportTime: "",
                    totalMoney: ""
                },
                tab: 'income'
            }
        },
        methods: {
            getReport: function(){
                api.getReportMessageDetail("get",{
                    appMsgCode: this.$route.query.appMsgCode,
                    msgItemTypeCode: this.$route.query.msgItemTypeCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.reportInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            }
        },
        mounted(){
            this.getReport()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .daily-index-box{
        position: relative;
        .preview-contain{
            overflow: hidden;
            padding: px2rem(62px) px2rem(32px) px2rem(10px);
            border-bottom: px2rem(10px) solid #f0f0f0;
            .income-title{
                font-size: px2rem(24px);
                color: #999;
                line-height: px2rem(34px);
                img{
                    float: left;
                    width: px2rem(34px);
                    margin-right: px2rem(24px);
                }
            }
            .income-sum{
                font-size: px2rem(72px);
                color: #F23C3E;
                line-height: px2rem(64px);
                margin-top: px2rem(34px);
                span{
                    font-size: px2rem(54px);
                }
            }
            .member-title{
                font-size: px2rem(24px);
                color: #999;
                line-height: px2rem(34px);
                margin-top: px2rem(68px);
                img{
                    float: left;
                    width: px2rem(36px);
                    margin-right: px2rem(16px);
                }
            }
            .member-sum{
                font-size: px2rem(72px);
                color: #F23C3E;
                line-height: px2rem(64px);
                margin-top: px2rem(34px);
                span{
                    font-size: px2rem(54px);
                }
            }
            .other-preview{
                position: relative;
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                text-align: center;
                margin-top: px2rem(44px);
                &:before{
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: px2rem(600px);
                    height: px2rem(2px);
                    transform: translateX(-50%);
                    background-color: #f0f0f0;
                }
                .item{
                    float: left;
                    display: block;
                    font-size: px2rem(28px);
                    line-height: px2rem(40px);
                    color: #2a2a2a;
                    padding: px2rem(24px) 0;
                    flex: 1;
                    span{
                        font-size: px2rem(18px);
                        color: #999;
                        line-height: px2rem(26px);
                    }
                }
            }
        }
        .rate-box{
            position: relative;
            padding: px2rem(10px) px2rem(34px) px2rem(60px);
            .tab{
                position: relative;
                overflow: hidden;
                .item{
                    width: 50%;
                    padding: px2rem(26px) 0;
                    text-align: center;
                    &.income{
                        float: left
                    }
                    &.member{
                        float: right;
                    }
                    p{
                        position: relative;
                        font-size: px2rem(26px);
                        color: #2C2C2C;
                        line-height: px2rem(58px);
                        &.sel{
                            &:after{
                                content: "";
                                position: absolute;
                                bottom: 0;
                                left: 50%;
                                width: px2rem(60px);
                                height: px2rem(4px);
                                transform: translateX(-50%);
                                background-color: #E95049;
                                border-radius: px2rem(8px);
                            }
                        }
                    }
                }
            }
        }
        .rate-contain{
            .item{
                position: relative;
                // overflow: hidden;
                padding: px2rem(26px) 0 px2rem(12px);
                &:before{
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: px2rem(600px);
                    height: px2rem(2px);
                    transform: translateX(-50%);
                    background-color: #f0f0f0;
                }
                .name{
                    font-size: px2rem(24px);
                    color: #333;
                    line-height: px2rem(34px);
                }
                .info{
                    font-size: px2rem(20px);
                    color: #909089;
                    line-height: px2rem(28px);
                    margin: px2rem(10px) px2rem(20px) 0 0;
                }
                .bar-contain{
                    position: relative;
                    overflow: hidden;
                    margin-top: px2rem(10px);
                    .total{
                        float: left;
                        font-size: px2rem(24px);
                        color: #E95049;
                        line-height: px2rem(34px);
                        max-width: px2rem(160px);
                        overflow: hidden;
                        text-over: ellipsis;
                        white-space: nowrap;
                    }
                    .progress-bar{
                        float: right;
                        width: px2rem(406px);
                        height: px2rem(16px);
                        margin: px2rem(9px) 0;
                        background-color: #f0f0f0;
                        border-radius: px2rem(8px);
                        overflow: hidden;
                        .bar-width{
                            width: 100%;
                            height:100%;
                            background-color: #FF9252;
                            border-radius: px2rem(8px);
                        }
                    }
                    .rate{
                        float: right;
                        width: px2rem(110px);
                        font-size: px2rem(24px);
                        color: #292929;
                        line-height: px2rem(34px);
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
