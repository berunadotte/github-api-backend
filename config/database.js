const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/github_db');

const github_db = mongoose.connection;
github_db.on('error', console.error.bind(console, 'connection error:'));
github_db.once('open',() => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;