const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String, required: true
  },
  created_name: String,
  created_time: {
    type: Number,
  },
  auth_name: String,
  auth_time: {
    type: Number,
  },
  menus: Array //available navigation path for each role
});

const Role = mongoose.model('role', RoleSchema);
module.exports = Role;