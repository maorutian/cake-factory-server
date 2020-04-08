const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Product = require('../../models/Product');

//validation
const productValidator = [
  //name
  check('name', 'name is required').notEmpty().trim(),
  //category
  check('category', 'category is required').notEmpty().trim(),
  //price:0.10-1000.00
  check('price', 'price is between 0 - 999').notEmpty().matches(/^(.*[^0-9]|)(1000|[1-9]\d{0,2})([^0-9].*|)$/).trim(),
];


//Pagination
function pagination(arr, pageNum, pageSize) {
  pageNum = pageNum * 1;
  pageSize = pageSize * 1;
  const total = arr.length;
  const pages = Math.floor((total + pageSize - 1) / pageSize);
  const start = pageSize * (pageNum - 1);
  const end = start + pageSize <= total ? start + pageSize : total;
  const list = [];
  for (let i = start; i < end; i++) {
    list.push(arr[i]);
  }

  return {
    pageNum,
    total,
    pages,
    pageSize,
    list
  }
}

module.exports = function productAPI(router) {

//PATH: api/products (GET,POST,PUT,DELETE)
//GET -- get all products
  router.get('/products', async (req, res) => {
    try {
      const {pageNum, pageSize} = req.query;
      const products = await Product.find();
      res.send(pagination(products, pageNum, pageSize));
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
//POST -- insert a new product
  router.post('/products', productValidator, async (req, res) => {
      try {
        //validate
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }
        //
        const newProduct = req.body;
        //console.log(newProduct);
        const product = await Product.findOne({name: newProduct.name});
        if (product) {
          return res.status(400).send({errors: [{msg: "Product exist"}]});
        }
        const np = await Product.create(newProduct);
        res.json(np);
      } catch (err) {
        res.status(500).send('Server error');
      }
    }
  );
//DELETE - delete product by id
  router.delete('/products', async (req, res) => {
    try {
      const productId = req.body.id;
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(400).send({errors: [{msg: "Product does not exist"}]});

      }
      await Product.findByIdAndRemove({_id: productId});
      res.json({msg: 'Product deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
//PUT - update product by id
  router.put('/products', productValidator, async (req, res) => {
    try {
      //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      //
      const productId = req.body.id;
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(400).send({errors: [{msg: "Product does not exist"}]});
      }
      const newProduct = req.body;
      await Product.findOneAndUpdate({_id: productId}, newProduct);
      res.json(newProduct);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });


//PATH: api/product/:id (GET)
//GET -- get info of the product by id
  router.get('/product', async (req, res) => {
    try {
      const product = await Product.findById(req.query.id);
      if (!product) {
        return res.status(400).send('Product does not exist');
      }
      res.send(product);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


//PATH:api/products/search
//GET -- search product by name or description
  router.get('/productsearch', async (req, res) => {
    try {
      const {pageNum, pageSize, productName, productDesc} = req.query;

      let condition = {};
      //case insensitive
      if (productName) {
        condition = {name: new RegExp(`^.*${productName}.*$`, 'i')};
      } else if (productDesc) {
        condition = {desc: new RegExp(`^.*${productDesc}.*$`, 'i')};
      }
      let products = await Product.find(condition);
      //console.log(products);
      res.send(pagination(products, pageNum, pageSize));
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

  //PATH:api/product/status
  //PUT -- change product status(in stock/out of stock) (1:in stock;0:out of stack)
  router.put('/productstatus', async (req, res) => {
    try {
      const {productId, status} = req.body;
      await Product.findOneAndUpdate({_id: productId}, {status});
      res.send({status});
    } catch (e) {
      res.status(500).send('Server error');
    }
  });


};

