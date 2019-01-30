<template>
    <div class="daily-index-box">

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
                msgItemTypeCode: this.$route.query.msgItemTypeCode
            }
        },
        methods: {
            redirect: function(){
                switch(this.msgItemTypeCode){
                    case "323":
                        this.$router.replace("/boss/daily?appMsgCode=" + this.appMsgCode + "&msgItemTypeCode=" + this.msgItemTypeCode + "&token=" + this.token + "&type=" + this.type);
                    break;
                    case "322":
                        this.$router.replace("/boss/monthly_member?appMsgCode=" + this.appMsgCode + "&msgItemTypeCode=" + this.msgItemTypeCode + "&token=" + this.token + "&type=" + this.type);
                    break;
                    case "321":
                        this.$router.replace("/boss/monthly_income?appMsgCode=" + this.appMsgCode + "&msgItemTypeCode=" + this.msgItemTypeCode + "&token=" + this.token + "&type=" + this.type);
                    break;
                }
            }
        },
        mounted(){
            this.redirect();
            console.log(1);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
