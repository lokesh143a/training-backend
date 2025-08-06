const express = require("express")
const router = express.Router() 
const authMiddleware = require("../middleware/authMiddleware")
const {createCompetition , getCompetitions , updateCompetition , deleteCompetition,updateCompetitionStatus} = require("../controllers/competitionController")


// create competitions
router.post("/add-competition" , createCompetition)
// get competitions data
router.get("/get-competitions" , getCompetitions) 
// update competition data
router.put("/update-competition" , updateCompetition)
// delete competition
router.delete("/delete-competition" , deleteCompetition)
// update status
router.put("/update-status" , updateCompetitionStatus)

module.exports = router