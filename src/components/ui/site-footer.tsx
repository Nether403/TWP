import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Reviewer Packet", href: "/packet" },
  { label: "Governance", href: "/governance" },
  { label: "Failure Log", href: "/failure-log" },
  { label: "Status", href: "/status" },
];

const externalLinks = [
  { label: "P.E.S.", href: "https://processoergosum.info" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/the-witness-protocol" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/20 bg-background/80">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/twp-logo-white.png"
                alt="TWP"
                width={24}
                height={24}
                className="opacity-50"
              />
              <span className="font-serif tracking-[0.3em] uppercase text-xs text-muted-foreground">
                The Witness Protocol
              </span>
            </Link>
            <p className="text-[10px] text-muted-foreground/40 tracking-widest uppercase text-center md:text-left">
              Stichting The Witness Protocol Foundation
              <br />
              Amsterdam, Netherlands
            </p>
          </div>

          {/* Internal Links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 font-serif">
              Protocol
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-widest font-serif"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* External Links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 font-serif">
              External
            </p>
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-widest font-serif"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/10 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <p className="text-[10px] text-muted-foreground/30 tracking-widest uppercase">
            Pre-alpha Research Initiative · Not a product
          </p>
          <p className="text-[10px] text-muted-foreground/30 tracking-widest">
            © {new Date().getFullYear()} Stichting The Witness Protocol Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
