const cacheName = self.location.pathname
const pages = [

  "/docs/example/",
  "/docs/example/table-of-contents/with-toc/",
  "/docs/example/table-of-contents/without-toc/",
  "/posts/creating-a-new-theme-copy-10/",
  "/posts/creating-a-new-theme-copy-11/",
  "/posts/creating-a-new-theme-copy-2/",
  "/posts/creating-a-new-theme-copy-3/",
  "/posts/creating-a-new-theme-copy-4/",
  "/posts/creating-a-new-theme-copy-5/",
  "/posts/creating-a-new-theme-copy-6/",
  "/posts/creating-a-new-theme-copy-7/",
  "/posts/creating-a-new-theme-copy-8/",
  "/posts/creating-a-new-theme-copy-9/",
  "/posts/creating-a-new-theme-copy/",
  "/posts/creating-a-new-theme/",
  "/posts/migrate-from-jekyll/",
  "/docs/example/table-of-contents/",
  "/docs/example/collapsed/",
  "/",
  "/posts/",
  "/posts/goisforlovers/",
  "/categories/",
  "/categories/Development/",
  "/tags/development/",
  "/posts/hugoisforlovers/",
  "/tags/go/",
  "/categories/golang/",
  "/tags/golang/",
  "/tags/hugo/",
  "/tags/",
  "/tags/templates/",
  "/tags/themes/",
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
  "/categories/Development/golang/",
  "/docs/shortcodes/katex/",
  "/showcases/",
  "/book.min.e15861d9f623fd0f1f9fa98b43b6fae001006201df270178e259820c2cfc07ed.css",
  "/en.search-data.min.acad26e1bdc9cc7bd824e07d161f41cc5497f24ad753b6a5c96094eac71f5702.json",
  "/en.search.min.174f4a3a9d0fb298cb91ca22cec5c290c8cb1aa753757bd39de54e217884d2ec.js",
  
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
