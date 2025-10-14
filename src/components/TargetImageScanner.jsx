// import React, { useEffect, useRef, useState } from 'react'
// import "aframe";
// import "mind-ar/dist/mindar-image-aframe.prod.js";

// const TargetImageScanner = ({targetImg,video , setTargetDetected , isPlaying}) => {
//   const videoRef = useRef(null);
//   const videoEntityRef = useRef(null);


//   console.log(targetImg,video)

//   useEffect(() => {
//     const videoEl = videoRef.current;
//     const videoEntityEl = videoEntityRef.current;

//     if (!videoEl || !videoEntityEl) return;

//     const handleTargetFound = () => {
//       videoEl.play();
//       setTargetDetected(true)
//     };

//     const handleUserInteraction = () => {
//       if (!videoEl) return;
//       videoEl.muted = false;
//       videoEl.play();
//       window.removeEventListener("click", handleUserInteraction);
//     };

//     window.addEventListener("click", handleUserInteraction);
//     videoEntityEl.addEventListener("targetFound", handleTargetFound);
//     videoEntityEl.addEventListener("targetLost", () => {
//       videoEl.pause()
//       setTargetDetected(false)
//     });

//     return () => {
//       videoEntityEl.removeEventListener("targetFound", handleTargetFound);
//       videoEntityEl.removeEventListener("targetLost", () => {
//         videoEl.pause()
//         setTargetDetected(false)
//       });
//       window.removeEventListener("click", handleUserInteraction);
//     };
//   }, []);


//     useEffect(() => {
//     const videoEl = videoRef.current;
//     if (!videoEl) return;
    
//     if (!isPlaying) {
//       videoEl.play().catch(() => {});
//     } else {
//       videoEl.pause();
//     }
//   }, [isPlaying , videoRef]);


//   return (
//     <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
//       <a-scene
//         fix-ios-webgl
//         mindar-image={`imageTargetSrc: ${targetImg}; autoStart: true;`}
//         embedded
//         color-space="sRGB"
//         renderer="colorManagement: true, physicallyCorrectLights"
//         vr-mode-ui="enabled: false"
//         device-orientation-permission-ui="enabled: false"

//         style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }}
//       >
//         <a-assets>
//           <video
//             id="myVideo"
//             ref={videoRef}
//             src={video}
//             preload="auto"
//             playsInline
//             loop
//             muted
//             crossOrigin="anonymous"
//           ></video>
//         </a-assets>

//         <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//         <a-video
//           ref={videoEntityRef}
//           src="#myVideo"
//           mindar-image-target="targetIndex: 0"
//           loop="true"
//           width="1"
//           height="0.5625"
//           position="0 1 0"
//         ></a-video>
//       </a-scene>
//     </div>
//   )
// }

// export default TargetImageScanner

import React, { useEffect, useRef, useState } from 'react';
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const TargetImageScanner = ({ targetImg, video, setTargetDetected }) => {
  const videoRef = useRef(null);
  const videoEntityRef = useRef(null);
  const [showFullScreen, setShowFullScreen] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    const videoEntityEl = videoEntityRef.current;
    if (!videoEl || !videoEntityEl) return;

    const handleTargetFound = () => {
      setTargetDetected(true);
      setShowFullScreen(true); // show fullscreen
      videoEl.play().catch(() => {});
    };

    const handleTargetLost = () => {
      setTargetDetected(false);
      setShowFullScreen(false);
      videoEl.pause();
    };

    const handleUserInteraction = () => {
      if (!videoEl) return;
      videoEl.muted = false;
      videoEl.play().catch(() => {});
      window.removeEventListener("click", handleUserInteraction);
    };

    videoEntityEl.addEventListener("targetFound", handleTargetFound);
    videoEntityEl.addEventListener("targetLost", handleTargetLost);
    window.addEventListener("click", handleUserInteraction);

    return () => {
      videoEntityEl.removeEventListener("targetFound", handleTargetFound);
      videoEntityEl.removeEventListener("targetLost", handleTargetLost);
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [setTargetDetected]);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
      <a-scene
        fix-ios-webgl
        mindar-image={`imageTargetSrc: ${targetImg}; autoStart: true;`}
        embedded
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style={{ width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0 }}
      >
        <a-assets>
          <video
            id="myVideo"
            ref={videoRef}
            src={video}
            preload="auto"
            playsInline
            loop
            muted
            crossOrigin="anonymous"
          ></video>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-video
          ref={videoEntityRef}
          src="#myVideo"
          mindar-image-target="targetIndex: 0"
          loop="true"
          width="1"
          height="0.5625"
          position="0 1 0"
        ></a-video>
      </a-scene>

      {/* Fullscreen overlay video */}
      {showFullScreen && (
        <video
          ref={videoRef}
          src={video}
          autoPlay
          playsInline
          muted
          loop
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
};

export default TargetImageScanner;
