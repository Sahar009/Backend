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

//reinstalled 
const path = require('path');
const serverPath = path.resolve(__dirname, 'server.js');
require(serverPath);

//Routes

app.get('/', (req,res) =>{
    res.send('Home page');
    });

    
//middlewaress
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:3000','https://nigerianchess.vercel.app'],
    credentials:true,
}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
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

//connect 2

// const startServer = async () =>{
//     try {
//         await  connectDB();
//         app.listen(PORT,() =>{
//             console.log(`server running on port ${PORT}`)
//      } )
//     } catch (error) {
//         console.log(error)
//     }
// }
// startServer()