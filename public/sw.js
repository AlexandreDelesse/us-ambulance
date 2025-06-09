self.addEventListener("fetch", () => console.log("fetched"));

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  const options = {
    body: data.message || "Sans message",
    icon: "../src/assets/logo-us.png",
    badge: "../src/assets/logo-us.png",
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
