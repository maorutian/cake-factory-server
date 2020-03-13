const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: {
    type: String, required: true
  },
  auth_name: String,
  created_time: {
    type: Number,
    default: Date.now
  },
  menus: Array //available navigation path for each role
});

const Role = mongoose.model('role', RoleSchema);
module.exports = Role;