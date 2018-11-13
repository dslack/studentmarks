var express = require('express')
var app = express()

let jsonArray;

const csv = require('csvtojson');
async function init() {
    jsonArray = await csv().fromFile('./Students.csv');
}
init();
app.set('view engine', 'pug')


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.render('index');
})

app.get('/students/:studentNumber?*', (req, res) => {
    let sn = req.params.studentNumber
    let student = jsonArray.find(x => {
        return x.Number === sn;
    });
    if (!student) {
        student = {};
    }
    res.json(transform(student));
})

function transform(student) {
    return {
        A1: student["Assignment 1"],
        A2: student["Assignment 2"],
        A3: student["Assignment 3"],
        A4: student["Assignment 4"],
        Midterm: student["Midterm"],
        Final: student["Final"]
    }
}


app.listen(8080);

