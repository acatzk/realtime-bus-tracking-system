import React from 'react'
import Head from 'next/head'

const DriverMap = () => {
  const latitude = 10.328055
  const longitude = 124.971234
  return (
    <React.Fragment>
      <Head>
        <title>View Live Map</title>
      </Head>
      <main className="h-screen w-full">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m63!1m12!1m3!1d251275.32476463076!2d124.94294452111022!3d10.247308541882312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m48!3e0!4m5!1s0x3306d64c5cbfa0c9%3A0x9e2dfff5921bd759!2sKinachawa%2C%20Southern%20Leyte!3m2!1d10.0188847!2d125.2450647!4m5!1s0x3306d67df873560f%3A0xbc4397c55f417f36!2sSan%20Ricardo%2C%20Southern%20Leyte!3m2!1d9.9769939!2d125.2738186!4m5!1s0x3306d5debfcc7733%3A0x61c9d9a09d6edbd7!2sPintuyan%2C%20Southern%20Leyte!3m2!1d9.99513!2d125.2258365!4m5!1s0x330711c59ca30769%3A0x2a3fd238fb08613c!2sDr.%20Gonzalo%20Yong%20Memorial%20Bus%20Terminal%2C%20Osme%C3%B1a%20Street%2C%20Sogod%2C%206606%20Southern%20Leyte!3m2!1d10.384186!2d124.9829407!4m5!1s0x33073b7eb054d58f%3A0x41f4184f8f60812e!2sMalitbog%20Main%20Road%2C%20Malitbog%2C%20Southern%20Leyte!3m2!1d10.162197899999999!2d125.0005163!4m5!1s0x330737408e166a35%3A0xb9e417ece889c1f!2sMacrohon%2C%20Southern%20Leyte!3m2!1d10.0643286!2d124.9513384!4m5!1s0x330747b952d49157%3A0x6fd01a85085e4285!2sTerminal%2C%20Capt.%20Iyano%20St.%2C%20Maasin%2C%20Southern%20Leyte!3m2!1d10.132173!2d124.83481409999999!4m4!2s10.277802%2C%20124.982403!3m2!1d${latitude}!2d${longitude}!5e0!3m2!1sen!2sph!4v1651988954891!5m2!1sen!2sph`}
          width="100%"
          loading="lazy"
          style={{ border: '0', height: '100vh' }}></iframe>
      </main>
    </React.Fragment>
  )
}

export default DriverMap
