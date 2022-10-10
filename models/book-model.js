const mongoose = require('mongoose');

const schema = mongoose.Schema;

const bookSchema = new schema(  //uske attributes ke bare me btana + unka hona compulsory h ya nhi
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

//collection will have a name "books"
module.exports = mongoose.model("Book", bookSchema); //controller bnate hn routes ko chlane ke liye, and model bnate h uski properties btane ke liye 