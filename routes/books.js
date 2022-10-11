const express = require('express');

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { getAllBooks,
    getSingleBookById,
    getAllIssuedBooks,
    addNewBook,
    updateBookById,
    getSingleBookByName } = require('../Controllers/book-controller');

const { UserModel, BookModel } = require("../models"); //yahn ../models ke baad index.js specifiy krna zruri nhi h because index.js is the default file in any directory

const router = express.Router();

/*
* Route: /books
* Method: GET
* Description : Get all books 
* Access : Public  
* Parameters : none
*/

router.get('/', getAllBooks)

/*
* Route: /books/:id
* Method: GET
* Description : Get book by id 
* Access : Public  
* Parameters : id
*/

router.get('/:id', getSingleBookById)

router.get("/getbook/name/:name", getSingleBookByName); //book ka name likhte hue in the route, use %20 for spaces


/*
* Route: /books/issued/by-user
* Method: GET
* Description : Get all issued books 
* Access : Public  
* Parameters : none
*/

//ab isme hume user ki bhi zrurt h qki issued book ka data user wale me h 
router.get('/issued/by-user', getAllIssuedBooks)



/*
* Route: /books/issued/withFine
* Method: GET
* Description : Get all issued books with fine   
* Access : Public  
* Parameters : none
*/

router.get('/issued/withFine', (req, res) => {
    const userWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) return each;
    })

    const issuedBookswithFine = [];
    userWithIssuedBooks.forEach((each) => {
        //issued date se kitne din hn for the subscription to last 
        const getDateInDays = (data = "") => { //hum isme date de skte hn in format of 01/12/2021 etc
            //default data =""

            let date;
            if (data === "") {
                //current date
                date = new Date(); //millisecond tk ka ajaega isme
            }
            else {
                //date on basis of data variable
                date = new Date(data);
            }

            let days = Math.floor(date / (1000 * 60 * 60 * 24)); //millisecond transformation
            return days;
        };

        const subscriptionType = (date) => {
            if (each.subscriptionType === "Basic") {
                date = date + 90;
            }
            else if (each.subscriptionType === "Standard") {
                date = date + 180;
            }
            else if (each.subscriptionType === "Premium") {
                date = date + 365;
            }
            return date;
        };

        //subscription expiration calculation 
        //January 1, 1970, UTC.  in milliseconds 
        //the number of milliseconds that have passed since jna 1 ,1970

        let returnDate = getDateInDays(each.returnDate);
        let currenDate = getDateInDays();
        //agr current date > return date then fine 
        let subscriptionDate = getDateInDays(each.subscriptionDate);

        //ab function run krke ye pta chlega subscription kitne din ka tha
        let subscriptionExpiration = subscriptionType(subscriptionDate);

        //ager book nhi return kri , to uska fine h 100, + agar subscription bhi khtm ho fir total fine  200
        const fine = returnDate < currenDate ?
            subscriptionExpiration <= currenDate ? 200 : 100
            : 0;
        if (fine) {
            const finedBook = books.find((book) => book.id === each.issuedBook);

            finedBook.issuedBy = each.name;
            finedBook.issuedDate = each.issuedDate;
            finedBook.returnDate = each.returnDate;

            finedBook.fined = fine;

            issuedBookswithFine.push(finedBook);
        }
    })

    if (issuedBookswithFine.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books issued that have a fine",
        })
    }

    return res.status(200).json({
        success: true,
        data: issuedBookswithFine,
    })

})




/*
* Route: /books
* Method: POST
* Description : Create a new book  
* Access : Public  
* Parameters : none
* Data: author , name, genre, price, publisher,id
*/

router.post('/', addNewBook)

/*
* Route: /books/:id
* Method: PUT
* Description : Update book  
* Access : Public  
* Parameters : id
* Data: author , name, genre, price, publisher,id
*/

router.put('/:id', updateBookById);

//default export., qki ek hi chiz export kr rhe h
module.exports = router;