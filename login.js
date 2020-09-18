"use strict"
const USER_INFO = "USER INFO";

function writeData(){

  let emailAlreadyExists = false;
  let userAlreadyExists = false;
  let user = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let ref = firebase.database().ref("User");

  ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var dataBaseUser=childData.username;
      var dataBaseEmail=childData.email;
      var dataBasePass=childData.password;
      if (dataBaseUser==user) {
        userAlreadyExists = true;
      }
      else if (dataBaseEmail ==email){
        emailAlreadyExists = true;
      }
    });
  });
  setTimeout(function(){
    if (emailAlreadyExists){
      var snackbarContainer = document.querySelector('#demo-toast-example');
      var data = {message: 'Email already exists!! Please try again.'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    else if (userAlreadyExists){
      var snackbarContainer = document.querySelector('#demo-toast-example');
      var data = {message: 'Username already exists!! Please try again.'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    else{
      firebase.database().ref("User").push({
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
      })
      document.getElementById("email").value = "";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      var snackbarContainer = document.querySelector('#demo-toast-example');
      var data = {message: 'New user has been registered!\n Please login to proceed.'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
  }, 1000);

}


function login(){
  let success = false;
  let user = document.getElementById("userlogin").value;
  let password = document.getElementById("passlogin").value;
  let ref = firebase.database().ref("User");

  ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var dataBaseUser=childData.username;
      var dataBaseEmail=childData.email;
      var dataBasePass=childData.password;
      if (dataBaseUser==user || dataBaseEmail==user && dataBasePass == password) {
        success = true;
        storeUserInfo(childData);
      }
    });
  });
  setTimeout(function(){
    if (success){
      window.location.href = 'home.html'
    }
    else{
      var snackbarContainer = document.querySelector('#demo-toast-example');
      var data = {message: 'Incorrect login information!! Please try again.'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
  }, 1000)
}

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
