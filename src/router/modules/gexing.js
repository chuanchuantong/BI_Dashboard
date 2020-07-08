/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const petsRouter = {
  path: '/diagtrea',
  component: Layout,
  // redirect: '/pets',
  meta: {
    icon: 'nested'
  },
  children: [
    {
      path: 'diagtrea',
      name: 'diagtrea',
      component: () => import('@/views/diagtrea/index'),
      meta: { title: 'Diagtrea' }
    }
  ]
}

export default petsRouter
