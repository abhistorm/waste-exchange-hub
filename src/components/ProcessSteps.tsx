
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Package, Truck, Recycle, DollarSign, Check, ArrowRight } from 'lucide-react';

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
      color: "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/50",
      gradient: "from-blue-50 to-blue-100/30"
    },
    {
      icon: Truck,
      title: "Connect & Exchange",
      description: "Match with buyers or sellers, negotiate terms, and arrange transportation.",
      color: "bg-purple-50 text-purple-600 border-purple-100 shadow-purple-100/50",
      gradient: "from-purple-50 to-purple-100/30"
    },
    {
      icon: Recycle,
      title: "Recycle & Transform",
      description: "Convert waste into valuable resources or find creative ways to repurpose materials.",
      color: "bg-green-50 text-green-600 border-green-100 shadow-green-100/50",
      gradient: "from-green-50 to-green-100/30"
    },
    {
      icon: DollarSign,
      title: "Create Value",
      description: "Generate revenue from waste materials while contributing to a circular economy.",
      color: "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100/50",
      gradient: "from-amber-50 to-amber-100/30"
    }
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-gray-50/50">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-200 opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-200 opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gray-200 opacity-50"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 border border-green-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our simple four-step process helps connect waste generators with recyclers and buyers, creating a circular economy that benefits everyone.
          </p>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "process-step opacity-0 p-8 rounded-xl border transition-all duration-300 hover:shadow-lg bg-gradient-to-br",
                step.color,
                step.gradient
              )}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white mb-4 shadow-md">
                  <step.icon className="h-7 w-7" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 font-semibold shadow-sm">
                  {index + 1}
                </div>
                {index < steps.length - 1 ? (
                  <div className="hidden lg:block">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                ) : (
                  <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                    <Check className="h-5 w-5" />
                  </div>
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
