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

function groupProjectUnit(){
  let output = "";
  output += "<div style=\"color:black\"><form action=\"#\"><br>"
  output += "<h4><b>Unit Name:</b></h4><div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\" style=\"width:100%\">"
  output += "<select class=\"mdl-textfield__input\" id=\"groupProjectUnit\">"
  output += "<option value=\"Select\" hidden>Select</option>";

  db.collection("units").get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      output += "<option value=" + doc.data().unitcode + ">" + doc.data().unitcode + ": " + doc.data().unitname + "</option>"
    })
  })
  .then(() => {
    output += "</select></div><br>"
    output += "<button style=\"margin:auto;width:200px;height:auto;display:block;\" class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"groupProjectProject()\">Filter</button>"
    document.getElementById("addContributionsFormUnit").innerHTML = output;
  })
}

function groupProjectProject(){
  let unitSelection = document.getElementById('groupProjectUnit').value;
  let output = ""
  output += "<h4><b>Project Name:</b></h4><div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\" style=\"width:100%\">"
  output += "<select class=\"mdl-textfield__input\" id=\"groupProjectProject\">"
  output += "<option value=\"Select\" hidden>Select</option>";

  db.collection("projects").where("unitcode", "==", unitSelection).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      output += "<option value=" + doc.data().projectid + ">" + doc.data().projectid + ": " + doc.data().projname + "</option>"
    })
  })
  .then(() => {
    output += "</select></div><br>"
    document.getElementById("addContributionsFormProject").innerHTML = output;
  })

  // output += "<h4><b>Students:</b></h4><div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\" style=\"width:100%\">"
  // output += "<input class=\"mdl-textfield__input\" type=\"number\" id=\"j-hours\" pattern=\"[A-Z,a-z,0-9, ]*\">"
  // output += "<label class=\"mdl-textfield__label\" for=\"j-source\">Hours Contributed</label>"
  // output += "<span class=\"mdl-textfield__error\">Letters, numbers and spaces only</span></div><br></form></div>"
  // document.getElementById("addContributionsFormProject").innerHTML = output;
}

groupProjectUnit();
// groupProjectProject();
