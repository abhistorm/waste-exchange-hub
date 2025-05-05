
import React from 'react';
import { Search } from 'lucide-react';

const ActionButtons: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <button className="p-2 text-gray-700 hover:text-primary transition-colors duration-200">
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ActionButtons;
