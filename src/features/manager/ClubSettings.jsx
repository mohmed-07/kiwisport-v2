import React, { useState, useEffect } from 'react';
import { Save, Camera, MapPin, Tag } from 'lucide-react';
import api from '../../api/axios';

const ClubSettings = () => {
    const [club, setClub] = useState({ name: '', address: '', sports: [] });
    const [newSport, setNewSport] = useState("");

    useEffect(() => {
        const fetchClub = async () => {
            const res = await api.get('/manager/club/profile');
            setClub(res.data);
        };
        fetchClub();
    }, []);

    const handleSave = async () => {
        await api.put('/manager/club/profile', club);
        alert("🚀 Profil du club mis à jour !");
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Identité visuelle */}
                <div className="md:col-span-1 space-y-6">
                    <div className="aspect-square bg-slate-900 border border-slate-800 rounded-[3rem] flex flex-col items-center justify-center border-dashed group cursor-pointer hover:border-kiwi transition-all">
                        <Camera size={40} className="text-slate-700 group-hover:text-kiwi" />
                        <p className="text-[10px] font-black uppercase mt-4 text-slate-600">Changer le Logo</p>
                    </div>
                </div>

                {/* Formulaire Infos */}
                <div className="md:col-span-2 space-y-6 bg-[#0f172a] p-8 rounded-[2.5rem] border border-slate-800">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Nom de l'Académie</label>
                        <input value={club.name} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi"
                            onChange={e => setClub({...club, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Adresse / Google Maps</label>
                        <input value={club.address} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
                            onChange={e => setClub({...club, address: e.target.value})} />
                    </div>
                </div>
            </div>

            {/* Gestion des Sports (Alimente le Register Wizard) */}
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
                <h3 className="text-xl font-black italic mb-6 flex items-center gap-2">
                    <Tag className="text-kiwi" /> SPORTS PROPOSÉS AUX MEMBRES
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                    {club.sports.map(s => (
                        <span key={s} className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-2 uppercase tracking-tighter">
                            {s} <button onClick={() => setClub({...club, sports: club.sports.filter(sport => sport !== s)})} className="text-red-500 hover:text-white"><X size={14}/></button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input value={newSport} placeholder="Ajouter un sport (ex: Kickboxing)..." className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
                        onChange={e => setNewSport(e.target.value)} />
                    <button onClick={() => { if(newSport){ setClub({...club, sports: [...club.sports, newSport]}); setNewSport(""); } }}
                        className="bg-slate-800 text-white px-6 rounded-2xl font-bold hover:bg-kiwi hover:text-black transition-all">AJOUTER</button>
                </div>
            </div>

            <button onClick={handleSave} className="w-full bg-kiwi text-black font-black py-5 rounded-[2rem] text-xl shadow-xl shadow-kiwi/20 flex items-center justify-center gap-3">
                <Save size={24}/> ENREGISTRER TOUTES LES MODIFICATIONS
            </button>
        </div>
    );
};