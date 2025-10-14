// import { useEffect, useState } from 'react';

// const useScannerLogic = ({ targetImg, video , discountKey , modalKey }) => {
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

//     if (localStorage.getItem(lModalKey) === 'done' && !signInModalOpen) {
//       localStorage.setItem(discountKey, 'countinue');
//       discountTimer = setTimeout(() => {
//         setCouponModal(true);
//       }, 800);
//     }

//     return () => clearTimeout(discountTimer);
//   }, [targetDetected, signInModalOpen , discountKey ,couponModal]);

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
  const [details, setDetails] = useState({});
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [couponModal, setCouponModal] = useState(false);
  const [targetDetected, setTargetDetected] = useState(false);

  const lModalKey = localStorage.getItem(modalKey);

  const saveUserData = () => {
    const stringifyUserDetails = JSON.stringify(details);
    localStorage.setItem('user-details', stringifyUserDetails);
  };

  // 🔹 Open SignIn Modal when target detected
  useEffect(() => {
    let loginTimer;

    if (targetDetected) {
      if (lModalKey === 'countinue' || !lModalKey) {
        localStorage.setItem(modalKey, 'countinue');
        loginTimer = setTimeout(() => {
          setSignInModalOpen(true);
        }, 500);
      }
    } else {
      setSignInModalOpen(false);
      setCouponModal(false);
    }

    return () => clearTimeout(loginTimer);
  }, [targetDetected, lModalKey, modalKey]);

  // 🔹 Show discount modal after login
  useEffect(() => {
    let discountTimer;
    if (!targetDetected) return;

    if (localStorage.getItem(modalKey) === 'done' && !signInModalOpen) {
      localStorage.setItem(discountKey, 'countinue');
      discountTimer = setTimeout(() => {
        setCouponModal(true);
      }, 800);
    }

    return () => clearTimeout(discountTimer);
  }, [targetDetected, signInModalOpen, discountKey, modalKey]);

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
    setSignInModalOpen,
    couponModal,
    setCouponModal,
    targetDetected,
    setTargetDetected,
    saveUserData,
  };
};

export default useScannerLogic;
