# node-ts-code-test

Get it running:
`npm i`
`npm run test` or `npm start`

We have a bug in our app, and we need to implement delete user.

The `api/tasks/list/:id` is returning all tasks for all users - this is a security issue, so let's fix that first. There are tests in /test/app.test.ts.

Next, we need a way to clean up and remove users. Implement a DELETE for /users/:id to remove a user by id as a path argument. Write a test to ensure the task is being removed correctly.