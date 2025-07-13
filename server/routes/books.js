var express = require("express");
require("dotenv").config();
var router = express.Router();

const OVERVIEW_URL = "https://api.nytimes.com/svc/books/v3/lists/overview.json";

router.get("/lists", function (req, res, next) {
  const url = OVERVIEW_URL + "?api-key=" + process.env.NYT_API_KEY;
  console.log({url})
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log('Error not ok')
        console.log(response)
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((response) => {
      if (response.status === "OK") {
        res.json(response.results.lists);
      } else {
        res.status(500).json({ error: "Failed to fetch best sellers lists." });
      }
    })
    .catch((error) => {
      console.error("Error fetching best sellers:", error);
      res.status(500).json({ error: "Internal server error." });
    });
});

module.exports = router;
