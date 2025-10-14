// import { useEffect, useState } from 'react';

// const useScannerLogic = ({ targetImg, video, discountKey, modalKey }) => {
//   const [targetState, setTargetState] = useState({ targetImg, video });
//   const [details, setDetails] = useState(null);
//   const [signInModalOpen, setSignInModalOpenOpen] = useState(false);
//   const [couponModal, setCouponModal] = useState(false);
//   const [targetDetected, setTargetDetected] = useState(false);

//   const lModalKey = localStorage.getItem(modalKey);

//   const saveUserData = () => {
//     const stringifyUserDetails = JSON.stringify(details);
//     localStorage.setItem('user-details', stringifyUserDetails);
//   };

//   // 🔹 Open SignIn Modal when target detected
//   useEffect(() => {
//     let loginTimer;

//     if (targetDetected) {
//       if (lModalKey === 'countinue' || !lModalKey) {
//         localStorage.setItem(modalKey, 'countinue');
//         loginTimer = setTimeout(() => {
//           setSignInModalOpenOpen(true);
//         }, 500);
//       }
//     } else {
//       setSignInModalOpenOpen(false);
//       setCouponModal(false);
//     }

//     return () => clearTimeout(loginTimer);
//   }, [targetDetected, lModalKey]);

//   // 🔹 Show discount modal after login
//   useEffect(() => {
//     let discountTimer;
//     if (!targetDetected) return;

//     if (localStorage.getItem(lModalKey) === 'done' && (localStorage.getItem(discountKey) === 'countinue' || !localStorage.getItem(discountKey) || signInModalOpen)) {
//       localStorage.setItem(discountKey, 'countinue');
//       discountTimer = setTimeout(() => {
//         setCouponModal(true);
//       }, 800);
//     }

//     return () => clearTimeout(discountTimer);
//   }, [targetDetected, signInModalOpen, discountKey]);

//   // 🔹 Capture device and location info
//   useEffect(() => {
//     const deviceName = navigator?.userAgentData?.platform || navigator?.platform;
//     if (deviceName) {
//       setDetails((prev) => ({ ...prev, deviceName }));
//     }

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setDetails((prev) => ({
//             ...prev,
//             location: { latitude, longitude },
//           }));
//         },
//         (error) => console.error('Error getting location:', error.message)
//       );
//     } else {
//       console.error('Geolocation not supported.');
//     }
//   }, []);

//   return {
//     targetState,
//     setTargetState,
//     details,
//     setDetails,
//     signInModalOpen,
//     setSignInModalOpenOpen,
//     couponModal,
//     setCouponModal,
//     targetDetected,
//     setTargetDetected,
//     saveUserData,
//   };
// };

// export default useScannerLogic;



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

  // 🔹 Open SignIn Modal when target is detected
  useEffect(() => {
    let loginTimer;

    if (targetDetected) {
      const storedModalKey = localStorage.getItem(modalKey);
      const data = localStorage.getItem('user-details');
      if (data) return;

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

  // 🔹 Open Coupon Modal after SignIn modal is closed
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

  // 🔹 Capture device and location info
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
