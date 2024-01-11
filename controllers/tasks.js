const Task = require("../models/tasks");


module.exports = {
    index: (req, res) => {
        Task.find({})
            .then(tasks => {
                res.render("todo.ejs", {todotasks: tasks});
            })
            .catch(error => {
                console.log(`There was an error: ${error}`);
            });
    },
    create: (req,res)=>{
        const firstTask = new Task({title: req.body.title});
        firstTask.save().then(()=>res.redirect("/"));
    },
    edit: (req, res) => {
        const id = req.params.id;
        
        Task.find({})
            .then(tasks => {
                res.render("todoEdit.ejs", {todotasks: tasks, idTask: id});
            })
            .catch(err => {
                console.error('Error fetching tasks:', err);
                res.status(500).send('Internal Server Error');
            });
    },
    update: (req, res) => {
        const id = req.params.id;
    
        Task.findByIdAndUpdate(id, { title: req.body.title })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.error('Error updating task:', err);
                res.status(500).send('Internal Server Error');
            });
    },
    delete: (req, res) => {
        const id = req.params.id;
    
        Task.deleteOne({ _id: id })
            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                console.error(`There was an error: ${error}`);
                res.status(500).send('Internal Server Error');
            });
    }

}