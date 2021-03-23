// Exemple adapté de la mise en route d'Express :
// http://expressjs.com/fr/starter/hello-world.html
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var app = express();

var db = require("./dbHandler");
var twitter = require("./routes/twitterWidget");
var weather = require("./routes/meteoWidget");

var router = require("./routes/user");
const aboutRouter = require("./routes/about");

const corsOptions = {
  exposedHeaders: ["Authorization", "Cookies", "Content-Type"],
};

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use("/user", router);
app.use("/about.json", aboutRouter);

/*app.post("/weather", async function (req, res) {
  console.log("la ville est :", req.body.email);
  var resp = await weather.getWeather(req.body.email);
  return res.json({ réponse: "resp" });
});

app.post("/temp", async function (req, res) {
  console.log("la ville est :", req.body.email);
  var resp = await weather.getTemperature(req.body.email);
  return res.json({ réponse: "resp" });
});

app.post("/twitter", async function (req, res) {
  console.log("le pseudo est:", req.body.email);
  var resp = await twitter.getTweet(req.body.email);
  return res.json({ réponse: "resp" });
});

app.post("/twitterfollower", async function (req, res) {
  console.log("le pseudo est:", req.body.email);
  var resp = await twitter.getFollowers(req.body.email);
  console.log("réponse!", resp);
  return res.json({ réponse: "resp" });
});*/

app.post("/signin", async function (req, res) {
  const valid = await db
    .SignIn(req.body.email, req.body.password)
    .then((response) => {
      /*console.log("mon uid est ", response.uid);
      res.cookie("uid", response.uid, {
        maxAge: 9000000,
        path: "/",
        domain: "192.168.1.24",
      });*/
      console.log("nice signin");
      return res.json({ value: "ok" });
    })
    .catch((error) => {
      console.log("there is an error", error);
    });
});

app.post("/signup", function (req, res) {
  db.SignUp(req.body.email, req.body.password);
  return res.json({ value: "ok" });
});

app.get("/", function (req, res) {
  res.send("Back du dashboard ! :D");
});

app.listen(8080, function () {
  console.log("Le dashboard écoute sur le port 8080 !");
});
