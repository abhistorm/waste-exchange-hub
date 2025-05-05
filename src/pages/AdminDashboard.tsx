
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, Users, Settings, BarChart, ShoppingBag, 
  CheckCircle, XCircle, Search, MessageCircle, Recycle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import MaterialGrid from '@/components/MaterialGrid';
import { Material } from '@/types/material';
import { mockMaterials } from '@/lib/mock-data';

// Components
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLayout from '@/components/admin/AdminLayout';
import UsersList from '@/components/admin/UsersList';
import DashboardStats from '@/components/admin/DashboardStats';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter materials based on approval status and search
  const filteredMaterials = materials.filter(material => {
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'approved' && material.isApproved) || 
      (filterStatus === 'pending' && material.isApproved === false);
    
    const matchesSearch = 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      material.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Mock approve/reject material
  const handleApproveReject = (id: number, isApproved: boolean) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(material => 
        material.id === id ? { ...material, isApproved } : material
      )
    );

    toast({
      title: isApproved ? "Material Approved" : "Material Rejected",
      description: `Material ID ${id} has been ${isApproved ? 'approved' : 'rejected'}.`,
    });
  };
  
  // Mock delete material
  const handleDeleteMaterial = (id: number) => {
    setMaterials(prevMaterials => 
      prevMaterials.filter(material => material.id !== id)
    );

    toast({
      title: "Material Deleted",
      description: `Material ID ${id} has been deleted.`,
    });
  };

  return (
    <AdminLayout>
      <AdminHeader 
        title="Admin Dashboard" 
        userName={user?.name || 'Admin'} 
        onLogout={logout} 
      />

      <div className="container mx-auto px-4 py-8">
        <DashboardStats />

        <Tabs defaultValue="materials" className="mt-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Materials</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="hidden md:flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>AI Tools</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="hidden lg:flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>
                  Summary of all marketplace activities and analytics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Materials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{materials.length}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 10)}% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 500) + 200}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 15)}% from last month
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000) + 500}</div>
                      <p className="text-xs text-muted-foreground">
                        +{Math.floor(Math.random() * 20)}% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" /> Material Listings
                </CardTitle>
                <CardDescription>
                  Manage and moderate all material listings from the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search materials..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('all')}
                      size="sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={filterStatus === 'pending' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('pending')}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <XCircle className="h-4 w-4" /> Pending
                    </Button>
                    <Button
                      variant={filterStatus === 'approved' ? 'default' : 'outline'}
                      onClick={() => setFilterStatus('approved')}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" /> Approved
                    </Button>
                  </div>
                </div>

                {/* Material listings grid with approval actions */}
                <MaterialGrid 
                  materials={filteredMaterials}
                  isAdmin={true}
                  onApproveClick={handleApproveReject}
                  onDeleteClick={handleDeleteMaterial}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UsersList />
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Tools Management</CardTitle>
                <CardDescription>
                  Configure and monitor AI assistants and tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-2 border-indigo-100 hover:border-indigo-300 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-md font-medium flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-indigo-600" />
                        Recycling Assistant
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Configure responses and train the recycling chatbot.</p>
                      <Button className="mt-4 w-full" variant="outline">Configure</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-md font-medium flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-emerald-600" />
                        Material Analyzer
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Update material recognition models and price estimations.</p>
                      <Button className="mt-4 w-full" variant="outline">Configure</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-md font-medium flex items-center gap-2">
                        <Recycle className="h-5 w-5 text-blue-600" />
                        Carbon Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Update carbon footprint calculation parameters.</p>
                      <Button className="mt-4 w-full" variant="outline">Configure</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Configure marketplace and application settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Settings options will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
