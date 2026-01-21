import React, { useState, useEffect } from 'react';
import { Check, X, Users, Calendar } from 'lucide-react';
import api from '../../api/axios';

const AttendanceManager = () => {
    const [selectedSport, setSelectedSport] = useState("");
    const [availableSports, setAvailableSports] = useState([]);
    const [students, setStudents] = useState([]);

    // 1. Charger les sports du club au montage
    useEffect(() => {
        const fetchClubInfo = async () => {
            const res = await api.get('/manager/club/profile');
            setAvailableSports(res.data.sports);
            if (res.data.sports.length > 0) setSelectedSport(res.data.sports[0]);
        };
        fetchClubInfo();
    }, []);

    // 2. Charger les membres selon le sport sélectionné
    useEffect(() => {
        if (selectedSport) {
            const fetchMembersBySport = async () => {
                const res = await api.get(`/manager/members?sport=${selectedSport}`);
                setStudents(res.data.map(s => ({ ...s, status: 'present' })));
            };
            fetchMembersBySport();
        }
    }, [selectedSport]);

    const handleSave = async () => {
        try {
            await api.post('/manager/attendance', {
                sport: selectedSport,
                records: students.map(s => ({ member: s._id, status: s.status }))
            });
            alert("✅ Présences enregistrées !");
        } catch (err) { alert("Erreur d'enregistrement."); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
                    {availableSports.map(sport => (
                        <button key={sport} onClick={() => setSelectedSport(sport)}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${selectedSport === sport ? 'bg-kiwi text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}>
                            {sport}
                        </button>
                    ))}
                </div>
                <button onClick={handleSave} className="bg-kiwi text-black px-8 py-3 rounded-2xl font-black shadow-xl shadow-kiwi/20 hover:scale-105 transition-all">
                    VALIDER LA SÉANCE
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                    <div key={student._id} className={`p-6 rounded-[2rem] border transition-all flex justify-between items-center ${student.status === 'present' ? 'bg-kiwi/5 border-kiwi/20' : 'bg-red-500/5 border-red-500/20'}`}>
                        <div>
                            <p className="font-bold text-lg">{student.firstName} {student.lastName}</p>
                            <span className="text-[10px] font-black uppercase opacity-40">{student.currentRank}</span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setStudents(prev => prev.map(s => s._id === student._id ? {...s, status: 'present'} : s))}
                                className={`p-3 rounded-xl ${student.status === 'present' ? 'bg-kiwi text-black shadow-lg' : 'bg-slate-800 text-slate-500'}`}><Check size={20}/></button>
                            <button onClick={() => setStudents(prev => prev.map(s => s._id === student._id ? {...s, status: 'absent'} : s))}
                                className={`p-3 rounded-xl ${student.status === 'absent' ? 'bg-red-500 text-white shadow-lg' : 'bg-slate-800 text-slate-500'}`}><X size={20}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};