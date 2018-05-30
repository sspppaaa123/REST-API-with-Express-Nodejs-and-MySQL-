const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'your username',
    password: 'your password',
    database: 'your databse name'
});
 

mc.connect();

// To display 'Welcome to REST API' : http://localhost:7000
app.get('/', function (req, res) {
    return res.send('Welcome to REST API');
});
 
// To display all the records : http://localhost:7000/display
app.get('/display', function (req, res) {
    mc.query('SELECT * FROM students', function (error, results, fields) {
        if (error) throw error;
        return res.send(JSON.stringify(results));
    });
});
 
// To display the record whose name matches the keyword : http://localhost:7000/display/search/Raj
app.get('/display/search/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT * FROM students WHERE name LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});
 
// To display the record based on the roll number : http://localhost:7000/display/300
app.get('/display/:id', function (req, res) {
 
    let roll = req.params.id;
 
    mc.query('SELECT * FROM students where rollno=?', roll, function (error, results, fields) { 
        if (error) throw error;      
        return res.send(results[0]);
    });
 
});

//To redirect all other requests to 'Page not found'
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});
 

app.listen(7000, function () {
    console.log('Node app is running on port 7000');
});
 
module.exports = app