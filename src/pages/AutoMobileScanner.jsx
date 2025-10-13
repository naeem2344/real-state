import React, { lazy, Suspense, useEffect, useState } from 'react'
import CopyCouponModal from '../components/CopyCouponModal';
const Loader = lazy(() => import('../components/Loader'))
const TargetImageScanner = lazy(() => import('../components/TargetImageScanner'));
const SignInModal = lazy(() => import('../components/SignInModal'));

const AutoMobileScanner = () => {
  const [targetState, setTargetState] = useState({ targetImg: '/autoMobile/auto-mobile-mind-ar.mind', video: "/autoMobile/auto-mobile-video.mp4" });
  const [details, setDetails] = useState(null);
  const [signInModalOpen, setSignInModalOpenOpen] = useState(false);
  const modalKey = localStorage.getItem('modal-key');
  const [couponModal, setCouponModal] = useState(false);
  const [targetDetected, setTargetDetected] = useState(false);






  useEffect(() => {
    let loginTimer;

    if (targetDetected) {
      if (modalKey === 'countinue' || !modalKey) {
        localStorage.setItem('modal-key', 'countinue')
        loginTimer = setTimeout(() => {
          setSignInModalOpenOpen(true);
        }, 500);
      }
    } else {
      setSignInModalOpenOpen(false);
      setCouponModal(false);
    }

    return () => {
      clearTimeout(loginTimer);
    };
  }, [targetDetected, modalKey]);




 useEffect(() => {
    let discountTimer;
    if (!targetDetected) return;

    if (localStorage.getItem('modal-key') === 'done' && (!signInModalOpen || signInModalOpen === 'countinue' )) {
      localStorage.setItem('discount-key', 'countinue')
      discountTimer = setTimeout(() => {
        setCouponModal(true);
      }, 800);
    }

    return () => clearTimeout(discountTimer);
  }, [targetDetected, signInModalOpen]);











  useEffect(() => {
    const deviceName = navigator?.userAgentData?.platform || navigator?.platform;
    if (deviceName) {
      setDetails(pre => ({ ...pre, deviceName }))
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDetails(pre => ({ ...pre, location: { latitude, longitude } }));
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [])


  return (
    <Suspense fallback={<Loader />}>
      <SignInModal signInModalOpen={signInModalOpen} setSignInModalOpenOpen={setSignInModalOpenOpen}/>
      <CopyCouponModal />
      <TargetImageScanner {...targetState} setTargetDetected={setTargetDetected} />
    </Suspense>
  )
}

export default AutoMobileScanner