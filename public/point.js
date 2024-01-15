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


    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // rfid
    var dbPath_rfid = 'idRFID/rfid';
    var dbRefRFID = firebase.database().ref().child(dbPath_rfid);
    dbRefRFID.once('value').then(snapshot => {
        const RFIDKU_string = snapshot.val();
        const RFIDKU = parseInt(RFIDKU_string, 10);
        console.log("RFID Value:", RFIDKU);
        
        // CARI UID BY RFID
        findUserByRFID(RFIDKU);
    });

    // QRCODE
    var dbPath_qr = 'idQR/qrcode';
    var dbRefQR = firebase.database().ref().child(dbPath_qr);
    dbRefQR.once('value').then(snapshot => {
        const QR_CODE = snapshot.val();
        if(QR_CODE != 0){
            updateUIDInUI(QR_CODE);
            console.log("QR CODE", QR_CODE);
        }
        
    });

    function findUserByRFID(rfidToFind) {
        var usersRef = firebase.database().ref('users');
        
        usersRef.once('value').then(snapshot => {
            snapshot.forEach(userSnapshot => {
                const user = userSnapshot.val();
                
                // Check if the user has the matching RFID
                if (user.rfid === rfidToFind) {
                    console.log("halo", user.rfid);
                    const uid = userSnapshot.key; // Get the UID
                    console.log("SAMA! - UID:", uid);
                    updateUIDInUI(uid);
                    return true;
                } else {
                    // console.log("RFID tidak sama - UID:", user.uid);
                    
                }
            });
        }).catch(error => {
            console.error("Error searching for user:", error);
        });
    }

    function updateUIDInUI(uid) {
        // ambil nama
        var dbPath_nama = 'users/' + uid + '/name';
        var dbRefNama = firebase.database().ref().child(dbPath_nama);

        // UPDATE HTML NAMA
        var nama = document.getElementById('nama');
        dbRefNama.once('value', snap => {
            var valueNama = snap.val();
            console.log("nama : " + valueNama);
            nama.innerText = valueNama;
        });

        // AMBIL POIN
        var dbPath = 'users/' + uid + '/points';
        var dbRef = firebase.database().ref().child(dbPath);

        // UPDATE HTML POINT
        var poin = document.getElementById('poin');

        dbRef.once('value', snap => {
            var valuePoint = snap.val();
            console.log("point awal anda : " + valuePoint);
            
            
                poin.innerText = "point awal andaa : " + valuePoint;
                // counternya dan point
                var dbPath_count = 'idCOUNTER/counter';
                var dbRefCount = firebase.database().ref().child(dbPath_count);

                dbRefCount.on('value', snap => {
                    let count = snap.val();
                    var counter = document.getElementById('counter');
                    
                    counter_total = count * 100;
                    counter.innerText = "+" + counter_total;
                    console.log(counter_total);

                    if(uid){
                        var dbPath_point = 'users/' + uid + '/points';
                        totalSemua = counter_total + valuePoint;
                        console.log("total anda : " + totalSemua);
                        firebase.database().ref(dbPath_point).set(totalSemua)
                        .then(() => {
                            totalSemua = 0;
                            console.log('Point updated successfully.');
                        })
                        .catch(error => {
                            console.error('Error updating point:', error);
                        });
                    }
                    
                });
                
                
            });

        
    }


