const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  puesto: {
    type: String
  },
  image: {
    type: String
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)