import React, { useState } from 'react';
import { Building2, UserCircle, Shield, Globe } from 'lucide-react';
import api from '../../api/axios';

const CreateClubForm = () => {
    const [formData, setFormData] = useState({
        clubName: '', address: '', managerUsername: '', 
        managerPassword: '', plan: 'Basic', adsEnabled: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/superadmin/create-club', formData);
            alert("🚀 Club créé avec succès sur Kiwisport !");
        } catch (err) {
            alert("Erreur de création.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-700">
            {/* SECTION CLUB */}
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-slate-800 space-y-4">
                <h3 className="text-kiwi font-black italic flex items-center gap-2">
                    <Building2 size={20}/> INFOS DU CLUB
                </h3>
                <input required placeholder="Nom du Club" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi transition-all"
                    onChange={e => setFormData({...formData, clubName: e.target.value})} />
                <input required placeholder="Adresse / Ville" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
                    onChange={e => setFormData({...formData, address: e.target.value})} />
                
                <div className="flex gap-4">
                    <select className="flex-1 bg-slate-900 border border-slate-800 p-4 rounded-2xl text-slate-400"
                        onChange={e => setFormData({...formData, plan: e.target.value})}>
                        <option value="Basic">Plan Basic</option>
                        <option value="Premium">Plan Premium</option>
                        <option value="Elite">Plan Elite</option>
                    </select>
                    <div className="flex items-center gap-2 bg-slate-900 px-4 rounded-2xl border border-slate-800">
                        <span className="text-xs font-bold text-slate-500">ADS</span>
                        <input type="checkbox" checked={formData.adsEnabled} className="accent-kiwi w-5 h-5"
                            onChange={e => setFormData({...formData, adsEnabled: e.target.checked})} />
                    </div>
                </div>
            </div>

            {/* SECTION MANAGER */}
            <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-slate-800 space-y-4 shadow-2xl">
                <h3 className="text-blue-400 font-black italic flex items-center gap-2">
                    <UserCircle size={20}/> ACCÈS MANAGER
                </h3>
                <input required placeholder="Username du Manager" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
                    onChange={e => setFormData({...formData, managerUsername: e.target.value})} />
                <input required type="password" placeholder="Mot de passe provisoire" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
                    onChange={e => setFormData({...formData, managerPassword: e.target.value})} />
                
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                    <p className="text-[10px] text-blue-300 font-medium">
                        ℹ️ Le manager pourra changer ses informations une fois connecté à son propre dashboard.
                    </p>
                </div>
            </div>

            <button type="submit" className="md:col-span-2 bg-kiwi text-black font-black py-5 rounded-[2rem] text-xl shadow-xl shadow-kiwi/20 hover:scale-[1.01] transition-all">
                DÉPLOYER LE CLUB SUR LA PLATEFORME
            </button>
        </form>
    );
};

export default CreateClubForm;