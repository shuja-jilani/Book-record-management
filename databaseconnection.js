//a file to connect to connect my database to my server everytime I start the server
//database se connect ke liye .env h, aur server ke liye index.js


const mongoose = require('mongoose');

function DbConnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true, //few additional settings from our side for performance purposes
        useUnifiedTopology: true,
    })

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection error: "));
    db.once('open', function () {  //once sirf ek baar server ko run krne ke baad chlega , on() har time chlega , to check for errors and other things as well 
        //open ka mtlb server and db are connected
        console.log("Db Connected..."); //database se connect ho gaye with mongoose 
    })

}

module.exports = DbConnection; //ise export krna h to the index .js 