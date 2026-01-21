const Club = require('../models/Club');
const User = require('../models/User');
const mongoose = require('mongoose');
const Notification = require('../models/Notification');

exports.createClubWithManager = async (req, res) => {
    // Utilisation d'une session pour garantir que si l'un échoue, rien n'est créé
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { clubName, address, managerUsername, managerPassword, plan, adsEnabled } = req.body;

        // 1. Créer le Club
        const newClub = await Club.create([{
            name: clubName,
            address,
            plan,
            adsEnabled,
            active: true
        }], { session });

        // 2. Créer le Manager lié à ce Club
        const newUser = await User.create([{
            username: managerUsername,
            password: managerPassword,
            role: 'manager',
            clubId: newClub[0]._id
        }], { session });

        // 3. Mettre à jour le club avec l'ID du manager
        newClub[0].owner = newUser[0]._id;
        await newClub[0].save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ success: true, message: "Club et Manager créés !" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: error.message });
    }
};


exports.impersonateManager = async (req, res) => {
    try {
        const { clubId } = req.params;
        const club = await Club.findById(clubId).populate('owner');
        
        if (!club) return res.status(404).json({ message: "Club non trouvé" });

        // On génère un token "Manager" pour le SuperAdmin
        const token = jwt.sign(
            { id: club.owner._id, role: 'manager', clubId: club._id, isImpersonating: true },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, manager: club.owner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendBroadcast = async (req, res) => {
    try {
        const { title, message, type } = req.body;
        
        const newNotification = await Notification.create({
            title,
            message,
            type,
            createdBy: req.user._id
        });

        res.status(201).json({ success: true, data: newNotification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};