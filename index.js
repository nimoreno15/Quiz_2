const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://nimoreno15:1020836702Nmc@cluster0.vi04sbh.mongodb.net//Winter24', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  studentID: String
}, { collection: 'w24students' });

const Student = mongoose.model('Student', studentSchema, 'w24students');

// Serve static files
app.use(express.static('public'));

// Handle GET request for root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// Handle POST request for root route
app.post('/', async (req, res) => {
  const { myuri } = req.body;

  // Process MongoDB URI and connect to database
  try {
    await mongoose.connect(myuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB using provided URI');

    // Create new student document
    const newStudent = new Student({
      name: 'Nicolas Moreno Castro',
      studentID: '300367883'
    });

    // Save new student document
    await newStudent.save();
    console.log('Student added to database');

    // Send response
    res.send('<h1>Student Added to Database Winter24 Successfully</h1>');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error connecting to MongoDB. Try again');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});