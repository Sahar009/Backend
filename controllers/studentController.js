const async_handler = require("express-async-handler");
const Student = require("../models/studentModel");
const { fileSizeFormatter } = require("../utility/fileUpload");
const cloudinary = require("cloudinary").v2;
const NodeCache = require("node-cache");
const cache = new NodeCache();

const createStudent = async_handler(async (req, res) => {
  const {
    schoolName,
    phone,
    address,
    ageCategory,
    state,
    tutorInfo,
    tutorPhone,
    // proofOfPayment,
    schoolEcobankAccount,
    schoolEmail,
    principalName,
    image
  } = req.body;

  // Validation
  if (!schoolName || !phone || !address) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  // Check if proof of payment file is present
  if (!req.file) {
    res.status(400).json({ msg: 'Please provide proof of payment' });
    return;
  }

  // Upload proof of payment file to Cloudinary
  let fileData = {};
  try {
    uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "Student mgt App",
      resource_type: "image",
  });

  fileData = {
    fileName: req.file.originalname,
    filePath: uploadedFile.secure_url,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2),
};
    const createdStudent = await Student.create({
      schoolName,
      phone,
      address,
      state,
      ageCategory,
      tutorInfo,
      tutorPhone,
      image: fileData,
      schoolEcobankAccount,
      schoolEmail,
      principalName,
    });

    res.status(201).json({ msg: 'Student created successfully', student: createdStudent });
  } catch (error) {
    console.error('Error uploading proof of payment to Cloudinary:', error);
    res.status(500).json({ msg: 'Proof of payment could not be uploaded', error: error.message });
  }

 
});




// get all  students 
const getStudents = async_handler(async(req,res) =>{
  // Check if students data exists in the cache
  const cachedStudents = cache.get("students");
  if (cachedStudents) {
      return res.status(200).json(cachedStudents);
  }

  // Fetch students from the database
  const students = await Student.find().sort('-createdAt');
  
  // Store fetched students in the cache
  cache.set("students", students);

  res.status(200).json(students);
});

// Get single student
const getStudent = async_handler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    // if Student doesnt exist
    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }
    // Match Student to its user
    if (student.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(student);
  });


  // Delete Student
const deleteStudent = async_handler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    // if Student doesnt exist
    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }
    // Match student to its user
    if (student.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    await student.deleteOne();
    res.status(200).json({ message: "Student successfully deleted." });
  });


  // update student 
  const updateStudent = async_handler(async (req, res) => {
    const {name, paid,course,price, description, email, phone} =req.body
    const { id } = req.params;
  
    const student = await Student.findById(id);
  
    // if student doesnt exist
    if (!student) {
      res.status(404);
      throw new Error("student not found");
    }
    // Match student to its user
    if (student.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    // Handle Image upload
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Student mgt App",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  
    // Update student
    const updatedstudent = await Student.findByIdAndUpdate(
      { _id: id },
      {
        name,
        description,
        course,
        paid,
        phone,
        image: Object.keys(fileData).length === 0 ? student?.image : fileData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  
    res.status(200).json(updatedstudent);
  });
  


module.exports ={
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
    
}