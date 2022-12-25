import React from 'react'
import type { NextPage } from 'next'
import { Tab } from '@headlessui/react'

import { classNames } from '~/helpers/classNames'
import PageLayout from '~/components/templates/PageLayout'
import AdminLoginForm from '~/components/molecules/AdminLoginForm'
import CollectorLoginForm from '~/components/molecules/CollectorLoginForm'
import CollectorRegisterForm from '~/components/molecules/CollectorRegisterForm'

const Index: NextPage = (): JSX.Element => {
  return (
    <PageLayout>
      <div className="mx-auto flex h-[90vh] w-full max-w-2xl flex-col items-center justify-center px-2 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex w-full space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-500'
                )
              }>
              Employee's Login
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-500'
                )
              }>
              Employee's Registration
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
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
                'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2'
              )}>
              <CollectorLoginForm />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2'
              )}>
              <CollectorRegisterForm />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2'
              )}>
              <AdminLoginForm />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </PageLayout>
  )
}

export default Index
