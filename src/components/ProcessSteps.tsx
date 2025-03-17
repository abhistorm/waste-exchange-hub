
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Package, Truck, Recycle, DollarSign } from 'lucide-react';

const ProcessSteps = () => {
  const stepsRef = useRef<HTMLDivElement>(null);

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

    const steps = stepsRef.current?.querySelectorAll('.process-step');
    if (steps) {
      steps.forEach((step) => {
        observer.observe(step);
      });
    }

    return () => {
      if (steps) {
        steps.forEach((step) => {
          observer.unobserve(step);
        });
      }
    };
  }, []);

  const steps = [
    {
      icon: Package,
      title: "List Materials",
      description: "Upload details about your waste materials, including type, quantity, condition, and price.",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      icon: Truck,
      title: "Connect & Exchange",
      description: "Match with buyers or sellers, negotiate terms, and arrange transportation.",
      color: "bg-purple-50 text-purple-600 border-purple-100"
    },
    {
      icon: Recycle,
      title: "Recycle & Transform",
      description: "Convert waste into valuable resources or find creative ways to repurpose materials.",
      color: "bg-green-50 text-green-600 border-green-100"
    },
    {
      icon: DollarSign,
      title: "Create Value",
      description: "Generate revenue from waste materials while contributing to a circular economy.",
      color: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  return (
    <section id="process" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-100 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-100 opacity-50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-100 opacity-50"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Our simple four-step process helps connect waste generators with recyclers and buyers, creating a circular economy.
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "process-step opacity-0 p-6 rounded-xl border transition-all duration-300 hover:shadow-md",
                step.color
              )}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white mb-4 shadow-sm">
                <step.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              <div className="mt-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 font-medium">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block w-full h-[2px] bg-gray-200 ml-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
