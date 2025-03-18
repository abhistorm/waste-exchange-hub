
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Building2, Users, Award, BarChart4, Lightbulb } from 'lucide-react';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const pageClass = isLoaded ? "opacity-100 transition-opacity duration-500" : "opacity-0";

  return (
    <div className={pageClass}>
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About WasteExchange India</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Pioneering sustainable waste management solutions for India's growing industrial sector
            </p>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Industrial recycling facility in India" 
                className="rounded-lg shadow-lg max-w-full md:max-w-2xl"
              />
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600">
                To transform India's industrial waste management landscape by creating a seamless digital ecosystem 
                that connects waste generators with recyclers and upcyclers, contributing to a cleaner environment 
                and resource-efficient economy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Industrial Solutions</h3>
                <p className="text-gray-600">
                  Helping Indian industries manage waste efficiently and comply with environmental regulations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
                <p className="text-gray-600">
                  Creating livelihood opportunities through waste recycling and upcycling initiatives across India.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Future</h3>
                <p className="text-gray-600">
                  Contributing to India's environmental goals and promoting a circular economy approach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Rajesh Sharma",
                  role: "Founder & CEO",
                  bio: "Former environmental consultant with 15+ years of experience in industrial waste management."
                },
                {
                  name: "Priya Patel",
                  role: "COO",
                  bio: "Operations specialist who has implemented waste management systems for major Indian corporations."
                },
                {
                  name: "Vikram Singh",
                  role: "CTO",
                  bio: "Tech entrepreneur with a passion for using technology to solve environmental challenges."
                },
                {
                  name: "Meera Reddy",
                  role: "Head of Sustainability",
                  bio: "Environmental scientist specializing in circular economy principles and waste reduction strategies."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <User className="h-20 w-20 text-gray-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-blue-600 mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact in India</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <p className="text-gray-600">Industries Served Across India</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
                <p className="text-gray-600">Tonnes of Waste Diverted from Landfills</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">₹100M+</div>
                <p className="text-gray-600">Value Generated through Waste Exchange</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-8 rounded-lg max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">Our Presence Across India</h3>
              <p className="text-gray-600 text-center mb-6">
                With operations in major industrial hubs across India, we're helping transform the waste management
                landscape from Kashmir to Kanyakumari.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {["Maharashtra", "Gujarat", "Tamil Nadu", "Karnataka", "Delhi NCR", "West Bengal", "Telangana", "Punjab"].map((state, index) => (
                  <div key={index} className="bg-white p-3 rounded shadow-sm">
                    {state}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
