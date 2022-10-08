<!-- # is for heading in the readme file  -->

# book-record-management
<!-- API is nothing but application interface, that is the routes used inside the server by front end to communicate with the server for the data stored on it -->

This is a book record management API backend for the management of records and books 

# API Documentation link 

https://documenter.getpostman.com/view/23705255/2s83zfPjpw
# Routes and Endpoints 
<!-- /users hi end point h abhi   -->
## /users               
POST: Create a new user ✅  
GET: Get all list of users ✅

<!-- ek id hoti h , jo har user ke liye different hoti h , this will be used like a dynamic route , qki we will be using the id variable , but hr user ke liye wo differently hoga , isliye dynamic -->

## /users/{id}
GET: Get a user by id ✅
PUT: Update a user by id ✅
DELETE: Delete a user by id (check if he/she still has an issued book) (is there any fine to be paid)✅
<!-- us user ko delete nhi krna jisne already book le rkhi h, ya fir jiske upr fine pending h  -->

## users/subscription-details/{id}
GET: Get user subscription details ✅
1. Date of subscription 
2. Valid till 
3. Fine if any 

## /books 
GET: Get all books ✅
POST: Create/Add a new book ✅

## /books/{id} 
GET: Get a book by id✅ 
PuT: Update a book by id ✅


## /books/issued/by-user
GET: Get all issued books ✅

## /books/issued/withFine 
GET: Get all the issued books with fine ✅

# Subscription Types 
Basic (3 months)
Standard (6 months)
Premium (12 months)

dates will be in format mm/dd/yyyy

If the subscription date is 01/08/22
and subscription type is Standard 
the valid till date will be 01/02/23

If he has an issued book and the issued book is to be returned at 01/01/23
and he misses it, then he gets a fine of Rs. 100./

If he has an issued book and the issued book is to be returned at 01/01/23
If he missed the date of return, and his subscription also expires, then he will get 
a fine of Rs. 200./


