
const express = require('express');
const router = express.Router()
const protect = require('../middleware/Authmiddleware');
const { createStudent, getStudents, getStudent, deleteStudent, updateStudent} = require('../controllers/studentController');
const { upload } = require("../utility/fileUpload");

router.post('/', upload.single("image"),  createStudent);
router.get('/',  getStudents);
router.get("/:id", getStudent);
router.delete("/:id", protect, deleteStudent);
router.patch("/:id", protect, upload.single("image"), updateStudent);

module.exports = router