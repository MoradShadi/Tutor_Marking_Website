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
* This method is used to generate a random background image out of the ones
* provided for the cards in the page.
*/
function initBackgroundImage(){
  var images = ['https://lms.monash.edu/theme/monash/pix/myoverview/brush-strokes-abstract-pink-blue-micro-banner.jpg',
  'https://lms.monash.edu/theme/monash/pix/myoverview/geo-abstract-brown-micro-banner.jpg',
  'https://lms.monash.edu/theme/monash/pix/myoverview/layered-draping-purple-micro-banner.jpg',
  'https://lms.monash.edu/theme/monash/pix/myoverview/fibroblasts-under-the-microscope-green-micro-banner.jpg'];

  // Randomly applies a background image from the ones given
  for(let i = 0; i<document.getElementsByClassName('mdl-card__title').length; i++){
    document.getElementsByClassName('mdl-card__title')[i].style.backgroundImage = 'url(' + images[Math.floor(Math.random() * images.length)] + ')';
    document.getElementsByClassName('mdl-card__title')[i].style.backgroundPosition = "center cover"
    document.getElementsByClassName('mdl-card__title')[i].style.backgroundRepeat = "no-repeat"
  }
}

function printUnitFilter(){
  let output = "";
  output += "<div class=\"mdl-textfield mdl-js-textfield mdl-textfield--floating-label\" style=\"width:100%\">"
  output += "<select class=\"mdl-textfield__input\" id=\"unitFilter\">"
  output += "<option value=\"Select\" hidden>Select</option>";

  db.collection("units").get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function (doc) {
      output += "<option value=" + doc.data().unitcode + ">" + doc.data().unitcode + ": " + doc.data().unitname + "</option>"
    })
  })
  .then(() => {
    output += "</select></div><br>"
    document.getElementById('unitFilterArea').innerHTML = output;
  })
}

printUnitFilter();

function printProjects(input = 0){
  let output = "";
  let i = 0;

  if (input == 0){
    db.collection("projects")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        output += "<div class = \"container\">"
        output += "<div class=\"demo-card-wide mdl-card mdl-shadow--2dp\">"
        output += "<div class=\"mdl-card__title\">"
        output += "<h2 class=\"mdl-card__title-text\">" + "Group project " + (i+1) + ": " + doc.data().projname + "</h2>"
        output += "</div>"
        output += "<div class=\"mdl-card__supporting-text\">"
        output += "<b>Project ID:</b> " + doc.data().projectid + "<br><br>"
        output += "<b>Unit name:</b> " + doc.data().unitname + "<br><br>"
        output += "<b>Unit description:</b> " + doc.data().unitdesc + "<br><br>"
        output += "<b>Unit code:</b> " + doc.data().unitcode + "<br>"
        output += "</div>"
        output += "<div class=\"mdl-card__actions mdl-card--border\">"
        output += "<b>Weightage:</b> " + doc.data().weightage + "<br>"
        output += "</div>"
        output += "<div class=\"mdl-card__actions mdl-card--border\">"
        output += "<a id=\"" + i + "\" class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick = \"window.location.href=\'project.html\'; projectIndex(this.id);\">"
        output += "Get Started"
        output += "</a>"
        output += "</div>"
        output += "</div>"
        output += "</div>"
        i += 1;
      });
    })
    .then(() => {
      document.getElementById("projectListArea").innerHTML = output;
      initBackgroundImage();
    })
  }
  else{
    let unitSelection = document.getElementById('unitFilter').value;
    db.collection("projects").where("unitcode", "==", unitSelection)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        output += "<div class = \"container\">"
        output += "<div class=\"demo-card-wide mdl-card mdl-shadow--2dp\">"
        output += "<div class=\"mdl-card__title\">"
        output += "<h2 class=\"mdl-card__title-text\">" + "Group project " + (i+1) + ": " + doc.data().projname + "</h2>"
        output += "</div>"
        output += "<div class=\"mdl-card__supporting-text\">"
        output += "<b>Project ID:</b> " + doc.data().projectid + "<br><br>"
        output += "<b>Unit name:</b> " + doc.data().unitname + "<br><br>"
        output += "<b>Unit description:</b> " + doc.data().unitdesc + "<br><br>"
        output += "<b>Unit code:</b> " + doc.data().unitcode + "<br>"
        output += "</div>"
        output += "<div class=\"mdl-card__actions mdl-card--border\">"
        output += "<b>Weightage:</b> " + doc.data().weightage + "<br>"
        output += "</div>"
        output += "<div class=\"mdl-card__actions mdl-card--border\">"
        output += "<a id=\"" + i + "\" class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" onclick = \"window.location.href=\'project.html\'; projectIndex(this.id);\">"
        output += "Get Started"
        output += "</a>"
        output += "</div>"
        output += "</div>"
        output += "</div>"
        i += 1;
      });
    })
    .then(() => {
      document.getElementById("projectListArea").innerHTML = output;
      initBackgroundImage();
    })
  }

}

printProjects();
