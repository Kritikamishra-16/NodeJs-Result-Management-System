# Welcome to Result Management System

## Project Setup
- Clone the project on your local or extract the zip file
- Execute `npm install` on the same path as of your root directory of the downloaded project
- inside the `src/config` folder inside a file `config.json` in the following piece of json

```
    {
        "development": {
        "username": <YOUR_DB_LOGIN_NAME>,
        "password": <YOUR_DB_PASSWORD>,
        "database": "RESULT_MANAGEMENT_DB_DEV",
        "host": "127.0.0.1",
        "dialect": "mysql"
        }
    }

```
- Once you have added your db config as listed above , go to the src folder from your terminal and execute `npx sequelize db:create`and then execute `npx sequelize db:migrate` and then execute `npx sequelize db:seed:all`

- Now run the command `cd ..` and execute `npm start` on your root directory of the downloaded project inorder to run the project then open the url `http://localhost:3000/api/v1`.

- Login as faculty using the following credentials email: `faculty@gmail.com` , password: `Faculty@123`.