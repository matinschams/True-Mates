# Requirement 1

1. **Create Express.js app and use PostgreSQL**:

   - Install necessary dependencies needed for the project
   - Setup a `PostgreSQL` database in the terminal with a database name and
     admin role

2. **Make routes for user registration/login**

   - Create a `User` model with the sequelize-cli, with the fields `name`,
     `email` and `password` (npx sequelize-cli model:generate --name User
     --attributes name:string,email:string,password:string)
   - Create a POST at the `/api/user/register` and `/api/user/login` endpoint to
     handle logic for registration and login
   - Registration logic includes pulling `name`, `email` and `password` from the
     request body to create a user and store it in our database
   - Login logic includes verifying the user's `email` and `password`. After
     retrieving the user from the database, `bcrypt` is used to compare the
     provided password with the stored hashed password. If the credentials are
     valid, a `JWT token` is generated and sent back to the user.
   - Use `bcrypt` for password security

3. **Users can login and received a JWT token**

   - Create a middleware function that verifies the `JWT token` provided in the
     request headers. Extract the token, validate it using the secret key, and
     attach the decoded user information to the request object,

4. **Logged in users can create a Post**:
   - Create a `Post` model with the sequelize-cli, with the fields
     `description`, `photo`, and `userId` (npx sequelize-cli model:generate
     --name Post --attributes description:string,photo:string,userId:integer)
   - Create a POST at the `/posts` endpoint to handle logic for creating a post
   - Create Post logic includes grabbing the `description` and `photo` file from
     the request body to log to our database
   - Use `Multer` to automatically parse `multipart/form-data` requests and
     temporarily store files. Process and upload these files to Google Cloud
     Storage, with their public URLs stored in the database
