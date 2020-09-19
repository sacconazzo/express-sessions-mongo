var express = require("express");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
var https = require("https");
//const basicAuth = require("express-basic-auth");
var fs = require("fs");

var app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//users
let users = {
  test: "test",
  scn: "try",
};

// basic authentication
/* const myAuthorizer = (username, password) => {
  const userMatches = basicAuth.safeCompare(username, "test");
  const passwordMatches = basicAuth.safeCompare(password, "test");
  return userMatches & passwordMatches;
};
app.use(
  basicAuth({
    users: { test: "test" },
    authorizer: myAuthorizer,
  })
); */

// custom auth
const auth = (req, res, next) => {
  if (!req.session.user) {
    res.sendStatus(401);
  } else {
    req.session.calls += 1;
    next();
  }
};

// server
https
  .createServer(
    {
      key: fs.readFileSync("xxx.key"),
      cert: fs.readFileSync("xxx.crt"),
    },
    app
  )
  .listen(443, "0.0.0.0", () => {
    console.log("Server running on port 443");
  });

// sessions
var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/",
  databaseName: "mydatabase",
  collection: "sessions",
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 24 * 60 * 30 },
    store: store,
  })
);

// main
app.get("/", (req, res, next) => {
  res.send("<p>giona.tech API's</p>");
});

//login
app.post("/login", (req, res, next) => {
  if (!!users[req.body.user] && users[req.body.user] === req.body.password) {
    req.session.user = req.body.user;
    if (!req.session.calls) req.session.calls = 0;
    res.sendStatus(200);
  } else {
    req.session.destroy();
    res.sendStatus(401);
  }
});

//methods
app.get("/session", auth, (req, res, next) => {
  res.json(req.session);
});

app.post("/data", auth, (req, res, next) => {
  req.session.data = req.body;
  res.sendStatus(201);
});
