import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbNavProps {
  postTitle: string;
}

export function BreadcrumbNav({ postTitle }: BreadcrumbNavProps) {
  return (
    <nav className="py-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 font-mono text-[12px] font-bold tracking-[0.2em] text-[#0A0A0A]/40 uppercase">
          <Link
            href="/"
            className="hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <Home size={12} /> HOME
          </Link>
          <ChevronRight size={12} className="opacity-30" />
          <Link href="/insights" className="hover:text-primary transition-colors">
            INTELLIGENCE_HUB
          </Link>
          <ChevronRight size={12} className="opacity-30" />
          <span className="text-primary truncate max-w-[200px] md:max-w-none">
            {postTitle}
          </span>
        </div>
      </div>
    </nav>
  );
}
