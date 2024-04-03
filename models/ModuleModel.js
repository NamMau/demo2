var mongoose = require('mongoose')
var ModuleSchema = mongoose.Schema ({
    name: String,
    code: String
})

const ModuleModel = mongoose.model("modules", ModuleSchema)
module.exports = ModuleModel