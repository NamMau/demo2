var mongoose = require('mongoose')

//declare schema (table design structure)

var StudentSchema = mongoose.Schema(
{
    id: String,
    name: String,
    birthYear: Number,
    gender: String,
    gpa: Number,
    image: String,
    motherland: String
}
);

//declare model to be used in routes
var StudentsModel = mongoose.model("students", StudentSchema)

module.exports = StudentsModel
