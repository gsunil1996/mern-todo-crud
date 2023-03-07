const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
  try {
    const todo = await ToDoModel.find().lean().exec();
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.getToDoById = async (req, res) => {
  try {
    const todo = await ToDoModel.findById(req.params.id).lean().exec();
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;

  try {
    const todo = await ToDoModel.create({ text });
    console.log("Added Successfully...");
    console.log(todo);
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.deleteToDo = async (req, res) => {
  console.log("id ---> ", req.params.id);

  try {
    const todo = await ToDoModel.findByIdAndDelete(req.params.id).lean();
    console.log("Deleted Successfully...");
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;

  try {
    const todo = await ToDoModel.findByIdAndUpdate(_id, { text }).lean();
    console.log("Updated Successfully...");
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
