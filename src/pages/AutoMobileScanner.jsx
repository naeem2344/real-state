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
    isUserTryToLogin,
    setIsUserTryToLogin
  } = useScannerLogic({
    targetImg: '/autoMobile/auto-mobile-mind-ar.mind',
    video: '/autoMobile/auto-mobile-video.mp4',
    modalKey: 'e-modal-key',
    discountKey: 'e-discount-key',
  });


  return (
    <Suspense fallback={<Loader />}>
      <SignInModal signInModalOpen={signInModalOpen} setSignInModalOpenOpen={setSignInModalOpenOpen} setDetails={setDetails} modalKey={'e-modal-key'} setIsUserTryToLogin={setIsUserTryToLogin}/>
      <CopyCouponModal couponOpen={couponModal} setCouponModal={setCouponModal} setDetails={setDetails} saveUserData={saveUserData} isRealEstate={false} discountKey={'e-discount-key'} />
      <TargetImageScanner {...targetState} setTargetDetected={setTargetDetected} isPlaying = {isUserTryToLogin}/>
    </Suspense>
  )
}

export default AutoMobileScanner