import React, { useState } from 'react';
import { X, User, Phone, ChevronRight } from 'lucide-react';
import api from '../../api/axios';

const MemberLoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [data, setData] = useState({ firstName: '', lastName: '', phone: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/public/member-access', data);
      localStorage.setItem('memberToken', res.data.token);
      onLoginSuccess(res.data.member);
      onClose();
    } catch (err) {
      alert("⚠️ Membre non trouvé. Vérifiez vos informations.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
      <div className="bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-[3rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black italic tracking-tighter">ESPACE MEMBRE</h2>
          <button onClick={onClose} className="p-2 bg-slate-900 rounded-full"><X size={20}/></button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-500" size={18}/>
            <input required placeholder="Prénom" className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-kiwi"
              onChange={e => setData({...data, firstName: e.target.value})} />
          </div>
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-500" size={18}/>
            <input required placeholder="Nom de famille" className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-kiwi"
              onChange={e => setData({...data, lastName: e.target.value})} />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-4 text-slate-500" size={18}/>
            <input required placeholder="Numéro de téléphone" className="w-full bg-slate-900 border border-slate-800 p-4 pl-12 rounded-2xl outline-none focus:border-kiwi"
              onChange={e => setData({...data, phone: e.target.value})} />
          </div>

          <button type="submit" className="w-full bg-kiwi text-black font-black py-5 rounded-2xl mt-4 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
            ACCÉDER À MON PROFIL <ChevronRight size={20}/>
          </button>
        </form>
      </div>
    </div>
  );
};