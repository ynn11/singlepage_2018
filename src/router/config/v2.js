/**
 * 身边店v2相关单页面
 */
//商品编辑
const EditGoods = r => require.ensure([], () => r(require('../../pages/v2/EditGoods')), 'EditGoods')
//快递信息
const Express = r => require.ensure([], () => r(require('../../pages/v2/Express')), 'Express')
//推荐文章
const EsotericaInfo = r => require.ensure([], () => r(require('../../pages/v2/EsotericaInfo')), 'EsotericaInfo')
//身边店推荐
const SBRecommend = r => require.ensure([], () => r(require('../../pages/v2/SBRecommend')), 'SBRecommend')
//老板端日报月报
const Report_redirect = r => require.ensure([], () => r(require('../../pages/v2/boss/Report_redirect')), 'Report')
const Daily = r => require.ensure([], () => r(require('../../pages/v2/boss/Daily')), 'Report')
const Monthly_income = r => require.ensure([], () => r(require('../../pages/v2/boss/Monthly_income')), 'Report')
const Monthly_member = r => require.ensure([], () => r(require('../../pages/v2/boss/Monthly_member')), 'Report')
//活动模板
const Sell_template = r => require.ensure([], () => r(require('../../pages/v2/boss/Sell_template')), 'Sell_template')
const Sell_template_store = r => require.ensure([], () => r(require('../../pages/v2/boss/Sell_template_store')), 'Sell_template')
const Sell_template_act = r => require.ensure([], () => r(require('../../pages/v2/boss/Sell_template_act')), 'Sell_template')
const Sell_template_act_detail = r => require.ensure([], () => r(require('../../pages/v2/boss/Sell_template_act_detail')), 'Sell_template')
const Sell_template_application_detail = r => require.ensure([], () => r(require('../../pages/v2/boss/Sell_template_application_detail')), 'Sell_template_application_detail')


export default [{
    path: '/v2/editGoods',
    name: 'v2_editGoods',
    component: EditGoods
},{
    path: '/v2/express',
    name: 'v2_express',
    component: Express
},{
    path: '/v2/esotericaInfo',
    name: 'v2_esotericaInfo',
    component: EsotericaInfo
},{
    path: '/v2/SBRecommend',
    name: 'v2_SBRecommend',
    component: SBRecommend
},{
    path: '/boss/report_redirect',
    name: 'Report_redirect',
    meta: {
        requireAuth: false,
        title: "日报月报跳转"
    },
    component: Report_redirect
},{
    path: '/boss/daily',
    name: 'boss_daily',
    meta: {
        requireAuth: false,
        title: "日报"
    },
    component: Daily
},{
    path: '/boss/monthly_income',
    name: 'boss_monthly_income',
    meta: {
        requireAuth: false,
        title: "收入月报"
    },
    component: Monthly_income
},{
    path: '/boss/monthly_member',
    name: 'boss_monthly_member',
    meta: {
        requireAuth: false,
        title: "会员月报"
    },
    component: Monthly_member
},{
    path: '/boss/sell_template',
    name: 'boss_sell_template',
    meta: {
        requireAuth: false,
        title: "模板选择"
    },
    component: Sell_template,
    
},{
    path: '/boss/sell_template_store',
    name: 'boss_sell_template_store',
    meta: {
        requireAuth: false,
        title: "门店选择"
    },
    component: Sell_template_store,
},{
    path: '/boss/sell_template_act',
    name: 'boss_sell_template_act',
    meta: {
        requireAuth: false,
        title: "活动选择"
    },
    component: Sell_template_act,
},{
    path: '/boss/sell_template_act_detail',
    name: 'boss_sell_template_act_detail',
    meta: {
        requireAuth: false,
        title: "活动详情"
    },
    component: Sell_template_act_detail,
},{
    path: '/boss/sell_template_application_detail',
    name: 'boss_sell_template_application_detail',
    meta: {
        requireAuth: false,
        title: "活动申请"
    },
    component: Sell_template_application_detail,
}]