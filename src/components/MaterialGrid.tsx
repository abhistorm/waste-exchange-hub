
import React from 'react';
import MaterialCard from '@/components/MaterialCard';
import { Material } from '@/types/material';
import { PackageOpen, Trash2, Edit, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaterialGridProps {
  materials: Material[];
  isLoading?: boolean;
  isAdmin?: boolean;
  onDeleteClick?: (materialId: number) => void;
  onApproveClick?: (materialId: number, approve: boolean) => void;
}

const MaterialGrid = ({ 
  materials, 
  isLoading = false, 
  isAdmin = false,
  onDeleteClick,
  onApproveClick
}: MaterialGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {materials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material, index) => (
            <div key={material.id} className="relative">
              <MaterialCard material={material} index={index} />
              
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-1">
                  {onApproveClick && material.isApproved === false && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/90 hover:bg-white border-green-500 text-green-600"
                      onClick={() => onApproveClick(material.id, true)}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {onApproveClick && material.isApproved === true && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/90 hover:bg-white border-red-500 text-red-600"
                      onClick={() => onApproveClick(material.id, false)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {onDeleteClick && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/90 hover:bg-white border-red-500 text-red-600"
                      onClick={() => onDeleteClick(material.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-center mb-4">
            <PackageOpen className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No materials match your current filters.</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Try changing your filter settings or list your own materials.</p>
        </div>
      )}
    </div>
  );
};

export default MaterialGrid;
