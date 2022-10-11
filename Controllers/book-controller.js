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

//addiitional route to get a book by name 
exports.getSingleBookByName = async (req, res) => { //qki id me kuch bhi a skta h isliye aage aane wale routes me / laga ke aage bhi likhna hoga kch
    const { name } = req.params;



    const book = await BookModel.findOne({
        name: name,
    });

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
    //dto ki mdd se we can exclude/include those fields in the object which we dont want/or want
    //ye IssuedBook ek class h, hence new mtlb us class ka ek new object, with exluded/included fields
    //new IssuedBook krne se actually user me jo issued book wala attribute h , uski jagah pr kya kya ana h , ye pta chlta h via a dto file 



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

// exports.getFinedIssuedBooks = async (req, res) => {
//     const userWithIssuedBooks = await UserModel.find({
//         issuedBook: { $exists: true }, //mtlb bs users me wo users daldo jinke pass book h , yani ki aisa filter lgao ki issueBooks wala attribute true ho
//     }).populate("issuedBook");

//     const issuedBookswithFine = [];
//     userWithIssuedBooks.forEach((each) => {
//         const id = each.id;
//         //issued date se kitne din hn for the subscription to last 
//         const getDateInDays = (data = "") => { //hum isme date de skte hn in format of 01/12/2021 etc
//             //default data =""

//             let date;
//             if (data === "") {
//                 //current date
//                 date = new Date(); //millisecond tk ka ajaega isme
//             }
//             else {
//                 //date on basis of data variable
//                 date = new Date(data);
//             }

//             let days = Math.floor(date / (1000 * 60 * 60 * 24)); //millisecond transformation
//             return days;
//         };

//         const subscriptionType = (date) => {
//             if (each.subscriptionType === "Basic") {
//                 date = date + 90;
//             }
//             else if (each.subscriptionType === "Standard") {
//                 date = date + 180;
//             }
//             else if (each.subscriptionType === "Premium") {
//                 date = date + 365;
//             }
//             return date;
//         };

//         //subscription expiration calculation 
//         //January 1, 1970, UTC.  in milliseconds 
//         //the number of milliseconds that have passed since jna 1 ,1970

//         let returnDate = getDateInDays(each.returnDate);
//         let currenDate = getDateInDays();
//         //agr current date > return date then fine 
//         let subscriptionDate = getDateInDays(each.subscriptionDate);

//         //ab function run krke ye pta chlega subscription kitne din ka tha
//         let subscriptionExpiration = subscriptionType(subscriptionDate);

//         //ager book nhi return kri , to uska fine h 100, + agar subscription bhi khtm ho fir total fine  200
//         const fine = returnDate < currenDate ?
//             subscriptionExpiration <= currenDate ? 200 : 100
//             : 0;
//         if (fine) {
//             const finedBook = BookModel.findById(id);

//             finedBook.issuedBy = each.name;
//             finedBook.issuedDate = each.issuedDate;
//             finedBook.returnDate = each.returnDate;

//             finedBook.fined = fine;

//             issuedBookswithFine.push(finedBook);
//         }
//     })

//     if (issuedBookswithFine.length === 0) {
//         return res.status(404).json({
//             success: false,
//             message: "No books issued that have a fine",
//         })
//     }

//     return res.status(200).json({
//         success: true,
//         data: issuedBookswithFine,
//     })

// }

exports.addNewBook = async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No data provided",
        })
    }

    // const book = books.find((each) => each.id === data.id); //no need to do this because now we have mongoose

    await BookModel.create(data); //nayi book bnana 

    const allBooks = await BookModel.find(); //sari books store krlena including the new one 

    // if (book) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Book already exists with this id, please use a unique id",
    //     })
    // } 
    // No need to do this either

    return res.status(201).json({
        success: true,
        data: allBooks,
    })
}

exports.updateBookById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    //no need to do all this because now we have mongoose
    // const book = books.find((each) => each.id === id);
    // if (!book) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Book not found with this particular id",
    //     })
    // }

    // const udpateData = books.map((each) => {
    //     if (each.id === id) {
    //         return { ...each, ...data }; //purane ko naye se replace
    //     }
    //     return each;
    // })

    //we will find the book by id and update it simultaneously
    const updatedBook = await BookModel.findOneAndUpdate({
        //mongoose me id nhi hoti _id hoti h 
        _id: id,
    }, data, {
        new: true, //ye new wali chiz lgani pdegi wrna wo purana data hi return krdega 
    })


    return res.status(200).json({
        success: true,
        data: updatedBook,
    })
}








// module.exports = { getAllBooks, getSingleBookById };

