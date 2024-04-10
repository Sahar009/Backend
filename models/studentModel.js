const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a player name'],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    fideId: {
        type: String,
        trim: true
    }
});

const studentSchema = mongoose.Schema({
    schoolName: {
        type: String,
        required: [true, 'Please add a  school name'],
        trim: true
    },
    phone: {
        type: String,
        default: "234",
        required: [true, 'Please add school number'],

    },
   
    state: {
        type: String,
        trim: true,
       

    },
    address: {
        type: String,
        trim: true,
        // required: [true, 'Please add address'],

    },
    ageCategory: {
        type: String,
        trim: true,
        // required: [true, 'must select age category'],

    },
    players: {
        type: [playerSchema],
        validate: {
            validator: function(players) {
                return players.length >= 4 && players.length <= 5;
            },
            message: 'A school must register between 4 and 5 players'
        }
    },
    tutorInfo: {
        type: String,
        trim: true

    },
    principalDetails: {
        type: String,
        trim: true
    },
    schoolEmail: {
        type: String,
        trim: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@(($$[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$$)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        ]
    },
    schoolEcobankAccount: {
        type: Number
    },
    proofOfPayment: {
        type: String
    },
    image: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
