import React from 'react';
import { LayoutDashboard, Users, Trophy, Settings, LogOut } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20}/>, label: 'Dashboard', active: true },
    { icon: <Users size={20}/>, label: 'Athlètes', active: false },
    { icon: <Trophy size={20}/>, label: 'Tournois', active: false },
    { icon: <Settings size={20}/>, label: 'Paramètres', active: false },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-[#0f172a] flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#82cc00] rounded-lg shadow-[0_0_15px_rgba(130,204,0,0.3)]"></div>
          <h1 className="text-xl font-bold italic tracking-tighter">KIWI<span className="text-[#82cc00]">SPORT</span></h1>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          {menuItems.map((item, index) => (
            <button key={index} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${item.active ? 'bg-[#82cc00] text-black shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button className="p-6 flex items-center gap-3 text-red-400 font-bold hover:bg-red-500/10 transition-all border-t border-slate-800">
          <LogOut size={20}/> Déconnexion
        </button>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Bienvenue, Manager 👋</h2>
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">M</div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;