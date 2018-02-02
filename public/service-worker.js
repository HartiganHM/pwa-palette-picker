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
        '/images/buttons/Delete-Button-Active.png',
        '/images/buttons/Delete-Button-Default.png',
        '/images/buttons/Delete-Button-Hover.png',
        '/images/Dropdown-Item.png',
        '/images/buttons/Generate-Palette-Active.png',
        '/images/buttons/Generate-Palette-Default.png',
        '/images/buttons/Generate-Palette-Hover.png',
        '/images/Palette-Picker-Logo.png',
        '/images/paper-background.jpg',
        '/images/Save-Palette-Input.svg',
        '/images/buttons/Save-Project-Button-Active.png',
        '/images/buttons/Save-Project-Button-Default.png',
        '/images/buttons/Save-Project-Button-Hover.png',
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