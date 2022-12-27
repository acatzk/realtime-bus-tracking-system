import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { classNames } from '~/helpers/classNames'
import { DestinationFormValues } from '~/shared/types'
import DialogBox from '~/components/templates/DialogBox'
import { DestinationFormSchema } from '~/shared/validation'

type props = {
  isOpen: boolean
  closeModal: () => void
  actions: {
    handleSave: (data: DestinationFormValues) => Promise<void>
  }
}

const AddNewDestination: React.FC<props> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    actions: { handleSave }
  } = props

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<DestinationFormValues>({
    mode: 'onChange',
    resolver: yupResolver(DestinationFormSchema)
  })

  useEffect(() => {
    reset({
      destination: ''
    })
  }, [isOpen])

  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Title
        as="h3"
        className="py-2 text-center text-lg font-medium leading-6 text-gray-900">
        Add New Destination
      </Dialog.Title>
      <form className="mt-2" onSubmit={handleSubmit(handleSave)}>
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
            Destination
          </label>
          <input
            type="text"
            className={classNames(
              'sm:text-md mt-1 block w-full rounded-md py-2 shadow-sm',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition duration-150 ease-in-out'
            )}
            {...register('destination')}
            disabled={isSubmitting}
            placeholder="San Ricardo -> Maasin"
          />
          {errors.destination && (
            <span className="ml-1 text-xs text-red-500">{errors?.destination.message}</span>
          )}
        </div>
        <div className="flex justify-end space-x-1">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg bg-gray-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white 
            hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50
            `}>
            {isSubmitting ? 'Saving' : 'Save'}
          </button>
        </div>
      </form>
    </DialogBox>
  )
}

export default AddNewDestination
