const express = require("express");
const router = express.Router();
const knex = require("../database");

// Validating data
const reservationsColumns = new Set([
  "number_of_guests",
  "meal_id",
  "contact_phonenumber",
  "contact_name",
  "contact_email",
]);
function isValidData(data) {
  let validData = {};
  for (const key in data) {
    if (reservationsColumns.has(key)) {
      validData[key] = data[key];
    }
  }
  if ("number_of_guests" in validData) {
    if (typeof validData.number_of_guests !== "number") {
      validData["Error"] = "Error";
      console.log("yes there is error");
    }
  }
  return validData;
}

// GET all reservations
router.get("/", async (req, res) => {
  const reservations = await knex("reservations").select();
  res.json(reservations);
});

// Create a new reservation
router.post("/", async (req, res) => {
  const validData = isValidData(req.body);
  if ("Error" in validData) {
    console.log("Error");
    return res.status(400).json({
      status: "failed",
      Error: "No valid data was provided.",
      message: {
        meal_id:
          "meal_id and number_of_guests are supposed to be integers, not strings",
        columns: [
          "number_of_guests",
          "meal_id",
          "contact_phonenumber",
          "contact_name",
          "contact_email",
        ],
      },
    });
  }

  const created = await knex("reservations").insert(validData);
  res.status(201).json({
    status: "success",
  });
});

// GET a single reservations
router.get("/:id", async (req, res) => {
  const reservations = await knex("reservations").where({ id: req.params.id });
  if (reservations.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "reservation not found",
      message: "Invalid ID",
    });
  }
  res.json(reservations);
});

// UPDATE reservations route
router.put("/:id", async (req, res) => {
  const validData = isValidData(req.body);
  // Check if id is included
  const checkedId = await knex("reservations").where({ id: req.params.id });
  if ("Error" in validData) {
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
      error: "reservation not found",
      message: "Invalid ID",
    });
  }
  const updateReservations = await knex("reservations")
    .where({ id: req.params.id })
    .update(validData);

  res.status(201).json({
    status: "succes",
    message: "Updated",
    updated: updateReservations,
  });
});

// Delete reservations route
router.delete("/:id", async (req, res) => {
  const checkedId = await knex("reservations").where({ id: req.params.id });
  if (checkedId.length === 0) {
    return res.status(404).json({
      status: "failed",
      error: "reservation not found",
      message: "Invalid ID",
    });
  }

  const deleteReservations = await knex("reservations")
    .where({ id: req.params.id })
    .del();
  res.json({
    status: "success",
    message: `Deleted`,
    deleted: deleteReservations,
  });
});
module.exports = router;
