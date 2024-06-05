async function registerServiceWorker() {
  if (typeof window !== "undefined") {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register("/sw.js");
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        const sw = await navigator.serviceWorker.ready;
        sw.showNotification("Welcome to Berbereen, my Friend!", {
          body: "We warmly welcome you to Berbereen, the platform of Berbereenians.",
          icon: "/icon-96.png",
          requireInteraction: true,
          badge: "/icon-96.png",
        });
      }
      console.log("Service Worker registration successful:");
    }
  }
}
registerServiceWorker();
