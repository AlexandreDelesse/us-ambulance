import { useState } from "react";
import { notificationClient } from "../../api/client";
const VAPID_KEY =
  "BA2Rtaj-6HC9Vy2w88_DnDDv0veeC-6EL-KDFkOt9UwU8BKW-sVU_but7kzf2OperPTHXcyWaoGHJsBnws5LVFI";

export function useNotifications() {
  const [hasSubscription, setHasSubscription] = useState(false);

  const subscribe = async () => {
    const permission = await requestNotificationPermission();
    if (permission == "denied") return;

    const registration = await registerServiceWorker("sw.js");
    console.log(registration);
    if (!registration) return;

    const subscription = await getSubscription(registration);
    if (!subscription) return;

    const apiSubscription = await postSubscription(subscription);
    if (!apiSubscription) return;

    return setHasSubscription(true);
  };

  const unSubscribe = () => setHasSubscription(false);

  return { hasSubscription, subscribe, unSubscribe };
}

const requestNotificationPermission = async () => {
  console.log("Requesting notification permission");

  if ("Notification" in window) {
    const permission = Notification.permission;
    if (permission === "granted" || permission == "denied") return permission;
    return await Notification.requestPermission();
  } else {
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
  console.log("Posting subscription");

  const apiSubscription = undefined;
  if (!apiSubscription)
    return await notificationClient.post(
      "Notifications/subscribe",
      {
        id: -1,
        endpoint: subscription.endpoint,
        ...subscription.toJSON().keys,
        userId: "27",
      },
      { headers: { "Content-Type": "application/json" } }
    );
  else return apiSubscription;
};
