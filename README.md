# Requirement 1

1. **Create Express.js app and use PostgreSQL**:

   - Install necessary dependencies needed for the project
   - Setup a PostgreSQL DB in the terminal with a DB name and admin role

2. **Make routes for user registration/login**

   - Create a `User` model with the sequelize-cli, with the fields `name`,
     `email` and `password` (npx sequelize-cli model:generate --name User
     --attributes name:string,email:string,password:string)
   - Create a POST at the `/api/user/register` and `/api/user/login` endpoint to
     handle logic for registration and login
   - Used `bcrypt` for password security

3. **Users can login and received a JWT token**

   - Create a JWT auth middleware to assign JWT token for proper authorization

4. **Logged in users can create a Post**:
   - Create a `Post` model with the sequelize-cli, with the fields
     `description`, `photo`, and `userId` (npx sequelize-cli model:generate
     --name Post --attributes description:string,photo:string,userId:integer)
   - Setup Google Cloud Storage, creating a bucket and project then importing
     said service-account.json into config folder
   - Create a POST at the `/posts` endpoint to handle logic for creating a post
