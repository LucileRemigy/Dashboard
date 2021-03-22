const express = require("express");

const router = express.Router();

function getIP(req) {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (typeof ip === "string") {
    ip = ip.split(":").slice(-1);
  }
  ip = ip.toString();
  return ip;
}

/* GET ABOUT page. */
router.get("/", (req, res) => {
  const ip = getIP(req);
  const epochTime = new Date().getTime();
  const objectJson = {
    client: {
      host: ip,
    },
    server: {
      current_time: epochTime,
      services: [
        {
          name: "weather",
          widgets: [
            {
              name: "city_temperature",
              description: "Display temperature for a city",
              params: [
                {
                  name: "city",
                  type: "string",
                },
              ],
            },
            {
              name: "city_weather",
              description: "Display weather for a city",
              params: [
                {
                  name: "city",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "Twitter",
          actions: [
            {
              name: "last_tweet",
              description: "Display last tweet of the target",
              params: [
                {
                  name: "target",
                  type: "string",
                },
              ],
            },
            {
              name: "count followers",
              description: "Display number of followers of the target",
              params: [
                {
                  name: "target",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
  };
  res.send(objectJson);
});

module.exports = router;
