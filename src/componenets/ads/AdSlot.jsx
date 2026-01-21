import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const AdSlot = ({ placement }) => {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      // Route publique qui renvoie une pub aléatoire active pour ce placement
      const res = await api.get(`/public/ads/random?placement=${placement}`);
      if (res.data) setAd(res.data);
    };
    fetchAd();
  }, [placement]);

  if (!ad) return null;

  return (
    <div className="my-6 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-500">
      <a href={ad.targetUrl} target="_blank" rel="noreferrer" onClick={() => api.post(`/public/ads/click/${ad._id}`)}>
        <img src={ad.imageUrl} alt="Promotion" className="w-full hover:scale-105 transition-transform duration-700" />
      </a>
      <div className="bg-slate-900 px-4 py-1 text-[8px] text-slate-500 uppercase font-black text-right tracking-widest">
        Sponsorisé par Kiwisport
      </div>
    </div>
  );
};