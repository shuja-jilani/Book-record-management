//this file is just for optimisation, and for our code to look good 

const UserModel = require('./user-model');
const BookModel = require('./book-model');

//sabko yahan pr import kra ke ek sath export

module.exports = { UserModel, BookModel };

//ye file models ko use krne ke liye h , hum original books.js aur user.js me bhi import kr skte the inhe but
// qki in future bht sare models ho jaenge isliye we make this index.js file for this purpose
