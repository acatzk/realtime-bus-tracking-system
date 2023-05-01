import Link from 'next/link'
import Head from 'next/head'
import React, { FC, Fragment, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'

import { classNames } from '~/helpers/classNames'
import handleImageError from '~/helpers/handleImageError'
import { adminSubDashboardLink } from '~/mock/object-list'

type Props = {
  children: ReactNode
  metaTitle: string
}

const AdminLayout: FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const router = useRouter()
  const user = useUserData()

  const { isAuthenticated } = useAuthenticationStatus()

  // Check if user is authenticated
  React.useEffect(() => {
    if (!isAuthenticated || user?.defaultRole !== 'admin') {
      router.push('/')
    }
  }, [isAuthenticated])

  return (
    <>
      <Head>
        <title>{`Administrator ${metaTitle}`}</title>
      </Head>
      <Header />
      <DashboardSubLinks dashboardLink={adminSubDashboardLink} />
      {children}
    </>
  )
}

const Header = (): JSX.Element => {
  const user = useUserData()
  const signOut = useSignOut()

  return (
    <header className="border-b-2 bg-primary py-4 text-white">
      <div className="mx-auto flex items-center justify-between px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <Link href="/admin/dashboard">
          <a className="flex items-center space-x-2">
            <div className="flex h-8 w-8 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.jpg" className="h-full w-full" alt="Logo" />
            </div>
            <h1 className="text-lg font-bold">Welcome Administrator</h1>
          </a>
        </Link>
        <div className="flex items-center space-x-4">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="focus:outline-none flex max-w-xs items-center rounded-full bg-indigo-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-800">
                <span className="sr-only">Open user menu</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user?.avatarUrl}
                  className="h-8 w-8 rounded-full"
                  onError={(e) =>
                    handleImageError(
                      e,
                      'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
                    )
                  }
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  <a
                    href="#"
                    onClick={() => {
                      signOut.signOut()
                    }}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign Out
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}

function DashboardSubLinks({ dashboardLink }: any) {
  const router = useRouter()

  return (
    <nav className="border-b">
      <ul className="mx-auto flex  items-center space-x-4 px-4 md:max-w-2xl md:space-x-6 md:px-8 lg:max-w-7xl lg:px-16">
        {dashboardLink.map(
          ({ name, href, Icon }: { name: string; href: string; Icon: any }, i: number) => (
            <li key={i}>
              <Link href={`/admin/${href}`}>
                <a
                  className={classNames(
                    'py-3 font-medium md:pb-4',
                    'border-b-2 hover:text-gray-800',
                    'transition duration-150 ease-in-out',
                    'flex items-center space-x-1 text-sm md:text-base',
                    router.pathname === `/admin/${href}`
                      ? 'border-gray-500  text-gray-800'
                      : 'border-transparent text-gray-600'
                  )}>
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span>{name}</span>
                </a>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  )
}

export default AdminLayout
