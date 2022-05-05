import { useRouter } from 'next/router'
import React from 'react'
import { authProtected } from 'utils/auth-protected'
import PageLayout from './PageLayout'
import { dashboardLink } from 'mock/object-list'
import { classNames } from 'utils/classNames'
import Link from 'next/link'
import { HiStatusOnline } from 'react-icons/hi'
import { GetServerSidePropsContext } from 'next'
import { getNhostSession } from '@nhost/nextjs'

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

  return (
    <PageLayout metaHead={metaHead}>
      <header className="bg-white shadow">
        <div className="flex items-center justify-between  px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
          <DashboardSubLinks dashboardLink={dashboardLink} />
          <button
            type="button"
            className={classNames(
              'text-white bg-gray-500 py-1 rounded-md px-2 font-medium flex items-center space-x-1',
              'transition ease-in-out duration-150 hover:shadow-lg active:bg-green-600'
            )}>
            <HiStatusOnline className="w-4 lg:w-5 h-4 lg:h-5" />
            <span>Inactive</span>
          </button>
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
