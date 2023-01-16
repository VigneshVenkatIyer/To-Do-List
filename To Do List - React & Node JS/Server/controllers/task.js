const { v4: uuidv4 } = require("uuid");

let taskList = [
  {
    taskName: "Task 1",
    completed: false,
    id: uuidv4(),
  },
  {
    taskName: "Task 2",
    completed: true,
    id: uuidv4(),
  },
];

exports.getTasks = (req, res) => {
  res.status(200).json({ status: "success", data: taskList });
};

exports.updateTask = (req, res) => {
  let id = req.params.id;
  let task = taskList.find((t) => t.id === id);
  if (task) {
    task.completed = req.body.completed;
    res.status(200).json({ status: "success", data: task });
  } else {
    res.status(404).json({ status: "error", message: "Task not found" });
  }
};

exports.addTask = (req, res) => {
  let task = {
    taskName: req.body.taskName,
    completed: req.body.completed,
    id: uuidv4(),
  };
  taskList.push(task);
  res.status(200).json({ status: "success", data: task });
};

exports.deleteTask = (req, res) => {
  let id = req.params.id;
  taskList = taskList.filter((t) => t.id !== id);
  res.status(200).json({ status: "success", message: "Task deleted" });
};
