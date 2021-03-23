// export BEARER_TOKEN='AAAAAAAAAAAAAAAAAAAAAG3xNgEAAAAAC%2BGoq64AMv9D56fwvz%2Bwx00xx4A%3DeFazylkiViQOnUQJy95W9fhXRGnUWcS64Swifm5CUmnBTlyH8q'

var needle = require("needle");
var twitter = require("twitter");
//import twitterFollowersCount from "twitter-followers-count";
var twitterFollower = require("twitter-followers-count");

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAAG3xNgEAAAAAC%2BGoq64AMv9D56fwvz%2Bwx00xx4A%3DeFazylkiViQOnUQJy95W9fhXRGnUWcS64Swifm5CUmnBTlyH8q";
const apiKey = "d0YVxhItXvyhKerQQcmwg2ZN9";
const apiSecretKey = "wJ8W7iGYxLgil9Vs6WPhoQHPI3HOF36sQe7z7BrtrOREIR9KX4";
const accessToken = "833339650613903360-NHmtD42VfOCo2B4MQrmkawspeBy3dMV";
const accessTokenSecret = "6ZX4Z0vj0JYnhAc8NAnIHMOr9clN0lKq6FFu6SuzlV3ii";
//const token = process.env.BEARER_TOKEN;

const endpointUrlTweet = "https://api.twitter.com/2/tweets/search/recent";

async function getTweet(idAuthTweet) {
  //console.log("id :", idAuthTweet);
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  const params = {
    query: "from:" + idAuthTweet + " -is:retweet",
    "tweet.fields": "author_id",
  };

  const res = await needle("get", endpointUrlTweet, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${bearerToken}`,
    },
  });

  if (res.body) {
    //console.log("le body est:", res.body.data[0].text);
    return { value: res.body.data[0].text };
  } else {
    return { value: "error" };
  }
}

async function getFollowers(idAuthFollower) {
  const getTwitterFollowers = twitterFollower({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret,
  });

  return getTwitterFollowers([idAuthFollower])
    .then((nb_follower) => {
      //console.log("nombre de follower skelmy:", nb_follower[idAuthFollower]);
      return { value: nb_follower[idAuthFollower] };
    })
    .catch((error) => {
      console.log("l'erreur est", error);
      return { value: "error" };
    });
}

module.exports = {
  getTweet,
  getFollowers,
};
