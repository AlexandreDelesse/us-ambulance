import { useEffect, useState } from "react";
import { notificationClient } from "../../api/client";
import { enqueueSnackbar } from "notistack";
import { useUser } from "../User/UserContext";
import { getDeviceInfos } from "../Utils/DeviceInfos/UserAgentTools";

const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;

export function useNotifications() {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [isNotifStateLoading, setIsNotifStateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    refreshNotificationStatus();
  }, []);

  const refreshNotificationStatus = async () => {
    const status = await getNotificationStatus();
    setNotificationStatus(status);
  };

  const getNotificationStatus = async (): Promise<boolean> => {
    setIsNotifStateLoading(true);
    try {
      if (Notification.permission !== "granted") return false;
      const registration = await navigator.serviceWorker.ready;
      if (!registration) return false;
      const sub = await registration.pushManager.getSubscription();
      return !!sub;
    } finally {
      setIsNotifStateLoading(false);
    }
  };

  const subscribe = async () => {
    setIsLoading(true);
    try {
      const permission = await requestNotificationPermission();
      if (permission !== "granted") return;

      const registration = await registerServiceWorker("sw.js");
      if (!registration) return;

      const subscription = await getOrCreateSubscription(registration);
      if (!subscription) return;

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

      await postSubscription(payload);
      await refreshNotificationStatus();
      enqueueSnackbar("Notifications activées", { variant: "success" });
    } finally {
      setIsLoading(false);
    }
  };

  const unSubscribe = async () => {
    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        try {
          await deleteSubscription(subscription.endpoint);
        } catch {
          // API pas encore disponible — la désinscription navigateur est effective
        }
      }
      await refreshNotificationStatus();
      enqueueSnackbar("Notifications désactivées", { variant: "info" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notificationStatus,
    subscribe,
    unSubscribe,
    isLoading,
    isNotifStateLoading,
  };
}

const requestNotificationPermission = async (): Promise<
  NotificationPermission | "Error"
> => {
  if (!("Notification" in window)) {
    enqueueSnackbar("Les notifications ne sont pas supportées", {
      variant: "warning",
    });
    return "Error";
  }
  const { permission } = Notification;
  if (permission === "granted" || permission === "denied") return permission;
  return await Notification.requestPermission();
};

const registerServiceWorker = async (
  swUrl: string
): Promise<ServiceWorkerRegistration | undefined> => {
  if (!("serviceWorker" in navigator)) {
    enqueueSnackbar("Service Worker non supporté", { variant: "warning" });
    return undefined;
  }
  const existing = await navigator.serviceWorker.getRegistration(swUrl);
  return existing ?? (await navigator.serviceWorker.register(swUrl));
};

const getOrCreateSubscription = async (
  registration: ServiceWorkerRegistration
): Promise<PushSubscription | null> => {
  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;
  return await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: VAPID_KEY,
  });
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
  return notificationClient.post("Subscription", payload);
};

const deleteSubscription = async (endpoint: string) => {
  return notificationClient.delete("Subscription", { data: { endpoint } });
};