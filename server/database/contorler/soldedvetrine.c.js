
const db = require('../index');
const SoldedVetrine = db.models.soldedvetrine;


exports.getAllSoldedVetrines = async (req, res) => {
    const {userId}=req.params
    try {
      const soldedVetrines = await SoldedVetrine.findAll({
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
      });;
      res.status(200).json(soldedVetrines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };