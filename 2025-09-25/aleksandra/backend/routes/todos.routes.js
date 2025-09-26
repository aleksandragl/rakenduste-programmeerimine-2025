const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos.controller");

router.get("/", todosController.read);
router.post("/", todosController.create);
router.put("/", todosController.update);
router.delete("/", todosController.delete);
//adminiks
router.get("/admin", todosController.readAll);
router.put("/admin/toggle", todosController.toggleDeleted);

module.exports = router;
