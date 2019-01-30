//老板端
const msc_boss_intro = r => require.ensure([], () => r(require('../../../pages/activity/boss/membershipCard/Intro')), 'membershipCard')
const msc_boss_manage = r => require.ensure([], () => r(require('../../../pages/activity/boss/membershipCard/Manage')), 'membershipCard')
const msc_boss_data = r => require.ensure([], () => r(require('../../../pages/activity/boss/membershipCard/Data')), 'membershipCard')
const msc_boss_store = r => require.ensure([], () => r(require('../../../pages/activity/boss/membershipCard/StoreData')), 'membershipCard')
//导购端
const msc_guide_intro = r => require.ensure([], () => r(require('../../../pages/activity/guide/membershipCard/Intro')), 'membershipCard')
const msc_guide_checkprize= r => require.ensure([], () => r(require('../../../pages/activity/guide/membershipCard/Checkprize')), 'membershipCard')
const msc_guide_data= r => require.ensure([], () => r(require('../../../pages/activity/guide/membershipCard/Data')), 'membershipCard')
const msc_guide_complete= r => require.ensure([], () => r(require('../../../pages/activity/guide/membershipCard/CompleteInfo')), 'membershipCard')
// //会员端
const msc_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/membershipCard/Index')), 'membershipCard')
const msc_mygifts= r => require.ensure([], () => r(require('../../../pages/activity/applet/membershipCard/MyGifts')), 'membershipCard')
const msc_product= r => require.ensure([], () => r(require('../../../pages/activity/applet/membershipCard/ProductDetail')), 'membershipCard')

export default [{
    path: '/activity_2018/mscard_boss_intro',
    name: 'activity_2018_mscard_boss_intro',
    meta: {
        requireAuth: false,
        title: "优享会员卡报名"
    },
    component: msc_boss_intro
},{
    path: '/activity_2018/mscard_boss_manage',
    name: 'activity_2018_mscard_boss_manage',
    meta: {
        requireAuth: false,
        title: "门店活动设置"
    },
    component: msc_boss_manage
},{
    path: '/activity_2018/mscard_boss_data',
    name: 'activity_2018_mscard_boss_data',
    meta: {
        requireAuth: false,
        title: "活动数据"
    },
    component: msc_boss_data
},{
    path: '/activity_2018/mscard_boss_store',
    name: 'activity_2018_mscard_boss_store',
    meta: {
        requireAuth: false,
        title: "门店活动数据"
    },
    component: msc_boss_store
},{
    path: '/activity_2018/mscard_guide_intro',
    name: 'activity_2018_mscard_guide_intro',
    meta: {
        requireAuth: false,
        title: "优享会员卡"
    },
    component: msc_guide_intro
},{
    path: '/activity_2018/mscard_guide_checkprize',
    name: 'activity_2018_mscard_guide_checkprize',
    meta: {
        requireAuth: false,
        title: "优享会员卡领奖"
    },
    component: msc_guide_checkprize
},{
    path: '/activity_2018/mscard_guide_data',
    name: 'activity_2018_mscard_guide_data',
    meta: {
        requireAuth: false,
        title: "活动数据"
    },
    component: msc_guide_data
},{
    path: '/activity_2018/mscard_guide_completeinfo',
    name: 'activity_2018_mscard_guide_completeinfo',
    meta: {
        requireAuth: false,
        title: "完善会员信息"
    },
    component: msc_guide_complete
},{
    path: '/activity_2018/mscard_index',
    name: 'activity_2018_mscard_index',
    meta: {
        requireAuth: true,
        title: "优享会员卡"
    },
    component: msc_index
},{
    path: '/activity_2018/mscard_gifts',
    name: 'activity_2018_mscard_gifts',
    meta: {
        requireAuth: true,
        title: "优享会员卡"
    },
    component: msc_mygifts
},{
    path: '/activity_2018/mscard_product',
    name: 'activity_2018_mscard_product',
    meta: {
        requireAuth: true,
        title: "优享会员卡"
    },
    component: msc_product
}]