
import React from 'react';
import { useStoreData } from '@/hooks/useStoreData';
import StoreHeader from '@/components/store/StoreHeader';
import StoreContent from '@/components/store/StoreContent';
import StoreLayout from '@/components/store/StoreLayout';
import ListProductModal from '@/components/store/ListProductModal';

const Store = () => {
  const {
    filteredProducts,
    categories,
    materials,
    isListModalOpen,
    setIsListModalOpen,
    isLoaded,
    handleFilterSort,
    handleProductAdded
  } = useStoreData();

  return (
    <StoreLayout isLoaded={isLoaded}>
      {/* Hero section with cart */}
      <StoreHeader onOpenListModal={() => setIsListModalOpen(true)} />
      
      {/* Main store section with filters and product grid */}
      <StoreContent 
        filteredProducts={filteredProducts}
        categories={categories}
        materials={materials}
        onFilterSort={handleFilterSort}
      />
      
      {/* List product modal */}
      <ListProductModal 
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onProductAdded={handleProductAdded}
        materials={materials}
        categories={categories}
      />
    </StoreLayout>
  );
};

export default Store;
