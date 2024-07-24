const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Define a Schema object
const studentSchema = new mongoose.Schema({
  myName: String,
  mySID: String,
});

// Create a Model object
const Student = mongoose.model("s24students", studentSchema);

// Serve the form HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// Handle form submission
app.post("/", async (req, res) => {
  const { uri } = req.body;

  try {
    // Connect to the MongoDB database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Add the data to the database
    const student = new Student({
      myName: "Jordan Sidney-Dunu", 
      mySID: "300341590", 
    });

    await student.save();
    res.send("<h1>Document Added</h1>");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error connecting to MongoDB or saving data.");
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
