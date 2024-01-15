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
    try {
        const dbPathRFID = 'idRFID/rfid';
        const dbRefRFID = firebase.database().ref(dbPathRFID);

        const snapshotRFID = await dbRefRFID.once('value');
        const RFIDKU = snapshotRFID.val();
        console.log("RFID Value:", RFIDKU);

        if (RFIDKU === 0) {
            return false;
        }

        // CARI UID BY RFID
        const conditionMet = await findUserByRFID(RFIDKU);

        if (conditionMet) {
            var dbPathStartCount = 'idCOUNTER/start';
            var dbRefStartCount = firebase.database().ref().child(dbPathStartCount);
            dbRefStartCount.set("on");
        }

        return conditionMet;
    } catch (error) {
        console.error("Error checking database condition:", error);
        throw error;
    }
}

async function findUserByRFID(rfidToFind) {
    try {
        const usersRef = firebase.database().ref('users');
        const snapshotUsers = await usersRef.once('value');

        let conditionMet = false;

        snapshotUsers.forEach(userSnapshot => {
            const user = userSnapshot.val();

            // Check if the user has the matching RFID
            if (user.rfid === rfidToFind) {
                console.log("Matching RFID found:", user.rfid);
                const uid = userSnapshot.key; // Get the UID
                console.log("SAMA! - UID:", uid);
                // Set value in 'idCOUNTER/start' path
                const dbPathStartCount = 'idCOUNTER/start';
                const dbRefStartCount = firebase.database().ref(dbPathStartCount);
                dbRefStartCount.set("on");
                
                conditionMet = true;

            } else {
                // console.log("RFID tidak sama - UID:", user.uid);
            }
        });

        return conditionMet;
    } catch (error) {
        console.error("Error searching for user:", error);
        throw error;
    }
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
        console.error("Error DATABASENYA:", error);
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
