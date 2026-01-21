import React, { useState, useEffect } from 'react';
import { DollarSign, ArrowUpRight, Receipt, Download, Filter } from 'lucide-react';
import api from '../../api/axios';

const FinancePage = () => {
    const [data, setData] = useState({ total: 0, recent: [], monthly: [] });

    useEffect(() => {
        const fetchStats = async () => {
            const res = await api.get('/manager/finances');
            setData(res.data);
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* 1. RÉSUMÉ FINANCIER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-kiwi p-8 rounded-[2.5rem] text-black">
                    <p className="text-xs font-black uppercase tracking-widest opacity-70">Chiffre d'Affaires Total</p>
                    <h2 className="text-4xl font-black mt-2">{data.total.toLocaleString()} DH</h2>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold bg-black/10 w-fit px-3 py-1 rounded-full">
                        <ArrowUpRight size={16}/> +15% vs mois dernier
                    </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Moyenne / Adhésion</p>
                    <h2 className="text-3xl font-black text-white mt-2">
                        {data.total > 0 ? (data.total / data.recent.length).toFixed(0) : 0} DH
                    </h2>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-center">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Transactions (30j)</p>
                    <h2 className="text-3xl font-black text-white mt-2">{data.recent.length}</h2>
                </div>
            </div>

            {/* 2. HISTORIQUE DES TRANSACTIONS */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-black italic text-xl flex items-center gap-2">
                        <Receipt className="text-kiwi" /> DERNIERS ENCAISSEMENTS
                    </h3>
                    <button className="text-xs font-black uppercase text-slate-500 hover:text-white flex items-center gap-2 transition-colors">
                        <Download size={14}/> Exporter CSV
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50 text-[10px] font-black uppercase text-slate-500">
                            <tr>
                                <th className="px-8 py-4">Membre</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4">Méthode</th>
                                <th className="px-8 py-4 text-right">Montant</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {data.recent.map((pay) => (
                                <tr key={pay._id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-8 py-5 font-bold text-slate-200">
                                        {pay.member?.firstName} {pay.member?.lastName}
                                    </td>
                                    <td className="px-8 py-5 text-sm text-slate-500">
                                        {new Date(pay.paymentDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="bg-slate-800 px-3 py-1 rounded-lg text-[10px] font-black uppercase text-slate-400 border border-slate-700">
                                            {pay.method}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right font-black text-kiwi tracking-tighter text-lg">
                                        {pay.amount} DH
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};