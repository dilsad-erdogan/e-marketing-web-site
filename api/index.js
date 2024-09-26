const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
require('dotenv').config();

var connectDB = require('./config/mongoDb');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/role', require('./routes/role'));
app.use('/product', require('./routes/product'));
app.use('/basket', require('./routes/basket'));
app.use('/order', require('./routes/order'));
app.use('/orderINproduct', require('./routes/orderINproduct'));

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send("Homepage");
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});