
import React, { useState } from 'react';
import MaterialListingForm from '@/components/MaterialListingForm';
import MaterialFilters from '@/components/MaterialFilters';
import MaterialGrid from '@/components/MaterialGrid';
import { Toaster } from '@/components/ui/toaster';
import { useMaterialMarketplace } from '@/hooks/useMaterialMarketplace';
import StoreLayout from '@/components/store/StoreLayout';
import { ArrowLeft, Upload, Filter, Package, Shield, PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MaterialMarketplace = () => {
  const {
    materials,
    filteredMaterials,
    isLoaded,
    handleSearch,
    handleFilterSort,
    handleAddMaterial,
    handleDeleteMaterial
  } = useMaterialMarketplace();
  
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<number | null>(null);
  const { toast } = useToast();
  const { isAuthenticated, isAdmin } = useAuth();
  
  const onMaterialAdded = (material: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to list materials.",
        variant: "destructive",
      });
      return;
    }
    
    const newMaterial = handleAddMaterial(material);
    toast({
      title: "Material Listed Successfully",
      description: "Your material has been added to the marketplace.",
      duration: 3000,
    });
  };
  
  const onDeleteClick = (materialId: number) => {
    if (!isAuthenticated || !isAdmin) {
      toast({
        title: "Permission Denied",
        description: "You need admin privileges to delete materials.",
        variant: "destructive",
      });
      return;
    }
    
    setMaterialToDelete(materialId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (materialToDelete !== null) {
      handleDeleteMaterial(materialToDelete);
      toast({
        title: "Material Deleted",
        description: "The material has been removed from the marketplace.",
        duration: 3000,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <StoreLayout isLoaded={isLoaded}>
      {/* Hero section with search */}
      <section className="py-12 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center">
            <Link to="/store" className="mr-auto">
              <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Store
              </Button>
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="ml-auto">
                <Button variant="outline" size="sm" className="text-white border-amber-300/50 hover:bg-amber-500/20 hover:text-white">
                  <Shield className="h-4 w-4 mr-1" />
                  Admin Dashboard
                </Button>
              </Link>
            )}
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Waste Material Marketplace
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Buy and sell recyclable waste materials. Give waste a second life and contribute to a circular economy.
            </p>
            <div className="flex justify-center mb-6">
              <MaterialListingForm onMaterialAdded={onMaterialAdded} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile filter toggle */}
      <div className="lg:hidden container mx-auto px-4 mt-4">
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          onClick={() => setShowFiltersOnMobile(!showFiltersOnMobile)}
        >
          <span className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters & Search
          </span>
          <span>{showFiltersOnMobile ? "Hide" : "Show"}</span>
        </Button>
      </div>
      
      {/* Main marketplace section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className={`${showFiltersOnMobile ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
              <div className="sticky top-24">
                <MaterialFilters 
                  onSearch={handleSearch}
                  onFilterSort={handleFilterSort}
                />
              </div>
            </div>
            
            {/* Materials grid */}
            <div className="lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-emerald-600" />
                  <h2 className="text-xl font-medium">Available Materials</h2>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 text-sm">
                    {filteredMaterials.length} {filteredMaterials.length === 1 ? 'item' : 'items'}
                  </p>
                  
                  {isAdmin && (
                    <Button 
                      onClick={() => {
                        if (isAuthenticated) {
                          document.getElementById('list-materials-button')?.click();
                        } else {
                          toast({
                            title: "Authentication Required",
                            description: "Please sign in to list materials.",
                            variant: "destructive",
                          });
                        }
                      }}
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1 border-green-600 text-green-600 hover:bg-green-50"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Material
                    </Button>
                  )}
                </div>
              </div>
              
              <MaterialGrid 
                materials={filteredMaterials} 
                isLoading={!isLoaded} 
                isAdmin={isAdmin} 
                onDeleteClick={onDeleteClick}
              />
              
              {filteredMaterials.length > 0 && (
                <div className="mt-8 text-center">
                  <Button 
                    variant="outline" 
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950/30"
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast({
                          title: "Authentication Required",
                          description: "Please sign in to list materials.",
                          variant: "destructive",
                        });
                        return;
                      }
                      document.getElementById('list-materials-button')?.click();
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    List Your Own Materials
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Material</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this material? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StoreLayout>
  );
};

export default MaterialMarketplace;
