/**
 * 8:30活动
 */
//导购端
const eightHalf_index = r => require.ensure([], () => r(require('../../../pages/activity/applet/eightHalf/Index')), 'eightHalf');
const eightHalf_account = r => require.ensure([], () => r(require('../../../pages/activity/applet/eightHalf/Account')), 'eightHalf');
const eightHalf_address = r => require.ensure([], () => r(require('../../../pages/activity/applet/eightHalf/Address')), 'eightHalf');
const eightHalf_paySuccess = r => require.ensure([], () => r(require('../../../pages/activity/applet/eightHalf/PaySuccess')),'eightHalf');
const eightHalf_detail = r => require.ensure([], () => r(require('../../../pages/activity/applet/eightHalf/Detail')),'eightHalf');
//导购端
const eightHalf_guide_help = r => require.ensure([], () => r(require('../../../pages/activity/guide/eightHalf/Help')), 'eightHalf');
const demo = r => require.ensure([], () => r(require('../../../pages/activity/applet/eightHalf/demo')), 'eightHalf');

//活动
const eightHalf_activity_firstFullReturn = r => require.ensure([], () => r(require('../../../pages/activity/guide/eightHalf/activity/firstFullReturn/Index')), 'eightHalf');
const eightHalf_activity_warmBaby = r => require.ensure([], () => r(require('../../../pages/activity/guide/eightHalf/activity/warmBaby/Index')), 'eightHalf');
const eightHalf_activity_bonus = r => require.ensure([], () => r(require('../../../pages/activity/guide/eightHalf/activity/bonus/Index')), 'eightHalf');
const eightHalf_activity_full10Award = r => require.ensure([], () => r(require('../../../pages/activity/guide/eightHalf/activity/full10Award/Index')), 'eightHalf');


export default [{
  path: '/activity_2018/eightHalf_index',
  name: 'activity_2018_eightHalf_index',
  meta: {
    requireAuth: true,
    title: "商品详情"
  },
  component: eightHalf_index
},
{
  path: '/activity_2018/eightHalf_account',
  name: 'activity_2018_eightHalf_account',
  meta: {
    requireAuth: true,
    title: "结算"
  },
  component: eightHalf_account
},
{
  path: '/activity_2018/eightHalf_address',
  name: 'activity_2018_eightHalf_address',
  meta: {
    requireAuth: true,
    title: "结算"
  },
  component: eightHalf_address
},{
  path: '/activity_2018/eightHalf_paySuccess',
  name: 'activity_2018_eightHalf_paySuccess',
  meta: {
    requireAuth: true,
    title: "支付成功"
  },
  component: eightHalf_paySuccess
},
{
  path: '/activity_2018/eightHalf_guide_help',
  name: 'activity_2018_eightHalf_guide_help',
  meta: {
    requireAuth: false,
    title: "帮助中心"
  },
  component: eightHalf_guide_help
},
{
  path: '/activity_2018/demo',
  name: 'activity_2018_demo',
  meta: {
    requireAuth: false,
    title: "demo"
  },
  component: demo,
},
{
  path: '/activity_2018/eightHalf_detail',
  name: 'activity_2018_eightHalf_detail',
  meta: {
    requireAuth: false,
    title: "商品详情"
  },
  component: eightHalf_detail
},
/*
* 活动
* */
  {
    path: '/activity_2018/eightHalf_activity_firstFullReturn',
    name: 'activity_2018_eightHalf_activity_firstFullReturn',
    meta: {
      requireAuth: false,
      title: "首单全返，李总真6......"
    },
    component: eightHalf_activity_firstFullReturn
  },
    {
    path: '/activity_2018/eightHalf_activity_warmBaby',
    name: 'activity_2018_eightHalf_activity_warmBaby',
    meta: {
      requireAuth: false,
      title: "动动手指就能获得充电暖宝宝"
    },
    component: eightHalf_activity_warmBaby
  },
    {
    path: '/activity_2018/eightHalf_activity_bonus',
    name: 'activity_2018_eightHalf_activity_bonus',
    meta: {
      requireAuth: false,
      title: "分红"
    },
    component: eightHalf_activity_bonus
  },
    {
    path: '/activity_2018/eightHalf_activity_full10Award',
    name: 'activity_2018_eightHalf_activity_full10Award',
    meta: {
      requireAuth: false,
      title: "满10得60，鼓励金拿不停"
    },
    component: eightHalf_activity_full10Award
  },

]
