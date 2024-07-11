const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const directoryPath = "./";

app.get("/", function(req, res) {
  fs.readdir(directoryPath, function(err, files) {
    if (err) {
      // console.error(`Error listing files in directory : ${directoryPath}`);
      res.status(500).send(`Error listing files in directory : ${directoryPath}`);
    } else {
      // console.log(`Files: ${files}`);
      res.status(200).json({"files": files});
    }
  });
});

app.get("/:filename", function(req, res) {
  const filename = req.params.filename;
  console.log(`File name: ${filename}`);
  const filePath = path.join(directoryPath, filename);
  fs.readFile(filePath, "utf-8", function(err, data) {
    if (err) {
      // console.error(`Error reading the file: ${filePath}`);
      res.status(404).send("File not found");
    } else {
      // console.log(`File read successfully: ${filePath}`);
      res.status(200).send(data);
    }
  });
});

app.all("*", function(req, res) {
  // console.error("Invalid route has been hit");
  res.status(404).send("Route not found");
})

// app.listen(3000);

module.exports = app;