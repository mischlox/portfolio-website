// components/Layout/Navigation.tsx

'use client'; 

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItems, PROFILE, View } from '../Common/Data';
import { Sparkles, User, Code, Mail, Menu, X } from 'lucide-react'; 

interface NavigationProps {
  scrolled: boolean;
  activeView: View;
  setActiveView: (view: View) => void;
}

const IconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  User,
  Code,
  Mail,
};

const NavTab = ({ label, view, current, set, iconName }: { label: string, view: View, current: View, set: (view: View) => void, iconName: string }) => {
  const active = current === view;
  const Icon = IconMap[iconName];

  return (
    <button
      onClick={() => set(view)}
      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 flex items-center gap-2 ${
        active ? 'text-black' : 'text-gray-400 hover:text-white'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white rounded-full -z-10 shadow-lg"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      {Icon && <Icon size={18} className={active ? 'text-black' : 'text-gray-600'} />} 
      {label}
    </button>
  );
};

export const Navigation: React.FC<NavigationProps> = ({ scrolled, activeView, setActiveView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeView]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
      scrolled || isMobileMenuOpen ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between relative">
        <div 
          onClick={() => setActiveView('chat')}
          className="flex items-center gap-2 text-lg font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity z-50 relative"
        >
          {PROFILE.full_name} | Software Engineer
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-lg">
          {NavItems.map(item => (
            <NavTab 
              key={item.view} 
              label={item.label} 
              view={item.view} 
              current={activeView} 
              set={setActiveView} 
              iconName={item.iconName} 
            />
          ))}
        </div>
        
        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden text-white p-2 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-black/95 border-b border-white/10 backdrop-blur-xl overflow-hidden md:hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 space-y-4">
                {NavItems.map(item => {
                  const Icon = IconMap[item.iconName];
                  const isActive = activeView === item.view;
                  
                  return (
                    <button
                      key={item.view}
                      onClick={() => setActiveView(item.view)}
                      className={`flex items-center gap-4 text-lg font-medium p-4 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-white text-black' 
                          : 'text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon size={20} />}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};