/**
 * 暖冬型动 “羽”你相伴
 */
//老板端
const warmwinter_boss_index = r => require.ensure([], () => r(require('../../../pages/activity/boss/warmWinter/Index')), 'warmWinter');

//C端
const warmwinter_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/warmWinter/Index')), 'warmWinter');

//导购端
const warmwinter_guide_index = r => require.ensure([], () => r(require('../../../pages/activity/guide/warmWinter/Index')), 'warmWinter');
const warmwinter_guide_poster = r => require.ensure([], () => r(require('../../../pages/activity/guide/warmWinter/Poster')), 'warmWinter');


export default [
  /*
   * 老板端
   * */
  {
    path: '/activity_2018/warmwinter_boss_index',
    name: 'activity_2018_warmwinter_boss_index',
    meta: {
      requireAuth: false,
      title: "暖冬型动 “羽”你相伴"
    },
    component: warmwinter_boss_index
  },
  /*
  * C端
  * */
  {
    path: '/activity_2018/warmwinter_index',
    name: 'activity_2018_warmwinter_index',
    meta: {
      requireAuth: true,
      title: "暖冬型动 “羽”你相伴"
    },
    component: warmwinter_index
  },
  /*
   * 导购端
   * */
  {
    path: '/activity_2018/warmwinter_guide_index',
    name: 'activity_2018_warmwinter_guide_index',
    meta: {
      requireAuth: false,
      title: "暖冬型动 “羽”你相伴"
    },
    component: warmwinter_guide_index
  },
  {
    path: '/activity_2018/warmwinter_guide_poster',
    name: 'activity_2018_warmwinter_guide_poster',
    meta: {
      requireAuth: false,
      title: "暖冬型动 “羽”你相伴"
    },
    component: warmwinter_guide_poster
  },


]
