const router = require("express").Router();
const Product = require("../models/Product");

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;
  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ cretedAt: -1 }).limit(10);
    } else if (queryCategory) {
      products = await Product.find({ 
          categories: { $in: [queryCategory] } 
        });
    } else {
      products = await Product.find();
    }
    
    res.status(200).json(products)

  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router