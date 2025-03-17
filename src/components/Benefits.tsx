
import React, { useEffect, useRef } from 'react';
import { DollarSign, Leaf, Factory, Package, ArrowRight } from 'lucide-react';

const Benefits = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const benefits = benefitsRef.current?.querySelectorAll('.benefit-card');
    if (benefits) {
      benefits.forEach((benefit) => {
        observer.observe(benefit);
      });
    }

    return () => {
      if (benefits) {
        benefits.forEach((benefit) => {
          observer.unobserve(benefit);
        });
      }
    };
  }, []);

  const benefits = [
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Reduce waste disposal costs and generate revenue from materials that would otherwise be discarded.",
      color: "bg-blue-500"
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Minimize landfill waste and carbon emissions by giving materials a second life through recycling.",
      color: "bg-green-500"
    },
    {
      icon: Factory,
      title: "Regulatory Compliance",
      description: "Meet sustainability goals and comply with environmental regulations for waste management.",
      color: "bg-purple-500"
    },
    {
      icon: Package,
      title: "Resource Efficiency",
      description: "Access affordable raw materials and reduce dependence on virgin resources.",
      color: "bg-amber-500"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Waste Exchange</h2>
          <p className="text-gray-600">
            Join our platform to transform waste challenges into opportunities for your business and the environment.
          </p>
        </div>

        <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="benefit-card opacity-0 bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Icon header */}
              <div className={`${benefit.color} h-2 w-full`}></div>
              
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${benefit.color} bg-opacity-10 mb-4`}>
                  <benefit.icon className={`h-6 w-6 text-${benefit.color.split('-')[1]}-500`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary font-medium hover:underline group"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block glass p-8 rounded-xl max-w-3xl animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4">Ready to transform your waste management?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses already exchanging materials on our platform.
            </p>
            <button className="btn-primary">Get Started Today</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
