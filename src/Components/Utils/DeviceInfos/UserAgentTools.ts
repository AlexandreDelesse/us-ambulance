import { UAParser } from "ua-parser-js";

const getDeviceInfos = () => {
  const userAgent = navigator.userAgent;
  const { browser, device, os } = UAParser(userAgent);
  return { browser, device, os };
};

export { getDeviceInfos };
