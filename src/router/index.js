import Vue from 'vue'
import Router from 'vue-router'
import store from "../vuex/store"
import _urlConfig from "../util/urlConfig"

//路由配置
import index from './config/index'
import v1 from './config/v1'
import v2 from './config/v2'
import sb from './config/sb'
import activity_2017 from './config/activity_2017/index'
import activity_2018 from './config/activity_2018/index'

Vue.use(Router)

const router = new Router({
    mode: "history",
    history: false,
    linkActiveClass: 'active',
    routes: [
        ...index,
        ...v1,
        ...v2,
        ...sb,
        ...activity_2017,
        ...activity_2018
    ]
})

//改变title
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.title)) {
        document.title = to.meta.title;
    }
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.user.tokenInfo&&store.state.user.tokenInfo!=="") {
            next();
        }
        else {
            let href = _urlConfig.redirectBaseredirectURI + "/index?type=1wxLogin&redirect=" + encodeURIComponent(to.fullPath);
            location.href= _urlConfig.apiUri + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
            // location.href= "https://api.storeer.com" + "/v2/api/thirdPartyLogin?redirectURI=" + encodeURIComponent(href);
        }
    }
    else {
        next();
    }
})

export default router;