import React from 'react'
import PageLayout from 'layouts/pageLayout'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { classNames } from 'utils/classNames'

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm()

  const onSubmitForm = async (data) => {
    const { email, password } = data
    alert({ email, password })
  }

  return (
    <PageLayout metaHead="| Login">
      <main className="min-h-[91vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto flex justify-center place-items-center">
        <div className="relative max-w-sm w-full">
          <div className="card bg-[#1f1b58]/80 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-[#d73f49]/80 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-base text-gray-700 text-center font-semibold">
              Employee&apos;s Login Page
            </label>
            <form className="py-10" onSubmit={handleSubmit(onSubmitForm)}>
              <div className="mt-4">
                <input
                  type="email"
                  disabled={isSubmitting}
                  placeholder="Enter Email"
                  className={classNames(
                    'mt-1 block w-full border-none h-14 rounded-xl shadow-lg',
                    'focus:ring-0 transition ease-in-out duration-150',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    errors?.email
                      ? 'bg-red-100'
                      : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                  )}
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                <div className="space-y-0.5 ml-1.5">
                  {errors.email?.type === 'required' && (
                    <span className="text-xs text-red-500 font-medium">
                      Email is required
                    </span>
                  )}
                  {errors.email?.message && (
                    <span className="text-xs text-red-500 font-medium">
                      {errors.email?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <input
                  type="password"
                  disabled={isSubmitting}
                  placeholder="Enter Password"
                  className={classNames(
                    'mt-1 block w-full border-none h-14 rounded-xl shadow-lg',
                    'focus:ring-0 transition ease-in-out duration-150',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    errors?.password
                      ? 'bg-red-100'
                      : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                  )}
                  {...register('password', {
                    required: true,
                    minLength: 4,
                  })}
                />
                <div className="space-y-0.5 ml-1.5">
                  {errors.password?.type === 'required' && (
                    <span className="text-xs text-red-500 font-medium">
                      Password is required
                    </span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span className="text-xs text-red-500 font-medium">
                      Minimum password length of 4
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-7 flex">
                <label className="inline-flex items-center w-full cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={isSubmitting}
                    className={classNames(
                      'rounded border-gray-300 text-[#d73f49] shadow-sm focus:border-blue-300 focus:ring',
                      'focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={classNames(
                    'w-full py-4 rounded-xl text-white shadow-xl hover:shadow-inner',
                    'focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'bg-gradient-to-r from-[#1f1b58] via-pink-600 to-[#d73f49]'
                  )}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}

export default Login
