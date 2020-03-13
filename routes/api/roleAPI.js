const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');
const Role = require('../../models/Role');

const roleValidator = [
  //name
  check('name', 'name is required').notEmpty().trim(),
  //auth_name
  check('auth_name', 'auth_name is required').notEmpty().trim(),
];

module.exports = function roleAPI(router) {

//PATH: api/roles (GET,POST,PUT,DELETE)
//GET -- get all roles
  router.get('/roles', async (req, res) => {
    try {
      const roles = await Role.find();
      res.send(roles);
    } catch (e) {
      res.status(500).send('Server error');
    }
  });
//POST -- add a new role
  router.post('/roles', roleValidator,async (req, res) => {
    try {
      //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      //
      const newRole = req.body;
      const role = await Role.findOne({name: newRole.name});
      if (role) {
        return res.status(400).send('Role exists');
      }
      const nr = await Role.create(newRole);
      res.json(nr);
    } catch (e) {
      res.status(500).send('Server error');
    }
  });
  //DELETE -- delete role by id
  router.delete('/roles', async (req, res) => {
    try {
      const roleId = req.body.id;
      let role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).send('Role does not exist');
      }
      await Role.findByIdAndRemove({_id: roleId});
      res.json({msg: 'Role deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  //PUT - update role by id
  router.put('/roles',roleValidator, async (req, res) => {
    try {
      //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }

      const roleId = req.body.id;
      let role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).send('Role does not exist');
      }
      const newRole = req.body;
      await Role.findOneAndUpdate({_id: roleId}, newRole);
      res.json(newRole);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });


};