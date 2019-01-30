<template>
    <div>
    
    </div>
</template>

<script>
    import _store from '../../../../vuex/store.js'
    export default {
        beforeRouteEnter(to, from, next) {
            //获取微信登录回调参数并登录
            if (to.query.tokenInfo===undefined) {
                next();
                return;
            }
            let tokenInfo = to.query.tokenInfo;
            console.log(tokenInfo);
        },
        data() {
            return {

            }
        }
    }
</script>
