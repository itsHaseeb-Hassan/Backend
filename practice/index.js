import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './db/index.js';
import morgan from 'morgan';
dotenv.config()
const app=express()

app.use(morgan('default'));

const passwordMiddleware = (req, res, next) => {
    const password = req.query.password;
    if (password === process.env.PASSWORD) {
        next(); 
    } else {
        res.status(403).send('Forbidden: Incorrect password');
    }
};
// if middelware use All routes
// app.use(passwordMiddleware);
// specific route apply midelware
app.get('/',passwordMiddleware, (req, res) => {
    res.send("My First Page is This");
 });
 
 app.post('/', (req, res) => {
    res.send("POST request to the homepage");
 });
 
 app.delete('/', (req, res) => {
    res.send("DELETE request to the homepage");
 });
 
 app.put('/', (req, res) => {
    res.send("PUT request to the homepage");
 });
 
 app.patch('/', (req, res) => {
    res.send("PATCH request to the homepage");
 });



 const port = process.env.PORT || 30001


 connectDb().then(()=>{

    app.listen(port,()=>{
       console.log(`Server is running on port ${port}`);
    })
 }).catch(
     (error)=>{
         console.error('Connection to MongoDB failed:', error.message);
     }
 )