"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "https://thewprotocol.online" },
  { label: "P.E.S.", href: "https://processoergosum.info" },
  { label: "The Protocol", href: "https://witnessprotocol.online" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-5"
    >
      <nav className="flex items-center space-x-10">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-serif tracking-widest uppercase text-xs text-muted-foreground hover:text-foreground transition-colors duration-500 pb-px border-b border-transparent hover:border-foreground/20"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
