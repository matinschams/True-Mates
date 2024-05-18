# Requirements 3

1. **Friendship Management**:

   - Created a `Friendship` model to track friendships between users.
   - Added routes and controller methods for adding friends using friendId and
     userId

2. **Pagination for Posts**:

   -Get the page and limit query parameters to determine the subset of posts to
   retrieve. Use findAndCountAll method from Sequelize to fetch the total count
   and the paginated posts, while the limit and offset options specified the
   number of posts per page and the starting index

3. **Friends List with Mutual Friends Count**:

   - Query the Friendship table by userId and retrieves details of friends with
     the User model (ID, name, email)
   - Using the userId and friendId, we can identify the friendship between users
     and map through those friends to find mutuals
