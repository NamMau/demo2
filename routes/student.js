var express = require('express');
const StudentsModel = require('../models/StudentsModel');
const CityModel = require('../models/CityModel');
var router = express.Router();

//READ feature
//Importance: Must use "async" + await" keywords
router.get('/', async (req, res) => {
   //SQL: SELECT * FROM students
   var studentList = await StudentsModel.find({});
   //console.log(studentList);
   res.render('student/index', { studentList });
});

//DELETE feature
router.get('/delete/:id', async (req, res) => {
   //get id from url
   let id = req.params.id;
   //delete document in collection by id
   //SQL: DELETE FROM students WHERE id = "id"
   await StudentsModel.findByIdAndDelete(id);
   //console.log("Delete student succeed !");
   //redirect to student list page
   res.redirect('/');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM students
   //SQL: TRUNCATE TABLE students
   await StudentsModel.deleteMany();
   res.redirect('/');
})
//step 1: render "Add student form for user to input"
router.get('/add',async (req, res) =>{
   var cities = await CityModel.find({})
   res.render('student/add', {cities})
})
//step 2: get input data from form and add to database
router.post('/add', async (req, res)=>{
   //get input data from form
   var student = req.body
   await StudentsModel.create(student)

   res.redirect('/student')
})

router.get('/edit/:id', async(req, res)=>{
   var id = req.params.id
   var student = await StudentsModel.findById(id)
   res.render('student/edit', {student})
})
router.post('/edit/:id', async(req, res)=>{
   var id = req.params.id
   var student = req.body
   await StudentsModel.findByIdUpdate(id, student)
   res.redirect('/student')
})
module.exports = router;