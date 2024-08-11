const { Sequelize } = require('sequelize');
const Admin = require('../database/models/admin.js');
const User = require('../database/models/users.js');
const Product = require('../database/models/product.js');
const Phone = require('../database/models/phone.js');
const Solded = require('../database/models/solded.js');
const Pc=require('./models/pc.js');
const Credit=require('./models/credit.js')

const Vetrine=require('./models/vetrine.js');
const Soldedvetrine = require('./models/vetrine.js');
const db = new Sequelize('phonik', 'khaleed', 'K=U3X=Z9z5Dg4yeDmhp6', {
  host: '195.200.15.61',
  dialect: 'mysql'
});

const credit=db.define('credit',Credit)

const pc=db.define('pc',Pc)
const vetrine=db.define('vetrine',Vetrine)
const soldedvetrine=db.define('soldedvetrine',Soldedvetrine)
const admin=db.define('admin',Admin) 
const user=db.define('user',User)
const product =db.define('product',Product)
const phone=db.define('phone',Phone)
const solded=db.define('solded',Solded)
user.hasMany(product)
user.hasMany(phone)
user.hasMany(credit)

user.hasMany(solded)
user.hasMany(vetrine)
user.hasMany(pc)
user.hasMany(soldedvetrine)



db.sync().then(() => {
  console.log('User table created (if not exists)');
}).catch((error) => {
  console.error('Error creating User table:', error);
});

db.authenticate();
   
  module.exports =db