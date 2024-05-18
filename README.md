## Requirements 2

1. **Add Created At Attribute to Post**:

   - Update the Post model to include a `createdAt` attribute
   - Create a migration to add the `createdAt` and `photos`
   - NOTE : The migration file for `createdAt` is not necessary as sequelize
     automatically set the `timestamp` to `true`

2. **Calculate Time Difference for Posts**:

   - Create a utility function that computes the time passed since a post was
     created. This function converts the difference between the current time and
     the post's creation time
   - Update the `getPosts` method in the post controller to include the time
     difference.

3. **Multiple Photos for a Post**:

   - Update the Post model to include a `photos` attribute as an array of
     strings.
   - Create a migration file to add the `photos` column.
   - Update the `createPost` method in the post controller to handle multiple
     photo uploads (up to 5).

4. **Edit Post Description**:
   - Add an `editPost` method in the post controller to allow users to edit the
     description of their posts.
   - Take the new `description` from the request body and replace the existing
     description logged in our database by that user
   - Updated the routes to include a PUT endpoint for editing posts.
