var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
var task = ["buy socks", "practise with nodejs"];
var complete = ["finish jquery"];

app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.status(200).json({ message: "Task added successfully" , data:newTask });
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.status(200).json({ message: "Task removed successfully" , data:completeTask });
});

app.get("/", function(req, res) {
    res.status(200).json({data: { task: task, complete: complete }});
});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});