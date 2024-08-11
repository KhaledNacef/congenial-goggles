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
    const { userId, id ,date} = req.params;
  
    try {
      const updatedCredit = await Credit.findOne({
        where: { id: id, userId: userId }
      });
  
      if (!updatedCredit) {
        return res.status(404).json({ error: 'Credit not found' });
      }
  
      updatedCredit.datee = date;
      await updatedCredit.save(); // Ensure to save the changes
      res.status(200).json({ message: 'Credit date updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update credit date' });
    }
  };
  
  const updateCpay = async (req, res) => {
    const { userId, id,pay } = req.params;
      // Destructure 'pay' from req.body
  
    try {
      const updatedCredit = await Credit.findOne({
        where: { id: id, userId: userId }
      });
  
      if (!updatedCredit) {
        return res.status(404).json({ error: 'Credit not found' });
      }
  
      updatedCredit.pay = parseFloat(pay);
      await updatedCredit.save(); // Ensure to save the changes
      res.status(200).json({ message: 'Credit payment updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update credit payment' });
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
