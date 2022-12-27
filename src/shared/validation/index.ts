import * as Yup from 'yup'

export const PasengersFormSchema = Yup.object().shape({
  amount: Yup.number().required().label('Amount is required'),
  date_created: Yup.string().required('Passengers name is required')
})

export const TrackBusFormSchema = Yup.object().shape({
  destination: Yup.string().required('Destination is required'),
  departure: Yup.string().required('Departure is required'),
  plate_number: Yup.number().required().label('Plate number is required')
})

export const DestinationFormSchema = Yup.object().shape({
  id: Yup.string(),
  destination: Yup.string().required('Destination is required')
})
