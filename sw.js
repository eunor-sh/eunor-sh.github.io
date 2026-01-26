const cacheName = self.location.pathname
const pages = [

  "/docs/example/",
  "/docs/example/table-of-contents/with-toc/",
  "/docs/example/table-of-contents/without-toc/",
  "/categories/Development/golang/creating-a-new-theme-copy-2/",
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
  "/categories/",
  "/posts/goisforlovers-copy-10/",
  "/posts/goisforlovers-copy-11/",
  "/posts/goisforlovers-copy-12/",
  "/posts/goisforlovers-copy-2/",
  "/posts/goisforlovers-copy-3/",
  "/posts/goisforlovers-copy-4/",
  "/posts/goisforlovers-copy-5/",
  "/posts/goisforlovers-copy-6/",
  "/posts/goisforlovers-copy-7/",
  "/posts/goisforlovers-copy-8/",
  "/posts/goisforlovers-copy-9/",
  "/posts/goisforlovers-copy/",
  "/posts/goisforlovers/",
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
  "/categories/Development/jekyll/",
  "/docs/shortcodes/katex/",
  "/showcases/",
  "/book.min.96db359ff030de9851c87ef83e42c88b754d86e2fd124d0b4798f4c414789a8b.css",
  "/search/en.data.min.69e089f0ab48cae2adaace72029bccf363252b81bdb23468770d79b56c92bea6.json",
  "/search/fuse.min.043710fe7516bff8d49b5dd9e3d9f4ee75c6f9a0bfb6d92304a1d0a51272b4be.js",
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
