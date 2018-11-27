// наименование для нашего хранилища кэша

const CACHE_NAME = 'indigo_serviceworker_v_1';
// const MAX_AGE = 300;

// const { assets } = global.serviceWorkerOption;
//
// let assetsToCache = [...assets.map( asset => "/build" + asset)];
let assetsToCache = [
    '/',
    '/sign_up',
    '/sign_in',
    '/leaders',

    '/build/main.bundle.js',
];


// assetsToCache = assetsToCache.map(path => {
//     return new URL(path, global.location).toString();
// });



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

self.addEventListener('fetch', (event) => {
    console.log("LISTEN");
    /** online first */
    if (navigator.onLine) {
        return fetch(event.request);
    }

    /** cache first */
    console.log("From cache");
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches
            .match(event.request)
            .then((cachedResponse) => {
                // выдаём кэш, если он есть
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.match: ', err);
            })
    );
});
