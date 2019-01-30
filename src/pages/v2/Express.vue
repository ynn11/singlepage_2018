<template>
    <div class="express-box">
        <div :class="'main ' + type">
            <div class="mainImg">
                <img :src="pageData.productPicUrl + '?imageView2/1/w/154/h/154/interlace/1/q/100'" alt="">
                <div class="count">{{pageData.totalProductSum}}件商品</div>
            </div>
            <div class="mainInfo">
                <p class="state">物流状态：
                    <span v-if="pageData.state==0">暂无结果</span>
                    <span v-else-if="pageData.state==3">在途</span>
                    <span v-else-if="pageData.state==4">揽件</span>
                    <span v-else-if="pageData.state==5">疑难</span>
                    <span v-else-if="pageData.state==6">签收</span>
                    <span v-else-if="pageData.state==7">退签</span>
                    <span v-else-if="pageData.state==8">派件</span>
                    <span v-else-if="pageData.state==9">退回</span>
                    <span v-else>无结果</span>
                </p>
                <p class="expressCorpName">承运来源：{{pageData.expressCorpName}}</p>
                <p class="expressBill">运单编号：{{pageData.expressBill}}</p>
                <p class="expressHotline">官方电话：{{pageData.expressHotline}}</p>
            </div>
        </div>
        <div class="express">
            <div class="express-item" v-for="(item, index) in pageData.express">
                <div class="point">

                </div>
                <div class="info">
                    <p class="context">{{item.context}}</p>
                    <p class="time">{{item.time}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import api from '../../fetch/api'
export default {
    components: {

    },
    data() {
        return {
            orderNum: this.$route.query.orderNum,
            type: this.$route.query.type,
            pageData: {

            }
        }
    },
    methods: {
        //加载物流信息
        loadExpressInfo: function(){
            api.checkOrderAfterSaleExpress("get",{serviceOrderNum:this.orderNum}).then((res)=>{
                //接口返回成功
                if (res.returnCode==="0") {
                    this.pageData = res.returnContent;
                }
                //返回失败
                else{
                    alert(res.message);
                }
            });
        },
        checkExpress(){
            api.checkExpress("get",{orderNum: this.orderNum})
                .then(res => {
                    //接口返回成功
                    if (res.returnCode==="0") {
                        this.pageData = res.returnContent;
                    }
                    //返回失败
                    else{
                        alert(res.message);
                    }
                })
        }
    },
    mounted(){
        if (this.type==="aftersale") {
            this.loadExpressInfo();
        }else{
            this.checkExpress();
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/css/function';
    .express-box{
        position: relative;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling : touch;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        .main{
            position: relative;
            overflow: hidden;
            &.aftersale{
                .mainImg{
                    .count{
                        display: none;
                    }
                    img{
                        display: none;
                    }
                }
                .mainInfo{
                    left: px2rem(20px);
                }
            }
            .mainImg{
                position: relative;
                width: px2rem(154px);
                height: px2rem(154px);
                margin: px2rem(20px);
                border-radius: px2rem(8px);
                overflow: hidden;
                .count{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: px2rem(46px);
                    background-color: rgba(0,0,0,.8);
                    font-size: px2rem(22px);
                    line-height: px2rem(46px);
                    text-align: center;
                    color: #FFF;
                    border-radius: 0 0 px2rem(8px) px2rem(8px);
                }
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .mainInfo{
                position: absolute;
                top: px2rem(20px);
                left: px2rem(194px);
                .state{
                    font-size: px2rem(26px);
                    line-height: px2rem(46px);
                    color: #464646;
                    width: px2rem(540px);
                    overflow: hidden;
                }
                .expressCorpName,.expressBill,.expressHotline{
                    font-size: px2rem(22px);
                    line-height: px2rem(35px);
                    color: #8e8e8e;
                    width: px2rem(540px);
                    overflow: hidden;
                }
            }
        }
        .express{
            .express-item{
                position: relative;
                width: 100%;
                // height: px2rem(165px);
                overflow: hidden;
                &:before{
                    position: absolute;
                    left: px2rem(46px);
                    top: 0;
                    content: "";
                    height: 100%;
                    border-left: 2px solid #ddd;
                }
                &:after{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    content: "";
                    width: px2rem(662px);
                    border-bottom: 1px solid #ddd;
                }
                &:first-child{
                    color: #fff;
                    &:before{
                        top: 50%;
                        height: 50%;
                    }
                    .point{
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        position: absolute;
                        left: px2rem(47px);
                        top: 50%;
                        margin-top: px2rem(-18px);
                        margin-left: px2rem(-18px);
                        width: px2rem(36px);
                        height: px2rem(36px);
                        border: 4px solid #ff5a5a;
                        border-radius: 50%;
                        background-color: #ff5a5a;
                        &:before{
                            content: "";
                            position: absolute;
                            top: -2px;
                            left: -2px;
                            width: 100%;
                            height: 100%;
                            border: 2px solid #FFF;
                            border-radius: 50%;
                        }
                    }
                    .info{
                        .context{
                            color: #ff5a5a;
                        }
                        .time{
                            color: #ff5a5a;
                        }
                    }
                }
                &:last-child{
                    &:after{
                        // border: none;
                    }
                }
                .point{
                    position: absolute;
                    left: px2rem(47px);
                    top: 50%;
                    margin-left: px2rem(-14px);
                    margin-top: px2rem(-14px);
                    width: px2rem(28px);
                    height: px2rem(28px);
                    border-radius: 50%;
                    background-color: #c5c5c5;
                }
                .info{
                    margin: px2rem(40px) px2rem(20px) px2rem(20px) px2rem(88px);
                    .context{
                        font-size: px2rem(22px);
                        line-height: px2rem(42px);
                        color: #8e8e8e;
                    }
                    .time{
                        font-size: px2rem(18px);
                        line-height: px2rem(36px);
                        color: #8e8e8e;
                    }
                }
            }
        }
    }
</style>
