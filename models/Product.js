const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String
  },
  status: { // stock status: 1:in stock, 2: out of stock
    type: Number,
    default: 1
  },
  imgs: {
    type: Array,
    default: []
  },
  detail: {
    type: String
  }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;