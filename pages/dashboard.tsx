import DashboardLayout from 'layouts/DashboardLayout'
import { NextPage } from 'next'
import React from 'react'

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout metaHead="| Dashboard">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-5 flex space-x-2">
          <div className="flex bg-gray-100 w-1/3 border rounded-lg">
            <div className="bg-white max-w-full sm:max-w-sm text-center">
              <div className="py-3 px-6 border-b border-gray-300">Employee</div>
              <div className="p-6">
                <div className="text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                    className="rounded-full w-32 mb-4 mx-auto"
                    alt="Avatar"
                  />
                  <h5 className="text-xl font-medium leading-tight mb-2">John Doe</h5>
                  <p className="text-gray-500">Web designer</p>
                </div>
              </div>
              <div className="py-3 px-6 border-t border-gray-300 text-gray-600">2 days ago</div>
            </div>
          </div>
          <div className="bg-gray-200 w-full"></div>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Dashboard
