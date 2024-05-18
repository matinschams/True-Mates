# True-Mates Challenge

## Summary

All requirements have been completed and seperated into their own feature
branches. All screenshots of functionality are in the main branch README file
and the feature branches hold a README file of feature implementation.

## Startup

Install all dependencies

1. `npm install`

Copy the env file and fill in your own information

2. `cp .env.example .env`

Start the node server

3. `npm start`

You are ready !

## Run with Docker (Temporarily Removed: Follow Alternative Instructions)

**TEMPORARILY REMOVED DOCKER METHOD**

Follow the steps below to get the application running

1. `docker-compose up --build`

Copy env. example file and fill in your values

2. `cp .env.example .env`

Run database migrations

3. `docker-compose exec app npx sequelize-cli db:migrate`

You are ready !

## Screenshots

1. **Register**: ![Register](https://i.imgur.com/9VO6beg.png)

2. **Login**: ![Login](https://i.imgur.com/3x3PMGq.png)

3. **Multiple Photos**: ![Multiple Photos](https://i.imgur.com/BGMO5qT.png)

4. **Create Post**: ![Create Post](https://i.imgur.com/GhdIKTh.png)

5. **Timestamp**: ![Timestamp](https://i.imgur.com/SFspYGE.png)

6. **Edit Post**: ![Edit Post](https://i.imgur.com/EcJKRkD.png)

7. **Add Friend Request**:
   ![Add Friend Request](https://i.imgur.com/hIst1k0.png)

8. **Friends List**: ![Friends List](https://i.imgur.com/YRZbT7N.png)

9. **Pagination**: ![Pagination](https://i.imgur.com/NaiC93q.png)
