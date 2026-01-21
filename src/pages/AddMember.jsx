import React, { useState } from 'react';
import { UserPlus, Phone, ShieldCheck, Calendar } from 'lucide-react';
import api from '../api/axios';

const AddMember = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', currentRank: 'Blanche', subscriptionMonths: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/members', formData);
      alert("✨ Athlète ajouté avec succès !");
      setFormData({ firstName: '', lastName: '', phone: '', currentRank: 'Blanche', subscriptionMonths: 1 });
    } catch (err) {
      alert("❌ Erreur lors de l'ajout.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-10 bg-[#0f172a] border border-slate-800 rounded-[3rem] shadow-2xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-kiwi/10 rounded-2xl text-kiwi">
          <UserPlus size={32} />
        </div>
        <h2 className="text-3xl font-black italic">NOUVEL ATHLÈTE</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Identité */}
        <div className="col-span-1 space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase ml-2">Prénom</label>
          <input required type="text" placeholder="ex: Amine" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi transition-all" 
            onChange={e => setFormData({...formData, firstName: e.target.value})} />
        </div>
        <div className="col-span-1 space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase ml-2">Nom</label>
          <input required type="text" placeholder="ex: Rahmouni" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi transition-all"
            onChange={e => setFormData({...formData, lastName: e.target.value})} />
        </div>

        {/* Contact */}
        <div className="col-span-2 space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase ml-2 flex items-center gap-2">
            <Phone size={14}/> Téléphone
          </label>
          <input required type="tel" placeholder="06..." className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi transition-all"
            onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>

        {/* Grade Initial */}
        <div className="col-span-1 space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase ml-2 flex items-center gap-2">
            <ShieldCheck size={14}/> Ceinture Actuelle
          </label>
          <select className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none appearance-none text-kiwi font-bold"
            onChange={e => setFormData({...formData, currentRank: e.target.value})}>
            <option>Blanche</option><option>Jaune</option><option>Orange</option><option>Verte</option><option>Bleue</option><option>Marron</option><option>Noire</option>
          </select>
        </div>

        {/* Abonnement initial */}
        <div className="col-span-1 space-y-2">
          <label className="text-xs font-black text-slate-500 uppercase ml-2 flex items-center gap-2">
            <Calendar size={14}/> Durée (Mois)
          </label>
          <input type="number" min="1" defaultValue="1" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
            onChange={e => setFormData({...formData, subscriptionMonths: e.target.value})} />
        </div>

        <button type="submit" className="col-span-2 mt-4 bg-kiwi text-black font-black py-5 rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-kiwi/20">
          CRÉER LE DOSSIER ATHLÈTE
        </button>
      </form>
    </div>
  );
};

export default AddMember;