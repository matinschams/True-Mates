# True-Mates Challenge

## Summary

I have gone through the set of criteria for each requirement listed and created
their respective branches. In each branch there is a README describing what
features have been implemented. I was not able to finish all the requirements
for number 3, due to my current weeks time constraint and dev issue but I merged
all my so far completion to the main branch.

## Run with Docker

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
