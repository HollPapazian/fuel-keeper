import React, { useState, useRef, useEffect } from 'react';
import { supabaseClient } from '../../utils/supabase';
import { useSessionStore } from '../../store/sessionStore';

interface UserIconProps {
  initials?: string;
  size?: number;
}

export const UserIcon: React.FC<UserIconProps> = ({ 
  initials = 'U', 
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
          fontSize: `${size * 0.4}px`
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {initials}
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-500 rounded-md shadow-lg py-1 z-50">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-100 hover:text-gray-600 bg-gray-400 hover:bg-gray-300 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}; 