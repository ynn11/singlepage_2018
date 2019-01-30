//老板端

//导购端

//会员端
const Redirect= r => require.ensure([], () => r(require('../../../pages/activity/applet/inviteFriend/Redirect')), 'InviteFriend_applet')
const NewUser= r => require.ensure([], () => r(require('../../../pages/activity/applet/inviteFriend/NewUser')), 'InviteFriend_applet')

export default [{
    path: '/activity_2018/inviteFriend/redirect',
    name: 'activity_2018_inviteFriend_redirect',
    meta: {
        requireAuth: true,
        title: ""
    },
    component: Redirect
},{
    path: '/activity_2018/inviteFriend/newUser',
    name: 'activity_2018_inviteFriend_newUser',
    meta: {
        requireAuth: true,
        title: "新会员"
    },
    component: NewUser
}]