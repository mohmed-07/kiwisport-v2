const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Espèces', 'Virement', 'Chèque', 'Autre'], default: 'Espèces' },
  months: { type: Number, default: 1 }, // Nombre de mois payés
  paymentDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);