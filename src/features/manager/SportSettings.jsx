import React, { useState } from 'react';
import { Plus, X, Activity } from 'lucide-react';
import api from '../../api/axios';

const SportSettings = ({ currentSports, onUpdate }) => {
    const [newSport, setNewSport] = useState("");

    const addSport = async () => {
        if (!newSport) return;
        const updatedSports = [...currentSports, newSport];
        await api.put('/manager/club/sports', { sports: updatedSports });
        onUpdate(updatedSports);
        setNewSport("");
    };

    const removeSport = async (sportToRemove) => {
        const updatedSports = currentSports.filter(s => s !== sportToRemove);
        await api.put('/manager/club/sports', { sports: updatedSports });
        onUpdate(updatedSports);
    };

    return (
        <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-slate-800">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Activity className="text-kiwi" /> CONFIGURATION DES SPORTS
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
                {currentSports.map(sport => (
                    <span key={sport} className="bg-slate-800 text-white px-4 py-2 rounded-full flex items-center gap-2 border border-slate-700">
                        {sport}
                        <button onClick={() => removeSport(sport)} className="text-red-500 hover:text-white">
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>

            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={newSport}
                    placeholder="Ajouter un sport (ex: MMA)..."
                    className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
                    onChange={(e) => setNewSport(e.target.value)}
                />
                <button onClick={addSport} className="bg-kiwi text-black p-4 rounded-2xl font-bold">
                    <Plus />
                </button>
            </div>
        </div>
    );
};