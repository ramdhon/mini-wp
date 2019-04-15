# mini-wp app
Mini-WP REST API built with Express and Mongoose

List of user routes:
| Route           | HTTP   | Description                                      |
|-----------------|--------|--------------------------------------------------|
| /articles       | GET    | Get all articles                                 |
| /articles       | POST   | Create a article (only authenticated user)       |
| /articles/:id   | GET    | Get a article by id (only authenticated user)    |
| /articles/:id   | PUT    | Update a article by id (only authenticated user) |
| /articles/:id   | DELETE | Delete a article by id (only authenticated user) |
| /users/user     | GET    | Get authenticated user info (only auth user)     |
| /google-sign-in | POST   | Sign in with google account                      |
| /sign-in        | POST   | Normal sign in                                   |
| /sign-up        | POST   | Normal sign up                                   |

## Usage
Make sure you have Node.js and npm installed in your computer and then run these commands:
```console
$ npm install
$ npm start
```
Make sure you have set all required your .env parameters 
<br>(keys reference: .env.example)

Access the REST API via `http://localhost:3000`