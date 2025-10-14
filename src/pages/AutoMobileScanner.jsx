import { lazy, Suspense } from 'react'
import CopyCouponModal from '../components/CopyCouponModal';
import useScannerLogic from '../hook/useScannerLogic';
const Loader = lazy(() => import('../components/Loader'))
const TargetImageScanner = lazy(() => import('../components/TargetImageScanner'));
const SignInModal = lazy(() => import('../components/SignInModal'));

const AutoMobileScanner = () => {
  

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
    targetImg: '/autoMobile/auto-mobile-mind-ar.mind',
    video: '/autoMobile/auto-mobile-video.mp4',
  });


  return (
    <Suspense fallback={<Loader />}>
      <SignInModal signInModalOpen={signInModalOpen} setSignInModalOpenOpen={setSignInModalOpenOpen} setDetails={setDetails}/>
      <CopyCouponModal couponOpen={couponModal} setCouponModal={setCouponModal} setDetails={setDetails} saveUserData={saveUserData} isRealEstate={false}/>
      <TargetImageScanner {...targetState} setTargetDetected={setTargetDetected} />
    </Suspense>
  )
}

export default AutoMobileScanner