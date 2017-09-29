'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  id: Number,
  todo: String
});

module.exports = mongoose.model('Todo', TodoSchema);
