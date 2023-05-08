/* -------------------------------------------------------------------------- */
/*           Loading all the modules and dependencies for the server          */
/* -------------------------------------------------------------------------- */
// Loading Express
const express = require("express");
// Loading CORS (Cross-Origin Resource Sharing)
const cors = require("cors");
// Creating an Express app
const app = express();

/* -------------------------------------------------------------------------- */
/*                 Running middleware for body parser and CORS                */
/* -------------------------------------------------------------------------- */
// Configuring Body Parser middleware to parse JSON data
/* app.use(bodyParser.json()); */

/* -------------------------------------------------------------------------- */
/*                  Configure CORS to accept every connection                 */
/* -------------------------------------------------------------------------- */
// Configuring CORS middleware to allow any origin and various HTTP methods
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
  })
);

// express.json() middleware to parse JSON requests
app.use(express.json());

//getting the route file from the routes folder
const monthdata = require("./routes/monthdata");
//url call
app.use("/monthdata", monthdata);

/* -------------------------------------------------------------------------- */
/*                    Setting port for the server to run on                   */
/* -------------------------------------------------------------------------- */
// Setting the port for the server, either from the environment variable or defaulting to 3000
const port = 4000;
// Starting the server and listening for incoming connections on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`));
