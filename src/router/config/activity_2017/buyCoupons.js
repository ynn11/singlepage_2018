//购券活动
const BuyCoupons_share = r => require.ensure([], () => r(require('../../../pages/activity/guide/BuyCoupons_share')), 'BuyCompons_guide')
const Coupons_introduce = r => require.ensure([], () => r(require('../../../pages/activity/applet/buyCoupons/Coupons_introduce')), 'BuyCompons')
const Coupons_buy = r => require.ensure([], () => r(require('../../../pages/activity/applet/buyCoupons/Coupons_buy')), 'BuyCompons')
const Coupons_success = r => require.ensure([], () => r(require('../../../pages/activity/applet/buyCoupons/Coupons_success')), 'BuyCompons')
const Coupons_rebate = r => require.ensure([], () => r(require('../../../pages/activity/applet/buyCoupons/Coupons_rebate')), 'BuyCompons')

export default [{
    path: '/activity/buycoupons_share',
    name: 'buycoupons_share',
    component: BuyCoupons_share
},
{
    path: '/activity/coupons_introduce',
    name: 'coupons_introduce',
    meta: {
        requireAuth: true,
        title: "超值礼包免费送，立即领取！"
    },
    component: Coupons_introduce
},
{
    path: '/activity/coupons_buy',
    name: 'coupons_buy',
    meta: {
        requireAuth: true,
        title: "超值礼包免费送，立即领取！"
    },
    component: Coupons_buy
},
{
    path: '/activity/coupons_success',
    name: 'coupons_success',
    meta: {
        requireAuth: true,
        title: "超值礼包免费送，立即领取！"
    },
    component: Coupons_success
},
{
    path: '/activity/coupons_rebate',
    name: 'coupons_rebate',
    meta: {
        requireAuth: true,
        title: "超值礼包免费送，立即领取！"
    },
    component: Coupons_rebate
}]