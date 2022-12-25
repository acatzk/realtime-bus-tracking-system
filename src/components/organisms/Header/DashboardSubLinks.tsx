import Link from 'next/link'
import { useRouter } from 'next/router'

import { classNames } from '~/helpers/classNames'

type props = {
  dashboardLink: any
}

export function DashboardSubLinks({ dashboardLink }: props) {
  const router = useRouter()
  return (
    <nav>
      <ul className="flex items-center space-x-4 md:space-x-6">
        {dashboardLink.map(
          ({ name, href, Icon }: { name: string; href: string; Icon: any }, i: number) => (
            <li key={i}>
              <Link href={`/${href}`}>
                <a
                  className={classNames(
                    'py-3 font-medium md:pb-4',
                    'border-b-2 hover:text-gray-800',
                    'transition duration-150 ease-in-out',
                    'flex items-center space-x-1 text-sm md:text-base',
                    router.pathname === `/${href}`
                      ? 'border-gray-500  text-gray-800'
                      : 'border-transparent text-gray-600'
                  )}>
                  <Icon className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span>{name}</span>
                </a>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  )
}
