// 'use client'

// import { getMessaging, getToken } from 'firebase/messaging';
// import { useEffect, useState } from 'react';

// import firebase_app from './utils/config';

// const useFcmToken = () => {
//   const [token, setToken] = useState('');
//   const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

//   useEffect(() => {
//     const retrieveToken = async () => {
//       try {
//         if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//           const messaging = getMessaging(firebase_app);

//           // Request notification permission
//           const permission = await Notification.requestPermission();
//           setNotificationPermissionStatus(permission);

//           if (permission === 'granted') {
//             const currentToken = await getToken(messaging, {
//               vapidKey: 'YOUR_VAPID_KEY', // Replace with your Firebase project's VAPID key
//             });
//             if (currentToken) {
//               setToken(currentToken);
//             } else {
//               console.log('No registration token available. Request permission to generate one.');
//             }
//           }
//         }
//       } catch (error) {
//         console.log('Error retrieving token:', error);
//       }
//     };

//     retrieveToken();
//   }, []);

//   return { fcmToken:token, notificationPermissionStatus };
// };

// export default useFcmToken;