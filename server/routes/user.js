var express = require("express");
const cookieParser = require("cookie-parser");
var twitter = require("./twitterWidget");
var weather = require("./meteoWidget");
var cors = require("cors");

var router = express.Router();
var db = require("../dbHandler");
const { getTweet } = require("./twitterWidget");
const { response } = require("express");

router.use(cookieParser());
router.use(cors());

router.use(function checkCookie(req, res, next) {
  db.firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("nice auth bro", user.uid);
      next();
    } else {
      console.log("bad auth bro");
      return res.sendStatus(403);
    }
  });
});

router.get("/getwidgetinfo", async function (req, res) {
  var data = await db.getWidgetInfo();
  return res.json(data);
});

router.post("/createwidget", async function (req, res) {
  console.log("le widget a add: ", req.body);
  var user = db.firebase.auth().currentUser;
  db.createWidget(
    user.uid,
    req.body.typeWidget,
    req.body.argsWidget,
    req.body.nameWidget
  );
  return res.json({ value: "ok" });
});

router.get("/getuserwidget", async function (req, res) {
  var user = db.firebase.auth().currentUser;
  var data = await db.getUserWidget(user.uid);
  return res.json(data);
});

router.get("/removewidget", async function (req, res) {
  var user = db.firebase.auth().currentUser;
  db.removeWidget(req.body.widget, user.uid /* req.cookies.uid*/);
  console.log("remove good");
});

router.get("/executewidgets", async function (req, res) {
  let functions = {
    tweet: twitter.getTweet,
    follower: twitter.getFollowers,
    weather: weather.getWeather,
    temperature: weather.getTemperature,
  };
  var user = db.firebase.auth().currentUser;
  let result = {};
  let data = await db.getUserWidget(user.uid);
  //console.log("lalalala,", data);
  try {
    for (widgetName in data) {
      //console.log("Widget to execute:\nName =>", widgetName);
      //console.log("Widget type =>", data[widgetName]["type"]);
      let funcArgs = [];
      for (arg in data[widgetName]["args"]) {
        //console.log("Arg => ", arg, `${arg} =>`, data[widgetName]["args"][arg]);
        funcArgs.push(data[widgetName]["args"][arg]);
      }
      //console.log("Function args =>", funcArgs);
      info = await functions[data[widgetName]["type"]](...funcArgs);
      //console.log("l'info est", info, " et le wod", widgetName);
      console.log("l'info est ", info["value"]);
      result[widgetName] = info["value"];
    }
    console.log("le result  est", result);
    return res.json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
