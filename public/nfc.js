const firebaseConfig = {
    apiKey: "AIzaSyD8RfBbMBOZ5gbiItctF03xiXBAwF89E64",
    authDomain: "sampahmas-3a4f0.firebaseapp.com",
    databaseURL: "https://sampahmas-3a4f0-default-rtdb.firebaseio.com",
    projectId: "sampahmas-3a4f0",
    storageBucket: "sampahmas-3a4f0.appspot.com",
    messagingSenderId: "719575468814",
    appId: "1:719575468814:web:d526173b23647904b7655f",
    measurementId: "G-1ZPYX2G3TV"
};

firebase.initializeApp(firebaseConfig);

// Function to check the database condition
async function checkDatabaseCondition() {
    return new Promise((resolve, reject) => {
        var dbPath_rfid = 'idRFID/rfid';
        var dbRefRFID = firebase.database().ref().child(dbPath_rfid);

        dbRefRFID.once('value').then(snapshot => {
            const RFIDKU = snapshot.val();
            console.log("RFID Value:", RFIDKU);

            if (RFIDKU === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        }).catch(error => {
            console.error("Error checking database condition:", error);
            reject(error);
        });
    });
}

// Function to automatically redirect based on the condition
async function redirectToScanRFID() {
    try {
        // Check the database condition
        const conditionMet = await checkDatabaseCondition();

        // Redirect based on the condition
        if (conditionMet) {
            window.location.href = 'point.html';
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Interval time in milliseconds (e.g., 5000 for 5 seconds)
const intervalTime = 500;

// Set up an interval to check the condition and redirect
const intervalId = setInterval(() => {
    redirectToScanRFID();
}, intervalTime);

// Stop the interval when the page is unloaded or condition is met
document.addEventListener('DOMContentLoaded', () => {
    // Clear the interval when the page is unloaded
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
});
