import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// Xử lý lỗi khởi động
worker
  .start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  })
  .catch((error) => {
    console.error("Error starting the mock worker:", error);
  });
