const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }, // URL de l'image (Hetzner ou Cloudinary)
  targetUrl: { type: String }, // Lien de redirection au clic
  placement: { 
    type: String, 
    enum: ['mobile', 'desktop', 'both'], 
    default: 'both' 
  },
  active: { type: Boolean, default: true },
  stats: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Ad', adSchema);