const Member = require('../models/Member');

exports.addMember = async (req, res) => {
  try {
    const { firstName, lastName, phone, currentRank, subscriptionMonths } = req.body;

    // Calcul de la date de fin d'abonnement (ex: +1 mois, +3 mois)
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + parseInt(subscriptionMonths || 1));

    const member = new Member({
      club: req.user.clubId, // Extrait du Token JWT (Middleware protect)
      firstName,
      lastName,
      phone,
      currentRank,
      subscriptionEndDate: endDate,
      gradeHistory: [{ rank: currentRank, date: new Date() }]
    });

    await member.save();
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};