const db = require('../index');
const User = db.models.user;
const cloudinary = require('cloudinary').v2;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()

cloudinary.config({
  cloud_name: 'dsxgr0xno',
  api_key: '845521795963896',
  api_secret: 'eKsF-xtI-2ks2w5z6Y4jBSScWHU'
});

const secretKey ="Nacef030599?"
// Controller function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to get user by ID
exports.getUserById = async (req, res) => {
  const { AccountStatus } = req.params;
  try {
    const user = await User.findAll({
      where: {AccountStatus:AccountStatus}
  })
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getUserByName = async (req, res) => {
  const { Name } = req.params;
  try {
    const user = await User.findAll({
      where: {Email:Name}
  })
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.getUserByid = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Controller function to create a new user
exports.signupUser = async (req, res) => {




  try {

    const image = req.file;
    
    const result = await cloudinary.uploader.upload(image.path);

    const { Name, Email, Password, PhoneNumber, Address, City, Government, Facebook, CompanyName ,Country} = req.body;

    const newUser = await User.create({
      Name: Name,
      Email: Email,
      Password: await bcrypt.hash(Password, 10),
      image: result.secure_url,
      PhoneNumber: PhoneNumber,
      Address: Address,
      City: City,
      Government: Government,
      Facebook: Facebook,
      CompanyName: CompanyName,
      Country:Country
    });

    return res.status(200).json(newUser);
  } catch (err) {
    console.error('Error in registering user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.loginUser = async (req, res) => {
  try {
      const Email = req.body.Email
      const Password = req.body.Password
      const user = await User.findOne({
          where: {Email:Email}
      })
      if (!user || user.AccountStatus==='InActive') {
          return res.status(404).json('Email not found');
      }
      const hashepwd=user.Password
      const PasswordValid = await bcrypt.compare(Password,hashepwd)
      if (!PasswordValid) {
          return res.status(401).json('Incorrect Email or Password ')
      }
      const token = await jwt.sign({Email: user.Email}, secretKey)
      res.send({token:token,user:user}) 
  

  } catch (err) {
     console.error('Error in signing in user:', err)
  }
}

// Controller function to update a user by ID
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { Name, Email, Password,image,Facebook,CompanyName,Address,City,Country,Government,PhoneNumber } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.Name=Name;
    user.Email=Email;
    user.Password=Password;
    user.image=image;
    user.Facebook=Facebook;
    user.CompanyName=CompanyName;
    user.Address=Address;
    user.City=City;
    user.Country=Country;
    user.Government=Government;
    user.PhoneNumber=PhoneNumber
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete a user by ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.stopUserAccountById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if(user.AccountStatus==='InActive'){
        user.AccountStatus = 'Active'; 
      }else{
        user.AccountStatus = 'InActive'; 
      }
      
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };