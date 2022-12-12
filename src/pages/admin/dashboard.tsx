import Link from 'next/link'
import Head from 'next/head'
import { NextPage } from 'next'
import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'

import AdminDashboardList from '~/components/AdminDashboardList'

const Dashboard: NextPage = (): JSX.Element => {
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
        <title>Administrator Dashboard</title>
      </Head>
      <Header />
      <main className="mx-auto min-h-[81vh] px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <div className="mt-5 flex flex-col space-y-3 pb-10 md:flex-row md:space-y-0 md:space-x-2">
          <div className="flex w-full md:w-1/3">
            <div className="flex-1 bg-white text-center">
              <div className="overflow-hidden rounded-lg border">
                <div className="border-b border-gray-300 py-3 px-6">Administrator</div>
                <div className="p-6">
                  <div className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7"
                      className="mx-auto mb-4 w-32 rounded-full"
                      alt=""
                    />
                    <h5 className="mb-2 text-xl font-medium leading-tight">Admin</h5>
                    <p className="font-medium text-gray-500">Administrator</p>
                  </div>
                </div>
                <div className="border-t border-gray-300 bg-gray-50 py-3 px-6 text-sm">
                  Clemrose Bus Inc.
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-lg border bg-white">
            <div className="flex items-center justify-between border-b border-gray-300 py-3 px-5">
              <h2 className="font-medium">Employee's Track Records</h2>
            </div>
            <div className="-px-2 -mt-2 flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="max-h-[50vh] overflow-y-auto scrollbar-w-2 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <AdminDashboardList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

const Header = (): JSX.Element => {
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
                <img src="/images/logo.jpg" className="h-8 w-8 rounded-full" alt="" />
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
                    onClick={() => signOut.signOut()}
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

export default Dashboard
