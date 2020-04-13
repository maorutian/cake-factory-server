const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');


const User = require('../../models/User');
const Role = require('../../models/Role');
module.exports = function roleAPI(router) {

//PATH: api/login
//POST -- login
  router.post('/login', async (req, res) => {
      const {username, password} = req.body;
      try {
        //check username
        const user = await User.findOne({username});
        if (!user) {
          return res.status(400).json({errors: [{msg: "username does not exist"}]})
        }

        //check password
        const isPassword = bcrypt.compareSync(password, user.password);
        if (!isPassword) {
          return res.status(400).json({errors: [{msg: "password is wrong"}]})
        }

        let roleId = user.role;
        let role = await Role.findById(roleId);
        let roleMenus = role.menus;
        //generate token
        const payload = {
          user: {
            id: user.id,
            username: user.username,
            menus: roleMenus
          }
        };

        // const token = jwt.sign(payload, config.get('jwtsecret'), {expiresIn: "10h"});
        // res.send({
        //   user,
        //   token
        // });

        jwt.sign(
          payload,
          config.get('jwtsecret'),
          {expiresIn: 36000},
          (err, token) => {
            if (err) throw err;
            res.json({token});
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

}
