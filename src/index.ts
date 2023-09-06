const express = require('express');
const http = require("http");
const router = require('./router');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;


const app = express();

app.use(cors({
    credentials: true,
}))
app.use('/', router());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);
server.listen(PORT, () => {
    console.log("Server is running on http://localhost:****");
});

const MONGO_URI = process.env.MONGO_URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", err => console.log(err))

