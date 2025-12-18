// components/Layout/Navigation.tsx

'use client'; // Ensure this component is marked as a Client Component

import React from 'react';
import { motion } from 'framer-motion';
import { NavItems, PROFILE, View } from '../Common/Data';
import { Sparkles, User, Code, Mail } from 'lucide-react'; // Import icons here

interface NavigationProps {
  scrolled: boolean;
  activeView: View;
  setActiveView: (view: View) => void;
}

// Map the string name to the actual component
const IconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  User,
  Code,
  Mail,
};

const NavTab = ({ label, view, current, set, iconName }: { label: string, view: View, current: View, set: (view: View) => void, iconName: string }) => {
  const active = current === view;
  const Icon = IconMap[iconName]; // Get the component using the string name

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
      {/* Render the icon component with props */}
      {Icon && <Icon size={18} className={active ? 'text-black' : 'text-gray-600'} />} 
      {label}
    </button>
  );
};

export const Navigation: React.FC<NavigationProps> = ({ scrolled, activeView, setActiveView }) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4 shadow-2xl' : 'bg-transparent border-transparent py-6'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div 
          onClick={() => setActiveView('chat')}
          className="flex items-center gap-2 text-lg font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
        >
          {PROFILE.full_name} | Software Engineer
        </div>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-lg">
          {NavItems.map(item => (
            <NavTab 
              key={item.view} 
              label={item.label} 
              view={item.view} 
              current={activeView} 
              set={setActiveView} 
              iconName={item.iconName} // Pass the string name
            />
          ))}
        </div>
        
        <button className="md:hidden text-sm text-gray-400">Menu</button>
      </div>
    </nav>
  );
};