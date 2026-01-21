import React from 'react';

const StatCard = ({ title, value, icon, trend, color }) => {
  return (
    <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-3xl hover:border-kiwi/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-slate-900 ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend.includes('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-3xl font-black">{value}</h3>
      <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mt-1">{title}</p>
    </div>
  );
};

export default StatCard;