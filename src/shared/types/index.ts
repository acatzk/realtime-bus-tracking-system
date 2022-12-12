export type SignInUpFormValues = {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  password_confirmation?: string
}
export type PassengerFormValues = {
  name: string
  amount: number
}

export type TrackBusFormSchema = {
  destination: string
  departure: string
  plate_number: string
}
