import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useAuthenticationStatus } from '@nhost/react'

import { Spinner } from '~/utils'
import { toast } from 'react-toastify'
import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import { GET_USER_ROLE_BY_EMAIL } from '~/graphql/queries'

const AdminLogin: FC = (): JSX.Element => {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmitForm = async (data: any) => {
    const { email, password } = data

    const {
      data: {
        users: { ...roles }
      }
    } = await nhost.graphql.request(GET_USER_ROLE_BY_EMAIL, {
      email: email.toString()
    })

    const loginRole = roles[0]?.roles[0]?.role

    if (loginRole === 'admin') {
      const { session, error } = await nhost.auth.signIn({
        email: email,
        password: password
      })
      isSuccess(session, error)
    } else {
      toast.warning(`You are not allowed to login in this page!`)
    }
  }

  const isSuccess = (session: any, error: any) => {
    if (error) {
      toast.error(error?.message)
    } else {
      const {
        user: { displayName }
      } = session
      toast.success(`Welcome back admin, ${displayName}`)
      router.push('/admin/dashboard')
    }
  }

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Spinner className="w-14 h-14" />
        <p className="text-xs mt-1">Loading...</p>
      </div>
    )

  return (
    <div className="w-full rounded-3xl  px-6 py-4 bg-white shadow-md">
      <label className="block mt-3 text-base text-gray-700 text-center font-semibold">
        Employee's Login Page
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
          <div className="space-y-0.5 ml-1.5">
            {errors.email?.type === 'required' && (
              <span className="text-xs text-red-500 font-medium">Email is required</span>
            )}
            {errors.email?.message && (
              <span className="text-xs text-red-500 font-medium">{errors.email?.message}</span>
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
              errors?.password ? 'bg-red-100' : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
            )}
            {...register('password', {
              required: true,
              minLength: 4
            })}
          />
          <div className="space-y-0.5 ml-1.5">
            {errors.password?.type === 'required' && (
              <span className="text-xs text-red-500 font-medium">Password is required</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span className="text-xs text-red-500 font-medium">Minimum password length of 4</span>
            )}
          </div>
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
            )}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminLogin
