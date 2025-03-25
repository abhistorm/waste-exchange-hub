
import React from 'react';
import MaterialCard from '@/components/MaterialCard';
import { Material } from '@/types/material';

interface MaterialGridProps {
  materials: Material[];
}

const MaterialGrid = ({ materials }: MaterialGridProps) => {
  return (
    <div>
      {materials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map(material => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No materials match your current filters.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Try changing your filter settings or list your own materials.</p>
        </div>
      )}
    </div>
  );
};

export default MaterialGrid;
