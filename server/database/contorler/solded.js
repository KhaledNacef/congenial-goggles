const db = require('../index');
const Solded=db.models.solded
// Create a sold product


// Get all sold products
exports.getAllSoldProducts = async (req, res) => {
  try {
    const {userId}=req.params
    const soldProducts = await Solded.findAll({where:{userId:userId}});
    res.status(200).json(soldProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get sold products by month and year
exports.getSoldProductsByMonthAndYear = async (req, res) => {
  try {
    const { month, year } = req.params;
    const soldProducts = await Solded.findAll({
      where: {
        createdAt: {
          [Sequelize.Op.and]: [
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), month),
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), year)
          ]
        }
      }
    });
    res.status(200).json(soldProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
