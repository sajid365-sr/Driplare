import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card">
      <div className="container">
        <div className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's build brilliance.
          </h2>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-border">
          <div className="col-span-2 md:col-span-3 grid grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/web-design"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Web Design & Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/digital-marketing"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-services"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-services#chatbot"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Chatbot Integration
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-services#agents"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Custom AI Agents
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-services#automation"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    AI Automation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insights"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gdpr"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold mb-4">Newsletter</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Add newsletter submission logic
            }} className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md bg-background border border-border"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <h3 className="font-bold mb-4 mt-8">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <a
                  href="mailto:info@driplare.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@driplare.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <a
                  href="tel:+15551234567"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-muted-foreground">
                  100 Innovation Drive
                  <br />
                  Tech City, CA 94103
                </span>
              </li>
            </ul>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold">
              <img src="logo-white.png" alt="Driplare Logo" width={120} />
            </Link>
          </div>

          <div className="text-muted-foreground text-sm">
            &copy; {currentYear} Driplare. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
