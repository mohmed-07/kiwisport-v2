import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit3, Trash2, Phone, CreditCard } from 'lucide-react';
import api from '../../api/axios';

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [filters, setFilters] = useState({ search: '', sport: 'Tous', status: 'all' });


    // Simulation des sports configurés par le manager
    const availableSports = ['Karaté', 'Judo', 'Boxe']; 

    useEffect(() => {
        const fetchMembers = async () => {
            const { data } = await api.get('/manager/members', { params: filters });
            setMembers(data);
        };
        fetchMembers();
    }, [filters]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* BARRE DE RECHERCHE ET FILTRES */}
            <div className="flex flex-wrap gap-4 bg-[#0f172a] p-6 rounded-[2rem] border border-slate-800">
                <div className="flex-1 min-w-[250px] relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="text" placeholder="Rechercher un athlète..." 
                        className="w-full bg-slate-900 border border-slate-800 p-3 pl-12 rounded-xl outline-none focus:border-kiwi"
                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                </div>
                
                <select 
                    className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-sm outline-none"
                    onChange={(e) => setFilters({...filters, sport: e.target.value})}
                >
                    <option value="Tous">Tous les Sports</option>
                    {availableSports.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select 
                    className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-sm outline-none"
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                    <option value="all">Tous les Statuts</option>
                    <option value="paid">À jour</option>
                    <option value="unpaid">Impayés</option>
                </select>
            </div>

            {/* TABLE DES MEMBRES */}
            <div className="bg-[#0f172a] rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-800">
                            <th className="px-8 py-5">Athlète</th>
                            <th className="px-8 py-5">Sport & Grade</th>
                            <th className="px-8 py-5">Paiement</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {members.map((member) => (
                            <tr key={member._id} className="hover:bg-slate-800/20 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:bg-kiwi group-hover:text-black transition-colors">
                                            {member.firstName[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white uppercase tracking-tight">{member.firstName} {member.lastName}</p>
                                            <p className="text-xs text-slate-500 flex items-center gap-1"><Phone size={10}/> {member.phone}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <p className="text-sm font-bold text-slate-300">{member.registeredSport}</p>
                                    <p className="text-[10px] font-black uppercase text-slate-500">{member.currentRank}</p>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${member.isPaid ? 'bg-kiwi/10 text-kiwi' : 'bg-red-500/10 text-red-500 animate-pulse'}`}>
                                        {member.isPaid ? 'Payé' : 'À régler'}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"><Edit3 size={18}/></button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {members.length === 0 && (
                    <div className="p-20 text-center text-slate-600 font-medium italic">
                        Aucun membre trouvé pour cette recherche...
                    </div>
                )}
            </div>
        </div>
    );
};