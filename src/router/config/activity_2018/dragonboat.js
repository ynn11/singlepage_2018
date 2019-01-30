//老板端
const dbf_boss_intro = r => require.ensure([], () => r(require('../../../pages/activity/boss/dragonboat/Intro')), 'dragonboat')
const dbf_boss_manage = r => require.ensure([], () => r(require('../../../pages/activity/boss/dragonboat/Manage')), 'dragonboat')
//导购端
const dbf_guide_intro = r => require.ensure([], () => r(require('../../../pages/activity/guide/dragonboat/Intro')), 'dragonboat')
const dbf_guide_checkprize= r => require.ensure([], () => r(require('../../../pages/activity/guide/dragonboat/Checkprize')), 'dragonboat')
// //会员端
const dbf_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/dragonboat/Index')), 'dragonboat')
const dbf_mygifts= r => require.ensure([], () => r(require('../../../pages/activity/applet/dragonboat/MyGifts')), 'dragonboat')

export default [{
    path: '/activity_2018/dragonboat_boss_intro',
    name: 'activity_2018_dragonboat_boss_intro',
    meta: {
        requireAuth: false,
        title: "端午活动报名"
    },
    component: dbf_boss_intro
},{
    path: '/activity_2018/dragonboat_boss_manage',
    name: 'activity_2018_dragonboat_boss_manage',
    meta: {
        requireAuth: false,
        title: "门店活动设置"
    },
    component: dbf_boss_manage
},{
    path: '/activity_2018/dragonboat_guide_intro',
    name: 'activity_2018_dragonboat_guide_intro',
    meta: {
        requireAuth: false,
        title: "端午活动"
    },
    component: dbf_guide_intro
},{
    path: '/activity_2018/dragonboat_guide_checkprize',
    name: 'activity_2018_dragonboat_guide_checkprize',
    meta: {
        requireAuth: false,
        title: "端午活动领奖"
    },
    component: dbf_guide_checkprize
},{
    path: '/activity_2018/dragonboat_index',
    name: 'activity_2018_dragonboat_index',
    meta: {
        requireAuth: true,
        title: "端午活动"
    },
    component: dbf_index
},{
    path: '/activity_2018/dragonboat_gifts',
    name: 'activity_2018_dragonboat_gifts',
    meta: {
        requireAuth: true,
        title: "端午活动"
    },
    component: dbf_mygifts
}]