import React, { lazy, Suspense, useEffect, useState } from 'react'
const Loader = lazy(() => import('../components/Loader'))
const TargetImageScanner = lazy(() => import('../components/TargetImageScanner'));
import platform from 'platform';

const AutoMobileScanner = () => {
  const [targetState, setTargetState] = useState({ targetImg: '/autoMobile/auto-mobile-mind-ar.mind', video: "/autoMobile/auto-mobile-video.mp4" });
  useEffect(() => {
    alert(platform.description);

    const deviceName = navigator?.userAgentData?.platform || navigator?.platform;
    // alert(deviceName);
  }, [])
  return (
    <Suspense fallback={<Loader />}>
      <TargetImageScanner {...targetState} />
    </Suspense>
  )
}

export default AutoMobileScanner