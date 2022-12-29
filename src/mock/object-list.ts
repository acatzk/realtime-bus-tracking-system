import { RiBusFill } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { MdLocationPin } from 'react-icons/md'
import { BsCalendarDate, BsCardChecklist } from 'react-icons/bs'

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' }
]

export const dashboardLink = [
  { name: 'Dashboard', href: 'dashboard', Icon: BsCardChecklist },
  { name: 'Track Bus', href: 'track-bus', Icon: MdLocationPin },
  { name: 'Passengers', href: 'passengers', Icon: RiBusFill },
  { name: 'Profile', href: 'profile', Icon: CgProfile }
]

export const direction = [
  { name: 'Benit -> Sogod' },
  { name: 'Sogod -> Benit' },
  { name: 'Sogod -> Maasin' },
  { name: 'Maasin -> Sogod' }
]

export const adminSubDashboardLink = [
  { name: 'Dashboard', href: 'dashboard', Icon: BsCardChecklist },
  { name: 'Daily Schedules', href: 'schedules', Icon: BsCalendarDate },
  { name: 'Destinations', href: 'destinations', Icon: MdLocationPin }
]
