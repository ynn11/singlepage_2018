<template>
    <div :class="'sell-template-box ' + [picker===''?'':'static']">
        <bossHeader :title="templateName" @on-back="back('backToPrePage')"></bossHeader>
        <div class="content-box">
            <div class="store-info" v-if="storeCode">
                <img :src="storeInfo.storeLogoUrl" alt="" class="logo">
                <p class="name"><span>{{storeInfo.storeName}}</span></p>
                <div class="btn" @click="routerLink('/boss/sell_template_store')">修改</div>
            </div>
            <div class="act-area area" @click="routerLink('/boss/sell_template_store')" v-else>
                <img src="../../../assets/images/boss/sell_template/store_before.png" alt="" class="icon">
                <p>选择活动门店</p>
                <i class="iconfont icon-yuanjia"></i>
            </div>
            <div :class="'act-info ' + [actInfo.recommendFlag===1?'rec':'']" v-if="activityCode">
                <img :src="actInfo.activityPic" alt="" class="banner">
                <p class="title">
                    <span class="name">{{actInfo.activityName}}</span>
                    <span class="more" @click="toActDetail">查看详情</span>
                </p>
                <div class="btn" @click="routerLink('/boss/sell_template_act')">修改</div>
            </div>
            <div class="store-area area" @click="routerLink('/boss/sell_template_act')" v-else>
                <img src="../../../assets/images/boss/sell_template/act_before.png" alt="" class="icon">
                <p>选择执行活动</p>
                <i class="iconfont icon-yuanjia"></i>
            </div>
            <div class="time-contain c-contain">
                <div class="sub-title">活动时间：</div>
                <div class="block-contain">
                    <div :class="'block light-b ' + [actBeginTime?'setted':'']" @click="picker='actBeginTime';popupVisible=true">{{actBeginTime?new Date(actBeginTime).Format("yyyy-MM-dd hh:mm").replace(/\-/g,"/"):"开始时间"}}</div>
                    <div class="block false-b">至</div>
                    <div :class="'block light-b ' + [actEndTime?'setted':'']" @click="picker='actEndTime';popupVisible=true">{{actEndTime?new Date(actEndTime).Format("yyyy-MM-dd hh:mm").replace(/\-/g,"/"):"结束时间"}}</div>
                </div>
            </div>
            <div class="object-contain c-contain">
                <div class="sub-title">活动对象：</div>
                <div class="block-contain">
                    <div class="block" v-if="templateConfig.templateObject===1">分组</div>
                    <div class="block" v-else>会员属性</div>
                </div>
            </div>
            <div class="main-title">参数配置：</div>
            <div class="group-contain c-contain" v-if="templateConfig.templateObject===1">
                <div class="sub-title">分组</div>
                <div class="block-contain">
                    <div class="block">{{templateConfig.obejctGrupName}}</div>
                </div>
            </div>
            <div class="attr-contain c-contain" v-else>
                <div class="sub-title">会员属性</div>
                <div class="block-contain">
                    <div class="block">2周消费大于或等于2次的会员</div>
                </div>
            </div>
            <div class="rule-contain c-contain">
                <div class="sub-title">活动规则：</div>
            </div>
            <div class="submit-btn" @click="executeActivity">立即执行</div>
        </div>
        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="picker-contain">
                <mt-datetime-picker type="dateTime" :startDate="new Date()" v-show="picker" @confirm="dateConfirm" @cancel="popupVisible=false;picker='';"></mt-datetime-picker>
            </div>
        </mt-popup>
        <div class="popWindow" v-if="showSuccess">
            <div class="mask">
                <div class="success-contain pop-contain">
                    <p class="tip">活动已成功开启，进入我的活动，查看活动详</p>
                    <p class="countdown">{{countdown}}s后进入我的活动</p>
                    <p class="btn" @click="back('goToMyActivity')">立即进入我的活动</p>
                    <p class="btn" @click="back('backToHome')">返回首页</p>
                </div>
            </div>
        </div>
        <v-loading v-show="loading"></v-loading>
    </div>
</template>

<script>
    import api from '../../../fetch/boss_api'
    import * as _tool from "../../../util/tool"
    import bossHeader from "@/components/common/bossHeader"
    import loading from '@/components/common/loading'
    export default {
        components: {
            "v-loading": loading,
            bossHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                templateCode: this.$route.query.templateCode||null,
                templateName: this.$route.query.templateName,
                msgId: this.$route.query.msgId||null,
                templateConfig: {},
                storeInfo: {},
                actInfo: {},
                popupVisible: false,
                picker: "",
                showSuccess: false,
                loading: false,
                timer: null,
                countdown: 3
            }
        },
        computed: {
            storeCode () {
                return this.$store.state.boss.sellTemplate.storeCode||null
            },
            activityCode () {
                return this.$store.state.boss.sellTemplate.activityCode||null
            },
            actBeginTime () {
                return this.$store.state.boss.sellTemplate.beginTime||null
            },
            actEndTime () {
                return this.$store.state.boss.sellTemplate.endTime||null
            },
        },
        methods: {
            //倒计时跳转
            runTimer(){
                this.timer = setTimeout(()=>{
                    if (this.countdown>1) {
                        this.runTimer();
                    }else{
                        this.back("goToMyActivity");
                    }
                    this.countdown --;
                },1000)
            },
            //左上角返回
            back(position){
                clearTimeout(this.timer);
                //返回app(backToPrePage) 返回我的活动(goToMyActivity) 返回首页(backToHome)
                WebViewJavascriptBridge.callHandler(position,{},function(response) {});
            },
            //路由跳转
            routerLink(url){
                this.$router.push({
                    path: `${url}?token=${this.token}&type=${this.type}&templateCode=${this.templateCode}&storeCode=${this.storeCode}&activityCode=${this.activityCode}`
                })
            },
            //查看活动详情
            toActDetail(){
                this.$router.push({
                    path: `/boss/sell_template_act_detail?actDetailPic=${this.actInfo.activityDescPic}&activityCode=${this.actInfo.activityCode}&selected=yes`
                })
            },
            //执行活动
            executeActivity(){
                this.loading = true;
                if (!this.storeCode) {
                    this.loading = false;
                    this.$toast("请选择门店")
                    return;
                }
                if (!this.activityCode) {
                    this.loading = false;
                    this.$toast("请选择活动")
                    return;
                }
                if (!(this.actBeginTime&&this.actEndTime)) {
                    this.loading = false;
                    this.$toast("请选择开始和结束时间")
                    return;
                }
                if (this.actBeginTime>=this.actEndTime) {
                    this.loading = false;
                    this.$toast("结束时间需要大于开始时间")
                    return;
                }
                let data = JSON.parse(JSON.stringify(this.templateConfig));
                data.storeCode = this.storeCode;
                data.activityCode = this.activityCode;
                data.msgId = this.msgId;
                //鹤哥坑我 哈哈哈哈
                data.actBeginTime = new Date(this.actBeginTime).Format("yyyy-MM-dd hh:mm:ss");
                data.actEndTime = new Date(this.actEndTime).Format("yyyy-MM-dd hh:mm:ss");
                api.executeActivity("post",data,this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        let img = new Image();
                        img.src = "/static/images/boss/sell_template/pop_bg.png";
                        img.onload = ()=>{
                            this.loading = false;
                            this.showSuccess = true;
                            this.runTimer();
                        }
                    }else{
                        this.loading = false;
                        this.$toast(res.message);
                    }
                })
            },
            //时间选择
            dateConfirm(value){
                if (this.picker==="actBeginTime") {
                    this.$store.dispatch("updateSellTemplateBeginTime",value)
                }else{
                    this.$store.dispatch("updateSellTemplateEndTime",value)
                }
                this.popupVisible = false;
                this.picker = "";
            },
            //更新storeCode和activityCode
            updateCode(){
                if (!this.storeCode) {
                    this.$store.dispatch("updateSellTemplateStoreCode",this.$route.query.storeCode)
                }
                if (!this.activityCode) {
                    this.$store.dispatch("updateSellTemplateActivityCode",this.$route.query.activityCode)
                }
                //已选门店
                this.loadStoreInfo()
                //已选活动
                this.loadActInfo()
            },
            //已选门店（鹤哥坑我）
            loadStoreInfo(){
                api.listStore("get",{
                    templateCode: this.templateCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        let list = res.returnContent;
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].storeCode===this.storeCode) {
                                this.storeInfo = list[i];
                                return;
                            }
                        }
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //已选活动（鹤哥坑我）
            loadActInfo(){
                api.listActivity("get",{
                    templateCode: this.templateCode
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        let list = res.returnContent;
                        let selected = -1;
                        let recommend = -1;
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].activityCode===this.activityCode) {
                                selected = i;
                                return;
                            }
                            if (list[i].recommendFlag===1) {
                                recommend = i;
                            }
                        }
                        if (selected!==-1) {
                            this.actInfo = list[selected];
                        }else if(recommend!==-1){
                            this.$store.dispatch("updateSellTemplateActivityCode",list[recommend].activityCode);
                            this.actInfo = list[recommend];
                        }
                        this.loadTemplateConfig();
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            //获取模板相关配置
            loadTemplateConfig(){
                api.getTemplateActivityConfig("get",{
                    templateCode: this.templateCode,
                    storeCode: this.storeCode,
                    activityCode: this.activityCode,
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.templateConfig = res.returnContent;
                    }else{
                        this.$toast(res.message);
                    }
                })
            }
        },
        created(){
            this.updateCode();
            //日期格式化初始化
            _tool.DateFormat();
            //初始化webViewJavascriptBridge
            _tool.webviewBridgeInit(this.type);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../assets/css/function';
    .sell-template-box{
        &.static{
            overflow: hidden !important;
        }
        .content-box{
            position: relative;
            padding-top: px2rem(80px);
            background-color: #F4F4F4;
            min-height: 101%;
            box-sizing: border-box;
            overflow: hidden;
            .area{
                position: relative;
                width: px2rem(690px);
                margin: px2rem(30px) auto;
                background-color: #F7574D;
                border-radius: px2rem(4px);
                overflow: hidden;
                &.store-area{
                    background-color: #52ACFF;
                }
                .icon{
                    float: left;
                    width: px2rem(58px);
                    height: px2rem(58px);
                    margin: px2rem(21px) px2rem(65px) px2rem(21px) px2rem(30px);
                }
                p{
                    float: left;
                    font-size: px2rem(30px);
                    color: #fff;
                    height: px2rem(100px);
                    line-height: px2rem(100px);
                }
                .iconfont{
                    position: absolute;
                    top: px2rem(35px);
                    right: px2rem(30px);
                    font-size: px2rem(30px);
                    color: #fff;
                }
            }
            /*已选门店*/
            .store-info{
                position: relative;
                width: px2rem(690px);
                height: px2rem(135px);
                margin: px2rem(30px) auto;
                background-color: #fff;
                border-radius: px2rem(4px);
                overflow: hidden;
                display: flex;
                justify-content: space-around;
                .logo{
                    width: px2rem(114px);
                    height: px2rem(114px);
                    margin: px2rem(10px);
                }
                .name{
                    width: px2rem(416px);
                    display: table;
                    height: 100%;
                    span{
                        font-size: px2rem(28px);
                        color: #333;
                        padding: 0 px2rem(20px);
                        display: table-cell;
                        vertical-align: middle;
                    }
                }
                .btn{
                    width: px2rem(150px);
                    height: 100%;
                    line-height: px2rem(135px);
                    text-align: center;
                    font-size: px2rem(28px);
                    color: #fff;
                    background: linear-gradient(-90deg,rgba(243,130,53,1),rgba(247,85,78,1));
                    &.sel{
                        font-size: px2rem(20px);
                        background: #9A9A9A;
                    }
                }
            }
            /*已选活动*/
            .act-info{
                position: relative;
                width: px2rem(690px);
                margin: px2rem(30px) auto;
                background-color: #fff;
                border-radius: px2rem(4px);
                box-sizing: border-box;
                overflow: hidden;
                &.rec{
                    &:before{
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: px2rem(94px);
                        height: px2rem(94px);
                        background: url(../../../assets/images/boss/sell_template/recommend_icon.png);
                        background-size: 100% 100%;
                    };
                }
                &:after{
                    content: "";
                    position: absolute;
                    bottom: px2rem(88px);
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: #F4F4F4;
                    z-index: 1
                }
                .banner{
                    display: block;
                    width: 100%;
                    height: px2rem(290px);
                }
                .title{
                    position: relative;
                    float: left;
                    width: px2rem(520px);
                    font-size: px2rem(28px);
                    color: #333;
                    overflow: hidden;
                    text-indent: px2rem(30px);
                    .name{
                        float: left;
                        width: 100%;
                        height: px2rem(100px);
                        line-height: px2rem(100px);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .more{
                        float: left;
                        width: 100%;
                        font-size: px2rem(26px);
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        color: #6F6F6F;
                    }
                    .next{
                        float: right;
                        /*margin-left: px2rem(10px);*/
                        width: px2rem(20px);
                        height: px2rem(20px);
                        margin: px2rem(5px) 0 px2rem(5px) px2rem(10px);
                    }
                }
                .btn{
                    position: relative;
                    float: right;
                    width: px2rem(150px);
                    height: px2rem(188px);
                    line-height: px2rem(188px);
                    text-align: center;
                    font-size: px2rem(28px);
                    color: #fff;
                    background:linear-gradient(-128.4deg,rgba(243,130,53,1),rgba(247,85,78,1));
                    z-index: 2;
                    &.sel{
                        background-color: #EB9983;
                    }
                }
            }
            .main-title{
                font-size: px2rem(32px);
                color: #333;
                text-indent: px2rem(30px);
                margin: px2rem(60px) 0 px2rem(30px);
            }
            .c-contain{
                background-color: #fff;
                width: px2rem(690px);
                margin: 0 auto;
                padding: px2rem(30px);
                box-sizing: border-box;
                &.object-contain{
                    margin-top: px2rem(5px);
                }
                &.attr-contain{
                    margin-top: 1px;
                }
                &.rule-contain{
                    margin-top: px2rem(10px);
                }
                .sub-title{
                    font-size: px2rem(30px);
                }
                .block-contain{
                    position: relative;
                    overflow: hidden;
                    padding-top: px2rem(30px);
                    .block{
                        display: inline-block;
                        font-size: px2rem(28px);
                        color: #333;
                        padding: px2rem(16px) px2rem(68px);
                        background-color: #F4F4F4;
                        border-radius: px2rem(4px);
                        &.false-b{
                            background: none;
                            padding: 0;
                            margin: 0 px2rem(30px);
                        }
                        &.light-b{
                            color: #959595;
                        }
                        &.setted{
                            padding: px2rem(16px) px2rem(20px);
                            color: #333;
                        }
                    }
                }
            }
            .submit-btn{
                font-size: px2rem(32px);
                color: #fff;
                text-align: center;
                width: px2rem(690px);
                height: px2rem(100px);
                line-height: px2rem(100px);
                background-color: #F7574D;
                border-radius: px2rem(4px);
                margin: px2rem(30px) auto;
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
                overflow: hidden;
                .close{
                    position: absolute;
                    top: px2rem(40px);
                    right: px2rem(30px);
                    width: px2rem(30px);
                    height: px2rem(30px);
                    z-index: 9;
                }
            }
            .success-contain{
                width: px2rem(544px);
                height: px2rem(550px);
                background: url("/static/images/boss/sell_template/pop_bg.png") center center no-repeat;
                background-size: 100%;
                .tip{
                    font-size: px2rem(32px);
                    line-height: px2rem(45px);
                    color: #fff;
                    margin: px2rem(30px);
                    letter-spacing: px2rem(3px);
                }
                .countdown{
                    font-size: px2rem(30px);
                    line-height: px2rem(42px);
                    color: #fff;
                    padding: px2rem(30px) 0 px2rem(60px);
                    text-align: center;
                    letter-spacing: px2rem(3px);
                }
                .btn{
                    width: px2rem(484px);
                    height: px2rem(82px);
                    margin: px2rem(30px) auto px2rem(40px);
                    background-color: #EE4112;
                    border-radius: px2rem(50px);
                    font-size: px2rem(32px);
                    color: #fff;
                    line-height: px2rem(82px);
                    text-align: center;
                }
            }
        }
        //覆写mint-ui部分样式
        .mint-popup{
            width: 100%;
        }
        .mint-popup-bottom{
            transform: translate3d(-50%, 0, 0);

        }
    }
</style>
