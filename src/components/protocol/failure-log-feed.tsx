"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info, Shield } from "lucide-react";

interface FailureLogEntry {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: string;
  discovered_by: string | null;
  remedy: string | null;
  created_at: string;
}

const severityConfig = {
  critical: { icon: AlertTriangle, color: "text-foreground/90", border: "border-foreground/30" },
  warning: { icon: AlertTriangle, color: "text-muted-foreground", border: "border-border/40" },
  info: { icon: Info, color: "text-muted-foreground/60", border: "border-border/20" },
} as const;

const categoryLabels: Record<string, string> = {
  prompt: "Prompt Engineering",
  gate: "Gate System",
  annotation: "Annotation Framework",
  security: "Security",
  methodology: "Methodology",
  other: "Other",
};

export function FailureLogFeed({ entries }: { entries: FailureLogEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <Shield className="w-8 h-8 mx-auto mb-4 text-muted-foreground/20" />
        <p className="text-sm text-muted-foreground/40 font-sans">
          No public failure log entries yet. This will change.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry, i) => {
        const config = severityConfig[entry.severity as keyof typeof severityConfig] || severityConfig.info;
        const Icon = config.icon;

        return (
          <motion.article
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={`border ${config.border} p-6 md:p-8 space-y-4`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${config.color} shrink-0`} />
                <h2 className={`font-serif text-sm md:text-base tracking-widest uppercase ${config.color}`}>
                  {entry.title}
                </h2>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/40 font-serif">
                  {categoryLabels[entry.category] || entry.category}
                </span>
                <span className="text-[10px] tracking-wider text-muted-foreground/30 font-sans">
                  {new Date(entry.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground/70 font-sans leading-relaxed">
              {entry.description}
            </p>

            {/* Remedy */}
            {entry.remedy && (
              <div className="border-t border-border/10 pt-4">
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 font-serif mb-2">
                  Remedy
                </p>
                <p className="text-xs text-muted-foreground/60 font-sans leading-relaxed">
                  {entry.remedy}
                </p>
              </div>
            )}

            {/* Discovered by */}
            {entry.discovered_by && (
              <p className="text-[10px] text-muted-foreground/30 font-sans">
                Discovered by: {entry.discovered_by}
              </p>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}
