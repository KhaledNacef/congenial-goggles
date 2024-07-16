const db = require('../index');

const Phone = db.models.phone;

// Create a new phone
exports.createPhone = async (req, res) => {
  try {
    
    // Assuming 'Phone' is your Sequelize model
    const phone = await Phone.create(req.body);

    res.status(200).send(phone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all phones for a specific user
exports.getAllPhones = async (req, res) => {
  try {
    const { userId } = req.params;
    const phones = await Phone.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the status of a phone for a specific user
exports.updatePhoneStatus = async (req, res) => {
  const { userId, id } = req.params;
  const { status } = req.body;
  try {
    const phone = await Phone.findOne({where:{userId:userId,id:id}});
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    phone.status = status;
    await phone.save();
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the price of a phone for a specific user
exports.updatePhonePrice = async (req, res) => {
  const { userId, id } = req.params;
  const { price } = req.body;
  try {
    const phone = await Phone.findOne({where:{userId:userId,id:id}});
    if (!phone ) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    phone.price = price;
    await phone.save();
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get phones by status for a specific user
exports.getPhonesByStatus = async (req, res) => {
  const { userId, status } = req.params;
  try {
    const phones = await Phone.findAll({ 
      where: { userId: userId, status: status },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get phones delivered today for a specific user
exports.getPhonesDeliveredToday = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().slice(0, 10);
    const phones = await Phone.findAll({ 
      where: { userId: userId, delivredOn: today },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get waiting phones for a specific user
exports.getWaitingPhones = async (req, res) => {
  try {
    const { userId } = req.params;
    const phones = await Phone.findAll({
      where: { userId: userId, status: 'waiting' },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletePhone = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const phone = await Phone.findOne({ where: { userId: userId, id: id } });
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    await phone.destroy();
    res.status(200).json({ message: 'Phone deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};