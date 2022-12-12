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
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-5 flex space-y-3 md:space-y-0 flex-col md:flex-row md:space-x-2 pb-10">
          <div className="flex w-full md:w-1/3">
            <div className="bg-white text-center flex-1">
              <div className="border rounded-lg overflow-hidden">
                <div className="py-3 px-6 border-b border-gray-300">Administrator</div>
                <div className="p-6">
                  <div className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7"
                      className="rounded-full w-32 mb-4 mx-auto"
                      alt=""
                    />
                    <h5 className="text-xl font-medium leading-tight mb-2">Admin</h5>
                    <p className="text-gray-500 font-medium">Administrator</p>
                  </div>
                </div>
                <div className="py-3 px-6 border-t border-gray-300 text-sm bg-gray-50">
                  Clemrose Bus Inc.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-full border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between py-3 px-5 border-b border-gray-300">
              <h2 className="font-medium">Employee's Track Records</h2>
            </div>
            <div className="flex flex-col -px-2 -mt-2">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-y-auto max-h-[50vh] scrollbar-w-2 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-gray-100">
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
    <header className="border-b-2 py-4 bg-primary text-white">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <Link href="/admin/dashboard">
          <a className="flex items-center space-x-2">
            <div className="flex rounded-full overflow-hidden w-8 h-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.jpg" className="w-full h-full" alt="Logo" />
            </div>
            <h1 className="text-lg font-bold">Welcome Administrator</h1>
          </a>
        </Link>
        <div className="flex items-center space-x-4">
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-indigo-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.jpg" className="w-8 h-8 rounded-full" alt="" />
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <a
                    href="#"
                    onClick={() => signOut.signOut()}
                    className="w-full hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700">
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
