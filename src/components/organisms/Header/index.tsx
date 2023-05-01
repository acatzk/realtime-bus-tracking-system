import Link from 'next/link'
import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { RiLoginCircleLine } from 'react-icons/ri'
import { Menu, Transition } from '@headlessui/react'
import { HiOutlineStatusOffline, HiStatusOnline } from 'react-icons/hi'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'

import { UserAvatar } from './UserAvatar'
import { classNames } from '~/helpers/classNames'
import { dashboardLink } from '~/mock/object-list'
import { DashboardSubLinks } from './DashboardSubLinks'

type props = {
  isActive?: boolean
  driverData?: any
  actions?: any
}

const Header: React.FC<props> = (props): JSX.Element => {
  const signOut = useSignOut()
  const router = useRouter()
  const user = useUserData()
  const { isAuthenticated } = useAuthenticationStatus()
  const { driverData, actions } = props
  const { handleStatus } = actions

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()

  const isActiveDriverStatus = driverData?.data?.trackers[0]?.isActive
  const isDriverCount = driverData?.data?.trackers_aggregate?.aggregate?.count
  const isNotAuthenticatedUser =
    router.pathname !== '/' && router.pathname !== '/login' && router.pathname !== '/register'

  return (
    <React.Fragment>
      <header className="border-b-2 bg-primary py-4 text-white">
        <div className="mx-auto flex items-center justify-between px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
          <Link href={isAuthenticated ? '/dashboard' : '/'}>
            <a className="flex items-center space-x-2">
              <div className="flex h-8 w-8 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.jpg" className="h-full w-full" alt="Logo" />
              </div>
              <h1 className="text-lg font-bold">ClemRose</h1>
              {isAuthenticated && (
                <span
                  className={classNames(
                    'rounded-full text-xs md:text-sm',
                    'flex items-center space-x-1 py-0.5 px-1 font-medium',
                    isActiveDriverStatus ? 'bg-green-500' : 'bg-gray-500'
                  )}>
                  {isSubmitting ? (
                    <span>Loading</span>
                  ) : (
                    <>
                      {isActiveDriverStatus ? (
                        <HiStatusOnline className="h-4 w-4" />
                      ) : (
                        <HiOutlineStatusOffline className="h-4 w-4" />
                      )}
                      <span>{isActiveDriverStatus ? 'Active' : 'Inactive'}</span>
                    </>
                  )}
                </span>
              )}
            </a>
          </Link>
          <div>
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="focus:outline-none flex max-w-xs items-center rounded-full bg-indigo-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-800">
                      <span className="sr-only">Open user menu</span>
                      <UserAvatar user={user} />
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
                        <Link href="/profile">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profile
                          </a>
                        </Link>
                      </Menu.Item>
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
            )}
            {!isAuthenticated && (
              <Link href="/login">
                <a className="flex items-center space-x-1 transition duration-150 ease-in-out hover:text-gray-300">
                  <RiLoginCircleLine className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="text-sm font-medium md:text-base">Login</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </header>
      {isNotAuthenticatedUser && (
        <section className="bg-white shadow">
          <div className="mx-auto flex flex-wrap items-center justify-between px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
            <DashboardSubLinks dashboardLink={dashboardLink} />
            {isDriverCount === 1 && (
              <form onSubmit={handleSubmit(handleStatus)}>
                <button
                  type="submit"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className={classNames(
                    'flex flex-wrap items-center space-x-1 rounded py-0.5 px-2 font-medium text-white',
                    'text-sm transition duration-150 ease-in-out hover:shadow-lg md:text-base',
                    'focus:outline-none focus:shadow-lg  focus:ring-0 active:shadow-lg',
                    isActiveDriverStatus
                      ? 'bg-green-500 hover:bg-green-600 hover:shadow-lg focus:bg-green-600 active:bg-green-700'
                      : 'animate-bounce bg-gray-500 hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600 active:bg-gray-700'
                  )}
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  title="Status if you are driving...">
                  {isSubmitting ? (
                    <span>Loading</span>
                  ) : (
                    <>
                      {isActiveDriverStatus ? (
                        <HiStatusOnline className="h-4 w-4 lg:h-5 lg:w-5" />
                      ) : (
                        <HiOutlineStatusOffline className="h-4 w-4 lg:h-5 lg:w-5" />
                      )}
                      <span>{isActiveDriverStatus ? 'Active' : 'Inactive'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      )}
    </React.Fragment>
  )
}

export default Header
