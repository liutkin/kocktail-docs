importScripts("/kocktail-docs/precache-manifest.5db124172835c852d8ba1c4c071d7cdd.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// service-worker.js

workbox.core.setCacheNameDetails({ prefix: "d4" });

workbox.skipWaiting();
workbox.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

const LATEST_VERSION = "v2.2";
self.addEventListener("activate", event => {
  console.log(`%c ${LATEST_VERSION} `, "background: #ddd; color: #0000ff");
  if (caches) {
    caches.keys().then(arr => {
      arr.forEach(key => {
        if (key.indexOf("d4-precache") < -1) {
          caches.delete(key).then(() => console.log(`%c Cleared ${key}`, "background: #333; color: #ff0000"));
        } else {
          caches.open(key).then(cache => {
            cache.match("version").then(res => {
              if (!res) {
                cache.put("version", new Response(LATEST_VERSION, { status: 200, statusText: LATEST_VERSION }));
              } else if (res.statusText !== LATEST_VERSION) {
                caches
                  .delete(key)
                  .then(() => console.log(`%c Cleared Cache ${LATEST_VERSION}`, "background: #333; color: #ff0000"));
              } else
                console.log(
                  `%c Great you have the latest version ${LATEST_VERSION}`,
                  "background: #333; color: #00ff00"
                );
            });
          });
        }
      });
    });
  }
});

