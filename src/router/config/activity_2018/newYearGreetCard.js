/**
 * 新年祝福卡
 */

//C端
const newYearGreetCard_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/newYearGreetCard/Index')), 'newYearGreetCard');
//导购端
const newYearGreetCard_guide_index = r => require.ensure([], () => r(require('../../../pages/activity/guide/newYearGreetCard/Index')), 'newYearGreetCard');

export default [
  {
    path: '/activity_2018/newYearGreetCard_index',
    name: 'activity_2018_newYearGreetCard_index',
    meta: {
      requireAuth: true,
      title: "新年祝福卡来啦！"
    },
    component: newYearGreetCard_index
  },
  {
    path: '/activity_2018/newYearGreetCard_guide_index',
    name: 'activity_2018_newYearGreetCard_guide_index',
    meta: {
      requireAuth: false,
      title: "新年祝福卡来啦！"
    },
    component: newYearGreetCard_guide_index
  },

]
