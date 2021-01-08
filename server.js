var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

console.log(`================================`);
// Body Parser, otherwise body will be undefined
const bodyParser = require("body-parser");
// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
// It is written on top of busboy for maximum efficiency.
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// When you submit a file, you receive the file name, type, and size in bytes within the JSON response
app.post("/api/fileanalyse", upload.single('upfile'), (request, response) => {
  // <input name="upfile">
  // req.file is the 'upfile' file
  //console.log(`request.file: ${request.file}`);
  //console.log(`request.file["originalname"]: ${request.file["originalname"]}`);
  //console.log(`request.file["mimetype"]: ${request.file["mimetype"]}`);
  //console.log(`request.file["size"]: ${request.file["size"]}`);

  const nameObject = request.file["originalname"];
  const typeObject = request.file["mimetype"];
  const sizeObject = request.file["size"];

  response.json({
    name: nameObject,
    type: typeObject,
    size: sizeObject
  });
});

// Include this, otherwise Couldn't Reach Your Repl
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

console.log(`Last line of node.js app`);