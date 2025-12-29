import { Link } from "react-router-dom";

interface BreadcrumbNavProps {
  postTitle: string;
}

export function BreadcrumbNav({ postTitle }: BreadcrumbNavProps) {
  return (
    <nav className="py-6 border-b border-[#E5E5E5]">
      <div className="container mx-auto px-4">
        <div className="font-mono text-sm text-[#0A0A0A]/60">
          <Link to="/" className="hover:text-[#FF6B00] transition-colors">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <Link to="/insights" className="hover:text-[#FF6B00] transition-colors">
            INTELLIGENCE_HUB
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#FF6B00] font-bold">
            [{postTitle.length > 30 ? postTitle.substring(0, 30) + "..." : postTitle}]
          </span>
        </div>
      </div>
    </nav>
  );
}
