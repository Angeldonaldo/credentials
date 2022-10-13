const express = require('express');
const cors = require("cors");
const app = express();
const userRoute = express.Router();
let UserModel = require('../model/User');


userRoute.route('/user').get((req, res) => {
  UserModel.find((error, user) => {
    if (error) {
      console.log("Error")
      return next(error)
    } else {
      res.json(user)
    }
  })
})


userRoute.route('/user/create').post((req, res, next) => {
  UserModel.create(req.body, (err, user) => {
    if (err) {
      return next(err)
    } else {
      res.json(user)
    }
  })
});


userRoute.route('/user/:id').get((req, res) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err)
    } else {
      res.json(user)
    }
  })
})


userRoute.route('/updateuser/:id').put((req, res, next) => {
  UserModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      res.json(user)
    }
  })
})

userRoute.route('/deleteuser/:id').delete((req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: user
      })
    }
  })
})

module.exports = userRoute;
