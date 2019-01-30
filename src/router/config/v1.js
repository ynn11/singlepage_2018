//身边店v1相关单页面
const Help = r => require.ensure([], () => r(require('../../pages/Help')), 'Help')
const InviteFriend = r => require.ensure([], () => r(require('../../pages/InviteFriend')), 'InviteFriend')
const ReceiveInvite = r => require.ensure([], () => r(require('../../pages/ReceiveInvite')), 'ReceiveInvite')
const ConcernStore = r => require.ensure([], () => r(require('../../pages/ConcernStore')), 'ConcernStore')
const ConcernStoreByQR = r => require.ensure([], () => r(require('../../pages/ConcernStoreByQR')), 'ConcernStoreByQR')
const HomeBanner = r => require.ensure([], () => r(require('../../pages/HomeBanner')), 'HomeBanner')

export default [{
    path: '/help',
    name: 'help',
    component: Help
},{
    path: '/inviteFriend',
    name: 'InviteFriend',
    component: InviteFriend
},{
    path: '/receiveInvite',
    name: 'receiveInvite',
    component: ReceiveInvite
},{
    path: '/concernStore',
    name: 'concernStore',
    component: ConcernStore
},{
    path: '/concernStoreByQR',
    name: 'concernStoreByQR',
    component: ConcernStoreByQR
},{
    path: '/homeBanner',
    name: 'homeBanner',
    component: HomeBanner
}]