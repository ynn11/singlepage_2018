/**
 * 双十一活动
 */
//老板端
const double_boss_intro = r => require.ensure([], () => r(require('../../../pages/activity/boss/double_11/Intro')), 'double_11');
const double_boss_set = r => require.ensure([], () => r(require('../../../pages/activity/boss/double_11/Set')), 'double_11');
const double_boss_data = r => require.ensure([], () => r(require('../../../pages/activity/boss/double_11/Data')), 'double_11');

//会员端
const double_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/double_11/Index')), 'double_11');
const double_gifts = r => require.ensure([], () => r(require('../../../pages/activity/applet/double_11/Gifts')), 'double_11');

//导购端
const double_guide_intro = r => require.ensure([], () => r(require('../../../pages/activity/guide/double_11/Intro')), 'double_11');
const double_guide_poster = r => require.ensure([], () => r(require('../../../pages/activity/guide/double_11/Poster')), 'double_11');


export default [
  {
    path: '/activity_2018/double_boss_intro',
    name: 'activity_2018_double_boss_intro',
    meta: {
      requireAuth: false,
      title: "11.11,单？免了！"
    },
    component: double_boss_intro
  }, {
    path: '/activity_2018/double_boss_set',
    name: 'activity_2018_double_boss_set',
    meta: {
      requireAuth: false,
      title: "11.11,单？免了！"
    },
    component: double_boss_set
  },
  {
    path: '/activity_2018/double_boss_data',
    name: 'activity_2018_double_boss_data',
    meta: {
      requireAuth: false,
      title: "活动数据"
    },
    component: double_boss_data
  },
  {
    path: '/activity_2018/double_index',
    name: 'activity_2018_double_index',
    meta: {
      requireAuth: true,
      title: "11.11，优惠享不停！"
    },
    component: double_index
  },
  {
    path: '/activity_2018/double_gifts',
    name: 'activity_2018_double_gifts',
    meta: {
      requireAuth: true,
      title: "11.11，优惠享不停！"
    },
    component: double_gifts
  },
  {
    path: '/activity_2018/double_guide_intro',
    name: 'activity_2018_double_guide_intro',
    meta: {
      requireAuth: false,
      title: "11.11，单？免了？"
    },
    component: double_guide_intro
  },
    {
    path: '/activity_2018/double_guide_poster',
    name: 'activity_2018_double_guide_poster',
    meta: {
      requireAuth: false,
      title: "11.11，单？免了？"
    },
    component: double_guide_poster
  },


]
