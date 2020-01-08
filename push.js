var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIxGtzgStgVUQbMKd8ahYyB1Pq0WKnNtsx62PZAzULVukBnTdYCOGYAtRc1kbWGq22LaApLbj2UWK_8mY-PaDzY",
   "privateKey": "68XmaSdgB9d2xZjz4LHmtS-6uw1SM4yt69C9QySoiQw"
};
 
webPush.setVapidDetails(
   'mailto:test@afadhil.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eOc5dvKdKfo:APA91bFExEDU3N6J0KPWWPQ7vNln69a02R-fdCYlcoo8xOTSeRcXTO4U8rDl6I1mYaaLofCU-ZlAsBdhE0QqpnryEPMAACfLgkkmn7RfMyvBuLXRpoC9F22Pg49ueOhWAPj3PBrtsM2S",
   "keys": {
       "p256dh": "BJ4I0oQsBViwWhj8h0SKFf44MP0RcxYx8qfY73KEIMr6PMn2rtoNhh0DAqVvPlkrCsui7LbBkxL0/bNPS2LKE8A=",
       "auth": "DtkJwGr9OqHY8xumAIbx5A=="
   }
};
var payload = "Pretty cool! this was from web-push that I\'m configured.";
 
var options = {
   gcmAPIKey: '635580780494',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);