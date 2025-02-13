import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Logo className="h-10 w-auto" />
              <span className="text-2xl font-bold">PureFlow</span>
            </div>
            <div className="space-y-4">
              <a href="tel:+14809719660" className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                (480) 971-9660
              </a>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                15615 N 35th Ave, Unit 248, Phoenix, AZ 85053
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-blue-400">Air Duct Cleaning</a></li>
              <li><a href="#services" className="hover:text-blue-400">Dryer Vent Cleaning</a></li>
              <li><a href="#services" className="hover:text-blue-400">Chimney Cleaning</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <p className="mb-2">Monday - Friday</p>
            <p>8:00 AM - 6:30 PM</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <div className="space-x-4 mb-4">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-blue-400">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms-and-conditions" className="text-gray-400 hover:text-blue-400">Terms & Conditions</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} PureFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}