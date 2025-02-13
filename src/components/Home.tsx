import React, { useEffect, useState } from 'react';
import { Phone, Clock, Shield, Wrench, Fan, Flame, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { images } from '../assets/images/config';

interface ReviewCardProps {
  name: string;
  date: string;
  text: string;
}

function ReviewCard({ name, date, text }: ReviewCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-4">{text}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-500">{date}</span>
      </div>
    </motion.div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  image: string;
  title: string;
  description: string;
}

function ServiceCard({ icon, image, title, description }: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-48 relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="text-blue-600 flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <button
          onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 flex items-center"
        >
          Get Free Inspection <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="text-center p-6 hover:bg-white hover:shadow-lg rounded-lg transition-all duration-300"
    >
      <div className="text-blue-600 flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

export function Home() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    zip: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (location.state && 'scrollTo' in location.state) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'default_service',
        'template_m4lmaup',
        {
          from_name: formData.fullName,
          phone_number: formData.phone,
          zip_code: formData.zip,
          service_requested: formData.service,
          to_name: 'AirCare Pro',
        },
        'upi-P21f5Rh-3JU5p'
      );
      
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        zip: '',
        service: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Content */}
            <div className="px-4 py-16">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Get Fresh, Healthy Air at Home
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl mb-8"
              >
                Breathe easy with Phoenix's air experts.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="tel:+14809719660" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 transition-colors duration-200 md:hidden">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <button
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                >
                  Get Free Inspection
                </button>
              </motion.div>
            </div>
            {/* Right side - Before/After Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-4 md:px-0 pb-8 md:pb-0"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-gray-800 text-xl font-bold mb-4 text-center">Experience the Transformation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={images.beforeCleaning}
                        alt="Dirty Air Duct"
                        className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2">
                        Before
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={images.afterCleaning}
                        alt="Clean Air Duct"
                        className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-2">
                        After
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-4 text-center">
                  Professional cleaning that delivers visible results for a healthier home
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ReviewCard
              name="Sarah M."
              date="2 weeks ago"
              text="Amazing service! They were prompt, professional, and did a thorough job cleaning our air ducts. Noticed a huge difference in air quality immediately."
            />
            <ReviewCard
              name="Michael R."
              date="1 month ago"
              text="Best duct cleaning service in Phoenix! The team was knowledgeable and efficient. They explained everything they were doing and gave great maintenance tips."
            />
            <ReviewCard
              name="Jennifer L."
              date="3 weeks ago"
              text="Excellent experience from start to finish. Fair pricing and outstanding results. Our HVAC system is running much more efficiently now."
            />
          </div>
        </motion.div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="py-12 bg-white shadow-lg relative -mt-8 mx-4 rounded-lg md:max-w-2xl md:mx-auto">
        <div className="px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">SCHEDULE YOUR CLEANING NOW</h2>
          <p className="text-xl text-center text-green-600 font-semibold mb-8">GET A 25% DISCOUNT!</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name *"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone *"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                placeholder="Zip *"
                className="w-full col-span-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a Service *</option>
              <option value="air-duct">Air Duct Cleaning</option>
              <option value="dryer-vent">Dryer Vent Cleaning</option>
              <option value="chimney">Chimney Cleaning</option>
            </select>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 text-lg font-semibold text-white rounded-lg transition duration-200 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Get Free Inspection'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-green-600 text-center font-medium">
                Thank you! We'll contact you shortly.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-center font-medium">
                Sorry, something went wrong. Please try again or call us directly.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Same Day Service Banner */}
      <section className="bg-yellow-500 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center">
            <Clock className="w-6 h-6 mr-2" />
            <p className="text-lg font-semibold">SAME-DAY SERVICE MONDAY-FRIDAY</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Fan className="w-12 h-12" />}
              image={images.airDuctService}
              title="Air Duct Cleaning"
              description="Dust and allergens hiding in your ducts can affect your health and wallet. Our team ensures your air is clean and your system efficient, protecting your home and health."
            />
            <ServiceCard
              icon={<Wrench className="w-12 h-12" />}
              image={images.dryerVentService}
              title="Dryer Vent Cleaning"
              description="Clogged dryer vents are a fire risk and can make your dryer work harder, costing you more. Our cleaning service clears the lint, ensuring your dryer is safe and efficient."
            />
            <ServiceCard
              icon={<Flame className="w-12 h-12" />}
              image={images.chimneyService}
              title="Chimney Cleaning"
              description="Creosote and blockages in your chimney can cause fires and gas buildup. Our cleaning makes your chimney safe, so you can enjoy your fireplace with no worries."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100" id="why-choose-us">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Expert Air Quality Solutions"
              description="Our team is dedicated to creating a cleaner, healthier home environment for you."
            />
            <FeatureCard
              icon={<Wrench className="w-8 h-8" />}
              title="Advanced Techniques"
              description="We use cutting-edge methods to remove dust, allergens, and debris effectively."
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Same-Day Service"
              description="Quick, reliable services when you need them most, Monday through Friday."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8" />}
              title="Satisfaction Guaranteed"
              description="We prioritize your well-being, offering lasting solutions and expert care."
            />
          </div>
        </div>
      </section>

      {/* Fixed Call Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
        <a
          href="tel:+14809719660"
          className="block w-full py-3 px-6 text-center text-white bg-green-600 rounded-lg font-semibold text-lg"
        >
          <div className="flex items-center justify-center">
            <Phone className="w-5 h-5 mr-2" />
            Call Now
          </div>
        </a>
      </div>
    </div>
  );
}