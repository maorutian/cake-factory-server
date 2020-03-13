const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true // can be null, unique is required
  },
  password: {
    type: String,
    set(psw) {
      return require('bcrypt').hashSync(psw, 10)
    }
  },
  phone: String,
  create_time: {
    type: Number,
    default: Date.now
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'roles'
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
