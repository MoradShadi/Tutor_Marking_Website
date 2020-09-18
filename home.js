"use strict"
const USER_INFO = "USER INFO";

function printWelcome(){
  let user = retrieveUserInfo();
  let output = "";
  output += "<div class=\"bottom-left\">Welcome, " + user.username + "<br>";

  if (user.role == "student"){
    output += "Please proceed to record your project information."
  }
  else if (user.role == "marker"){
    output += "Please proceed to mark the projects."
  }
  output += "</div>"
  document.getElementById("welcome").innerHTML = output;
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

printWelcome();
