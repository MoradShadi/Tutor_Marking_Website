// The web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBkFkeWNjzZkDePYrpzruJfaX3xfrC-pM",
  authDomain: "fit2101-39981.firebaseapp.com",
  databaseURL: "https://fit2101-39981.firebaseio.com",
  projectId: "fit2101-39981",
  storageBucket: "fit2101-39981.appspot.com",
  messagingSenderId: "129241193378",
  appId: "1:129241193378:web:083e6a8c6401664204f0fb",
  measurementId: "G-MPSCGG6ELN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function displayStudents(){
  output = "";
  output += "<table class=\"mdl-data-table mdl-js-data-table\">"
  output += "<thead><tr><th>No.</th><th class=\"mdl-data-table__cell--non-numeric\">Username</th>"
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Email</th>"
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Current projects</th></tr></thead><tbody>"

  num = 1
  db.collection("users").get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      output += "<tr><td>"+ num + "</td>"
      output += "<td class=\"mdl-data-table__cell--non-numeric\">" + doc.data()['username'] + "</td>"
      output += "<td class=\"mdl-data-table__cell--non-numeric\">" + doc.data()['email'] + "</th>"
      output += "<td class=\"mdl-data-table__cell--non-numeric\">" + doc.data()['projects'] + "</th></tr>"
      num += 1

    })
  })
  .then(() => {
    output += "</tbody></table>";
    document.getElementById("studentListArea").innerHTML = output;
  })
}

displayStudents();
