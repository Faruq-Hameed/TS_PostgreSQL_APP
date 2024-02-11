# CRUD REST API with TypeScript Node.js, Express, and PostgreSQL
 - In this tutorial, we’ll create a CRUD RESTful API in a Node.js, TS environment that runs on an Express server and uses a PostgreSQL database.

 - [Tutorial Source ](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/)

 -Our goal is to allow CRUD operations — GET, POST, PUT, and DELETE — on the API

 PostgreSQL_Basic/
├── src/
│   ├── index.ts
├── tsconfig.json
├── package.json

- connected with the PostgreSQL database

### Endpoints
- GET: / | displayHome()
- GET: /users | getUsers()
- GET: /users/:id | getUserById()
- POST: /users | createUser()
- PUT: /users/:id | updateUser()
- DELETE: /users/:id | deleteUser()
