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


//GET A SINGLE PRODUCT
router.get('/find/:id',async(req,res)=>{
  try {
  const product = await Product.findById(req.params.id)
  res.status(200).json(product)
    
  } catch (err) {
    res.status(500).json(err)
  }
})


//CREATE A PRODUCT
router.post("/", async (req, res) => {
  console.log(req.body)
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE A PRODUCT
router.delete('/find/:id',async(req,res)=>{
  try {
    await Product.findByIdAndDelete(req.params.id)
res.status(200).json('product deleted.')
  } catch (err) {
    console.log(err)
  }
})
module.exports = router