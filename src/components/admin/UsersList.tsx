
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, UserCheck, UserX, Shield, User, 
  MoreVertical, CheckCircle, XCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for users
const mockUsers = [
  { 
    id: 1, 
    name: 'Admin User', 
    email: 'admin@example.com', 
    role: 'admin', 
    dateJoined: new Date('2023-01-01'), 
    isVerified: true,
    listings: 5
  },
  { 
    id: 2, 
    name: 'Rahul Singh', 
    email: 'rahul@example.com', 
    role: 'user', 
    dateJoined: new Date('2023-01-05'), 
    isVerified: true,
    listings: 12
  },
  { 
    id: 3, 
    name: 'Priya Sharma', 
    email: 'priya@example.com', 
    role: 'user', 
    dateJoined: new Date('2023-01-10'), 
    isVerified: true,
    listings: 8
  },
  { 
    id: 4, 
    name: 'Amit Kumar', 
    email: 'amit@example.com', 
    role: 'user', 
    dateJoined: new Date('2023-01-15'), 
    isVerified: false,
    listings: 0
  },
  { 
    id: 5, 
    name: 'Neha Patel', 
    email: 'neha@example.com', 
    role: 'user', 
    dateJoined: new Date('2023-01-20'), 
    isVerified: true,
    listings: 3
  },
  { 
    id: 6, 
    name: 'Vikram Joshi', 
    email: 'vikram@example.com', 
    role: 'user', 
    dateJoined: new Date('2023-01-25'), 
    isVerified: false,
    listings: 0
  },
];

const UsersList: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterVerification, setFilterVerification] = useState<string>('all');
  const { toast } = useToast();

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = 
      filterRole === 'all' || user.role === filterRole;
    
    const matchesVerification = 
      filterVerification === 'all' || 
      (filterVerification === 'verified' && user.isVerified) || 
      (filterVerification === 'unverified' && !user.isVerified);
    
    return matchesSearch && matchesRole && matchesVerification;
  });

  // Toggle user verification status
  const toggleVerification = (id: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { ...user, isVerified: !user.isVerified } : user
      )
    );

    const user = users.find(u => u.id === id);
    toast({
      title: user?.isVerified ? "User Verification Removed" : "User Verified",
      description: `${user?.name} has been ${user?.isVerified ? 'unverified' : 'verified'}.`,
    });
  };

  // Change user role
  const toggleRole = (id: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { 
          ...user, 
          role: user.role === 'user' ? 'admin' : 'user' 
        } : user
      )
    );

    const user = users.find(u => u.id === id);
    toast({
      title: "Role Updated",
      description: `${user?.name} is now ${user?.role === 'user' ? 'an admin' : 'a regular user'}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" /> User Management
        </CardTitle>
        <CardDescription>
          Manage users, verify accounts, and assign roles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterRole === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterRole('all')}
              size="sm"
            >
              All Roles
            </Button>
            <Button
              variant={filterRole === 'admin' ? 'default' : 'outline'}
              onClick={() => setFilterRole('admin')}
              size="sm"
              className="flex items-center gap-1"
            >
              <Shield className="h-4 w-4" /> Admins
            </Button>
            <Button
              variant={filterRole === 'user' ? 'default' : 'outline'}
              onClick={() => setFilterRole('user')}
              size="sm"
              className="flex items-center gap-1"
            >
              <User className="h-4 w-4" /> Regular Users
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
            <div className="col-span-5 md:col-span-3">User</div>
            <div className="col-span-3 hidden md:block">Email</div>
            <div className="col-span-2 md:col-span-2">Role</div>
            <div className="col-span-3 md:col-span-2">Status</div>
            <div className="col-span-2 md:col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y">
            {filteredUsers.map(user => (
              <div key={user.id} className="grid grid-cols-12 p-4 items-center">
                <div className="col-span-5 md:col-span-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 md:hidden">{user.email}</div>
                  </div>
                </div>
                <div className="col-span-3 hidden md:block text-gray-600">
                  {user.email}
                </div>
                <div className="col-span-2 md:col-span-2">
                  {user.role === 'admin' ? (
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="outline">User</Badge>
                  )}
                </div>
                <div className="col-span-3 md:col-span-2">
                  {user.isVerified ? (
                    <span className="inline-flex items-center text-xs text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs text-orange-600">
                      <XCircle className="h-3 w-3 mr-1" /> Unverified
                    </span>
                  )}
                </div>
                <div className="col-span-2 md:col-span-2 text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleVerification(user.id)}
                      title={user.isVerified ? "Remove verification" : "Verify user"}
                    >
                      {user.isVerified ? 
                        <UserX className="h-4 w-4" /> : 
                        <UserCheck className="h-4 w-4" />
                      }
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleRole(user.id)}
                      title={user.role === 'admin' ? "Change to user" : "Promote to admin"}
                    >
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No users found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersList;
