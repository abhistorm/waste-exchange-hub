
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from '@/types/store';
import { useToast } from "@/hooks/use-toast";

interface ListProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: Product) => void;
  materials: string[];
  categories: string[];
}

const ListProductModal = ({
  isOpen,
  onClose,
  onProductAdded,
  materials,
  categories
}: ListProductModalProps) => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '/placeholder.svg',
    seller: '',
    materials: [] as string[],
    percentRecycled: '',
    wasteDiverted: '',
    carbonSaved: ''
  });
  
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addMaterial = () => {
    if (selectedMaterial && !formState.materials.includes(selectedMaterial)) {
      setFormState(prev => ({
        ...prev,
        materials: [...prev.materials, selectedMaterial]
      }));
      setSelectedMaterial('');
    }
  };

  const removeMaterial = (material: string) => {
    setFormState(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m !== material)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) newErrors.name = "Product name is required";
    if (!formState.description.trim()) newErrors.description = "Description is required";
    if (!formState.price || isNaN(Number(formState.price)) || Number(formState.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
    if (!formState.category) newErrors.category = "Category is required";
    if (!formState.seller.trim()) newErrors.seller = "Seller name is required";
    if (formState.materials.length === 0) newErrors.materials = "At least one material is required";
    if (!formState.percentRecycled || isNaN(Number(formState.percentRecycled)) || 
        Number(formState.percentRecycled) < 0 || Number(formState.percentRecycled) > 100) {
      newErrors.percentRecycled = "Please enter a valid percentage (0-100)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newProduct: Product = {
      id: 0, // Placeholder, will be set by the parent component
      name: formState.name,
      description: formState.description,
      price: Number(formState.price),
      category: formState.category,
      image: formState.image,
      seller: formState.seller,
      materials: formState.materials,
      inStock: true,
      rating: 0,
      dateAdded: new Date(),
      sustainability: {
        percentRecycled: Number(formState.percentRecycled),
        carbonSaved: Number(formState.carbonSaved) || 0,
        wasteDiverted: formState.wasteDiverted || "N/A"
      }
    };
    
    onProductAdded(newProduct);
    
    toast({
      title: "Product Listed",
      description: "Your product has been successfully listed in the marketplace.",
    });
    
    // Reset form
    setFormState({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '/placeholder.svg',
      seller: '',
      materials: [],
      percentRecycled: '',
      wasteDiverted: '',
      carbonSaved: ''
    });
    setErrors({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>List Your Recycled Product</DialogTitle>
          <DialogDescription>
            Share your handcrafted items made from recycled materials with our community.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            
            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formState.price}
                onChange={handleChange}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
            </div>
            
            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formState.description}
                onChange={handleChange}
                rows={3}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
            </div>
            
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formState.category}
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="Home Decor">Home Decor</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Garden">Garden</SelectItem>
                      <SelectItem value="Lighting">Lighting</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
            </div>
            
            {/* Seller name */}
            <div className="space-y-2">
              <Label htmlFor="seller">Seller/Brand Name</Label>
              <Input
                id="seller"
                name="seller"
                value={formState.seller}
                onChange={handleChange}
                className={errors.seller ? "border-red-500" : ""}
              />
              {errors.seller && <p className="text-red-500 text-xs">{errors.seller}</p>}
            </div>
            
            {/* Materials */}
            <div className="space-y-2 md:col-span-2">
              <Label>Materials Used</Label>
              <div className="flex gap-2">
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.length > 0 ? (
                      materials.map(material => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="Recycled Glass">Recycled Glass</SelectItem>
                        <SelectItem value="Reclaimed Wood">Reclaimed Wood</SelectItem>
                        <SelectItem value="Plastic">Plastic</SelectItem>
                        <SelectItem value="Rubber">Rubber</SelectItem>
                        <SelectItem value="Metal">Metal</SelectItem>
                        <SelectItem value="Paper">Paper</SelectItem>
                        <SelectItem value="Textile">Textile</SelectItem>
                        <SelectItem value="Electronic Waste">Electronic Waste</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addMaterial}>Add</Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formState.materials.map(material => (
                  <div key={material} className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-sm">{material}</span>
                    <button 
                      type="button"
                      onClick={() => removeMaterial(material)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {errors.materials && <p className="text-red-500 text-xs">{errors.materials}</p>}
            </div>
            
            {/* Sustainability information */}
            <div className="md:col-span-2">
              <h3 className="font-medium mb-3">Sustainability Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percentRecycled">% Recycled Materials</Label>
                  <Input
                    id="percentRecycled"
                    name="percentRecycled"
                    type="number"
                    min="0"
                    max="100"
                    value={formState.percentRecycled}
                    onChange={handleChange}
                    className={errors.percentRecycled ? "border-red-500" : ""}
                  />
                  {errors.percentRecycled && <p className="text-red-500 text-xs">{errors.percentRecycled}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="carbonSaved">CO2 Saved (kg)</Label>
                  <Input
                    id="carbonSaved"
                    name="carbonSaved"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formState.carbonSaved}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wasteDiverted">Waste Diverted</Label>
                  <Input
                    id="wasteDiverted"
                    name="wasteDiverted"
                    placeholder="e.g., 2kg, 500g"
                    value={formState.wasteDiverted}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              List Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ListProductModal;
