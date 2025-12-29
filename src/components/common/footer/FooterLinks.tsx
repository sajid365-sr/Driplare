import { Link } from "react-router-dom";

interface FooterLinksProps {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

export function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <div>
      <h3 className="font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              to={link.url}
              className="text-muted-foreground hover:text-secondary-foreground transition-colors"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
