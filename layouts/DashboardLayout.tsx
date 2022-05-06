import React from 'react'
import { useRouter } from 'next/router'
import { authProtected } from 'utils/auth-protected'
import PageLayout from './PageLayout'
import { dashboardLink } from 'mock/object-list'
import { classNames } from 'utils/classNames'
import Link from 'next/link'
import { HiStatusOnline, HiOutlineStatusOffline } from 'react-icons/hi'
import { GetServerSidePropsContext } from 'next'
import { getNhostSession } from '@nhost/nextjs'
import { UPDATE_BUS_DRIVER_STATUS_MUTATION } from 'graphql/mutations'
import { GET_TRACK_IF_EXIST_AND_STATUS } from 'graphql/queries'
import useSWR from 'swr'
import { nhost } from 'lib/nhost-client'
import { useUserData } from '@nhost/react'
import Moment from 'moment'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Header from 'components/Header'

type props = {
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

const DashboardLayout: React.FC<props> = (props) => {
  const { children, metaHead } = props
  const user = useUserData()

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

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
    <PageLayout metaHead={metaHead}>
      <Header isActive={!driverData?.data?.trackers[0]?.isActive} isSubmitting={isSubmitting} />
      <header className="bg-white shadow">
        <div className="flex items-center justify-between  px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
          <DashboardSubLinks dashboardLink={dashboardLink} />
          {driverData?.data?.trackers_aggregate?.aggregate?.count === 1 && (
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <button
                type="submit"
                className={classNames(
                  'text-white bg-gray-500 py-0.5 rounded-md px-2 font-medium flex items-center space-x-1',
                  'transition ease-in-out duration-150 hover:shadow-lg text-sm md:text-base',
                  driverData?.data?.trackers[0]?.isActive
                    ? 'bg-green-500 active:bg-green-600'
                    : 'bg-gray-500 active:bg-gray-600'
                )}>
                {isSubmitting ? (
                  <span>Loading</span>
                ) : (
                  <>
                    {driverData?.data?.trackers[0]?.isActive ? (
                      <HiStatusOnline className="w-4 lg:w-5 h-4 lg:h-5" />
                    ) : (
                      <HiOutlineStatusOffline className="w-4 lg:w-5 h-4 lg:h-5" />
                    )}
                    <span>{driverData?.data?.trackers[0]?.isActive ? 'Active' : 'Inactive'}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </header>
      <div>{children}</div>
    </PageLayout>
  )
}

function DashboardSubLinks({ dashboardLink }) {
  const router = useRouter()
  return (
    <nav>
      <ul className="flex items-center space-x-4 md:space-x-6">
        {dashboardLink.map(({ name, href, Icon }, i) => (
          <li key={i}>
            <Link href={`/${href}`}>
              <a
                className={classNames(
                  'font-medium py-3 md:pb-4',
                  'hover:text-gray-800 border-b-2',
                  'transition ease-in-out duration-150',
                  'text-sm md:text-base flex items-center space-x-1',
                  router.pathname === `/${href}`
                    ? 'text-gray-800  border-gray-500'
                    : 'text-gray-600 border-transparent'
                )}>
                <Icon className="w-4 lg:w-5 h-4 lg:h-5" />
                <span>{name}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default authProtected(DashboardLayout)
