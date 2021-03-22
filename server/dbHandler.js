// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase");
var express = require("express");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyD4FVB2Q3VGgmxsGWm5IdQEJjq-lcgfTvE",
  authDomain: "bttf-dashboard.firebaseapp.com",
  databaseURL:
    "https://bttf-dashboard-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bttf-dashboard",
  storageBucket: "bttf-dashboard.appspot.com",
  messagingSenderId: "739888765821",
  appId: "1:739888765821:web:4f4b3ba2c93afcf4484a14",
  measurementId: "G-MK7NZDHTPG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function SignUp(email, password) {
  console.log("SignUp");
  //Sign Up
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { error: errorMessage };
    });
}

async function SignIn(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      return { uid: user.uid };
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      throw new Error(errorMessage);
    });
}

function isConnected(user) {
  //Check Log
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

function writeData() {
  //function writeUserData(userId, widget, isEnable) {
  database.ref("widgets").set({}, function (error) {
    if (error) {
      console.log("Failed with error: " + error);
    } else {
      console.log("success");
    }
  });
}

function createWidget(uid, typeWidget, argsWidget, nameWidget) {
  var obj = {
    args: argsWidget,
    type: typeWidget,
  };

  database.ref("/activeWidgets/" + uid + "/" + nameWidget).set(obj, (error) => {
    if (error) {
      console.log("Failed with error: " + error);
    } else {
      console.log("success");
    }
  });
}

function getUserWidget(uid) {
  return database
    .ref("/activeWidgets/" + uid)
    .get()
    .then((data) => {
      if (data.exists()) {
        console.log("je retourne:", data.val());
        return data.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getWidgetInfo() {
  database
    .ref("/widgets")
    .get()
    .then((data) => {
      if (data.exists()) {
        console.log(data.val());
        return data.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function removeWidget(widget, uid) {
  database
    .ref("/activeWidgets/" + uid + "/" + widget + "/")
    .remove()
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  SignIn,
  SignUp,
  writeData,
  getWidgetInfo,
  createWidget,
  getUserWidget,
  removeWidget,
};
