const db = require('../index');

const Credit = db.models.credit;
// Create a new credit entry
const createCredit = async (req, res) => {
  try {
    const newCredit = await Credit.create(req.body);
    res.status(201).json(newCredit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create credit' });
  }
};

// Get all credits by userId
const getCreditsByUserId = async (req, res) => {
    const {userId}=req.params 
  try {
    const credits = await Credit.findAll({ where: { userId: userId } });
    res.status(200).json(credits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve credits' });
  }
};

// Update a credit entry
const updatedate = async (req, res) => {
    const {userId,id}=req.params 
    const{data}=req.body
  try {
    const updatedCredit = await Credit.findOne({
      where: { id:id,userId: userId }
    });
    updatedCredit.date=data;
    updatedCredit.save();
    res.status(200).json({ message: 'Credit updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update credit' });
  }
};
const updateCpay = async (req, res) => {
    const {userId,id}=req.params 
    const{data}=req.body
  try {
    const updatedCredit = await Credit.findOne({
      where: { id:id,userId: userId }
    });
    updatedCredit.pay=data;
    updatedCredit.save();
    res.status(200).json({ message: 'Credit updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update credit' });
  }
};

// Delete a credit entry
const deleteCredit = async (req, res) => {
    const {userId,id}=req.params 

  try {
    await Credit.destroy({  where: { id:id,userId: userId }
    });
    res.status(200).json({ message: 'Credit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete credit' });
  }
};

module.exports = {
  createCredit,
  getCreditsByUserId,
  updatedate,
  deleteCredit,
  updateCpay
};
