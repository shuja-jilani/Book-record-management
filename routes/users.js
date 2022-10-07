const express = require('express');

//file directory me ek step back ane ke liye we use ../

const { users } = require("../data/users.json");

const router = express.Router(); //router variable bnaaya h for storing all the routes , this is also a functionality in express using the Router()
//ab app.get krke nhi likh skte qki  

/*
writing some documentation for everything we are doing, we will also do this in the postman 

* Route: /users 
* Method: GET
* Description : Get all users 
* Access : Public  
* Parameters : None 

*/

router.get("/", (req, res) => {
    res.status(200).json({
        success: true, //a boolean variable to tell that the request was fulfilled  
        data: users,
    });
});

/*
* Route: /users/id 
* Method: GET
* Description : Get a single user by id 
* Access : Public  
* Parameters : id
*/

router.get('/:id', (req, res) => {
    const { id } = req.params; //req wale parameter me se id nikali 
    const user = users.find((each) => each.id === id); //sare users ko each ke through access kra fir each.id se id match krwai
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
}) //:id likhna is the way to include the variable in our route

/*
* Route: /users
* Method: POST
* Description : Create new user
* Access : Public  
* Parameters : none 
*/

router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } =
        req.body; //body ke andr pura user utaar rhe h aur usko destructure kr rhe h with {} , and fir usme se uska konsa data kya h wo sb dekhenge 
    const user = users.find((each) => each.id === id);
    if (user) { //naya user bna rhe h, to agr us id se pehle se user exist krta h to 
        return res.status(404).json({
            success: false,
            message: "User exists with this id",
        })
    }
    //agr us id se nhi h to naya user bna denge 
    users.push({ //users array me push kr rhe hn
        id, //sirf id likh rhe h and not like id: , because wo sb upr body se utar kr a rha h to id: id likhna is just stupid , so we will do like this
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    })
    return res.status(200).json({
        success: true,
        data: users,
    })

})

/*
* Route: /users/id
* Method: PUT
* Description : Update user by id 
* Access : Public  
* Parameters : id
*/
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found", });
    }
    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return { // ab yahan pr wo ...data wala use krenge to destructure the key value pairs , and humari body wale se update krdenge 
                ...each, // ye update hoga
                ...data  //isse
            }
        }
        return each; //agr id match nhi hui  
    });

    return res.status(200).json({
        success: true,
        data: updatedUser,
    });

});
//yaha tk ka postman published documentation link is https://documenter.getpostman.com/view/23705255/2s83zfPjpw

/*
* Route: /users/id
* Method: DELETE
* Description : Delete user by id 
* Access : Public  
* Parameters : id
*/
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted was not found",
        })
    }
    //we will use the function indexOf, to find the index of the element we want 
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(202).json({
        success: true,
        data: users,
    })
})

//index.js me ye router import krane ke liye yahan se export bhi krana pdega like
module.exports = router; 