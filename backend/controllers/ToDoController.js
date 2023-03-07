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

module.exports.deleteToDo = (req, res) => {
  const { _id } = req.body;

  console.log("id ---> ", _id);

  ToDoModel.findByIdAndDelete(_id)
    .then(() => res.set(201).send("Deleted Successfully..."))
    .catch((err) => console.log(err));
};

module.exports.updateToDo = (req, res) => {
  const { _id, text } = req.body;

  ToDoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.set(201).send("Updated Successfully..."))
    .catch((err) => console.log(err));
};
