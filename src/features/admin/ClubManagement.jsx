import React from 'react';
import { ShieldCheck, UserCog, Power, Trash2, ExternalLink } from 'lucide-react';

const ClubManagement = ({ clubs, onImpersonate, onToggleStatus }) => {
  return (
    <div className="overflow-x-auto bg-[#0f172a] rounded-[2.5rem] border border-slate-800 p-6">
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-500 text-xs uppercase font-black border-b border-slate-800">
            <th className="px-6 py-4">Club & Manager</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Plan</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {clubs.map((club) => (
            <tr key={club._id} className="hover:bg-slate-900/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-white">{club.name}</div>
                <div className="text-xs text-slate-500">{club.owner?.username}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${club.active ? 'bg-kiwi/10 text-kiwi' : 'bg-red-500/10 text-red-500'}`}>
                  {club.active ? 'Actif' : 'Suspendu'}
                </span>
              </td>
              <td className="px-6 py-4 font-medium text-slate-300">{club.plan || 'Standard'}</td>
              <td className="px-6 py-4 flex gap-2">
                {/* Ghost Mode Button */}
                <button onClick={() => onImpersonate(club._id)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all" title="Ghost Mode">
                  <ExternalLink size={18} />
                </button>
                {/* Suspend Button */}
                <button onClick={() => onToggleStatus(club._id)} className={`p-2 rounded-lg transition-all ${club.active ? 'bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white' : 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'}`}>
                  <Power size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};