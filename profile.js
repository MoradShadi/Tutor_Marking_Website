"use strict"
const USER_INFO = "USER INFO";

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
