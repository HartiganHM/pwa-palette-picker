this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        '/css/fix.css',
        '/css/styles.css',
        '/js/scripts.js',
        '/js/jquery.min.js',
        '/images/Color-Caps-Bottom.svg',
        '/images/Color-Caps-Left.svg',
        '/images/Color-Caps-Right.svg',
        '/images/Color-Caps-Top.svg',
        '/images/Delete-Button-Active.svg',
        '/images/Delete-Button-Default.svg',
        '/images/Delete-Button-Hover.svg',
        '/images/Dropdown-Item.png',
        '/images/Generate-Palette-Active.svg',
        '/images/Generate-Palette-Default.svg',
        '/images/Generate-Palette-Hover.svg',
        '/images/Palette-Picker-Logo.png',
        '/images/paper-background.jpg',
        '/images/Save-Palette-Input.svg',
        '/images/Save-Project-Button-Active.svg',
        '/images/Save-Project-Button-Default.svg',
        '/images/Save-Project-Button-Hover.svg',
        '/images/Save-Project-Input.svg',
        '/images/Select-Project-Dropdown.png',
        '/css/fontello/css/fontello.css',
        '/css/fontello/css/fontello-ie7.css',
        '/css/fontello/css/fontello-ie7-codes.css',
        '/css/fontello/css/fontello-embedded.css',
        '/css/fontello/css/fontello-codes.css',
        '/css/fontello/css/animation.css',
        '/css/fontello/font/fontello.eot',
        '/css/fontello/font/fontello.svg',
        '/css/fontello/font/fontello.ttf',
        '/css/fontello/font/fontello.woff',
        '/css/fontello/font/fontello.woff2'
      ])
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

this.addEventListener('activate', (event) => {
  let cacheWhitelist = ['assets-v1'];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
    .then(() => clients.claim())
  );
});

this.addEventListener('message', (event) => {
  if (event.data.type === 'add-palette') {
    self.registration.showNotification(`${event.data.paletteName} was successfully added!`)
  }
});