
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ShoppingBag, 
  Users, 
  Recycle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹45,231</div>
          <div className="flex items-center text-xs text-green-600 mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,345</div>
          <div className="flex items-center text-xs text-green-600 mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>+8.2% from last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Materials Recycled</CardTitle>
            <div className="p-2 bg-emerald-100 rounded-full">
              <Recycle className="h-4 w-4 text-emerald-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,204 kg</div>
          <div className="flex items-center text-xs text-green-600 mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>+23.1% from last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <div className="p-2 bg-amber-100 rounded-full">
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12.8%</div>
          <div className="flex items-center text-xs text-red-600 mt-1">
            <ArrowDownRight className="h-3 w-3 mr-1" />
            <span>-2.3% from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
