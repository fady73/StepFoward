importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCkEJrv0IyBNARUfonqM3mJtA3LnXlohsA',
  projectId: 'stepforward-b4fba',
  messagingSenderId: '888953774658',
  appId: '1:888953774658:web:6895d560ad1f5da81a03db'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  if (Notification.permission === 'granted') {
    if (navigator.serviceWorker)
      navigator.serviceWorker.getRegistration().then(async function (reg) {
        if (reg)
          await reg.showNotification(payload.notification.title, {
            body: payload.notification.body
          });
      });
  }
});
