import React from 'react'
import { NextPage } from 'next'
import router from 'next/router'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useAuthenticationStatus } from '@nhost/react'

import { Spinner } from '~/utils/Icons'
import { nhost } from '~/lib/nhost-client'
import PageLayout from '~/layouts/PageLayout'
import { classNames } from '~/helpers/classNames'
import { GET_USER_ROLE_BY_EMAIL } from '~/graphql/queries'

const Login: NextPage = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      email: 'demo@gmail.com',
      password: 'demo123!'
    }
  })

  const onSubmitForm = async (data: any) => {
    const { email, password } = data

    const { session, error } = await nhost.auth.signIn({
      email: email,
      password: password
    })
    isSuccess(session, error)
  }

  const isSuccess = (session: any, error: any) => {
    if (error) {
      toast.error(error?.message)
    } else {
      const {
        user: { displayName }
      } = session
      toast.success(`Good day, ${displayName}`)
      router.push('/dashboard')
    }
  }

  // Check if user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) router.push('/dashboard')
  }, [isAuthenticated])

  if (isLoading)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Spinner className="h-14 w-14" />
        <p className="mt-1 text-xs">Loading...</p>
      </div>
    )

  return (
    <PageLayout metaHead="| Login">
      <main className="mx-auto flex min-h-[91vh] place-items-center justify-center px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <div className="relative w-full max-w-sm">
          <div className="card absolute h-full  w-full -rotate-6 transform rounded-3xl  bg-[#1f1b58] shadow-lg"></div>
          <div className="card absolute h-full  w-full rotate-6 transform rounded-3xl  bg-[#d73f49] shadow-lg"></div>
          <div className="relative w-full rounded-3xl  bg-gray-100 px-6 py-4 shadow-md">
            <label className="mt-3 block text-center text-base font-semibold text-gray-700">
              Clemrose Login Page
            </label>
            <form className="py-10" onSubmit={handleSubmit(onSubmitForm)}>
              <div className="mt-4">
                <input
                  type="email"
                  disabled={isSubmitting}
                  placeholder="Enter Email"
                  className={classNames(
                    'mt-1 block h-14 w-full rounded-xl border-none shadow-lg',
                    'transition duration-150 ease-in-out focus:ring-0',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    errors?.email ? 'bg-red-100' : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                  )}
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                <div className="ml-1.5 space-y-0.5">
                  {errors.email?.type === 'required' && (
                    <span className="text-xs font-medium text-red-500">Email is required</span>
                  )}
                  {errors.email?.message && (
                    <span className="text-xs font-medium text-red-500">
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
                    'mt-1 block h-14 w-full rounded-xl border-none shadow-lg',
                    'transition duration-150 ease-in-out focus:ring-0',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    errors?.password
                      ? 'bg-red-100'
                      : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                  )}
                  {...register('password', {
                    required: true,
                    minLength: 4
                  })}
                />
                <div className="ml-1.5 space-y-0.5">
                  {errors.password?.type === 'required' && (
                    <span className="text-xs font-medium text-red-500">Password is required</span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span className="text-xs font-medium text-red-500">
                      Minimum password length of 4
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-7 flex">
                <label className="inline-flex w-full cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked
                    disabled={isSubmitting}
                    className={classNames(
                      'rounded border-gray-300 text-[#d73f49] shadow-sm focus:border-blue-300 focus:ring',
                      'focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50'
                    )}
                    name="remember"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={classNames(
                    'w-full rounded-xl py-4 text-white shadow-xl hover:shadow-inner',
                    'focus:outline-none hover:-translate-x transform transition  duration-500 ease-in-out hover:scale-105',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'bg-gradient-to-r from-[#1f1b58] via-pink-600 to-[#d73f49]'
                  )}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
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
