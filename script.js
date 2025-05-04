const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Endpoint to fetch user notification preferences
app.get('/api/notifications/preferences/:userId', (req, res) => {
    const userId = req.params.userId;
    // Fetch preferences from database
    res.json({ userId, frequency: "low", categories: ["offers", "updates"] });
});

// Endpoint to update preferences
app.post('/api/notifications/preferences', (req, res) => {
    const { userId, preferences } = req.body;
    // Save preferences to database
    res.json({ message: "Preferences updated successfully", preferences });
});

app.listen(3000, () => console.log("Server running on port 3000"));

push notification
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

const sendNotification = (token, message) => {
    const payload = {
        notification: {
            title: message.title,
            body: message.body,
        },
        token: token,
    };

    admin.messaging().send(payload)
        .then((response) => console.log('Notification sent:', response))
        .catch((error) => console.error('Error sending notification:', error));
};
