"use strict"

function writeData(){
  firebase.database().ref("User").push({
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  })
}
