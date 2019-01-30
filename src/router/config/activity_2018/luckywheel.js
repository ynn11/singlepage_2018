
const luckywheel_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/luckywheel/Index')), 'luckywheel');
const luckywheel_demo = r => require.ensure([], () => r(require('../../../pages/activity/applet/luckywheel/Demo')), 'luckywheel');



export default [
  {
    path: '/activity_2018/luckywheel_index',
    name: 'activity_2018_luckywheel_index',
    meta: {
      requireAuth: false,
      title: ""
    },
    component: luckywheel_index,
  },
  {
    path: '/activity_2018/luckywheel_demo',
    name: 'activity_2018_luckywheel_demo',
    meta: {
      requireAuth: false,
      title: ""
    },
    component: luckywheel_demo,
  },


]
