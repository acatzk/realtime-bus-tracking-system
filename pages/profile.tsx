import React from 'react'
import DashboardLayout from 'layouts/DashboardLayout'
import { useUserData } from '@nhost/react'
import Image from 'next/image'
import { classNames } from 'utils'

const Profile = () => {
  const user = useUserData()

  return (
    <DashboardLayout metaHead="| Profile">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 pb-8 md:max-w-2xl lg:max-w-7xl">
        <div className="mt-5 mx-auto p-6 rounded-lg border bg-white max-w-md">
          <form>
            <div className="w-full">
              <div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative w-[128px] h-[128px] z-10">
                    <Image
                      src={`${user?.avatarUrl}`}
                      layout="fill"
                      className="rounded-full shadown-lg"
                      alt="avatar"
                    />
                  </div>
                  <button
                    type="button"
                    className={classNames(
                      'inline-block px-2 py-1.5 font-medium',
                      'text-xs leading-tight rounded',
                      'border hover:bg-gray-50',
                      'transition duration-150 ease-in-out'
                    )}>
                    Change Avatar
                  </button>
                </div>
                <div className="mt-5 form-floating mb-3 w-full">
                  <input
                    type="text"
                    className="form-control
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    defaultValue={`${user?.displayName}`}
                  />
                  <label className="text-gray-700">Fullname</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    defaultValue={`${user?.email}`}
                  />
                  <label className="text-gray-700">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    defaultValue={`${user?.phoneNumber === null && ''}`}
                  />
                  <label className="text-gray-700">Phone Number</label>
                </div>
                <button
                  type="submit"
                  className="
                    w-full
                    px-6
                    py-4
                    bg-blue-600
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Profile
