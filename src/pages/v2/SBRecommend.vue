<template>
    <div class="msgInfo-box">
        <div class="title">{{msgInfo.msgTitle}}</div>
        <div class="msg-content" v-html="msgInfo.msgContent">

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
            msgCode: this.$route.query.msgCode,
            token: this.$route.query.token,
            msgInfo: {
                msgTitle: "",
                msgContent: ""
            }
        }
    },
    methods: {
        getContent(){
            api.getRecommendMsgContent("get",{msgCode: this.msgCode},this.token).then(res => {
                //接口返回成功
                if (res.returnCode==="0") {
                    this.msgInfo = res.returnContent;
                }
                //返回失败
                else{
                    alert(res.message);
                }
            })
        }
    },
    mounted(){
        this.getContent();
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/css/function';
    .msgInfo-box{
        padding: px2rem(20px);
        height: 101%;
        box-sizing: border-box;
        .title{
            font-size: px2rem(48px);
            color: #1b1b1b;
            padding-top: px2rem(40px);
        }
        .min-title{
            font-size: px2rem(28px);
            color: #858585;
            line-height: px2rem(80px);
            .teacher{
                margin-left: px2rem(50px);
            }
        }
        .msg-content{
            p{
                font-size: px2rem(26px);
                color: #a2a2a2;
                line-height: px2rem(42px);
                letter-spacing: px2rem(5px);
                text-indent: px2rem(62px);
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
    }
</style>
