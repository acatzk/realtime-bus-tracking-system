import Image from 'next/image'

import handleImageError from '~/helpers/handleImageError'

type Props = {
  user: any
}

export function UserAvatar({ user }: Props) {
  return (
    <Image
      src={user?.avatarUrl === null ? 'https://i.stack.imgur.com/l60Hf.png' : user?.avatarUrl}
      width={32}
      height={32}
      className="rounded-full"
      layout="intrinsic"
      onError={(e) =>
        handleImageError(
          e,
          'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
        )
      }
      alt="avatar"
    />
  )
}
