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
        validate: {
            validator: function(players) {
                return players.length >= 4; // Allow a minimum of 4 players
            },
            message: 'A school must register at least 4 players'
        }
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
        unique: true,
        sparse: true,
        
    },
    schoolEcobankAccount: {
        type:String
    },
    image: {
        fileName: String,
        filePath: String,
        fileType: String,
        fileSize: String,
        
    },
    
}, {
    timestamps: true
});



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
