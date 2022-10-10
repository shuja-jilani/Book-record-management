const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema(  //uske attributes ke bare me btana + unka hona compulsory h ya nhi
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        //humare database me user and book ke collections me relation h ek, and that is the issuedBook, ye actually h to user ki field, but bta rhi h book ki id book ka ek attribute , hence isko hum differently access kr skte h using mongoose 
        issuedBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book", //mtlb jo id hum isme store krne wale hn that will be from the book collection
            required: false,
        },
        returnDate: {
            type: String,
            required: false,
        },
        subscriptionType: {
            type: String,
            required: true,
        },
        subscriptionDate: {
            type: String,
            required: true,
        },
        //jo fields schema me hn , sirf wohi registered fields hongi, postman ke through or any other ways ke through koi aur , koi aur si field nhi dal skta 
    },
    {
        timestamps: true,
    }
);

//collection will have a name "users"
module.exports = mongoose.model("user", userSchema); //controller bnate hn routes ko chlane ke liye, and model bnate h uski properties btane ke liye 