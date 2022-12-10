import { BsCardChecklist } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' }
]

export const dashboardLink = [
  { name: 'Dashboard', href: 'dashboard', Icon: BsCardChecklist },
  { name: 'Track Me', href: 'track-me', Icon: MdLocationPin },
  { name: 'Profile', href: 'profile', Icon: CgProfile }
]

export const direction = [
  { name: 'Benit -> Sogod' },
  { name: 'Sogod -> Benit' },
  { name: 'Sogod -> Maasin' },
  { name: 'Maasin -> Sogod' }
]
