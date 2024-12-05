import express from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from "./Models/bookModel.js";

const app = express();

app.use(express.json());

app.get('/',(request,response) => {
    console.log(request)
    return response.status(234).send(`Welcome to MERN Stack Tutorial`)
});

//route for save a new book
app.post('/books',async(request,response) => {
    try{
        if(!request.body.title ||!request.body.author ||!request.body.publishYear )
        {
            return response.status(400),send({
                message: 'Send all required fiels : title , author , publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
});

//Route for get all books from database
app.get('/books', async(request,response) => {
    try{
        const books = await Book.find({});
        //return response.status(200).json(books);
        return response.status(200).json({
            count: books.length,
            data: books

        })
    }catch(error){
        console.log(error.massage);
        response.status(500).send({message : error.message});
    }
});

// Route for get one book from database by id

app.get('/books/:id', async(request,response) => {
    try{

        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);

    }catch(error){
        console.log(error.massage);
        response.status(500).send({message : error.message});
    }
});

// Route for update a Book

app.put('/books/:id' , async (request,response) => {
    try{

        if(!request.body.title ||!request.body.author ||!request.body.publishYear )
            {
                return response.status(400),send({
                    message: 'Send all required fiels : title , author , publishYear',
                });
            }

        const{id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message :'Book not found'});
        }

        return response.status(404).json({message :'Book update Successfully'});


    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});

    }
});



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

