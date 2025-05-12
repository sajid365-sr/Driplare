
import { Link } from "react-router-dom";
import { Mail, Facebook, Linkedin } from "lucide-react";
import { PiWhatsappLogo } from "react-icons/pi";

interface SocialLink {
  title: string;
  url: string;
  icon: React.ElementType;
}

export function FooterSocials() {
  const socials: SocialLink[] = [
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
    <div className="border-2 border-gray-200 p-6 mx-5 md:max-w-4xl md:mx-auto rounded-md">
      <div className="grid grid-cols-2 md:grid-cols-4 justify-around">
        {socials.map((social) => (
          <Link
            key={social.title}
            target="_blank"
            rel="noopener noreferrer"
            to={social.url}
            className="text-muted-foreground flex items-center gap-2"
          >
            <social.icon className="h-8 w-8 hover:text-teal-400" />
            <span className="hover:text-primary transition-colors text-xl">
              {social.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
