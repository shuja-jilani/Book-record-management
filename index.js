const express = require('express');

//JSON data import from other files on the folder , {} ke andr jo bhi likhenge , that will be read and recognised as an object, js wala object , also a json 
// const { users } = require("./data/users.json");
// const { books } = require("./data/books.json");

//importing routes 
const usersRouter = require('./routes/users'); //js file ke liye extension .js likhna nhi hota 
const booksRouter = require('./routes/books');


const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});

app.use('/users', usersRouter); //qki yahan pr /users likh dia h isliye users.js wali file me nhi
app.use('/books', booksRouter);


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});
