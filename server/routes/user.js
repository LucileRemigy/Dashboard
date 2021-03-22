var express = require("express");
const cookieParser = require("cookie-parser");
var twitter = require("./twitterWidget");
var weather = require("./meteoWidget");

var router = express.Router();
var db = require("../dbHandler");
const { getTweet } = require("./twitterWidget");

router.use(cookieParser());

router.use(function checkCookie(req, res, next) {
  var cookie = req.cookies.uid;
  if (cookie != undefined) {
    console.log("nice cookie bro");
    next();
  } else {
    console.log("bad cookie bro");
    return res.sendStatus(403);
  }
});

router.get("/getwidgetinfo", async function (req, res) {
  console.log("get widget: ");
  db.getWidgetInfo();
  console.log("end widget");
  return res.json({ value: "ok" });
});

router.post("/createwidget", async function (req, res) {
  console.log("le widget a add: ", req.body.newWidget);
  db.createWidget(
    req.cookies.uid,
    req.body.newWidget.typeWidget,
    req.body.newWidget.argsWidget,
    req.body.newWidget.nameWidget
  );
  console.log("end widget");
  return res.json({ value: "ok" });
});

router.get("/getuserwidget", async function (req, res) {
  console.log("get user widget: ");
  db.getUserWidget(req.cookies.uid);
  console.log("end user widget");
  return res.json({ value: "ok" });
});

router.get("/removewidget", async function (req, res) {
  db.removeWidget(req.body.widget, req.cookies.uid);
  console.log("remove good");
});

router.get("/executewidgets", async function (req, res) {
  let functions = {
    tweet: twitter.getTweet,
    follower: twitter.getFollowers,
    weather: weather.getWeather,
    temperature: weather.getTemperature,
  };
  let data = await db.getUserWidget(req.cookies.uid);
  console.log("lalalala,", data);
  try {
    for (widgetName in data) {
      console.log("Widget to execute:\nName =>", widgetName);
      console.log("Widget type =>", data[widgetName]["type"]);
      let funcArgs = [];
      for (arg in data[widgetName]["args"]) {
        console.log("Arg => ", arg, `${arg} =>`, data[widgetName]["args"][arg]);
        funcArgs.push(data[widgetName]["args"][arg]);
      }
      console.log("Function args =>", funcArgs);
      functions[data[widgetName]["type"]](...funcArgs);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
