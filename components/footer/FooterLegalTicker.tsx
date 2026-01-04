import Link from "next/link";

export function FooterLegalTicker() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-[#0A0A0A]/5 py-10 bg-[#0A0A0A]/[0.02]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="font-mono text-[10px] font-bold text-[#0A0A0A]/40 uppercase tracking-[0.2em]">
            © {currentYear} DRIPLARE_LABS // INFRA_VERIFIED
          </div>

          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Security'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="font-mono text-[10px] font-black text-[#0A0A0A]/50 hover:text-primary transition-colors uppercase tracking-widest"
              >
                [{item}]
              </Link>
            ))}
          </div>

          <div className="font-mono text-[10px] font-bold text-[#0A0A0A]/40 uppercase tracking-[0.2em]">
            Architected_By: <span className="text-[#0A0A0A]">Driplare</span>
          </div>
        </div>
      </div>
    </div>
  );
}
