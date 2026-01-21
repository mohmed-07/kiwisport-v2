import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Trophy, CalendarDays, Wallet, ShieldCheck } from 'lucide-react';

const MemberDashboard = ({ member }) => {
  return (
    <div className="max-w-md mx-auto space-y-6 pb-20 animate-in slide-in-from-bottom-10 duration-700">
      {/* 1. Carte d'Identité & QR Code */}
      <div className="bg-kiwi p-8 rounded-[3rem] text-black text-center shadow-xl shadow-kiwi/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={120}/></div>
        
        <h2 className="text-3xl font-black uppercase italic leading-none">{member.firstName}</h2>
        <p className="font-bold text-sm tracking-widest opacity-70 mb-6">{member.lastName}</p>

        <div className="bg-white p-4 rounded-3xl inline-block shadow-inner mb-6">
          <QRCodeSVG value={member.id} size={150} fgColor="#000000" />
        </div>
        
        <div className="bg-black/10 rounded-2xl py-3 px-6 inline-flex items-center gap-2">
            <ShieldCheck size={18}/>
            <span className="font-black text-sm uppercase">{member.currentRank}</span>
        </div>
      </div>

      {/* 2. Statut de l'Abonnement */}
      <div className={`p-6 rounded-[2.5rem] border flex items-center justify-between ${member.isPaid ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
        <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl"><Wallet size={24}/></div>
            <div>
                <p className="text-[10px] font-black uppercase opacity-60 leading-none">Abonnement</p>
                <p className="font-bold">{member.isPaid ? "À jour" : "Cotisation expirée"}</p>
            </div>
        </div>
        {!member.isPaid && <span className="text-xs font-black underline">Régler</span>}
      </div>

      {/* 3. Historique & Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-[2.5rem]">
            <CalendarDays className="text-kiwi mb-3" size={24}/>
            <h4 className="text-2xl font-black">24</h4>
            <p className="text-[10px] font-black uppercase text-slate-500">Séances suivies</p>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-[2.5rem]">
            <Trophy className="text-blue-400 mb-3" size={24}/>
            <h4 className="text-2xl font-black">6</h4>
            <p className="text-[10px] font-black uppercase text-slate-500">Mois d'ancienneté</p>
        </div>
      </div>

      {/* 4. Club Info */}
      <div className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-dashed border-slate-800 text-center">
        <p className="text-xs text-slate-500 font-medium">Membre fier de</p>
        <p className="text-lg font-black text-white italic uppercase tracking-tighter">
            {member.clubName} <span className="text-kiwi">Academie</span>
        </p>
      </div>
    </div>
  );
};