/**
 * Created by Cedrik on 3/3/2016.
 */
var express = require('express');
var router = express.Router();
router.tasks = [];
counter = 0;

router.get('/', function(req, res, next) {
    res.json(router.tasks);
});

router.post('/tasks', function (req, res, next) {
    router.tasks[counter++] = req.body.task;
    console.log(task);
    router.tasks.push({task: task});
    res.send("OK");
});

router.get('/tasks/:counter', function(req, res) {
    var counter = parseInt(req.params.counter);
    router.tasks.splice(counter, 1);
});

module.exports = router;

