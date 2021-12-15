importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCPmCF5tpc8JqtCsY5Jndeki2353RWNTcg',
  authDomain: 'film4u-83b5d.firebaseapp.com',
  projectId: 'film4u-83b5d',
  storageBucket: 'film4u-83b5d.appspot.com',
  messagingSenderId: '1081604991906',
  appId: '1:1081604991906:web:ee3348c5d9eb38ddf760fb',
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.title,
    icon: 'https://pbs.twimg.com/media/EkKR_PrWoAACTKn.jpg',
  };

  self.registration.showNotification(notificationTitle,
      notificationOptions).finally();
});
