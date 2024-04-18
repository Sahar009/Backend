const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a player name'],
        trim: true
    },
    dateOfBirth: {
        type: String,
    },
    fideId: {
        type: String,
        trim: true
    }
});

const studentSchema = mongoose.Schema({
    schoolName: {
        type: String,
        required: [true, 'Please add a school name'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please add school number'],
    },
    state: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    ageCategory: {
        type: String,
        trim: true,
    },
    players: {
        type: [playerSchema],
        // validate: {
        //     validator: function(players) {
        //         return players.length <= 4; // Allow a minimum of 4 players
        //     },
        //     message: 'A school must register at least 4 players'
        // }
    },
    
    tutorInfo: {
        type: String,
        trim: true,
        
    },
    tutorPhone: {
        type: String,
        trim: true,
        default: "234",
    },
    principalName: {
        type: String,
        trim: true
    },
   
    schoolEmail: {
        type: String,
        required: [true, 'please add school email'],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please enter a valid email',
    ],
    
       
        
    },
    schoolEcobankAccount: {
        type:String
    },
    image: {
        fileName: String,
        filePath: String,
        fileType: String,
        fileSize: String,
        // type: Object,
        // default: {},
    },
    
}, {
    timestamps: true
});



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
// const createStudent = async_handler(async (req, res) => {
//     const {
//       schoolName,
//       phone,
//       address,
//       ageCategory,
//       state,
//       tutorInfo,
//       tutorPhone,
//       schoolEcobankAccount,
//       schoolEmail,
//       principalName,
//       image,
//       ...formData // Destructure the remaining fields
//     } = req.body;
  
//     // Parse player data from the form data
//     const players = [];
//     for (let i = 0; i < 5; i++) {
//       if (formData[`name${i}`]) {
//         players.push({
//           name: formData[`name${i}`],
//           dateOfBirth: formData[`dateOfBirth${i}`],
//           fideId: formData[`fideId${i}`]
//         });
//       }
//     }
  
//     // Validation
//     if (!schoolName || !phone || !address) {
//       res.status(400);
//       throw new Error('Please fill in all required fields');
//     }
//      // Check if proof of payment file is present
//   // if (!req.file) {
//   //   res.status(400).json({ msg: 'Please provide proof of payment' });
//   //   return;
//   // }
  
//     // Save student data to the database
//     let fileData = {};
//   try {
//   //   uploadedFile = await cloudinary.uploader.upload(req.files.path, {
//   //     folder: "Proof of Payment",
//   //     resource_type: "image",
//   // });

// //   fileData = {
// //     fileName: req.file.originalname,
// //     filePath: uploadedFile.secure_url,
// //     fileType: req.file.mimetype,
// //     fileSize: fileSizeFormatter(req.file.size, 2),
// // };
//       const createdStudent = await Student.create({
//         schoolName,
//         phone,
//         address,
//         state,
//         ageCategory,
//         tutorInfo,
//         tutorPhone,
//         schoolEcobankAccount,
//         schoolEmail,
//         principalName,
//         image,
//         players // Include players data
//       });
  
//       res.status(201).json({ msg: 'Student created successfully', student: createdStudent });
//     } catch (error) {
//       console.error('Error creating student:', error);
//       res.status(500).json({ msg: 'Student creation failed', error: error.message });
//     }
//   });
  