import { useEffect, useState } from 'react';

const useScannerLogic = ({ targetImg, video }) => {
  const [targetState, setTargetState] = useState({ targetImg, video });
  const [details, setDetails] = useState(null);
  const [signInModalOpen, setSignInModalOpenOpen] = useState(false);
  const [couponModal, setCouponModal] = useState(false);
  const [targetDetected, setTargetDetected] = useState(false);

  const modalKey = localStorage.getItem('modal-key');

  const saveUserData = () => {
    const stringifyUserDetails = JSON.stringify(details);
    localStorage.setItem('user-details', stringifyUserDetails);
  };

  // 🔹 Open SignIn Modal when target detected
  useEffect(() => {
    let loginTimer;

    if (targetDetected) {
      if (modalKey === 'countinue' || !modalKey) {
        localStorage.setItem('modal-key', 'countinue');
        loginTimer = setTimeout(() => {
          setSignInModalOpenOpen(true);
        }, 500);
      }
    } else {
      setSignInModalOpenOpen(false);
      setCouponModal(false);
    }

    return () => clearTimeout(loginTimer);
  }, [targetDetected, modalKey]);

  // 🔹 Show discount modal after login
  useEffect(() => {
    let discountTimer;
    if (!targetDetected) return;

    if (localStorage.getItem('modal-key') === 'done' && !signInModalOpen) {
      localStorage.setItem('discount-key', 'countinue');
      discountTimer = setTimeout(() => {
        setCouponModal(true);
      }, 800);
    }

    return () => clearTimeout(discountTimer);
  }, [targetDetected, signInModalOpen]);

  // 🔹 Capture device and location info
  useEffect(() => {
    const deviceName = navigator?.userAgentData?.platform || navigator?.platform;
    if (deviceName) {
      setDetails((prev) => ({ ...prev, deviceName }));
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDetails((prev) => ({
            ...prev,
            location: { latitude, longitude },
          }));
        },
        (error) => console.error('Error getting location:', error.message)
      );
    } else {
      console.error('Geolocation not supported.');
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
  };
};

export default useScannerLogic;
