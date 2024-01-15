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

// ambil qr
// script.js file 

function domReady(fn) { 
	if ( 
		document.readyState === "complete" || 
		document.readyState === "interactive"
	) { 
		setTimeout(fn, 1500); 
	} else { 
		document.addEventListener("DOMContentLoaded", fn); 
	} 
} 

domReady(function () { 

	// If found you qr code 
	function onScanSuccess(decodeText, decodeResult) { 
		// alert("You Qr is : " + decodeText, decodeResult); 
		console.log(decodeText); //ini UID NYA
		// console.log(decodeResult);
        const dbPathQRCode = 'idQR/qrcode';
                const dbPathQRCodeku = firebase.database().ref(dbPathQRCode);
                dbPathQRCodeku.set(decodeText);
                
	} 

	let htmlscanner = new Html5QrcodeScanner( 
		"my-qr-reader", 
		{ fps: 10, qrbos: 250 } 
	); 
	htmlscanner.render(onScanSuccess); 
    

});




async function checkDatabaseCondition() {
    try {
        const dbPathQR = 'idQR/qrcode';
        const dbRefQR = firebase.database().ref(dbPathQR);

        const snapshotQR = await dbRefQR.once('value');
        const QR = snapshotQR.val();
        console.log("qrcode Value:", QR);


        const usersRef = firebase.database().ref('users');
        const snapshotUsers = await usersRef.once('value');

        let conditionMet = false;

        snapshotUsers.forEach(userSnapshot => {
            const user = userSnapshot.val();

            if (user.uid === QR) {
                console.log("Matching UID found:", user.uid);
                const uid = userSnapshot.key; // Get the UID
                console.log("SAMA! - UID:", uid);

                // Set value in 'idCOUNTER/start' path
                const dbPathStartCount = 'idCOUNTER/start';
                const dbRefStartCount = firebase.database().ref(dbPathStartCount);
                dbRefStartCount.set("on");

                conditionMet = true;
                
            }
            
        });
        
        return conditionMet;
    } catch (error) {
        console.error("Error checking database condition:", error);
        throw error;
    }
}

async function redirectToScanQR() {
    try {
        const conditionMet = await checkDatabaseCondition();

        if (conditionMet) {
            window.location.href = 'point.html';
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

const intervalTime = 1000;
const intervalId = setInterval(redirectToScanQR, intervalTime);


document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
});
