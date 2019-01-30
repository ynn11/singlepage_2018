const Guide_index = r => require.ensure([], () => r(require('../../../pages/activity/guide/goddess/Index')), 'Goddess')
const Goddess_rules = r => require.ensure([], () => r(require('../../../pages/activity/guide/goddess/Rules')), 'Goddess')
const Index = r => require.ensure([], () => r(require('../../../pages/activity/applet/goddess/Introduce')), 'Goddess')
const Goddess_signed = r => require.ensure([], () => r(require('../../../pages/activity/applet/goddess/Signed')), 'Goddess')

export default [{
    path: '/activity_2018/goddess',
    name: 'activity_2018_goddess',
    meta: {
        requireAuth: true,
        title: "女王节，来就送！"
    },
    component: Index
},{
    path: '/activity_2018/goddess_signed',
    name: 'activity_2018_goddess_signed',
    meta: {
        requireAuth: true,
        title: "女王节，来就送！"
    },
    component: Goddess_signed
},{
    path: '/activity_2018/goddess_guide',
    name: 'activity_2018_goddess_guide',
    meta: {
        requireAuth: false,
        title: "女王节，来就送！"
    },
    component: Guide_index
},{
    path: '/activity_2018/goddess_rules',
    name: 'activity_2018_goddess_rules',
    meta: {
        requireAuth: false,
        title: "女王节，来就送！"
    },
    component: Goddess_rules
}]