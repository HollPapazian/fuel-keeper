import React, { useState, useRef, useEffect } from 'react';
import { supabaseClient } from '../../utils/supabase';
import { useSessionStore } from '../../store/sessionStore';

interface UserIconProps {
  size?: number;
}

export const UserIcon: React.FC<UserIconProps> = ({ 
  size = 40 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSession } = useSessionStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    setSession(null);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center justify-center rounded-full bg-gray-600 text-white font-medium cursor-pointer hover:bg-gray-700 transition-colors"
        style={{ 
          width: size, 
          height: size,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-xl py-1 z-50 border border-gray-700 transform transition-all duration-200 ease-in-out">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50 hover:text-white transition-colors flex items-center gap-2 group relative"
          >
            <span>Log out</span>
          </button>
          <div className="h-px bg-gray-700 my-1" />
          <button
            onClick={() => setIsOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700/50 hover:text-white transition-colors flex items-center gap-2 group relative"
          >
            <span>Close</span>
          </button>
        </div>
      )}
    </div>
  );
}; 