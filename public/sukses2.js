
    // document.addEventListener('DOMContentLoaded', function () {
    //   // Add an event listener to the button
    //   var continueButton = document.getElementById('continueButton'); // Replace with the actual button ID
    //   if (continueButton) {
    //     continueButton.addEventListener('click', function (event) {
    //       event.preventDefault(); // Prevent the default behavior of the link

    // Set the RFID value to 0

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
    var dbPath_rfid = 'idRFID/rfid';
    var dbRefRFID = firebase.database().ref().child(dbPath_rfid);
    dbRefRFID.set(0);

    // Set the QR code value to "none"
    var dbPath_qr = 'idQR/qrcode';
    var dbRefQR = firebase.database().ref().child(dbPath_qr);
    dbRefQR.set("none");

    // Set the RFID value to 0
    var dbPath_counter = 'idCOUNTER/counter';
    var dbRefCOUNT = firebase.database().ref().child(dbPath_counter);
    dbRefCOUNT.set(0);

    // set nilai start off or on
    var dbPath_start = 'idStart/start';
    var dbRefStart = firebase.database().ref().child(dbPath_start);
    dbRefStart.set("on");


    var dbPath_start_count = 'idCOUNTER/start';
    var dbRefStart_Count = firebase.database().ref().child(dbPath_start_count);
    dbRefStart_Count.set("off");





    // Set a timeout of 5 seconds (5000 milliseconds)
    setTimeout(function () {
      // Redirect to index.html
      dbRefStart.set("off");
      window.location.href = 'index.html';
    }, 5000);



