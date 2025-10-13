import React, { lazy, Suspense, useState } from 'react'
const TargetImageScanner = lazy(() => import('../components/TargetImageScanner'));
const Loader = lazy(() => import('../components/Loader'))

const RealStateScanner = () => {
  const [targetState, setTargetState] = useState({ targetImg: '/autoMobile/auto-mobile-mind-ar.mind', video: "/autoMobile/auto-mobile-video.mp4" })
  return (
    <Suspense fallback={<Loader />}>
      <TargetImageScanner {...targetState} />
    </Suspense>
  )
}

export default RealStateScanner