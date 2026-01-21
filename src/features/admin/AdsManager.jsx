import React, { useState } from 'react';
import { Monitor, Smartphone, Eye, MousePointer2, Plus, Power, Trash2 } from 'lucide-react';

const AdsManager = ({ ads, onToggle, onAdd }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black italic tracking-tighter">GESTION DES ADS SLOTS</h2>
        <button onClick={onAdd} className="bg-kiwi text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all">
          <Plus size={18}/> NOUVELLE PUB
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad._id} className={`bg-[#0f172a] border ${ad.active ? 'border-slate-800' : 'border-red-500/20'} rounded-[2.5rem] overflow-hidden group transition-all`}>
            {/* Preview de l'image */}
            <div className="h-40 bg-slate-900 relative">
              <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 left-4 flex gap-2">
                {ad.placement === 'desktop' || ad.placement === 'both' ? <div className="p-2 bg-black/60 rounded-lg text-white"><Monitor size={14}/></div> : null}
                {ad.placement === 'mobile' || ad.placement === 'both' ? <div className="p-2 bg-black/60 rounded-lg text-white"><Smartphone size={14}/></div> : null}
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg mb-4 truncate">{ad.title}</h3>
              
              {/* Stats rapides */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-black uppercase">Vues</p>
                  <p className="text-xl font-bold flex items-center gap-2"><Eye size={16} className="text-blue-400"/> {ad.stats.views}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-black uppercase">Clics</p>
                  <p className="text-xl font-bold flex items-center gap-2"><MousePointer2 size={16} className="text-kiwi"/> {ad.stats.clicks}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button 
                  onClick={() => onToggle(ad._id)}
                  className={`flex items-center gap-2 font-black text-xs uppercase ${ad.active ? 'text-kiwi' : 'text-red-500'}`}
                >
                  <Power size={16} /> {ad.active ? 'Active' : 'Désactivée'}
                </button>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};