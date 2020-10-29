"use strict"
const USER_INFO = "USER INFO";
const GROUP_INDEX = "GROUP INDEX";
const UNIT_INDEX = "UNIT INDEX";
const PROJECT_CODE = "PROJECT CODE";
const PROJECT_INDEX = "PROJECT INDEX";
const GROUP_ID = "GROUP ID";

let taskInput = ""
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

/**
* This method is used to obtain the index of the project that has
* been previously clicked by the user (and saved in local storage)
* in the projectslist page.
*/
function retrieveProjectCode()
{
  if(typeof (Storage) !== 'undefined')
  {
    if(localStorage.getItem(PROJECT_CODE) != undefined)
    {
      return localStorage.getItem(PROJECT_CODE);
    }
  }
  else
  {
    alert ('local storage is no supported in current browser')
  }
}

function retrieveGroupID()
{
  if(typeof (Storage) !== 'undefined')
  {
    if(localStorage.getItem(GROUP_ID) != undefined)
    {
      return localStorage.getItem(GROUP_ID);
    }
  }
  else
  {
    alert ('local storage is no supported in current browser')
  }
}

/**
* This method is used to display the project info at the top of the
* page. It searches the firestore database for the project with the same id
* and retrieves the information from there.
*/
function displayProjInfo(){
  let ret = "";

  db.collection("projects").where("projectid", "==", projCode)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      ret += "<b>Unit name:</b> " + doc.data().unitname + "<br>"
      ret += "<b>Project name:</b> " + doc.data().projname + "<br>"
      ret += "<b>Weightage:</b> " + doc.data().weightage + "<br>"
      ret += "<b>Progress:</b> <br>"
      document.getElementById("projectinfo").innerHTML = ret;
    });
  })
}

/**
* This method is used to display the table for the contributions that
* has been inputted by the group into their project. It searches the
* group database to find the current user's group, then prints out the
* contributions that are recorded in it.
*/
function printTable(){
  let output = "";
  output += "<tbody>"
  output += "<table class=\"mdl-data-table mdl-js-data-table\">"
  output += "<thead>"
  output += "<tr>"
  output += "<th>No.</th>"
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Task Name</th>"
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Member</th>"
  output += "<th>Hours contributed</th>"
  output += "<th class=\"mdl-data-table__cell--non-numeric\">Remarks</th>"
  output += "</tr>"
  output += "</thead>"

  // Searches the database based on the username to find the group
  db.collection("groups").where("members", "array-contains", user.username).where("groupid", "==", groupID)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      for (let i = 0; i < doc.data().contributions.length; i++ ){
        output += "<tr>"
        output += "<td>" + (i+1) + "</td>"
        output += "<td class=\"mdl-data-table__cell--non-numeric\">" + doc.data().contributions[i].taskname + "</td>"
        output += "<td class=\"mdl-data-table__cell--non-numeric\">" + doc.data().contributions[i].members + "</td>"
        output += "<td>" + doc.data().contributions[i].hours + "</td>"
        output += "<td class=\"mdl-data-table__cell--non-numeric\">" + doc.data().contributions[i].remarks + "</td>"
        output += "</tr>"

        // Display once we reach the end of the loop.
        if(i == doc.data().contributions.length - 1){
          output += "</tbody>"
          output += "</table>"
          document.getElementById("tablecontent").innerHTML = output;
        }
      }
    });
  })
}

/**
This method loads the tasks that has been recorded in the firestore.
The method will receive tasks from the firestore
and prints them in a table form in the project page
*/
function printTask()
{
  //building the table
  let stringOutput = ""
  stringOutput += '<table id="task-table" class="mdl-data-table mdl-js-data-table">'
  stringOutput += '<thead><tr><th style="width: 15%">No.</th><th class="mdl-data-table__cell--non-numeric">Task Name</th>  <th class="mdl-data-table__cell--non-numeric">Description</th>'
  stringOutput += '<th class="mdl-data-table__cell--non-numeric">Task Name</th></tr></thead><tbody>'
  //searches the database based on the username to find the group
  db.collection("groups").where("members", "array-contains", user.username).where("groupid", "==", groupID)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      let tempName = [];
      let tempDesc = [];
      for (let i = 0; i < doc.data().tasks.length; i++){
        stringOutput += '<tr><td>' + (i+1) + '</td><td class="mdl-data-table__cell--non-numeric">'
        stringOutput += doc.data().tasks[i]
        stringOutput += '</td><td class="mdl-data-table__cell--non-numeric">'
        stringOutput += doc.data().tasksdesc[i]
        stringOutput += '</td><td class="mdl-data-table__cell--non-numeric">'
        stringOutput += "<button type = \"button\" class=\"mdl-button mdl-js-button mdl-button--raised\" onclick=\"deleteTask(" + i + ")\"> Delete </button>"
        // stringOutput += '<button type="button" class="mdl-button mdl-js-button mdl-button--raised" onclick = "deleteTask(" + i + ")">Delete</button>'

        //displays information once we reach the end of the loop
        if(i == doc.data().tasks.length - 1){
          stringOutput += "</tbody>"
          stringOutput += "</table>"
          document.getElementById("tasktablecontent").innerHTML += stringOutput;
        }
      }
    });
  })

}

/*
This method is used for recording the input task selected by users
**/
function selectTask(selected)
{
  taskInput = selected[selected.selectedIndex].text
}

/*
This method is used for displaying the drop down list of the available tasks
to the user in the form of contribution
**/
function displayTask()
{
  //searches the database based on the username to find the group
  db.collection("groups").where("members", "array-contains", user.username).where("groupid", "==", groupID)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      //building the selection option
      let tasksDropDowninnerHTML = "<option value='Select' hidden>Select</option>";
      for (let i = 0; i < doc.data().tasks.length; i++){
        tasksDropDowninnerHTML += "<option value=" + i + ">" + doc.data().tasks[i] + "</option>";
      }
      document.getElementById('task').innerHTML = tasksDropDowninnerHTML
    });
  })
}

/*
this method takes in the fields of values typed/selected by the user and updates it
in the database.
**/
function addContributions()
{
  let taskName = taskInput
  let hoursTaken = document.getElementById('j-hours').value;
  let remarks = document.getElementById('j-remarks').value;
  //searches the database based on the username to find the group
  db.collection("groups").where("members", "array-contains", user.username).where("groupid", "==", groupID)
  .get()
  .then(function(querySnapshot) {

    querySnapshot.forEach(function (doc) {
      let tempContri = []
      //looping to build the array which holds the values of contributions
      for (let i = 0; i < doc.data().contributions.length; i++){
        tempContri.push(doc.data().contributions[i])
      }
      let value = {
        hours: hoursTaken,
        members: user.username,
        remarks: remarks,
        taskname: taskName
      }
      tempContri.push(value)
      //updating the contributions field with the tempcontri array
      db.collection("groups").doc(doc.id).update({
        contributions: tempContri
      })
      //refreshing page
      .then(() =>  window.location.reload())
    });
  })
}

// This block of code is used for the "ADD TASK" button
var dialog = document.getElementById('dialogTask');
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
  addTask();
  var data = {message: 'Task has been added.'};
  snackbarContainer.MaterialSnackbar.showSnackbar(data);
  dialog.close();
});

// Function calls
let user = retrieveUserInfo();
let projCode = retrieveProjectCode();
let groupID = retrieveGroupID();

displayProjInfo();
printTable();
printTask();
displayTask();
// TODO: add code for entering the contribution into the database by adding a new entry into the
// firestore "groups" collection under the "contributions" tab (based on the user's group)

// TODO: Implement the task adding (the dialog) by getting data from the dialog and adding it into the
// firestore database under the tasks field in the groups document
