"use strict"
// This js file is used for the profile page that the user can access to
// view their information and change their password.
const USER_INFO = "USER INFO";

/**
* This method displays the current user's info and displays them
* on the page.
*/
function displayUserInfo()
{
  let user = retrieveUserInfo();
  let output = "";
  output += "<span id=\'userInformation\'>";
  output += "<u>User Details</u><br><br>"
  output += "User name: " + user.username + "<br>";
  output += "Email: " + user.email + "<br>";
  output += "User role: " + user.role + "<br>";
  output += "</span>"

  document.getElementById("info").innerHTML = output;
}

/**
* This method allows the user to change their password if they wish to
* do so. It requires the user to enter their old password as input and
* only allows for the password change to complete if the old password
* matches the one in the database.
*/
function changePass(){
  let user = retrieveUserInfo();
  let username = user.username;
  let change = false;
  let ref = firebase.database().ref("User");

  ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var dataBaseUser=childData.username;
      var dataBasePass=childData.password;
      if (dataBaseUser==username) {
        if (document.getElementById("oldpass").value == dataBasePass){
          change = true;
        }
      }
    });
  });

  setTimeout(function(){
    if (change){
      var db = firebase.database();
      db.ref('User')
        .orderByChild('username')
        .equalTo(username)
        .once('value')
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            childSnapshot.ref.child('password').set(document.getElementById("newpass").value);
          });
        });

      var snackbarContainer = document.querySelector('#demo-toast-example');
      var data = {message: 'Password has been changed!'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
    else{
      var snackbarContainer = document.querySelector('#demo-toast-example');
      var data = {message: 'Incorrect old password! Please try again!'};
      snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }
  }, 1000)

}

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

displayUserInfo();
