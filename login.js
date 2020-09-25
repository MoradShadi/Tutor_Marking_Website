"use strict"
// This js file is used for the login page for the user to log in
// to their account and begin their activity.
const USER_INFO = "USER INFO";

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
// firebase.analytics();

/**
* This method is used to simulate the registration process for the user.
* It also checks if the provided username and email already exists in the database
* before allowing the user to proceed with the registration (because they need to
* be unique).
*/
function register(){

  if (document.getElementById("password").value != document.getElementById("cfmpassword").value){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: 'Passwords given do not match. Please try again.'};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
    return;
  }

  let user = document.getElementById("username").value;
  let email = document.getElementById("email").value;

  db.collection("users").where("username", "==", user)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty){

          db.collection("users").where("email", "==", email)
            .get()
            .then(function(querySnapshot) {
              if (querySnapshot.empty){
                db.collection("users").add({
                    email: email,
                    password: document.getElementById("password").value,
                    role: "student",
                    username: user
                })
                document.getElementById("email").value = "";
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById("cfmpassword").value = "";
                var snackbarContainer = document.querySelector('#demo-toast-example');
                var data = {message: 'New user has been registered!\n Please login to proceed.'};
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
              }
              else {
                var snackbarContainer = document.querySelector('#demo-toast-example');
                var data = {message: 'Email already exists!! Please try again.'};
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
              }
            })
        }
        else{
          var snackbarContainer = document.querySelector('#demo-toast-example');
          var data = {message: 'Username already exists!! Please try again.'};
          snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
}

/**
* This method is used to simulate the login process for the user.
* It checks if the username/email and password provided in the login field
* matches the ones in the database.
*/
function login(){
  let success = false;
  let user = document.getElementById("userlogin").value;
  let password = document.getElementById("passlogin").value;

  db.collection("users").where("username", "==", user).where("password", "==", password)
  .get()
  .then(function(querySnapshot) {
    if (!querySnapshot.empty){
      success = true;
      querySnapshot.forEach(function (doc) {
        storeUserInfo(doc.data());
      });
      window.location.href = 'home.html'
    }
    else {
      var snackbarContainer = document.querySelector('#demo-toast-example');
      var data = {message: 'Incorrect login information!! Please try again.'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
  })
}

/**
* This method is used to save the user info (which is basically the
* basic information that the user has provided during registration) in
* the browser's local storage so that they can be accessed later on.
*/
function storeUserInfo(user)
{
  if(typeof (Storage) !== 'undefined')
	{
		let userJSON = JSON.stringify(user);
		localStorage.setItem(USER_INFO, userJSON)
	}
	else
	{
		alert ('local storage is no supported in current browser')
	}
}

/**
* JQuery code for the multi-tab login/register page
*/
$(".login-form").hide();
$(".login").css("background", "none");
$(".signup").css("background", "#404191");
$(".signup").css("color", "#fff");

$(".login").click(function(){
  $(".signup-form").hide();
  $(".login-form").show();
  $(".signup").css("background", "none");
  $(".login").css("background", "#404191");
  $(".signup").css("color", "#000");
  $(".login").css("color", "#fff");
});

$(".signup").click(function(){
  $(".signup-form").show();
  $(".login-form").hide();
  $(".login").css("background", "none");
  $(".signup").css("background", "#404191");
  $(".signup").css("color", "#fff");
  $(".login").css("color", "#000");
});

$(".btn").click(function(){
  $(".input").val("");
});
