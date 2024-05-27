import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app=express()

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
 app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
 })