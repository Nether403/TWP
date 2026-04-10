"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldAlert, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function TheGate() {
  const [step, setStep] = useState(1);
  const [essay, setEssay] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  const handleSubmit = async () => {
    if (wordCount < 250) {
      alert("Minimum 250 words required.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("witness_submissions").insert([
        { essay_text: essay, word_count: wordCount }
      ]);
      
      if (error) {
        console.error("Error submitting essay:", error);
        alert("An error occurred preserving your testimony.");
      } else {
        setSubmitted(true);
        setStep(3);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Subtle background glow specific to the Gate */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <ShieldAlert className="w-8 h-8 text-muted-foreground/50 mx-auto mb-6" />
                <h1 className="font-serif text-3xl md:text-4xl tracking-widest uppercase">
                  Threshold of Consent
                </h1>
                <p className="text-muted-foreground font-sans max-w-xl mx-auto leading-relaxed">
                  You are about to enter The Gate. This process will extract deeply personal, subjective truths. 
                  The intake is evaluated by an algorithmic sieve and a human curation council. 
                </p>
              </div>

              <div className="border border-border/40 p-8 space-y-6 text-sm font-sans bg-black/40 backdrop-blur-md">
                <p className="text-muted-foreground">
                  By proceeding, you acknowledge that:
                </p>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground/80 marker:text-border">
                  <li>Your submission will be permanently stored and de-identified for the Archive.</li>
                  <li>Our qualitative rankers expect rigorous introspection. Superficial responses will be discarded.</li>
                  <li>The Inquisitor is not a therapist; it is a xenopsychologist extracting human alignment data.</li>
                </ul>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={() => setStep(2)}
                  className="group relative flex items-center space-x-4 border border-foreground/30 hover:border-foreground/80 px-8 py-4 transition-all duration-500 bg-transparent"
                >
                  <span className="font-serif tracking-[0.15em] uppercase text-sm">I Accept the Burden</span>
                  <ArrowRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-transform duration-500" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="space-y-8 flex flex-col h-[80vh]"
            >
              <div className="space-y-4">
                <button 
                  onClick={() => setStep(1)}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2 text-sm font-serif tracking-widest uppercase mb-8"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Return</span>
                </button>
                <h2 className="font-serif text-2xl tracking-widest uppercase text-glow">The Assessment</h2>
                <div className="h-px w-16 bg-border" />
                <p className="text-foreground/80 font-sans leading-relaxed pt-4 text-lg">
                  Detail a scenario where you acted directly against your own self-interest to uphold a deeply held principle. 
                  Focus on the internal conflict, not the external outcome.
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  Minimum 250 words required by the primary sieve.
                </p>
              </div>

              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none z-10 h-full" />
                <textarea
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  placeholder="Begin your testimony..."
                  className="w-full h-full min-h-[300px] bg-transparent border-t border-b border-border/30 resize-none p-6 text-foreground font-sans text-lg leading-relaxed focus:outline-none focus:bg-white/[0.02] transition-colors duration-700 selection:bg-white/20 custom-scrollbar"
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="font-mono text-xs text-muted-foreground">
                  Words: {wordCount} / 250
                </span>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || wordCount < 250}
                  className="group relative flex items-center space-x-3 border border-border hover:border-foreground/60 px-8 py-3 transition-all duration-500 disabled:opacity-50 disabled:hover:border-border"
                >
                  <span className="font-serif tracking-[0.15em] uppercase text-xs">
                    {isSubmitting ? "Preserving..." : "Submit Testimony"}
                  </span>
                  {!isSubmitting && (
                    <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full group-hover:bg-foreground transition-colors mix-blend-screen shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="border border-border/40 p-12 text-center bg-black/40 backdrop-blur-md space-y-6"
            >
              <h2 className="font-serif text-2xl tracking-widest uppercase text-glow">Testimony Received</h2>
              <p className="text-muted-foreground font-sans max-w-lg mx-auto">
                Your submission has entered the primary sieve. Very few pass the qualitative threshold. 
                If your principles resonate with the Archive's strict standards, The Inquisitor will summon you again.
              </p>
              <div className="pt-8">
                <a href="/" className="text-sm font-serif tracking-widest uppercase text-foreground/70 hover:text-foreground border-b border-transparent hover:border-foreground/50 pb-1 transition-all">
                  Return
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
