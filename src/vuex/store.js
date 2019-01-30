import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import boss from './modules/boss'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        boss,
    }
})
