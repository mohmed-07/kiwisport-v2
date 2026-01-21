const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  sport: { type: String, required: true },
  groupName: { type: String },
  records: [{
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);