const Member = require('../models/Member');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');

exports.getDashboardStats = async (req, res) => {
    try {
        const clubId = req.user.clubId;

        // 1. Compter les membres actifs
        const totalMembers = await Member.countDocuments({ club: clubId, status: 'active' });

        // 2. Trouver les membres avec abonnement expiré (isPaid virtuel n'est pas queryable, on utilise la date)
        const unpaidMembers = await Member.countDocuments({ 
            club: clubId, 
            subscriptionEndDate: { $lt: new Date() } 
        });

        // 3. Présences du jour
        const today = new Date();
        today.setHours(0,0,0,0);
        const dailyAttendance = await Attendance.find({ 
            club: clubId, 
            date: { $gte: today } 
        });

        res.json({
            totalMembers,
            unpaidMembers,
            todayAttendanceCount: dailyAttendance.length,
            // ... autres stats
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMembers = async (req, res) => {
    try {
        const { search, sport, status } = req.query;
        let query = { club: req.user.clubId };

        // Filtre Recherche (Nom, Prénom ou Téléphone)
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        // Filtre Sport
        if (sport && sport !== 'Tous') {
            query.registeredSport = sport;
        }

        // Filtre Statut de Paiement
        if (status === 'paid') {
            query.subscriptionEndDate = { $gte: new Date() };
        } else if (status === 'unpaid') {
            query.subscriptionEndDate = { $lt: new Date() };
        }

        const members = await Member.find(query).sort({ lastName: 1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.recordPayment = async (req, res) => {
    try {
        const { memberId, amount, method, months } = req.body;
        const member = await Member.findById(memberId);

        if (!member) return res.status(404).json({ message: "Membre non trouvé" });

        // Calcul de la nouvelle date
        let startDate = new Date();
        if (member.subscriptionEndDate && member.subscriptionEndDate > new Date()) {
            startDate = new Date(member.subscriptionEndDate);
        }
        
        const newEndDate = new Date(startDate);
        newEndDate.setMonth(newEndDate.getMonth() + parseInt(months));

        // 1. Créer le reçu de paiement
        await Payment.create({
            member: memberId,
            club: req.user.clubId,
            amount,
            method,
            months
        });

        // 2. Mettre à jour le membre
        member.subscriptionEndDate = newEndDate;
        await member.save();

        res.json({ success: true, newEndDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFinancialStats = async (req, res) => {
    try {
        const clubId = req.user.clubId;

        // 1. Chiffre d'affaires total (All-time)
        const totalRevenue = await Payment.aggregate([
            { $match: { club: clubId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // 2. Chiffre d'affaires par mois (Pour le graphique)
        const monthlyRevenue = await Payment.aggregate([
            { $match: { club: clubId } },
            {
                $group: {
                    _id: { $month: "$paymentDate" },
                    amount: { $sum: "$amount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // 3. Dernières transactions
        const recentTransactions = await Payment.find({ club: clubId })
            .populate('member', 'firstName lastName')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            total: totalRevenue[0]?.total || 0,
            monthly: monthlyRevenue,
            recent: recentTransactions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};