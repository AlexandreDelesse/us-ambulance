import { useEffect, useState } from "react";
import { notificationClient } from "../../api/client";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useUser } from "../User/UserContext";
import { getDeviceInfos } from "../Utils/DeviceInfos/UserAgentTools";
const VAPID_KEY =
  "BA2Rtaj-6HC9Vy2w88_DnDDv0veeC-6EL-KDFkOt9UwU8BKW-sVU_but7kzf2OperPTHXcyWaoGHJsBnws5LVFI";

export function useNotifications() {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState("");
  const [notificatioNStatus, setNotificationStatus] = useState(false);
  const [isNotifStateLoading, setIsNotifStateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();

  useEffect(() => {
    updateNotificationStatus();
  }, []);

  const updateNotificationStatus = async () => {
    const status = await getkNotificationStatus();
    setNotificationStatus(status);
  };

  const getkNotificationStatus = async () => {
    console.log("--- Début du check ---");
    setIsNotifStateLoading(true);
    const permission = Notification.permission;
    console.log("Permission : ", permission);
    if (permission != "granted") return false;

    const registration = await navigator.serviceWorker.ready;
    console.log(registration);
    if (!registration) return false;

    const sub = await registration.pushManager.getSubscription();
    console.log(sub);
    if (!sub) return false;
    console.log("--- Fin du check ---");
    setIsNotifStateLoading(false);
    return true;
  };

  const subscribe = async () => {
    setIsLoading(true);
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);
    if (permission == "denied") return setIsLoading(false);

    const registration = await registerServiceWorker("sw.js");
    console.log(registration);
    if (!registration) return setIsLoading(false);

    const subscription = await getSubscription(registration);
    if (!subscription) return setIsLoading(false);
    console.log(subscription, subscription.toJSON());

    const deviceInfos = getDeviceInfos();
    const jsonSub = subscription.toJSON();
    const payload: PostSubscriptionDTO = {
      endpoint: subscription.endpoint,
      auth: jsonSub.keys?.auth ?? "",
      p256dh: jsonSub.keys?.p256dh ?? "",
      userId: user!.sub,
      osName: deviceInfos.os.name || "No OS",
      navigatorName: deviceInfos.browser.name || "No Browser",
      osVersion: deviceInfos.os.version || "No Os Version",
    };
    const apiSubscription = await postSubscription(payload); //pas beau
    if (!apiSubscription) return setIsLoading(false);
    setIsLoading(false);
    enqueueSnackbar("Well done", { variant: "success" });
    return setHasSubscription(true);
  };

  const unSubscribe = () => setHasSubscription(false);

  return {
    hasSubscription,
    permission: notificationPermission,
    subscribe,
    unSubscribe,
    isLoading,
    notificatioNStatus,
    isNotifStateLoading,
  };
}

const requestNotificationPermission = async () => {
  console.log("Requesting notification permission");

  if ("Notification" in window) {
    const permission = Notification.permission;
    if (permission === "granted" || permission == "denied") return permission;
    return await Notification.requestPermission();
  } else {
    enqueueSnackbar("no notification", { variant: "warning" });
    return "Error";
  }
};

const registerServiceWorker = async (swUrl: string) => {
  console.log("Registrating service worker if don't exist : ", swUrl);

  let registration;
  if ("serviceWorker" in navigator) {
    registration = await navigator.serviceWorker.getRegistration(swUrl);
    console.log("registration from service worker : ", registration);
    if (!registration) return await navigator.serviceWorker.register(swUrl);
    else return registration;
  } else {
    enqueueSnackbar("no service worker", { variant: "warning" });
    return undefined;
  }
};

const getSubscription = async (registration: ServiceWorkerRegistration) => {
  console.log("Getting subscription");
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription)
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_KEY,
    });
  return subscription;
};

export interface PostSubscriptionDTO {
  userId: string;
  endpoint: string;
  auth: string;
  p256dh: string;
  navigatorName: string;
  osName: string;
  osVersion: string;
}
const postSubscription = async (payload: PostSubscriptionDTO) => {
  const apiSubscription = undefined;
  if (!apiSubscription)
    return await notificationClient.post("Subscription", payload, {
      headers: { "Content-Type": "application/json" },
    });
  else return apiSubscription;
};
