// dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors())

// config
const {APP_PORT, API_URL, MONGO_DB_URL} = require('./config');

// middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

// routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${API_URL}/categories`, categoriesRoutes);
app.use(`${API_URL}/products`, productsRoutes);
app.use(`${API_URL}/users`, usersRoutes);
app.use(`${API_URL}/orders`, ordersRoutes);

// database
mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection is ready ...');
}).catch((err) => {
    console.warn(err);
});

// server
app.listen(APP_PORT, () => {
    console.log(`server has started, listening on port http://localhost:${APP_PORT}`);
});
