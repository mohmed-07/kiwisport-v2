import React, { useState } from 'react';
import { Megaphone, Send, Info, AlertTriangle, Sparkles } from 'lucide-react';
import api from '../../api/axios';

const BroadcastCenter = () => {
    const [msg, setMsg] = useState({ title: '', message: '', type: 'info' });

    const handleSend = async () => {
        try {
            await api.post('/superadmin/broadcast', msg);
            alert("📣 Annonce diffusée à tous les managers !");
            setMsg({ title: '', message: '', type: 'info' });
        } catch (err) {
            alert("Erreur lors de l'envoi.");
        }
    };

    return (
        <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-kiwi/10 rounded-2xl text-kiwi">
                    <Megaphone size={24} />
                </div>
                <h2 className="text-2xl font-black italic uppercase">Diffusion Globale</h2>
            </div>

            <div className="space-y-4">
                <input 
                    placeholder="Titre de l'annonce..." 
                    className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi"
                    value={msg.title}
                    onChange={e => setMsg({...msg, title: e.target.value})}
                />
                
                <textarea 
                    placeholder="Votre message aux managers..." 
                    rows="4"
                    className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi"
                    value={msg.message}
                    onChange={e => setMsg({...msg, message: e.target.value})}
                ></textarea>

                <div className="flex gap-4">
                    {['info', 'warning', 'update', 'promotion'].map(t => (
                        <button 
                            key={t}
                            onClick={() => setMsg({...msg, type: t})}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${msg.type === t ? 'bg-white text-black border-white' : 'border-slate-800 text-slate-500'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={handleSend}
                    className="w-full mt-4 bg-kiwi text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                >
                    <Send size={20}/> ENVOYER L'ANNONCE MAINTENANT
                </button>
            </div>
        </div>
    );
};