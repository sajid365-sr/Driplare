import { Link } from "react-router-dom";
import { Mail, Facebook, Linkedin } from "lucide-react";
import { PiWhatsappLogo } from "react-icons/pi";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    {
      title: "Mail",
      url: "mailto:info-@driplare.com",
      icon: Mail,
    },
    {
      title: "Facebook",
      url: "https://facebook.com/driplare",
      icon: Facebook,
    },
    {
      title: "LinkedIn",
      url: "https://linkedin.com/company/driplare",
      icon: Linkedin,
    },
    {
      title: "Whatsapp",
      url: "https://wa.me/+8801608331365",
      icon: PiWhatsappLogo,
    },
  ];

  return (
    <footer className="bg-gradient-to-b  from-primary/5 to-primary/30">
      {/* ================== Contact ===================== */}
      <div className="border-2 border-gray-200 p-6 mx-5 md:max-w-4xl md:mx-auto rounded-md ">
        <div className="grid grid-cols-2 md:grid-cols-4 justify-around ">
          {socials.map((social) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to={social.url}
              className="text-muted-foreground flex items-center  gap-2"
            >
              <social.icon className="h-8 w-8 hover:text-teal-400" />
              <span className=" hover:text-primary transition-colors text-xl">
                {social.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-border">
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
          {/* ================== Newsletter ===================== */}
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
        <div className="border-t border-border border-gray-50 py-8 flex flex-col-reverse gap-5 md:flex-row justify-between items-center">
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
