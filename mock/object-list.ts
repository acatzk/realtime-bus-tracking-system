import { BsCardChecklist } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'

export const user = {
  name: 'Joshua Galit',
  email: 'joshuaimalay@gmail.com',
  avatarUrl: 'https://avatars.githubusercontent.com/u/38458781?v=4'
}

export const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Statistics', href: '#', current: false },
  { name: 'Financial Status', href: '#', current: false }
]

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' }
]

export const dashboardLink = [
  { name: 'Dashboard', href: 'dashboard', Icon: BsCardChecklist },
  { name: 'Track Me', href: 'track-me', Icon: MdLocationPin }
]