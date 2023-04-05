# ULibrary_api
Focus fullstack technical test (ULibrary) 

### Tech Stack  
- Node js 
- Express
- jwt
- middlewares for routes security
- class validator
- PrismaORM
- Typescript
- Docker  
- Postgres
  
    
 ### Modules  
 - Users
 - Auth
 - Borrows
 - Books  
 - Roles  
   

### Instalation
 
 ```
 shell
 
 npm install  
 npm run dev  
 
 or with docker  
 docker build -t ulibrary .  
 docker-compose up
 
 ```
 
 ### Endpoints
 BaseUrl: https://ulibrary-api.onrender.com

 - POST /auth/login : Login with credentials
 ```
 body:{
"email":"john.doe@ulibrary.com",
"first_name":"John",
"last_name":"Doe"
}
 ```
 
  - GET /auth/whoami : Refresh token and autolog 
 ```
 headers:{
  Authorization : Bearer {token}
 }
 
 ```

   - GET /users?first_name={first_name} : Get user by firstname
 ```
 headers:{
  Authorization : Bearer {token}
 }
 
 ```
 
  - POST /users : To create a new user
 ```
 headers:{
  Authorization : Bearer {token}
 }
 
 body:{
 "email":"john.doe@ulibrary.com",
 "first_name":"John",
 "last_name":"Doe"
 "id_rol" : 2
 }
 
 ```


  - GET /books?query={title, author or genre} : Filter book
 ```
 headers:{
  Authorization : Bearer {token}
 }
 
 ```

  - POST /books : To create a new book
 ```
 headers:{
  Authorization : Bearer {token}
 }
 
 body:{
"title":"Javascript for seniors",
"author":"Mike Bhole",
"published":"09/11/2022",
"id_genre":8,
"stock":25
 }
 
 ```

   - GET /borrows?student={email or first_name} : Filter borrow by student
 ```
 headers:{
  Authorization : Bearer {token}
 }
 ```

  - POST /borrow : To create a new borrow
 ```
 headers:{
  Authorization : Bearer {token}
 }
 
 body:{
"id_user":42,
"id_book":86,
"id_borrow":123,
"from_date":"2022/12/12",
"to_date":"2022/12/12",
"state":"Active"
 }
 
 ```


  - PUT /borrows : Update borrow state 
 ```
 "Active" when a student request a borrow
 "To return" when he make a return borrow request
 "Returned" when the librarian confirm the return of that borrow  

 headers:{
  Authorization : Bearer {token}
 }

 body:{
    "state":"Active" | "To return" | "Returned",
	"id_borrow":17
 }
 ```
 


