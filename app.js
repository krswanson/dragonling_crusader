const express = require('express')
const path = require('path')
const app = express()

app.get('/', function (req, res) {
  res.sendFile(path.resolve('index.html'))
})

app.use(express.static(__dirname))

app.listen(4005, function () {
  console.log('Example app listening on port 4005: http://localhost:4005/index.html')
})
