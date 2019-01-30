//导购排行
const GuideRank = r => require.ensure([], () => r(require('../../../pages/activity/guide/GuideRank')), 'Activity')

export default [{
    path: '/activity/guideRank',
    name: 'activity_guideRank',
    component: GuideRank
}]