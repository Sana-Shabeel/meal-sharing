const express = require("express");
const router = express.Router();
const knex = require("../database");
// Validating data received from user
const mealsColumns = new Set([
  "title",
  "description",
  "location",
  "when",
  "created",
  "price",
  "max_reservation",
]);
function isValidData(data) {
  try {
    let validData = {};
    // looping through the data object
    for (const key in data) {
      // checking if the mealsColumn has the key
      if (mealsColumns.has(key)) {
        validData[key] = data[key];
      }
    }

    if ("when" in validData) {
      const parsedDate = new Date(validData.when);
      if (isNaN(parsedDate)) {
        validData["Error"] = "Error";
      }
    }
    return validData;
  } catch (error) {
    console.log(error);
  }
}

router.get("/", async (req, res) => {
  const meals = await getMeals(req.query);
  res.json(meals);
});

function getMeals(query) {
  const meals = knex("meal");

  if ("limit" in query) {
    meals.limit(query.limit);
  }
  if ("maxPrice" in query) {
    meals.where("price", "<", query.maxPrice);
  }
  if ("title" in query) {
    meals.where("title", "like", `%${query.title}%`);
  }
  if ("stars" in query) {
    meals
      .join("review", "meal.id", "review.meal_id")
      .distinct()
      .select(
        "meal.id",
        "meal.title",
        "meal.description",
        "location",
        "when",
        "created",
        "price",
        "stars"
      );
  }

  if ("availableReservations" in query) {
    meals
      .join("reservations", "meal.id", "reservations.meal_id")
      .select(
        "meal.id",
        "title",
        "description",
        "location",
        "when",
        "created",
        "price",
        "max_reservation",
        knex.raw("SUM(number_of_guests) AS sum")
      )
      .where("max_reservation", ">", "number_of_guests")
      .groupBy("meal_id");
  }
  if ("createdAfter" in query) {
    meals.where("created", ">", query.createdAfter);
  }
  return meals.select();
}

// CREATE meal route
router.post("/", async (req, res) => {
  const validData = isValidData(req.body);
  if (!validData) {
    return res.status(400).json({
      status: "failed",
      Error: "No valid data was provided.",
      message: {
        date: "make sure the dates match this format (YYYY-MM-DD)",
        price:
          "price and max_reservation are supposed to be integers, not strings",
      },
    });
  }
  const created = await knex("meal").insert(validData);
  res.status(201).json({
    status: "success",
    message: `Created ${created}`,
  });
});

// GET single meal route
router.get("/:id", async (req, res) => {
  const meal = await knex("meal").where({ id: req.params.id });
  if (meal.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "meal not found",
      message: "Invalid ID",
    });
  }
  res.json(meal);
});

// UPDATE meal route
router.put("/:id", async (req, res) => {
  const validData = isValidData(req.body);
  // Check if id is included
  const checkedId = await knex("meal").where({ id: req.params.id });

  if ("Error" in validData) {
    return res.status(400).json({
      status: "failed",
      Error: "No valid data was provided.",
      message: {
        date: "make sure the dates match this format (YYYY-MM-DD)",
        price:
          "price and max_reservation are supposed to be integers, not strings",
      },
    });
  }
  if (checkedId.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "meal not found",
      message: "Invalid ID",
    });
  }
  const updateMeal = await knex("meal")
    .where({ id: req.params.id })
    .update(validData);

  res.status(201).json({
    status: "succes",
    message: "Updated",
    updated: "updateMeal",
  });
});

// Delete route
router.delete("/:id", async (req, res) => {
  const checkedId = await knex("meal").where({ id: req.params.id });
  if (checkedId.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "meal not found",
      message: "Invalid ID",
    });
  }

  const deleteMeal = await knex("meal").where({ id: req.params.id }).del();
  res.json({
    status: "success",
    message: `Deleted`,
    deleted: deleteMeal,
  });
});
module.exports = router;
