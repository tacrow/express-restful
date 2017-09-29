'use strict';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

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
      res.json(todo);
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
 * routing
 */
app.use('/api', router);

/*
 * boot server
 */
app.listen(port);
console.log('listen on port: ' + port);