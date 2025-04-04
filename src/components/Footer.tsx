
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md text-white border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold aqua-gradient bg-clip-text text-transparent">Crafty Aquatics</h2>
            <p className="text-gray-300">
              Your one-stop shop for all aquarium needs. Quality products, expert advice, and reliable service.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-aqua-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-aqua-400">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-aqua-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-aqua-400">Contact Us</h3>
            <p className="text-gray-300">1234 Aquarium Lane</p>
            <p className="text-gray-300">Ocean City, FC 98765</p>
            <p className="text-gray-300">Phone: (123) 456-7890</p>
            <p className="text-gray-300">Email: info@craftyaquatics.com</p>
            
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-300 hover:text-aqua-300 transition-transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-coral-400 transition-transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-aqua-300 transition-transform hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-coral-400 transition-transform hover:scale-110">
                <Youtube size={20} />
              </a>
              <a href="mailto:info@craftyaquatics.com" className="text-gray-300 hover:text-aqua-300 transition-transform hover:scale-110">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Crafty Aquatics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
