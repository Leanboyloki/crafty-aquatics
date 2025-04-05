
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/80 backdrop-blur-md text-foreground border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold aqua-gradient bg-clip-text text-transparent">Crafty Aquatics</h2>
            <p className="text-muted-foreground">
              Your one-stop shop for all aquarium needs. Quality products, expert advice, and reliable service.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <p className="text-muted-foreground">1234 Aquarium Lane</p>
            <p className="text-muted-foreground">Ocean City, FC 98765</p>
            <p className="text-muted-foreground">Phone: (123) 456-7890</p>
            <p className="text-muted-foreground">Email: info@craftyaquatics.com</p>
            
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="mailto:info@craftyaquatics.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/30 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Crafty Aquatics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
