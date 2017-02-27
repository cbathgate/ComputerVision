const express = require('express');
const session = require('express-session');
const auth = require('./middleware/authentication.js');
const teacherdata = require('./middleware/teacherdatafetcher.js');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(session({
  secret: 'shhh, it\'s a secret',
  cookie: { maxAge: 60000},
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());

//TEACHER
app.get('/auth/signedIn', auth.checkSession);
//app.post('/auth/logout', auth.userLogout);
app.post('/auth/login', auth.userLogin, teacherdata.getTeacherData);
app.post('/auth/signup', auth.userSignup, teacherdata.getTeacherData);
app.post('/teacher/addClass', teacherdata.addClass);
app.post('/teacher/addAnswerKey', teacherdata.addAnswerKey);
app.post('/teacher/addTest', teacherdata.addTest);
app.get('/teacher/getClasses', teacherdata.getClasses);
app.get('/teacher/getStudentsforClass', teacherdata.getStudentsforClass);
app.get('/teacher/getAllStudents', teacherdata.getAllStudents);
//app.get('/teacher/getClass', teacherdata.getClass);

//STUDENT
app.post('/studentauth/signup', auth.studentSignup);
//app.post('/studentauth/login', auth.studentLogin);

app.use(express.static(path.join(__dirname + '/../client/')));

// Handle wildcard route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

module.exports = app;
