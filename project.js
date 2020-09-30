"use strict"
const USER_INFO = "USER INFO";
const PROJECT_INDEX = "PROJECT INDEX";

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

test();
