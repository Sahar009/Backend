const http = require('http');
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const connectDB = require('./cofig/connectDB')
const app = express();
const userRoute = require('./Routes/userRoute')
const studentRoute = require('./Routes/studentRoute')
const enquiryRoute = require('./Routes/enquiryRoute')
const contactRoute = require('./Routes/contactRoute')
const errorHandler = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary').v2
//reinstalled 
const path = require('path');
const serverPath = path.resolve(__dirname, 'server.js');
require(serverPath);

//Routes
          
cloudinary.config({ 
  cloud_name: 'ds5nnf5hi', 
  api_key: '362823846319858', 
  api_secret: 'kjlomN4fuFuRsl06Csmsp3yLt0M' 
});


    
//middlewaress
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:3000','https://nigerianchess.vercel.app','http://nationalschoolchess.com','https://nigerian-school-chess.onrender.com'],
    credentials:true,
}))

app.get('/', (req,res) =>{
    res.send('Home page');
    });

const PORT =  5000

//Routes middleware
app.use('/api/users', userRoute)
app.use('/api/students', studentRoute)
app.use('/api/enquiry', enquiryRoute)
app.use('/api/contactus', contactRoute)

// error handler
app.use(errorHandler)


//connect to mongoDB and start server

mongoose.connect(`mongodb+srv://akinwumisehinde:z8xNmGUmmVusEK4G@cluster0.llvbzc5.mongodb.net/?retryWrites=true&w=majority`)
.then(() =>{
    app.listen(PORT, () =>{
        console.log(`server running on port ${PORT}`)
    })
})
.catch((err) => console.log(err))
