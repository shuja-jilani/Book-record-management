const express = require('express');

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");


const router = express.Router();

/*
* Route: /books
* Method: GET
* Description : Get all books 
* Access : Public  
* Parameters : none
*/

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    })
})

/*
* Route: /books/:id
* Method: GET
* Description : Get book by id 
* Access : Public  
* Parameters : id
*/

router.get('/:id', (req, res) => { //qki id me kuch bhi a skta h isliye aage aane wale routes me / laga ke aage bhi likhna hoga kch
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found", })


    return res.status(200).json({
        success: true,
        data: book,
    })
})

/*
* Route: /books/issued/by-user
* Method: GET
* Description : Get all issued books 
* Access : Public  
* Parameters : none
*/

//ab isme hume user ki bhi zrurt h qki issued book ka data user wale me h 
router.get('/issued/by-user', (req, res) => {
    const userWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) return each;
    })

    // console.log(userWithIssuedBooks);

    const issuedBooks = [];

    userWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook); // wo book user ke pass h jiski id user wali book id se match ho jae

        //new attributes added from our side
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books issued yet",
        })
    }

    return res.status(200).json({
        success: true,
        data: issuedBooks,
    })
})


//default export., qki ek hi chiz export kr rhe h
module.exports = router;