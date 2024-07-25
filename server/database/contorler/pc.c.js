const db = require('../index');

const Pc = db.models.pc;

// Create a new phone
exports.createPc = async (req, res) => {
  try {
    
    // Assuming 'Phone' is your Sequelize model
    const pc = await Pc.create(req.body);

    res.status(200).send(pc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all phones for a specific user
exports.getAllPc = async (req, res) => {
  try {
    const { userId } = req.params;
    const Pcs = await Pc.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(Pcs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the status of a phone for a specific user
exports.updatePcStatus = async (req, res) => {
  const { userId, id } = req.params;
  const { status } = req.body;
  try {
    const pc = await Pc.findOne({where:{userId:userId,ref:id}});
    if (!pc) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    pc.status = status;
    await pc.save();
    res.status(200).json(pc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the price of a phone for a specific user
exports.updatePcPrice = async (req, res) => {
  const { userId, id } = req.params;
  const { price } = req.body;
  try {
    const pc = await Pc.findOne({where:{userId:userId,ref:id}});
    if (!pc ) {
      return res.status(404).json({ message: 'Pc not found' });
    }
    pc.price = price;
    await pc.save();
    res.status(200).json(pc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get phones by status for a specific user
exports.getPcByStatus = async (req, res) => {
  const { userId, status } = req.params;
  try {
    const pc = await Pc.findAll({ 
      where: { userId: userId, status: status },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(pc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get phones delivered today for a specific user
exports.getPcDeliveredToday = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date().toISOString().slice(0, 10);
    const pc = await Pc.findAll({ 
      where: { userId: userId, delivredOn: today },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(pc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get waiting phones for a specific user
exports.getWaitingPc = async (req, res) => {
  try {
    const { userId } = req.params;
    const pc = await Pc.findAll({
      where: { userId: userId, status: 'waiting' },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(pc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletepc = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const pc = await Pc.destroy({ where: { userId: userId, ref: id } });
    if (!pc) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    
    res.status(200).json({ message: 'Phone deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};