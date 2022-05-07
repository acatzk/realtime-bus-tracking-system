import React from 'react'
import Head from 'next/head'

const DriverMap = () => {
  const latitude = 10.344027
  const longitude = 124.866844
  return (
    <React.Fragment>
      <Head>
        <title>View Live Map</title>
      </Head>
      <main className="h-screen w-full">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m39!1m12!1m3!1d236980.84138606823!2d124.74864759244088!3d10.500108770558938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m24!3e0!4m5!1s0x330711db96aa79ff%3A0xc658142f36148f6c!2sSogod%2C%20Southern%20Leyte!3m2!1d10.4329228!2d124.994751!4m5!1s0x33076bea6b4811f1%3A0x343065e793f56d53!2sBato%2C%20Leyte!3m2!1d10.339768699999999!2d124.84953039999999!4m5!1s0x3307f08752b5cbf1%3A0x7f3f844d6109f37b!2sOrmoc%20City%2C%20Leyte!3m2!1d11.0384275!2d124.61927019999999!4m4!2s10.3435804%2C124.8675566!3m2!1d${latitude}!2d${longitude}!5e0!3m2!1sen!2sph!4v1651720299960!5m2!1sen!2sph&z=15`}
          width="100%"
          className="shadow-lg"
          style={{ height: '100vh' }}></iframe>
      </main>
    </React.Fragment>
  )
}

export default DriverMap
