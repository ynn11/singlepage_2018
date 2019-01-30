<template>
    <div class="pushing-address">
        <div class="main-container">
            <div class="addr-contain">
                <div class="addr-item">
                    <p class="label">收货人</p>
                    <input type="text" v-model="addressInfo.receipter"/>
                </div>
                <div class="addr-item">
                    <p class="label">手机号</p>
                    <input type="text" v-model="addressInfo.connectTel"/>
                </div>
                <div class="addr-item">
                    <p class="label">省市区</p>
                    <div class="form-control destination" id="multiPickerInput" tabindex="1">{{addressInfo.zone}}</div>
                </div>
                <div class="addr-item detail-contain">
                    <p class="label">详细地址</p>
                    <textarea name="" id="" cols="30" rows="10" v-model="addressInfo.detailAddress"></textarea>
                </div>
            </div>
            <div class="btn save-btn" @click="submit">保&nbsp;&nbsp;&nbsp;&nbsp;存</div>
        </div>
        <!-- loading -->
        <v-loading v-show="loading"></v-loading>
        <div id="address-select" tabindex="1">

        </div>
    </div>
</template>

<script>
    import api from "../../../../fetch/pushing_api"
    require('../../../../util/city-picker.js')
    import $city from '../../../../util/city.js'
    import _urlConfig from "../../../../util/urlConfig"
    import loading from '@/components/common/loading'

    export default {
        components: {
            "v-loading": loading
        },
        data() {
            return {
                xd_code: this.$route.query.xd_code,
                activityCode: "57739ead915d4247baa7f99709116da6",
                addressInfo: {
                    zone: ""
                },
                loading: false
            }
        },
        computed: {
            tokenInfo () {
                let tokenInfo = JSON.parse(this.$store.state.user.tokenInfo);
                return tokenInfo
            },
            openId(){
                let openId = this.$store.state.user.openId;
                return openId;
            }
        },
        methods: {
            submit: function(){
                if (this.addressInfo.receipter.length<2) {
                    this.$toast("收货人输入有误！")
                    return;
                }
                if (!/^1\d{10}$/.test(this.addressInfo.connectTel)) {
                    this.$toast("手机号输入有误！")
                    return;
                }
                if (this.addressInfo.zone.length<2) {
                    this.$toast("请选择地区")
                    return;
                }
                if (this.addressInfo.detailAddress.length<5) {
                    this.$toast("请输入准确地址")
                    return;
                }
                let data = Object.assign(this.addressInfo,{activityCode: this.activityCode});
                api.activityOrderInfoEdit("post",data,this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.$router.back();
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            //获取收货地址信息
            activityOrderInfoConfirm(){
                api.activityOrderInfoConfirm("post",{
                    activityCode: this.activityCode
                },this.tokenInfo.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.addressInfo = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
        },
        mounted(){
            //省市区选择
            new MultiPicker({
                input: 'multiPickerInput',//点击触发插件的input框的id
                container: 'address-select',//插件插入的容器id
                jsonData: $city,
                success: (arr) => {
                    switch(arr.length) {
                        case 1:
                            this.addressInfo.zone = arr[0].v + ',"",""'
                            break
                        case 2:
                            this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',""'
                            break
                        case 3:
                            this.addressInfo.zone = arr[0].v + ',' + arr[1].v + ',' + arr[2].v
                            break
                    }
                }//回调
            });
            this.activityOrderInfoConfirm();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../../assets/css/function';
    .pushing-address{
        position: relative;
        height: 101%;
        .main-container{
            position: relative;
            height: 100%;
            .addr-contain{
                padding: 0 px2rem(30px);
                border-bottom: px2rem(20px) solid #eee;
                .addr-item{
                    position: relative;
                    background-color: #fff;
                    height: px2rem(110px);
                    line-height: px2rem(110px);
                    color: #1b1b1b;
                    font-size: px2rem(32px);
                    border-bottom: 1px solid #e4e4e4;
                    overflow: hidden;
                    &.detail-contain{
                        height: px2rem(220px);
                        border-bottom: none;
                    }
                    .label{
                        float: left;
                        display: block;
                        width: px2rem(165px);
                    }
                    input{
                        float: right;
                        display: inline-block;
                        width: px2rem(500px);
                        height: px2rem(110px);
                        line-height: px2rem(110px);
                        font-size: px2rem(32px);
                        text-align: right;
                    }
                    textarea{
                        float: right;
                        display: inline-block;
                        width: px2rem(500px);
                        height: px2rem(180px);
                        padding: px2rem(30px) 0;
                        line-height: px2rem(46px);
                        font-size: px2rem(32px);
                    }
                    .destination{
                        position: relative;
                        float: right;
                        display: inline-block;
                        width: px2rem(500px);
                        height: px2rem(110px);
                        line-height: px2rem(110px);
                        font-size: px2rem(32px);
                        &::after{
                            content: "";
                            position: absolute;
                            top: px2rem(40px);
                            right: 0;
                            width: 0;
                            height: 0;
                            border-width: px2rem(22px) px2rem(15px);
                            border-style: solid;
                            border-color: #000 transparent transparent transparent;
                        }
                    }
                }
            }
            .save-btn{
                position: absolute;
                left: 50%;
                bottom: px2rem(90px);
                width: px2rem(500px);
                line-height: px2rem(80px);
                transform: translateX(-50%);
                font-size: px2rem(28px);
                color: #000;
                text-align: center;
                letter-spacing: px2rem(4px);
                background-color: #ffe200;
                border-radius: px2rem(100px);
            }
        }
    }
    @import '/static/css/city-picker.css';

    .add-activity {
        position: relative;
        background: #fff;
        padding-bottom: px2rem(50px);
        .create-event {
            .form-group {
                display: flex;
                border-bottom: 1px solid #d8d8d8;
                line-height: px2rem(100px);
                .icon {
                    color: #76D49B;
                    padding: 0 px2rem(20px);
                }
                input {
                    border: none;
                    width: 100%;
                    height: px2rem(80px);
                    line-height: px2rem(80px);
                    margin-top: px2rem(10px);
                    box-shadow: none;
                }
                textarea {
                    box-sizing: border-box;
                    width: 100%;
                    margin-top: px2rem(15px);
                    padding: px2rem(20px) 0;
                    height: px2rem(300px);
                    border: none;
                    overflow: hidden;
                    resize: none;
                    outline: none;
                    overflow: auto;
                }
            }
            .btn {
                width: 100%;
                height: px2rem(100px);
                line-height: px2rem(100px);
            }
            #btn_create_event {
                background: #76D49B;
                color: #fff;
                font-size: 14px;
            }
        }

    }
</style>
