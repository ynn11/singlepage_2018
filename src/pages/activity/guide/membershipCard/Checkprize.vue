<template>
    <div class="membershipCard-checkprize">
        <activityHeader type="perpage" title="优享会员卡"></activityHeader>
        <div class="main-content">
            <div class="input-contain">
                <div class="tip">优享会员卡赠品领取输入礼品码</div>
                <div class="barcode-contain">
                    <input type="text" placeholder="输入礼品码" v-model="pickCode">
                </div>
            </div>
        </div>
        <div class="btn" @click="activityComplete">提货</div>
        <div class="popWindow" v-if="showTips">
            <div class="mask">
                <div class="tips-contain pop-contain">
                    <img src="/static/images/activity/close_gray.png" alt="" class="close" @click="showTips=false;pickCode='';">
                    <div class="content-tip" v-if="tipStatus===1">
                        <p class="title">领奖码错误<br>请重新输入</p>
                    </div>
                    <div class="content-tip" v-if="tipStatus===2">
                        <p class="title">奖品已经领取过<br/>&nbsp;</p>
                    </div>
                    <div class="content-tip" v-if="tipStatus===3">
                        <p class="title">恭喜您！礼品码兑换成功！<br/>请联系导购领取礼品</p>
                    </div>
                    <div class="content-tip" v-if="tipStatus===4">
                        <p class="title">请前往该门店兑换</p>
                        <p class="storeName"><i class="iconfont icon-shanghu"></i>{{tipStore}}</p>
                        <p class="storeAddr"><i class="iconfont icon-location"></i>{{tipAddr}}</p>
                    </div>
                    <div class="confirm-btn" @click="showTips=false;pickCode='';">确定</div>
                </div>
            </div>
        </div>
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import membershipCardApi from '../../../../fetch/membershipCard_api'
    import loading from '@/components/common/loading'
    import activityHeader from "@/components/common/activityHeader"

    export default {
        components: {
            activityHeader,
            "v-loading": loading
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "c6940ba3067b49cdb78018a14c29cf92",
                pickCode: "",
                //扫码提示
                showTips: false,
                tipStatus: 0,
                tipStore: "",
                tipAddr: "",
                loading: false
            }
        },
        methods: {
            routerLink(path){
                let src = path + "?token=" + this.token + "&type=" + this.type
                this.$router.push({
                    path: src
                })
            },
            getBarCode(){
                var that = this;
                WebViewJavascriptBridge.callHandler('getBarcode',null,function(response) {
                    that.pickCode = response;
                });
            },
            activityComplete(){
                this.loading = true;
                if (!/\d{5}$/.test(this.pickCode)) {
                    this.showTips = true;
                    this.tipStatus = 1;
                    this.loading = false;
                    return;
                }
                membershipCardApi.activityComplete("post",{
                    activityCode: this.activityCode,
                    pickCode: this.pickCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        if (res.returnContent&&res.returnContent.storeName&&res.returnContent.connectAddress) {
                            this.showTips = true;
                            this.tipStatus = 4;
                            this.tipStore = res.returnContent.storeName;
                            this.tipAddr = res.returnContent.connectAddress;
                        }else if(res.returnContent&&res.returnContent.pickFlag===1){
                            this.showTips = true;
                            this.tipStatus = 2;
                        }else if (res.returnContent&&res.returnContent.perfectFlag===0) {
                            this.$router.push({
                                path: "mscard_guide_completeinfo?token=" + this.token + "&type=" + this.type + "&pickCode=" + this.pickCode
                            })
                        }else{
                            this.showTips = true;
                            this.tipStatus = 3;
                        }
                    }else{
                        this.showTips = true;
                        this.tipStatus = 1;
                    }
                    this.loading = false;
                })
            }
        },
        mounted(){

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membershipCard-checkprize{
        position: relative;
        /*height: 101%;*/
        .main-content{
            position: relative;
            height: 100%;
            letter-spacing: px2rem(2px);
            padding-top: px2rem(80px);
            overflow: hidden;
            background: url(/static/images/activity/guide/membershipCard/check_bg.jpg) top center no-repeat;
            background-size: 100% auto;
            background-color: #ff0048;
            box-sizing: border-box;
            .main-bg{
                display: block;
                width: 100%;
            }
            .main-title{
                font-size: px2rem(32px);
                color: #353535;
                margin-top: px2rem(70px);
                text-align: center;
                letter-spacing: px2rem(5px);
            }
            .input-contain{
                margin: px2rem(480px) auto 0;
                width: px2rem(612px);
                overflow: hidden;
                text-align: center;
                .tip{
                    font-size: px2rem(30px);
                    color: #fff;
                    margin-bottom: px2rem(20px);
                }
                .barcode-contain{
                    position: relative;
                    overflow: hidden;
                    input{
                        float: left;
                        width: 100%;
                        height: px2rem(88px);
                        background-color: #fff;
                        text-indent: px2rem(20px);
                        border-radius: px2rem(8px);
                    }
                }
            }
        }
        .btn{
            position: fixed;
            bottom: px2rem(53px);
            left: 50%;
            transform: translateX(-50%);
            width: px2rem(572px);
            height: px2rem(88px);
            line-height: px2rem(88px);
            font-size: px2rem(36px);
            color: #ff0048;
            text-align: center;
            background-color: #fee32b;
            /*background: linear-gradient(-90deg, #108b10, #21c839);*/
            border-radius: px2rem(100px);
            box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
            z-index: 999;
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
                .close{
                    position: absolute;
                    top: px2rem(40px);
                    right: px2rem(30px);
                    width: px2rem(30px);
                    height: px2rem(30px);
                    z-index: 9;
                }
                &.tips-contain{
                    width: px2rem(594px);
                    height: px2rem(486px);
                    background-color: #fff;
                    border-radius: px2rem(12px);
                    box-shadow: px2rem(3px) 0 px2rem(7px) rgba(11,119,169,.15);
                    .content-tip{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: px2rem(440px);
                        transform: translate(-50%,-50%);
                        -o-transform: translate(-50%,-50%);
                        -moz-transform: translate(-50%,-50%);
                        -webkit-transform: translate(-50%,-50%);
                        text-align: center;
                        .title{
                            font-size: px2rem(36px);
                            color: #333;
                            line-height: px2rem(48px);
                        }
                        .storeName,.storeAddr{
                            font-size: px2rem(24px);
                            line-height: px2rem(38px);
                            color: #9d9d9d;
                            margin: px2rem(35px) 0;
                            text-align: left;
                            i{
                                font-size: px2rem(18px);
                                color: #9d9d9d;
                                margin-right: px2rem(10px);
                            }
                        }
                    }
                    .confirm-btn{
                        position: fixed;
                        bottom: px2rem(50px);
                        left: 50%;
                        transform: translateX(-50%);
                        width: px2rem(424px);
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        font-size: px2rem(36px);
                        color: #fff;
                        text-align: center;
                        background-color: #108b10;
                        border-radius: px2rem(100px);
                        box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
                    }
                }
            }
        }
    }
</style>
