const express = require('express');
const { getAllUsers,
    getSingleUserById,
    deleteUser,
    updateUserById,
    createNewUser,
    getSubscriptionDetailsById } = require('../Controllers/user-controller');

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

router.get("/", getAllUsers);

/*
* Route: /users/id 
* Method: GET
* Description : Get a single user by id 
* Access : Public  
* Parameters : id
*/

router.get('/:id', getSingleUserById) //:id likhna is the way to include the variable in our route

/*
* Route: /users
* Method: POST
* Description : Create new user
* Access : Public  
* Parameters : none 
*/

router.post('/', createNewUser)

/*
* Route: /users/id
* Method: PUT
* Description : Update user by id 
* Access : Public  
* Parameters : id
*/
router.put('/:id', updateUserById);
//yaha tk ka postman published documentation link is https://documenter.getpostman.com/view/23705255/2s83zfPjpw

/*
* Route: /users/id
* Method: DELETE
* Description : Delete user by id 
* Access : Public  
* Parameters : id
*/
router.delete('/:id', deleteUser)

/*
* Route: /users/subscription-details/:id
* Method: GET
* Description : Get all user subscription details
* Access : Public  
* Parameters : id
*/

router.get('/subscription-details/:id', getSubscriptionDetailsById)


//index.js me ye router import krane ke liye yahan se export bhi krana pdega like
module.exports = router; 