import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { FC, useState } from 'react'
import { useAuthenticationStatus } from '@nhost/react'

import { Spinner } from '~/utils'
import { toast } from 'react-toastify'
import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'

const EmployeeRegister: FC = (): JSX.Element => {
  const router = useRouter()
  const [error, setError] = useState()
  const { isLoading, isAuthenticated } = useAuthenticationStatus()

  // Check if user is authenticated
  React.useEffect(() => {
    if (isAuthenticated) router.push('/dashboard')
  }, [isAuthenticated])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm()

  const onSubmitForm = async (data: any) => {
    const { name, email, password } = data

    const { session, error } = await nhost.auth.signUp({
      email: email,
      password: password,
      options: {
        displayName: name
      }
    })
    console.log(error)
    isSuccess(session, error)
  }

  const isSuccess = (session: any, error: any) => {
    if (error) {
      setError(error)
      toast.error(`${error?.message}`)
    } else {
      const {
        user: { displayName }
      } = session
      toast.success(`Good day, ${displayName}`)
      router.push('/dashboard')
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
    <div className="w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
      <label className="block mt-3 text-base text-gray-700 text-center font-semibold">
        Clemrose Registration Page
      </label>
      <form className="py-10" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mt-4">
          <input
            type="text"
            disabled={isSubmitting}
            placeholder="Enter Name"
            className={classNames(
              'mt-1 block w-full border-none h-14 rounded-xl shadow-lg',
              'focus:ring-0 transition ease-in-out duration-150',
              'disabled:cursor-not-allowed disabled:opacity-50',
              errors?.name ? 'bg-red-100' : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
            )}
            {...register('name', {
              required: 'Name is required'
            })}
          />
          <div className="space-y-0.5 ml-1.5">
            {errors.name && (
              <span className="text-xs text-red-500 font-medium">{errors?.name?.message}</span>
            )}
          </div>
        </div>

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
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          <div className="space-y-0.5 ml-1.5">
            {errors.email && (
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
              required: 'Password is required',
              minLength: {
                value: 4,
                message: 'Must have atleast 4 characters'
              }
            })}
          />
          <div className="space-y-0.5 ml-1.5">
            {errors.password && (
              <span className="text-xs text-red-500 font-medium">{errors?.password?.message}</span>
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
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EmployeeRegister
