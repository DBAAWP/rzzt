import layout from '@/layout'

export default {
  path: '/salarys',
  //   name: 'salarys',
  component: layout,
  children: [{
    // 二级路由不写的时候,表示二级路由的默认路由
    path: '',
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资', // 这里用title,是因为左侧导航栏在遍历路由的原信息title
      icon: 'money'
    }
  }]
}
