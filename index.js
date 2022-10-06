const express = require('express');

//JSON data import from other files on the folder , {} ke andr jo bhi likhenge , that will be read and recognised as an object, js wala object , also a json 
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is up and running",
    });
});

/*
writing some documentation for everything we are doing, we will also do this in the postman 

* Route: /users 
* Method: GET
* Description : Get all users 
* Access : Public  
* Parameters : None 

*/

app.get("/users", (req, res) => {
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
* Parameters : None 
*/

app.get('/users/:id', (req, res) => {
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

app.post('/users', (req, res) => {
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
* Parameters : none 
*/
app.put('/users/:id', (req, res) => {
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

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});
