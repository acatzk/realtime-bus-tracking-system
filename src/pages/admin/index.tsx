import React from 'react'
import Link from 'next/link'

const AdminLogin = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="flex items-center justify-center flex-col h-[91vh] flex-1 space-y-6">
          <span className="font-semibold text-gray-600">
            Welcome to ClemRose Bus Tracking System
          </span>
          <h1 className="text-5xl font-extrabold">Login to Administrator</h1>
          <div className="relative border-b border-gray-300 w-full max-w-lg flex items-center justify-center">
            <span className="absolute -top-3 bg-white px-1 text-gray-600 text-sm font-light">
              with
            </span>
          </div>
          <form className="flex flex-col space-y-8 w-full max-w-lg">
            <div>
              <input
                type="text"
                placeholder="email"
                className="border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                className="border border-gray-300 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1f1b58] text-white py-2 rounded hover:bg-[#1f1b58]">
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

const Header = () => {
  return (
    <header className="border-b-2 py-4 bg-primary text-white">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <Link href="/admin">
          <a className="flex items-center space-x-2">
            <div className="flex rounded-full overflow-hidden w-8 h-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.jpg" className="w-full h-full" alt="Logo" />
            </div>
            <h1 className="text-lg font-bold">ClemRose</h1>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default AdminLogin
