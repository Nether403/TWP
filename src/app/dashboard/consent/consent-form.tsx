"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { updateConsent } from "./actions";

export function ConsentForm({ initialData }: { initialData: any }) {
  const [partnerSharing, setPartnerSharing] = useState(initialData?.partner_sharing || false);
  const [publicPublication, setPublicPublication] = useState(initialData?.public_publication || false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData();
    if (partnerSharing) formData.append("partner_sharing", "on");
    if (publicPublication) formData.append("public_publication", "on");

    const res = await updateConsent(formData);
    
    setIsSaving(false);
    if (res.success) {
      setMessage({ type: "success", text: "Consent preferences updated successfully." });
    } else {
      setMessage({ type: "error", text: res.error || "Failed to update." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Internal Tier (Fixed) */}
      <div className="border border-border/30 p-6 space-y-3 opacity-70">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-serif tracking-widest uppercase text-foreground/80">
              1. Internal Research
            </h3>
            <p className="text-xs text-muted-foreground/60 font-sans leading-relaxed max-w-lg">
              Required. Your de-identified testimony is analyzed by Foundation staff and AI systems to identify structural alignment taxonomy anomalies. Read-only access by the Human Curation Council.
            </p>
          </div>
          <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-sm border border-foreground/30 bg-foreground/10">
            <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
      </div>

      {/* Partner Tier */}
      <div className={`border ${partnerSharing ? 'border-emerald-500/30' : 'border-border/20'} p-6 space-y-3 transition-colors duration-300`}>
        <label className="flex items-start justify-between cursor-pointer group">
          <div className="space-y-1">
            <h3 className={`text-base font-serif tracking-widest uppercase transition-colors ${partnerSharing ? 'text-emerald-400' : 'text-foreground/80'}`}>
              2. Limited Partner Access
            </h3>
            <p className="text-xs text-muted-foreground/60 font-sans leading-relaxed max-w-lg">
              Opt-in. Allows vetted academic and non-profit research teams read-only access to your de-identified testimony under a strict Data Use Agreement (DUA).
            </p>
          </div>
          <div className="mt-1 relative flex items-center justify-center w-5 h-5 rounded-sm border border-border/50 group-hover:border-foreground/50 transition-colors">
            <input 
              type="checkbox" 
              checked={partnerSharing}
              onChange={(e) => setPartnerSharing(e.target.checked)}
              className="opacity-0 absolute inset-0 cursor-pointer"
            />
            {partnerSharing && <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          </div>
        </label>
      </div>

      {/* Public Tier */}
      <div className={`border ${publicPublication ? 'border-amber-500/30' : 'border-border/20'} p-6 space-y-3 transition-colors duration-300`}>
        <label className="flex items-start justify-between cursor-pointer group">
          <div className="space-y-1">
            <h3 className={`text-base font-serif tracking-widest uppercase transition-colors ${publicPublication ? 'text-amber-400' : 'text-foreground/80'}`}>
              3. Public Publication
            </h3>
            <p className="text-xs text-muted-foreground/60 font-sans leading-relaxed max-w-lg">
              Opt-in. Permits the highest quality, fully de-identified excerpts to be published in open-access datasets (e.g. CC BY-NC-SA 4.0). Requires an additional manual HCC review before any release.
            </p>
          </div>
          <div className="mt-1 relative flex items-center justify-center w-5 h-5 rounded-sm border border-border/50 group-hover:border-foreground/50 transition-colors">
            <input 
              type="checkbox" 
              checked={publicPublication}
              onChange={(e) => setPublicPublication(e.target.checked)}
              className="opacity-0 absolute inset-0 cursor-pointer"
            />
            {publicPublication && <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          </div>
        </label>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 text-center border-l-2 ${message.type === 'success' ? 'border-emerald-500/50 text-emerald-400/80 bg-emerald-500/5' : 'border-red-500/50 text-red-400/80 bg-red-500/5'}`}
        >
          <span className="text-xs font-mono tracking-wide">{message.text}</span>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="group relative w-full flex items-center justify-center py-4 border border-border/30 hover:border-foreground/30 transition-colors duration-500"
      >
        <span className="font-serif tracking-[0.2em] uppercase text-xs opacity-70 group-hover:opacity-100 transition-opacity">
          {isSaving ? "Saving..." : "Save Preferences"}
        </span>
        <span className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </button>

      <div className="text-center pt-4 border-t border-border/10">
        <p className="text-[10px] text-muted-foreground/40 font-sans">
          To completely revoke your consent and delete your data, please contact <a href="mailto:privacy@thewprotocol.online" className="underline underline-offset-2">privacy@thewprotocol.online</a>.
        </p>
      </div>
    </form>
  );
}
