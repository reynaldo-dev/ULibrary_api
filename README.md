# ULibrary_api
Focus fullstack technical test (ULibrary) 
This is not deployed yet.  

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
 
  - POST /users : To create a new user
 ```
 headers:{
  Authorization : Bearer {token}
 }
 
 body:{
 first_name:{
 	"email":"john.doe@ulibrary.com",
	"first_name":"John",
	"last_name":"Doe"
	"id_rol" : 2
 }
 
 ```
