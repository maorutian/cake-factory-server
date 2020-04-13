const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Product = require('../../models/Product');
const Category = require('../../models/Category');

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
      let products = await Product.find().lean();

      //use Promise.all for map
      let productsWithCategoryName =
        await Promise.all(
          products.map(async (item) => {
            let categoryId = item.category;
            let category = await Category.findById(categoryId);
            item.categoryName = category.name;
            return item;
          })
        );

      res.send(pagination(productsWithCategoryName, pageNum, pageSize));
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
      const {pageNum, pageSize, productName, productCategory} = req.query;


      let condition = {};
      let products = [];
      //case insensitive

      if (productName) {
        condition = {name: new RegExp(`^.*${productName}.*$`, 'i')};
        products = await Product.find(condition).lean();
      } else if (productCategory) {
        condition = {name: new RegExp(`^.*${productCategory}.*$`, 'i')};
        //find the category id match category name
        let categories = await Category.find(condition);
        //console.log(categories);
        if (categories.length === 0) {
          products = []
        } else {
          products = await Product.find({
            "$or": categories.map(item => {
              return (
                {category: item._id}
              )
            })
          }).lean();
        }
      } else {
        //search empty return all products
        products = await Product.find().lean();
      }
      console.log(products);
      //add category name to product
      //use Promise.all for map
      let productsWithCategoryName =
        await Promise.all(
          products.map(async (item) => {
            let categoryId = item.category;
            let category = await Category.findById(categoryId);
            item.categoryName = category.name;
            return item;
          })
        );

      res.send(pagination(productsWithCategoryName, pageNum, pageSize));
    } catch (err) {
      console.log(err);
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

