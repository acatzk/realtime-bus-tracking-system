import * as Yup from 'yup'

export const PasengersFormSchema = Yup.object().shape({
  name: Yup.string().required('Passengers name is required'),
  amount: Yup.number().required().label('Amount is required')
})

export const TrackBusFormSchema = Yup.object().shape({
  destination: Yup.string().required('Destination is required'),
  departure: Yup.string().required('Departure is required'),
  plate_number: Yup.number().required().label('Plate number is required')
})
