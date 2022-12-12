import Head from 'next/head'
import Image from 'next/image'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const NotFound: NextPage = (): JSX.Element => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name="description" content="404 page not found" />
      </Head>
      <div className="dark:bg-dark-dim flex h-screen min-h-screen items-center justify-center bg-white px-4 text-gray-800 transition duration-700 ease-in-out">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <h1 className="-mr-6 text-9xl font-bold dark:text-gray-100">4</h1>
            <div className="z-50 flex-shrink-0">
              <Image
                src="/images/emoji.png"
                alt="Cry Emoji Image"
                width={192}
                height={192}
                blurDataURL="/images/emoji.png"
                placeholder="blur"
                layout="intrinsic"
              />
            </div>
            <h1 className="-ml-8 text-9xl font-bold dark:text-gray-100">4</h1>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold uppercase dark:text-gray-200">
              Oops! Page not be found
            </h2>
            <div className="max-w-md text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sorry but the page you are looking for does not exist, have been removed. name
                changed or is temporarily unavailable
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => router.push('/dashboard')}
              className="focus:outline-none rounded-full bg-yellow-500 px-6 py-3 font-semibold text-white transition duration-150 ease-in-out hover:bg-yellow-400 hover:shadow-xl">
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
