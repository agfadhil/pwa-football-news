function showNotif(notifTitle, body) {
  const title = notifTitle;
  const options = {
      requireInteraction: true,
      'body': body,
      'icon': './images/favicons/my-icon-192.png',
      'badge': './images/favicons/my-icon-192.png'
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}