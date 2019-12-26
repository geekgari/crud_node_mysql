const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get all students from db
app.get("/getall", (req, res) => {
  connection.query("SELECT * FROM students", (err, result) => {
    if (err) {
      res.send("Error in data", err);
    } else {
      res.send(result);
    }
  });
});

// get single student from db
app.get("/getone/:id", (req, res) => {
  let singleData = [req.params.id];
  connection.query(
    "SELECT * FROM students WHERE id=?",
    singleData,
    (err, result) => {
      if (err) {
        res.send("Error in data", err);
      } else {
        res.send(result);
      }
    }
  );
});

// delete an student from db
app.delete("/delete/:id", (req, res) => {
  let remId = req.params.id;
  connection.query("DELETE FROM students WHERE id=?", remId, (err, result) => {
    if (err) {
      res.send("Error in data", err);
    } else {
      res.send("Deleted successfully");
    }
  });
});

// create a new student into db
app.post("/create", (req, res) => {
  let newId = req.body.id;
  let newFname = req.body.fname;
  let newLname = req.body.lname;
  let newEmail = req.body.email;
  let newPhone = req.body.phone;
  connection.query(
    "INSERT INTO students (id, fname, lname, email, phone) VALUES (?,?,?,?,?)",
    [newId, newFname, newLname, newEmail, newPhone],
    (err, result) => {
      if (err) {
        res.send("Error in data", err);
      } else {
        res.send("Added successfully");
      }
    }
  );
});

// create an update student into db
app.put("/update", (req, res) => {
  const updateId = req.body.id;
  const updateFname = req.body.fname;
  const updateLname = req.body.lname;
  const updateEmail = req.body.email;
  const updatePhone = req.body.phone;
  connection.query(
    "UPDATE students SET fname=?, lname=?, email=?, phone=? WHERE id=?",
    [updateFname, updateLname, updateEmail, updatePhone, updateId],
    (err, result) => {
      if (err) {
        res.send("Error in data", err);
      } else {
        res.send("Updated successfully");
      }
    }
  );
});

// connect to server
const port = process.env.port || 5000;
app.listen(port, () => console.log("Server is on port 5000"));
