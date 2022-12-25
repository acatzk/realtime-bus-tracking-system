import React from 'react'

import PageLayout from './../PageLayout'
import { authProtected } from '~/utils/auth-protected'

type props = {
  children: React.ReactNode
  metaHead?: string
  driverData?: any
  onSubmitForm?: any
}

const DashboardLayout: React.FC<props> = (props): JSX.Element => {
  const { children, metaHead } = props

  return (
    <PageLayout metaHead={metaHead}>
      <div>{children}</div>
    </PageLayout>
  )
}

export default authProtected(DashboardLayout)
