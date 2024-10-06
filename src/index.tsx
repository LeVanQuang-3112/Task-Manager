import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { worker } from "./mocks/browser";
import "./index.css";

async function prepare() {
  if (process.env.NODE_ENV === "development") {
    return worker
      .start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      })
      .then(() => {
        console.log("Mock Service Worker started successfully");
      })
      .catch((error) => {
        console.error("Error starting Mock Service Worker:", error);
      });
  }
  return Promise.resolve();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

prepare().then(() => {
  root.render(
    <div>
      <App />
    </div>
  );
});
