<template>
    <div class="mayday-boss-manage">
        <activityHeader type="perpage" title="活动设置"></activityHeader>
        <div class="main-content">
            <img src="/static/images/activity/boss/mayday/headpic_manage.jpg" class="main-bg" alt="">
            <div class="main-title">门店设置</div>
            <div class="form-contain">
                <div class="form-item label1">
                    <div class="label">设置2018年春装新款折扣</div>
                    <input type="text" placeholder="请输入折扣（选填）" v-model="form.discount1" />
                </div>
                <div class="form-item label1">
                    <div class="label">设置2018年夏装新款2件折扣</div>
                    <input type="text" placeholder="请输入折扣（选填）" v-model="form.discount2" />
                </div>
                <div class="form-item label1">
                    <div class="label">设置2018年夏装新款3件折扣</div>
                    <input type="text" placeholder="请输入折扣（选填）" v-model="form.discount3"  />
                </div>
                <div class="form-item label2">
                    <div class="label">设置活动期间进店消费满赠门槛</div>
                    <input type="text" placeholder="请输入满赠门槛金额（选填）" v-model="form.consumeMoney" @focus="focus('money')" />
                </div>
                <div class="form-item label2">
                    <div class="label">设置会员兑换礼品导购分成</div>
                    <input type="text" placeholder="请输入导购分成金额" v-model="form.staffBonus" @focus="focus('bonus')" />
                </div>
                <div class="form-item triangle">
                    <div class="label">选择会员进店礼品</div>
                    <div class="select-contain male-select">
                        <p class="gender selected" @click="toggleGift" v-show="form.presentGift!=='001'&&form.presentGift!=='002'">请选择到店礼品</p>
                        <p class="gender selected" @click="toggleGift" v-show="form.presentGift==='001'||form.presentGift==='002'">{{form.presentGift==='001'?'养生茶壶五件套':'3D美容瘦脸仪'}}</p>
                        <div class="select-box" v-show="giftSelect">
                            <div class="item" @click="form.presentGift='001';giftSelect=false;">养生茶壶五件套</div>
                            <div class="item" @click="form.presentGift='002';giftSelect=false;">3D美容瘦脸仪</div>
                        </div>
                    </div>
                    <!-- <input type="text" placeholder="请输入整数（选填）" v-model="form.discount2" /> -->
                </div>
                <div class="btn-contain">
                    <div class="cancle-btn btn" @click="$router.back()">取消</div>
                    <div class="confirm-btn btn" @click="setLabourActMerStoreConsumeMoney">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import maydayApi from '../../../../fetch/mayday_api'
    import * as _validate from '../../../../util/validate'

    export default {
        components:{
            activityHeader
        },
        data() {
            return {
                token: this.$route.query.token,
                type: this.$route.query.type,
                activityCode: "7d452712155a4dd19e28393c46fce84b",
                form: {
                    "id": this.$route.query.id,
                    "consumeMoney": "",
                    "discount1": "",
                    "discount2": "",
                    "discount3": "",
                    "staffBonus": "",
                    "presentGift": ""
                },
                giftSelect: false
            }
        },
        methods: {
            getStoreSetById(){
                maydayApi.getStoreSetById("get",{
                    id: this.form.id
                },this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.form = res.returnContent;
                        // this.$router.back();
                    }else{
                        this.$toast(res.message);
                    }
                });
            },
            toggleGift(){
                this.giftSelect = !this.giftSelect
            },
            focus(item){
                if(item=="money"&&this.form.consumeMoney==0){
                    this.form.consumeMoney = ""
                }
                if(item=="bonus"&&this.form.staffBonus==0){
                    this.form.staffBonus = ""
                }
            },
            setLabourActMerStoreConsumeMoney(){
                if (_validate.discount(this.form.discount1)!==true&&this.form.discount1!=="") {
                    this.$toast("单件折扣不正确\n或者不填");
                    return;
                }
                if (_validate.discount(this.form.discount2)!==true&&this.form.discount2!=="") {
                    this.$toast("2件折扣不正确\n或者不填");
                    return;
                }
                if (_validate.discount(this.form.discount3)!==true&&this.form.discount3!=="") {
                    this.$toast("3件折扣不正确\n或者不填");
                    return;
                }
                if (!/^[1-9]\d*$/.test(this.form.consumeMoney)&&this.form.consumeMoney!=="") {
                    this.$toast("消费门槛只能为数字或者不填（不参与满赠）");
                    return;
                }
                if (!/^[1-9]\d*$/.test(this.form.staffBonus)&&this.form.staffBonus!=="") {
                    this.$toast("导购分成只能为数字或者不填");
                    return;
                }
                if (this.presentGift=="") {
                    this.$toast("请选择到店礼品");
                    return;
                }
                maydayApi.setLabourActMerStoreConsumeMoney("post",this.form,this.token).then((res)=>{
                    if(res.returnCode==="0"){
                        this.$toast("设置成功");
                        this.$router.back();
                    }else{
                        this.$toast(res.message);
                    }
                })
            }
        },
        mounted(){
            this.getStoreSetById();
            document.getElementsByClassName("content")[0].scrollTop= 0;
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
            .main-title{
                font-size: px2rem(32px);
                color: #c34241;
                margin-top: px2rem(-70px);
                text-align: center;
                letter-spacing: px2rem(5px);
            }
            .form-contain{
                overflow: hidden;
                padding: px2rem(54px) px2rem(84px) px2rem(164px);
                .form-item{
                    position: relative;
                    margin-bottom: px2rem(15px);
                    &:after{
                        content: "元";
                        position: absolute;
                        right: px2rem(40px);
                        bottom: px2rem(30px);
                        font-size: px2rem(28px);
                        color: #282828;
                    };
                    &.label1:after{
                        content: "折";
                    };
                    &.triangle:after{
                        content: "";
                        bottom: px2rem(10px);
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
                    input{
                        position: relative;
                        width: px2rem(584px);
                        height: px2rem(90px);
                        font-size: px2rem(26px);
                        color: #888;
                        background-color: #fff;
                        border-radius: px2rem(12px);
                        text-indent: px2rem(30px);
                    }
                    .select-contain{
                        position: relative;
                        width: px2rem(584px);
                        height: px2rem(90px);
                        font-size: px2rem(26px);
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
                .btn-contain{
                    position: fixed;
                    bottom: px2rem(50px);
                    left: 50%;
                    overflow: hidden;
                    width: px2rem(572px);
                    transform: translateX(-50%);
                    -moz-transform: translateX(-50%);
                    -o-transform: translateX(-50%);
                    -webkit-transform: translateX(-50%);
                    .btn{
                        width: px2rem(260px);
                        height: px2rem(88px);
                        line-height: px2rem(88px);
                        /*margin: px2rem(60px) auto px2rem(114px);*/
                        background-color: #ffd337;
                        font-size: px2rem(32px);
                        color: #a42e2b;
                        text-align: center;
                        border-radius: px2rem(100px);
                    }
                    .cancle-btn{
                        float: left;
                    }
                    .confirm-btn{
                        float: right;
                    }
                }
            }
        }
    }
</style>
