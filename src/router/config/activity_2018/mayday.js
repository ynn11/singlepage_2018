//老板端
const Mayday_boss_intro = r => require.ensure([], () => r(require('../../../pages/activity/boss/mayday/Intro')), 'mayday')
const Mayday_boss_manage = r => require.ensure([], () => r(require('../../../pages/activity/boss/mayday/Manage')), 'mayday')
const Mayday_boss_setting = r => require.ensure([], () => r(require('../../../pages/activity/boss/mayday/Setting')), 'mayday')
//导购端
const Mayday_guide_intro = r => require.ensure([], () => r(require('../../../pages/activity/guide/mayday/Intro')), 'mayday')
const Mayday_guide_checkprize= r => require.ensure([], () => r(require('../../../pages/activity/guide/mayday/Checkprize')), 'mayday')
//会员端
const Mayday_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/mayday/Index')), 'mayday')
const Mayday_help_other= r => require.ensure([], () => r(require('../../../pages/activity/applet/mayday/HelpOther')), 'mayday')
const Mayday_success= r => require.ensure([], () => r(require('../../../pages/activity/applet/mayday/Success')), 'mayday')

export default [{
    path: '/activity_2018/mayday_boss_intro',
    name: 'activity_2018_mayday_boss_intro',
    meta: {
        requireAuth: false,
        title: "五一活动报名"
    },
    component: Mayday_boss_intro
},{
    path: '/activity_2018/mayday_boss_manage',
    name: 'activity_2018_mayday_boss_manage',
    meta: {
        requireAuth: false,
        title: "门店活动设置"
    },
    component: Mayday_boss_manage
},{
    path: '/activity_2018/mayday_boss_setting',
    name: 'activity_2018_mayday_boss_setting',
    meta: {
        requireAuth: false,
        title: "门店设置"
    },
    component: Mayday_boss_setting
},{
    path: '/activity_2018/mayday_guide_intro',
    name: 'activity_2018_mayday_guide_intro',
    meta: {
        requireAuth: false,
        title: "五一活动"
    },
    component: Mayday_guide_intro
},{
    path: '/activity_2018/mayday_guide_checkprize',
    name: 'activity_2018_mayday_guide_checkprize',
    meta: {
        requireAuth: false,
        title: "五一活动兑换"
    },
    component: Mayday_guide_checkprize
},{
    path: '/activity_2018/mayday_index',
    name: 'activity_2018_mayday_index',
    meta: {
        requireAuth: true,
        title: "精美礼品免费拿"
    },
    component: Mayday_index
},{
    path: '/activity_2018/mayday_help_other',
    name: 'activity_2018_mayday_help_other',
    meta: {
        requireAuth: true,
        title: "帮助好友免费拿礼品"
    },
    component: Mayday_help_other
},{
    path: '/activity_2018/mayday_success',
    name: 'activity_2018_mayday_success',
    meta: {
        requireAuth: true,
        title: "点亮成功"
    },
    component: Mayday_success
}]