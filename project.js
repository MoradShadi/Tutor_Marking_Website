"use strict"
const USER_INFO = "USER INFO";
const PROJECT_INDEX = "PROJECT INDEX";

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

/**
* This method is used to obtain the user info (which is basically the
* basic information that the user has provided during registration) that has
* been previously saved in the browser's local storage in the login page).
*/
function retrieveUserInfo()
{
  if(typeof (Storage) !== 'undefined')
  {
    if(localStorage.getItem(USER_INFO) != undefined)
    {
      let data = JSON.parse(localStorage.getItem(USER_INFO));
      return data;
    }
  }
  else
  {
    alert ('local storage is no supported in current browser')
  }
}

function retrieveProjectIndex()
{
  if(typeof (Storage) !== 'undefined')
  {
    if(localStorage.getItem(PROJECT_INDEX) != undefined)
    {
      let data = JSON.parse(localStorage.getItem(PROJECT_INDEX));
      return data;
    }
  }
  else
  {
    alert ('local storage is no supported in current browser')
  }
}

function test(){
  let output = retrieveProjectIndex();
  let user = retrieveUserInfo();
  let projects = user.projects.split(", ");
  console.log(projects[output]);
  document.getElementById("temp").innerHTML = projects[output];
}

function displayProjInfo(){
  let output = retrieveProjectIndex();
  let user = retrieveUserInfo();
  let projects = user.projects.split(", ");
  let ret = "";

  db.collection("projects").where("projectid", "==", projects[output])
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      ret += "<b>Unit name:</b> " + doc.data().unitname + "<br>"
      ret += "<b>Project name:</b> " + doc.data().projname + "<br>"
      ret += "<b>Weightage:</b> " + doc.data().weightage + "<br>"
      ret += "<b>Group member:</b> <br>"
      ret += "<b>Progress:</b> <br>"
      document.getElementById("projectinfo").innerHTML = ret;
    });
  })
}
// test();
displayProjInfo();

var dialog = document.querySelector('dialog');
var showModalButton = document.querySelector('.add-task');
if (! dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}
showModalButton.addEventListener('click', function() {
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function() {
  dialog.close();
});
dialog.querySelector('.submit').addEventListener('click', function() {
  var snackbarContainer = document.querySelector('#demo-toast-example');
  var data = {message: 'Task has been added.'};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  dialog.close();
});
