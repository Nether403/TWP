"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Status", href: "/status" },
  { label: "Failure Log", href: "/failure-log" },
  { label: "Governance", href: "/governance" },
  { label: "The Gate", href: "/gate" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-background/80 backdrop-blur-sm border-b border-border/20"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 group">
        <Image
          src="/twp-logo-white.png"
          alt="TWP"
          width={28}
          height={28}
          className="opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        />
        <span className="font-serif tracking-[0.3em] uppercase text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-500 hidden sm:inline">
          TWP
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center space-x-6 md:space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-serif tracking-widest uppercase text-[10px] md:text-xs text-muted-foreground hover:text-foreground transition-colors duration-500 pb-px border-b border-transparent hover:border-foreground/20"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
