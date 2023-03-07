const { Router } = require("express");

const { getToDo, getToDoById, saveToDo, deleteToDo, updateToDo } = require("../controllers/ToDoController");

const router = Router();

router.get("/", getToDo);

router.get("/todo/:id", getToDoById);

router.post("/save", saveToDo);

router.patch("/update", updateToDo);

router.delete("/delete/:id", deleteToDo);

module.exports = router;