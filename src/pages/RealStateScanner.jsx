import React, { lazy, Suspense, useState } from 'react'
import useScannerLogic from '../hook/useScannerLogic';
const CopyCouponModal = lazy(() => import('../components/CopyCouponModal'))
const TargetImageScanner = lazy(() => import('../components/TargetImageScanner'));
const Loader = lazy(() => import('../components/Loader'));
const SignInModal = lazy(() => import('../components/SignInModal'));

const RealStateScanner = () => {
  const {
    targetState,
    setDetails,
    signInModalOpen,
    setSignInModalOpenOpen,
    couponModal,
    setCouponModal,
    targetDetected,
    setTargetDetected,
    saveUserData,
  } = useScannerLogic({
    targetImg: '/realEstate/real-estate-target.mind',
    video: '/realEstate/real-estate-video.mp4',
  });

  // console.log(targetState)

  return (
    <Suspense fallback={<Loader />}>
      <SignInModal signInModalOpen={signInModalOpen} setSignInModalOpenOpen={setSignInModalOpenOpen} setDetails={setDetails}/>
      <CopyCouponModal couponOpen={couponModal} setCouponModal={setCouponModal} setDetails={setDetails} saveUserData={saveUserData} isRealEstate={true} />
      <TargetImageScanner {...targetState} setTargetDetected={setTargetDetected} />
    </Suspense>
  )
}

export default RealStateScanner