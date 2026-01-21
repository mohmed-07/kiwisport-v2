import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Save, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api/axios';

const AttendancePage = () => {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([
    { id: "65a1b2c3d4", name: "Amine Rahmouni", status: "none", isPaid: true, rank: "Ceinture Noire" },
    { id: "65a5e6f7g8", name: "Sara El Fassi", status: "none", isPaid: false, rank: "Ceinture Verte" },
    { id: "65a9h1i2j3", name: "Karim Tazi", status: "none", isPaid: true, rank: "Ceinture Jaune" },
  ]);

  // 1. Vibration & UI Feedback
  const handleCheck = (id) => {
    if (window.navigator.vibrate) window.navigator.vibrate(50);
    updateStatus(id, 'present');
  };

  const updateStatus = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  // 2. Envoi des données au Backend
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        sport: "Karaté",
        groupName: "Élite A",
        date: new Date(),
        records: students.map(s => ({
          member: s.id,
          status: s.status === 'none' ? 'absent' : s.status
        }))
      };

      await api.post('/attendance/save', payload);
      alert("✅ Séance enregistrée !");
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic">SÉANCE D'ÉMARGEMENT</h1>
          <p className="text-slate-500 flex items-center gap-2 font-medium">
            <Calendar size={18} /> {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#82cc00] text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#82cc00]/20 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={22} />}
          VALIDER LA SÉANCE
        </button>
      </header>

      {/* Liste des Athlètes */}
      <div className="grid gap-3">
        {students.map((student) => (
          <div 
            key={student.id} 
            className={`group p-5 rounded-[2rem] border transition-all flex justify-between items-center ${
              !student.isPaid ? 'border-red-500/30 bg-red-500/5' : 'bg-[#0f172a] border-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${student.isPaid ? 'bg-slate-800 text-slate-400' : 'bg-red-500 text-white'}`}>
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {student.name}
                  {!student.isPaid && <AlertCircle size={16} className="text-red-500 animate-pulse" />}
                </h3>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40">
                  {student.rank} • {student.isPaid ? "À jour" : "Impayé"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleCheck(student.id)}
                className={`p-4 rounded-2xl transition-all ${student.status === 'present' ? 'bg-[#82cc00] text-black scale-110 shadow-lg shadow-[#82cc00]/30' : 'bg-slate-800 text-slate-500 hover:text-[#82cc00]'}`}
              >
                <CheckCircle size={26} />
              </button>
              <button 
                onClick={() => updateStatus(student.id, 'absent')}
                className={`p-4 rounded-2xl transition-all ${student.status === 'absent' ? 'bg-red-600 text-white scale-110 shadow-lg shadow-red-600/30' : 'bg-slate-800 text-slate-500 hover:text-red-500'}`}
              >
                <XCircle size={26} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendancePage;