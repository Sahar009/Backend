const async_handler = require("express-async-handler");
const Student = require("../models/studentModel");

const cloudinary = require("cloudinary").v2;
const NodeCache = require("node-cache");
const { fileSizeFormatter } = require("../utility/fileUpload");
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
    schoolEcobankAccount,
    schoolEmail,
    principalName,
    image,
    ...formData // Destructure the remaining fields
  } = req.body;

  // Parse player data from the form data

  const players = [];
    for (let i = 0; i < 5; i++) {
      if (formData[`name${i}`]) {
        players.push({
          name: formData[`name${i}`],
          dateOfBirth: formData[`dateOfBirth${i}`],
          fideId: formData[`fideId${i}`]
        });
      }
    }


  // Validation
  if (!schoolName || !phone || !address ) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }
  // if(players.length < 4){
  //   throw new Error ('players reg must be more than 4')
  // }
 


  // Save student data to the database
  let fileData = {};

  try {
    //Check if a file is provided in the request
    // if (!req.file) {
    //   res.status(400);
    //   throw new Error('Please provide proof of funds!');
    // }
    // if (!req.files || !req.files['image']) {
    //   res.status(400);
    //   throw new Error('Please provide proof of funds');
    // }
    // //Save the image to cloudinary
    // const uploadedFile = await cloudinary.uploader.upload(req.files['image'][0].path, {
    //   folder: "Proof of Payment",
    //   resource_type: "image",
    // });
    // fileData = {
    //   fileName: req.files['image'][0].originalname,
    //     filePath: uploadedFile.secure_url,
    //     fileType: req.files['image'][0].mimetype,
    //     fileSize: fileSizeFormatter(req.files['image'][0].size, 2),
    // };
    const createdStudent = await Student.create({
      schoolName,
      phone,
      address,
      state,
      ageCategory,
      tutorInfo,
      tutorPhone,
      schoolEcobankAccount,
      schoolEmail,
      principalName,
      image:fileData,
      players // Include players data
    });

    res.status(201).json({ msg: 'Student created successfully', student: createdStudent });
  
 } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ msg: 'Student creation failed', error });
  }
});





// get all  students 
const getStudents = async_handler(async(req,res) => {
  try {
      // Fetch students from the database
      const students = await Student.find().sort('-createdAt');
      
      // Return the fetched students
      res.status(200).json(students);
  } catch (error) {
      // Handle errors
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
  }
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