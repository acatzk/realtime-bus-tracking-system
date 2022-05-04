import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RiLoginCircleLine } from 'react-icons/ri'

const Header: React.FC = () => {
  return (
    <header className="border-b-2 py-4 bg-[#1f1b58] text-white">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <div className="flex rounded-full border-2 border-white/90">
              <Image
                src="/assets/logo2.png"
                width={32}
                height={32}
                alt="Logo"
              />
            </div>
            <h1 className="hidden lg:block text-lg font-bold uppercase">
              Metro Shuttle Bus Tracker
            </h1>
            <h1 className="block lg:hidden text-sm font-bold uppercase">
              Bus Tracker
            </h1>
          </a>
        </Link>
        <div>
          <Link href="/login">
            <a className="flex items-center space-x-1 hover:text-gray-200 transition ease-in-out duration-150">
              <RiLoginCircleLine className="w-4 lg:w-5 h-4 lg:h-5" />
              <span className="text-sm md:text-base font-medium">Login</span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
