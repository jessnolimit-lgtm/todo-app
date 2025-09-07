const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/userController");

router.get("/", taskController.getTasks);
router.post("/", taskController.addTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/:id/complete", taskController.completeTask);

module.exports = router;
