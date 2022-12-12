import React from 'react'
import type { NextPage } from 'next'
import { Tab } from '@headlessui/react'

import PageLayout from '~/layouts/PageLayout'
import AdminLogin from '~/components/AdminLogin'
import { classNames } from '~/helpers/classNames'
import EmployeeLogin from '~/components/EmployeeLogin'
import EmployeeRegister from '~/components/EmployeeRegister'

const Index: NextPage = (): JSX.Element => {
  return (
    <PageLayout>
      <div className="w-full max-w-2xl flex justify-center flex-col items-center px-2 sm:px-0 mx-auto h-[90vh]">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 w-full">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-500'
                )
              }>
              Employee's Login
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-500'
                )
              }>
              Employee's Registration
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-500'
                )
              }>
              Admin Login
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 w-full">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}>
              <EmployeeLogin />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}>
              <EmployeeRegister />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}>
              <AdminLogin />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </PageLayout>
  )
}

export default Index
