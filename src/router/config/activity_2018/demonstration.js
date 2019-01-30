const Demonstration = r => require.ensure([], () => r(require('../../../pages/activity/applet/demonstration/Index')), 'Demonstration')
const Demonstration_guide = r => require.ensure([], () => r(require('../../../pages/activity/guide/demonstration/Index')), 'Demonstration')

export default [{
    path: '/activity_2018/demonstration',
    name: 'activity_2018_demonstration',
    meta: {
        requireAuth: true,
        title: "opp演示活动"
    },
    component: Demonstration
},{
    path: '/activity_2018/demonstration_guide',
    name: 'activity_2018_demonstration_guide',
    meta: {
        requireAuth: false,
        title: "opp演示活动"
    },
    component: Demonstration_guide
}]