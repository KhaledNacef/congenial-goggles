const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;
const db = require('../index');
const AdminModel = db.models.admin;

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.findAll();
    res.status(200).send(admins);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch admins' });
  }
};

exports.getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).send({ message: 'Admin not found' });
    }
    res.status(200).send(admin);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch admin by ID' });
  }
};

exports.signupAdmin = async (req, res) => {
  try {
    const { Name, Email, Password, image } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newAdmin = await AdminModel.create({ Name:Name, Email:Email, Password: hashedPassword, image:image });
    return res.status(200).send(newAdmin);
  } catch (err) {
    console.error('Error in registering admin:', err);
    res.status(500).send({ message: 'Failed to register admin' });
  }
};


exports.updateAdminById = async (req, res) => {
  const { id } = req.params;
  const { Name, Email, Password } = req.body;
  try {
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).send({ message: 'Admin not found' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);
    
    admin.Name = Name;
    admin.Email = Email;
    admin.Password = hashedPassword; // Assign the hashed password
    await admin.save();
    res.status(200).send(admin);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};


exports.deleteAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await AdminModel.findByPk(id);
    if (!admin) {
      return res.status(404).send({ message: 'Admin not found' });
    }
    await admin.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to delete admin' });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const admin = await AdminModel.findOne({ where: { Email } });
    if (!admin) {
      return res.status(404).send({ message: 'Email not found' });
    }
    const isPasswordValid = await bcrypt.compare(Password, admin.Password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Incorrect Email or Password' });
    }
    const token = jwt.sign({ Email: admin.Email }, secretKey);
    res.send({ token:token, admin:admin });
  } catch (err) {
    console.error('Error in signing in admin:', err);
    res.status(500).send({ message: 'Failed to login admin' });
  }
};
