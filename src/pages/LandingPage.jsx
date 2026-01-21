import React, { useState } from 'react';
import { 
  ShieldCheck, MapPin, Zap, Users, 
  ShoppingBag, Mail, ChevronRight, Lock 
} from 'lucide-react';
import MemberLoginPopup from '../features/member/MemberLoginPopup';
import ClubSelector from '../features/public/ClubSelector'; // Le Wizard qu'on a fait
import AdSlot from '../components/ads/AdSlot'; // Le slot géré par SuperAdmin

const LandingPage = () => {
  const [isMemberPopupOpen, setMemberPopupOpen] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="bg-[#020617] text-white min-h-screen selection:bg-kiwi selection:text-black">
      
      {/* 1. NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-3xl font-black italic tracking-tighter">
          KIWI<span className="text-kiwi">SPORT</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
          <a href="#features" className="hover:text-kiwi transition-colors">Fonctionnalités</a>
          <a href="#clubs" className="hover:text-kiwi transition-colors">Clubs Proches</a>
          <a href="#pricing" className="hover:text-kiwi transition-colors">Tarifs</a>
          <a href="#store" className="hover:text-kiwi transition-colors opacity-50 cursor-not-allowed">Store (Soon)</a>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setMemberPopupOpen(true)}
            className="px-6 py-2 border border-slate-800 rounded-full text-xs font-black uppercase hover:bg-white hover:text-black transition-all"
          >
            Espace Membre
          </button>
          <button className="p-2 bg-slate-900 rounded-full text-kiwi border border-slate-800 hover:scale-110 transition-transform">
            <Lock size={18} />
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION & AD SLOT */}
      <main className="max-w-7xl mx-auto px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left duration-1000">
            <span className="bg-kiwi/10 text-kiwi text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-kiwi/20">
              V2 Expansive System
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic leading-[0.9] mt-6 tracking-tighter uppercase">
              Gérez votre club <br /> 
              <span className="text-kiwi">Sans limites.</span>
            </h1>
            <p className="text-slate-500 mt-8 text-lg font-medium max-w-md">
              La plateforme ultime pour les académies de sport au Maroc. Émargement, paiements, grades et visibilité.
            </p>
            <div className="flex gap-4 mt-10">
              <button 
                onClick={() => setShowWizard(true)}
                className="bg-kiwi text-black px-8 py-5 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-kiwi/20"
              >
                REJOINDRE UN CLUB <ChevronRight size={20}/>
              </button>
            </div>
          </div>

          {/* Ad Slot Desktop (Visible uniquement si SuperAdmin l'active) */}
          <div className="hidden lg:block">
            <AdSlot placement="desktop" />
          </div>
        </div>
      </main>

      {/* 3. CLUB LOCATOR (Register Wizard Section) */}
      <section id="clubs" className="py-24 bg-slate-900/30 mt-20">
        <div className="max-w-7xl mx-auto px-8">
            {showWizard ? (
                <ClubSelector onSelect={(id) => console.log("Club selected:", id)} />
            ) : (
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black italic uppercase">Trouvez votre club à proximité</h2>
                    <p className="text-slate-500 max-w-lg mx-auto">Sélectionnez votre ville et votre sport pour intégrer une académie certifiée Kiwisport.</p>
                    <button onClick={() => setShowWizard(true)} className="mt-6 text-kiwi font-black uppercase text-xs tracking-[0.2em] flex items-center gap-2 mx-auto hover:gap-4 transition-all">
                        Explorer les clubs <ChevronRight size={16}/>
                    </button>
                </div>
            )}
        </div>
      </section>

      {/* 4. PRICING (Contact Form for Club Owners) */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic tracking-tight uppercase">Prêt à digitaliser votre club ?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { name: "Starter", price: "199", features: ["1 Sport", "Max 50 Membres", "Attendance Basic"] },
                { name: "Pro", price: "399", features: ["3 Sports", "Membres illimités", "Finance & Stats", "QR Code Access"], hot: true },
                { name: "Elite", price: "599", features: ["Tous Sports", "Gestion Multisites", "Ghost Mode Support", "Ad-Free Dashboard"] }
            ].map(plan => (
                <div key={plan.name} className={`bg-[#0f172a] border ${plan.hot ? 'border-kiwi ring-1 ring-kiwi/50' : 'border-slate-800'} p-10 rounded-[3rem] relative`}>
                    {plan.hot && <span className="absolute -top-4 right-10 bg-kiwi text-black text-[10px] font-black px-4 py-1 rounded-full uppercase">Recommandé</span>}
                    <h3 className="text-2xl font-black uppercase italic mb-2">{plan.name}</h3>
                    <div className="text-4xl font-black text-kiwi mb-8">{plan.price} DH<span className="text-xs text-slate-500">/mois</span></div>
                    <ul className="space-y-4 mb-10">
                        {plan.features.map(f => <li key={f} className="text-slate-400 text-sm flex items-center gap-2 font-medium"><Zap size={14} className="text-kiwi"/> {f}</li>)}
                    </ul>
                    <a href="mailto:kiwisportcontact@gmail.com?subject=Demande Plan Pro" className="block text-center w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-kiwi transition-colors">CHOISIR CE PLAN</a>
                </div>
            ))}
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center text-slate-600">
        <div className="mb-6 flex justify-center gap-6">
            <ShoppingBag className="opacity-30" />
            <Mail className="opacity-30" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">© 2026 Kiwisport Management System. Propulsé par Kiwisport Lab.</p>
      </footer>

      {/* MODAL & OVERLAYS */}
      <MemberLoginPopup isOpen={isMemberPopupOpen} onClose={() => setMemberPopupOpen(false)} />
    </div>
  );
};

export default LandingPage;