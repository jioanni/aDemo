const express = require('express')
const app = express()
const PORT = 3000 || process.env.PORT
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const api = require('./api')
const path = require('path')

app.use(volleyball)

app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use('/api', api)

app.use(express.static(path.join(__dirname, '/dist')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

module.exports = { app }