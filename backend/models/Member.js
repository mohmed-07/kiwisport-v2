const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date },
  registeredSport: { type: String, required: true },
  phone: { type: String },
  gender: { type: String, enum: ['M', 'F'] },
  
  // Karaté & Progression
  currentRank: { 
    type: String, 
    default: 'Blanche',
    enum: ['Blanche', 'Jaune', 'Orange', 'Verte', 'Bleue', 'Marron', 'Noire'] 
  },
  gradeHistory: [{
    rank: String,
    date: { type: Date, default: Date.now }
  }],

  // Paiement & Statut
  subscriptionEndDate: { type: Date }, // Utilisé pour le calcul de isPaid
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  
  photo: { type: String } // Pour l'émargement visuel
}, { 
  timestamps: true,
  toJSON: { virtuals: true }, // Pour que isPaid apparaisse dans le JSON
  toObject: { virtuals: true }
});

// Calcul automatique : Est-ce que l'élève est à jour de paiement ?
memberSchema.virtual('isPaid').get(function() {
  if (!this.subscriptionEndDate) return false;
  return this.subscriptionEndDate > new Date();
});

module.exports = mongoose.model('Member', memberSchema);