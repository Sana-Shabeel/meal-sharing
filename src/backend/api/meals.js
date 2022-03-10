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
    if ("price" in validData) {
      if (typeof validData.price !== "number") {
        throw new Error();
      }
    }
    if ("max_reservation" in validData) {
      if (typeof validData.max_reservation !== "number") {
        throw new Error();
      }
    }
    if ("when" in validData) {
      const parsedDate = new Date(validData.when);
      if (isNaN(parsedDate)) {
        throw new Error();
      }
    }
    return validData;
  } catch (error) {
    console.log(error);
  }
}

// GET route all meals route
router.get("/", async (req, res) => {
  const meals = await knex("meal").select();

  if (req.query.maxPrice && req.query.limit) {
    const limitedPrice = await knex("meal")
      .where("price", "<", req.query.maxPrice)
      .limit(req.query.limit);
    return res.json(limitedPrice);
  }

  if ("maxPrice" in req.query) {
    const maxPrice = await knex("meal")
      .select()
      .where("price", "<", req.query.maxPrice);
    return res.json(maxPrice);
  }

  if ("availableReservations" in req.query) {
    const getMeals = await knex("meal")
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
    const availableMeals = getMeals.filter(
      (meal) => meal.max_reservation > meal.sum
    );
    return res.json(availableMeals);
  }

  if ("title" in req.query) {
    const likeTitle = await knex("meal").where(
      "title",
      "like",
      `%${req.query.title}%`
    );
    if (likeTitle.length === 0) {
      return res.status(404).json({ Error: "No meal found matching title" });
    }
    return res.json(likeTitle);
  }

  if ("createdAfter" in req.query) {
    const createdAfter = await knex("meal").where(
      "created",
      ">",
      req.query.createdAfter
    );
    if (createdAfter.length === 0) {
      return res.status(404).json({ Error: "No meal found matching title" });
    }
    return res.json(createdAfter);
  }
  if ("limit" in req.query) {
    const limit = await knex("meal").limit(req.query.limit);
    return res.json(limit);
  }

  res.json(meals);
});

// CREATE meal route
router.post("/", async (req, res) => {
  const validData = isValidData(req.body);
  if (!validData) {
    return res.status(400).json({
      status: "failed",
      Error: "No valid data was provided.",
      message: {
        date: "make sure the dates match this format (YYYY-MM-DD HH:MM:SS)",
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
  if (Object.keys(validData).length === 0) {
    return res.status(400).json({
      status: "failed",
      Error: "No valid data was provided.",
      message: {
        date: "make sure the dates match this format (YYYY-MM-DD HH:MM:SS)",
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
    updated: updateMeal,
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
