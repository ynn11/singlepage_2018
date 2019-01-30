<template>
    <div class="esotericaInfo-box">
        <div class="title">{{esotericaInfo.esoTitle}}</div>
        <div class="min-title">
            <span class="time">{{esotericaInfo.createTime.substring(0,10)}}</span>
            <span class="teacher">{{esotericaInfo.tutorName}}</span>
        </div>
        <div class="eso-content" v-html="esotericaInfo.esoContent">

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
            esoCode: this.$route.query.esoCode,
            token: this.$route.query.token,
            esotericaInfo: {
                esoTitle: "",
                createTime: "",
                tutorName: "",
                esoContent: ""
            }
        }
    },
    methods: {
        getContent(){
            api.getEsotericaInfo("get",{esoCode: this.esoCode},this.token).then(res => {
                //接口返回成功
                if (res.returnCode==="0") {
                    this.esotericaInfo = res.returnContent;
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
    .esotericaInfo-box{
        padding: px2rem(20px);
        min-height: 101%;
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
        .eso-content{
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
