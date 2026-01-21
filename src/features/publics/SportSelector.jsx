const SportSelector = ({ availableSports, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableSports.map(sport => (
                <button 
                    key={sport}
                    onClick={() => onSelect(sport)}
                    className="p-6 bg-[#0f172a] border border-slate-800 rounded-[2rem] text-center hover:border-kiwi transition-all group"
                >
                    <div className="w-12 h-12 bg-kiwi/10 rounded-xl mx-auto mb-3 flex items-center justify-center text-kiwi group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <span className="font-black text-xl italic uppercase tracking-tighter text-white">
                        {sport}
                    </span>
                </button>
            ))}
        </div>
    );
};