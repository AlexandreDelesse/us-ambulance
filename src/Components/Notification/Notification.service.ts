import { useState } from "react";
import { notificationClient } from "../../api/client";
import { enqueueSnackbar, useSnackbar } from "notistack";
const VAPID_KEY =
  "BA2Rtaj-6HC9Vy2w88_DnDDv0veeC-6EL-KDFkOt9UwU8BKW-sVU_but7kzf2OperPTHXcyWaoGHJsBnws5LVFI";

export function useNotifications() {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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

    const apiSubscription = await postSubscription(subscription);
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

const postSubscription = async (subscription: PushSubscription) => {
  const apiSubscription = undefined;
  if (!apiSubscription)
    return await notificationClient.post(
      "Subscription",
      {
        endpoint: subscription.endpoint,
        ...subscription.toJSON().keys,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  else return apiSubscription;
};
