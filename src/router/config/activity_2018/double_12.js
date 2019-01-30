/**
 *双十二活动
 */

//老板端
const double_12_boss_index = r => require.ensure([], () => r(require('../../../pages/activity/boss/double_12/Index')), 'double_12');
const double_12_boss_setstore = r => require.ensure([], () => r(require('../../../pages/activity/boss/double_12/SetStore')), 'double_12');
const double_12_boss_set = r => require.ensure([], () => r(require('../../../pages/activity/boss/double_12/Set')), 'double_12');
const double_12_boss_data = r => require.ensure([], () => r(require('../../../pages/activity/boss/double_12/Data')), 'double_12');
//导购端
const double_12_guide_index = r => require.ensure([], () => r(require('../../../pages/activity/guide/double_12/Index')), 'double_12');
const double_12_guide_poster = r => require.ensure([], () => r(require('../../../pages/activity/guide/double_12/Poster')), 'double_12');
const double_12_guide_gifts = r => require.ensure([], () => r(require('../../../pages/activity/guide/double_12/Gifts')), 'double_12');
const double_12_guide_elecEquip = r => require.ensure([], () => r(require('../../../pages/activity/guide/double_12/ElecEquip')), 'double_12');
const double_12_guide_elecEquipVerif = r => require.ensure([], () => r(require('../../../pages/activity/guide/double_12/ElecEquipVerif')), 'double_12');
//C端
const double_12_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/double_12/Index')), 'double_12');
const double_12_gift = r => require.ensure([], () => r(require('../../../pages/activity/applet/double_12/Gift')), 'double_12');

export default [
  {
    path: '/activity_2018/double_12_index',
    name: 'activity_2018_double_12_index',
    meta: {
      requireAuth: true,
      title: "过年季白送你"
    },
    component: double_12_index
  },
    {
    path: '/activity_2018/double_12_gift',
    name: 'activity_2018_double_12_gift',
    meta: {
      requireAuth: true,
      title: "过年季白送你"
    },
    component: double_12_gift
  },


  {
    path: '/activity_2018/double_12_boss_index',
    name: 'activity_2018_double_12_boss_index',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_boss_index
  },
    {
    path: '/activity_2018/double_12_boss_setstore',
    name: 'activity_2018_double_12_boss_setstore',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_boss_setstore
  },
      {
    path: '/activity_2018/double_12_boss_set',
    name: 'activity_2018_double_12_boss_set',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_boss_set
  },

    {
    path: '/activity_2018/double_12_boss_data',
    name: 'activity_2018_double_12_boss_data',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_boss_data
  },

  {
    path: '/activity_2018/double_12_guide_index',
    name: 'activity_2018_double_12_guide_index',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_guide_index
  },
  {
    path: '/activity_2018/double_12_guide_poster',
    name: 'activity_2018_double_12_guide_poster',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_guide_poster
  },
  {
    path: '/activity_2018/double_12_guide_gifts',
    name: 'activity_2018_double_12_guide_gifts',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_guide_gifts
  },
    {
    path: '/activity_2018/double_12_guide_elecEquip',
    name: 'activity_2018_double_12_guide_elecEquip',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_guide_elecEquip
  },
    {
    path: '/activity_2018/double_12_guide_elecEquipVerif',
    name: 'activity_2018_double_12_guide_elecEquipVerif',
    meta: {
      requireAuth: false,
      title: "年末送礼冲业绩"
    },
    component: double_12_guide_elecEquipVerif
  },


]
