const express = require("express");
const router = express.Router();
const knex = require("../database");

// validating data
const reviewsColumns = new Set(["title", "description", "meal_id", "stars"]);
function isValidData(data) {
  let validData = {};
  for (const key in data) {
    if (reviewsColumns.has(key)) {
      validData[key] = data[key];
    } else {
      validData["Error"] = "Error";
    }
  }

  return validData;
}

// GET all reviews
router.get("/", async (req, res) => {
  const review = await knex("review").select();
  res.json(review);
});

// Create a new review
router.post("/", async (req, res) => {
  const validData = isValidData(req.body);

  if ("Error" in validData) {
    return res.status(400).json({
      status: "failed",
      Error: "No valid data was provided.",
      message: {
        spelling: "check for spelling error",
        columns: ["title", "description", "meal_id", "stars"],
      },
    });
  }

  const created = await knex("review").insert(validData);
  res.status(201).json({
    status: "success",
    message: `Created ${created}`,
  });
});

// GET a single review
router.get("/:id", async (req, res) => {
  const review = await knex("review").where({ id: req.params.id });

  if (review.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "review not found",
      message: "Invalid ID",
    });
  }

  res.json(review);
});

// UPDATE review route
router.put("/:id", async (req, res) => {
  const validData = isValidData(req.body);

  const checkId = await knex("review").where({ id: req.params.id });
  if ("Error" in validData) {
    return res.status(400).json({
      status: "failed",
      Error: "No valid data was provided.",
      message: {
        columns: ["title", "description", "meal_id", "stars"],
      },
    });
  }
  if (checkId.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "review not found",
      message: "Invalid ID",
    });
  }
  const update = await knex("review")
    .where({ id: req.params.id })
    .update(validData);

  res.status(201).json({
    status: "succes",
    message: "Updated",
    updated: update,
  });
});

// Delete review route
router.delete("/:id", async (req, res) => {
  const checkId = await knex("review").where({ id: req.params.id });
  if (checkId.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "review not found",
      message: "Invalid ID",
    });
  }

  const deletedReview = await knex("review").where({ id: req.params.id }).del();
  res.json({
    status: "success",
    message: `Deleted`,
    deleted: deletedReview,
  });
});

module.exports = router;
