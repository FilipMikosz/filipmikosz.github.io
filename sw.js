const CACHE_NAME = `fake-peka-cache`;

// Use the install event to pre-cache all initial resources.

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/css/style2.css',
            '/html/my_account.html',
            '/html/ticket_control.html',
            '/js/script.js',
            // '/src/icons/buy_ticket.svg',
            // '/src/icons/buy_ticket.svg',
            // '/src/icons/chevron-left-solid.svg',
            // '/src/icons/contact.svg',
            // '/src/icons/history.svg',
            // '/src/icons/home.jpg',
            // '/src/icons/home_selected.jpg',
            // '/src/icons/icon192.png',
            // '/src/icons/icon512.png',
            // '/src/icons/my_account.svg',
            // '/src/icons/my_account_selected.svg',
            // '/src/img/peka_logo.png',
            // '/src/img/mikolaj.jpg',
            // '/src/img/qr_code.png',
        ]);
    })());
});

self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // Get the resource from the cache.
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // If the resource was not in the cache, try the network.
                const fetchResponse = await fetch(event.request);

                // Save the resource in the cache and return it.
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // The network failed.
            }
        }
    })());
});