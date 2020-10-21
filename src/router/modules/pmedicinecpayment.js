/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const pmCpyRouter = {
  path: '/pmcy',
  component: Layout,
  meta: {
    icon: 'user'
  },
  children: [
    {
      path: 'pmcy',
      name: 'pmcy',
      component: () => import('@/views/pmedicineCpayment/index'),
      meta: { title: 'pmedicineCpayment' }
    }
  ]
}

export default pmCpyRouter
