const { BookModel, UserModel } = require("../models");

exports.getAllUsers = async (req, res) => {

    const users = await UserModel.find();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users found",
        })
    }

    res.status(200).json({
        success: true, //a boolean variable to tell that the request was fulfilled  
        data: users,
    });
};

exports.getSingleUserById = async (req, res) => {
    const { id } = req.params; //req wale parameter me se id nikali 
    const user = await UserModel.findById({ _id: id });

    if (!user) { //agr nhi mila to 
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
    //agr mil gya to 
    return res.status(200).json({
        success: true,
        data: user,
    })
};

exports.createNewUser = async (req, res) => {
    const { data } = req.body; //body ke andr pura user utaar rhe h aur usko destructure kr rhe h with {} , and fir usme se uska konsa data kya h wo sb dekhenge 

    const newUser = await UserModel.create(data);

    return res.status(200).json({
        success: true,
        data: newUser,
    })

}

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updatedUserData = await UserModel.findOneAndUpdate({
        _id: id,
    }, {
        $set: { //sirf particular fields ko update krega
            ...data,
        }
    },
        {
            new: true,
        })

    return res.status(200).json({
        success: true,
        data: updatedUserData,
    });

}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.deleteOne({
        _id: id,
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted was not found",
        })
    }

    return res.status(202).json({
        success: true,
        message: "deleted the user successfully"
    })
}

exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }
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
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        }
        else if (user.subscriptionType === "Standard") {
            date = date + 180;
        }
        else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };

    //subscription expiration calculation 
    //January 1, 1970, UTC.  in milliseconds 
    //the number of milliseconds that have passed since jna 1 ,1970

    let returnDate = getDateInDays(user.returnDate);
    let currenDate = getDateInDays();
    //agr current date > return date then fine 
    let subscriptionDate = getDateInDays(user.subscriptionDate);

    //ab function run krke ye pta chlega subscription kitne din ka tha
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currenDate, //a boolean 

        daysLeftForExpiration: subscriptionExpiration <= currenDate ? 0 : subscriptionExpiration - currenDate, // kitne din bache h 

        //ager book nhi return kri , to uska fine h 100, + agar subscription bhi khtm ho fir total fine  200
        fine: returnDate < currenDate ?
            subscriptionExpiration <= currenDate ? 200 : 100
            : 0,
    }

    return res.status(200).json({
        success: true,
        data,
    })

}