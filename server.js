require('dotenv').config();

const mongoose = require('mongoose');
(express = require('express')), (app = express());

const port = process.env.PORT || 3000;

user = process.env.USERID
pw = process.env.PW

console.log(user)
console.log(pw)

uri = 'mongodb+srv://'+user+':'+pw+'@cluster0.f9d6o.gcp.mongodb.net/Activitiess'
console.log(uri)

mongoose.connect(
  uri
);

// Create a Schema object
const activitySchema = new mongoose.Schema({
  activity: { type: String, required: true },
});

// This Activitry creates the collection called activitimodels
const Activitymodel = mongoose.model('Activity', activitySchema);

app.get('/', (req, res) => {
  const task1 = new Activitymodel({
    activity: 'activity 111',
  });

  Activitymodel.insertMany([task1]);

  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
