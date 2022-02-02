# User login demo

## Requirements

- Node v12.19.0
- Mongo db

## Setup
### Node dependencies
Run
```
npm install
```

### Set port (optional)
If you need the server to run in a specific port you can set the environment variable PORT or create a file called .env using .env.sample as a template. Otherwise will use port 3000 as default.

## Database
Fill the MONGO_CONNECTION variable in the environment or in the .env file.

### Database migration and seeding
For the first time run "node dbmigration.js" to create the users in the empty collection.

### Start the server
```
npm run start
```

## While developing

### Dev environment
Run the server and the Nodemon monitor with:
```
npm run dev
```

### Testing
```
npm run test
```

### Linter
In later versions this will be available
```
npm run eslint
```

