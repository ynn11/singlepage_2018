//老板端
const midautumn_boss_intro = r => require.ensure([], () => r(require('../../../pages/activity/boss/midAutumn/Intro')), 'midautumn')
const midautumn_boss_manage = r => require.ensure([], () => r(require('../../../pages/activity/boss/midAutumn/Manage')), 'midautumn')
const midautumn_boss_data = r => require.ensure([], () => r(require('../../../pages/activity/boss/midAutumn/Data')), 'midautumn')
//导购端
const midautumn_guide_intro = r => require.ensure([], () => r(require('../../../pages/activity/guide/midAutumn/Intro')), 'midautumn')
const midautumn_guide_part1 = r => require.ensure([], () => r(require('../../../pages/activity/guide/midAutumn/Part1')), 'midautumn')
const midautumn_guide_part2 = r => require.ensure([], () => r(require('../../../pages/activity/guide/midAutumn/Part2')), 'midautumn')
//会员端
const midautumn_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/midAutumn/Index')), 'midautumn')
const midautumn_gifts = r => require.ensure([], () => r(require('../../../pages/activity/applet/midAutumn/Gifts')), 'midautumn')

export default [{
    path: '/activity_2018/midautumn_boss_intro',
    name: 'activity_2018_midautumn_boss_intro',
    meta: {
        requireAuth: false,
        title: "迎中秋，庆国庆"
    },
    component: midautumn_boss_intro
},{
    path: '/activity_2018/midautumn_boss_manage',
    name: 'activity_2018_midautumn_boss_manage',
    meta: {
        requireAuth: false,
        title: "迎中秋，庆国庆——设置"
    },
    component: midautumn_boss_manage
},{
    path: '/activity_2018/midautumn_boss_data',
    name: 'activity_2018_midautumn_boss_data',
    meta: {
        requireAuth: false,
        title: "迎中秋，庆国庆——数据"
    },
    component: midautumn_boss_data
},{
    path: '/activity_2018/midautumn_guide_intro',
    name: 'activity_2018_midautumn_guide_intro',
    meta: {
        requireAuth: false,
        title: "迎中秋，庆国庆"
    },
    component: midautumn_guide_intro
},{
    path: '/activity_2018/midautumn_guide_part1',
    name: 'activity_2018_midautumn_guide_part1',
    meta: {
        requireAuth: false,
        title: "迎中秋，庆国庆"
    },
    component: midautumn_guide_part1
},{
    path: '/activity_2018/midautumn_guide_part2',
    name: 'activity_2018_midautumn_guide_part2',
    meta: {
        requireAuth: false,
        title: "迎中秋，庆国庆"
    },
    component: midautumn_guide_part2
},{
    path: '/activity_2018/midautumn_index',
    name: 'activity_2018_midautumn_index',
    meta: {
        requireAuth: true,
        title: "迎中秋，庆国庆"
    },
    component: midautumn_index
},{
    path: '/activity_2018/midautumn_gifts',
    name: 'activity_2018_midautumn_gifts',
    meta: {
        requireAuth: true,
        title: "迎中秋，庆国庆"
    },
    component: midautumn_gifts
}]