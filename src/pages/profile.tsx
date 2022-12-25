import React from 'react'
import { mutate } from 'swr'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { getNhostSession } from '@nhost/nextjs'
import { GetServerSideProps, NextPage } from 'next'
import { useAvatarUrl, useDisplayName, useEmail, useUserData } from '@nhost/react'

import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import handleImageError from '~/helpers/handleImageError'
import { UPDATE_USER_BY_PK_ID } from '~/graphql/mutations'
import DashboardLayout from '~/components/templates/DashboardLayout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nhostSession = await getNhostSession(`${process.env.NEXT_PUBLIC_NHOST_BACKEND}`, context)

  return {
    props: {
      nhostSession
    }
  }
}

const Profile: NextPage = (): JSX.Element => {
  const user = useUserData()
  const avatar = useAvatarUrl()
  const displayName = useDisplayName()
  const email = useEmail()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      displayName,
      email,
      phoneNumber: user?.phoneNumber
    }
  })

  const onSubmitForm = async (data: any) => {
    const { displayName, email, phoneNumber } = data
    const {
      data: { updateUser }
    } = await nhost.graphql.request(UPDATE_USER_BY_PK_ID, {
      id: user?.id,
      avatarUrl: user?.avatarUrl,
      displayName,
      email,
      phoneNumber
    })

    await mutate({
      ...data,
      ...updateUser
    })

    if (updateUser) {
      toast.success(`Updated Successfully!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      router.push('/profile')
    }
  }

  return (
    <DashboardLayout metaHead="| Profile">
      <main className="min-h-[81vh] px-4 pb-8 md:px-8 lg:px-16">
        <div className="mx-auto mt-5 max-w-md rounded-lg border bg-white p-6">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="w-full">
              <div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative z-10 h-[128px] w-[128px]">
                    <Image
                      src={`${avatar === null ? 'https://i.stack.imgur.com/l60Hf.png' : avatar}`}
                      layout="fill"
                      className="shadown-lg rounded-full"
                      onError={(e) =>
                        handleImageError(
                          e,
                          'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
                        )
                      }
                      alt="avatar"
                    />
                  </div>
                  <button
                    type="button"
                    className={classNames(
                      'inline-block px-2 py-1.5 font-medium',
                      'rounded text-xs leading-tight',
                      'border hover:bg-gray-50',
                      'transition duration-150 ease-in-out',
                      'active:bg-gray-100'
                    )}>
                    Change Avatar
                  </button>
                </div>
                <div className="form-floating mt-5 mb-3 w-full">
                  <input
                    type="text"
                    disabled={isSubmitting}
                    className={classNames(
                      'form-control w-full px-3 py-1.5 text-base font-normal text-gray-700',
                      'rounded border border-solid border-gray-300 bg-white bg-clip-padding',
                      'm-0 transition ease-in-out focus:text-gray-700',
                      'focus:outline-none focus:border-blue-600 focus:bg-white',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      errors?.displayName
                        ? 'bg-red-100'
                        : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                    )}
                    {...register('displayName', {
                      required: true
                    })}
                    defaultValue={displayName}
                  />
                  <div className="ml-1.5 space-y-0.5">
                    {errors.displayName?.type === 'required' && (
                      <span className="text-xs font-medium text-red-500">Fullname is required</span>
                    )}
                  </div>
                  <label className="text-gray-700">Fullname</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    disabled={isSubmitting}
                    className={classNames(
                      'form-control w-full px-3 py-1.5 text-base font-normal text-gray-700',
                      'rounded border border-solid border-gray-300 bg-white bg-clip-padding',
                      'm-0 transition ease-in-out focus:text-gray-700',
                      'focus:outline-none focus:border-blue-600 focus:bg-white',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      errors?.email
                        ? 'bg-red-100'
                        : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                    )}
                    {...register('email', {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    defaultValue={email}
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
                  <label className="text-gray-700">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    disabled={isSubmitting}
                    className={classNames(
                      'form-control w-full px-3 py-1.5 text-base font-normal text-gray-700',
                      'rounded border border-solid border-gray-300 bg-white bg-clip-padding',
                      'm-0 transition ease-in-out focus:text-gray-700',
                      'focus:outline-none focus:border-blue-600 focus:bg-white',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      errors?.phoneNumber
                        ? 'bg-red-100'
                        : 'bg-gray-100 hover:bg-blue-100 focus:bg-blue-100'
                    )}
                    {...register('phoneNumber', {
                      minLength: 11,
                      maxLength: 11
                    })}
                    defaultValue={`${user?.phoneNumber}`}
                  />
                  <div className="ml-1.5 space-y-0.5">
                    {errors.phoneNumber?.type === 'minLength' && (
                      <span className="text-xs font-medium text-red-500">
                        Phone number must have 11 digits
                      </span>
                    )}
                    {errors.phoneNumber?.type === 'maxLength' && (
                      <span className="text-xs font-medium text-red-500">
                        Phone number must have 11 digits
                      </span>
                    )}
                  </div>
                  <label className="text-gray-700">Phone Number</label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    focus:outline-none
                    w-full
                    rounded
                    bg-blue-600
                    px-6
                    py-4
                    text-xs
                    font-medium
                    uppercase
                    leading-tight
                    text-white
                    shadow-md transition
                    duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg
                    focus:ring-0
                    active:bg-blue-800
                    active:shadow-lg
                    disabled:cursor-not-allowed disabled:opacity-50">
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
