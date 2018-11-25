// ссылки на кэшируемые файлы
const cacheUrls = [
    '/src/',
];

// наименование для нашего хранилища кэша
const { assets } = global.serviceWorkerOption;

const CACHE_NAME = new Date().toISOString();

let assetsToCache = [...assets, './', '/favicon.ico'];

console.log("ASSS: ", assetsToCache);

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
                return cache.addAll(assetsToCache);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

// this.addEventListener('fetch', (event) => {
//
//     /** online first */
//     if (navigator.onLine) {
//         return fetch(event.request);
//     }
//
//     /** cache first */
//     event.respondWith(
//         // ищем запрашиваемый ресурс в хранилище кэша
//         caches
//             .match(event.request)
//             .then((cachedResponse) => {
//                 // выдаём кэш, если он есть
//                 if (cachedResponse) {
//                     return cachedResponse;
//                 }
//
//                 return fetch(event.request);
//             })
//             .catch((err) => {
//                 console.error('smth went wrong with caches.match: ', err);
//             })
//     );
// });