const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const {
  addLeague,
  getLeague,
  editLeague,
  deleteLeague,
} = require("../controllers/leagueController");

router.post("/add-league",authMiddleware , addLeague);
router.get("/get-league",authMiddleware, getLeague);
router.put("/edit-league",authMiddleware, editLeague);
router.delete("/delete-league",authMiddleware, deleteLeague);

module.exports = router;
