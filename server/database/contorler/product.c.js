const db = require('../index');
const Solded = db.models.solded;
const Product = db.models.product;

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const {userId}=req.params
    const products = await Product.findAll({where:{userId:userId}});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product by ID
exports.getProductByIdadnprice = async (req, res) => {
  const { id,userId,price } = req.params;
  try {
    const product = await Product.findOne({ where: { id:id,userId:userId } });
    if (!product ) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.price=parseInt(price)
    product.save()
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update product by ID
exports.updateProductById = async (req, res) => {
  const { id,userId, quantity } = req.params;
  try {
    const product = await Product.findOne({ where: { id:id, userId:userId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Convert quantity to number before adding
    product.quantity = parseInt(quantity) + product.quantity;
    product.save();
    
    res.status(200).json(product); // Respond with updated product
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Delete product by ID
exports.deleteProductById = async (req, res) => {
  const { userId,id } = req.params;
  try {
    const product = await Product.findAll({ where: { id:id, userId:userId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get product by name
exports.getProductByName = async (req, res) => {
    const { name } = req.params;
    try {
      const product = await Product.findOne({ where: { name } });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  
  // Sell product

  exports.sellProduct = async (req, res) => {
    const { productId,userId, quantity } = req.params;
    try {
        // Find the product by ID
        const product = await Product.findOne({ where: { id:productId, userId:userId } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Parse the quantity parameter as an integer
        const sellQuantity = parseInt(quantity);

        // Check if the product quantity is sufficient
        if (product.quantity < sellQuantity) {
            return res.status(400).json({ message: 'Insufficient quantity' });
        }

        // Find if the product has already been sold with the same price
        let soldProduct = await Solded.findOne({ where: { name: product.name, price: product.price } });

        if (!soldProduct) {
            // If the product hasn't been sold before with the same price, create a new entry in the Solded model
            soldProduct = await Solded.create({
                name: product.name,
                price: product.price,
                quantity: sellQuantity,
                image: product.image,
                userId:userId
            });
        } else {
            // If the product has been sold before with the same price, update the quantity by adding the new quantity
            soldProduct.quantity += sellQuantity;
            await soldProduct.save();
        }

        // Decrement the product quantity
        product.quantity -= sellQuantity;
        await product.save();

        res.status(200).json({ message: 'Product sold successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

