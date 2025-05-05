
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Material } from '@/types/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import AuctionBadge from '@/components/AuctionBadge';
import AuctionDetails from '@/components/AuctionDetails';
import { Calendar, DollarSign, MapPin, Package, Recycle, Tag, ArrowLeft, Phone, Mail, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// This would typically come from an API
import { mockMaterials } from '@/lib/mock-data';

const MaterialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [material, setMaterial] = useState<Material | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Simulate API call to fetch material details
    setIsLoading(true);
    setTimeout(() => {
      const foundMaterial = mockMaterials.find(m => m.id === Number(id));
      if (foundMaterial) {
        // Increment view count (would be done on server in real app)
        setMaterial({
          ...foundMaterial,
          views: (foundMaterial.views || 0) + 1
        });
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleContactSeller = () => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      toast({
        title: "Authentication required",
        description: "Please sign in to contact the seller",
      });
      navigate('/signin', { state: { from: `/material-details/${id}` } });
      return;
    }
    
    setIsContactVisible(true);
    
    // In a real app, this might log the contact request
    toast({
      title: "Contact request sent",
      description: "The seller will be notified of your interest",
    });
  };
  
  const handlePlaceBid = (bidAmount: number) => {
    if (!material?.auction) return;
    
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      toast({
        title: "Authentication required",
        description: "Please sign in to place a bid",
      });
      navigate('/signin', { state: { from: `/material-details/${id}` } });
      return;
    }
    
    toast({
      title: "Bid placed successfully!",
      description: `You've placed a bid of $${bidAmount.toFixed(2)} on ${material.title}`,
    });
    
    setIsAuctionModalOpen(false);
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!material) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Material Not Found</h1>
        <p className="text-gray-600 mb-6">The material you're looking for doesn't exist or has been removed.</p>
        <Button onClick={handleGoBack}>Back to Marketplace</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <Button
          variant="ghost" 
          className="mb-6 flex items-center gap-1"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" /> Back to marketplace
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Material Image */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-200 dark:bg-gray-800 h-96 rounded-lg overflow-hidden">
              <img 
                src={material.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"} 
                alt={material.title} 
                className="w-full h-full object-cover" 
              />
              {material.isRecyclable && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 hover:bg-green-600 flex gap-1">
                    <Recycle className="h-4 w-4" /> Recyclable
                  </Badge>
                </div>
              )}
              {material.isAuction && material.auction && (
                <div className="absolute top-4 left-4">
                  <AuctionBadge isAuction={true} endTime={material.auction.endTime} />
                </div>
              )}
              <div className="absolute bottom-4 right-4">
                <Badge variant="outline" className="bg-white/80 text-black">
                  {material.views || 1} views
                </Badge>
              </div>
            </div>
            
            <div className="mt-8">
              <h1 className="text-3xl font-bold mb-2">{material.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge>{material.category}</Badge>
                {material.status && (
                  <Badge className={
                    material.status === 'available' ? 'bg-green-500' :
                    material.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                  }>
                    {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  {material.isAuction && material.auction ? (
                    <span className="font-semibold text-xl">
                      ${material.auction.currentBid > 0 
                        ? material.auction.currentBid.toFixed(2) 
                        : material.auction.startingPrice.toFixed(2)}
                      <span className="text-sm text-gray-500 ml-1">current bid</span>
                    </span>
                  ) : (
                    <span className="font-semibold text-xl">${material.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{material.quantity}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{material.location}</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {material.description}
              </p>
              
              {material.tags && material.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {material.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />{tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <Separator className="my-6" />
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <span>Listed on {material.dateAdded.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* Seller Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Seller Information</h3>
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-full flex items-center justify-center mr-3">
                    {material.seller.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{material.seller.name}</p>
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-4 w-4 ${i < Math.floor(material.seller.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">({material.seller.rating})</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {isAuthenticated ? (
                  // Show action buttons for authenticated users
                  <>
                    {material.isAuction && material.auction ? (
                      <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setIsAuctionModalOpen(true)}
                      >
                        View Auction Details
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={handleContactSeller}
                      >
                        Contact Seller
                      </Button>
                    )}
                    
                    <Button variant="outline" className="w-full">
                      Save Material
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      Report Listing
                    </Button>
                  </>
                ) : (
                  // Show sign in/sign up prompts for non-authenticated users
                  <>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md mb-3">
                      <p className="text-sm mb-3">Sign in to contact the seller or place a bid</p>
                      <div className="flex gap-2 justify-center">
                        <Link to={`/signin?redirect=/material-details/${id}`}>
                          <Button size="sm" className="flex items-center gap-1">
                            <LogIn className="h-4 w-4" />
                            Sign In
                          </Button>
                        </Link>
                        <Link to={`/signup?redirect=/material-details/${id}`}>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <UserPlus className="h-4 w-4" />
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Contact Info (conditionally visible) */}
              {isAuthenticated && isContactVisible && material.contactInfo && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-3">Contact Information</h4>
                  {material.contactInfo.email && (
                    <div className="flex items-center mb-2">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`mailto:${material.contactInfo.email}`} className="text-blue-600 hover:underline">
                        {material.contactInfo.email}
                      </a>
                    </div>
                  )}
                  {material.contactInfo.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <a href={`tel:${material.contactInfo.phone}`} className="text-blue-600 hover:underline">
                        {material.contactInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Auction Modal */}
      {material.isAuction && material.auction && (
        <AuctionDetails
          auction={material.auction}
          onPlaceBid={handlePlaceBid}
          isOpen={isAuctionModalOpen}
          onClose={() => setIsAuctionModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MaterialDetails;
