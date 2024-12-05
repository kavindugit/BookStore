import express from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from "./Models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";

const app = express();

app.use(express.json());

// middleware for handling CORS POLICY

// option 1: Allow all origins with default of cors(*)
app.use(cors())

// option 2: Allow custome origins

app.use(cors({
    origin: 'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.get('/',(request,response) => {
    console.log(request)
    return response.status(234).send(`Welcome to MERN Stack Tutorial`)
});

app.use('/books',bookRoute);
mongoose
    .connect(mongoDBURL)
    .then( () => {
        console.log('App connected to the database')
        app.listen(PORT , ()=> {
            console.log(`App is listening the port: ${PORT}`);
        });
    })
    .catch((error)=> {
        console.log(error);
    });


