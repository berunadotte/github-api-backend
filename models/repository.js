const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repositorySchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  stars: { type: Number, required: true }
}, { _id: false });

const Repository = mongoose.model('Repository', repositorySchema);
module.exports = Repository;