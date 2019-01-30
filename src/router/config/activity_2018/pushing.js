//老板端
const pushing_boss_index = r => require.ensure([], () => r(require('../../../pages/activity/boss/pushing/Index')), 'pushing')
//导购端
const pushing_guide_index = r => require.ensure([], () => r(require('../../../pages/activity/guide/pushing/Index')), 'pushing')
//会员端
const pushing_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/pushing/Index')), 'pushing')
const pushing_confirm = r => require.ensure([], () => r(require('../../../pages/activity/applet/pushing/Confirm')), 'pushing')
const pushing_address = r => require.ensure([], () => r(require('../../../pages/activity/applet/pushing/Address')), 'pushing')
const pushing_success = r => require.ensure([], () => r(require('../../../pages/activity/applet/pushing/Success')), 'pushing')

export default [{
    path: '/activity_2018/pushing_boss_index',
    name: 'activity_2018_pushing_boss_index',
    meta: {
        requireAuth: false,
        title: "小推手"
    },
    component: pushing_boss_index
},{
    path: '/activity_2018/pushing_guide_index',
    name: 'activity_2018_pushing_guide_index',
    meta: {
        requireAuth: false,
        title: "小推手"
    },
    component: pushing_guide_index
},{
    path: '/activity_2018/pushing_index',
    name: 'activity_2018_pushing_index',
    meta: {
        requireAuth: true,
        title: "小推手"
    },
    component: pushing_index
},{
    path: '/activity_2018/pushing_confirm',
    name: 'activity_2018_pushing_confirm',
    meta: {
        requireAuth: true,
        title: "小推手"
    },
    component: pushing_confirm
},{
    path: '/activity_2018/pushing_address',
    name: 'activity_2018_pushing_address',
    meta: {
        requireAuth: true,
        title: "收货地址"
    },
    component: pushing_address
},{
    path: '/activity_2018/pushing_success',
    name: 'activity_2018_pushing_success',
    meta: {
        requireAuth: true,
        title: "购买成功"
    },
    component: pushing_success
}]