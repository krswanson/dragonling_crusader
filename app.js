const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 4005
app.get('/', function (req, res) {
  res.sendFile(path.resolve('index.html'))
})

app.use(express.static(__dirname))

app.listen(port, function () {
  console.log('App listening on port:', port)
})
