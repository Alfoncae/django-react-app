# Distinctiveness and Complexity
Here are some key part's explaining this:  
* This project is very different to what we have been working on with 
    including projects like commerce and network.

* This project uses the django
    restframework along with react. Using react as the frontend came 
    with several new changes to what we were used to like components 
    which were not in regular javascript.

* I had to send request's to my 
    backend (restframework) to get the user data through to the 
    frontend. The backend required serializing, api classes and
    auhtentication using a JWT (JSON Web Token) which has an acces 
    token and a refresh token for extra security.

* frameworks did put the complexity of this project higher than 
    expected knwoing all the different syntax.

* The **restframework** also requires to serialize the data in order to send it to the frontend and receive then convert back into **JSON** in the frontend 

# Files
Having a back and frontend comes with a lot of files, here is what they contain:
* ### **Backend**

    * The **Manger** folder is the app containing most of the backend that will be running.

    * The **urls** file has all the api endpoints and token usages.

    * **models** consists of the 2 classes one for a user and the other for the transactions the user will be setting.

    * **serializers** has the data and passes it as strings in order to receive the information in the api

    * **views** has 5 functions, 3 of them are both transaction ones. One for a specific transaction, one for the current day transactions and the other is to add, withdraw or deposit some money. And the other 2 are just to register and to get the use details. All except the register have a decorator preventing a person not logged in to use the api.

* ### **Frontend**
    * **Components** is a folder containing the components I use in the project which helps with organization.
        * AddModal
        * SaveModal
        * TransactionModal
        * WithdrawModal
        * Heading
        * InfoExpand
        * LoggedIn
        * Login
        * Navbar
        * SignUp
    * Another folder **Hooks** has custom hooks which I only have 1 of named **UseFetch** to make fetch requests simpler

    * The **pages** folder contains the **Account**, **Home**, **Intro** and the **Wallet** pages which are the main pages. All those use the components that we've listed above.

    * The **accordion** css file contains styling for the InfoExpand component and the styles is just for the whole styling of the project.

    * There is also a **requirements** file which has all the packages that were installed.

# How to run application
Running the application is very simple first startup the django for the backend api then start the frontend (React) which is where the application will be visually running.
    
    python3 manage.py runserver

    npm start

* You'll get directed to a page where it tells you a bit about the the app is about and 2 buttons a **Login** button and a **Signup** button.

* When clicking on either one you have the option to if you're on the login page to be able to go to the signup page vice versa. 

* upon registering for an account there will be 3 buttons or links to navigate though the app.

* And you can log out in the account page if you'd like.

# Extra Information

* **localStorage** does have 3 things in it one the **access** token which is used to verify the user second the **refresh** token which just refreshes keeps the token unique often and third the **username**.

* I am also just using the **sqlite3** database that django provides upon creation of the app.  

* A **virtual enironment** is also used in the project to keep the packages being installed to their own seperate project which then helps the organization of things.

* The only **bootstrap** that was implemented were the modals and the accordion other than that the css is all from scratch no other frameworks were used for styling.