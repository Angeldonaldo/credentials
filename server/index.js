const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./db/database');

// MongoDB connection 
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Conexión exitosa a la base de datos')
},
  error => {
    console.log('Error al concetar base de datos :' + error)
  }
)

const userRoute = require('./routes/user.route')

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

app.use('/api', userRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('PORT: ' + port)
})

app.use(function (error, res,) {
  console.error(error.message);
  if (!error.statusCode) error.statusCode = 500;
  res.status(error.statusCode).send(error.message);
});