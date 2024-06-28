const express = require('express');
const cors = require('cors');
const soldProductRoutes=require('./database/route/solded.js')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
const db = require('../server/database/index.js');

// Import your routers here
const adminRouter = require('./database/route/admin.r.js');
const userRouter = require('./database/route/user.r.js');
const productRouter = require('./database/route/product.r.js');
const phoneRouter = require('./database/route/phone.r.js');
const payrouter=require('./database/route/payment.js')
// Add your routes as middleware
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/phone', phoneRouter);
app.use('/sold', soldProductRoutes);
app.use('/subscription',payrouter)
const PORT = 3000;



app.listen(PORT, function () {
    console.log('Server is running on http://localhost:' + PORT);
});
