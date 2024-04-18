# DayLogger
A simple journal express application which lets you track each days mood

## Set up and start

Set up a MongoDB database and copy the connection string for the database.

Make a `.env` file into the project folder and provide the variables: 
```sh
MONGOLAB_URI="YOUR CONNECTION STRING"
SESSION_SECRET="YOUR SESSION SECRET STRING"
```

Install the dependencies of the application in the terminal using:
```sh
npm install
```

Start the application in the terminal using:
```sh
npm start
```

The application is available on <http://localhost:3000/login>.

## Shutdown

Stop the application by pressing `Ctrl` | `Cmd` + `C` in the terminal.
