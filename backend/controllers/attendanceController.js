const Attendance = require('../models/Attendance');

exports.saveAttendance = async (req, res) => {
  try {
    const { sport, groupName, records, date } = req.body;

    const newSession = new Attendance({
      club: req.user.clubId, // Récupéré via le middleware protect
      coach: req.user._id,
      sport,
      groupName,
      records,
      date: date || new Date()
    });

    await newSession.save();
    res.status(201).json({ success: true, message: "Séance enregistrée avec succès" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};