import React from 'react'
import DashboardLayout from 'layouts/DashboardLayout'
import { useAvatarUrl, useDisplayName, useEmail, useUserData } from '@nhost/react'
import Image from 'next/image'
import { classNames } from 'utils'
import { UPDATE_USER_BY_PK_ID } from 'graphql/mutations'
import { useForm } from 'react-hook-form'
import { GetServerSideProps, NextPage } from 'next'
import { nhost } from 'lib/nhost-client'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { getNhostSession } from '@nhost/nextjs'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nhostSession = await getNhostSession(`${process.env.NEXT_PUBLIC_NHOST_BACKEND}`, context)

  return {
    props: {
      nhostSession
    }
  }
}

const Profile: NextPage = () => {
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

  const onSubmitForm = async (data) => {
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
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 pb-8">
        <div className="mt-5 mx-auto p-6 rounded-lg border bg-white max-w-md">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="w-full">
              <div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative w-[128px] h-[128px] z-10">
                    <Image
                      src={`${avatar?.toString()}`}
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
                      'transition duration-150 ease-in-out',
                      'active:bg-gray-100'
                    )}>
                    Change Avatar
                  </button>
                </div>
                <div className="mt-5 form-floating mb-3 w-full">
                  <input
                    type="text"
                    disabled={isSubmitting}
                    className={classNames(
                      'form-control w-full px-3 py-1.5 text-base font-normal text-gray-700',
                      'bg-white bg-clip-padding border border-solid border-gray-300 rounded',
                      'transition ease-in-out m-0 focus:text-gray-700',
                      'focus:bg-white focus:border-blue-600 focus:outline-none',
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
                  <div className="space-y-0.5 ml-1.5">
                    {errors.displayName?.type === 'required' && (
                      <span className="text-xs text-red-500 font-medium">Fullname is required</span>
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
                      'bg-white bg-clip-padding border border-solid border-gray-300 rounded',
                      'transition ease-in-out m-0 focus:text-gray-700',
                      'focus:bg-white focus:border-blue-600 focus:outline-none',
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
                  <div className="space-y-0.5 ml-1.5">
                    {errors.email?.type === 'required' && (
                      <span className="text-xs text-red-500 font-medium">Email is required</span>
                    )}
                    {errors.email?.message && (
                      <span className="text-xs text-red-500 font-medium">
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
                      'bg-white bg-clip-padding border border-solid border-gray-300 rounded',
                      'transition ease-in-out m-0 focus:text-gray-700',
                      'focus:bg-white focus:border-blue-600 focus:outline-none',
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
                  <div className="space-y-0.5 ml-1.5">
                    {errors.phoneNumber?.type === 'minLength' && (
                      <span className="text-xs text-red-500 font-medium">
                        Phone number must have 11 digits
                      </span>
                    )}
                    {errors.phoneNumber?.type === 'maxLength' && (
                      <span className="text-xs text-red-500 font-medium">
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
                    ease-in-out
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
