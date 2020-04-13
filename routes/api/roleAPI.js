const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Role = require('../../models/Role');

const roleValidator = [
  //name
  check('name', 'name is required').notEmpty().trim(),
  //created_name
  check('created_name', 'created_name is required').notEmpty().trim(),
  //created_time
  check('created_time', 'created_time is required').notEmpty().trim(),
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
      //check if name exists
      const newRole = req.body;
      const role = await Role.findOne({name: newRole.name});
      if (role) {
        return res.status(400).send({errors: [{msg: "Role exists"}]});
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
        return res.status(400).send({errors: [{msg: "Role does not exist"}]});
      }
      await Role.findByIdAndRemove({_id: roleId});
      res.json({msg: 'Role deleted'});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  //PUT - authorized a role (update menus and auth_name)
  router.put('/roles',roleValidator, async (req, res) => {
    try {
      //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const roleId = req.body.id;
      console.log(req.body);
      console.log(req.body.id);
      console.log(req.body._id);
      let role = await Role.findById(roleId);
      if (!role) {
        return res.status(400).send({errors: [{msg: "Role does not exist"}]});
      }
      const newRole = req.body;
      console.log(roleId);
      const r = await Role.findOneAndUpdate({_id: roleId}, newRole);
      console.log(r);
      res.json(newRole);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  });

};