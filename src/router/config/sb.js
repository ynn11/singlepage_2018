//神笔
const EditGoods_n = r => require.ensure([], () => r(require('../../pages/v2/EditGoods_n')), 'EditGoods_n')
const SelectTemplate = r => require.ensure([], () => r(require('../../pages/v2/sbTemplate/SelectTemplate')), 'SBTemplate')
const Template1 = r => require.ensure([], () => r(require('../../pages/v2/sbTemplate/templates/Template1.vue')), 'SBTemplate')
const Template0 = r => require.ensure([], () => r(require('../../pages/v2/sbTemplate/templates/Template0.vue')), 'SBTemplate')

export default [{
    path: '/v2/editGoods_n',
    name: 'v2_editGoods_n',
    component: EditGoods_n
},
{
    path: '/selectTemplate',
    name: 'v2_selectTemplate',
    component: SelectTemplate
},
{
    path: '/sbTemplate/tp_003',
    name: 'v2_tp_003',
    component: Template0
},
{
    path: '/sbTemplate/tp_001',
    name: 'v2_tp_001',
    component: Template1
}]