export const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;
  const vendor = navigator.vendor;

  return {
    userAgent: ua,
    platform,
    vendor,
  };
};

