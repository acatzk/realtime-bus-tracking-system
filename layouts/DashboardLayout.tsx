import React from 'react'
import { authProtected } from 'utils/auth-protected'
import PageLayout from './PageLayout'

type props = {
  children: React.ReactNode
  metaHead?: string
}

const DashboardLayout: React.FC<props> = (props) => {
  const { children, metaHead } = props

  return <PageLayout metaHead={metaHead}>{children}</PageLayout>
}

export default authProtected(DashboardLayout)
