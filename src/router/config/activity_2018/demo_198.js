const Intro = r => require.ensure([], () => r(require('../../../pages/activity/applet/demo_198/Intro')), 'Demo_198')
const Success = r => require.ensure([], () => r(require('../../../pages/activity/applet/demo_198/Success')), 'Demo_198')
const UCenter = r => require.ensure([], () => r(require('../../../pages/activity/applet/demo_198/UCenter')), 'Demo_198')
const Account = r => require.ensure([], () => r(require('../../../pages/activity/applet/demo_198/Account')), 'Demo_198')

const Guide_intro = r => require.ensure([], () => r(require('../../../pages/activity/guide/demo_198/Intro')), 'Demo_198')
const Members = r => require.ensure([], () => r(require('../../../pages/activity/guide/demo_198/Members')), 'Demo_198')

export default [{
    path: '/activity_2018/demo_198',
    name: 'activity_2018_demo_198',
    meta: {
        requireAuth: true,
        title: "198会员"
    },
    component: Intro
},{
    path: '/activity_2018/demo_198_success',
    name: 'activity_2018_demo_198_success',
    meta: {
        requireAuth: true,
        title: "198会员"
    },
    component: Success
},{
    path: '/activity_2018/demo_198_uCenter',
    name: 'activity_2018_demo_198_uCenter',
    meta: {
        requireAuth: true,
        title: "198会员"
    },
    component: UCenter
},{
    path: '/activity_2018/demo_198_account',
    name: 'activity_2018_demo_198_account',
    meta: {
        requireAuth: true,
        title: "198会员"
    },
    component: Account
},{
    path: '/activity_2018/demo_198_guide_intro',
    name: 'activity_2018_demo_198_guide_intro',
    meta: {
        requireAuth: false,
        title: "198会员"
    },
    component: Guide_intro
},{
    path: '/activity_2018/demo_198_members',
    name: 'activity_2018_demo_198_members',
    meta: {
        requireAuth: false,
        title: "198会员"
    },
    component: Members
}]