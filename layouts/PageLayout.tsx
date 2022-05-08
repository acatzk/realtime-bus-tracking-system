import React, { useEffect } from 'react'
import Head from 'next/head'
import Footer from 'components/Footer'
import Header from 'components/Header'
import useSWR from 'swr'
import { GET_TRACK_IF_EXIST_AND_STATUS } from 'graphql/queries'
import { nhost } from 'lib/nhost-client'
import { useAuthenticationStatus, useUserData } from '@nhost/react'
import Moment from 'moment'
import { UPDATE_BUS_DRIVER_STATUS_MUTATION } from 'graphql/mutations'
import { toast } from 'react-toastify'
import { GetServerSidePropsContext } from 'next'
import { getNhostSession } from '@nhost/nextjs'

export type props = {
  children: React.ReactNode
  metaHead?: string
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const nhostSession = await getNhostSession(`${process.env.NEXT_PUBLIC_NHOST_BACKEND}`, context)

  return {
    props: {
      nhostSession
    }
  }
}

const PageLayout: React.FC<props> = (props) => {
  const { children, metaHead } = props
  const user = useUserData()
  const { isAuthenticated } = useAuthenticationStatus()

  // Check the current Status and check if exist
  const { data: driverData } = useSWR(
    GET_TRACK_IF_EXIST_AND_STATUS,
    async (query) =>
      await nhost.graphql.request(query, {
        user_id: user?.id,
        created_at: Moment().format('YYYY-MM-DD')
      }),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  const isActiveDriverStatus = driverData?.data?.trackers[0]?.isActive

  // useEffect(() => {
  //   isAuthenticated && isActiveDriverStatus
  //     ? console.log('Update data')
  //     : console.log('Remain Stable Data')
  // })

  const onSubmitForm = async () => {
    const { data: driverData } = await nhost.graphql.request(GET_TRACK_IF_EXIST_AND_STATUS, {
      user_id: user?.id,
      created_at: Moment().format('YYYY-MM-DD')
    })

    let isDriverActive = driverData?.trackers[0]?.isActive

    await nhost.graphql.request(UPDATE_BUS_DRIVER_STATUS_MUTATION, {
      user_id: user?.id,
      isActive: !isDriverActive,
      date: Moment().format('YYYY-MM-DD')
    })

    if (!isDriverActive) {
      toast.success(`Status: ACTIVE`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } else {
      toast(`Status: INACTIVE`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Clementina {metaHead}</title>
      </Head>
      <Header driverData={driverData} onSubmitForm={onSubmitForm} />
      <div className="antialiased">{children}</div>
      <Footer />
    </React.Fragment>
  )
}

export default PageLayout
