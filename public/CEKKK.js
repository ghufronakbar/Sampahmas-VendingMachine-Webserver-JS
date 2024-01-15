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
                var dbPath_start_count = 'idCOUNTER/start';
                var dbRefStart_Count = firebase.database().ref().child(dbPath_start_count);
                dbRefStart_Count.set("on");

            }
        }).catch(error => {
            console.error("Error checking database condition:", error);
            reject(error);
        });
    });
}