const Index = r => require.ensure([], () => r(require('../../pages/Index')), 'Index')

export default [{
    path: '/',
    name: 'index',
    component: Index
},{
    path: '/index',
    name: 'index',
    component: Index
}]