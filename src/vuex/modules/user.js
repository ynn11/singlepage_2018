import usermutations from '../user/mutation'
import useractions from '../user/action'
import userstate from '../user/state'
/**
 * user通用配置
 */
const state = userstate

const actions = useractions

const getters = {

}

const mutations = usermutations

export default {
    state,
    actions,
    getters,
    mutations
}