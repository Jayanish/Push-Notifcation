// Install event for Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker Installed');
});

// Activate event for Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker Activated');
});

// Push event to show notification
self.addEventListener('push', event => {
    let data = event.data ? event.data.json() : {};
    
    // Set default notification options
    const title = data.title || 'New Product Available!';
    const options = {
        body: data.body || 'Check out our latest products now.',
        icon: data.icon || 'https://via.placeholder.com/100',
        badge: data.badge || 'https://via.placeholder.com/50',
        click_action: data.click_action || '/'
    };

    // Show the notification
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click event to handle user interaction
self.addEventListener('notificationclick', event => {
    event.notification.close();

    // Open the store or product page on click
    event.waitUntil(
        clients.openWindow(event.notification.click_action)
    );
});
