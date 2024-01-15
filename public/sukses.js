document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the button
    var continueButton = document.getElementById('continueButton'); // Replace with the actual button ID
    if (continueButton) {
        continueButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior of the link

            // Set the RFID value to 0
            var dbPath_rfid = 'idRFID/rfid';
            var dbRefRFID = firebase.database().ref().child(dbPath_rfid);
            dbRefRFID.set(0);

            // Set the QR code value to "none"
            var dbPath_qr = 'idStart/start';
            var dbRefQR = firebase.database().ref().child(dbPath_qr);
            dbRefQR.set("none");


            // set nilai start off or on
            var dbPath_start = 'idStart/start';
            var dbRefStart = firebase.database().ref().child(dbPath_start);
            dbRefStart.set("off");

            // // Set the RFID value to 0
            // var dbPath_counter = 'idCOUNTER/counter';
            // var dbRefCOUNT = firebase.database().ref().child(dbPath_counter);
            // dbRefCOUNT.set(0);

            // Redirect to success.html
            window.location.href = 'success.html';
        });
    }
});
