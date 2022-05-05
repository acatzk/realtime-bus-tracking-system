import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RiLoginCircleLine } from 'react-icons/ri'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/react'
import { Menu, Transition } from '@headlessui/react'
import { userNavigation } from 'mock/object-list'
import { classNames } from 'utils/classNames'
import { BsCardChecklist } from 'react-icons/bs'
import { HiStatusOnline } from 'react-icons/hi'

const Header: React.FC = () => {
  const signOut = useSignOut()
  const { isAuthenticated } = useAuthenticationStatus()
  const user = useUserData()

  return (
    <header className="border-b-2 py-4 bg-[#1f1b58] text-white">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <div className="flex rounded-full border-2 border-white/90">
              <Image src="/assets/logo2.png" width={32} height={32} alt="Logo" />
            </div>
            <h1 className="hidden lg:block text-lg font-bold uppercase">Metro Bus Tracker</h1>
            <h1 className="block lg:hidden text-sm font-bold uppercase">Bus </h1>
            {isAuthenticated && (
              <span className="bg-green-500 rounded-full text-xs md:text-sm py-0.5 px-1 font-medium flex items-center space-x-1">
                <HiStatusOnline className="w-4 h-4" />
                <span>Active</span>
              </span>
            )}
          </a>
        </Link>
        <div>
          {!isAuthenticated && (
            <Link href="/login">
              <a className="flex items-center space-x-1 hover:text-gray-300 transition ease-in-out duration-150">
                <RiLoginCircleLine className="w-4 lg:w-5 h-4 lg:h-5" />
                <span className="text-sm md:text-base font-medium">Login</span>
              </a>
            </Link>
          )}
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <a className="flex items-center space-x-1 hover:text-gray-300 transition ease-in-out duration-150">
                  <BsCardChecklist className="w-4 lg:w-5 h-4 lg:h-5" />
                  <span className="text-sm md:text-base font-medium">Dashbaord</span>
                </a>
              </Link>
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-indigo-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            href={item.href}
                            onClick={() => item.name === 'Sign out' && signOut.signOut()}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}>
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function UserAvatar({ user }) {
  return user?.avatarUrl ? (
    <Image
      src={user?.avatarUrl}
      width={32}
      height={32}
      className="rounded-full"
      layout="intrinsic"
      alt="avatar"
    />
  ) : (
    <Image
      src="https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7"
      width={32}
      height={32}
      className="rounded-full"
      layout="intrinsic"
      alt="avatar"
    />
  )
}

export default Header
