<template>
    <div :class="'membershipCard-complete ' + [popupVisible?'static':'']">
        <activityHeader type="perpage" title="优享会员卡"></activityHeader>
        <div class="main-content">
            <div class="main-title">完善会员信息获得奖励！</div>
            <div class="input-item">
                <div class="label">会员姓名</div>
                <div class="input-contain">
                    <input class="input" type="text" placeholder="输入姓名" v-model="trueName">
                </div>
            </div>
            <div class="input-item">
                <div class="label">会员性别</div>
                <div class="input-contain">
                    <div class="input picker" @click="picker='gender';popupVisible=true">{{gender||"请选择性别"}}</div>
                </div>
            </div>
            <div class="input-item">
                <div class="label">会员生日</div>
                <div class="input-contain">
                    <div class="input picker" @click="picker='date';popupVisible=true">{{birth||"请选择生日"}}</div>
                </div>
            </div>
            <div class="btn" @click="activityComplete">完成</div>
        </div>
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
        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="picker-contain">
                <mt-picker :slots="slots_gender" @change="onGenderChange" v-show="picker==='gender'"></mt-picker>
                <mt-datetime-picker type="date" :startDate="new Date('1960-01-01')" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" v-show="picker==='date'" @confirm="dateConfirm" @cancel="popupVisible=false"></mt-datetime-picker>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import * as _tool from "../../../../util/tool"
    import * as _validate from "../../../../util/validate"
    import dragonboatApi from '../../../../fetch/dragonboat_api'
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
                pickCode: this.$route.query.pickCode,
                activityCode: "c6940ba3067b49cdb78018a14c29cf92",
                //扫码提示
                showTips: false,
                tipStatus: 0,
                tipStore: "",
                tipAddr: "",
                loading: false,
                popupVisible: false,
                picker: "",
                slots_gender: [{
                    flex: 1,
                    values: ['','男','女'],
                    className: 'slot1',
                    defaultIndex: 0,
                    value: '',
                    textAlign: 'center'
                }],
                trueName: "",
                gender: "",
                birth: ""
            }
        },
        methods: {
            //性别切换
            onGenderChange: function(picker,values){
                this.gender = values[0];
            },
            //生日
            dateConfirm: function(value){
                this.birth = value.Format("yyyy-MM-dd");
                this.popupVisible = false;
            },
            activityComplete(){
                if (_validate.trueName(this.trueName)!==true) {
                    this.$toast("请输入正确姓名");
                    return;
                }
                if (this.gender==="") {
                    this.$toast("请选择性别");
                    return;
                }
                if (this.birth==="") {
                    this.$toast("请选择生日");
                    return;
                }
                this.loading = true;
                dragonboatApi.activityComplete("post",{
                    activityCode: this.activityCode,
                    pickCode: this.pickCode,
                    trueName: this.trueName,
                    sex: this.gender,
                    birthday: this.birth
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.$router.go(-1);
                    }else{
                        this.showTips = true;
                        this.tipStatus = 1;
                    }
                    this.loading = false;
                })
            }
        },
        created(){
            //日期格式化初始化
            _tool.DateFormat();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .membershipCard-complete{
        position: relative;
        &.static{
            overflow: hidden !important;
        }
        .main-content{
            background: url(/static/images/activity/guide/membershipCard/complete_bg.jpg) top center no-repeat;
            background-size: 100% auto;
            background-color: #ff0048;
            position: relative;
            /*height: 100%;*/
            letter-spacing: px2rem(2px);
            padding-top: px2rem(80px);
            overflow: hidden;
            .main-bg{
                display: block;
                width: 100%;
            }
            .main-title{
                font-size: px2rem(30px);
                color: #ffe21a;
                margin-top: px2rem(70px);
                text-align: center;
                letter-spacing: px2rem(5px);
                margin: px2rem(410px) 0 px2rem(40px);
            }
            .input-item{
                margin: px2rem(40px) auto;
                width: px2rem(612px);
                overflow: hidden;
                text-align: center;
                .label{
                    font-size: px2rem(26px);
                    color: #fff;
                    line-height: px2rem(48px);
                    text-align: left;
                }
                .input-contain{
                    position: relative;
                    overflow: hidden;
                    .input{
                        position: relative;
                        float: left;
                        width: 100%;
                        height: px2rem(88px);
                        background-color: #fff;
                        text-indent: px2rem(20px);
                        border-radius: px2rem(8px);
                    }
                    .picker{
                        line-height: px2rem(88px);
                        &::after{
                            position: absolute;
                            right: px2rem(20px);
                            top: 0;
                            color: #b8b8b8;
                            content: "\e60a";
                            font-family:"iconfont";
                        };
                    }
                }
            }
            .btn{
                width: px2rem(572px);
                height: px2rem(88px);
                line-height: px2rem(88px);
                font-size: px2rem(36px);
                color: #ff0048;
                text-align: center;
                margin: px2rem(80px) auto;
                background-color: #fee32b;
                /*background: linear-gradient(-90deg, #108b10, #21c839);*/
                border-radius: px2rem(100px);
                box-shadow: px2rem(8px) 0 px2rem(27px) rgba(144,113,52,.32);
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
                        -o-transform: translateX(-50%);
                        -webkit-transform: translateX(-50%);
                        -moz-transform: translateX(-50%);
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
        .mint-popup{
            width: 100%;
        }
    }
</style>
