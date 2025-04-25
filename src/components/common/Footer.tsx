import { Link } from "react-router-dom";
import { Mail, Facebook, Twitter, Linkedin, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PiWhatsappLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b  from-primary/5 to-primary/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12 border-t border-border">
          <div>
            <img src="logo.png" alt="Driplare Logo" width={150} />
            <p className="mt-5">
              Driplare is your go-to technology partner focusing on innovative
              solutions that enhance your brand’s online visibility and success.
            </p>
          </div>
          {/* ================== Solutions ===================== */}
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
          {/* ================== Company ===================== */}
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
          {/* ================== Contact ===================== */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
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
            </ul>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com/driplare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaXTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com/company/driplare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://wa.me/+8801608331365"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <PiWhatsappLogo className="h-6 w-6" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold mb-4">Newsletter</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add newsletter submission logic
              }}
              className="space-y-4"
            >
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
          </div>
        </div>

        {/* ================== Bottom ===================== */}
        <div className="border-t border-border border-gray-50 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-50">
            &copy; {currentYear} Driplare. All rights reserved.
          </div>
          <ul className=" flex gap-5 justify-center  items-center">
            <li>
              <Link
                to="/privacy"
                className="text-gray-50 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-gray-50 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="text-gray-50 hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
