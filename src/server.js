'use strict';

import express from 'express';
const app = express();

import bodyParser from 'body-parser';

/*
 * access db
 */
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/jsonAPI');

/*
 * model
 */
import Todo from './models/todo.js';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
 * PORT: 3000
 */
const port = process.env.PORT || 3000;

const router = express.Router();

router.use((req, res, next) => {
  console.log('Something is happening.');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/*
 * text (GET http://localhost:3000/api)
 */
router.get('/', (req, res) => {
  res.json({ message: 'Successfully Posted a test message.' });
});

/*
 * todo (POST http://localhost:3000/api/todos)
 */
router.route('/todos')
  .post((req, res) => {
    // new todo model
    const todo = new Todo();

    // get todo info
    todo.id = req.body.id;
    todo.todo = req.body.todo;

    // save
    todo.save((err) => {
      if(err)
        res.send(err);
      res.json({ message: 'todo created.' });
    });
  })
  .get((req, res) => {
    Todo.find((err, todos) => {
      if(err)
        res.send(err);
      res.json(todos);
    })
  });

/*
 * todo (POST http://localhost:3000/api/todos/:todo_id)
 */
router.route('/todos/:todo_id')
  .get((req, res) => {
    // match id
    Todo.findById(req.params.todo_id, (err, todo) => {
      if(err)
        res.send(err);
      res.json(todo);
    });
  })
  .put((req, res) => {
    Todo.findById(req.params.todo_id, (err, todo) => {
      if(err)
        res.send(err);
      todo.todo = req.body.todo;
      todo.save((err) => {
        if(err)
          res.send(err);
        res.json({ message: 'Todo updateed.' });
      });
    });
  })
  .delete((req, res) => {
    Todo.remove({
      _id: req.params.todo_id
    }, (err, todo) => {
      if(err)
        res.send(err);
      res.json({ message: 'Successfully deleted.' });
    });
  });

/*
 * routing
 */
app.use('/api', router);

/*
 * boot server
 */
app.listen(port);
console.log('listen on port: ' + port);
