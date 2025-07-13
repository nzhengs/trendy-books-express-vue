var express = require("express");
require("dotenv").config();
var router = express.Router();

const OVERVIEW_URL = "https://api.nytimes.com/svc/books/v3/lists/overview.json";
const LIST_URL =
  "https://api.nytimes.com/svc/books/v3/lists/current/{listName}.json";

router.get("/lists", function (req, res) {
  fetchBooksApi(OVERVIEW_URL, res, (response) => response.results.lists);
});

router.get("/lists/:listName", function (req, res) {
  const url = LIST_URL.replace("{listName}", req.params.listName);
  fetchBooksApi(url, res, (response) => response.results);
});

module.exports = router;

function fetchBooksApi(url, res, responseMapper) {
  fetch(withApiKey(url))
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Unable to fetch data from API: " + response.statusText
        );
      }
      return response.json();
    })
    .then((response) => {
      if (response.status === "OK") {
        res.json(responseMapper(response));
      } else {
        res.status(500).json({ error: "API response was not ok" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error." });
    });
}

function withApiKey(url) {
  return url + "?api-key=" + process.env.NYT_API_KEY;
}
