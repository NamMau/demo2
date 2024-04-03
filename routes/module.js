const express = require('express');
const router = express.Router();
const ModuleModel = require('../models/ModuleModel');

//url: localhost:3000/module
router.get('/', async (req, res) => {
   let modules = await ModuleModel.find({});
   res.send(modules);
})

router.get('/delete/:id', async(req, res) =>{
    let id = req.params.id;
    await ModuleModel.findByIdAndDelete(id)
    res.send("Delete module succeed")
    let module = ModuleModel.findById(id)
})

module.exports = router;