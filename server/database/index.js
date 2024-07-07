const { Sequelize } = require('sequelize');
const Admin=require('../database/models/admin')
const User=require('../database/models/users')
const Product=require('../database/models/product')
const Phone=require('../database/models/phone')
const Solded=require('../database/models/solded')
const db = new Sequelize('phonyy', 'sadoun', 'K=U3X=Z9z5Dg4yeDmhp6', {
  host: '195.200.15.61',
  dialect: 'mysql'
});


const admin=db.define('admin',Admin) 
const user=db.define('user',User)
const product =db.define('product',Product)
const phone=db.define('phone',Phone)
const solded=db.define('solded',Solded)
user.hasMany(product)
user.hasMany(phone)
user.hasMany(solded)
db.sync().then(() => {
  console.log('User table created (if not exists)');
}).catch((error) => {
  console.error('Error creating User table:', error);
});

db.authenticate();
   
  module.exports =db