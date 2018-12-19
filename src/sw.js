// наименование для нашего хранилища кэша

const CACHE_NAME = 'indigo_serviceworker_v_1';
// const MAX_AGE = 300;

const {assets} = global.serviceWorkerOption;
//
let assetsToCache = [...assets.map(asset => "/build" + asset), '/', '/build/images/favicon.ico'];

self.addEventListener('install', (event) => {
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    console.log("ASSS: ", assetsToCache);

    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
            .then((cache) => {
                // загружаем в наш cache необходимые файлы
                console.log("loading...");
                return cache.addAll(assetsToCache);

            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

self.addEventListener('fetch', event => {
    /** online first */
    if (event.request.method !== 'GET') return;
    event.respondWith(
        caches.match(event.request).then(
            (cachedResponse = {}) => {
                if (navigator.onLine) {
                    return fetch(event.request.clone()).then(response => {
                        // при неудаче всегда можно выдать ресурс из кэша
                        if (!response) {
                            return cachedResponse;
                        }
                        // обновляем кэш
                        caches.open(CACHE_NAME).then(cache => {
                            if (event.request) {
                                cache.put(event.request, response.clone());
                            }
                        });
                        // возвращаем свежий ресурс
                        return response.clone();
                    }).catch(() => {
                        return cachedResponse;
                    });
                }

                return cachedResponse;
            }
        )
    );
});
