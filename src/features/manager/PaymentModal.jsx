import React, { useState } from 'react';
import { X, CreditCard, Calendar, DollarSign, Check } from 'lucide-react';
import api from '../../api/axios';

const PaymentModal = ({ member, onClose, onSuccess }) => {
    const [data, setData] = useState({ amount: '', method: 'Espèces', months: 1 });
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/manager/payments', { memberId: member._id, ...data });
            onSuccess();
            onClose();
        } catch (err) {
            alert("Erreur lors de l'encaissement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f172a] border border-slate-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-black italic tracking-tighter">ENCAISSEMENT</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors"><X/></button>
                </div>

                <div className="mb-8 p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Athlète</p>
                    <p className="font-bold text-lg">{member.firstName} {member.lastName}</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Montant (DH)</label>
                            <input required type="number" className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none focus:border-kiwi transition-all"
                                onChange={e => setData({...data, amount: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Durée (Mois)</label>
                            <input required type="number" min="1" value={data.months} className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl outline-none"
                                onChange={e => setData({...data, months: e.target.value})} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Mode de Paiement</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Espèces', 'Virement'].map(m => (
                                <button type="button" key={m} onClick={() => setData({...data, method: m})}
                                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${data.method === m ? 'bg-kiwi text-black border-kiwi' : 'border-slate-800 text-slate-500'}`}>
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button disabled={loading} className="w-full bg-kiwi text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl shadow-kiwi/20">
                        {loading ? "Traitement..." : <><Check size={20}/> VALIDER LE PAIEMENT</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;