/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const doctorRouter = {
  path: '/doctor',
  component: Layout,
  meta: {
    icon: 'user'
  },
  children: [
    {
      path: 'doctor',
      name: 'Doctor',
      component: () => import('@/views/doctor/index'),
      meta: { title: 'Doctor' }
    }
  ]
}

export default doctorRouter