const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const Category = require('../../models/Category');
const Product = require('../../models/Product');

const categoryValidator = [
  //name
  check('name', 'name is required').notEmpty().trim(),
];


module.exports = function categoryAPI(router) {

//PATH: api/categories (GET,POST,PUT,DELETE)
//GET -- get all categories
  router.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find();
      res.send(categories);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
//POST -- insert a new category
  router.post('/categories',categoryValidator, async (req, res) => {
      try {
        //validate
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({errors: errors.array()});
        }
        const {name} = req.body;
        const category = await Category.findOne({name});
        if (category) {
          return res.status(400).send('Category exists');
        }
        const newCategory = new Category({name});
        const nc = await newCategory.save();
        res.json(nc);
      } catch (err) {
        res.status(500).send('Server error');
      }
    }
  );
//DELETE - delete category by id
  router.delete('/categories', async (req, res) => {
    try {

      const categoryId = req.body.id;
      let category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).send({errors: [{msg: "Category does not exist"}]});
      }
      //check if any product uses this id
      const products = await Product.find();
      //Cannot use === here, item.category is object, categoryId is string
      let hasId = products.some(item => item.category == categoryId);
      if (hasId) {
        return res.status(400).send({errors: [{msg: "Sorry, A Product use this Id, cannot delete"}]});

      }
      await Category.findByIdAndRemove({_id: categoryId});
      res.json({msg: 'Category deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
//PUT - update category by id
  router.put('/categories',categoryValidator, async (req, res) => {
    try {
      //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }

      const {id, name} = req.body;
      let category = await Category.findById(id);
      if (!category) {
        return res.status(404).send({errors: [{msg: "Category does not exist"}]});
      }
      category.name = name;
      const nc = await category.save();
      res.json(nc);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });


//PATH: api/category/:id (GET)
//GET -- get info of the category by id
  router.get('/category', async (req, res) => {
    try {
      const {id} = req.query;
      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).send({errors: [{msg: "Category does not exist"}]});
      }
      res.send(category);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

};
