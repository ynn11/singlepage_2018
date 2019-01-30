<template>
    <div>
        <h1>Welcome To SinglePage</h1>
    </div>
</template>

<script>
    import _store from '../vuex/store.js'
    export default {
        beforeRouteEnter(to, from, next) {
            //获取微信登录回调参数并登录
            if (to.query.tokenInfo===undefined) {
                next();
                return;
            }
            let tokenInfo = to.query.tokenInfo;
            let openId = to.query.openId;
            _store.dispatch("_login",{tokenInfo:tokenInfo,openId: openId,redirect: to.query.redirect||""});
        },
        data() {
            return {
            }
        }
    }
</script>
