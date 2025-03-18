
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Blog = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const pageClass = isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0";

  const blogPosts = [
    {
      id: 1,
      title: "India's Plastic Waste Crisis: Innovative Solutions for Industries",
      excerpt: "Exploring how Indian manufacturers are tackling plastic waste through innovative recycling processes.",
      category: "Industry Trends",
      author: "Rajesh Sharma",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "How the New EPR Regulations are Changing Waste Management in India",
      excerpt: "Understanding the impact of Extended Producer Responsibility regulations on Indian businesses.",
      category: "Regulations",
      author: "Priya Patel",
      date: "May 22, 2023",
      image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Success Story: How Textile Mills in Tamil Nadu Achieved Zero Waste",
      excerpt: "Case study of textile manufacturers who implemented circular economy principles to eliminate waste.",
      category: "Success Stories",
      author: "Vikram Singh",
      date: "April 10, 2023",
      image: "https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Turning Industrial Sludge into Construction Materials: An Indian Innovation",
      excerpt: "How researchers in India developed technology to convert hazardous waste into useful building materials.",
      category: "Innovation",
      author: "Meera Reddy",
      date: "March 5, 2023",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "The Rise of Waste-to-Energy Plants in Urban India",
      excerpt: "Analyzing the growth of waste-to-energy facilities in major Indian cities and their environmental impact.",
      category: "Technology",
      author: "Anand Kumar",
      date: "February 18, 2023",
      image: "https://images.unsplash.com/photo-1611273426858-450e7b8c7a78?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Government Incentives for Green Manufacturing in India: What You Need to Know",
      excerpt: "A comprehensive guide to tax benefits and subsidies available for eco-friendly industrial practices.",
      category: "Policy",
      author: "Sunita Desai",
      date: "January 30, 2023",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    "All Categories",
    "Industry Trends",
    "Regulations",
    "Success Stories",
    "Innovation",
    "Technology",
    "Policy"
  ];

  return (
    <div className={pageClass}>
      <Navbar />
      
      <main className="pt-20 pb-16">
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">WasteExchange Blog</h1>
              <p className="text-lg text-gray-600 mb-8">
                Insights, trends, and success stories from India's waste management and recycling industry
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="pr-10 pl-4 py-3 w-full rounded-lg"
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    index === 0 
                      ? "bg-primary text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-primary bg-blue-50 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 leading-tight">
                      <a href="#" className="hover:text-primary transition-colors">{post.title}</a>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      
                      <a 
                        href="#" 
                        className="text-primary font-medium text-sm flex items-center hover:underline"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
