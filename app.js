const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const cors = require('cors');
const path = require('path');

const reg_route = require('./routes/reg_route');
const productRoute = require('./routes/productRoute');
const bookingRoute = require('./routes/bookingRoute');
// const CommentRoute = require('./routes/CommentRoute');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/Allimages',express.static(path.join(__dirname,'/Allimages')));
app.use(express.json());


app.use(productRoute);
app.use(reg_route);
app.use(bookingRoute);

app.listen(90);