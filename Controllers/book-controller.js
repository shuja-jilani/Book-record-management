//now after making our routes ,  we are making controllers of our routes, so that it is easier to understand the working of our project8 



const IssuedBook = require("../dtos/book-dto");
const { BookModel, UserModel } = require("../models");

// hum inme functions me thode changes krenge , qki ab hum data , database se utha rrhe h isliye via mongoose

exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find(); //ise load hone me lagta h time , isliye async await laga dete h jisse ki aage ka code run hota rhe aur ye load hoke dikh jae via database

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No book found",
        })
    }
    res.status(200).json({
        success: true,
        data: books,
    })
}

exports.getSingleBookById = async (req, res) => { //qki id me kuch bhi a skta h isliye aage aane wale routes me / laga ke aage bhi likhna hoga kch
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) return res.status(404).json({ success: false, message: "Book not found", })


    return res.status(200).json({
        success: true,
        data: book,
    })
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true }, //mtlb bs users me wo users daldo jinke pass book h , yani ki aisa filter lgao ki issueBooks wala attribute true ho
    }).populate("issuedBook"); // hume wo users to mil gaye jinke pass issued book h , but hume ye bhi janna h ke wo konsi book h to, user schema me humne issued books me ref: "Book", daala tha ab hum populate ki madad se usme issued book ki jo id h uske through us book ka sara content nikal lenge 
    //jo humara second loop tha book id se uska content nikalne wala , wo humne skip krdia with the help of populate, this is the power of mongoose 
    //aur aisa krne se users.json , data file me issued book me id ki jaggh pr puri book as a object a jaegi 

    const issuedBooks = users.map((each) => new IssuedBook(each)); //this is a dto (Data Transform Object)
    //dto ki mdd se we can exclude those fields in the object which we dont want
    //ye IssuedBook ek class h, hence new mtlb us class ka ek new object, with exluded fields


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
}













// module.exports = { getAllBooks, getSingleBookById };

