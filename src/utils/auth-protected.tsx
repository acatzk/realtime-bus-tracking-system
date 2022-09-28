import React from 'react'
import { useRouter } from 'next/router'
import { useAuthenticationStatus } from '@nhost/nextjs'

import { Spinner } from './Icons'

export const authProtected = (Comp: any) => {
  return function AuthProtected(props: any) {
    const router = useRouter()
    const { isLoading, isAuthenticated } = useAuthenticationStatus()

    if (isLoading)
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Spinner className="w-14 h-14" />
          <p className="text-xs mt-1">Loading...</p>
        </div>
      )

    if (!isAuthenticated) {
      router.push('/')
      return null
    }

    return <Comp {...props} />
  }
}
