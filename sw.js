const cacheName = self.location.pathname
const pages = [

  "/docs/example/",
  "/docs/example/table-of-contents/with-toc/",
  "/docs/example/table-of-contents/without-toc/",
  "/docs/example/table-of-contents/",
  "/docs/example/collapsed/",
  "/posts/",
  "/categories/",
  "/",
  "/categories/Infrastructure/",
  "/posts/Infrastructure/",
  "/categories/OpenStack/",
  "/posts/Infrastructure/OpenStack/",
  "/posts/Infrastructure/OpenStack/%EC%83%88%EA%B8%80/",
  "/categories/Kubernetes/",
  "/posts/Infrastructure/Kubernetes/",
  "/posts/Infrastructure/Kubernetes/%EA%B3%B5%EC%82%AC%EC%A4%91/",
  "/tags/Cloud/",
  "/tags/Cloud-Native/",
  "/tags/K8s/",
  "/tags/Kubernetes/",
  "/tags/",
  "/posts/Infrastructure/Kubernetes/%EA%B3%B5%EC%82%AC%EC%A4%911/",
  "/docs/example/collapsed/3rd-level/4th-level/",
  "/docs/example/collapsed/3rd-level/",
  "/docs/example/hidden/",
  "/docs/shortcodes/",
  "/docs/shortcodes/buttons/",
  "/docs/shortcodes/columns/",
  "/docs/shortcodes/details/",
  "/docs/shortcodes/experimental/",
  "/docs/shortcodes/experimental/asciinema/",
  "/docs/shortcodes/experimental/badges/",
  "/docs/shortcodes/experimental/cards/",
  "/docs/shortcodes/experimental/images/",
  "/docs/shortcodes/hints/",
  "/docs/shortcodes/mermaid/",
  "/docs/shortcodes/section/",
  "/docs/shortcodes/section/first-page/",
  "/docs/shortcodes/section/second-page/",
  "/docs/shortcodes/steps/",
  "/docs/shortcodes/tabs/",
  "/docs/",
  "/docs/shortcodes/katex/",
  "/categories/Infrastructure/Kubernetes/",
  "/categories/Infrastructure/OpenStack/",
  "/showcases/",
  "/book.min.9b33dd6b6ff929ff273d72f8415b7e7ff89eff4def9ce8b7e9c0ebbd384c6409.css",
  "/search/en.data.min.a9f147004a190ac9381a42b3a68be826db407cf953ff2598eef4b372de251571.json",
  "/search/fuse.min.79b054b23b1c37340f8485e869818723de06e1804b01afec9173fa4786505984.js",
  "/search/input.min.81427554c362ede8097cb00ba24df520f6ff789599896ad172263049abcdbc02.js",
  
];

self.addEventListener("install", function (event) {
  self.skipWaiting();

  caches.open(cacheName).then((cache) => {
    return cache.addAll(pages);
  });
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  /**
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  function saveToCache(response) {
    if (cacheable(response)) {
      return caches
        .open(cacheName)
        .then((cache) => cache.put(request, response.clone()))
        .then(() => response);
    } else {
      return response;
    }
  }

  /**
   * @param {Error} error
   */
  function serveFromCache(error) {
    return caches.open(cacheName).then((cache) => cache.match(request.url));
  }

  /**
   * @param {Response} response
   * @returns {Boolean}
   */
  function cacheable(response) {
    return response.type === "basic" && response.ok && !response.headers.has("Content-Disposition")
  }

  event.respondWith(fetch(request).then(saveToCache).catch(serveFromCache));
});
