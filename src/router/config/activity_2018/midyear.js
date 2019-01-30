//老板端
const midyear_boss_intro = r => require.ensure([], () => r(require('../../../pages/activity/boss/midyear/Intro')), 'midyear')
const midyear_boss_manage = r => require.ensure([], () => r(require('../../../pages/activity/boss/midyear/Manage')), 'midyear')
//导购端
const midyear_guide_intro = r => require.ensure([], () => r(require('../../../pages/activity/guide/midyear/Intro')), 'midyear')
const midyear_guide_checkprize= r => require.ensure([], () => r(require('../../../pages/activity/guide/midyear/Checkprize')), 'midyear')
// //会员端
const midyear_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/midyear/Index')), 'midyear')
const midyear_mygifts= r => require.ensure([], () => r(require('../../../pages/activity/applet/midyear/MyGifts')), 'midyear')

export default [{
    path: '/activity_2018/midyear_boss_intro',
    name: 'activity_2018_midyear_boss_intro',
    meta: {
        requireAuth: false,
        title: "超级会员招募报名"
    },
    component: midyear_boss_intro
},{
    path: '/activity_2018/midyear_boss_manage',
    name: 'activity_2018_midyear_boss_manage',
    meta: {
        requireAuth: false,
        title: "门店活动设置"
    },
    component: midyear_boss_manage
},{
    path: '/activity_2018/midyear_guide_intro',
    name: 'activity_2018_midyear_guide_intro',
    meta: {
        requireAuth: false,
        title: "超级会员招募"
    },
    component: midyear_guide_intro
},{
    path: '/activity_2018/midyear_guide_checkprize',
    name: 'activity_2018_midyear_guide_checkprize',
    meta: {
        requireAuth: false,
        title: "超级会员招募领奖"
    },
    component: midyear_guide_checkprize
},{
    path: '/activity_2018/midyear_index',
    name: 'activity_2018_midyear_index',
    meta: {
        requireAuth: true,
        title: "超级会员招募"
    },
    component: midyear_index
},{
    path: '/activity_2018/midyear_gifts',
    name: 'activity_2018_midyear_gifts',
    meta: {
        requireAuth: true,
        title: "超级会员招募"
    },
    component: midyear_mygifts
}]