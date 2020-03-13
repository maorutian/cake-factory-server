const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');


const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Role = require('../../models/Role');


const userValidator = [
  //username
  check('username', 'username is required').notEmpty().trim(),
  //password
  check('password', 'Password must contains 5-25 signs (numbers and letters)').notEmpty()
    .isLength({min: 5, max: 25}).matches(/^[a-zA-Z0-9_]+$/).trim(),
  //email
  check('email', 'email is not validated').normalizeEmail().isEmail(),
];

const filter = {password: 0};

module.exports = function userAPI(router) {

//PATH: api/users (GET,POST,PUT,DELETE)
//GET -- get all users
  router.get('/users', async (req, res) => {
    try {
      const users = await User.find({}, filter);
      res.send(users);
    } catch (e) {
      res.status(500).send('Server error');
    }
  });
//POST -- add a new user
  router.post('/users', userValidator, async (req, res) => {
    try {
      //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      //
      const newUser = req.body;
      //console.log(newUser);
      const username = await User.findOne({username: newUser.username});
      if (username) {
        return res.status(400).send('Username exists');
      }
      //check email
      if (newUser.email) {
        const userEmail = await User.findOne({email: newUser.email});
        if (userEmail) {
          return res.status(400).send('Email exists');
        }
      }
      let nu = await User.create(newUser);
      const newnu = await await User.findById(nu.id,filter);
      res.json(newnu);
    } catch (e) {
      console.log(e);
      res.status(500).send('Server error');
    }
  });
  //DELETE -- delete user by id
  router.delete('/users', async (req, res) => {
    try {
      const userId = req.body.id;
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User does not exist');
      }
      await User.findByIdAndRemove({_id: userId});
      res.json({msg: 'User deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  //PUT - update user by id
  router.put('/users', async (req, res) => {
    try {
      //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }

      const userId = req.body.id;
      let user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User does not exist');
      }
      const newUser = req.body;
      await User.findOneAndUpdate({_id: userId}, newUser);
      res.json(newUser);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });

  //PATH: api/login
  //POST -- login
  router.post('/login', async (req, res) => {
      const {username, password} = req.body;

      //check username
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({error: [{msg: "username does not exist"}]})
      }

      //check password
      const isPassword = bcrypt.compareSync(password, user.password);
      if (!isPassword) {
        return res.status(400).json({error: [{msg: "password is wrong"}]})
      }

      //generate token
      const payload = {
        user: {
          id: user.id,
        }
      };
      const token = jwt.sign(payload, config.get('jwtsecret'), {expiresIn: "10h"});

      res.send({
        user,
        token
      })
    }
  );


};