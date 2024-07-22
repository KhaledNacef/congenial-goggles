const db = require('../index');
const Vetrine = db.models.vetrine;
const SoldedVetrine = db.models.soldedvetrine;

// Create a new Vetrine
exports.createVetrine = async (req, res) => {
  try {
    const vetrine = await Vetrine.create(req.body);
    res.status(201).json(vetrine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all Vetrines
exports.getAllVetrines = async (req, res) => {
    const {userId} =req.params
  try {
    const vetrines = await Vetrine.findAll({
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
      });
    res.status(200).json(vetrines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getstatusVetrines = async (req, res) => {
  const {userId,status} =req.params
try {
  const vetrines = await Vetrine.findAll({
      where: { userId: userId,status:status },
      order: [['createdAt', 'ASC']]
    });
  res.status(200).json(vetrines);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
};

// Update Vetrine by ID
exports.updateVetrineBystatus = async (req, res) => {
    const { userId, id } = req.params;
  const { status } = req.body;
  try {
    const vetrine = await Vetrine.findOne({where:{userId:userId,id:id}});
    if (!vetrine) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    vetrine.status = status;
    await vetrine.save();
    res.status(200).json(vetrine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Vetrine by ID
exports.deleteVetrineById = async (req, res) => {
  const { userId,id } = req.params;
  try {
    const vetrine = await Vetrine.destroy({ where: { id: id,userId:userId } });
    if (!vetrine) {
      return res.status(404).json({ message: 'Vetrine not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Sell Vetrine
exports.sellVetrine = async (req, res) => {
  const { vetrineId,userId } = req.params;
  try {
    // Find the Vetrine by ID
    const vetrine = await Vetrine.findOne({ where: { id: vetrineId,userId:userId } });
    if (!vetrine) {
      return res.status(404).json({ message: 'Vetrine not found' });
    }

    
    
       await SoldedVetrine.create({
        id:vetrine.id,
        brand: vetrine.brand,
        type:vetrine.type,
        serie:vetrine.serie,
        price: vetrine.price,
        cout:vetrine.cout,
        maindoeuvre:vetrine.maindoeuvre,
        problem:vetrine.problem,
        status:vetrine.status,
        userId:userId
      });
    

    // Decrement the Vetrine quantity
    await vetrine.destroy();
    await vetrine.save()

    res.status(200).json({ message: 'Vetrine sold successfully', vetrine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
