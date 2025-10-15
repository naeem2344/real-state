import { useEffect, useState } from 'react';

const useScannerLogic = ({ targetImg, video, discountKey, modalKey }) => {
  const [targetState, setTargetState] = useState({ targetImg, video });
  const [details, setDetails] = useState(null);
  const [signInModalOpen, setSignInModalOpenOpen] = useState(false);
  const [couponModal, setCouponModal] = useState(false);
  const [targetDetected, setTargetDetected] = useState(false);
   const [isUserTryToLogin, setIsUserTryToLogin] = useState(false)

  // Save user data to localStorage
  const saveUserData = () => {
    if (details) {
      localStorage.setItem('user-details', JSON.stringify(details));
    }
  };

  useEffect(() => {
    let loginTimer;

    if (targetDetected) {
      const storedModalKey = localStorage.getItem(modalKey);


      if (!storedModalKey || storedModalKey === 'countinue') {
        localStorage.setItem(modalKey, 'countinue');
        loginTimer = setTimeout(() => setSignInModalOpenOpen(true), 500);
      }
    } else {
      setSignInModalOpenOpen(false);
      setCouponModal(false);
    }

    return () => clearTimeout(loginTimer);
  }, [targetDetected, modalKey]);

  const dfsdf = localStorage.getItem(modalKey);
  useEffect(() => {
    let discountTimer;

    if (targetDetected && !signInModalOpen && dfsdf) {
      const storedDiscountKey = localStorage.getItem(discountKey);
      if ((!storedDiscountKey || storedDiscountKey === 'countinue') && dfsdf==='done') {
        localStorage.setItem(discountKey, 'countinue');
        discountTimer = setTimeout(() => setCouponModal(true), 800);
      }

      const data = localStorage.getItem('user-details');
      if (storedDiscountKey === 'done' || data) {
        setCouponModal(true)
      }
    }

    return () => clearTimeout(discountTimer);
  }, [signInModalOpen, targetDetected, discountKey , dfsdf]);

  useEffect(() => {
    const deviceName = navigator?.userAgentData?.platform || navigator?.platform;
    if (deviceName) {
      setDetails((prev) => ({ ...prev, deviceName }));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDetails((prev) => ({ ...prev, location: { latitude, longitude } }));
        },
        (error) => console.error('Error getting location:', error.message)
      );
    }
  }, []);

  return {
    targetState,
    setTargetState,
    details,
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
  };
};

export default useScannerLogic;