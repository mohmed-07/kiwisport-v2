import React from 'react';
import { Users, CreditCard, CalendarCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import StatCard from '../../components/ui/StatCard'; // On réutilise notre composant pro

const ManagerDashboard = () => {
  // Ces données viendront de tes routes API /api/manager/stats
  const stats = [
    { title: "Athlètes Actifs", value: "128", icon: <Users />, trend: "+12%", color: "text-blue-400" },
    { title: "CA Mensuel", value: "14,200 DH", icon: <CreditCard />, trend: "+8%", color: "text-kiwi" },
    { title: "Présences (Aujourd'hui)", value: "42", icon: <CalendarCheck />, trend: "-3%", color: "text-purple-400" },
    { title: "Taux de Rétention", value: "94%", icon: <TrendingUp />, trend: "+2%", color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header & Welcome */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">Tableau de Bord</h1>
          <p className="text-slate-500 font-medium">Voici l'état actuel de votre académie.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#0f172a] p-2 rounded-2xl border border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-kiwi flex items-center justify-center text-black font-bold">M</div>
          <div className="pr-4">
            <p className="text-xs font-black leading-none">Club Ittihad</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Manager</p>
          </div>
        </div>
      </header>

      {/* 2. Grid de Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* 3. Zone d'Alertes Urgentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20}/> ACTIONS REQUISES
          </h3>
          <div className="space-y-4">
            {/* Exemple d'alerte impayé */}
            <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <p className="text-sm font-bold">8 athlètes ont des cotisations expirées.</p>
              </div>
              <button className="text-xs font-black uppercase text-red-500 hover:underline">Voir la liste</button>
            </div>
            
            {/* Exemple d'alerte notification SuperAdmin */}
            <div className="flex items-center justify-between p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <p className="text-sm font-bold">Message du SuperAdmin : Mise à jour système prévue à 23h.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Mini-Ads Slot (Contrôlé par toi, le SuperAdmin) */}
        <div className="bg-slate-900 rounded-[2.5rem] border border-dashed border-slate-700 p-8 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Espace Publicitaire</p>
            <div className="w-full aspect-square bg-slate-800 rounded-3xl mb-4 flex items-center justify-center">
                <p className="text-xs italic text-slate-600">Ta publicité SuperAdmin ici</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;