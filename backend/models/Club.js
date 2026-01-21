const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String }, // URL vers Cloudinary ou autre
  address: { type: String },
  sports: [{ type: String }],
  googleMapsLink: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Le Manager
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);