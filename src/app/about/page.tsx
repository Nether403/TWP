"use client";

import { motion } from "framer-motion";
import { AnimatedParticles } from "@/components/ui/animated-particles";
import { Globe, ExternalLink, Mail } from "lucide-react";

interface Creator {
  name: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const creators: Creator[] = [
  {
    name: "Martin vanDeursen",
    email: "martin@realm101.com",
    linkedin: "https://www.linkedin.com/in/mvd101/",
    github: "https://github.com/Nether403",
  },
  {
    name: "Mia Samura",
    email: "mia@realm101.com",
    linkedin: "https://www.linkedin.com/company/the-witness-protocol",
  },
];

const websites = [
  { label: "nether101.nl", href: "https://nether101.nl" },
  { label: "processoergosum.info", href: "https://processoergosum.info" },
  { label: "witnessprotocol.online", href: "https://witnessprotocol.online" },
  { label: "f6s.com/the-witness-protocol", href: "https://www.f6s.com/the-witness-protocol" },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-24 overflow-hidden selection:bg-white/20">
      <AnimatedParticles />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-16"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.5 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-foreground text-glow uppercase">
            The Creators
          </h1>
          <p className="text-sm text-muted-foreground tracking-widest uppercase font-serif">
            AI Alignment Research &middot; The Witness Protocol &middot; Realm101
          </p>
          <p className="text-xs text-muted-foreground/50 tracking-widest font-serif">
            Amsterdam, Netherlands
          </p>
        </motion.div>

        {/* Creators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {creators.map((creator) => (
            <div
              key={creator.name}
              className="border border-border/40 p-8 flex flex-col items-center space-y-5 text-center"
            >
              <h2 className="font-serif tracking-widest text-foreground/90 text-lg uppercase">
                {creator.name}
              </h2>

              <a
                href={`mailto:${creator.email}`}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-xs tracking-widest"
              >
                <Mail className="w-3 h-3" />
                <span>{creator.email}</span>
              </a>

              {(creator.linkedin || creator.twitter || creator.github) && (
                <div className="flex items-center space-x-5 pt-1">
                  {creator.linkedin && (
                    <a
                      href={creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-300 text-xs tracking-widest"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="font-serif">LinkedIn</span>
                    </a>
                  )}
                  {creator.twitter && (
                    <a
                      href={creator.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-300 text-xs tracking-widest"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="font-serif">X</span>
                    </a>
                  )}
                  {creator.github && (
                    <a
                      href={creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-300 text-xs tracking-widest"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="font-serif">GitHub</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Websites */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="w-full space-y-6"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/50 font-serif">
            Websites &amp; Portfolio
          </p>
          <div className="flex flex-col items-center space-y-3">
            {websites.map((site) => (
              <a
                key={site.label}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm tracking-widest border-b border-transparent hover:border-foreground/20 pb-px"
              >
                <Globe className="w-3 h-3" />
                <span className="font-serif">{site.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
