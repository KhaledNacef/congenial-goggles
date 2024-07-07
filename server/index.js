const express = require('express');
const cors = require('cors');
const soldProductRoutes = require('./database/route/solded.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));


app.use(cors({
  origin: 'https://deviceshopleader.com',
  methods: ['GET', 'POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const db = require('../server/database/index.js');

// Import your routers here
const adminRouter = require('./database/route/admin.r.js');
const userRouter = require('./database/route/user.r.js');
const productRouter = require('./database/route/product.r.js');
const phoneRouter = require('./database/route/phone.r.js');

// Add your routes as middleware
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/phone', phoneRouter);
app.use('/api/sold', soldProductRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

