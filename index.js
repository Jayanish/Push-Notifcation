// Check if the browser supports push notifications
if ('Notification' in window && 'serviceWorker' in navigator) {
    console.log("Push Notifications are supported.");

    // Register Service Worker
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        console.log("Service Worker Registered:", registration);

        // Check if the user has already granted permission
        if (Notification.permission === "granted") {
            console.log("Notification permission granted.");
        }
        
        // Event Listener for the "Enable Push Notifications" button
        document.getElementById('notify-btn').addEventListener('click', function() {
            requestNotificationPermission();
        });
        
        // Request permission to send notifications
        function requestNotificationPermission() {
            Notification.requestPermission().then(function(permission) {
                if (permission === 'granted') {
                    console.log("Notification permission granted.");
                    subscribeUserToPushNotifications(registration);
                } else {
                    console.log("Notification permission denied.");
                }
            });
        }

        // Subscribe the user to Push Notifications
        function subscribeUserToPushNotifications(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY') // Replace with your VAPID Public Key
            })
            .then(function(subscription) {
                console.log('User is subscribed:', subscription);
            })
            .catch(function(error) {
                console.error('Failed to subscribe the user:', error);
            });
        }

    }).catch(function(error) {
        console.error("Service Worker registration failed:", error);
    });

} else {
    console.log("Push Notifications are not supported in this browser.");
}

// Convert VAPID Public Key to Uint8Array (for subscription)
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
